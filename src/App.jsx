import { useState, useEffect, useRef } from "react";

// ─── BRAND & THEME ───────────────────────────────────────────────────────────
const THEME = {
  red: "#E60000",
  redDark: "#B30000",
  redLight: "#FF3333",
  white: "#FFFFFF",
  offWhite: "#F5F5F5",
  black: "#0A0A0A",
  charcoal: "#1A1A1A",
  steel: "#2A2A2A",
  midGrey: "#555555",
  lightGrey: "#AAAAAA",
  green: "#00B04A",
  amber: "#FF8C00",
  blue: "#0070CC",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --red: #E60000;
    --red-dark: #B30000;
    --red-light: #FF3333;
    --white: #FFFFFF;
    --off-white: #F5F5F5;
    --black: #0A0A0A;
    --charcoal: #1A1A1A;
    --steel: #2A2A2A;
    --mid-grey: #555555;
    --light-grey: #AAAAAA;
    --green: #00B04A;
    --amber: #FF8C00;
    --blue: #0070CC;
    --font-display: 'Rajdhani', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  body { font-family: var(--font-body); background: var(--black); color: var(--white); overflow-x: hidden; }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--charcoal); }
  ::-webkit-scrollbar-thumb { background: var(--red); border-radius: 2px; }

  /* ── HERO ── */
  .hero-wrap {
    position: relative; min-height: 100vh; display: flex; flex-direction: column;
    background: var(--black); overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background:
      radial-gradient(ellipse 80% 60% at 60% 40%, rgba(230,0,0,0.18) 0%, transparent 70%),
      radial-gradient(ellipse 50% 40% at 20% 80%, rgba(230,0,0,0.10) 0%, transparent 60%),
      linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%);
  }
  .hero-grid {
    position: absolute; inset: 0; z-index: 1; opacity: 0.04;
    background-image: linear-gradient(rgba(230,0,0,0.8) 1px, transparent 1px),
      linear-gradient(90deg, rgba(230,0,0,0.8) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-orb {
    position: absolute; border-radius: 50%; filter: blur(80px); z-index: 1; animation: pulse-orb 4s ease-in-out infinite;
  }
  .hero-orb-1 { width: 500px; height: 500px; background: rgba(230,0,0,0.15); top: -100px; right: -100px; }
  .hero-orb-2 { width: 300px; height: 300px; background: rgba(230,0,0,0.08); bottom: 50px; left: -50px; animation-delay: 2s; }
  @keyframes pulse-orb { 0%,100%{transform:scale(1);opacity:0.8} 50%{transform:scale(1.1);opacity:1} }

  .hero-nav {
    position: relative; z-index: 10; display: flex; align-items: center; justify-content: space-between;
    padding: 24px 48px; border-bottom: 1px solid rgba(230,0,0,0.2);
    background: rgba(10,10,10,0.6); backdrop-filter: blur(12px);
  }
  .hero-logo-mark {
    display: flex; align-items: center; gap: 12px; text-decoration: none;
  }
  .logo-emblem {
    width: 44px; height: 44px; background: var(--red);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    display: flex; align-items: center; justify-content: center; font-family: var(--font-display);
    font-weight: 700; font-size: 18px; color: white; letter-spacing: -1px;
    position: relative; overflow: hidden;
  }
  .logo-emblem::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%);
  }
  .logo-text { font-family: var(--font-display); font-size: 22px; font-weight: 700; letter-spacing: 2px; }
  .logo-text span { color: var(--red); }

  .hero-content {
    position: relative; z-index: 10; flex: 1; display: flex; flex-direction: column;
    align-items: flex-start; justify-content: center; padding: 60px 48px;
    max-width: 700px;
  }
  .hero-eyebrow {
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 4px; color: var(--red);
    text-transform: uppercase; margin-bottom: 24px;
    display: flex; align-items: center; gap: 12px;
  }
  .hero-eyebrow::before { content:''; width:32px; height:1px; background:var(--red); }
  .hero-h1 {
    font-family: var(--font-display); font-size: clamp(52px,7vw,96px); font-weight: 700;
    line-height: 0.95; letter-spacing: -1px; margin-bottom: 24px;
    text-transform: uppercase;
  }
  .hero-h1 .accent { color: var(--red); display: block; }
  .hero-sub {
    font-size: 16px; color: var(--light-grey); line-height: 1.7; max-width: 480px; margin-bottom: 40px;
  }
  .hero-cta {
    display: flex; gap: 16px; flex-wrap: wrap;
  }
  .btn-primary {
    font-family: var(--font-display); font-size: 15px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; padding: 14px 36px; background: var(--red); color: white;
    border: none; cursor: pointer; clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
    transition: all 0.2s; position: relative; overflow: hidden;
  }
  .btn-primary::after {
    content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transform: translateX(-100%); transition: transform 0.4s;
  }
  .btn-primary:hover { background: var(--red-light); transform: translateY(-2px); }
  .btn-primary:hover::after { transform: translateX(100%); }

  .btn-ghost {
    font-family: var(--font-display); font-size: 15px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; padding: 13px 32px; background: transparent; color: var(--light-grey);
    border: 1px solid rgba(255,255,255,0.15); cursor: pointer;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
    transition: all 0.2s;
  }
  .btn-ghost:hover { color: white; border-color: rgba(255,255,255,0.4); }

  .hero-stats {
    position: absolute; bottom: 40px; right: 48px; z-index: 10;
    display: flex; gap: 40px;
  }
  .stat-item { text-align: right; }
  .stat-num { font-family: var(--font-display); font-size: 32px; font-weight: 700; color: var(--red); line-height: 1; }
  .stat-label { font-size: 11px; color: var(--light-grey); letter-spacing: 2px; text-transform: uppercase; }

  .hero-phone-mockup {
    position: absolute; right: 48px; top: 50%; transform: translateY(-50%); z-index: 5;
    width: 280px; opacity: 0.6;
    animation: float-phone 6s ease-in-out infinite;
  }
  @keyframes float-phone { 0%,100%{transform:translateY(-50%) rotate(-3deg)} 50%{transform:translateY(calc(-50% - 20px)) rotate(-3deg)} }

  /* ── LOGIN ── */
  .login-wrap {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: var(--black); position: relative; overflow: hidden;
  }
  .login-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 70% at 0% 50%, rgba(230,0,0,0.12) 0%, transparent 60%),
      linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%);
  }
  .login-card {
    position: relative; z-index: 10; width: 100%; max-width: 420px; padding: 48px 40px;
    background: var(--charcoal); border: 1px solid rgba(230,0,0,0.25);
    border-top: 3px solid var(--red);
    box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(230,0,0,0.08);
  }
  .login-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 36px; }
  .login-title {
    font-family: var(--font-display); font-size: 28px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; margin-bottom: 4px;
  }
  .login-sub { font-size: 13px; color: var(--light-grey); margin-bottom: 32px; }
  .field-label {
    display: block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px;
    color: var(--light-grey); text-transform: uppercase; margin-bottom: 8px;
  }
  .field-wrap { margin-bottom: 20px; }
  .field-input {
    width: 100%; padding: 13px 16px; background: var(--steel); border: 1px solid rgba(255,255,255,0.08);
    color: white; font-family: var(--font-body); font-size: 15px; outline: none;
    transition: border-color 0.2s;
  }
  .field-input:focus { border-color: var(--red); }
  .field-input::placeholder { color: var(--mid-grey); }
  .role-pills { display: flex; gap: 8px; margin-bottom: 28px; }
  .role-pill {
    flex: 1; padding: 8px; background: var(--steel); border: 1px solid rgba(255,255,255,0.08);
    color: var(--light-grey); font-size: 12px; font-family: var(--font-mono); cursor: pointer;
    text-align: center; transition: all 0.2s; letter-spacing: 1px;
  }
  .role-pill.active { background: rgba(230,0,0,0.15); border-color: var(--red); color: var(--red); }
  .login-error {
    background: rgba(230,0,0,0.1); border: 1px solid rgba(230,0,0,0.3); padding: 10px 14px;
    font-size: 13px; color: #ff6666; margin-bottom: 20px;
  }
  .login-demo { margin-top: 24px; padding: 16px; background: var(--steel); border: 1px solid rgba(255,255,255,0.06); }
  .demo-title { font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: var(--light-grey); margin-bottom: 10px; }
  .demo-row { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px; }
  .demo-key { color: var(--light-grey); font-family: var(--font-mono); }
  .demo-val { color: var(--red); font-family: var(--font-mono); cursor: pointer; }
  .demo-val:hover { text-decoration: underline; }

  /* ── APP SHELL ── */
  .app-wrap { display: flex; min-height: 100vh; background: var(--black); }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 220px; min-height: 100vh; background: var(--charcoal);
    border-right: 1px solid rgba(230,0,0,0.15); display: flex; flex-direction: column;
    position: sticky; top: 0; height: 100vh; overflow-y: auto; flex-shrink: 0;
  }
  .sidebar-brand {
    padding: 24px 20px; border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; gap: 10px;
  }
  .sidebar-nav { flex: 1; padding: 16px 0; }
  .nav-section-label {
    font-family: var(--font-mono); font-size: 9px; letter-spacing: 3px; color: var(--mid-grey);
    text-transform: uppercase; padding: 16px 20px 6px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 12px; padding: 11px 20px;
    color: var(--light-grey); font-size: 14px; cursor: pointer; transition: all 0.15s;
    border-left: 3px solid transparent; position: relative;
  }
  .nav-item:hover { color: white; background: rgba(255,255,255,0.04); }
  .nav-item.active { color: white; background: rgba(230,0,0,0.1); border-left-color: var(--red); }
  .nav-icon { width: 18px; height: 18px; opacity: 0.7; flex-shrink: 0; }
  .nav-item.active .nav-icon { opacity: 1; }
  .sidebar-footer {
    padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.06);
  }
  .user-chip {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
    background: var(--steel); margin-bottom: 8px;
  }
  .user-avatar {
    width: 28px; height: 28px; background: var(--red); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-size: 13px; font-weight: 700;
  }
  .user-info-name { font-size: 13px; font-weight: 500; }
  .user-role-badge {
    font-family: var(--font-mono); font-size: 9px; letter-spacing: 1px;
    color: var(--red); text-transform: uppercase;
  }
  .logout-btn {
    width: 100%; padding: 9px; background: transparent; border: 1px solid rgba(255,255,255,0.08);
    color: var(--light-grey); font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
    cursor: pointer; text-transform: uppercase; transition: all 0.15s;
  }
  .logout-btn:hover { border-color: var(--red); color: var(--red); }

  /* ── MAIN ── */
  .main-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .top-bar {
    padding: 16px 28px; background: var(--charcoal); border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
  }
  .page-title { font-family: var(--font-display); font-size: 22px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
  .page-sub { font-size: 12px; color: var(--light-grey); margin-top: 1px; }
  .top-actions { display: flex; gap: 10px; align-items: center; }
  .search-bar {
    display: flex; align-items: center; gap: 8px; background: var(--steel);
    border: 1px solid rgba(255,255,255,0.08); padding: 8px 14px;
  }
  .search-bar input {
    background: transparent; border: none; outline: none; color: white;
    font-family: var(--font-body); font-size: 13px; width: 180px;
  }
  .search-bar input::placeholder { color: var(--mid-grey); }
  .content-area { flex: 1; padding: 24px 28px; overflow-y: auto; }

  /* ── CARDS ── */
  .stat-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px; margin-bottom: 24px; }
  .stat-card {
    background: var(--charcoal); border: 1px solid rgba(255,255,255,0.06);
    border-top: 2px solid var(--red); padding: 20px;
    position: relative; overflow: hidden;
  }
  .stat-card::before {
    content: ''; position: absolute; top: -30px; right: -30px; width: 80px; height: 80px;
    border-radius: 50%; background: rgba(230,0,0,0.06);
  }
  .stat-card-num { font-family: var(--font-display); font-size: 36px; font-weight: 700; color: var(--red); line-height: 1; }
  .stat-card-label { font-size: 12px; color: var(--light-grey); margin-top: 6px; letter-spacing: 0.5px; }
  .stat-card.green { border-top-color: var(--green); }
  .stat-card.green .stat-card-num { color: var(--green); }
  .stat-card.amber { border-top-color: var(--amber); }
  .stat-card.amber .stat-card-num { color: var(--amber); }
  .stat-card.blue { border-top-color: var(--blue); }
  .stat-card.blue .stat-card-num { color: var(--blue); }

  /* ── PRODUCT GRID ── */
  .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }
  .product-card {
    background: var(--charcoal); border: 1px solid rgba(255,255,255,0.06);
    padding: 0; cursor: pointer; transition: all 0.2s; overflow: hidden;
    position: relative;
  }
  .product-card:hover { border-color: rgba(230,0,0,0.4); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.4); }
  .product-card-img {
    height: 130px; background: var(--steel); display: flex; align-items: center; justify-content: center;
    font-size: 48px; position: relative; overflow: hidden;
  }
  .product-card-img::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 40px;
    background: linear-gradient(transparent, var(--charcoal));
  }
  .product-card-body { padding: 14px 16px; }
  .product-card-name { font-family: var(--font-display); font-size: 16px; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 4px; }
  .product-card-brand { font-size: 11px; color: var(--light-grey); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px; }
  .product-card-footer { display: flex; align-items: center; justify-content: space-between; }
  .product-qty {
    font-family: var(--font-mono); font-size: 13px; padding: 3px 8px;
    border-radius: 2px;
  }
  .qty-good { background: rgba(0,176,74,0.15); color: var(--green); }
  .qty-low { background: rgba(255,140,0,0.15); color: var(--amber); }
  .qty-out { background: rgba(230,0,0,0.15); color: var(--red-light); }
  .product-price { font-family: var(--font-display); font-size: 17px; font-weight: 700; color: var(--red); }

  /* ── STOCK TABLE ── */
  .data-table { width: 100%; border-collapse: collapse; }
  .data-table th {
    font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--mid-grey); padding: 10px 14px; text-align: left;
    border-bottom: 1px solid rgba(255,255,255,0.06); white-space: nowrap;
  }
  .data-table td {
    padding: 12px 14px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.04);
    vertical-align: middle;
  }
  .data-table tr:hover td { background: rgba(255,255,255,0.02); }
  .badge {
    display: inline-block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 1px;
    padding: 3px 8px; border-radius: 2px; text-transform: uppercase;
  }
  .badge-green { background: rgba(0,176,74,0.15); color: var(--green); }
  .badge-amber { background: rgba(255,140,0,0.15); color: var(--amber); }
  .badge-red { background: rgba(230,0,0,0.15); color: #ff6666; }
  .badge-blue { background: rgba(0,112,204,0.15); color: #4da6ff; }

  /* ── MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px);
    z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px;
    animation: fade-in 0.15s ease;
  }
  @keyframes fade-in { from{opacity:0} to{opacity:1} }
  .modal-box {
    background: var(--charcoal); border: 1px solid rgba(230,0,0,0.25); border-top: 3px solid var(--red);
    width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto;
    box-shadow: 0 40px 80px rgba(0,0,0,0.7);
    animation: slide-up 0.2s ease;
  }
  @keyframes slide-up { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
  .modal-header {
    padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: space-between;
  }
  .modal-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
  .modal-close {
    width: 32px; height: 32px; background: var(--steel); border: none; color: var(--light-grey);
    cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
  }
  .modal-close:hover { background: rgba(230,0,0,0.2); color: white; }
  .modal-body { padding: 24px; }
  .modal-footer { padding: 16px 24px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; gap: 10px; justify-content: flex-end; }

  /* ── VARIANT SELECTOR ── */
  .variant-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 8px; margin-bottom: 20px; }
  .variant-btn {
    padding: 10px 8px; background: var(--steel); border: 1px solid rgba(255,255,255,0.08);
    color: var(--light-grey); font-family: var(--font-mono); font-size: 12px; cursor: pointer;
    text-align: center; transition: all 0.15s;
  }
  .variant-btn:hover { border-color: rgba(230,0,0,0.4); color: white; }
  .variant-btn.selected { background: rgba(230,0,0,0.15); border-color: var(--red); color: white; }
  .variant-btn.out { opacity: 0.35; cursor: not-allowed; text-decoration: line-through; }
  .variant-qty-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding: 10px 12px; background: var(--steel); }
  .qty-ctrl { display: flex; align-items: center; gap: 12px; }
  .qty-btn {
    width: 28px; height: 28px; background: var(--charcoal); border: 1px solid rgba(255,255,255,0.1);
    color: white; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.15s;
  }
  .qty-btn:hover { border-color: var(--red); color: var(--red); }
  .qty-num { font-family: var(--font-mono); font-size: 15px; width: 30px; text-align: center; }

  /* ── TABS ── */
  .tab-bar { display: flex; gap: 0; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 20px; }
  .tab-btn {
    padding: 10px 20px; background: transparent; border: none; color: var(--light-grey);
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
    cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s; margin-bottom: -1px;
  }
  .tab-btn:hover { color: white; }
  .tab-btn.active { color: var(--red); border-bottom-color: var(--red); }

  /* ── FORM ── */
  .form-row { margin-bottom: 18px; }
  .form-label {
    display: block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px;
    color: var(--light-grey); text-transform: uppercase; margin-bottom: 8px;
  }
  .form-input {
    width: 100%; padding: 11px 14px; background: var(--steel); border: 1px solid rgba(255,255,255,0.08);
    color: white; font-family: var(--font-body); font-size: 14px; outline: none; transition: border-color 0.2s;
  }
  .form-input:focus { border-color: var(--red); }
  .form-select {
    width: 100%; padding: 11px 14px; background: var(--steel); border: 1px solid rgba(255,255,255,0.08);
    color: white; font-family: var(--font-body); font-size: 14px; outline: none;
    appearance: none; cursor: pointer;
  }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  /* ── ADJUSTMENT ── */
  .adj-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
  .adj-pill {
    padding: 8px 16px; background: var(--steel); border: 1px solid rgba(255,255,255,0.08);
    color: var(--light-grey); font-size: 13px; cursor: pointer; transition: all 0.15s;
    display: flex; align-items: center; gap: 6px;
  }
  .adj-pill.active { background: rgba(230,0,0,0.15); border-color: var(--red); color: white; }
  .adj-log { margin-top: 20px; }
  .adj-log-item {
    display: flex; align-items: center; justify-content: space-between; padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 13px;
  }
  .adj-type-icon { font-size: 16px; margin-right: 8px; }

  /* ── STOCK TAKE ── */
  .stocktake-row {
    display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 10px; align-items: center;
    padding: 10px 14px; background: var(--steel); margin-bottom: 8px;
  }
  .stocktake-input {
    width: 100%; padding: 7px 10px; background: var(--charcoal); border: 1px solid rgba(255,255,255,0.1);
    color: white; font-family: var(--font-mono); font-size: 13px; text-align: center; outline: none;
  }
  .stocktake-input:focus { border-color: var(--red); }
  .variance-pos { color: var(--green); font-family: var(--font-mono); }
  .variance-neg { color: #ff6666; font-family: var(--font-mono); }
  .variance-zero { color: var(--mid-grey); font-family: var(--font-mono); }

  /* ── TOAST ── */
  .toast-wrap { position: fixed; top: 20px; right: 20px; z-index: 999; display: flex; flex-direction: column; gap: 8px; }
  .toast {
    background: var(--charcoal); border: 1px solid rgba(255,255,255,0.1); border-left: 3px solid var(--green);
    padding: 12px 18px; font-size: 13px; min-width: 240px; max-width: 340px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    animation: toast-in 0.2s ease; display: flex; align-items: center; gap: 10px;
  }
  .toast.error { border-left-color: var(--red); }
  .toast.warning { border-left-color: var(--amber); }
  @keyframes toast-in { from{transform:translateX(20px);opacity:0} to{transform:translateX(0);opacity:1} }

  /* ── TEST BANNER ── */
  .test-banner {
    background: rgba(230,0,0,0.1); border-bottom: 1px solid rgba(230,0,0,0.3);
    padding: 6px 20px; text-align: center; font-family: var(--font-mono);
    font-size: 10px; letter-spacing: 3px; color: var(--red-light); text-transform: uppercase;
  }

  /* ── SECTION CARD ── */
  .section-card {
    background: var(--charcoal); border: 1px solid rgba(255,255,255,0.06); padding: 20px; margin-bottom: 16px;
  }
  .section-card-title {
    font-family: var(--font-display); font-size: 14px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: var(--light-grey); margin-bottom: 16px;
    display: flex; align-items: center; gap: 10px;
  }
  .section-card-title::after { content:''; flex:1; height:1px; background:rgba(255,255,255,0.06); }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .sidebar { width: 60px; }
    .sidebar-brand .logo-text, .nav-item span, .sidebar-footer .user-info-name,
    .sidebar-footer .user-role-badge, .nav-section-label { display: none; }
    .nav-item { justify-content: center; padding: 12px; }
    .hero-nav { padding: 16px 20px; }
    .hero-content { padding: 40px 20px; }
    .hero-stats { display: none; }
    .hero-phone-mockup { display: none; }
    .content-area { padding: 16px; }
    .product-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
  }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────
const TEST_MODE = true;

const CREDENTIALS = [
  { username: "admin", password: "Voda@Admin2024", role: "admin", name: "Admin" },
  { username: "staff", password: "voda123", role: "staff", name: "Staff User" },
  { username: "sales1", password: "voda123", role: "staff", name: "Sales Rep 1" },
];

const INITIAL_STOCK = [
  { id: 1, brand: "Samsung", category: "Galaxy S25 Ultra", sku: "SS25U", emoji: "📱",
    variants: [
      { color: "Titanium Black", storage: "256GB", qty: 8, price: 24999 },
      { color: "Titanium Gray", storage: "512GB", qty: 5, price: 27999 },
      { color: "Titanium White", storage: "1TB", qty: 2, price: 32999 },
    ]},
  { id: 2, brand: "Apple", category: "iPhone 16 Pro", sku: "IP16P", emoji: "🍎",
    variants: [
      { color: "Black Titanium", storage: "128GB", qty: 12, price: 23499 },
      { color: "White Titanium", storage: "256GB", qty: 7, price: 26499 },
      { color: "Desert Titanium", storage: "512GB", qty: 3, price: 31499 },
    ]},
  { id: 3, brand: "Samsung", category: "Galaxy A55", sku: "SSA55", emoji: "📲",
    variants: [
      { color: "Awesome Navy", storage: "128GB", qty: 20, price: 9999 },
      { color: "Awesome Lilac", storage: "256GB", qty: 15, price: 11999 },
    ]},
  { id: 4, brand: "Huawei", category: "Nova 12", sku: "HWN12", emoji: "📡",
    variants: [
      { color: "Black", storage: "256GB", qty: 6, price: 8499 },
      { color: "Silver", storage: "256GB", qty: 4, price: 8499 },
    ]},
  { id: 5, brand: "Apple", category: "iPhone 15", sku: "IP15S", emoji: "🔷",
    variants: [
      { color: "Blue", storage: "128GB", qty: 9, price: 17999 },
      { color: "Pink", storage: "128GB", qty: 11, price: 17999 },
      { color: "Green", storage: "256GB", qty: 4, price: 20999 },
    ]},
  { id: 6, brand: "Xiaomi", category: "14T Pro", sku: "XM14T", emoji: "⚡",
    variants: [
      { color: "Titanium Black", storage: "512GB", qty: 7, price: 13999 },
      { color: "Titan Blue", storage: "512GB", qty: 3, price: 13999 },
    ]},
  { id: 7, brand: "Accessories", category: "Screen Protector", sku: "SCRPRT", emoji: "🛡️",
    variants: [
      { color: "Universal 6.1\"", storage: "Single", qty: 45, price: 299 },
      { color: "Universal 6.7\"", storage: "Single", qty: 38, price: 349 },
    ]},
  { id: 8, brand: "Accessories", category: "Fast Charger 65W", sku: "FC65W", emoji: "🔌",
    variants: [
      { color: "Black", storage: "USB-C", qty: 30, price: 599 },
      { color: "White", storage: "USB-C", qty: 22, price: 599 },
    ]},
];

const ADJ_TYPES = [
  { id: "receive", label: "Receive Stock", icon: "➕", color: THEME.green },
  { id: "writeoff", label: "Write-off", icon: "➖", color: "#ff6666" },
  { id: "transfer", label: "Transfer Out", icon: "↗️", color: THEME.blue },
  { id: "return", label: "Return to Supplier", icon: "↩️", color: THEME.amber },
  { id: "demo", label: "Demo Unit", icon: "🔍", color: THEME.midGrey },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmtPrice = (p) => `R ${p.toLocaleString("en-ZA")}`;
const totalQty = (product) => product.variants.reduce((s, v) => s + v.qty, 0);
const getQtyClass = (qty) => qty === 0 ? "qty-out" : qty <= 3 ? "qty-low" : "qty-good";
const getBadgeClass = (qty) => qty === 0 ? "badge badge-red" : qty <= 3 ? "badge badge-amber" : "badge badge-green";
const getQtyLabel = (qty) => qty === 0 ? "OUT" : qty <= 3 ? "LOW" : "OK";

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icons = {
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Stock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>
  ),
  Add: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Adjust: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
      <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
    </svg>
  ),
  Stocktake: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Logout: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
};

// ─── TOAST ───────────────────────────────────────────────────────────────────
function ToastContainer({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type || ""}`}>
          <span>{t.type === "error" ? "⚠️" : t.type === "warning" ? "⚡" : "✓"}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

// ─── HERO PAGE ────────────────────────────────────────────────────────────────
function HeroPage({ onEnter }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div className="hero-wrap">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      {/* Phone mockup SVG */}
      <div className="hero-phone-mockup">
        <svg viewBox="0 0 280 560" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="260" height="540" rx="36" fill="#1A1A1A" stroke="rgba(230,0,0,0.4)" strokeWidth="2"/>
          <rect x="20" y="20" width="240" height="520" rx="30" fill="#0A0A0A"/>
          <rect x="40" y="60" width="200" height="380" rx="4" fill="#1A1A1A"/>
          <rect x="40" y="60" width="200" height="50" rx="4" fill="#E60000" opacity="0.9"/>
          <rect x="50" y="75" width="80" height="6" rx="3" fill="white" opacity="0.9"/>
          <rect x="50" y="87" width="50" height="4" rx="2" fill="rgba(255,255,255,0.5)"/>
          <rect x="50" y="125" width="85" height="70" rx="4" fill="#2A2A2A"/>
          <rect x="145" y="125" width="85" height="70" rx="4" fill="#2A2A2A"/>
          <rect x="50" y="205" width="85" height="70" rx="4" fill="#2A2A2A"/>
          <rect x="145" y="205" width="85" height="70" rx="4" fill="#2A2A2A"/>
          <text x="92" y="168" textAnchor="middle" fontSize="24" fill="rgba(255,255,255,0.6)">📱</text>
          <text x="187" y="168" textAnchor="middle" fontSize="24" fill="rgba(255,255,255,0.6)">📲</text>
          <text x="92" y="248" textAnchor="middle" fontSize="24" fill="rgba(255,255,255,0.6)">🔌</text>
          <text x="187" y="248" textAnchor="middle" fontSize="24" fill="rgba(255,255,255,0.6)">🛡️</text>
          <rect x="50" y="290" width="180" height="6" rx="3" fill="#E60000" opacity="0.6"/>
          <rect x="50" y="310" width="180" height="4" rx="2" fill="#2A2A2A"/>
          <rect x="50" y="322" width="140" height="4" rx="2" fill="#2A2A2A"/>
          <rect x="50" y="334" width="160" height="4" rx="2" fill="#2A2A2A"/>
          <circle cx="140" cy="540" r="18" fill="#1A1A1A" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        </svg>
      </div>

      {/* NAV */}
      <nav className="hero-nav">
        <div className="hero-logo-mark">
          <div className="logo-emblem">V</div>
          <div className="logo-text">VODA<span>STOCK</span></div>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: THEME.lightGrey }}>Stock Management</span>
          <span style={{ fontSize: 13, color: THEME.lightGrey }}>|</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: THEME.red, letterSpacing: 2 }}>
            {TEST_MODE ? "TEST MODE" : "LIVE"}
          </span>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="hero-content" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease, transform 0.8s ease", transform: visible ? "none" : "translateY(20px)" }}>
        <div className="hero-eyebrow">Vodacom Authorised Dealer</div>
        <h1 className="hero-h1">
          Connected
          <span className="accent">Stock.</span>
          Controlled.
        </h1>
        <p className="hero-sub">
          Real-time inventory management for your Vodacom retail store. Track handsets, accessories, and stock movements — all from one powerful dashboard.
        </p>
        <div className="hero-cta">
          <button className="btn-primary" onClick={onEnter}>ENTER SYSTEM →</button>
          <button className="btn-ghost">LEARN MORE</button>
        </div>
        <div style={{ marginTop: 40, display: "flex", gap: 32 }}>
          {[["8", "Product Lines"], ["3", "Warehouses"], ["99.9%", "Uptime"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: THEME.red }}>{n}</div>
              <div style={{ fontSize: 11, color: THEME.lightGrey, letterSpacing: 2, textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const cred = CREDENTIALS.find(c => c.username === username && c.password === password);
    if (cred) { setError(""); onLogin(cred); }
    else setError("Invalid credentials. Please try again.");
  };

  const fillDemo = (u, p) => { setUsername(u); setPassword(p); setError(""); };

  return (
    <div className="login-wrap">
      <div className="login-bg" />
      {/* Decorative grid */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(230,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(230,0,0,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="login-card">
        <div className="login-logo">
          <div className="logo-emblem">V</div>
          <div>
            <div className="logo-text" style={{ fontSize: 18 }}>VODA<span style={{ color: THEME.red }}>STOCK</span></div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 2, color: THEME.lightGrey }}>INVENTORY SYSTEM</div>
          </div>
        </div>

        <div className="login-title">Sign In</div>
        <div className="login-sub">Enter your credentials to access the stock management portal.</div>

        {error && <div className="login-error">⚠ {error}</div>}

        <div className="field-wrap">
          <label className="field-label">Username</label>
          <input className="field-input" value={username} onChange={e => setUsername(e.target.value)}
            placeholder="Enter username" onKeyDown={e => e.key === "Enter" && handleLogin()} />
        </div>
        <div className="field-wrap">
          <label className="field-label">Password</label>
          <input className="field-input" type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Enter password" onKeyDown={e => e.key === "Enter" && handleLogin()} />
        </div>

        <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={handleLogin}>
          ACCESS SYSTEM →
        </button>

        {TEST_MODE && (
          <div className="login-demo">
            <div className="demo-title">Test Mode Credentials</div>
            {CREDENTIALS.map(c => (
              <div key={c.username} className="demo-row">
                <span className="demo-key">{c.username} / {c.password}</span>
                <span className="demo-val" onClick={() => fillDemo(c.username, c.password)}>
                  [{c.role.toUpperCase()}] → Use
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ stock }) {
  const total = stock.reduce((s, p) => s + totalQty(p), 0);
  const totalVal = stock.reduce((s, p) => s + p.variants.reduce((vs, v) => vs + v.qty * v.price, 0), 0);
  const lowItems = stock.filter(p => totalQty(p) > 0 && totalQty(p) <= 5);
  const outItems = stock.filter(p => totalQty(p) === 0);

  return (
    <div>
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-card-num">{stock.length}</div>
          <div className="stat-card-label">Product Lines</div>
        </div>
        <div className="stat-card green">
          <div className="stat-card-num">{total}</div>
          <div className="stat-card-label">Total Units</div>
        </div>
        <div className="stat-card amber">
          <div className="stat-card-num">{lowItems.length}</div>
          <div className="stat-card-label">Low Stock</div>
        </div>
        <div className="stat-card" style={{ borderTopColor: "#ff6666" }}>
          <div className="stat-card-num" style={{ color: "#ff6666" }}>{outItems.length}</div>
          <div className="stat-card-label">Out of Stock</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-card-num" style={{ fontSize: 22, color: THEME.blue }}>{fmtPrice(totalVal)}</div>
          <div className="stat-card-label">Stock Value</div>
        </div>
      </div>

      {lowItems.length > 0 && (
        <div className="section-card" style={{ borderLeft: `3px solid ${THEME.amber}` }}>
          <div className="section-card-title">⚡ Low Stock Alerts</div>
          <table className="data-table">
            <thead>
              <tr><th>Product</th><th>SKU</th><th>Brand</th><th>Total Qty</th><th>Status</th></tr>
            </thead>
            <tbody>
              {lowItems.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 500 }}>{p.category}</td>
                  <td><span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: THEME.lightGrey }}>{p.sku}</span></td>
                  <td>{p.brand}</td>
                  <td><span style={{ fontFamily: "var(--font-mono)" }}>{totalQty(p)}</span></td>
                  <td><span className="badge badge-amber">{getQtyLabel(totalQty(p))}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="section-card">
        <div className="section-card-title">📊 Stock Overview by Brand</div>
        {["Samsung", "Apple", "Huawei", "Xiaomi", "Accessories"].map(brand => {
          const items = stock.filter(p => p.brand === brand);
          if (!items.length) return null;
          const brandQty = items.reduce((s, p) => s + totalQty(p), 0);
          const brandVal = items.reduce((s, p) => s + p.variants.reduce((vs, v) => vs + v.qty * v.price, 0), 0);
          return (
            <div key={brand} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ fontWeight: 500 }}>{brand}</div>
              <div style={{ display: "flex", gap: 24, fontSize: 13 }}>
                <span style={{ color: THEME.lightGrey }}>{items.length} lines</span>
                <span style={{ fontFamily: "var(--font-mono)", color: THEME.white }}>{brandQty} units</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 15, color: THEME.red, fontWeight: 700 }}>{fmtPrice(brandVal)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── VIEW STOCK ───────────────────────────────────────────────────────────────
function ViewStock({ stock, onUpdatePrice, search }) {
  const [editingPrice, setEditingPrice] = useState(null);
  const [editVal, setEditVal] = useState("");

  const filtered = stock.filter(p =>
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {filtered.map(product => (
        <div key={product.id} className="section-card" style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
            <span style={{ fontSize: 28 }}>{product.emoji}</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>{product.brand} {product.category}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: THEME.lightGrey, letterSpacing: 2 }}>{product.sku}</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <span className={getBadgeClass(totalQty(product))}>
                {totalQty(product)} units total
              </span>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Variant</th><th>Storage</th><th>Qty</th><th>Status</th><th>Price</th><th>Edit</th></tr>
            </thead>
            <tbody>
              {product.variants.map((v, vi) => {
                const eKey = `${product.id}-${vi}`;
                const isEditing = editingPrice === eKey;
                return (
                  <tr key={vi}>
                    <td>{v.color}</td>
                    <td><span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: THEME.lightGrey }}>{v.storage}</span></td>
                    <td><span className={`product-qty ${getQtyClass(v.qty)}`}>{v.qty}</span></td>
                    <td><span className={getBadgeClass(v.qty)}>{getQtyLabel(v.qty)}</span></td>
                    <td>
                      {isEditing
                        ? <input className="stocktake-input" style={{ width: 100 }} value={editVal}
                            onChange={e => setEditVal(e.target.value)} autoFocus
                            onKeyDown={e => {
                              if (e.key === "Enter") { onUpdatePrice(product.id, vi, parseFloat(editVal)); setEditingPrice(null); }
                              if (e.key === "Escape") setEditingPrice(null);
                            }} />
                        : <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: THEME.red }}>{fmtPrice(v.price)}</span>
                      }
                    </td>
                    <td>
                      {isEditing
                        ? <>
                            <button onClick={() => { onUpdatePrice(product.id, vi, parseFloat(editVal)); setEditingPrice(null); }}
                              style={{ background: "none", border: "none", color: THEME.green, cursor: "pointer", marginRight: 6 }}>✓</button>
                            <button onClick={() => setEditingPrice(null)}
                              style={{ background: "none", border: "none", color: "#ff6666", cursor: "pointer" }}>✕</button>
                          </>
                        : <button onClick={() => { setEditingPrice(eKey); setEditVal(v.price.toString()); }}
                            style={{ background: "none", border: "none", color: THEME.lightGrey, cursor: "pointer" }}>✏️</button>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

// ─── ADD PRODUCT ──────────────────────────────────────────────────────────────
function AddProduct({ onAdd, addToast }) {
  const [form, setForm] = useState({ brand: "", category: "", sku: "", emoji: "📱" });
  const [variants, setVariants] = useState([{ color: "", storage: "", qty: 0, price: 0 }]);

  const addVariant = () => setVariants([...variants, { color: "", storage: "", qty: 0, price: 0 }]);
  const removeVariant = (i) => setVariants(variants.filter((_, idx) => idx !== i));
  const updateVariant = (i, field, val) => {
    const v = [...variants]; v[i][field] = field === "qty" || field === "price" ? Number(val) : val;
    setVariants(v);
  };

  const handleAdd = () => {
    if (!form.brand || !form.category || !form.sku) { addToast("Fill in all product fields", "error"); return; }
    onAdd({ ...form, variants });
    setForm({ brand: "", category: "", sku: "", emoji: "📱" });
    setVariants([{ color: "", storage: "", qty: 0, price: 0 }]);
    addToast(`✓ ${form.brand} ${form.category} added to inventory`);
  };

  return (
    <div className="section-card" style={{ maxWidth: 640 }}>
      <div className="section-card-title">New Product</div>
      <div className="form-grid">
        <div className="form-row">
          <label className="form-label">Brand</label>
          <input className="form-input" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} placeholder="e.g. Samsung" />
        </div>
        <div className="form-row">
          <label className="form-label">Category / Model</label>
          <input className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Galaxy S25 Ultra" />
        </div>
        <div className="form-row">
          <label className="form-label">SKU Code</label>
          <input className="form-input" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value.toUpperCase() })} placeholder="e.g. SS25U" />
        </div>
        <div className="form-row">
          <label className="form-label">Emoji Icon</label>
          <input className="form-input" value={form.emoji} onChange={e => setForm({ ...form, emoji: e.target.value })} placeholder="📱" />
        </div>
      </div>

      <div className="section-card-title" style={{ marginTop: 8 }}>Variants</div>
      {variants.map((v, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: 8, marginBottom: 8, alignItems: "center" }}>
          <input className="form-input" value={v.color} onChange={e => updateVariant(i, "color", e.target.value)} placeholder="Colour" />
          <input className="form-input" value={v.storage} onChange={e => updateVariant(i, "storage", e.target.value)} placeholder="Storage" />
          <input className="form-input" type="number" value={v.qty} onChange={e => updateVariant(i, "qty", e.target.value)} placeholder="Qty" />
          <input className="form-input" type="number" value={v.price} onChange={e => updateVariant(i, "price", e.target.value)} placeholder="Price" />
          <button onClick={() => removeVariant(i)} style={{ background: "none", border: "none", color: "#ff6666", cursor: "pointer", fontSize: 18 }}>✕</button>
        </div>
      ))}
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button className="btn-ghost" onClick={addVariant}>+ Add Variant</button>
        <button className="btn-primary" onClick={handleAdd}>SAVE PRODUCT →</button>
      </div>
    </div>
  );
}

// ─── ADJUSTMENTS ─────────────────────────────────────────────────────────────
function Adjustments({ stock, onAdjust, log }) {
  const [adjType, setAdjType] = useState("receive");
  const [productId, setProductId] = useState("");
  const [variantIdx, setVariantIdx] = useState("");
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");

  const selectedProduct = stock.find(p => p.id === Number(productId));

  const handleSubmit = () => {
    if (!productId || variantIdx === "") return;
    onAdjust({ type: adjType, productId: Number(productId), variantIdx: Number(variantIdx), qty: Number(qty), note, date: new Date().toLocaleString("en-ZA") });
    setQty(1); setNote(""); setProductId(""); setVariantIdx("");
  };

  return (
    <div>
      <div className="section-card" style={{ maxWidth: 560 }}>
        <div className="section-card-title">Adjustment Type</div>
        <div className="adj-pills">
          {ADJ_TYPES.map(t => (
            <button key={t.id} className={`adj-pill ${adjType === t.id ? "active" : ""}`} onClick={() => setAdjType(t.id)}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        <div className="form-row">
          <label className="form-label">Product</label>
          <select className="form-select" value={productId} onChange={e => { setProductId(e.target.value); setVariantIdx(""); }}>
            <option value="">Select product...</option>
            {stock.map(p => <option key={p.id} value={p.id}>{p.brand} {p.category}</option>)}
          </select>
        </div>

        {selectedProduct && (
          <div className="form-row">
            <label className="form-label">Variant</label>
            <select className="form-select" value={variantIdx} onChange={e => setVariantIdx(e.target.value)}>
              <option value="">Select variant...</option>
              {selectedProduct.variants.map((v, i) => (
                <option key={i} value={i}>{v.color} / {v.storage} (Stock: {v.qty})</option>
              ))}
            </select>
          </div>
        )}

        <div className="form-grid">
          <div className="form-row">
            <label className="form-label">Quantity</label>
            <input className="form-input" type="number" min="1" value={qty} onChange={e => setQty(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Note</label>
            <input className="form-input" value={note} onChange={e => setNote(e.target.value)} placeholder="Optional note..." />
          </div>
        </div>

        <button className="btn-primary" onClick={handleSubmit}>APPLY ADJUSTMENT →</button>
      </div>

      {log.length > 0 && (
        <div className="section-card">
          <div className="section-card-title">Recent Adjustments</div>
          {log.slice().reverse().slice(0, 15).map((l, i) => {
            const t = ADJ_TYPES.find(a => a.id === l.type);
            const p = stock.find(s => s.id === l.productId);
            return (
              <div key={i} className="adj-log-item">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>{t?.icon}</span>
                  <div>
                    <div style={{ fontSize: 13 }}>{t?.label} · {p?.brand} {p?.category}</div>
                    <div style={{ fontSize: 11, color: THEME.lightGrey }}>{l.note || "No note"} · {l.date}</div>
                  </div>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: l.type === "receive" ? THEME.green : "#ff6666" }}>
                  {l.type === "receive" ? "+" : "-"}{l.qty}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── STOCK TAKE ───────────────────────────────────────────────────────────────
function StockTake({ stock, onCommit, addToast }) {
  const [counts, setCounts] = useState({});

  const setCount = (pid, vi, val) => {
    setCounts(prev => ({ ...prev, [`${pid}-${vi}`]: val }));
  };

  const handleCommit = () => {
    const updates = [];
    stock.forEach(p => {
      p.variants.forEach((v, vi) => {
        const key = `${p.id}-${vi}`;
        if (counts[key] !== undefined && counts[key] !== "") {
          updates.push({ productId: p.id, variantIdx: vi, newQty: Number(counts[key]) });
        }
      });
    });
    if (!updates.length) { addToast("No counts entered to commit", "warning"); return; }
    onCommit(updates);
    setCounts({});
    addToast(`✓ Stock take committed — ${updates.length} variants updated`);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: THEME.lightGrey }}>Enter physical counts. Leave blank to skip a variant.</div>
        <button className="btn-primary" onClick={handleCommit}>COMMIT STOCK TAKE →</button>
      </div>

      {stock.map(product => (
        <div key={product.id} className="section-card" style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>{product.emoji}</span>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: 0.5 }}>{product.brand} {product.category}</div>
            <span className="badge badge-blue" style={{ marginLeft: "auto" }}>{product.sku}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 100px 100px", gap: 8, marginBottom: 6, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 2, color: THEME.midGrey, textTransform: "uppercase" }}>
            <span>Colour</span><span>Storage</span><span>System</span><span>Physical</span><span>Variance</span>
          </div>
          {product.variants.map((v, vi) => {
            const key = `${product.id}-${vi}`;
            const physical = counts[key] !== undefined ? Number(counts[key]) : null;
            const variance = physical !== null ? physical - v.qty : null;
            return (
              <div key={vi} className="stocktake-row">
                <span style={{ fontSize: 13 }}>{v.color}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: THEME.lightGrey }}>{v.storage}</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>{v.qty}</span>
                <input className="stocktake-input" type="number" min="0" value={counts[key] ?? ""}
                  onChange={e => setCount(product.id, vi, e.target.value)} placeholder="—" />
                <span className={variance === null ? "variance-zero" : variance > 0 ? "variance-pos" : variance < 0 ? "variance-neg" : "variance-zero"}>
                  {variance === null ? "—" : variance > 0 ? `+${variance}` : variance}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── STOCK MANAGEMENT (ADMIN) ─────────────────────────────────────────────────
function StockManagement({ stock, onUpdatePrice, onAdd, onAdjust, adjLog, onCommit, addToast, search }) {
  const [tab, setTab] = useState("view");
  const TABS = [
    { id: "view", label: "View Stock" },
    { id: "add", label: "Add Product" },
    { id: "adjust", label: "Adjustments" },
    { id: "stocktake", label: "Stock Take" },
  ];

  return (
    <div>
      <div className="tab-bar">
        {TABS.map(t => (
          <button key={t.id} className={`tab-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === "view" && <ViewStock stock={stock} onUpdatePrice={onUpdatePrice} search={search} />}
      {tab === "add" && <AddProduct onAdd={onAdd} addToast={addToast} />}
      {tab === "adjust" && <Adjustments stock={stock} onAdjust={onAdjust} log={adjLog} />}
      {tab === "stocktake" && <StockTake stock={stock} onCommit={onCommit} addToast={addToast} />}
    </div>
  );
}

// ─── PRODUCT GRID VIEW ────────────────────────────────────────────────────────
function ProductGridView({ stock, search }) {
  const [selected, setSelected] = useState(null);

  const filtered = stock.filter(p =>
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="product-grid">
        {filtered.map(p => (
          <div key={p.id} className="product-card" onClick={() => setSelected(p)}>
            <div className="product-card-img">{p.emoji}</div>
            <div className="product-card-body">
              <div className="product-card-brand">{p.brand}</div>
              <div className="product-card-name">{p.category}</div>
              <div className="product-card-footer">
                <span className={`product-qty ${getQtyClass(totalQty(p))}`}>{totalQty(p)} units</span>
                <span className="product-price">{fmtPrice(Math.min(...p.variants.map(v => v.price)))}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{selected.brand} {selected.category}</div>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ textAlign: "center", fontSize: 56, marginBottom: 16 }}>{selected.emoji}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: THEME.lightGrey, letterSpacing: 2, marginBottom: 16 }}>SKU: {selected.sku}</div>
              <table className="data-table">
                <thead>
                  <tr><th>Colour</th><th>Storage</th><th>Qty</th><th>Price</th></tr>
                </thead>
                <tbody>
                  {selected.variants.map((v, i) => (
                    <tr key={i}>
                      <td>{v.color}</td>
                      <td><span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{v.storage}</span></td>
                      <td><span className={`product-qty ${getQtyClass(v.qty)}`}>{v.qty}</span></td>
                      <td><span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: THEME.red }}>{fmtPrice(v.price)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("hero"); // hero | login | app
  const [user, setUser] = useState(null);
  const [stock, setStock] = useState(INITIAL_STOCK);
  const [adjLog, setAdjLog] = useState([]);
  const [navPage, setNavPage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [toasts, setToasts] = useState([]);

  const addToast = (msg, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const handleLogin = (cred) => {
    setUser(cred);
    setNavPage(cred.role === "admin" ? "dashboard" : "products");
    setScreen("app");
  };

  const handleUpdatePrice = (pid, vi, newPrice) => {
    setStock(prev => prev.map(p => p.id === pid
      ? { ...p, variants: p.variants.map((v, i) => i === vi ? { ...v, price: newPrice } : v) }
      : p));
    addToast("Price updated successfully");
  };

  const handleAddProduct = (product) => {
    setStock(prev => [...prev, { ...product, id: Date.now() }]);
  };

  const handleAdjust = (adj) => {
    setStock(prev => prev.map(p => {
      if (p.id !== adj.productId) return p;
      return {
        ...p, variants: p.variants.map((v, i) => {
          if (i !== adj.variantIdx) return v;
          const delta = adj.type === "receive" ? adj.qty : -adj.qty;
          return { ...v, qty: Math.max(0, v.qty + delta) };
        })
      };
    }));
    setAdjLog(prev => [...prev, adj]);
    addToast(`Adjustment applied: ${ADJ_TYPES.find(a => a.id === adj.type)?.label}`);
  };

  const handleCommit = (updates) => {
    setStock(prev => prev.map(p => ({
      ...p, variants: p.variants.map((v, vi) => {
        const u = updates.find(u => u.productId === p.id && u.variantIdx === vi);
        return u ? { ...v, qty: u.newQty } : v;
      })
    })));
  };

  const NAV = user?.role === "admin"
    ? [
        { id: "dashboard", label: "Dashboard", Icon: Icons.Dashboard },
        { id: "products", label: "Products", Icon: Icons.Stock },
        { id: "stock", label: "Stock Mgmt", Icon: Icons.Adjust },
      ]
    : [
        { id: "products", label: "Products", Icon: Icons.Stock },
      ];

  // ── SCREENS ──
  if (screen === "hero") return (
    <>
      <style>{css}</style>
      <HeroPage onEnter={() => setScreen("login")} />
      <ToastContainer toasts={toasts} />
    </>
  );

  if (screen === "login") return (
    <>
      <style>{css}</style>
      <LoginPage onLogin={handleLogin} />
      <ToastContainer toasts={toasts} />
    </>
  );

  // ── APP ──
  let pageTitle = "Dashboard";
  let pageSubtitle = "Stock overview and alerts";
  if (navPage === "products") { pageTitle = "Products"; pageSubtitle = "Browse inventory"; }
  if (navPage === "stock") { pageTitle = "Stock Management"; pageSubtitle = "View, add, adjust, and count stock"; }

  return (
    <>
      <style>{css}</style>
      {TEST_MODE && <div className="test-banner">⚠ TEST MODE — Data resets on refresh</div>}
      <ToastContainer toasts={toasts} />

      <div className="app-wrap">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="logo-emblem">V</div>
            <div className="logo-text" style={{ fontSize: 16 }}>VODA<span>STOCK</span></div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section-label">Navigation</div>
            {NAV.map(({ id, label, Icon }) => (
              <div key={id} className={`nav-item ${navPage === id ? "active" : ""}`} onClick={() => { setNavPage(id); setSearch(""); }}>
                <span className="nav-icon"><Icon /></span>
                <span>{label}</span>
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-chip">
              <div className="user-avatar">{user?.name?.[0]}</div>
              <div>
                <div className="user-info-name">{user?.name}</div>
                <div className="user-role-badge">{user?.role}</div>
              </div>
            </div>
            <button className="logout-btn" onClick={() => { setScreen("hero"); setUser(null); }}>
              <Icons.Logout /> &nbsp;Sign Out
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <div className="main-area">
          <div className="top-bar">
            <div>
              <div className="page-title">{pageTitle}</div>
              <div className="page-sub">{pageSubtitle}</div>
            </div>
            <div className="top-actions">
              <div className="search-bar">
                <Icons.Search />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." />
              </div>
            </div>
          </div>

          <div className="content-area">
            {navPage === "dashboard" && <Dashboard stock={stock} />}
            {navPage === "products" && <ProductGridView stock={stock} search={search} />}
            {navPage === "stock" && user?.role === "admin" && (
              <StockManagement
                stock={stock}
                onUpdatePrice={handleUpdatePrice}
                onAdd={handleAddProduct}
                onAdjust={handleAdjust}
                adjLog={adjLog}
                onCommit={handleCommit}
                addToast={addToast}
                search={search}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
