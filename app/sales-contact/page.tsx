"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function SalesContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await new Promise((res) => setTimeout(res, 1500));
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 via-white to-blue-50 px-4 py-8">
      <div className="w-full max-w-2xl rounded-3xl shadow-2xl bg-white/90 backdrop-blur p-8 sm:p-12 border border-blue-100">
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 text-blue-700 leading-tight">Contact Sales</h1>
          <p className="text-gray-700 text-base sm:text-lg max-w-lg mx-auto font-medium">
            Interested in <span className="text-blue-600 font-semibold">ADmyBRAND AI Suite</span>? Fill out the form below and our sales team will get back to you shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7" noValidate aria-live="polite">
          <div>
            <Label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-800">
              Your Name
            </Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition placeholder:text-gray-400 bg-white text-gray-900 shadow-sm"
            />
          </div>

          <div>
            <Label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-800">
              Your Email
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="john@example.com"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition placeholder:text-gray-400 bg-white text-gray-900 shadow-sm"
            />
          </div>

          <div>
            <Label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-800">
              Tell us about your needs
            </Label>
            <Textarea
              name="message"
              id="message"
              rows={4}
              placeholder="I want to learn more about pricing and integration options..."
              value={formState.message}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition placeholder:text-gray-400 bg-white text-gray-900 shadow-sm resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-4 text-lg font-bold rounded-xl shadow-md bg-blue-700 hover:bg-blue-800 hover:scale-[1.01] active:scale-95 transition disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send Inquiry"}
          </Button>

          {status === "success" && (
            <p className="mt-4 text-center text-green-600 font-medium">
              Thank you for contacting us! We'll be in touch soon.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-center text-red-600 font-medium">
              Oops! Something went wrong. Please try again later.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}