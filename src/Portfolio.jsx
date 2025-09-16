import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  Mail, Phone, MapPin, Download, Github, Link as LinkIcon,
  Briefcase, GraduationCap, ShieldCheck, Cpu, Code2, Boxes,
  Cloud, Database, Rocket, MessageSquare, Terminal, Sun, Moon, Sparkles,
  Menu, X
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "./components/ui";
import LoadingSpinner from "./components/LoadingSpinner";

const profile = {
  name: "Vipraghna Srikakulapu",
  role: "Software Engineer II",
  tagline: "Building scalable, accessible web apps • Angular • React • Micro-frontends • WCAG 2.2 AA",
  location: "North Carolina, USA",
  phone: "904-524-3577",
  email: "srikakulapu@icloud.com",
  links: [
    { label: "GitHub", href: "https://github.com/", icon: Github },
  ],
};

const highlights = [
  { label: "Years Experience", value: "3+" },
  { label: "Reusable Components", value: "52" },
  { label: "Performance Boost", value: "25%" },
  { label: "Update Time Reduction", value: "95%" },
];

const experiences = [
  {
    title: "Officer, Software Engineer II",
    company: "Bank of America",
    location: "Charlotte, NC",
    date: "Feb 2025 – Present",
    bullets: [
      "Engineered a dynamic form engine to update client configurations in real-time (95% faster).",
      "Unified design across apps via an internal web framework; improved UX consistency.",
      "Built a CLI to scaffold features, cutting dev timelines by ~30%.",
      "Deployed with OpenShift for reliable, scalable environments.",
      "Shipped an internal chat app that improved onboarding and cross-team collaboration.",
      "Integrated Splunk & Glassbox for behavior insights; improved UX by ~30%.",
    ],
  },
  {
    title: "Officer, Software Engineer I",
    company: "Bank of America",
    location: "Charlotte, NC",
    date: "Feb 2024 – Feb 2025",
    bullets: [
      "Translated pixel-perfect designs into production UIs.",
      "Delivered micro-frontends for modular, faster feature delivery.",
      "Implemented CSP with nonces to harden XSS defenses.",
      "Migrated Angular 4/11 → 19, improving performance (~25%) and security.",
      "Ensured WCAG 2.2 AA accessibility (JAWS, VoiceOver, TalkBack).",
      "Optimized REST APIs, +45% interoperability and smoother 3rd‑party integrations.",
    ],
  },
  {
    title: "Software Engineer I",
    company: "Bank of America",
    location: "Charlotte, NC",
    date: "Oct 2022 – Feb 2024",
    bullets: [
      "Automated bug intake → Jira tickets + email alerts (−40% overhead).",
      "Built Jira REST dashboards for leadership (↑35% management efficiency).",
      "Adopted Storybook for component previews/tests (↓37% time-to-fix).",
      "Maintained a 52‑component UI library for consistent UX across apps.",
    ],
  },
];

const projects = [
  {
    name: "Dynamic Form Engine",
    description: "Rules‑driven renderer enabling instant business config updates, replacing months‑long release cycles.",
    tags: ["Angular", "TypeScript", "State Machines", "JSON Schema"],
    icon: Sparkles,
    links: [],
  },
  {
    name: "Internal Chat Application",
    description: "Contextual chat with channels, quick onboarding packs, and searchable history for faster ramp‑up.",
    tags: ["React", "WebSockets", "Node.js"],
    icon: MessageSquare,
    links: [],
  },
  {
    name: "Developer CLI",
    description: "Scaffolding tool that standardizes architecture and cuts boilerplate ~30% across squads.",
    tags: ["Node.js", "CLI", "Templates"],
    icon: Terminal,
    links: [],
  },
];

const skills = [
  {
    group: "Languages",
    icon: Code2,
    items: ["JavaScript", "TypeScript", "Java", "C#", "Python", "C++", "SQL"],
  },
  {
    group: "Frameworks & UI",
    icon: Boxes,
    items: ["Angular", "React", "Storybook", "Bootstrap", "Tailwind"],
  },
  {
    group: "Backend & Patterns",
    icon: Cpu,
    items: ["Node.js", "REST APIs", "Microservices", "Spring Boot", "JPA/Hibernate"],
  },
  {
    group: "Cloud & DevOps",
    icon: Cloud,
    items: ["OpenShift", "Docker", "Jenkins", "AWS", "Azure", "GCP"],
  },
  {
    group: "Data & Observability",
    icon: Database,
    items: ["MySQL", "Oracle", "MongoDB", "Splunk", "Glassbox"],
  },
  {
    group: "Security & Quality",
    icon: ShieldCheck,
    items: ["CSP (nonces)", "WCAG 2.2 AA", "JAWS", "VoiceOver", "TalkBack", "Jest/Mockito"],
  },
];

const education = {
  degree: "B.S., Computer Science",
  school: "Geethanjali College of Engineering & Technology, India",
  date: "Jun 2018 – Jun 2022",
};

// UI helpers

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeInReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

function Section({ id, title, children, icon: Icon, prefersReduced = false }) {
  return (
    <section id={id} className="scroll-mt-24 py-14 md:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={prefersReduced ? fadeInReduced : fadeIn}
      >
        <div className="flex items-center gap-3 mb-6">
          {Icon ? (
            <div className="rounded-2xl p-2 ring-1 ring-border">
              <Icon className="h-5 w-5" />
            </div>
          ) : null}
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {title}
          </h2>
        </div>
        {children}
      </motion.div>
    </section>
  );
}

function NavLink({ href, label, onClick, isActive = false }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`text-sm md:text-[15px] px-3 py-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'hover:bg-muted'
      }`}
      aria-label={`Navigate to ${label} section`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </a>
  );
}

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = saved ? saved === "dark" : prefers;
      setDark(initial);
      document.documentElement.classList.toggle("dark", initial);
    }
  }, []);
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", dark);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", dark ? "dark" : "light");
    }
  }, [dark]);
  return { dark, setDark };
}

// Page

export default function Portfolio() {
  const { dark, setDark } = useTheme();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const prefersReduced = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  // Track active section for navigation highlighting
  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-muted-foreground">Loading portfolio...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-rose-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      <div
        className="min-h-screen bg-background text-foreground antialiased"
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        }}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-black/30 border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a
              href="#home"
              className="font-medium tracking-tight text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
              aria-label="Go to home section"
            >
              Vipraghna
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center" role="navigation" aria-label="Main navigation">
              <NavLink href="#about" label="About" isActive={activeSection === 'about'} />
              <NavLink href="#experience" label="Experience" isActive={activeSection === 'experience'} />
              <NavLink href="#projects" label="Projects" isActive={activeSection === 'projects'} />
              <NavLink href="#skills" label="Skills" isActive={activeSection === 'skills'} />
              <NavLink href="#education" label="Education" isActive={activeSection === 'education'} />
              <NavLink href="#contact" label="Contact" isActive={activeSection === 'contact'} />
            </nav>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setDark(!dark)}
                      aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
                    >
                      {dark ? (
                        <Sun className="h-4 w-4" />
                      ) : (
                        <Moon className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {/* Mobile Menu Button */}
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
              
              <a href="#contact" className="hidden md:block">
                <Button className="">Hire Me</Button>
              </a>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t bg-background/95 backdrop-blur"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="px-4 py-3 space-y-2">
                <NavLink href="#about" label="About" onClick={() => setMobileMenuOpen(false)} />
                <NavLink href="#experience" label="Experience" onClick={() => setMobileMenuOpen(false)} />
                <NavLink href="#projects" label="Projects" onClick={() => setMobileMenuOpen(false)} />
                <NavLink href="#skills" label="Skills" onClick={() => setMobileMenuOpen(false)} />
                <NavLink href="#education" label="Education" onClick={() => setMobileMenuOpen(false)} />
                <NavLink href="#contact" label="Contact" onClick={() => setMobileMenuOpen(false)} />
                <div className="pt-2">
                  <a href="#contact">
                    <Button className="w-full">Hire Me</Button>
                  </a>
                </div>
              </div>
            </motion.nav>
          )}
        </header>

        {/* Hero */}
        <main id="home" className="max-w-6xl mx-auto px-4">
          <section className="pt-12 md:pt-20 relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{ y }}
            >
              <h1 className="text-4xl md:text-7xl font-semibold tracking-tight" role="banner">
                {profile.name}
              </h1>
              <p className="mt-3 text-base md:text-lg text-muted-foreground flex items-center gap-2">
                <Briefcase className="h-5 w-5" /> {profile.role} · Bank of
                America
              </p>
              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                {profile.tagline}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="/vipraghna-resume.pdf" download aria-label="Download resume PDF">
                  <Button>
                    <Download className="h-4 w-4 mr-2" /> Download Resume
                  </Button>
                </a>
                <a href="#projects" aria-label="Learn more about projects">
                  <Button variant="outline">Learn more</Button>
                </a>
                {profile.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${l.label} profile`}
                  >
                    <Button variant="ghost" className="gap-2">
                      <l.icon className="h-4 w-4" /> {l.label}
                    </Button>
                  </a>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                {highlights.map((h) => (
                  <Card
                    key={h.label}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="py-4">
                      <div className="text-2xl font-semibold">{h.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {h.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </section>

          <Separator className="my-12" />

          {/* About */}
          <Section id="about" title="About" icon={Rocket} prefersReduced={prefersReduced}>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardContent className="pt-6 text-sm md:text-[15px] leading-7 text-muted-foreground">
                  I’m a product‑minded engineer focused on reliable, accessible
                  experiences. Recently I’ve been building internal platforms and
                  tooling that speed up delivery without compromising security or
                  a11y.
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 grid gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {profile.location}
                  </div>
                    <a
                      className="flex items-center gap-2 hover:underline"
                      href={`mailto:${profile.email}`}
                    >
                      <Mail className="h-4 w-4" /> {profile.email}
                    </a>
                    <a
                      className="flex items-center gap-2 hover:underline"
                      href={`tel:${profile.phone}`}
                    >
                      <Phone className="h-4 w-4" /> {profile.phone}
                    </a>
                </CardContent>
              </Card>
            </div>
          </Section>

          <Separator className="my-12" />

          {/* Experience */}
          <Section id="experience" title="Experience" icon={Briefcase} prefersReduced={prefersReduced}>
            <div className="relative pl-6 md:pl-10">
              <div className="absolute left-2 md:left-4 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-8">
                {experiences.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute -left-[9px] md:-left-[11px] top-1 h-4 w-4 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 ring-2 ring-background" />
                    <Card className="">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex flex-wrap items-center gap-2 text-base md:text-lg">
                          <span>{exp.title}</span>
                          <span className="text-muted-foreground">
                            · {exp.company}
                          </span>
                        </CardTitle>
                        <div className="text-xs text-muted-foreground">
                          {exp.date} · {exp.location}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="list-disc pl-5 text-sm md:text-[15px] space-y-2 text-muted-foreground">
                          {exp.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </Section>

          <Separator className="my-12" />

          {/* Projects */}
          <Section id="projects" title="Projects" icon={Rocket} prefersReduced={prefersReduced}>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <p.icon className="h-5 w-5" />
                        <CardTitle className="text-base md:text-lg">
                          {p.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      <p className="text-sm text-muted-foreground">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <Badge key={t} variant="secondary">
                            {t}
                          </Badge>
                        ))}
                      </div>
                      {p.links && p.links.length ? (
                        <div className="pt-1 flex gap-3">
                          {p.links.map((l) => (
                            <a
                              key={l.href}
                              href={l.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                              <LinkIcon className="h-4 w-4" /> {l.label ?? "Link"}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Section>

          <Separator className="my-12" />

          {/* Skills */}
          <Section id="skills" title="Skills" icon={Cpu} prefersReduced={prefersReduced}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((s) => (
                <Card key={s.group} className="">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <s.icon className="h-5 w-5" />
                      <CardTitle className="text-base">
                        {s.group}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {s.items.map((itm) => (
                        <Badge key={itm} variant="outline">
                          {itm}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>

          <Separator className="my-12" />

          {/* Education */}
          <Section id="education" title="Education" icon={GraduationCap} prefersReduced={prefersReduced}>
            <Card>
              <CardContent className="py-6 text-sm md:text-[15px] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="font-medium">{education.degree}</div>
                  <div className="text-muted-foreground">
                    {education.school}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {education.date}
                </div>
              </CardContent>
            </Card>
          </Section>

          <Separator className="my-12" />

          {/* Contact */}
          <Section id="contact" title="Contact" icon={Mail} prefersReduced={prefersReduced}>
            <Card>
              <CardContent className="py-6">
                <div className="grid md:grid-cols-3 gap-6 items-start">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> {profile.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" /> {profile.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> {profile.location}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setFormStatus('submitting');
                        
                        try {
                          // Simulate form submission
                          await new Promise(resolve => setTimeout(resolve, 1000));
                          setFormStatus('success');
                          setFormData({ name: '', email: '', message: '' });
                          setTimeout(() => setFormStatus('idle'), 3000);
                        } catch (error) {
                          setFormStatus('error');
                          setTimeout(() => setFormStatus('idle'), 3000);
                        }
                      }}
                      className="grid gap-3"
                      aria-label="Contact form"
                    >
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="name" className="sr-only">Your name</label>
                          <input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Your name"
                            className="w-full px-3 py-2 rounded-xl bg-muted focus:outline-none focus:ring-2 ring-offset-1 ring-primary"
                            aria-describedby="name-error"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="sr-only">Your email</label>
                          <input
                            id="email"
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="Your email"
                            className="w-full px-3 py-2 rounded-xl bg-muted focus:outline-none focus:ring-2 ring-offset-1 ring-primary"
                            aria-describedby="email-error"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="sr-only">Message</label>
                        <textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Message"
                          className="w-full min-h-[120px] px-3 py-2 rounded-xl bg-muted focus:outline-none focus:ring-2 ring-offset-1 ring-primary"
                          aria-describedby="message-error"
                        />
                      </div>
                      
                      {formStatus === 'success' && (
                        <div className="text-green-600 text-sm" role="alert">
                          Thanks! I'll get back to you soon.
                        </div>
                      )}
                      
                      {formStatus === 'error' && (
                        <div className="text-red-600 text-sm" role="alert">
                          Something went wrong. Please try again.
                        </div>
                      )}
                      
                      <Button 
                        type="submit" 
                        className="w-fit" 
                        disabled={formStatus === 'submitting'}
                        aria-describedby="submit-status"
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <LoadingSpinner size="sm" className="mr-2" />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          <footer className="py-10 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Built with React,
            Tailwind & Framer Motion.
          </footer>
        </main>
      </div>
    </div>
  );
}
