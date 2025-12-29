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
      <div className="w-full flex items-center relative z-0 bg-white p-[2px] rounded-[4px] xl:rounded-[5px] 
       2xl:rounded-[8px] 3xl:rounded-[10px] h-[25px] xl:h-[30px] 2xl:h-[35px] 3xl:h-[45px]">
        <Input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-full w-[calc(100%-75px)]  
                        xl:w-[calc(100%-95px)] 2xl:w-[calc(100%-115px)] 3xl:w-[calc(100%-145px)]  placeholder-[#555555] placeholder:text-[8px]
                          placeholder:xl:text-[10px] placeholder:2xl:text-[12px] placeholder:3xl:text-[14px] !text-[8px]
                          xl:!text-[10px] 2xl:!text-[12px] 3xl:!text-[14px]"
        />
        <Button
          type="submit"
          disabled={loading}
          className="text-[8px] xl:text-[10px] 2xl:text-[12px] 3xl:text-[16px] bg-[#BE1E2D] w-[75px] xl:w-[95px] 2xl:w-[115px] 3xl:w-[145px] h-full 
                      rounded-[4px] xl:rounded-[5px] 2xl:rounded-[8px] 3xl:rounded-[10px] 
                      uppercase font-normal cursor-pointer"
        >
          {loading ? "Loading..." : "Subscribe"}
        </Button>
      </div>
    </form>
  );
}
