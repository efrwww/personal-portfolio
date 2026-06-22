import React, { useEffect, useState, useRef } from 'react'
import './Contact.css'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      {/* Video Background */}
      <div className="contact-video-container">
        <video
          className={`contact-video ${videoLoaded ? 'loaded' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src="https://aasaca.b-cdn.net/contact-bg.mp4" type="video/mp4" />
        </video>
        <div className="contact-video-overlay"></div>
      </div>

      <div className="contact-bg">
        <div className="bg-gradient"></div>
        <div className="bg-glow glow-1"></div>
        <div className="bg-glow glow-2"></div>
      </div>

      <div className="container">
        <div className={`contact-content ${isVisible ? 'visible' : ''}`}>
          {/* Contact Info */}
          <div className="contact-info-center">
            <h2 className="contact-title">如果有意愿请联系我</h2>
            <p className="contact-subtitle">给我发消息，我会尽快回复你</p>

            <div className="contact-message">
              <p>QQ号：2817629009</p>
              <p>微信号: wxid_iyhc05pt8ony22</p>
              <p>个人邮箱：<a href="mailto:hvc88@qq.com">hvc88@qq.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
