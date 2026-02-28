"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Each nav item maps to a real Next.js route ──────────────────────────────
const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Products", href: "/products" },
  { label: "News",     href: "/news" },
  { label: "Partners", href: "/partners" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const pathname   = usePathname();   // tells us which route is active
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add glass blur when user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

        .nav-link {
          font-family: 'Barlow', sans-serif;
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.48);
          text-decoration: none;
          position: relative;
          padding-bottom: 3px;
          transition: color 0.2s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          height: 1px; width: 0;
          background: currentColor;
          transition: width 0.25s ease;
        }
        .nav-link:hover            { color: rgba(255,255,255,0.9); }
        .nav-link:hover::after     { width: 100%; }
        .nav-link.active           { color: #fff; }
        .nav-link.active::after    { width: 100%; }

        .mob-link {
          font-family: 'Barlow', sans-serif;
          font-size: 13px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 24px;
          transition: background 0.15s, color 0.15s;
        }
        .mob-link:hover  { background: rgba(255,255,255,0.05); color: #fff; }
        .mob-link.active { color: #fff; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-drawer { animation: slideDown 0.22s ease forwards; }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(10,14,20,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "background 0.35s, backdrop-filter 0.35s, border-color 0.35s",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>

            {/* ── LOGO ── */}
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 22,
                color: "#fff",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}>
                ASORT
              </span>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>®</span>
            </Link>

            {/* ── DESKTOP LINKS ── */}
            <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="hidden-mobile">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link ${pathname === href ? "active" : ""}`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* ── EST. tag ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hidden-mobile">
              <div style={{ width: 32, height: 1, background: "rgba(255,255,255,0.15)" }} />
              <span style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: 9, fontWeight: 500,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
              }}>
                EST. 2025
              </span>
            </div>

            {/* ── HAMBURGER (mobile) ── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                display: "none",
                flexDirection: "column", gap: 5,
                background: "none", border: "none", cursor: "pointer", padding: 4,
              }}
              className="show-mobile"
            >
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: "block",
                  width: 22, height: 1.5,
                  background: "rgba(255,255,255,0.7)",
                  transition: "all 0.28s ease",
                  transform:
                    menuOpen && i === 0 ? "rotate(45deg) translate(4px, 4px)" :
                    menuOpen && i === 2 ? "rotate(-45deg) translate(4px, -4px)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* ── MOBILE DRAWER ── */}
        {menuOpen && (
          <div
            className="mobile-drawer show-mobile"
            style={{
              background: "rgba(10,14,20,0.96)",
              backdropFilter: "blur(24px)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <Link
                key={href}
                href={href}
                className={`mob-link ${pathname === href ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  borderBottom: i < NAV_LINKS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <span>{label}</span>
                <span style={{ opacity: 0.25, fontSize: 12 }}>→</span>
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Responsive helpers */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
