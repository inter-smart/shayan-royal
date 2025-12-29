"use client";

import parse from "html-react-parser";

export default function TermsandConditions({ policy }) {
  return (
    <section className="w-full h-auto pt-[30px] lg:pb-[130px] pb-[40px] relative z-0">
      <div className="container">
        <div className="typography">
          <h1 className="m-0">Terms & Conditions</h1>
          {parse(policy)}
        </div>
      </div>
    </section>
  );
}
