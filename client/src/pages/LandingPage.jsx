import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Bot, CheckCircle2, FileText, Gauge, MessageSquareText, Sparkles, Wand2 } from "lucide-react";
import { PublicNav } from "../components/layout/PublicNav";
import { Button } from "../components/ui/Button";

const features = [
  ["ATS score", Gauge],
  ["Skill gap analysis", CheckCircle2],
  ["Resume rewrite", Wand2],
  ["Career coach chat", Bot],
  ["Keyword discovery", FileText],
  ["Grammar suggestions", MessageSquareText]
];

export function LandingPage() {
  return (
    <div className="app-shell min-h-screen overflow-hidden">
      <PublicNav />
      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_.85fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-sm text-muted">
              <Sparkles className="h-4 w-4 text-brand-500" />
              AI resume intelligence for focused job seekers
            </div>
            <h1 className="max-w-4xl text-5xl font-bold leading-tight text-text sm:text-6xl lg:text-7xl">
              ResumeIQ AI
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Analyze your resume, uncover missing keywords, rewrite weak bullets, and get coaching that turns your next application into a sharper story.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register">
                <Button className="w-full sm:w-auto">
                  Analyze my resume <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" className="w-full sm:w-auto">Open dashboard</Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass rounded-lg p-4 shadow-glow"
          >
            <div className="rounded-lg border border-line bg-ink p-4 text-white dark:bg-zinc-950">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Senior Product Designer</p>
                  <h2 className="text-xl font-semibold">Resume analysis</h2>
                </div>
                <div className="rounded-lg bg-brand-500 px-3 py-2 text-sm font-bold text-ink">91</div>
              </div>
              <div className="space-y-3">
                {["Add product analytics keywords", "Quantify onboarding impact", "Rewrite summary for ATS scan"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/10 text-xs">{index + 1}</span>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-line bg-panel/50 py-12">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
          {features.map(([label, Icon]) => (
            <div key={label} className="flex items-center gap-3 rounded-lg border border-line bg-panel p-4">
              <Icon className="h-5 w-5 text-brand-500" />
              <span className="font-medium text-text">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
