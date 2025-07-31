"use client";

import parse from "html-react-parser";

export default function PrivacyPolicy({ policy }) {
  return (
    <section className="w-full h-auto  lg:pb-[130px] pb-[40px]">
      <div className="container">
        <div className="typography">
          <h1 className="m-0">Privacy Policy</h1>
          {parse(policy)}
        </div>
      </div>
    </section>
  );
}
