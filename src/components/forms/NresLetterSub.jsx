"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // or any toast library

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/newsletter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // tell backend it's JSON
          },
          body: JSON.stringify({ email }), // stringify to JSON
        }
      );

      const data = await res.json();
      if (!data.success) throw new Error(data?.message || "Please enter a valid email address.");

      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center relative z-0"
    >
      <Input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="rounded-[10px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white h-[45px] placeholder-[#555555] placeholder:text-[14px]"
      />
      <Button
        type="submit"
        disabled={loading}
        className="absolute bottom-0 margin-auto bg-[#BE1E2D] h-[40px] top-1/2 -translate-y-1/2 right-[3px] 3xl:text-[16px] 2xl:text-[14px] text-[14px] uppercase font-medium"
      >
        {loading ? "Loading..." : "Subscribe"}
      </Button>
    </form>
  );
}
