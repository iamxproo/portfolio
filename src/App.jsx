import { useEffect, useRef, useState } from 'react'
import './App.css'

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact']
const WORDS = ['Full Stack Java Developer', 'Spring Boot Engineer', 'React.js Developer', 'REST API Builder']

const SKILLS = [
  { name: 'Java',        icon: '☕',  color: '#f89820', bg: '#f8982015' },
  { name: 'Spring Boot', icon: 'SB',  color: '#6db33f', bg: '#6db33f15' },
  { name: 'React.js',    icon: '⚛',   color: '#61dafb', bg: '#61dafb15' },
  { name: 'JavaScript',  icon: 'JS',  color: '#f7df1e', bg: '#f7df1e15' },
  { name: 'MySQL',       icon: 'SQL', color: '#4479a1', bg: '#4479a115' },
  { name: 'MongoDB',     icon: 'DB',  color: '#47a248', bg: '#47a24815' },
  { name: 'REST APIs',   icon: 'API', color: '#7c3aed', bg: '#7c3aed15' },
  { name: 'JWT Auth',    icon: '🔐',  color: '#f59e0b', bg: '#f59e0b15' },
  { name: 'Docker',      icon: '🐳',  color: '#2496ed', bg: '#2496ed15' },
  { name: 'Git',         icon: 'Git', color: '#f05032', bg: '#f0503215' },
  { name: 'Hibernate',   icon: 'HB',  color: '#59666c', bg: '#59666c20' },
  { name: 'Microservices', icon: 'MS', color: '#10b981', bg: '#10b98115' },
]

const PROJECTS = [
  {
    title: 'Imperial Time',
    subtitle: 'E-Commerce Platform',
    desc: 'A full-stack luxury watch store built with Spring Boot, React.js & MySQL. Features 15+ RESTful APIs, JWT auth, User & Admin dashboards, cart, wishlist, order tracking, and payment gateway integration.',
    tags: ['Spring Boot', 'React.js', 'MySQL', 'JWT', 'REST API'],
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg,#7c3aed22,#3b82f622)',
    github: 'https://github.com/iamxproo',
    live: 'https://imperial-time.vercel.app',
    num: '01',
  },
  {
    title: 'Microservices E-Commerce',
    subtitle: 'Microservices Architecture',
    desc: 'Scalable eCommerce platform following microservices architecture with independent services for users, products, orders & payments communicating via REST APIs with JWT auth.',
    tags: ['Spring Boot', 'Microservices', 'React.js', 'MySQL', 'JWT'],
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg,#0ea5e922,#10b98122)',
    github: 'https://github.com/iamxproo',
    num: '02',
  },
  {
    title: 'TrustElect',
    subtitle: 'Online Voting System',
    desc: 'Secure web-based voting platform with JWT authentication, role-based authorization, Voter & Admin panels for candidate management, vote casting, and real-time result monitoring.',
    tags: ['Spring Boot', 'React.js', 'MySQL', 'JWT', 'Spring Security'],
    color: '#10b981',
    gradient: 'linear-gradient(135deg,#10b98122,#f59e0b22)',
    github: 'https://github.com/iamxproo',
    live: 'https://trust-elect-the-online-voting-syste.vercel.app',
    num: '03',
  },
  {
    title: 'Freelance Dev Projects',
    subtitle: 'Academic & Client Projects',
    desc: 'Independently designed and delivered professional final-year engineering projects for students — full-stack apps with backend APIs, frontend interfaces, and database integration using Java, Spring Boot, React.js & MySQL.',
    tags: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'Python'],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg,#f59e0b22,#ef444422)',
    github: 'https://github.com/iamxproo',
    num: '04',
  },
]

const EDUCATION = [
  {
    degree: 'B.Tech in Information Technology',
    school: 'DY Patil Institute of Engineering and Technology',
    period: '2022 – 2025',
    grade: '8.56 CGPA',
    icon: '🎓',
  },
  {
    degree: 'Diploma in Computer Engineering',
    school: 'Samarth Polytechnic, Belhe',
    period: '2019 – 2022',
    grade: '80.40%',
    icon: '📜',
  },
]

const CERTS = [
  { title: 'Full Stack Java Developer', issuer: 'Kiran Academy', icon: '☕', color: '#f89820' },
  { title: 'Java (Basic) Certificate', issuer: 'HackerRank', icon: '✅', color: '#10b981' },
]

const EXPERIENCE = [
  {
    role: 'Trainee Fullstack Java Developer',
    company: 'SmartMatrix Digital Services Pvt. Ltd.',
    period: 'Jan 2025 – Feb 2026',
    type: 'Internship',
    desc: 'Completed a 1-year internship building real-world web applications. Developed backend APIs with Java & Spring Boot, integrated React frontends with RESTful APIs, implemented JWT-based authentication & role-based authorization, and worked on MySQL database design.',
    skills: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'JWT', 'REST APIs'],
  },
  {
    role: 'Freelance Project Developer',
    company: 'Self-Employed',
    period: '2024 – Present',
    type: 'Freelance',
    desc: 'Independently designed and developed professional final-year engineering projects for students. Built scalable full-stack applications with Java, Spring Boot, React.js & MySQL — end-to-end, from backend APIs to frontend UI.',
    skills: ['Java', 'Spring Boot', 'React.js', 'Python', 'MySQL'],
  },
]

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useTyping(words, speed = 75, pause = 2000) {
  const [txt, setTxt] = useState('')
  const [wIdx, setWIdx] = useState(0)
  const [cIdx, setCIdx] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const cur = words[wIdx]
    let t
    if (!del && cIdx <= cur.length) t = setTimeout(() => { setTxt(cur.slice(0, cIdx)); setCIdx(c => c + 1) }, speed)
    else if (!del) t = setTimeout(() => setDel(true), pause)
    else if (del && cIdx >= 0) t = setTimeout(() => { setTxt(cur.slice(0, cIdx)); setCIdx(c => c - 1) }, speed / 2)
    else { setDel(false); setWIdx(i => (i + 1) % words.length) }
    return () => clearTimeout(t)
  }, [cIdx, del, wIdx, words, speed, pause])
  return txt
}

function useInView(opts = { threshold: 0.12 }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, opts)
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, vis]
}

function useCounter(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return count
}

// ─── PARTICLES CANVAS ────────────────────────────────────────────────────────
function Particles() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h, particles, raf
    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.4,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > w) p.dx *= -1
        if (p.y < 0 || p.y > h) p.dy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(124,58,237,${p.alpha})`
        ctx.fill()
      })
      // draw faint lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="particles-canvas" />
}

// ─── SCROLL PROGRESS ─────────────────────────────────────────────────────────
function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div className="scroll-progress" style={{ width: `${pct}%` }} />
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const go = id => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }
  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <ScrollProgress />
      <div className="nav-inner">
        <a className="nav-logo" href="#">
          <span className="logo-bracket">&lt;</span>SK<span className="logo-bracket">/&gt;</span>
        </a>
        <nav className={`nav-links${open ? ' open' : ''}`}>
          {NAV_LINKS.map(l => (
            <button key={l} className={`nav-link${active === l.toLowerCase() ? ' active' : ''}`} onClick={() => go(l)}>
              {l}
            </button>
          ))}
          <button className="nav-cta" onClick={() => go('Contact')}>
            <span>Hire Me</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </nav>
        <button className={`hamburger${open ? ' active' : ''}`} onClick={() => setOpen(o => !o)} aria-label="menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const typed = useTyping(WORDS)
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <section className="hero" id="home">
      <Particles />
      <div className="hero-gradient" />
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="eyebrow-dot" />
          <span>Available for Opportunities</span>
        </div>

        <h1 className="hero-name">
          Samarth<br /><span className="name-accent">Karale</span>
        </h1>

        <div className="hero-role-line">
          <span className="role-prefix">I'm a </span>
          <span className="typed-text">{typed}</span>
          <span className="cursor-blink">|</span>
        </div>

        <p className="hero-tagline">
          Building scalable Spring Boot backends &amp; responsive React frontends<br className="break" />
          with clean architecture, secure APIs, and code that <em>just works</em>.
        </p>

        <div className="hero-ctas">
          <button className="cta-primary" onClick={() => go('projects')}>
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button className="cta-ghost" onClick={() => go('contact')}>
            Let's Connect
          </button>
        </div>

        <div className="hero-socials">
          <a className="hs" href="https://github.com/iamxproo" target="_blank" rel="noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.09-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
          </a>
          <a className="hs" href="https://linkedin.com/in/samarth-karale-70b6052a1" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a className="hs" href="https://www.instagram.com/_iamxproo_/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a className="hs" href="mailto:samarthkarale21@gmail.com" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </a>
        </div>

        <div className="hero-stats">
          <div className="hstat"><span className="hstat-n">3+</span><span className="hstat-l">Projects</span></div>
          <div className="hstat-div" />
          <div className="hstat"><span className="hstat-n">1+</span><span className="hstat-l">Year Exp.</span></div>
          <div className="hstat-div" />
          <div className="hstat"><span className="hstat-n">15+</span><span className="hstat-l">APIs Built</span></div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>scroll</span>
        <div className="scroll-wheel"><div className="wheel-dot" /></div>
      </div>
    </section>
  )
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function About() {
  const [ref, vis] = useInView()
  const c1 = useCounter(3, 1600, vis)
  const c2 = useCounter(1, 1600, vis)
  const c3 = useCounter(15, 1600, vis)
  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <div className={`about-wrap${vis ? ' in' : ''}`}>
          <div className="about-visual">
            <div className="av-card">
              <div className="av-avatar">
                <img src="/samarth.png" alt="Samarth Karale" />
              </div>
              <div className="av-ring r1" />
              <div className="av-ring r2" />
              <div className="av-glow" />
            </div>
            <div className="av-counters">
              {[[c1,'Projects','🚀'],[c2,'Year Exp.','⚡'],[c3,'APIs Built','🔧']].map(([n,l,ic]) => (
                <div className="av-count" key={l}>
                  <span className="ac-icon">{ic}</span>
                  <span className="ac-n">{n}+</span>
                  <span className="ac-l">{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-body">
            <span className="sec-eyebrow">About Me</span>
            <h2 className="sec-title">Full Stack Java<br /><span className="g-text">Developer 🚀</span></h2>
            <p className="about-lead">
              Hey! I'm <strong>Samarth Karale</strong>, a results-driven <em>Full Stack Java Developer</em> from Pune with hands-on experience building scalable, secure web applications.
            </p>
            <p className="about-p">
              I specialize in <strong>Spring Boot</strong>, <strong>React.js</strong>, REST APIs, and JWT-based security. I've built real-world platforms like e-commerce systems, voting platforms, and microservices architectures — and I love turning complex problems into clean, efficient solutions.
            </p>
            <div className="about-tags">
              {['Spring Boot ✦','React.js ✦','REST APIs ✦','JWT Auth ✦','Microservices ✦','MySQL ✦','Clean Code ✦','Problem Solving ✦'].map(p => (
                <span className="atag" key={p}>{p}</span>
              ))}
            </div>
            <div className="about-actions">
              <a className="cta-primary" href="https://drive.google.com/uc?export=download&id=1fLbyeOcDAQTKBjMjk48ViuKa6B4mpxUa" target="_blank" rel="noreferrer">
                Download CV ↓
              </a>
              <div className="socials-row">
                <a className="soc" href="https://github.com/iamxproo" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.09-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg></a>
                <a className="soc" href="https://linkedin.com/in/samarth-karale-70b6052a1" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
                <a className="soc" href="https://www.instagram.com/_iamxproo_/" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────
function SkillCard({ s, i, vis }) {
  return (
    <div
      className={`skill-card${vis ? ' in' : ''}`}
      style={{ '--sc': s.color, '--sb': s.bg, '--d': `${i * 0.05}s` }}
    >
      <div className="sc-icon" style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}33` }}>
        {s.icon}
      </div>
      <span className="sc-name">{s.name}</span>
      <div className="sc-glow" style={{ background: s.color }} />
    </div>
  )
}

function Skills() {
  const [ref, vis] = useInView()
  return (
    <section className="section alt-section" id="skills" ref={ref}>
      <div className="container">
        <span className="sec-eyebrow center">What I Know</span>
        <h2 className="sec-title center">Tech <span className="g-text">Arsenal</span></h2>
        <p className="sec-sub center">Technologies I use to bring ideas to life</p>
        <div className="skills-grid">
          {SKILLS.map((s, i) => <SkillCard key={s.name} s={s} i={i} vis={vis} />)}
        </div>
      </div>
    </section>
  )
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
function ProjectCard({ p, i }) {
  const [ref, vis] = useInView()
  return (
    <article ref={ref} className={`proj-card${vis ? ' in' : ''}`} style={{ '--pc': p.color, '--pg': p.gradient, '--d': `${i * 0.12}s` }}>
      <div className="proj-num">{p.num}</div>
      <div className="proj-body">
        <div className="proj-meta">
          <span className="proj-sub">{p.subtitle}</span>
          <div className="proj-links">
            <a href={p.github} target="_blank" rel="noreferrer" className="plink" title="Source code">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" className="plink" title="Live demo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            )}
          </div>
        </div>
        <h3 className="proj-title">{p.title}</h3>
        <p className="proj-desc">{p.desc}</p>
        <div className="proj-tags">
          {p.tags.map(t => <span className="ptag" key={t} style={{ borderColor: p.color + '44', color: p.color }}>{t}</span>)}
        </div>
      </div>
      <div className="proj-accent" style={{ background: p.gradient }} />
    </article>
  )
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <span className="sec-eyebrow center">My Work</span>
        <h2 className="sec-title center">Featured <span className="g-text">Projects</span></h2>
        <p className="sec-sub center">Things I've built that I'm proud of</p>
        <div className="proj-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────
function Experience() {
  const [ref, vis] = useInView()
  return (
    <section className="section alt-section" id="experience" ref={ref}>
      <div className="container">
        <span className="sec-eyebrow center">Journey</span>
        <h2 className="sec-title center">Work <span className="g-text">Experience</span></h2>
        <p className="sec-sub center">Where I've worked and what I've built</p>
        <div className={`timeline${vis ? ' in' : ''}`}>
          {EXPERIENCE.map((e, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-left">
                <div className="tl-dot"><div className="tl-dot-inner" /></div>
                {i < EXPERIENCE.length - 1 && <div className="tl-line" />}
              </div>
              <div className="tl-card">
                <div className="tl-top">
                  <div>
                    <h3 className="tl-role">{e.role}</h3>
                    <div className="tl-co-row">
                      <span className="tl-co">{e.company}</span>
                      <span className="tl-badge">{e.type}</span>
                    </div>
                  </div>
                  <span className="tl-period">{e.period}</span>
                </div>
                <p className="tl-desc">{e.desc}</p>
                <div className="tl-skills">
                  {e.skills.map(s => <span className="tl-skill" key={s}>{s}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── EDUCATION ───────────────────────────────────────────────────────────────
function Education() {
  const [ref, vis] = useInView()
  return (
    <section className="section" id="education" ref={ref}>
      <div className="container">
        <span className="sec-eyebrow center">Background</span>
        <h2 className="sec-title center">Education & <span className="g-text">Certifications</span></h2>
        <p className="sec-sub center">Academic foundation and professional achievements</p>
        <div className={`edu-grid${vis ? ' in' : ''}`}>
          {EDUCATION.map((e, i) => (
            <div className="edu-card" key={i} style={{ '--delay': `${i * 0.1}s` }}>
              <div className="edu-icon">{e.icon}</div>
              <div className="edu-body">
                <h3 className="edu-degree">{e.degree}</h3>
                <p className="edu-school">{e.school}</p>
                <div className="edu-meta">
                  <span className="edu-period">📅 {e.period}</span>
                  <span className="edu-grade">🎯 {e.grade}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`cert-grid${vis ? ' in' : ''}`}>
          {CERTS.map((c, i) => (
            <div className="cert-card" key={i} style={{ '--cc': c.color }}>
              <span className="cert-icon">{c.icon}</span>
              <div>
                <p className="cert-title">{c.title}</p>
                <p className="cert-issuer">{c.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, vis] = useInView()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const h = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = async e => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch('https://formspree.io/f/mpqokkgj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSent(true)
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSent(false), 6000)
      }
    } catch(err) {
      console.error(err)
    } finally {
      setSending(false)
    }
  }
  return (
    <section className="section" id="contact" ref={ref}>
      <div className="container">
        <span className="sec-eyebrow center">Get In Touch</span>
        <h2 className="sec-title center">Let's <span className="g-text">Build Together</span></h2>
        <p className="sec-sub center">Have an idea? Let's make it real.</p>

        <div className={`contact-wrap${vis ? ' in' : ''}`}>
          <div className="contact-left">
            <div className="cl-card">
              <div className="cl-icon">🚀</div>
              <h3>Ready to Start?</h3>
              <p>I'm open to freelance projects, full-time roles, and exciting collaborations.</p>
            </div>
            <div className="cl-info">
              {[['📧','Email','samarthkarale21@gmail.com'],['📍','Location','Pimpri-Chinchwad, Pune'],['📞','Phone','+91 9022983993'],['🕐','Timezone','IST (UTC +5:30)']].map(([ic,lb,vl]) => (
                <div className="cli-item" key={lb}>
                  <span className="cli-icon">{ic}</span>
                  <div><p className="cli-label">{lb}</p><p className="cli-val">{vl}</p></div>
                </div>
              ))}
            </div>
          </div>

          <form className="contact-form" onSubmit={submit}>
            {sent && (
              <div className="form-success">
                <span>🎉</span>
                <div><strong>Message sent!</strong><p>I'll get back to you within 24 hours.</p></div>
              </div>
            )}
            <div className="form-row">
              <div className="form-field">
                <input name="name" value={form.name} onChange={h} required placeholder=" " />
                <label>Your Name</label>
              </div>
              <div className="form-field">
                <input name="email" type="email" value={form.email} onChange={h} required placeholder=" " />
                <label>Email Address</label>
              </div>
            </div>
            <div className="form-field">
              <input name="subject" value={form.subject} onChange={h} required placeholder=" " />
              <label>Subject</label>
            </div>
            <div className="form-field">
              <textarea name="message" rows={5} value={form.message} onChange={h} required placeholder=" " />
              <label>Message</label>
            </div>
            <button className="cta-primary submit-btn" type="submit" disabled={sending}>
              {sending ? 'Sending...' : 'Send Message'}
              {!sending && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9z"/></svg>}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-logo">
          <span className="logo-bracket">&lt;</span>SK<span className="logo-bracket">/&gt;</span>
        </div>
        <p className="footer-copy">
          Designed & Built by <span className="g-text">Samarth Karale</span> · © {new Date().getFullYear()}
        </p>
        <div className="footer-socials">
          <a className="soc" href="https://github.com/iamxproo" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.09-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.577.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg></a>
          <a className="soc" href="https://linkedin.com/in/samarth-karale-70b6052a1" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg></a>
          <a className="soc" href="https://www.instagram.com/_iamxproo_/" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="17" height="17"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></a>
          <a className="soc" href="mailto:samarthkarale21@gmail.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></a>
        </div>
      </div>
    </footer>
  )
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState('about')
  useEffect(() => {
    const els = ['about','skills','projects','experience','education','contact'].map(id => document.getElementById(id)).filter(Boolean)
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.35 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return (<><Navbar active={active} /><Hero /><About /><Skills /><Projects /><Experience /><Education /><Contact /><Footer /></>)
}
