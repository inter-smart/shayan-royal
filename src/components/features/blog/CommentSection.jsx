"use client";
import { useState } from "react";

export default function CommentSection() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="w-full h-auto pt-[20px] pb-[105px]">
      <div className="container"></div>
    </section>
  );
}
