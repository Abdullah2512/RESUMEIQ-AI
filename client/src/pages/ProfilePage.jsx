import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";

export function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    targetRole: user?.targetRole || "",
    bio: user?.bio || ""
  });

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await updateProfile(form);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
      <Card>
        <div className="grid h-20 w-20 place-items-center rounded-lg bg-brand-500 text-3xl font-bold text-ink">
          {user?.name?.charAt(0)}
        </div>
        <h1 className="mt-4 text-2xl font-bold text-text">{user?.name}</h1>
        <p className="mt-1 text-sm text-muted">{user?.email}</p>
        <p className="mt-4 rounded-lg border border-line p-3 text-sm text-muted">{user?.targetRole}</p>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold text-text">Profile settings</h2>
        <form className="mt-5 space-y-4" onSubmit={submit}>
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Target role" value={form.targetRole} onChange={(e) => setForm({ ...form, targetRole: e.target.value })} />
          <label className="block space-y-2">
            <span className="text-sm font-medium text-text">Career context</span>
            <textarea className="focus-ring min-h-32 w-full rounded-lg border border-line bg-panel p-3 text-sm" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Add goals, seniority, industries, or preferred roles." />
          </label>
          <Button loading={loading}>Save changes</Button>
        </form>
      </Card>
    </div>
  );
}
