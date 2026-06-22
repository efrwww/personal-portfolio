import React, { useEffect, useState, useRef } from 'react'
import './Portfolio.css'

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('video')
  const [videoLoaded, setVideoLoaded] = useState(false)
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filters = [
    { id: 'video', label: '视频预览' },
    { id: 'body', label: '机身' },
    { id: 'result', label: '效果图' },
    { id: 'summary', label: '总结' }
  ]

  const projects = [
    {
      id: 1,
      category: 'video',
      title: '尼康D810拍摄',
      desc: '用镜头捕捉城市夜景的独特魅力',
      image: '/video-preview1.mp4',
      tags: ['视频', '展示'],
      isVideo: true,
      videoSrc: '/video-preview1.mp4'
    },
    {
      id: 2,
      category: 'video',
      title: 'Avatar2拍摄',
      desc: '穿越机第一视角拍摄',
      image: '/video-preview2.mp4',
      tags: ['视频', 'FPV'],
      isVideo: true,
      videoSrc: '/video-preview2.mp4'
    },
    {
      id: 3,
      category: 'body',
      title: 'D810',
      desc: '全画幅单反，高画质表现',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=800&fit=crop',
      tags: ['单反', '全画幅'],
      isVideo: false
    },
    {
      id: 4,
      category: 'body',
      title: '大疆Avatar2',
      desc: '穿越机第一视角',
      image: '/images/dji-avatar2.jpg',
      tags: ['穿越机', 'FPV']
    },
    {
      id: 9,
      category: 'result',
      title: 'D810拍摄',
      desc: '城市风光摄影作品',
      image: '/images/result1.png',
      tags: ['效果', '风光']
    },
    {
      id: 10,
      category: 'result',
      title: 'D810拍摄',
      desc: '人像摄影作品',
      image: '/images/result2.png',
      tags: ['效果', '人像']
    },
    {
      id: 11,
      category: 'summary',
      title: '尼康85定焦人像头',
      desc: '镜头类型：人像定焦',
      image: '/images/尼康85定焦人像头.jpg',
      tags: ['人像', '定焦']
    },
    {
      id: 12,
      category: 'summary',
      title: '尼康AF 80-200镜头',
      desc: '镜头类型：中长焦变焦',
      image: '/images/尼康AF 80-200镜头.jpg',
      tags: ['中长焦', '变焦']
    },
    {
      id: 13,
      category: 'summary',
      title: '图丽16-28超广角镜头',
      desc: '镜头类型：超广角风光',
      image: '/images/图丽16-28超广角镜头.jpg',
      tags: ['超广角', '风光']
    }
  ]

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="portfolio" className="portfolio" ref={sectionRef}>
      {/* Video Background */}
      <div className="portfolio-video-container">
        <video
          ref={videoRef}
          className={`portfolio-video ${videoLoaded ? 'loaded' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src="/portfolio-video.mp4" type="video/mp4" />
        </video>
        <div className="portfolio-video-overlay"></div>
      </div>

      <div className="container">
        <div className="portfolio-header">
          <div className="section-label">
            <span>{activeFilter === 'summary' ? '作品集' : '设备清单'}</span>
          </div>
          <h2 className="section-title">{activeFilter === 'summary' ? '我的AIGC作品集' : '摄影装备'}</h2>
        </div>

        {/* Filters */}
        <div className={`filter-bar ${isVisible ? 'visible' : ''}`}>
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {activeFilter === 'summary' ? (
          /* 总结页面 - 三个图片在一排 */
          <div className="summary-container">
            <div className="summary-images">
              {filteredProjects.map((project, i) => (
                <div
                  key={project.id}
                  className="summary-card"
                  style={{ '--delay': `${i * 0.1}s` }}
                >
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="summary-info">
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="summary-text">
              <p>以上镜头具备广角、中长焦和人像拍摄以及摄影优势，同时借助无人机具备良好的宣传拍摄能力。</p>
            </div>
          </div>
        ) : (
          <div className={`projects-grid ${isVisible ? 'visible' : ''}`}>
            {filteredProjects.map((project, i) => (
              <div
                key={project.id}
                className="project-card"
                style={{ '--delay': `${i * 0.1}s` }}
              >
                <div className="project-media">
                  {project.isVideo ? (
                    <video
                      className="body-video"
                      src={project.videoSrc}
                      muted
                      playsInline
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => {
                        e.target.pause()
                        e.target.currentTime = 0
                      }}
                    />
                  ) : (
                    <img src={project.image} alt={project.title} loading="lazy" />
                  )}
                </div>
                <div className="project-info">
                  <div className="project-tags">
                    {project.tags.map((tag, j) => (
                      <span key={j}>{tag}</span>
                    ))}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Portfolio
