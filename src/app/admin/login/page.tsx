"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/admin",
      });

      if (result?.error) {
        setError("Invalid email or password.");
        setIsLoading(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("Unable to sign in right now. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-geoweb-gray px-6 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/brand/geoweb-logo.png"
              alt="GeoWeb Solutions"
              width={220}
              height={100}
              priority
              className="h-12 w-auto"
            />
          </div>

          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-geoweb-red">
              Admin
            </p>

            <h1 className="font-display text-3xl text-geoweb-indigo">
              Welcome back
            </h1>

            <p className="mt-3 text-sm leading-6 text-geoweb-text/70">
              Sign in to manage GeoWeb inquiries and internal operations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-geoweb-text"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-geoweb-indigo/15 bg-white px-4 py-3 text-sm text-geoweb-text outline-none transition focus:border-geoweb-red focus:ring-2 focus:ring-geoweb-red/10"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-geoweb-text"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-geoweb-indigo/15 bg-white px-4 py-3 text-sm text-geoweb-text outline-none transition focus:border-geoweb-red focus:ring-2 focus:ring-geoweb-red/10"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-geoweb-red px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-geoweb-indigo disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-geoweb-text/50">
          GeoWeb Solutions internal administration
        </p>
      </div>
    </main>
  );
}
