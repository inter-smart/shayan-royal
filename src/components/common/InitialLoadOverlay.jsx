import Image from "next/image";

// Pure CSS-driven splash — no client JS/state, so it doesn't gate hydration
// or add a timer to the main thread. It paints instantly with the rest of
// the SSR HTML and fades itself out via the `initial-loader` CSS animation
// (see globals.css), independent of how fast real content is ready.
export default function InitialLoadOverlay() {
  return (
    <div className="initial-loader fixed inset-0 z-[9999] flex items-center justify-center bg-white" aria-hidden="true">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-8">
          <Image src="/images/logo.svg" alt="" width={120} height={80} className="w-auto h-16 md:h-20" priority />
        </div>

        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-[#2E4C99]"></div>
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent rounded-full animate-spin border-t-[#BD1F2D] animate-reverse"></div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[#2E4C99] font-medium text-lg">Loading...</p>
        </div>
      </div>
    </div>
  );
}
