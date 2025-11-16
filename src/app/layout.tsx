import type { Metadata, Viewport } from "next";
import { Playfair_Display, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://aztec-learning.example.com";
const title = "Aztec Learning Collective";
const description =
  "Discover a richly designed learning experience that blends modern study tools with Aztec calendar wisdom.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  applicationName: title,
  keywords: [
    "Aztec calendar",
    "learning platform",
    "education",
    "accessible design",
    "responsive UI",
  ],
  authors: [{ name: "Aztec Learning Studio" }],
  creator: "Aztec Learning Studio",
  publisher: "Aztec Learning Studio",
  category: "education",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: title,
    title,
    description,
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Aztec Learning Collective interface preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@aztec_learning",
    site: "@aztec_learning",
    title,
    description,
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2e8a76",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: title,
  url: siteUrl,
  description,
  sameAs: [
    "https://www.linkedin.com",
    "https://www.youtube.com",
  ],
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    price: "0",
    priceCurrency: "USD",
    description: "Interactive guides and calendar tools inspired by Aztec knowledge systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-[color:var(--color-surface)] text-[color:var(--color-ink)]">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-[999] rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify(structuredData)}
        </Script>
      </body>
    </html>
  );
}
