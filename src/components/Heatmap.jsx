import { useContributions } from "../hooks/useGitHub";
import config from "../config";
import "./Heatmap.css";

const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

export default function Heatmap() {
  const { weeks, totalContributions } = useContributions(config.githubUsername);
  const isPlaceholder = config.githubUsername === "your-username";

  if (isPlaceholder) return null;

  if (weeks.length === 0) {
    return (
      <section className="section heatmap-section">
        <div className="container">
          <h2 className="section-title">Contributions</h2>
          <p className="section-subtitle">GitHub 贡献日历</p>
          <p className="placeholder-msg">配置 GitHub 用户名后自动展示</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section heatmap-section">
      <div className="container">
        <h2 className="section-title">Contributions</h2>
        <p className="section-subtitle">
          过去一年共 {totalContributions} 次贡献
        </p>

        <div className="heatmap-wrapper">
          <div className="heatmap-grid">
            {weeks.map((week, wi) => (
              <div key={wi} className="heatmap-week">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className={`heatmap-day level-${day.level}`}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* 图例 */}
          <div className="heatmap-legend">
            <span>Less</span>
            <span className="legend-dot level-0" />
            <span className="legend-dot level-1" />
            <span className="legend-dot level-2" />
            <span className="legend-dot level-3" />
            <span className="legend-dot level-4" />
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
