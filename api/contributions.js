// Vercel serverless function: the GitHub contribution calendar for the hero card.
// The token stays on the server (env GITHUB_TOKEN); the browser only sees the counts.
// The login is fixed, so the endpoint cannot be used to query other users.
const LOGIN = "tobolovskaya";
const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount contributionLevel } }
      }
    }
  }
}`;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) return res.status(500).json({ error: "Not configured" });

  try {
    const r = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "my-portfolio",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
      signal: AbortSignal.timeout(8000),
    });
    const json = await r.json();
    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!r.ok || !cal) return res.status(502).json({ error: "GitHub request failed" });

    const weeks = cal.weeks.map((w) =>
      w.contributionDays.map((d) => [d.date, d.contributionCount, LEVELS[d.contributionLevel] ?? 0])
    );

    // Cache at the edge: GitHub is asked at most every 6 hours.
    res.setHeader("Cache-Control", "public, s-maxage=21600, stale-while-revalidate=86400");
    return res.status(200).json({ total: cal.totalContributions, weeks });
  } catch {
    return res.status(502).json({ error: "GitHub request failed" });
  }
}
