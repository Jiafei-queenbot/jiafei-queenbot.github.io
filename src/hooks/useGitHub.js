import { useState, useEffect, useCallback } from "react";

const GITHUB_API = "https://api.github.com";

/**
 * 自定义 Hook — 封装 GitHub API 调用
 * @param {string} username - GitHub 用户名
 */
export function useGitHub(username) {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!username || username === "your-username") {
      setLoading(false);
      return; // 未配置用户名，跳过请求
    }

    setLoading(true);
    setError(null);

    try {
      const [profileRes, reposRes] = await Promise.all([
        fetch(`${GITHUB_API}/users/${username}`),
        fetch(
          `${GITHUB_API}/users/${username}/repos?sort=stars&per_page=6&type=owner`
        ),
      ]);

      if (!profileRes.ok) {
        throw new Error(`User not found: ${profileRes.status}`);
      }

      const profileData = await profileRes.json();
      const reposData = reposRes.ok ? await reposRes.json() : [];

      setProfile(profileData);
      setRepos(reposData);
    } catch (err) {
      setError(err.message);
      console.error("GitHub fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { profile, repos, loading, error };
}

/**
 * 获取贡献日历数据（用于热力图）
 * 使用 GitHub 的 scraping 方式获取 SVG 贡献图
 */
export function useContributions(username) {
  const [weeks, setWeeks] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    if (!username || username === "your-username") return;

    // 通过 GitHub profile 页面的 contributions 数据来生成热力图
    // 这里我们使用一个简化的方案：解析公开的贡献数据
    const fetchContributions = async () => {
      try {
        // 使用 GitHub API 获取 events 作为贡献指示
        const res = await fetch(
          `${GITHUB_API}/users/${username}/events/public?per_page=100`
        );
        if (!res.ok) return;
        const events = await res.json();

        // 将 events 按日期聚合
        const dateMap = {};
        const now = new Date();
        const oneYearAgo = new Date(now);
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        // 初始化过去一年的所有日期
        for (let d = new Date(oneYearAgo); d <= now; d.setDate(d.getDate() + 1)) {
          const key = d.toISOString().split("T")[0];
          dateMap[key] = 0;
        }

        // 填充 event 计数
        events.forEach((event) => {
          const key = event.created_at.split("T")[0];
          if (dateMap[key] !== undefined) {
            dateMap[key]++;
          }
        });

        // 转换为周格式（类似 GitHub 热力图）
        const dates = Object.entries(dateMap).sort();
        const weekData = [];
        let currentWeek = [];

        dates.forEach(([date, count], i) => {
          const dayOfWeek = new Date(date).getDay();
          currentWeek.push({ date, count, level: getLevel(count) });

          if (dayOfWeek === 6 || i === dates.length - 1) {
            if (currentWeek.length > 0) weekData.push(currentWeek);
            currentWeek = [];
          }
        });

        const total = Object.values(dateMap).reduce((a, b) => a + b, 0);
        setWeeks(weekData);
        setTotalContributions(total);
      } catch (e) {
        console.error("Contributions fetch error:", e);
      }
    };

    fetchContributions();
  }, [username]);

  return { weeks, totalContributions };
}

function getLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}
