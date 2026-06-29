import { useState } from "react";
import { Search } from "lucide-react";
import { Card } from "../components/ui/Card";
import { EmptyState } from "../components/ui/EmptyState";
import { Skeleton } from "../components/ui/Skeleton";
import { useResumes } from "../hooks/useResumes";

export function HistoryPage() {
  const [filters, setFilters] = useState({ search: "", minScore: "", sort: "newest" });
  const { resumes, loading } = useResumes(filters);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium text-brand-500">History</p>
        <h1 className="mt-1 text-3xl font-bold text-text">Resume history</h1>
      </div>
      <Card>
        <div className="grid gap-3 md:grid-cols-[1fr_140px_140px]">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input className="focus-ring h-11 w-full rounded-lg border border-line bg-panel pl-10 pr-3 text-sm" placeholder="Search file, role, or summary" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
          </label>
          <input className="focus-ring h-11 rounded-lg border border-line bg-panel px-3 text-sm" placeholder="Min score" type="number" min="0" max="100" value={filters.minScore} onChange={(e) => setFilters({ ...filters, minScore: e.target.value })} />
          <select className="focus-ring h-11 rounded-lg border border-line bg-panel px-3 text-sm" value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="score">Top score</option>
          </select>
        </div>
      </Card>

      {loading ? (
        <div className="grid gap-3">
          {[1, 2, 3].map((item) => <Skeleton key={item} className="h-28" />)}
        </div>
      ) : resumes.length ? (
        <div className="grid gap-3">
          {resumes.map((resume) => (
            <Card key={resume._id} className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div className="min-w-0">
                <p className="truncate font-semibold text-text">{resume.fileName}</p>
                <p className="mt-1 text-sm text-muted">{resume.targetRole}</p>
                <p className="mt-3 line-clamp-2 text-sm text-muted">{resume.summary}</p>
              </div>
              <div className="rounded-lg bg-brand-500/10 px-4 py-3 text-center">
                <p className="text-2xl font-bold text-brand-500">{resume.atsScore}</p>
                <p className="text-xs uppercase text-muted">ATS</p>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="No resumes found" body="Upload a resume or adjust your filters to see analysis history." />
      )}
    </div>
  );
}
