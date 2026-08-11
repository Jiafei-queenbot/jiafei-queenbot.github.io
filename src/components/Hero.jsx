import config from "../config";
import { useGitHub } from "../hooks/useGitHub";
import "./Hero.css";

export default function Hero() {
  const { profile, loading } = useGitHub(config.githubUsername);

  return (
    <section id="home" className="hero-section">
      <div className="container hero-content">
        {/* 头像 */}
        <div className="hero-avatar-wrapper">
          <div className="hero-avatar-ring">
            <img
              src={
                profile?.avatar_url ||
                `https://ui-avatars.com/api/?name=${config.name}&size=200&background=667eea&color=fff&bold=true`
              }
              alt={config.name}
              className="hero-avatar"
            />
          </div>
        </div>

        {/* 姓名 & 简介 */}
        <h1 className="hero-name">{config.name}</h1>
        <p className="hero-title">{config.title}</p>
        <p className="hero-bio">{config.bio}</p>

        {/* 技能标签 */}
        <div className="hero-skills">
          {config.skills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>

        {/* GitHub 统计卡片 */}
        {profile && (
          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-number">{profile.public_repos}</span>
              <span className="stat-label">Repos</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{profile.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{profile.following}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
        )}

        {/* CTA */}
        <a
          href={`https://github.com/${config.githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta"
        >
          View My GitHub
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </a>
      </div>

      {/* 背景装饰 */}
      <div className="hero-bg-decor">
        <div className="decor-circle c1" />
        <div className="decor-circle c2" />
        <div className="decor-circle c3" />
      </div>
    </section>
  );
}
