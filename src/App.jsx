import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Benefits from './components/Benefits'
import Contact from './components/Contact'
import './styles/global.css'
import './App.css'

function App() {
  return (
    <div className="app">
      <Hero />
      <About />
      <Portfolio />
      <Skills />
      <Projects />
      <Benefits />
      <Contact />
    </div>
  )
}

export default App
