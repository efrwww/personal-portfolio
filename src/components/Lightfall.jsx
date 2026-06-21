import React, { useEffect, useRef, useCallback } from 'react'

const Lightfall = ({
  colors = ['#A6C8FF', '#4A90FF', '#2563EB'],
  backgroundColor = '#060810',
  speed = 0.6,
  streakCount = 3,
  streakWidth = 1,
  streakLength = 0.9,
  glow = 1.1,
  density = 0.8,
  twinkle = 1,
  zoom = 3.5,
  backgroundGlow = 0.8,
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 0.6,
  mouseRadius = 1.2,
  color1,
  color2,
  color3,
}) => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef([])
  const animationRef = useRef(null)

  // Use custom colors if provided
  const finalColors = [
    color1 || colors[0],
    color2 || colors[1],
    color3 || colors[2]
  ]

  const createParticle = useCallback((canvas) => {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const color = finalColors[Math.floor(Math.random() * finalColors.length)]
    const size = (Math.random() * 2 + 1) * density
    const speedX = (Math.random() - 0.5) * speed * 0.5
    const speedY = -Math.random() * speed * 1.5 - 0.5
    const opacity = Math.random() * 0.5 + 0.3
    const streak = Math.random() > 0.7
    const length = streak ? streakLength * (50 + Math.random() * 100) : 20 + Math.random() * 40

    return {
      x, y, color, size, speedX, speedY,
      opacity, streak, length,
      angle: Math.atan2(speedY, speedX),
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.02 + Math.random() * 0.03
    }
  }, [finalColors, density, speed, streakLength])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initParticles = () => {
      particles = []
      const count = Math.floor((canvas.width * canvas.height) / (15000 / density))
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(canvas))
      }
    }

    const drawGlow = (x, y, radius, color) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * glow)
      gradient.addColorStop(0, color)
      gradient.addColorStop(0.4, color.replace(')', ', 0.4)').replace('rgb', 'rgba'))
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius * glow, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawStreak = (particle) => {
      const tailX = particle.x - Math.cos(particle.angle) * particle.length
      const tailY = particle.y - Math.sin(particle.angle) * particle.length

      const gradient = ctx.createLinearGradient(tailX, tailY, particle.x, particle.y)
      gradient.addColorStop(0, 'transparent')
      gradient.addColorStop(1, particle.color)

      ctx.beginPath()
      ctx.moveTo(tailX, tailY)
      ctx.lineTo(particle.x, particle.y)
      ctx.strokeStyle = gradient
      ctx.lineWidth = particle.size * streakWidth
      ctx.lineCap = 'round'
      ctx.stroke()

      // Glow effect
      ctx.shadowBlur = 15 * glow
      ctx.shadowColor = particle.color
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    const drawTwinkle = (particle) => {
      const twinkleValue = (Math.sin(particle.twinklePhase) + 1) / 2
      const currentOpacity = particle.opacity * (0.5 + twinkleValue * twinkle * 0.5)
      return currentOpacity
    }

    const animate = () => {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Background glow
      if (backgroundGlow > 0) {
        const bgGradient = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, canvas.width / zoom
        )
        bgGradient.addColorStop(0, `rgba(30, 144, 255, ${0.05 * backgroundGlow})`)
        bgGradient.addColorStop(0.5, `rgba(30, 144, 255, ${0.02 * backgroundGlow})`)
        bgGradient.addColorStop(1, 'transparent')
        ctx.fillStyle = bgGradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // Mouse interaction - attract particles
      let mouseX = mouseRef.current.x
      let mouseY = mouseRef.current.y

      particles.forEach(particle => {
        // Update twinkle
        particle.twinklePhase += particle.twinkleSpeed

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Mouse attraction
        if (mouseInteraction && mouseX > 0) {
          const dx = mouseX - particle.x
          const dy = mouseY - particle.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < canvas.width / mouseRadius) {
            const force = (1 - dist / (canvas.width / mouseRadius)) * mouseStrength
            particle.x += dx * force * 0.02
            particle.y += dy * force * 0.02
          }
        }

        // Reset particles that go off screen
        if (particle.y < -50 || particle.x < -50 || particle.x > canvas.width + 50) {
          const newParticle = createParticle(canvas)
          newParticle.y = canvas.height + 10
          newParticle.x = Math.random() * canvas.width
          Object.assign(particle, newParticle)
        }

        // Draw particle
        ctx.globalAlpha = drawTwinkle(particle) * opacity

        if (particle.streak) {
          drawStreak(particle)
        } else {
          // Glow effect
          drawGlow(particle.x, particle.y, particle.size * 3, particle.color)

          // Core
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()

    const handleResize = () => {
      resize()
      initParticles()
    }

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [createParticle, backgroundColor, backgroundGlow, glow, mouseInteraction, mouseRadius, mouseStrength, opacity, streakWidth, twinkle, zoom])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  )
}

export default Lightfall
