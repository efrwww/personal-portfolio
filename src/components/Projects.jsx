import React, { useEffect, useState, useRef } from 'react'
import './Projects.css'

// 白色粒子效果组件
const Particles = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <canvas ref={canvasRef} className="particles-canvas" />
}

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const sectionRef = useRef(null)

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

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      {/* Video Background */}
      <div className="projects-video-container">
        <video
          className={`projects-video ${videoLoaded ? 'loaded' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src="https://aasaca.b-cdn.net/y.mp4" type="video/mp4" />
        </video>
        <div className="projects-video-overlay"></div>
      </div>

      {/* White Particles Effect */}
      <Particles />

      <div className="container">
        <div className={`projects-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">用青春脚步丈量乡村</h2>
          <p className="section-subtitle">
            每一段下乡经历都是成长，每一次镜头记录都是传承
          </p>
        </div>

        {/* Project Card */}
        <div className={`project-card-main ${isVisible ? 'visible' : ''}`}>
          <h3 className="project-title">重庆市开州区"刘帅故里·丰盛开州"传媒类三下乡</h3>

          <div className="project-info-grid">
            <div className="info-item">
              <span className="info-label">地点</span>
              <span className="info-value">汉丰街道</span>
            </div>
            <div className="info-item">
              <span className="info-label">报名时间</span>
              <span className="info-value">6.18-7.3</span>
            </div>
            <div className="info-item">
              <span className="info-label">服务时间</span>
              <span className="info-value">7.8-8.31</span>
            </div>
            <div className="info-item">
              <span className="info-label">导师指导</span>
              <span className="info-value">有</span>
            </div>
            <div className="info-item">
              <span className="info-label">聚焦</span>
              <span className="info-value">学农助农</span>
            </div>
            <div className="info-item">
              <span className="info-label">所需人数</span>
              <span className="info-value">5人</span>
            </div>
          </div>

          <div className="project-work">
            <h4>工作内容</h4>
            <p>拍摄文旅影像，设计本土IP文创、运营账号直播带货、开设乡村美育课程，最终整理成果形成报告交付当地。</p>
          </div>
        </div>

        {/* Team Division */}
        <div className={`team-section ${isVisible ? 'visible' : ''}`}>
          <h4 className="team-title">分工表</h4>
          <p className="team-note">报名页面分工看这里</p>

          <div className="team-grid">
            <div className="team-card">
              <span className="team-number">1号</span>
              <h5>摄像纪实</h5>
              <p>负责文旅宣传片、纪录片、乡村风光，民俗、托管营地全程拍摄，素材初剪。</p>
            </div>
            <div className="team-card">
              <span className="team-number">2号</span>
              <h5>视觉文创</h5>
              <p>挖掘开州本土元素，设计文旅IP、文创物料，制作科普动画、各类宣传短片。</p>
            </div>
            <div className="team-card">
              <span className="team-number">3号</span>
              <h5>新媒体运营</h5>
              <p>打理短视频平台账号，撰写农产，手作文案，策划并执行助农直播。</p>
            </div>
            <div className="team-card">
              <span className="team-number">4号</span>
              <h5>美育教学</h5>
              <p>主讲托管营绘画、短视频实操课程，同步记录营地活动素材，配合宣传。</p>
            </div>
            <div className="team-card">
              <span className="team-number">5号</span>
              <h5>统筹资料</h5>
              <p>协调团队进度，对接当地团委，汇总影像、运营，教学全部数据，撰写实践总结报告。</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`project-cta ${isVisible ? 'visible' : ''}`}>
          <h4>准备好开启你的实践之旅了吗？</h4>
          <p>加入我们，一起用创意点亮乡村，用行动书写青春</p>
          <div className="cta-buttons">
            <a
              href="https://ttjyb-sj.vysoft.net.cn/h5/#/pages/tacklingKey/tacklingNeeds?types=1&ids=4328"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              查看项目详情
            </a>
            <button
              className="btn-secondary"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              立即加入
            </button>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="projects-bg">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
      </div>
    </section>
  )
}

export default Projects
