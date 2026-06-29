import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PublicNav } from "../components/layout/PublicNav";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await register(form);
      navigate("/app");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell min-h-screen">
      <PublicNav />
      <main className="flex min-h-screen items-center justify-center px-4 pt-20">
        <Card className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-text">Create your workspace</h1>
          <p className="mt-2 text-sm text-muted">Start with a resume upload and get a full AI review in seconds.</p>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <Input label="Password" type="password" minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <Button className="w-full" loading={loading}>Create account</Button>
          </form>
          <p className="mt-5 text-center text-sm text-muted">
            Already have an account? <Link className="font-semibold text-text" to="/login">Sign in</Link>
          </p>
        </Card>
      </main>
    </div>
  );
}
