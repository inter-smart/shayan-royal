import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Barlow } from "next/font/google";
import localFont from "next/font/local";
import WidgetSection from "@/components/common/WidgetSection";
import { Toaster } from "sonner";
import { LoadingProvider } from "@/contexts/LoadingContext";
import LoadingWrapper from "@/components/common/LoadingWrapper";

// Function to fetch banner status
async function getBannerStatus() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inventories/banner-status`, {
      cache: 'no-store', // Ensure fresh data on each request
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch banner status');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching banner status:', error);
    return { success: false, data: { status: 'inactive' } };
  }
}

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
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-barlow",
});

export default async function RootLayout({ children }) {
  // Fetch banner status
  const {data: bannerStatus} = await getBannerStatus();
  console.log("bannerStatus", bannerStatus);
  
  // Convert status to boolean: true if active, false otherwise
  const isBannerActive = bannerStatus?.status === 'active';

  return (
    <html lang="en">
      <body className={`font-base1 ${barlow.variable} ${stretchPro.variable}`}>
        <LoadingProvider>
          <LoadingWrapper>
            <Header bannerStatus={isBannerActive} />
            <main className="flex-grow">{children}</main>
            <WidgetSection />
            <Footer />
            <Toaster richColors />
          </LoadingWrapper>
        </LoadingProvider>
      </body>
    </html>
  );
}
