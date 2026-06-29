import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Send } from "lucide-react";
import { api } from "../lib/api";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { cn } from "../lib/cn";

const starters = [
  "How can I improve my resume summary?",
  "What skills should I learn for my target role?",
  "Help me prepare for recruiter screening."
];

export function CoachPage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    api.get("/coach/messages").then(({ data }) => setMessages(data.messages)).catch((error) => toast.error(error.message));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function submit(event) {
    event.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    try {
      const { data } = await api.post("/coach/messages", { message });
      setMessages((items) => [...items, ...data.messages]);
      setMessage("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="flex h-[calc(100vh-8rem)] flex-col p-0">
      <div className="border-b border-line p-5">
        <p className="text-sm font-medium text-brand-500">AI Career Coach</p>
        <h1 className="mt-1 text-2xl font-bold text-text">Ask for resume, interview, and career guidance</h1>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {!messages.length ? (
          <div className="grid gap-3 md:grid-cols-3">
            {starters.map((starter) => (
              <button key={starter} className="rounded-lg border border-line p-4 text-left text-sm text-muted hover:bg-zinc-50 dark:hover:bg-zinc-950" onClick={() => setMessage(starter)}>
                {starter}
              </button>
            ))}
          </div>
        ) : null}
        {messages.map((item) => (
          <div key={item._id} className={cn("flex", item.role === "user" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-2xl rounded-lg px-4 py-3 text-sm leading-6", item.role === "user" ? "bg-ink text-white dark:bg-white dark:text-ink" : "border border-line bg-zinc-50 text-text dark:bg-zinc-950")}>
              {item.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form className="flex gap-3 border-t border-line p-4" onSubmit={submit}>
        <input className="focus-ring h-11 flex-1 rounded-lg border border-line bg-panel px-3 text-sm" placeholder="Ask your coach..." value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button loading={loading} className="w-12 px-0" aria-label="Send message"><Send className="h-4 w-4" /></Button>
      </form>
    </Card>
  );
}
