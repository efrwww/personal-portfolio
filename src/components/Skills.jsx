import React, { useEffect, useState, useRef } from 'react'
import './Skills.css'

const Skills = () => {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [expandedTab, setExpandedTab] = useState(null)
  const [playingVideo, setPlayingVideo] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  // AIGC短片数据
  const aigcVideos = [
    { id: 6, title: 'AIGC短片作品一', thumbnail: '/33.jpg' },
    { id: 66, title: 'AIGC短片作品二', thumbnail: '/44.png' }
  ]

  // AI音乐数据 - 使用21.mp4
  const aiMusicData = {
    id: 21,
    title: 'AI音乐作品',
    description: '用AI技术创作的音乐作品展示'
  }

  const toggleTab = (tab) => {
    setExpandedTab(expandedTab === tab ? null : tab)
    setPlayingVideo(null)
    setIsFullscreen(false)
  }

  const playVideo = (id) => {
    setPlayingVideo(id)
    setIsFullscreen(false)
  }

  const closeVideo = () => {
    setPlayingVideo(null)
    setIsFullscreen(false)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoLoaded(true)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      {/* Video Background */}
      <div className="skills-video-container">
        <video
          ref={videoRef}
          className={`skills-video ${videoLoaded ? 'loaded' : ''}`}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/15.mp4" type="video/mp4" />
        </video>
        <div className="skills-video-overlay"></div>
      </div>

      <div className="container">
        <div className="skills-header">
          <h2 className="section-title">作品合集</h2>
          <p className="section-subtitle">多元化的技能组合，让我能够独立完成从创意到成品的全流程创作</p>
        </div>

        {/* Navigation Buttons */}
        <div className="skills-nav-buttons">
          <button className={`nav-share-btn ${expandedTab === 'aigc' ? 'active' : ''}`} onClick={() => toggleTab('aigc')}>
            <span>AIGC短片分享</span>
            <svg className="nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button className={`nav-share-btn ${expandedTab === 'music' ? 'active' : ''}`} onClick={() => toggleTab('music')}>
            <span>AI音乐分享</span>
            <svg className="nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Expandable Content */}
        <div className={`share-expand-content ${expandedTab === 'aigc' || expandedTab === 'music' ? 'expanded' : ''}`}>

          {/* AIGC Video Content */}
          {expandedTab === 'aigc' && (
            <div className="video-cards">
              {aigcVideos.map((video) => (
                <div key={video.id} className={`video-card ${playingVideo === video.id ? 'playing' : ''}`}>
                  {playingVideo === video.id ? (
                    <div className={`video-player ${isFullscreen ? 'fullscreen' : ''}`}>
                      <video
                        key={`video-${video.id}`}
                        src={`/${video.id}.mp4`}
                        controls
                        autoPlay
                        playsInline
                        className="video-element"
                      />
                      <button className="close-btn" onClick={closeVideo}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                      </button>
                      <button className="fullscreen-btn" onClick={toggleFullscreen}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="video-thumbnail" onClick={() => playVideo(video.id)} style={{ backgroundImage: `url(${video.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div className="play-button">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <span className="video-title">{video.title}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* AI Music Content */}
          {expandedTab === 'music' && (
            <div className="music-player-container">
              <div className="music-video-wrapper">
                <video
                  src="/48.mp4"
                  controls
                  autoPlay
                  playsInline
                  className="music-video"
                />
              </div>
              <div className="music-info-bar">
                <div className="music-info">
                  <h3>{aiMusicData.title}</h3>
                  <p>{aiMusicData.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Social Links Section - 仅在没有展开内容时显示 */}
        {!expandedTab && (
          <div className="social-links-section">
            <img src="/99.png" alt="社交媒体" className="social-image" />
            <p className="social-text">观看完整短片可以进我抖音——不止ai，更有"爱"</p>
            <a href="https://qishui.douyin.com/s/iQv2K6Fj/" target="_blank" rel="noopener noreferrer" className="social-link douyin-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              点击进入汽水音乐个人主页
            </a>
            <p className="social-description">这是我的汽水音乐制作人账号，可以在汽水音乐中打开进行听歌</p>
          </div>
        )}
      </div>

      <div className="skills-bg">
        <div className="bg-glow glow-1"></div>
        <div className="bg-glow glow-2"></div>
      </div>
    </section>
  )
}

export default Skills
