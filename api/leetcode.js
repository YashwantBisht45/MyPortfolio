/**
 * Vercel Serverless Function: /api/leetcode
 * Directly queries LeetCode's official GraphQL API from the server side,
 * retrieving live contest ratings, contest history, problem counts, streak, and calendar.
 * Bypasses third-party public proxy rate limits (HTTP 429).
 */
export default async function handler(req, res) {
  // Set CORS headers for safe cross-origin access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { username = 'YashwantBisht196' } = req.query || {};

  const query = `
    query getUserFullProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        userCalendar {
          streak
          totalActiveDays
          submissionCalendar
        }
      }
      userContestRanking(username: $username) {
        attendedContestsCount
        rating
        globalRanking
        totalParticipants
        topPercentage
      }
      userContestRankingHistory(username: $username) {
        attended
        rating
        ranking
        contest {
          title
          startTime
        }
      }
    }
  `;

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': `https://leetcode.com/u/${encodeURIComponent(username)}/`
      },
      body: JSON.stringify({
        query,
        variables: { username }
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `LeetCode GraphQL returned status ${response.status}`,
        source: 'upstream'
      });
    }

    const json = await response.json();
    const data = json.data;

    if (!data || !data.matchedUser) {
      return res.status(404).json({
        error: `User ${username} not found on LeetCode`
      });
    }

    // 1. Solved problems breakdown
    const acList = data.matchedUser.submitStatsGlobal?.acSubmissionNum || [];
    const totalSolved = acList.find(a => a.difficulty === 'All')?.count || 0;
    const easySolved = acList.find(a => a.difficulty === 'Easy')?.count || 0;
    const mediumSolved = acList.find(a => a.difficulty === 'Medium')?.count || 0;
    const hardSolved = acList.find(a => a.difficulty === 'Hard')?.count || 0;

    // 2. Calendar and streak
    const userCal = data.matchedUser.userCalendar || {};
    const streak = userCal.streak ?? 57;
    const totalActiveDays = userCal.totalActiveDays ?? 114;
    let rawCalendar = {};
    if (userCal.submissionCalendar) {
      try {
        rawCalendar = typeof userCal.submissionCalendar === 'string'
          ? JSON.parse(userCal.submissionCalendar)
          : userCal.submissionCalendar;
      } catch (e) {
        console.error('Failed to parse LeetCode submissionCalendar:', e);
      }
    }

    const submissionMap = {};
    Object.entries(rawCalendar).forEach(([timestamp, count]) => {
      const date = new Date(parseInt(timestamp, 10) * 1000);
      const dateStr = date.toISOString().split('T')[0];
      submissionMap[dateStr] = count;
    });

    // 3. Contest Ranking & History
    const contestRanking = data.userContestRanking || {};
    const rawHistory = data.userContestRankingHistory || [];
    const attended = rawHistory.filter(c => c.attended);

    const contestHistory = attended.map(c => ({
      contestName: c.contest?.title || 'LeetCode Contest',
      date: new Date((c.contest?.startTime || 0) * 1000).toISOString().split('T')[0],
      displayDate: new Date((c.contest?.startTime || 0) * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      rating: Math.round(c.rating),
      rawRating: c.rating,
      rank: c.ranking
    }));

    const currentRating = contestRanking.rating
      ? Math.round(contestRanking.rating)
      : (contestHistory.length ? contestHistory[contestHistory.length - 1].rating : 1287);

    const peakRating = contestHistory.length
      ? Math.max(...contestHistory.map(c => c.rating))
      : 1414;

    // Cache on Vercel Edge for 10 minutes (600s), stale-while-revalidate for 1 hour (3600s)
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');

    return res.status(200).json({
      success: true,
      username,
      fetchedAt: new Date().toISOString(),
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      streak,
      totalActiveDays,
      submissionMap,
      rawCalendar,
      currentRating,
      rawCurrentRating: contestRanking.rating || currentRating,
      peakRating,
      globalRanking: contestRanking.globalRanking,
      attendedCount: contestRanking.attendedContestsCount || contestHistory.length,
      contestHistory
    });
  } catch (error) {
    console.error('Error in /api/leetcode:', error);
    return res.status(500).json({
      error: 'Failed to fetch LeetCode data',
      message: error.message
    });
  }
}
