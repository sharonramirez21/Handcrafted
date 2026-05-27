import type { Metadata } from "next";
import "./globals.css";
import PublicSidebar from "@/components/PublicSidebar";

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven',
    default: 'Handcrafted Haven',
  },
  description: 'A handmade marketplace for atisans and conscious consumers.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className = "page">
          <PublicSidebar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
