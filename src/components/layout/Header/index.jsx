import * as React from "react";
import Contents from "./Contents";
import { fetchFromAPI } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function Header() {
  const headerData = await fetchFromAPI("header");
  const { data, error } = headerData;

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <header>
      <div className="w-full absolute top-0 left-0 z-10 bg-transparent">
        <div className="container">
          <Contents data={data} />
        </div>
      </div>
    </header>
  );
}
