"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Typed from "typed.js"
import myPhoto from "./photo.jpg"

// Define proper TypeScript interfaces
interface ProjectDetail {
  title: string
  description: string
}

interface Project {
  title: string
  timeline: string
  technologies: string[]
  details: ProjectDetail[]
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

// Floating shapes component
const FloatingShapes: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(8)].map((_, i) => {
        const size = Math.random() * 60 + 20
        const xPos = Math.random() * 100
        const yPos = Math.random() * 100
        const duration = Math.random() * 20 + 10
        const delay = Math.random() * 5

        return (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: size,
              height: size,
              top: `${yPos}%`,
              left: `${xPos}%`,
              background:
                i % 2 === 0
                  ? "linear-gradient(to right, #06b6d4, #3b82f6)"
                  : "linear-gradient(to right, #06b6d4, #8b5cf6)",
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 30 : -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration,
              repeat: Number.POSITIVE_INFINITY,
              delay,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </div>
  )
}

// Scroll to top button
const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-cyan-400 text-[#0a192f] w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Theme toggle component
const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // This is just for visual effect in the portfolio
    // In a real app, you'd apply the dark class to the html element
    console.log("Theme changed to:", isDark ? "dark" : "light")
  }, [isDark])

  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-24 right-8 bg-[#112240] w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div initial={false} animate={{ rotate: isDark ? 0 : 360 }} transition={{ duration: 0.5 }}>
        {isDark ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </motion.div>
    </motion.button>
  )
}

// Animated counter component
const AnimatedCounter: React.FC<{ value: number; title: string; icon: React.ReactNode }> = ({ value, title, icon }) => {
  const [count, setCount] = useState(0)
  const nodeRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest > 0.2 && count !== value) {
        const interval = setInterval(() => {
          setCount((prev) => {
            if (prev < value) {
              return prev + 1
            }
            clearInterval(interval)
            return prev
          })
        }, 30)

        return () => clearInterval(interval)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress, value, count])

  return (
    <motion.div
      ref={nodeRef}
      className="bg-[#112240] p-6 rounded-lg text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-cyan-400 text-3xl mb-2 flex justify-center">{icon}</div>
      <div className="text-4xl font-bold mb-2">{count}+</div>
      <div className="text-gray-400">{title}</div>
    </motion.div>
  )
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-[#112240] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-cyan-400">{project.title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4">
            <p className="text-gray-300 mb-2">{project.timeline}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  className="bg-[#1a2f52] px-2 py-1 rounded text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: "#264673" }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {project.details.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <h4 className="text-lg font-semibold mb-1">{detail.title}</h4>
                <p className="text-gray-400">{detail.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { scrollYProgress } = useScroll()
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const typedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!typedRef.current) return

    const typed = new Typed(typedRef.current, {
      strings: ["Hi, I'm Sasanka Gayathra", "I'm a Full Stack Developer"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)

    // Show success message or animation here
    alert("Message sent successfully!")

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-[#0a192f] text-white relative">
      {/* Background floating shapes */}
      <FloatingShapes />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Theme toggle button */}
      <ThemeToggle />

      {/* Scroll to top button */}
      <ScrollToTopButton />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full bg-[#0a192f]/90 backdrop-blur-sm z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1
            className="text-2xl font-bold text-cyan-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Portfolio.
          </motion.h1>
          <div className="space-x-6">
            {["Home", "About", "Skills", "Projects", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-cyan-400 transition-colors relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center px-6 pt-20 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.5 }}>
            <motion.h1
              className="text-5xl font-bold mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span ref={typedRef}></span>
            </motion.h1>
            <motion.p
              className="text-gray-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Aspiring Software Engineering Intern with hands-on experience in full-stack development, specializing in
              Spring Boot and React.js. Skilled in designing and implementing RESTful APIs, database management (MySQL),
              and cloud deployment (AWS, Docker). Passionate about building scalable and user-friendly applications.
              Strong problem-solving skills, teamwork, and adaptability in fast-paced environments.
            </motion.p>
            <motion.a
              href="#contact"
              className="bg-cyan-400 text-[#0a192f] px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500 transition-colors inline-block"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <motion.div
              className="w-80 h-80 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-1"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(6, 182, 212, 0.3)",
                  "0 0 30px rgba(6, 182, 212, 0.5)",
                  "0 0 20px rgba(6, 182, 212, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src={myPhoto} alt="Sasanka Gayathra" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <p className="text-gray-400 mb-2">Scroll Down</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-[#0a192f]/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <AnimatedCounter
              value={2}
              title="Years Experience"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
            <AnimatedCounter
              value={4}
              title="Projects Completed"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              }
            />
            <AnimatedCounter
              value={8}
              title="Technologies"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              }
            />
            <AnimatedCounter
              value={99}
              title="Satisfaction Rate"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-[#0a192f]/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            My <span className="text-cyan-400">Skills</span>
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", name: "Java" },
              {
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
                name: "Spring Boot",
              },
              { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", name: "React.js" },
              {
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                name: "JavaScript",
              },
              { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", name: "Docker" },
              {
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
                name: "AWS",
              },
              { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", name: "GitHub" },
              {
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg",
                name: "MySQL",
              },
            ].map((skill, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-6 bg-[#112240] rounded-lg hover:bg-[#1a2f52] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.1), 0 10px 10px -5px rgba(6, 182, 212, 0.04)",
                }}
              >
                <motion.div className="text-cyan-400 mb-4" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <img src={skill.icon || "/placeholder.svg"} alt={skill.name} className="w-16 h-16" />
                </motion.div>
                <h3 className="text-lg font-semibold">{skill.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Latest <span className="text-cyan-400">Projects</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Job Market Platform Project */}
            <motion.div
              className="bg-[#112240] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{
                boxShadow: "0 20px 25px -5px rgba(6, 182, 212, 0.1), 0 10px 10px -5px rgba(6, 182, 212, 0.04)",
                y: -5,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
                alt="Job Market Platform"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Job Market Platform</h3>
                <p className="text-gray-400 mb-4">A web application connecting job seekers with employers.</p>
                <motion.button
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  whileHover={{ x: 5 }}
                  onClick={() =>
                    setSelectedProject({
                      title: "Job Market Platform",
                      timeline: "12/2024 - present",
                      technologies: ["Spring Boot", "React.js", "Docker", "GitHub", "MySQL", "AWS", "Figma"],
                      details: [
                        {
                          title: "RESTful APIs",
                          description: "Designed and implemented RESTful APIs for smooth backend-frontend interaction.",
                        },
                        {
                          title: "Job Search & Recruitment",
                          description: "Built a platform to connect job seekers with employers.",
                        },
                        {
                          title: "User & Company Dashboards",
                          description:
                            "Designed interactive dashboards for students to track applications and companies to manage job postings.",
                        },
                        {
                          title: "Scalable Backend",
                          description: "Developed RESTful APIs and integrated CI/CD pipelines for seamless deployment.",
                        },
                        {
                          title: "Efficient Data Management",
                          description: "Implemented a MySQL relational database to ensure data consistency.",
                        },
                      ],
                    })
                  }
                >
                  Learn More →
                </motion.button>
              </div>
            </motion.div>

            {/* Bodim House Selling Site */}
            <motion.div
              className="bg-[#112240] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{
                boxShadow: "0 20px 25px -5px rgba(6, 182, 212, 0.1), 0 10px 10px -5px rgba(6, 182, 212, 0.04)",
                y: -5,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
                alt="Bodim House Selling Site"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Bodim House Selling Site</h3>
                <p className="text-gray-400 mb-4">
                  A platform for finding and listing boarding houses with advanced filtering.
                </p>
                <motion.button
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  whileHover={{ x: 5 }}
                  onClick={() =>
                    setSelectedProject({
                      title: "Bodim House Selling Site",
                      timeline: "2024 - 2024",
                      technologies: ["Spring Boot", "React.js", "MySQL", "Material-UI"],
                      details: [
                        {
                          title: "User-Friendly Search",
                          description: "Built an advanced filtering system based on price, capacity, and location.",
                        },
                        {
                          title: "Data Storage & Retrieval",
                          description:
                            "Managed boarding details and user information with an optimized MySQL structure.",
                        },
                        {
                          title: "Seamless Experience",
                          description: "Developed an interactive UI using Material-UI for smooth navigation.",
                        },
                        {
                          title: "Responsive Design",
                          description:
                            "Optimized user experience with a responsive and interactive UI for seamless navigation.",
                        },
                      ],
                    })
                  }
                >
                  Learn More →
                </motion.button>
              </div>
            </motion.div>

            {/* To Do List */}
            <motion.div
              className="bg-[#112240] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{
                boxShadow: "0 20px 25px -5px rgba(6, 182, 212, 0.1), 0 10px 10px -5px rgba(6, 182, 212, 0.04)",
                y: -5,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80"
                alt="To Do List"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">To Do List</h3>
                <p className="text-gray-400 mb-4">A full-stack task management application with CRUD operations.</p>
                <motion.button
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  whileHover={{ x: 5 }}
                  onClick={() =>
                    setSelectedProject({
                      title: "To Do List",
                      timeline: "2023 - 2023",
                      technologies: ["Spring Boot", "React.js", "MySQL", "Axios"],
                      details: [
                        {
                          title: "Full-Stack Application",
                          description:
                            "Developed a full-stack To-Do List application using Spring Boot (backend), React (frontend), and Axios (for API integration).",
                        },
                        {
                          title: "RESTful APIs",
                          description:
                            "Implemented RESTful APIs to manage tasks, enabling Create, Read, Update, and Delete (CRUD) operations.",
                        },
                        {
                          title: "API Integration",
                          description:
                            "Integrated Axios for efficient communication between the frontend and backend services.",
                        },
                        {
                          title: "Data Persistence",
                          description:
                            "Implemented data persistence using a relational database, ensuring reliability and scalability.",
                        },
                      ],
                    })
                  }
                >
                  Learn More →
                </motion.button>
              </div>
            </motion.div>

            {/* Forest Vibe - Wild Life Learning Platform */}
            <motion.div
              className="bg-[#112240] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{
                boxShadow: "0 20px 25px -5px rgba(6, 182, 212, 0.1), 0 10px 10px -5px rgba(6, 182, 212, 0.04)",
                y: -5,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80"
                alt="Forest Vibe"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Forest Vibe</h3>
                <p className="text-gray-400 mb-4">A JavaFX wildlife learning platform for conservation education.</p>
                <motion.button
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  whileHover={{ x: 5 }}
                  onClick={() =>
                    setSelectedProject({
                      title: "Forest Vibe - Wild Life Learning Platform",
                      timeline: "2023 - 2024",
                      technologies: ["JavaFX", "MySQL", "Java OOP"],
                      details: [
                        {
                          title: "Wildlife Management",
                          description:
                            "Created a JavaFX-based wildlife management application to enhance wildlife conservation efforts.",
                        },
                        {
                          title: "Secure Authentication",
                          description: "Implemented user and admin login systems with secure database connections.",
                        },
                        {
                          title: "Data Management",
                          description: "CRUD functionality for managing plant details.",
                        },
                        {
                          title: "Team Collaboration",
                          description:
                            "Collaborated with a team to create a forest selection module, allowing users to view forest details and images.",
                        },
                        {
                          title: "User Experience",
                          description: "Designed a user-friendly navigation bar for seamless application navigation.",
                        },
                      ],
                    })
                  }
                >
                  Learn More →
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-[#0a192f]/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Contact <span className="text-cyan-400">Me</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <h3 className="text-2xl font-bold mb-4">Let's Work Together</h3>
              <p className="text-gray-400 mb-6">Feel free to reach out for collaborations or just a friendly hello</p>

              {/* Animated contact info */}
              <div className="space-y-4">
                <motion.p
                  className="flex items-center text-cyan-400"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.span className="mr-2 bg-[#112240] p-2 rounded-full" whileHover={{ rotate: 20 }}>
                    📧
                  </motion.span>
                  sasankagayathra26@gmail.com
                </motion.p>
                <motion.p
                  className="flex items-center text-cyan-400"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.span className="mr-2 bg-[#112240] p-2 rounded-full" whileHover={{ rotate: 20 }}>
                    📱
                  </motion.span>
                  0720203153
                </motion.p>
                <motion.p
                  className="flex items-center text-cyan-400"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.span className="mr-2 bg-[#112240] p-2 rounded-full" whileHover={{ rotate: 20 }}>
                    📍
                  </motion.span>
                  No 177, Arachchihena kade, Attanikitha, Thiththagalla, Ahangama
                </motion.p>
              </div>

              {/* Social media links with animations */}
              <div className="flex space-x-4 mt-6">
                <motion.a
                  href="https://github.com/sasanka2023"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 bg-[#112240] rounded-full"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/sasanka-gayathra-961764229"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 bg-[#112240] rounded-full"
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </motion.a>
              </div>

              {/* Decorative element */}
              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-cyan-400/5 z-0"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6 relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#112240] border border-cyan-400/20 focus:border-cyan-400 focus:outline-none"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#112240] border border-cyan-400/20 focus:border-cyan-400 focus:outline-none"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <input
                  type="text"
                  name="subject"
                  placeholder="Enter Your Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#112240] border border-cyan-400/20 focus:border-cyan-400 focus:outline-none"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <textarea
                  name="message"
                  placeholder="Enter Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 rounded-lg bg-[#112240] border border-cyan-400/20 focus:border-cyan-400 focus:outline-none"
                />
              </motion.div>
              <motion.button
                type="submit"
                className="w-full bg-cyan-400 text-[#0a192f] py-3 rounded-lg font-semibold hover:bg-cyan-500 transition-colors"
                whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(6, 182, 212, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                Submit
              </motion.button>

              {/* Decorative element */}
              <motion.div
                className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-cyan-400/5 z-0"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [360, 270, 180, 90, 0],
                }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer with animation */}
      <footer className="py-8 px-6 bg-[#0a192f]/80 border-t border-cyan-400/10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} Sasanka Gayathra. All rights reserved.
          </motion.p>
          <motion.p
            className="text-gray-500 text-sm mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Made with <span className="text-red-500">❤</span> and React
          </motion.p>
        </div>
      </footer>

      {/* Project Modal with AnimatePresence for proper exit animations */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </div>
  )
}

export default App

