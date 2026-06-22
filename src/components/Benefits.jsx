import React, { useEffect, useState } from 'react'
import './Benefits.css'

const Benefits = () => {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    const section = document.getElementById('benefits')
    if (section) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="benefits" className="benefits">
      {/* Video Background */}
      <div className="benefits-video-container">
        <video
          className={`benefits-video ${videoLoaded ? 'loaded' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src="https://aasaca.b-cdn.net/100.mp4" type="video/mp4" />
        </video>
        <div className="benefits-video-overlay"></div>
      </div>

      <div className="container">
        <div className={`benefits-header ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">在这里，你能获得什么</h2>
          <p className="section-subtitle">
            加入我们，不只是参与，更是成长与收获
          </p>
          <p className="section-slogan">
            用心去感受，大胆去追逐，勇敢的人先享受世界
          </p>
        </div>
      </div>

      {/* Background Glow */}
      <div className="benefits-bg">
        <div className="bg-glow glow-1"></div>
        <div className="bg-glow glow-2"></div>
      </div>
    </section>
  )
}

export default Benefits
