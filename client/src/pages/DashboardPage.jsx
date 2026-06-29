import { Link } from "react-router-dom";
import { ArrowRight, FileText, Sparkles, TrendingUp, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { ScoreChart } from "../components/charts/ScoreChart";
import { useAuth } from "../context/AuthContext";
import { useResumes } from "../hooks/useResumes";

export function DashboardPage() {
  const { user } = useAuth();
  const { resumes, loading } = useResumes({ sort: "newest" });
  const latest = resumes[0];
  const average = resumes.length ? Math.round(resumes.reduce((sum, item) => sum + item.atsScore, 0) / resumes.length) : 0;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-brand-500">Dashboard</p>
          <h1 className="mt-1 text-3xl font-bold text-text">Good to see you, {user?.name?.split(" ")[0]}</h1>
          <p className="mt-2 text-muted">Track resume quality, gaps, and coaching momentum from one workspace.</p>
        </div>
        <Link to="/app/analyze">
          <Button><Upload className="h-4 w-4" /> Upload resume</Button>
        </Link>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        {loading ? [1, 2, 3].map((item) => <Skeleton key={item} className="h-32" />) : (
          <>
            <Metric icon={FileText} label="Resumes analyzed" value={resumes.length} />
            <Metric icon={TrendingUp} label="Average ATS score" value={average || "--"} />
            <Metric icon={Sparkles} label="Latest target" value={latest?.targetRole || "Not set"} />
          </>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
        <Card>
          <h2 className="text-lg font-semibold text-text">Latest ATS score</h2>
          <ScoreChart score={latest?.atsScore || 0} />
          <p className="text-sm text-muted">{latest?.summary || "Upload a resume to generate your first ATS score."}</p>
        </Card>
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text">Recent analysis</h2>
            <Link to="/app/history" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {(resumes.slice(0, 4)).map((resume) => (
              <div key={resume._id} className="flex items-center justify-between rounded-lg border border-line p-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-text">{resume.fileName}</p>
                  <p className="text-sm text-muted">{resume.targetRole}</p>
                </div>
                <span className="rounded-lg bg-brand-500/10 px-3 py-1 text-sm font-bold text-brand-500">{resume.atsScore}</span>
              </div>
            ))}
            {!loading && !resumes.length ? <p className="text-sm text-muted">No resume history yet.</p> : null}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <Card>
      <Icon className="h-5 w-5 text-brand-500" />
      <p className="mt-4 text-sm text-muted">{label}</p>
      <p className="mt-1 truncate text-2xl font-bold text-text">{value}</p>
    </Card>
  );
}
