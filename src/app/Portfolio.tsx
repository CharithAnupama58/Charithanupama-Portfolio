import React, { useMemo,useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {Counter, calculateExperience} from "@/components/ui/Counter";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  Github,
  Linkedin,
  FileText,
  ArrowRight,
  ExternalLink,
  MapPin,
  Phone,
  GraduationCap,
  Award,
  Wrench,
  Code2,
  Server,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

// ---- Helper: Smooth scroll to section
const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const getInitials = (fullName: string) =>
  fullName
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

// ---- Data (customize these!) -------------------------------------------------
const NAME = "Charith Anupama";
const ROLE = "Full-Stack Developer";
const TAGLINE = "I build clean, fast, and scalable web apps.";



const LINKS = {
  github: "https://github.com/CharithAnupama58",
  linkedin: "https://www.linkedin.com/in/charith-anupama20",
  email: "charith20anupama@gmail.com",
  cv: "/public/CV/CharithAnupama (20).pdf", // Replace with a real CV link or file path
};

// ---- Profile photo (replace with your image path/URL) -----------------------
// Put your picture in /public and set e.g. "/me.jpg"
const PROFILE_IMG = "/public/images/xyz(1).png"; // fallback renders initials if left as "#"

const SKILLS = {
  Frontend: [
    "React",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Bootstrap",
    "Flutter",
    "Figma",
  ],
  Backend: ["Node.js", "Express.js", "Java", "C++", "Microservices"],
  Database: ["MySQL","MSSQL","mongoDB"],
  Tools: ["Git", "Postman", "WebSocket", "ClickUp", "Agile/Scrum"],
};

const PROJECTS = [
  {
    title: "Cake O'Clock Management System",
    blurb:
      "Full-stack bakery platform for custom orders, image uploads, and Stripe payments.",
    tech: ["React", "Node", "Express", "MySQL", "Tailwind", "Stripe"],
    repo: "https://github.com/CharithAnupama58/cake-O--clock.git",
    demo: "#", // optional demo link

  },
  {
    title: "Tea Factory Management System",
    blurb:
      "Desktop app to register customers, compute monthly payments, and track profit.",
    tech: ["JavaFX", "MySQL"],
    repo: "https://github.com/CharithAnupama58/Tea-Factory-Management.git",
  },
  {
    title: "Temperature Monitoring System",
    blurb:
      "Real-time alerts + email notifications for greenhouse temperature anomalies.",
    tech: ["React", "Node", "Express", "MySQL", "WebSocket"],
    repo: "https://github.com/VishathAmarasinghe/green_house_webApplication.git",
  },
  {
    title: "Face Recognition ML Model",
    blurb: "Model to infer age, gender, and ethnicity from face images.",
    tech: ["Python"],
    repo: "https://github.com/CharithAnupama58/Face-Recognition-ML-Model.git",
  },
  {
    title: "Travel Web Application",
    blurb: "Simple web app to discover destinations and plan visits.",
    tech: ["React", "CSS", "JavaScript"],
    repo: "https://github.com/CharithAnupama58/travel.git",
  },
];

const EXPERIENCE = [
  {
    role: "Software Engineer Intern",
    company: "MobiOs (Pvt) Ltd",
    period: "2024 (6 months)",
    points: [
      "Contributed to Medica project series: Dental Management, Hospital Management, Online Channeling.",
      "Worked within Agile sprints (planning, stand-ups, reviews) and collaborated via ClickUp & Git.",
      "Built/maintained microservices to improve scalability and modularity across healthcare modules.",
      "Assisted in designing, coding, testing, and debugging production features.",
    ],
  },
];

const EDUCATION = [
  {
    school: "University of Kelaniya",
    qual: "BSc. (Hons) in Information Technology",
    period: "2022 – Present",
    logo: "/public/images/unnamed.jpg", // Add the logo URL here
  },
  {
    school: "Institute of Java and Software Engineering (IJSE)",
    qual:
      "Graduate Diploma in Software Engineering (Java, OOP, Design Patterns, DS, DBMS)",
    period: "2020 – 2022",
    logo: "/public/images/ijse.png", // Add the logo URL here
  },
  {
    school: "Mahinda College – Galle",
    qual:
      "GCE A/L (Physics C, Chemistry B, Combined Mathematics A) | GCE O/L (8 A’s, 1 C)",
    period: "2016 – 2020",
    logo: "/public/images/MahindaCollegeLogo.JPG", // Add the logo URL here
  },
];


const AWARDS = [
  { name: "IdeaSprint 2023 – Winner", body: "Inter-University Ideathon" },
  { name: "HackX 8.0 – Finalist", body: "Inter-University Startup Challenge" },
  { name: "Deep Mind Annual Hackathon – Participant", body: "IJSE" },
];

// Online Certifications --------------------------------------------------------
// Add your certificates here. Example entries included; replace with yours.
const CERTIFICATIONS = [
  {
    title: "React – The Complete Guide",
    issuer: "Udemy",
    year: "2024",
    link: "#", // put certificate URL
    skills: ["React", "Hooks", "Routing"],
  },
  {
    title: "Java Programming",
    issuer: "Coursera",
    year: "2023",
    link: "#",
    skills: ["Java", "OOP"],
  },
];

// ---- UI Primitives -----------------------------------------------------------
const Section = ({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  icon?: React.ComponentType<any>;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24 py-16 sm:py-24 border-b border-white/10">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-center gap-3 mb-8">
        {Icon ? <Icon className="w-6 h-6" /> : null}
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 rounded-full text-sm border border-white/15 bg-white/5 backdrop-blur">
    {children}
  </span>
);

// ---- Main Component ----------------------------------------------------------
export default function Portfolio() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const initials = getInitials(NAME);
  const hasPhoto = Boolean(PROFILE_IMG && PROFILE_IMG !== "#");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full text-white bg-[#0b0f1a] selection:bg-white/20">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[#0b0f1a]/70 border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          
          {/* Logo / Name */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">{NAME}</span>
          </div>

          {/* Desktop Links + CV */}
          <div className="hidden md:flex items-center gap-3">
            {/* Navigation links */}
            {[
              ["home", "Home"],
              ["about", "About"],
              ["skills", "Skills"],
              ["projects", "Projects"],
              ["experience", "Experience"],
              ["education", "Education"],
              ["achievements", "Achievements"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <Button
                key={id}
                variant="ghost"
                className="text-sm"
                onClick={() => scrollToId(id)}
              >
                {label}
              </Button>
            ))}

            {/* CV button */}
            <Button
              variant="outline"
              className="border-white/20 ml-2"
              onClick={() => window.open(LINKS.cv, "_blank")}
            >
              CV <FileText className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-0.5 bg-white mb-1"></div>
              <div className="w-6 h-0.5 bg-white mb-1"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0b0f1a]/95 backdrop-blur py-4 px-6 border-t border-white/10">
            {/* Links */}
            {[
              ["home", "Home"],
              ["about", "About"],
              ["skills", "Skills"],
              ["projects", "Projects"],
              ["experience", "Experience"],
              ["education", "Education"],
              ["achievements", "Achievements"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <button
                key={id}
                className="block w-full text-left text-white/80 py-2 hover:text-indigo-400"
                onClick={() => {
                  scrollToId(id);
                  setMobileMenuOpen(false);
                }}
              >
                {label}
              </button>
            ))}

            {/* Mobile CV button */}
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => window.open(LINKS.cv, "_blank")}
            >
              CV <FileText className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 py-40 sm:py-52">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Hi, I’m <span className="text-indigo-400">{NAME}</span>
              </h1>
              <p className="mt-3 text-lg text-white/80">{ROLE}</p>
              <p className="mt-4 text-white/70 max-w-prose">{TAGLINE}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => scrollToId("projects")}>
                  View My Work <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => window.open(LINKS.github, "_blank")}
                >
                  GitHub <Github className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => window.open(LINKS.linkedin, "_blank")}
                >
                  LinkedIn <Linkedin className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right column: contact card */}
            <div className="md:justify-self-end space-y-4">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" /> Sri Lanka
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-white/80">
                    <Mail className="w-4 h-4" /> {LINKS.email}
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Github className="w-4 h-4" /> {LINKS.github}
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Linkedin className="w-4 h-4" /> {LINKS.linkedin}
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Phone className="w-4 h-4" /> +94 71 333 26622
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* --- Animated Stats --- */}
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <Counter title="Projects Completed" end={17} />
            <Counter title="Years of Experience" end={calculateExperience()} />
          </div>
        </div>
      </section>

      {/* About */}
     <Section id="about" title="Who I Am" icon={Code2}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          
          {/* Left Column: Text */}
          <div className="space-y-6">
            <p className="text-white/80">
              <strong>Dedicated software developer</strong> with hands-on experience in full-stack development and system design. Skilled in developing scalable web applications and crafting intuitive user interfaces. I specialize in modern technologies like React, Node.js, and microservices architectures, ensuring high-quality, maintainable, and efficient code.
            </p>
            <p className="text-white/80">
              <strong>Passionate about creating reliable products</strong> that meet user needs. I enjoy turning ideas into production-ready features while collaborating in fast-paced, Agile teams. My focus is on delivering seamless user experiences and continuously improving through feedback and learning.
            </p>
            <p className="text-white/80">
              <strong>Driven by problem-solving and innovation</strong>, I am committed to delivering impactful solutions that solve real-world challenges. I thrive on collaborating with talented teams to bring cutting-edge technologies to life and meet business objectives.
            </p>
          </div>

          {/* Right Column: Image */}
          <div className="flex justify-center items-center">
            {hasPhoto ? (
              <img
                src={PROFILE_IMG}
                alt={`${NAME} profile photo`}
                className="w-96 h-96 object-cover rounded-lg shadow-lg" // Increased size further
              />
            ) : (
              <div
                role="img"
                aria-label="Profile placeholder"
                className="w-96 h-96 grid place-items-center bg-gradient-to-br from-indigo-600/50 to-sky-500/40 shadow-lg text-7xl font-semibold rounded-lg" // Increased size further
              >
                {initials}
              </div>
            )}
          </div>
        </div>
      </Section>
      {/* Skills */}
      <Section id="skills" title="My Tech Stack" icon={Wrench}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(SKILLS).map(([group, items]) => (
            <Card key={group} className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white/90">{group}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {items.map((it) => (
                  <Badge
                    key={it}
                    className="bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                  >
                    {it}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Featured Projects" icon={Server}>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={3} // adjust for desktop
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {PROJECTS.map((p) => (
            <SwiperSlide key={p.title}>
              <Card className="group bg-white/5 border-white/10 h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-white/90">{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-3">
                  <p className="text-white/70">{p.blurb}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-2 pt-2">
                    {p.repo && (
                      <Button
                        variant="outline"
                        className="border-white/20"
                        onClick={() => window.open(p.repo, "_blank")}
                      >
                        Repo <Github className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                    {p.demo && p.demo !== "#" && (
                      <Button onClick={() => window.open(p.demo, "_blank")}>
                        Demo <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Professional Experience" icon={Server}>
        <div className="grid gap-4">
          {EXPERIENCE.map((e) => (
            <Card key={e.role} className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex flex-wrap items-center gap-3">
                  <span className="text-white/90">{e.role}</span>
                  <span className="text-white/60">– {e.company}</span>
                  <span className="ml-auto text-sm text-white/60">{e.period}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-white/80">
                  {e.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section id="education" title="Education & Training" icon={GraduationCap}>
        <div className="grid gap-4">
          {EDUCATION.map((ed) => (
            <Card key={ed.school} className="bg-white/5 border-white/10">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-white/90">{ed.school}</CardTitle>
                {/* Logo Section */}
                <img
                  src={ed.logo} // Make sure the logo URL is part of your EDUCATION data
                  alt={`${ed.school} logo`}
                  className="w-12 h-12 object-contain"
                />
              </CardHeader>
              <CardContent className="text-white/80">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <p>{ed.qual}</p>
                  <span className="text-white/60">{ed.period}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    

      {/* Achievements */}
      <Section id="achievements" title="Milestones" icon={Award}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AWARDS.map((a) => (
            <Card key={a.name} className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white/90">{a.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-white/70">{a.body}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Let’s Connect" icon={Mail}>
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `mailto:${LINKS.email}`;
                }}
                className="space-y-3"
              >
                <input
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your name"
                />
                <input
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-indigo-500"
                  type="email"
                  placeholder="Your email"
                />
                <textarea
                  className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={5}
                  placeholder="Your message"
                />
                <Button type="submit" className="w-full">
                  Email Me
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white/80">
              <Mail className="w-4 h-4" /> {LINKS.email}
            </div>
            <div
              className="flex items-center gap-2 text-white/80 cursor-pointer"
              onClick={() => window.open(LINKS.github, "_blank")}
            >
              <Github className="w-4 h-4" /> {LINKS.github}
            </div>
            <div
              className="flex items-center gap-2 text-white/80 cursor-pointer"
              onClick={() => window.open(LINKS.linkedin, "_blank")}
            >
              <Linkedin className="w-4 h-4" /> {LINKS.linkedin}
            </div>
            <p className="text-white/60 text-sm">© {year} {NAME}. All rights reserved.</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
