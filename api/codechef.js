/**
 * Vercel Serverless Function: /api/codechef
 * Safely fetches and parses the verified CodeChef user profile submissions and ratings on the server-side,
 * eliminating browser CORS restrictions while protecting against upstream rate limits.
 */
export default async function handler(req, res) {
  // Set CORS headers for safe cross-origin access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { username = 'cse_29_1307' } = req.query || {};

  try {
    const response = await fetch(`https://www.codechef.com/users/${encodeURIComponent(username)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `CodeChef returned HTTP status ${response.status}`,
        source: 'upstream'
      });
    }

    const html = await response.text();

    // 1. Extract userDailySubmissionsStats array
    const subMatch = html.match(/userDailySubmissionsStats\s*=\s*(\[.*?\]);/s);
    let rawSubmissions = [];
    if (subMatch) {
      try {
        rawSubmissions = JSON.parse(subMatch[1]);
      } catch (err) {
        console.error('Failed to parse userDailySubmissionsStats:', err);
      }
    }

    // Convert raw submissions to YYYY-MM-DD map
    const submissionMap = {};
    rawSubmissions.forEach(item => {
      if (item && item.date) {
        const parts = item.date.split('-');
        if (parts.length === 3) {
          const y = parts[0];
          const m = parts[1].padStart(2, '0');
          const d = parts[2].padStart(2, '0');
          submissionMap[`${y}-${m}-${d}`] = item.value;
        }
      }
    });

    // 2. Extract contest ratings array (all_rating)
    const ratingMatch = html.match(/var all_rating = (\[.*?\]);/s);
    let contestHistory = [];
    if (ratingMatch) {
      try {
        const rawContests = JSON.parse(ratingMatch[1]);
        contestHistory = rawContests.map(c => {
          const d = new Date(c.end_date);
          return {
            contestName: c.name,
            code: c.code,
            date: d.toISOString().split('T')[0],
            displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            rating: parseInt(c.rating, 10),
            rank: parseInt(c.rank, 10)
          };
        });
      } catch (err) {
        console.error('Failed to parse all_rating:', err);
      }
    }

    // 3. Extract Division, Current Rating & Peak
    const divMatch = html.match(/\((Div\s*\d+)\)/);
    const division = divMatch ? divMatch[1] : 'Div 4';

    const latestContest = contestHistory.length ? contestHistory[contestHistory.length - 1] : null;
    const currentRating = latestContest ? latestContest.rating : 1138;
    const peakRating = contestHistory.length
      ? Math.max(...contestHistory.map(c => c.rating))
      : currentRating;

    // Cache on Vercel CDN for 10 minutes (600s), stale-while-revalidate for 1 hour (3600s)
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');

    return res.status(200).json({
      success: true,
      username,
      fetchedAt: new Date().toISOString(),
      rating: currentRating,
      peakRating,
      division,
      contests: contestHistory.length,
      contestHistory,
      submissionMap,
      rawSubmissions
    });
  } catch (error) {
    console.error('Error fetching CodeChef profile:', error);
    return res.status(500).json({
      error: 'Failed to fetch CodeChef profile data',
      message: error.message
    });
  }
}
