"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Zod schema for validation
const newsletterSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export default function NewsletterForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/newsletter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();
      if (!data.success) throw new Error(data?.message || "Subscription failed");

      toast.success("Subscribed successfully!");
      reset();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col sm:flex-row items-center gap-2 relative z-0"
    >
      <div className="w-full relative">
        <Input
          type="email"
          placeholder="Enter Email"
          {...register("email")}
          className="rounded-[10px] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white h-[45px] placeholder-[#555555] placeholder:text-[14px]"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="bg-[#BE1E2D] h-[40px] 3xl:text-[16px] 2xl:text-[14px] text-[14px] uppercase font-medium"
      >
        {loading ? "Loading..." : "Subscribe"}
      </Button>
    </form>
  );
}
