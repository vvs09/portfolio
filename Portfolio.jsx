// This file defines Vipraghna's portfolio page using React, Tailwind and shadcn/ui components.
// It is based on the code provided by the user and includes animations, a dark/light theme toggle,
// and sections for about, experience, projects, skills, education, and contact.

import React, { useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Github,
  Link as LinkIcon,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Cpu,
  Code2,
  Boxes,
  Cloud,
  Database,
  Rocket,
  MessageSquare,
  Terminal,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";

// shadcn/ui components (available in this environment)
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

// ---------- Data (pulled from your resume) ----------
const profile = {
  name: "Vipraghna Srikakulapu",
  role: "Software Engineer II",
  tagline:
    "Building scalable, accessible web apps • Angular • React • Micro-frontends • WCAG 2.2 AA",
  location: "North Carolina, USA",
  phone: "904-524-3577",
  email: "srikakulapu@icloud.com",
  links: [
    { label: "GitHub", href: "https://github.com/", icon: Github },
    // Add your real links here
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
      "Adopted Storybook for component previews/tests (↓time-to-fix by ~37%).",
      "Maintained a 52‑component UI library for consistent UX across apps.",
    ],
  },
];

const projects = [
  {
    name: "Dynamic Form Engine",
    description:
      "Rules‑driven renderer enabling instant business config updates, replacing months‑long release cycles.",
    tags: ["Angular", "TypeScript", "State Machines", "JSON Schema"],
    icon: Sparkles,
    links: [],
  },
  {
    name: "Internal Chat Application",
    description:
      "Contextual chat with channels, quick onboarding packs, and searchable history for faster ramp‑up.",
    tags: ["React", "WebSockets", "Node.js"],
    icon: MessageSquare,
    links: [],
  },
  {
    name: "Developer CLI",
    description:
      "Scaffolding tool that standardizes architecture and cuts boilerplate ~30% across squads.",
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
    items: [
      "CSP (nonces)",
      "WCAG 2.2 AA",
      "JAWS",
      "VoiceOver",
      "TalkBack",
      "Jest/Mockito",
    ],
  },
];

const education = {
  degree: "B.S., Computer Science",
  school: "Geethanjali College of Engineering & Technology, India",
  date: "Jun 2018 – Jun 2022",
};

// ---------- UI helpers ----------
const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Section = ({ id, title, children, icon: Icon }) => (
  <section id={id} className="scroll-mt-24 py-14 md:py-20">
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
      <div className="flex items-center gap-3 mb-6">
        {Icon ? (
          <div className="rounded-2xl p-2 ring-1 ring-border">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </motion.div>
  </section>
);

const NavLink = ({ href, label }) => (
  <a
    href={href}
    className="text-sm md:text-[15px] px-3 py-2 rounded-xl hover:bg-muted transition-colors"
  >
    {label}
  </a>
);

function useTheme() {
  const [dark, setDark] = useState(false);
  React.useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefers =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved ? saved === "dark" : !!prefers;
    setDark(initial);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", initial);
    }
  }, []);
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", dark);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", dark ? "dark" : "light");
    }
  }, [dark]);
  return { dark, setDark } as const;
}

// ---------- Page ----------
export default function Portfolio() {
  const { dark, setDark } = useTheme();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div className="">
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
            <a href="#home" className="font-medium tracking-tight text-sm md:text-base">
              Vipraghna
            </a>

            <nav className="hidden md:flex items-center">
              <NavLink href="#about" label="About" />
              <NavLink href="#experience" label="Experience" />
              <NavLink href="#projects" label="Projects" />
              <NavLink href="#skills" label="Skills" />
              <NavLink href="#education" label="Education" />
              <NavLink href="#contact" label="Contact" />
            </nav>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => setDark(!dark)}>
                      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <a href="#contact">
                <Button className="">Hire Me</Button>
              </a>
            </div>
          </div>
        </header>

        {/* Hero */}
        <main id="home" className="max-w-6xl mx-auto px-4">
          <section className="pt-12 md:pt-20">
            <div className="grid md:grid-cols-[1.2fr_.8fr] items-center gap-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                style={{ y }}
              >
                <h1 className="text-4xl md:text-7xl font-semibold tracking-tight">
                  {profile.name}
                </h1>
                <p className="mt-3 text-base md:text-lg text-muted-foreground flex items-center gap-2">
                  <Briefcase className="h-5 w-5" /> {profile.role} · Bank of America
                </p>
                <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {profile.tagline}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a href="/vipraghna-resume.pdf" download>
                    <Button>
                      <Download className="h-4 w-4 mr-2" /> Download Resume
                    </Button>
                  </a>
                  <a href="#projects">
                    <Button variant="outline">Learn more</Button>
                  </a>
                  {profile.links.map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                      <Button variant="ghost" className="gap-2">
                        <l.icon className="h-4 w-4" /> {l.label}
                      </Button>
                    </a>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {highlights.map((h) => (
                    <Card key={h.label} className="hover:shadow-md transition-shadow">
                      <CardContent className="py-4">
                        <div className="text-2xl font-semibold">{h.value}</div>
                        <div className="text-xs text-muted-foreground mt-1">{h.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative"
              >
                <Card className="relative overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg">What I do</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="build">
                      <TabsList className="grid grid-cols-3">
                        <TabsTrigger value="build">Build</TabsTrigger>
                        <TabsTrigger value="scale">Scale</TabsTrigger>
                        <TabsTrigger value="secure">Secure</TabsTrigger>
                      </TabsList>
                      <TabsContent value="build" className="pt-3 text-sm text-muted-foreground">
                        Design accessible, maintainable UIs; craft component libraries; micro‑frontends; developer tooling.
                      </TabsContent>
                      <TabsContent value="scale" className="pt-3 text-sm text-muted-foreground">
                        Optimize performance, modularize architecture, automate pipelines, instrument with Splunk/Glassbox.
                      </TabsContent>
                      <TabsContent value="secure" className="pt-3 text-sm text-muted-foreground">
                        Enforce CSP with nonces, follow WCAG 2.2 AA, and bake security + a11y into CI.
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>

          <Separator className="my-12" />

          {/* About */}
          <Section id="about" title="About" icon={Rocket}>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardContent className="pt-6 text-sm md:text-[15px] leading-7 text-muted-foreground">
                  I’m a product‑minded engineer focused on reliable, accessible experiences. Recently I’ve been building
                  internal platforms and tooling that speed up delivery without compromising security or a11y.
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 grid gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {profile.location}
                  </div>
                  <a className="flex items-center gap-2 hover:underline" href={`mailto:${profile.email}`}>
                    <Mail className="h-4 w-4" /> {profile.email}
                  </a>
                  <a className="flex items-center gap-2 hover:underline" href={`tel:${profile.phone}`}>
                    <Phone className="h-4 w-4" /> {profile.phone}
                  </a>
                </CardContent>
              </Card>
            </div>
          </Section>

          <Separator className="my-12" />

          {/* Experience */}
          <Section id="experience" title="Experience" icon={Briefcase}>
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
                          <span className="text-muted-foreground">· {exp.company}</span>
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
          <Section id="projects" title="Projects" icon={Rocket}>
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
                        <CardTitle className="text-base md:text-lg">{p.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      <p className="text-sm text-muted-foreground">{p.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <Badge key={t} variant="secondary">
                            {t}
                          </Badge>
                        ))}
                      </div>
                      {p.links?.length ? (
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
          <Section id="skills" title="Skills" icon={Cpu}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((s) => (
                <Card key={s.group} className="">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <s.icon className="h-5 w-5" />
                      <CardTitle className="text-base">{s.group}</CardTitle>
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
          <Section id="education" title="Education" icon={GraduationCap}>
            <Card>
              <CardContent className="py-6 text-sm md:text-[15px] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="font-medium">{education.degree}</div>
                  <div className="text-muted-foreground">{education.school}</div>
                </div>
                <div className="text-xs text-muted-foreground">{education.date}</div>
              </CardContent>
            </Card>
          </Section>

          <Separator className="my-12" />

          {/* Contact */}
          <Section id="contact" title="Contact" icon={Mail}>
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
                      onSubmit={(e) => {
                        e.preventDefault();
                        alert("Thanks! I'll get back to you soon.");
                      }}
                      className="grid gap-3"
                    >
                      <div className="grid md:grid-cols-2 gap-3">
                        <input
                          required
                          placeholder="Your name"
                          className="px-3 py-2 rounded-xl bg-muted focus:outline-none focus:ring-2 ring-offset-1 ring-primary"
                        />
                        <input
                          required
                          type="email"
                          placeholder="Your email"
                          className="px-3 py-2 rounded-xl bg-muted focus:outline-none focus:ring-2 ring-offset-1 ring-primary"
                        />
                      </div>
                      <textarea
                        required
                        placeholder="Message"
                        className="min-h-[120px] px-3 py-2 rounded-xl bg-muted focus:outline-none focus:ring-2 ring-offset-1 ring-primary"
                      />
                      <Button type="submit" className="w-fit">
                        Send Message
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          <footer className="py-10 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind, shadcn/ui & Framer Motion.
          </footer>
        </main>
      </div>
    </div>
  );
}