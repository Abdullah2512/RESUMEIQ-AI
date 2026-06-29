import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { PublicNav } from "../components/layout/PublicNav";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form);
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
          <h1 className="text-2xl font-bold text-text">Welcome back</h1>
          <p className="mt-2 text-sm text-muted">Sign in to continue your resume optimization.</p>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <Button className="w-full" loading={loading}>Sign in</Button>
          </form>
          <div className="my-5 h-px bg-line" />
          <GoogleLogin
            onSuccess={async ({ credential }) => {
              await googleLogin(credential);
              navigate("/app");
            }}
            onError={() => toast.error("Google sign in failed")}
            width="100%"
          />
          <p className="mt-5 text-center text-sm text-muted">
            New here? <Link className="font-semibold text-text" to="/register">Create an account</Link>
          </p>
        </Card>
      </main>
    </div>
  );
}
