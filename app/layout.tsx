import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted variable fonts (SIL Open Font License). Bundling them keeps
// builds independent of Google Fonts being reachable.
const display = localFont({
  src: "./fonts/schibsted-grotesk-latin-wght-normal.woff2",
  variable: "--ff-display",
  weight: "400 900",
  display: "swap",
});

const body = localFont({
  src: [
    { path: "./fonts/source-serif-4-latin-wght-normal.woff2", style: "normal" },
    { path: "./fonts/source-serif-4-latin-wght-italic.woff2", style: "italic" },
  ],
  variable: "--ff-body",
  weight: "200 900",
  display: "swap",
});

const code = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--ff-code",
  weight: "100 800",
  display: "swap",
});

const title = "Mehrad Andalibi · Software Developer";
const description =
  "Software developer in Ottawa building backend systems in Java and Spring Boot, with a business perspective. Currently building a VDA 5050 fleet orchestrator.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mehradandalibi.dev"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Mehrad Andalibi",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Mehrad Andalibi at his desk" }],
    locale: "en_CA",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#efece7",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Marks that JS runs, so entrance animations may start from a hidden state */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${display.variable} ${body.variable} ${code.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
