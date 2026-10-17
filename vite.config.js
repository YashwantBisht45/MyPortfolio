import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'codechef-api-dev-server',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith('/api/codechef')) {
            try {
              const url = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
              const username = url.searchParams.get('username') || 'cse_29_1307';
              
              const upstream = await fetch(`https://www.codechef.com/users/${encodeURIComponent(username)}`, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                }
              });

              if (!upstream.ok) {
                res.statusCode = upstream.status;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: `CodeChef returned HTTP status ${upstream.status}` }));
              }

              const html = await upstream.text();

              // Extract userDailySubmissionsStats
              const subMatch = html.match(/userDailySubmissionsStats\s*=\s*(\[.*?\]);/s);
              const rawSubmissions = subMatch ? JSON.parse(subMatch[1]) : [];

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

              // Extract all_rating
              const ratingMatch = html.match(/var all_rating = (\[.*?\]);/s);
              const rawContests = ratingMatch ? JSON.parse(ratingMatch[1]) : [];
              const contestHistory = rawContests.map(c => {
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

              const divMatch = html.match(/\((Div\s*\d+)\)/);
              const division = divMatch ? divMatch[1] : 'Div 4';
              const latestContest = contestHistory.length ? contestHistory[contestHistory.length - 1] : null;
              const currentRating = latestContest ? latestContest.rating : 1138;
              const peakRating = contestHistory.length ? Math.max(...contestHistory.map(c => c.rating)) : currentRating;

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
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
              }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
            return;
          }

          if (req.url && req.url.startsWith('/api/leetcode')) {
            try {
              const url = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
              const username = url.searchParams.get('username') || 'YashwantBisht196';

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

              const upstream = await fetch('https://leetcode.com/graphql', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                  'Referer': `https://leetcode.com/u/${encodeURIComponent(username)}/`
                },
                body: JSON.stringify({ query, variables: { username } })
              });

              if (!upstream.ok) {
                res.statusCode = upstream.status;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: `LeetCode GraphQL returned status ${upstream.status}` }));
              }

              const json = await upstream.json();
              const data = json.data;

              if (!data || !data.matchedUser) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'User not found' }));
              }

              const acList = data.matchedUser.submitStatsGlobal?.acSubmissionNum || [];
              const totalSolved = acList.find(a => a.difficulty === 'All')?.count || 0;
              const easySolved = acList.find(a => a.difficulty === 'Easy')?.count || 0;
              const mediumSolved = acList.find(a => a.difficulty === 'Medium')?.count || 0;
              const hardSolved = acList.find(a => a.difficulty === 'Hard')?.count || 0;

              const userCal = data.matchedUser.userCalendar || {};
              const streak = userCal.streak ?? 57;
              const totalActiveDays = userCal.totalActiveDays ?? 114;
              let rawCalendar = {};
              if (userCal.submissionCalendar) {
                try {
                  rawCalendar = typeof userCal.submissionCalendar === 'string'
                    ? JSON.parse(userCal.submissionCalendar)
                    : userCal.submissionCalendar;
                } catch (e) {}
              }

              const submissionMap = {};
              Object.entries(rawCalendar).forEach(([timestamp, count]) => {
                const date = new Date(parseInt(timestamp, 10) * 1000);
                const dateStr = date.toISOString().split('T')[0];
                submissionMap[dateStr] = count;
              });

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

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
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
                currentRating,
                rawCurrentRating: contestRanking.rating || currentRating,
                peakRating,
                globalRanking: contestRanking.globalRanking,
                attendedCount: contestRanking.attendedContestsCount || contestHistory.length,
                contestHistory
              }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
            return;
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    open: false
  }
})
