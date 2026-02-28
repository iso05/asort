import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Asort — Premium Food Products",
  description: "Farm-direct sugar, rice, buckwheat, lentils and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0a0e14" }}>
        {/* Navbar sits on top of every page */}
        <Navbar />
        {/* Page content — each page is responsible for its own top padding (pt-16) */}
        <main>{children}</main>
      </body>
    </html>
  );
}
