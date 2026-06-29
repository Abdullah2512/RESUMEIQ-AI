import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FileUp, Wand2 } from "lucide-react";
import { api } from "../lib/api";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { ScoreChart } from "../components/charts/ScoreChart";
import { cn } from "../lib/cn";

export function AnalyzePage() {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState("Full Stack MERN Developer");
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const fileLabel = useMemo(() => file?.name || "Drop a PDF resume here", [file]);

  async function submit(event) {
    event.preventDefault();
    if (!file) {
      toast.error("Choose a PDF resume first");
      return;
    }
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("targetRole", targetRole);

    setLoading(true);
    try {
      const { data } = await api.post("/resumes", formData, { headers: { "Content-Type": "multipart/form-data" } });
      setResult(data.resume);
      toast.success("Resume analyzed");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  function acceptFiles(files) {
    const next = files?.[0];
    if (!next) return;
    if (next.type !== "application/pdf") {
      toast.error("Only PDF files are supported");
      return;
    }
    setFile(next);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
      <Card>
        <p className="text-sm font-medium text-brand-500">Analyzer</p>
        <h1 className="mt-1 text-3xl font-bold text-text">Upload your resume</h1>
        <p className="mt-2 text-sm text-muted">ResumeIQ extracts PDF text, scores ATS fit, and returns targeted improvements.</p>
        <form className="mt-6 space-y-5" onSubmit={submit}>
          <Input label="Target role" value={targetRole} onChange={(e) => setTargetRole(e.target.value)} required />
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              acceptFiles(e.dataTransfer.files);
            }}
            className={cn(
              "flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-line p-6 text-center transition",
              dragging && "border-brand-500 bg-brand-500/10"
            )}
          >
            <FileUp className="mb-3 h-10 w-10 text-brand-500" />
            <span className="font-semibold text-text">{fileLabel}</span>
            <span className="mt-2 text-sm text-muted">PDF up to your configured server limit</span>
            <input className="sr-only" type="file" accept="application/pdf" onChange={(e) => acceptFiles(e.target.files)} />
          </label>
          <Button className="w-full" loading={loading}>
            <Wand2 className="h-4 w-4" /> Analyze resume
          </Button>
        </form>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-text">AI report</h2>
        {result ? (
          <div className="mt-4 space-y-5">
            <ScoreChart score={result.atsScore} />
            <Section title="Summary" items={[result.summary]} />
            <Section title="Missing keywords" items={result.missingKeywords} tone="brand" />
            <Section title="Skill gaps" items={result.skillGaps} />
            <Section title="Grammar suggestions" items={result.grammarSuggestions?.map((item) => `${item.title}: ${item.detail}`)} />
            <div>
              <h3 className="mb-2 font-semibold text-text">AI rewrite</h3>
              <p className="rounded-lg border border-line bg-zinc-50 p-4 text-sm leading-6 text-muted dark:bg-zinc-950">{result.rewrite}</p>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-line bg-zinc-50 p-6 text-sm leading-6 text-muted dark:bg-zinc-950">
            Your structured report will appear here after upload, including ATS score, keyword gaps, grammar notes, strengths, risks, and a rewrite direction.
          </div>
        )}
      </Card>
    </div>
  );
}

function Section({ title, items = [], tone }) {
  return (
    <div>
      <h3 className="mb-2 font-semibold text-text">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.filter(Boolean).map((item) => (
          <span key={item} className={cn("rounded-lg border border-line px-3 py-2 text-sm text-muted", tone === "brand" && "border-brand-500/30 text-brand-500")}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
