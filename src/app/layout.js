import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Barlow } from "next/font/google";
import localFont from "next/font/local";
import WidgetSection from "@/components/common/WidgetSection";
import InitialLoadOverlay from "@/components/common/InitialLoadOverlay";
import { Toaster } from "sonner";
import { LoadingProvider } from "@/contexts/LoadingContext";
import LoadingWrapper from "@/components/common/LoadingWrapper";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const stretchPro = localFont({
  src: [
    {
      path: "../../public/fonts/StretchProRegular.woff2",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-stretchPro",
  preload: true,
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-barlow",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-base1 ${barlow.variable} ${stretchPro.variable}`}>
        <InitialLoadOverlay />
        <LoadingProvider>
          <LoadingWrapper>
            <Header />
            <NuqsAdapter>
              <main className="flex-grow">{children}</main>
            </NuqsAdapter>
            <WidgetSection />
            <Footer />
            <Toaster richColors />
          </LoadingWrapper>
        </LoadingProvider>
      </body>
    </html>
  );
}
