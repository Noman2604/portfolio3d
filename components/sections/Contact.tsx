"use client";

import { useState } from "react";
import { Send, Check, Copy, ArrowUpRight, Loader2 } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { content } from "@/lib/content";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = "Message must be at least 5 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        if (data.method === "fallback" && data.mailto) {
          window.location.href = data.mailto;
        }
      } else {
        setStatus("error");
        setErrors({ general: data.error || "Failed to send message" });
      }
    } catch {
      setStatus("error");
      setErrors({ general: "Network error. Please email directly." });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(content.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-10"
    >
      <div className="max-w-2xl mb-12">
        <div className="text-xs font-mono uppercase tracking-wider text-[#8B8F9A] mb-3">
          08 / Contact
        </div>
        <h2 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-[#EFEFF1] mb-3 [text-wrap:balance]">
          {content.contact.title}
        </h2>
        <p className="text-sm sm:text-base text-[#8B8F9A] leading-relaxed">
          {content.contact.body}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-[#131518] border border-[#23262D] rounded-[4px] p-6 sm:p-8">
          {status === "success" ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-[#EFEFF1]">
                Message sent successfully
              </h3>
              <p className="text-xs font-mono text-[#8B8F9A]">
                Thank you for reaching out. I typically respond within 24 hours.
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setFormData({ name: "", email: "", message: "" });
                }}
                className="mt-4 text-xs font-mono text-[#8B8F9A] hover:text-[#EFEFF1] underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono text-[#8B8F9A] uppercase tracking-wider mb-1.5"
                >
                  Name*
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#0C0D0E] border border-[#23262D] text-sm text-[#EFEFF1] focus:outline-none focus:border-[#383C46] transition-colors"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                    {errors.name}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono text-[#8B8F9A] uppercase tracking-wider mb-1.5"
                >
                  Email Address*
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#0C0D0E] border border-[#23262D] text-sm text-[#EFEFF1] focus:outline-none focus:border-[#383C46] transition-colors"
                  placeholder="you@domain.com"
                />
                {errors.email && (
                  <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                    {errors.email}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono text-[#8B8F9A] uppercase tracking-wider mb-1.5"
                >
                  Message*
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-[4px] bg-[#0C0D0E] border border-[#23262D] text-sm text-[#EFEFF1] focus:outline-none focus:border-[#383C46] transition-colors resize-none"
                  placeholder="Tell me about the project or role..."
                />
                {errors.message && (
                  <span className="text-[11px] font-mono text-rose-400 mt-1 block">
                    {errors.message}
                  </span>
                )}
              </div>

              {errors.general && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-[4px] text-xs font-mono text-rose-400">
                  {errors.general}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[4px] bg-[#EFEFF1] text-[#0C0D0E] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-white disabled:opacity-50 transition-colors"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Direct Reach & Social Links */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#131518] border border-[#23262D] rounded-[4px] p-6 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#585C67]">
              Direct Email
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-mono text-[#EFEFF1] truncate">
                {content.email}
              </span>
              <button
                onClick={copyEmail}
                className="p-2 border border-[#23262D] rounded-[4px] text-[#8B8F9A] hover:text-[#EFEFF1] hover:border-[#383C46] transition-colors shrink-0"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            {copied && (
              <p className="text-[11px] font-mono text-emerald-400 pt-1">
                ✓ Copied to clipboard
              </p>
            )}
          </div>

          <div className="bg-[#131518] border border-[#23262D] rounded-[4px] p-6 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#585C67]">
              Profiles
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={content.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-[4px] border border-[#23262D] bg-[#0C0D0E] text-xs font-mono text-[#8B8F9A] hover:text-[#EFEFF1] hover:border-[#383C46] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={content.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-[4px] border border-[#23262D] bg-[#0C0D0E] text-xs font-mono text-[#8B8F9A] hover:text-[#EFEFF1] hover:border-[#383C46] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
