import React, { useEffect, useState, useRef } from 'react'
import './About.css'

const About = () => {
  const [animationPhase, setAnimationPhase] = useState('idle') // idle, animating, done
  const [videoLoaded, setVideoLoaded] = useState(false)
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    let timeoutId = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (timeoutId) clearTimeout(timeoutId)
          setAnimationPhase('animating')
          // 动画完成后设置为done
          timeoutId = setTimeout(() => {
            setAnimationPhase('done')
          }, 1600) // 1.6秒后切换到"个人介绍"并显示内容
        } else {
          setAnimationPhase('idle')
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const categories = [
    { id: 'portfolio', label: '摄影师' },
    { id: 'portfolio', label: 'AICG创作者' },
    { id: 'portfolio', label: 'AI音乐制作' },
    { id: 'projects', label: '智慧课件教学' }
  ]

  return (
    <section id="about" className="about" ref={sectionRef}>
      {/* Video Background */}
      <div className="about-video-container">
        <video
          ref={videoRef}
          className={`about-video ${videoLoaded ? 'loaded' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src="/about-video.mp4" type="video/mp4" />
        </video>
        <div className="about-video-overlay"></div>
        <div className={`about-dark-overlay ${animationPhase === 'done' ? 'visible' : ''}`}></div>
      </div>

      <div className="container">
        {/* Header - Title Animation */}
        <div className="about-header">
          <h2 className={`section-title ${animationPhase}`}>
            <span className="title-text title-slogan">用创意点亮每一个瞬间</span>
            <span className="title-text title-label">个人介绍</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className={`about-content ${animationPhase === 'done' ? 'visible' : ''}`}>
          {/* Particle Effect */}
          <div className="particle-container">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" style={{ '--i': i }}></div>
            ))}
          </div>

          {/* Top Row - Avatar & Bio */}
          <div className="about-top">
            {/* Avatar */}
            <div className="avatar-section">
              <div className="avatar-wrapper">
                <div className="avatar-glow"></div>
                <img
                  src="/images/avatar.jpg"
                  alt="个人照片"
                  className="avatar-img"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="bio-section">
              <div className="bio-card">
                <div className="rainbow-line"></div>
                <h3>你好，我是组织者</h3>
                <p>
                  一名学习广泛的爱好者和探索者，大部分时间靠好奇心来学习，
                  导致下方四个技能都学习的比较粗浅。
                </p>
                <p>
                  但我相信敢于迈出总比停滞不前好，什么事都去闯一下才能知道世界的辽阔。
                </p>
                <p>
                  如果感兴趣可以通过抖音私聊我，抖音号：3mima96928，本人和善，沟通请放心，有问题尽管哈。
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row - Category Cards */}
          <div className="category-nav">
            {categories.map((item, i) => (
              <div
                key={i}
                className="category-card"
                onClick={() => scrollTo(item.id)}
                style={{ '--delay': `${i * 0.1}s` }}
              >
                <span className="category-label">{item.label}</span>
                <svg className="category-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
