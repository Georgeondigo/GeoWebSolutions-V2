"use client";

import { FormEvent, useState } from "react";

const projectTypes = [
  "Business website",
  "Web application",
  "Business system",
  "E-commerce",
  "Website redesign",
  "Digital growth",
  "Not sure yet",
];

const budgets = [
  "Under KES 50,000",
  "KES 50,000 – 100,000",
  "KES 100,000 – 250,000",
  "KES 250,000+",
  "Not sure yet",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      business: formData.get("business") || undefined,
      email: formData.get("email"),
      projectType: formData.get("projectType"),
      budget: formData.get("budget") || undefined,
      timeline: formData.get("timeline") || undefined,
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      setSubmitted(true);
      form.reset();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-geoweb-indigo/10 bg-white p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-geoweb-red">
          Inquiry received
        </p>

        <h2 className="font-display mt-4 text-3xl font-normal text-geoweb-text sm:text-4xl">
          Thanks for reaching out.
        </h2>

        <p className="mt-5 max-w-xl text-base leading-7 text-geoweb-text/65">
          We&apos;ve received your project information. We&apos;ll review it and
          get back to you with the next steps.
        </p>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setError("");
          }}
          className="mt-8 text-sm font-semibold text-geoweb-red transition-colors hover:text-geoweb-indigo"
        >
          Send another inquiry →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-geoweb-indigo/10 bg-white p-6 sm:p-8 lg:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="text-sm font-semibold text-geoweb-text"
          >
            Your name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="George Ondigo"
            className="mt-2 w-full rounded-xl border border-geoweb-indigo/10 bg-white px-4 py-3 text-sm text-geoweb-text outline-none transition-colors placeholder:text-geoweb-text/35 focus:border-geoweb-red"
          />
        </div>

        {/* Business */}
        <div>
          <label
            htmlFor="business"
            className="text-sm font-semibold text-geoweb-text"
          >
            Business / organization
          </label>

          <input
            id="business"
            name="business"
            type="text"
            placeholder="Your business name"
            className="mt-2 w-full rounded-xl border border-geoweb-indigo/10 bg-white px-4 py-3 text-sm text-geoweb-text outline-none transition-colors placeholder:text-geoweb-text/35 focus:border-geoweb-red"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="text-sm font-semibold text-geoweb-text"
          >
            Email address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-geoweb-indigo/10 bg-white px-4 py-3 text-sm text-geoweb-text outline-none transition-colors placeholder:text-geoweb-text/35 focus:border-geoweb-red"
          />
        </div>

        {/* Project type */}
        <div>
          <label
            htmlFor="projectType"
            className="text-sm font-semibold text-geoweb-text"
          >
            What do you need?
          </label>

          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            className="mt-2 w-full rounded-xl border border-geoweb-indigo/10 bg-white px-4 py-3 text-sm text-geoweb-text outline-none transition-colors focus:border-geoweb-red"
          >
            <option value="" disabled>
              Select an option
            </option>

            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div>
          <label
            htmlFor="budget"
            className="text-sm font-semibold text-geoweb-text"
          >
            Estimated budget
          </label>

          <select
            id="budget"
            name="budget"
            defaultValue=""
            className="mt-2 w-full rounded-xl border border-geoweb-indigo/10 bg-white px-4 py-3 text-sm text-geoweb-text outline-none transition-colors focus:border-geoweb-red"
          >
            <option value="" disabled>
              Select a range
            </option>

            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>

        {/* Timeline */}
        <div>
          <label
            htmlFor="timeline"
            className="text-sm font-semibold text-geoweb-text"
          >
            Desired timeline
          </label>

          <select
            id="timeline"
            name="timeline"
            defaultValue=""
            className="mt-2 w-full rounded-xl border border-geoweb-indigo/10 bg-white px-4 py-3 text-sm text-geoweb-text outline-none transition-colors focus:border-geoweb-red"
          >
            <option value="" disabled>
              Select a timeline
            </option>

            <option value="asap">As soon as possible</option>
            <option value="1-month">Within 1 month</option>
            <option value="1-3-months">1–3 months</option>
            <option value="3-plus-months">3+ months</option>
            <option value="flexible">I&apos;m flexible</option>
          </select>
        </div>
      </div>

      {/* Project details */}
      <div className="mt-6">
        <label
          htmlFor="message"
          className="text-sm font-semibold text-geoweb-text"
        >
          Tell us about the project
        </label>

        <textarea
          id="message"
          name="message"
          required
          rows={7}
          placeholder="What are you trying to achieve? What problem are you trying to solve?"
          className="mt-2 w-full resize-none rounded-xl border border-geoweb-indigo/10 bg-white px-4 py-3 text-sm leading-7 text-geoweb-text outline-none transition-colors placeholder:text-geoweb-text/35 focus:border-geoweb-red"
        />
      </div>
      {error && (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-geoweb-red/20 bg-geoweb-red/5 px-4 py-3 text-sm text-geoweb-red"
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-5 text-geoweb-text/45">
          You don&apos;t need to have everything figured out. Give us what you
          know and we&apos;ll help define the next step.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-geoweb-red px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-geoweb-indigo disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send inquiry →"}
        </button>
      </div>
    </form>
  );
}
