import React, { useEffect, useState, useRef } from 'react'
import './Hero.css'
import DotField from './DotField'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      {/* Video Background */}
      <div className="hero-video-container">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Dot Field Effect */}
      <DotField
        dotRadius={2}
        dotSpacing={18}
        cursorRadius={200}
        bulgeStrength={80}
        glowRadius={120}
        gradientFrom="rgba(255, 255, 255, 0.15)"
        gradientTo="rgba(255, 255, 255, 0.08)"
        glowColor="rgba(255, 255, 255, 0.3)"
        style={{ zIndex: 5 }}
      />

      {/* Navigation */}
      <nav className="hero-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <span>AURA</span>
          </div>
          <div className="nav-links">
            <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>个人介绍</a>
            <a href="#portfolio" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('portfolio'); }}>作品合集</a>
            <a href="#projects" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>三下乡项目</a>
            <a href="#benefits" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('benefits'); }}>你的收获</a>
          </div>
          <div className="nav-cta" onClick={() => scrollTo('contact')}>
            加入我们
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
        <div className="hero-inner">
          {/* Main Title */}
          <h1 className="hero-title">
            <span className="title-line">用创意</span>
            <span className="title-line">点亮青春</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            暑假三下乡大学生社会实践团队招募中
          </p>

          {/* CTA Buttons - Centered */}
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => scrollTo('contact')}>
              <span>相识你我</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('projects')}>
              <span>三下乡项目</span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="hero-scroll" onClick={() => scrollTo('about')}>
            <div className="scroll-indicator">
              <div className="scroll-line"></div>
              <div className="scroll-dot"></div>
            </div>
            <span className="scroll-text">向下探索</span>
            <div className="scroll-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
            <div className="scroll-glow"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
