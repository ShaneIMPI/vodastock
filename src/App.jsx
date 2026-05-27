import { useState, useEffect, useRef } from "react";

// ─── CSS ─────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=JetBrains+Mono:wght@400;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    /* Brand */
    --red:        #E60000;
    --red-dark:   #B30000;
    --red-light:  #FF3333;
    --red-pale:   #FFF0F0;
    --red-muted:  rgba(230,0,0,0.08);

    /* Light UI */
    --bg:         #F7F7F8;
    --surface:    #FFFFFF;
    --surface-2:  #F0F0F2;
    --border:     #E4E4E7;
    --border-red: rgba(230,0,0,0.2);

    /* Text */
    --text-primary:   #0F0F10;
    --text-secondary: #6B6B72;
    --text-tertiary:  #9999A5;

    /* Status */
    --green:  #00963A;
    --amber:  #C96800;
    --blue:   #005FCC;
    --green-bg: rgba(0,150,58,0.08);
    --amber-bg: rgba(201,104,0,0.08);
    --blue-bg:  rgba(0,95,204,0.08);
    --red-bg:   rgba(230,0,0,0.08);

    /* Fonts */
    --font-display: 'Rajdhani', sans-serif;
    --font-body:    'DM Sans', sans-serif;
    --font-mono:    'JetBrains Mono', monospace;
  }

  body { font-family: var(--font-body); background: var(--bg); color: var(--text-primary); overflow-x: hidden; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--surface-2); }
  ::-webkit-scrollbar-thumb { background: var(--red); border-radius: 2px; }

  /* ── HERO ── */
  .hero-wrap {
    position: relative; min-height: 100vh; display: flex; flex-direction: column;
    background: #030303; overflow: hidden;
  }

  /* Geometric floating shapes */
  .shape {
    position: absolute; border-radius: 50%;
    backdrop-filter: blur(2px);
    border: 2px solid rgba(255,255,255,0.12);
    animation: float-shape 12s ease-in-out infinite;
  }
  .shape::after {
    content: ''; position: absolute; inset: 0; border-radius: 50%;
    background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), transparent 70%);
  }
  .shape-1 {
    width: 600px; height: 140px; left: -8%; top: 20%;
    background: linear-gradient(to right, rgba(230,0,0,0.18), transparent);
    transform: rotate(12deg);
    animation-delay: 0s;
  }
  .shape-2 {
    width: 500px; height: 120px; right: -2%; top: 72%;
    background: linear-gradient(to right, rgba(230,0,0,0.12), transparent);
    transform: rotate(-15deg);
    animation-delay: 1.5s;
  }
  .shape-3 {
    width: 300px; height: 80px; left: 8%; bottom: 8%;
    background: linear-gradient(to right, rgba(180,0,0,0.12), transparent);
    transform: rotate(-8deg);
    animation-delay: 0.8s;
  }
  .shape-4 {
    width: 200px; height: 60px; right: 18%; top: 12%;
    background: linear-gradient(to right, rgba(255,80,80,0.1), transparent);
    transform: rotate(20deg);
    animation-delay: 2s;
  }
  .shape-5 {
    width: 150px; height: 40px; left: 22%; top: 8%;
    background: linear-gradient(to right, rgba(200,0,0,0.1), transparent);
    transform: rotate(-25deg);
    animation-delay: 2.5s;
  }

  @keyframes float-shape {
    0%, 100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
    50%       { transform: translateY(-18px) rotate(var(--r, 0deg)); }
  }
  .shape-1 { --r: 12deg; }
  .shape-2 { --r: -15deg; }
  .shape-3 { --r: -8deg; }
  .shape-4 { --r: 20deg; }
  .shape-5 { --r: -25deg; }

  /* fade-in animation for hero content */
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up-1 { animation: fade-up 1s ease 0.5s both; }
  .fade-up-2 { animation: fade-up 1s ease 0.7s both; }
  .fade-up-3 { animation: fade-up 1s ease 0.9s both; }
  .fade-up-4 { animation: fade-up 1s ease 1.1s both; }

  /* top/bottom gradient vignette */
  .hero-vignette {
    position: absolute; inset: 0; pointer-events: none; z-index: 2;
    background: linear-gradient(to bottom, rgba(3,3,3,0.7) 0%, transparent 25%, transparent 75%, rgba(3,3,3,0.9) 100%);
  }

  .hero-nav {
    position: relative; z-index: 10; display: flex; align-items: center; justify-content: space-between;
    padding: 24px 48px;
    background: rgba(3,3,3,0.4); backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .logo-emblem {
    width: 40px; height: 40px; background: var(--red);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-weight: 700; font-size: 17px; color: white;
  }
  .logo-text { font-family: var(--font-display); font-size: 21px; font-weight: 700; letter-spacing: 2px; color: white; }
  .logo-text span { color: var(--red); }

  .hero-body {
    position: relative; z-index: 10; flex: 1; display: flex; align-items: center; justify-content: center;
    padding: 60px 48px; text-align: center;
  }
  .hero-inner { max-width: 780px; }

  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px; border-radius: 999px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
    margin-bottom: 36px;
  }
  .badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--red); flex-shrink: 0; }
  .hero-badge span { font-size: 13px; color: rgba(255,255,255,0.55); letter-spacing: 1px; }

  .hero-h1 {
    font-family: var(--font-display); font-weight: 700; letter-spacing: -1px; line-height: 0.95;
    font-size: clamp(52px, 9vw, 100px); margin-bottom: 28px;
  }
  .hero-h1 .line-1 {
    display: block;
    background: linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.82));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hero-h1 .line-2 {
    display: block;
    background: linear-gradient(to right, #ff9999, rgba(255,255,255,0.92), #ff6666);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }

  .hero-p {
    font-size: 17px; color: rgba(255,255,255,0.38); line-height: 1.7;
    max-width: 520px; margin: 0 auto 44px; font-weight: 300; letter-spacing: 0.3px;
  }

  .hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .btn-primary {
    font-family: var(--font-display); font-size: 14px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; padding: 13px 36px; background: var(--red); color: white;
    border: none; cursor: pointer;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
    transition: all 0.2s; position: relative; overflow: hidden;
  }
  .btn-primary::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transform: translateX(-100%); transition: transform 0.4s;
  }
  .btn-primary:hover { background: var(--red-light); transform: translateY(-2px); }
  .btn-primary:hover::after { transform: translateX(100%); }

  .btn-ghost-hero {
    font-family: var(--font-display); font-size: 14px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; padding: 12px 32px; background: transparent; color: rgba(255,255,255,0.55);
    border: 1px solid rgba(255,255,255,0.14); cursor: pointer;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
    transition: all 0.2s;
  }
  .btn-ghost-hero:hover { color: white; border-color: rgba(255,255,255,0.35); }

  /* ── LOGIN ── */
  .login-wrap {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: var(--bg); position: relative; overflow: hidden; padding: 24px;
  }
  .login-bg-shape {
    position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none;
  }
  .login-bg-1 { width: 500px; height: 500px; background: rgba(230,0,0,0.06); top: -100px; right: -100px; }
  .login-bg-2 { width: 300px; height: 300px; background: rgba(230,0,0,0.04); bottom: -50px; left: -50px; }

  .login-card {
    position: relative; z-index: 10; width: 100%; max-width: 400px;
    background: var(--surface); border: 1px solid var(--border);
    border-top: 3px solid var(--red);
    box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 20px 48px rgba(0,0,0,0.06);
    padding: 44px 36px;
  }
  .login-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 32px; }
  .login-logo .logo-text { color: var(--text-primary); }
  .login-title { font-family: var(--font-display); font-size: 26px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; }
  .login-sub { font-size: 13px; color: var(--text-secondary); margin-bottom: 28px; }

  .field-label { display: block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 7px; }
  .field-wrap { margin-bottom: 18px; }
  .field-input {
    width: 100%; padding: 11px 14px; background: var(--surface-2); border: 1px solid var(--border);
    color: var(--text-primary); font-family: var(--font-body); font-size: 14px; outline: none; transition: border-color 0.2s;
  }
  .field-input:focus { border-color: var(--red); background: var(--surface); }
  .field-input::placeholder { color: var(--text-tertiary); }

  .login-error { background: var(--red-bg); border: 1px solid rgba(230,0,0,0.2); padding: 10px 14px; font-size: 13px; color: var(--red-dark); margin-bottom: 18px; }
  .login-demo { margin-top: 22px; padding: 14px; background: var(--surface-2); border: 1px solid var(--border); }
  .demo-title { font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: var(--text-tertiary); margin-bottom: 10px; text-transform: uppercase; }
  .demo-row { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 5px; }
  .demo-key { color: var(--text-secondary); font-family: var(--font-mono); }
  .demo-val { color: var(--red); font-family: var(--font-mono); cursor: pointer; }
  .demo-val:hover { text-decoration: underline; }

  /* ── APP SHELL ── */
  .app-wrap { display: flex; min-height: 100vh; background: var(--bg); }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 224px; min-height: 100vh; background: var(--surface);
    border-right: 1px solid var(--border); display: flex; flex-direction: column;
    position: sticky; top: 0; height: 100vh; overflow-y: auto; flex-shrink: 0;
  }
  .sidebar-brand {
    padding: 22px 20px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 10px;
  }
  .sidebar-brand .logo-text { color: var(--text-primary); font-size: 18px; }
  .sidebar-nav { flex: 1; padding: 12px 0; }
  .nav-section-label { font-family: var(--font-mono); font-size: 9px; letter-spacing: 3px; color: var(--text-tertiary); text-transform: uppercase; padding: 14px 20px 6px; }
  .nav-item {
    display: flex; align-items: center; gap: 11px; padding: 10px 20px;
    color: var(--text-secondary); font-size: 14px; cursor: pointer; transition: all 0.15s;
    border-left: 3px solid transparent;
  }
  .nav-item:hover { color: var(--text-primary); background: var(--surface-2); }
  .nav-item.active { color: var(--red); background: var(--red-muted); border-left-color: var(--red); }
  .nav-icon { width: 17px; height: 17px; opacity: 0.7; flex-shrink: 0; }
  .nav-item.active .nav-icon { opacity: 1; }

  .sidebar-footer { padding: 14px 20px; border-top: 1px solid var(--border); }
  .user-chip { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: var(--surface-2); border: 1px solid var(--border); margin-bottom: 8px; }
  .user-avatar { width: 28px; height: 28px; background: var(--red); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 13px; font-weight: 700; color: white; flex-shrink: 0; }
  .user-info-name { font-size: 13px; font-weight: 500; color: var(--text-primary); }
  .user-role-badge { font-family: var(--font-mono); font-size: 9px; letter-spacing: 1px; color: var(--red); text-transform: uppercase; }
  .logout-btn { width: 100%; padding: 8px; background: transparent; border: 1px solid var(--border); color: var(--text-secondary); font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px; cursor: pointer; text-transform: uppercase; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 6px; }
  .logout-btn:hover { border-color: var(--red); color: var(--red); }

  /* ── MAIN ── */
  .main-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .top-bar { padding: 16px 28px; background: var(--surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
  .page-title { font-family: var(--font-display); font-size: 22px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--text-primary); }
  .page-sub { font-size: 12px; color: var(--text-tertiary); margin-top: 1px; }
  .search-bar { display: flex; align-items: center; gap: 8px; background: var(--surface-2); border: 1px solid var(--border); padding: 8px 14px; }
  .search-bar input { background: transparent; border: none; outline: none; color: var(--text-primary); font-family: var(--font-body); font-size: 13px; width: 180px; }
  .search-bar input::placeholder { color: var(--text-tertiary); }
  .content-area { flex: 1; padding: 24px 28px; overflow-y: auto; }

  /* ── STAT CARDS ── */
  .stat-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(175px, 1fr)); gap: 14px; margin-bottom: 22px; }
  .stat-card { background: var(--surface); border: 1px solid var(--border); border-top: 2px solid var(--red); padding: 20px; position: relative; overflow: hidden; }
  .stat-card::before { content: ''; position: absolute; top: -20px; right: -20px; width: 70px; height: 70px; border-radius: 50%; background: var(--red-muted); }
  .stat-card-num { font-family: var(--font-display); font-size: 34px; font-weight: 700; color: var(--red); line-height: 1; }
  .stat-card-label { font-size: 12px; color: var(--text-tertiary); margin-top: 6px; letter-spacing: 0.5px; }
  .stat-card.green { border-top-color: var(--green); }
  .stat-card.green .stat-card-num { color: var(--green); }
  .stat-card.amber { border-top-color: var(--amber); }
  .stat-card.amber .stat-card-num { color: var(--amber); }
  .stat-card.blue { border-top-color: var(--blue); }
  .stat-card.blue .stat-card-num { color: var(--blue); font-size: 20px; padding-top: 7px; }

  /* ── PRODUCT GRID ── */
  .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }
  .product-card { background: var(--surface); border: 1px solid var(--border); cursor: pointer; transition: all 0.2s; overflow: hidden; }
  .product-card:hover { border-color: rgba(230,0,0,0.35); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
  .product-card-img { height: 120px; background: var(--surface-2); display: flex; align-items: center; justify-content: center; font-size: 44px; position: relative; }
  .product-card-body { padding: 14px 16px; }
  .product-card-name { font-family: var(--font-display); font-size: 16px; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 3px; color: var(--text-primary); }
  .product-card-brand { font-size: 11px; color: var(--text-tertiary); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px; }
  .product-card-footer { display: flex; align-items: center; justify-content: space-between; }
  .product-qty { font-family: var(--font-mono); font-size: 12px; padding: 3px 8px; border-radius: 2px; }
  .qty-good { background: var(--green-bg); color: var(--green); }
  .qty-low  { background: var(--amber-bg); color: var(--amber); }
  .qty-out  { background: var(--red-bg); color: var(--red); }
  .product-price { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--red); }

  /* ── TABLE ── */
  .data-table { width: 100%; border-collapse: collapse; }
  .data-table th { font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-tertiary); padding: 9px 14px; text-align: left; border-bottom: 1px solid var(--border); white-space: nowrap; background: var(--surface-2); }
  .data-table td { padding: 11px 14px; font-size: 14px; border-bottom: 1px solid var(--border); vertical-align: middle; color: var(--text-primary); }
  .data-table tr:hover td { background: var(--surface-2); }
  .badge { display: inline-block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 1px; padding: 3px 8px; border-radius: 2px; text-transform: uppercase; }
  .badge-green { background: var(--green-bg); color: var(--green); }
  .badge-amber { background: var(--amber-bg); color: var(--amber); }
  .badge-red   { background: var(--red-bg);   color: var(--red); }
  .badge-blue  { background: var(--blue-bg);  color: var(--blue); }

  /* ── MODAL ── */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.35); backdrop-filter: blur(4px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fade-in 0.15s ease; }
  @keyframes fade-in { from{opacity:0} to{opacity:1} }
  .modal-box { background: var(--surface); border: 1px solid var(--border); border-top: 3px solid var(--red); width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.15); animation: slide-up 0.2s ease; }
  @keyframes slide-up { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} }
  .modal-header { padding: 18px 22px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .modal-title { font-family: var(--font-display); font-size: 19px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--text-primary); }
  .modal-close { width: 30px; height: 30px; background: var(--surface-2); border: 1px solid var(--border); color: var(--text-secondary); cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
  .modal-close:hover { background: var(--red-bg); border-color: var(--border-red); color: var(--red); }
  .modal-body { padding: 22px; }

  /* ── TABS ── */
  .tab-bar { display: flex; border-bottom: 1px solid var(--border); margin-bottom: 20px; }
  .tab-btn { padding: 10px 20px; background: transparent; border: none; color: var(--text-secondary); font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s; margin-bottom: -1px; }
  .tab-btn:hover { color: var(--text-primary); }
  .tab-btn.active { color: var(--red); border-bottom-color: var(--red); }

  /* ── FORM ── */
  .form-row { margin-bottom: 16px; }
  .form-label { display: block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 7px; }
  .form-input { width: 100%; padding: 10px 13px; background: var(--surface-2); border: 1px solid var(--border); color: var(--text-primary); font-family: var(--font-body); font-size: 14px; outline: none; transition: border-color 0.2s; }
  .form-input:focus { border-color: var(--red); background: var(--surface); }
  .form-select { width: 100%; padding: 10px 13px; background: var(--surface-2); border: 1px solid var(--border); color: var(--text-primary); font-family: var(--font-body); font-size: 14px; outline: none; appearance: none; cursor: pointer; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  /* ── ADJ ── */
  .adj-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
  .adj-pill { padding: 8px 14px; background: var(--surface-2); border: 1px solid var(--border); color: var(--text-secondary); font-size: 13px; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; gap: 6px; }
  .adj-pill.active { background: var(--red-bg); border-color: var(--border-red); color: var(--red); }
  .adj-log-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 13px; }

  /* ── STOCKTAKE ── */
  .stocktake-row { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 10px; align-items: center; padding: 10px 14px; background: var(--surface-2); border: 1px solid var(--border); margin-bottom: 6px; }
  .stocktake-input { width: 100%; padding: 7px 10px; background: var(--surface); border: 1px solid var(--border); color: var(--text-primary); font-family: var(--font-mono); font-size: 13px; text-align: center; outline: none; }
  .stocktake-input:focus { border-color: var(--red); }
  .variance-pos  { color: var(--green); font-family: var(--font-mono); font-size: 13px; }
  .variance-neg  { color: var(--red);   font-family: var(--font-mono); font-size: 13px; }
  .variance-zero { color: var(--text-tertiary); font-family: var(--font-mono); font-size: 13px; }

  /* ── SECTION CARD ── */
  .section-card { background: var(--surface); border: 1px solid var(--border); padding: 20px; margin-bottom: 16px; }
  .section-card-title { font-family: var(--font-display); font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
  .section-card-title::after { content:''; flex:1; height:1px; background: var(--border); }

  /* ── TOAST ── */
  .toast-wrap { position: fixed; top: 20px; right: 20px; z-index: 999; display: flex; flex-direction: column; gap: 8px; }
  .toast { background: var(--surface); border: 1px solid var(--border); border-left: 3px solid var(--green); padding: 12px 18px; font-size: 13px; min-width: 240px; max-width: 340px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); animation: toast-in 0.2s ease; display: flex; align-items: center; gap: 10px; color: var(--text-primary); }
  .toast.error   { border-left-color: var(--red); }
  .toast.warning { border-left-color: var(--amber); }
  @keyframes toast-in { from{transform:translateX(20px);opacity:0} to{transform:translateX(0);opacity:1} }

  /* ── TEST BANNER ── */
  .test-banner { background: var(--red-bg); border-bottom: 1px solid var(--border-red); padding: 6px 20px; text-align: center; font-family: var(--font-mono); font-size: 10px; letter-spacing: 3px; color: var(--red); text-transform: uppercase; }

  /* ── INLINE PRICE EDIT ── */
  .price-edit-input { width: 90px; padding: 5px 8px; background: var(--surface-2); border: 1px solid var(--red); color: var(--text-primary); font-family: var(--font-mono); font-size: 13px; outline: none; }
  .icon-btn { background: none; border: none; cursor: pointer; padding: 2px 6px; font-size: 15px; transition: opacity 0.15s; }
  .icon-btn:hover { opacity: 0.7; }

  @media (max-width: 768px) {
    .sidebar { width: 58px; }
    .sidebar-brand .logo-text, .nav-item span, .user-info-name, .user-role-badge, .nav-section-label { display: none; }
    .nav-item { justify-content: center; padding: 12px; }
    .hero-nav { padding: 16px 20px; }
    .hero-body { padding: 40px 20px; }
    .content-area { padding: 16px; }
    .product-grid { grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)); }
    .form-grid { grid-template-columns: 1fr; }
  }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────
const TEST_MODE = true;

const CREDENTIALS = [
  { username: "admin",  password: "Voda@Admin2024", role: "admin", name: "Admin" },
  { username: "staff",  password: "voda123",        role: "staff", name: "Staff User" },
  { username: "sales1", password: "voda123",        role: "staff", name: "Sales Rep 1" },
];

const INITIAL_STOCK = [
  { id:1, brand:"Samsung", category:"Galaxy S25 Ultra", sku:"SS25U", emoji:"📱",
    variants:[{color:"Titanium Black",storage:"256GB",qty:8,price:24999},{color:"Titanium Gray",storage:"512GB",qty:5,price:27999},{color:"Titanium White",storage:"1TB",qty:2,price:32999}]},
  { id:2, brand:"Apple", category:"iPhone 16 Pro", sku:"IP16P", emoji:"🍎",
    variants:[{color:"Black Titanium",storage:"128GB",qty:12,price:23499},{color:"White Titanium",storage:"256GB",qty:7,price:26499},{color:"Desert Titanium",storage:"512GB",qty:3,price:31499}]},
  { id:3, brand:"Samsung", category:"Galaxy A55", sku:"SSA55", emoji:"📲",
    variants:[{color:"Awesome Navy",storage:"128GB",qty:20,price:9999},{color:"Awesome Lilac",storage:"256GB",qty:15,price:11999}]},
  { id:4, brand:"Huawei", category:"Nova 12", sku:"HWN12", emoji:"📡",
    variants:[{color:"Black",storage:"256GB",qty:6,price:8499},{color:"Silver",storage:"256GB",qty:4,price:8499}]},
  { id:5, brand:"Apple", category:"iPhone 15", sku:"IP15S", emoji:"🔷",
    variants:[{color:"Blue",storage:"128GB",qty:9,price:17999},{color:"Pink",storage:"128GB",qty:11,price:17999},{color:"Green",storage:"256GB",qty:4,price:20999}]},
  { id:6, brand:"Xiaomi", category:"14T Pro", sku:"XM14T", emoji:"⚡",
    variants:[{color:"Titanium Black",storage:"512GB",qty:7,price:13999},{color:"Titan Blue",storage:"512GB",qty:3,price:13999}]},
  { id:7, brand:"Accessories", category:"Screen Protector", sku:"SCRPRT", emoji:"🛡️",
    variants:[{color:'Universal 6.1"',storage:"Single",qty:45,price:299},{color:'Universal 6.7"',storage:"Single",qty:38,price:349}]},
  { id:8, brand:"Accessories", category:"Fast Charger 65W", sku:"FC65W", emoji:"🔌",
    variants:[{color:"Black",storage:"USB-C",qty:30,price:599},{color:"White",storage:"USB-C",qty:22,price:599}]},
];

const ADJ_TYPES = [
  { id:"receive",  label:"Receive Stock",       icon:"➕" },
  { id:"writeoff", label:"Write-off",           icon:"➖" },
  { id:"transfer", label:"Transfer Out",        icon:"↗️" },
  { id:"return",   label:"Return to Supplier",  icon:"↩️" },
  { id:"demo",     label:"Demo Unit",           icon:"🔍" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmtPrice   = p => `R ${p.toLocaleString("en-ZA")}`;
const totalQty   = p => p.variants.reduce((s,v) => s+v.qty, 0);
const getQtyClass  = q => q===0?"qty-out":q<=3?"qty-low":"qty-good";
const getBadgeClass= q => q===0?"badge badge-red":q<=3?"badge badge-amber":"badge badge-green";
const getQtyLabel  = q => q===0?"OUT":q<=3?"LOW":"OK";

// ─── ICONS ───────────────────────────────────────────────────────────────────
const IcoDash = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const IcoBox  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>;
const IcoSliders = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>;
const IcoSearch  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IcoOut  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;

// ─── TOAST ───────────────────────────────────────────────────────────────────
function Toasts({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type||""}`}>
          <span>{t.type==="error"?"⚠️":t.type==="warning"?"⚡":"✓"}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function HeroPage({ onEnter }) {
  return (
    <div className="hero-wrap">
      {/* Animated geometric shapes */}
      <div className="shape shape-1" />
      <div className="shape shape-2" />
      <div className="shape shape-3" />
      <div className="shape shape-4" />
      <div className="shape shape-5" />
      <div className="hero-vignette" />

      {/* Nav */}
      <nav className="hero-nav">
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div className="logo-emblem">V</div>
          <span className="logo-text">VODA<span>STOCK</span></span>
        </div>
        <div style={{ display:"flex", gap:20, alignItems:"center" }}>
          <span style={{ fontSize:13, color:"rgba(255,255,255,0.4)" }}>Stock Management</span>
          {TEST_MODE && <span style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--red)", letterSpacing:2 }}>TEST MODE</span>}
        </div>
      </nav>

      {/* Content */}
      <div className="hero-body">
        <div className="hero-inner">
          <div className="hero-badge fade-up-1">
            <span className="badge-dot" />
            <span>Vodacom Authorised Dealer</span>
          </div>

          <h1 className="hero-h1 fade-up-2">
            <span className="line-1">Connected Stock.</span>
            <span className="line-2">Controlled.</span>
          </h1>

          <p className="hero-p fade-up-3">
            Real-time inventory management for your Vodacom retail store.
            Track handsets, accessories, and stock movements — all from one powerful dashboard.
          </p>

          <div className="hero-btns fade-up-4">
            <button className="btn-primary" onClick={onEnter}>ENTER SYSTEM →</button>
            <button className="btn-ghost-hero">LEARN MORE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  const attempt = () => {
    const c = CREDENTIALS.find(c => c.username===username && c.password===password);
    if (c) { setError(""); onLogin(c); }
    else setError("Invalid credentials. Please try again.");
  };

  return (
    <div className="login-wrap">
      <div className="login-bg-shape login-bg-1" />
      <div className="login-bg-shape login-bg-2" />

      <div className="login-card">
        <div className="login-logo">
          <div className="logo-emblem">V</div>
          <div>
            <div className="logo-text">VODA<span style={{color:"var(--red)"}}>STOCK</span></div>
            <div style={{fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:2,color:"var(--text-tertiary)"}}>INVENTORY SYSTEM</div>
          </div>
        </div>

        <div className="login-title">Sign In</div>
        <div className="login-sub">Enter your credentials to access the stock portal.</div>

        {error && <div className="login-error">⚠ {error}</div>}

        <div className="field-wrap">
          <label className="field-label">Username</label>
          <input className="field-input" value={username} onChange={e=>setUsername(e.target.value)}
            placeholder="Enter username" onKeyDown={e=>e.key==="Enter"&&attempt()} />
        </div>
        <div className="field-wrap">
          <label className="field-label">Password</label>
          <input className="field-input" type="password" value={password} onChange={e=>setPassword(e.target.value)}
            placeholder="Enter password" onKeyDown={e=>e.key==="Enter"&&attempt()} />
        </div>

        <button className="btn-primary" style={{width:"100%"}} onClick={attempt}>ACCESS SYSTEM →</button>

        {TEST_MODE && (
          <div className="login-demo">
            <div className="demo-title">Test Credentials</div>
            {CREDENTIALS.map(c=>(
              <div key={c.username} className="demo-row">
                <span className="demo-key">{c.username} / {c.password}</span>
                <span className="demo-val" onClick={()=>{setUsername(c.username);setPassword(c.password);setError("");}}>
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
  const total    = stock.reduce((s,p)=>s+totalQty(p),0);
  const totalVal = stock.reduce((s,p)=>s+p.variants.reduce((vs,v)=>vs+v.qty*v.price,0),0);
  const lowItems = stock.filter(p=>totalQty(p)>0&&totalQty(p)<=5);
  const outItems = stock.filter(p=>totalQty(p)===0);

  return (
    <div>
      <div className="stat-cards">
        <div className="stat-card"><div className="stat-card-num">{stock.length}</div><div className="stat-card-label">Product Lines</div></div>
        <div className="stat-card green"><div className="stat-card-num">{total}</div><div className="stat-card-label">Total Units</div></div>
        <div className="stat-card amber"><div className="stat-card-num">{lowItems.length}</div><div className="stat-card-label">Low Stock</div></div>
        <div className="stat-card" style={{borderTopColor:"var(--red)"}}><div className="stat-card-num">{outItems.length}</div><div className="stat-card-label">Out of Stock</div></div>
        <div className="stat-card blue"><div className="stat-card-num">{fmtPrice(totalVal)}</div><div className="stat-card-label">Stock Value</div></div>
      </div>

      {lowItems.length>0 && (
        <div className="section-card" style={{borderLeft:"3px solid var(--amber)"}}>
          <div className="section-card-title">⚡ Low Stock Alerts</div>
          <table className="data-table">
            <thead><tr><th>Product</th><th>SKU</th><th>Brand</th><th>Units</th><th>Status</th></tr></thead>
            <tbody>
              {lowItems.map(p=>(
                <tr key={p.id}>
                  <td style={{fontWeight:500}}>{p.category}</td>
                  <td><span style={{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--text-tertiary)"}}>{p.sku}</span></td>
                  <td>{p.brand}</td>
                  <td><span style={{fontFamily:"var(--font-mono)"}}>{totalQty(p)}</span></td>
                  <td><span className="badge badge-amber">{getQtyLabel(totalQty(p))}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="section-card">
        <div className="section-card-title">📊 Brand Overview</div>
        {["Samsung","Apple","Huawei","Xiaomi","Accessories"].map(brand=>{
          const items = stock.filter(p=>p.brand===brand);
          if(!items.length) return null;
          const bQty = items.reduce((s,p)=>s+totalQty(p),0);
          const bVal = items.reduce((s,p)=>s+p.variants.reduce((vs,v)=>vs+v.qty*v.price,0),0);
          return (
            <div key={brand} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid var(--border)"}}>
              <div style={{fontWeight:500,color:"var(--text-primary)"}}>{brand}</div>
              <div style={{display:"flex",gap:24,fontSize:13}}>
                <span style={{color:"var(--text-tertiary)"}}>{items.length} lines</span>
                <span style={{fontFamily:"var(--font-mono)",color:"var(--text-primary)"}}>{bQty} units</span>
                <span style={{fontFamily:"var(--font-display)",fontSize:15,color:"var(--red)",fontWeight:700}}>{fmtPrice(bVal)}</span>
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
  const [editing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState("");
  const filtered = stock.filter(p=>
    p.category.toLowerCase().includes(search.toLowerCase())||
    p.brand.toLowerCase().includes(search.toLowerCase())||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      {filtered.map(product=>(
        <div key={product.id} className="section-card" style={{marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
            <span style={{fontSize:26}}>{product.emoji}</span>
            <div>
              <div style={{fontFamily:"var(--font-display)",fontSize:17,fontWeight:700,letterSpacing:0.5,color:"var(--text-primary)"}}>{product.brand} {product.category}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--text-tertiary)",letterSpacing:2}}>{product.sku}</div>
            </div>
            <div style={{marginLeft:"auto"}}>
              <span className={getBadgeClass(totalQty(product))}>{totalQty(product)} units</span>
            </div>
          </div>
          <table className="data-table">
            <thead><tr><th>Colour</th><th>Storage</th><th>Qty</th><th>Status</th><th>Price</th><th></th></tr></thead>
            <tbody>
              {product.variants.map((v,vi)=>{
                const key=`${product.id}-${vi}`;
                const isEdit=editing===key;
                return (
                  <tr key={vi}>
                    <td>{v.color}</td>
                    <td><span style={{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--text-tertiary)"}}>{v.storage}</span></td>
                    <td><span className={`product-qty ${getQtyClass(v.qty)}`}>{v.qty}</span></td>
                    <td><span className={getBadgeClass(v.qty)}>{getQtyLabel(v.qty)}</span></td>
                    <td>
                      {isEdit
                        ? <input className="price-edit-input" value={editVal} onChange={e=>setEditVal(e.target.value)} autoFocus
                            onKeyDown={e=>{if(e.key==="Enter"){onUpdatePrice(product.id,vi,parseFloat(editVal));setEditing(null);}if(e.key==="Escape")setEditing(null);}} />
                        : <span style={{fontFamily:"var(--font-display)",fontWeight:700,color:"var(--red)"}}>{fmtPrice(v.price)}</span>
                      }
                    </td>
                    <td>
                      {isEdit
                        ? <><button className="icon-btn" style={{color:"var(--green)"}} onClick={()=>{onUpdatePrice(product.id,vi,parseFloat(editVal));setEditing(null);}}>✓</button>
                            <button className="icon-btn" style={{color:"var(--red)"}} onClick={()=>setEditing(null)}>✕</button></>
                        : <button className="icon-btn" onClick={()=>{setEditing(key);setEditVal(v.price.toString());}}>✏️</button>
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
  const [form, setForm]         = useState({brand:"",category:"",sku:"",emoji:"📱"});
  const [variants, setVariants] = useState([{color:"",storage:"",qty:0,price:0}]);

  const addV  = () => setVariants([...variants,{color:"",storage:"",qty:0,price:0}]);
  const remV  = i  => setVariants(variants.filter((_,idx)=>idx!==i));
  const updV  = (i,f,val) => { const v=[...variants]; v[i][f]=f==="qty"||f==="price"?Number(val):val; setVariants(v); };
  const save  = () => {
    if(!form.brand||!form.category||!form.sku){addToast("Fill in all product fields","error");return;}
    onAdd({...form,variants});
    setForm({brand:"",category:"",sku:"",emoji:"📱"});
    setVariants([{color:"",storage:"",qty:0,price:0}]);
    addToast(`${form.brand} ${form.category} added`);
  };

  return (
    <div className="section-card" style={{maxWidth:640}}>
      <div className="section-card-title">New Product</div>
      <div className="form-grid">
        <div className="form-row"><label className="form-label">Brand</label><input className="form-input" value={form.brand} onChange={e=>setForm({...form,brand:e.target.value})} placeholder="e.g. Samsung"/></div>
        <div className="form-row"><label className="form-label">Model</label><input className="form-input" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="e.g. Galaxy S25"/></div>
        <div className="form-row"><label className="form-label">SKU</label><input className="form-input" value={form.sku} onChange={e=>setForm({...form,sku:e.target.value.toUpperCase()})} placeholder="e.g. SS25U"/></div>
        <div className="form-row"><label className="form-label">Emoji</label><input className="form-input" value={form.emoji} onChange={e=>setForm({...form,emoji:e.target.value})} placeholder="📱"/></div>
      </div>
      <div className="section-card-title" style={{marginTop:8}}>Variants</div>
      {variants.map((v,i)=>(
        <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr auto",gap:8,marginBottom:8,alignItems:"center"}}>
          <input className="form-input" value={v.color}   onChange={e=>updV(i,"color",e.target.value)}   placeholder="Colour"/>
          <input className="form-input" value={v.storage} onChange={e=>updV(i,"storage",e.target.value)} placeholder="Storage"/>
          <input className="form-input" type="number" value={v.qty}   onChange={e=>updV(i,"qty",e.target.value)}   placeholder="Qty"/>
          <input className="form-input" type="number" value={v.price} onChange={e=>updV(i,"price",e.target.value)} placeholder="Price"/>
          <button onClick={()=>remV(i)} style={{background:"none",border:"none",color:"var(--red)",cursor:"pointer",fontSize:18}}>✕</button>
        </div>
      ))}
      <div style={{display:"flex",gap:10,marginTop:16}}>
        <button className="btn-ghost-app" onClick={addV}>+ Variant</button>
        <button className="btn-primary" onClick={save}>SAVE PRODUCT →</button>
      </div>
    </div>
  );
}

// ─── ADJUSTMENTS ─────────────────────────────────────────────────────────────
function Adjustments({ stock, onAdjust, log }) {
  const [adjType,    setAdjType]    = useState("receive");
  const [productId,  setProductId]  = useState("");
  const [variantIdx, setVariantIdx] = useState("");
  const [qty,        setQty]        = useState(1);
  const [note,       setNote]       = useState("");
  const sel = stock.find(p=>p.id===Number(productId));

  const submit = () => {
    if(!productId||variantIdx==="") return;
    onAdjust({type:adjType,productId:Number(productId),variantIdx:Number(variantIdx),qty:Number(qty),note,date:new Date().toLocaleString("en-ZA")});
    setQty(1);setNote("");setProductId("");setVariantIdx("");
  };

  return (
    <div>
      <div className="section-card" style={{maxWidth:560}}>
        <div className="section-card-title">Adjustment Type</div>
        <div className="adj-pills">
          {ADJ_TYPES.map(t=>(
            <button key={t.id} className={`adj-pill ${adjType===t.id?"active":""}`} onClick={()=>setAdjType(t.id)}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
        <div className="form-row">
          <label className="form-label">Product</label>
          <select className="form-select" value={productId} onChange={e=>{setProductId(e.target.value);setVariantIdx("");}}>
            <option value="">Select product...</option>
            {stock.map(p=><option key={p.id} value={p.id}>{p.brand} {p.category}</option>)}
          </select>
        </div>
        {sel && (
          <div className="form-row">
            <label className="form-label">Variant</label>
            <select className="form-select" value={variantIdx} onChange={e=>setVariantIdx(e.target.value)}>
              <option value="">Select variant...</option>
              {sel.variants.map((v,i)=><option key={i} value={i}>{v.color} / {v.storage} (Stock: {v.qty})</option>)}
            </select>
          </div>
        )}
        <div className="form-grid">
          <div className="form-row"><label className="form-label">Quantity</label><input className="form-input" type="number" min="1" value={qty} onChange={e=>setQty(e.target.value)}/></div>
          <div className="form-row"><label className="form-label">Note</label><input className="form-input" value={note} onChange={e=>setNote(e.target.value)} placeholder="Optional..."/></div>
        </div>
        <button className="btn-primary" onClick={submit}>APPLY ADJUSTMENT →</button>
      </div>

      {log.length>0 && (
        <div className="section-card">
          <div className="section-card-title">Recent Adjustments</div>
          {log.slice().reverse().slice(0,15).map((l,i)=>{
            const t=ADJ_TYPES.find(a=>a.id===l.type);
            const p=stock.find(s=>s.id===l.productId);
            return (
              <div key={i} className="adj-log-item">
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span>{t?.icon}</span>
                  <div>
                    <div style={{fontSize:13,color:"var(--text-primary)"}}>{t?.label} · {p?.brand} {p?.category}</div>
                    <div style={{fontSize:11,color:"var(--text-tertiary)"}}>{l.note||"No note"} · {l.date}</div>
                  </div>
                </div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:13,color:l.type==="receive"?"var(--green)":"var(--red)"}}>
                  {l.type==="receive"?"+":"-"}{l.qty}
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
  const set = (pid,vi,val) => setCounts(p=>({...p,[`${pid}-${vi}`]:val}));
  const commit = () => {
    const updates=[];
    stock.forEach(p=>p.variants.forEach((v,vi)=>{
      const k=`${p.id}-${vi}`;
      if(counts[k]!==""&&counts[k]!==undefined) updates.push({productId:p.id,variantIdx:vi,newQty:Number(counts[k])});
    }));
    if(!updates.length){addToast("No counts entered","warning");return;}
    onCommit(updates); setCounts({}); addToast(`Stock take committed — ${updates.length} variants updated`);
  };

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div style={{fontSize:13,color:"var(--text-secondary)"}}>Enter physical counts. Leave blank to skip.</div>
        <button className="btn-primary" onClick={commit}>COMMIT STOCK TAKE →</button>
      </div>
      {stock.map(product=>(
        <div key={product.id} className="section-card" style={{marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
            <span style={{fontSize:22}}>{product.emoji}</span>
            <div style={{fontFamily:"var(--font-display)",fontWeight:700,letterSpacing:0.5,color:"var(--text-primary)"}}>{product.brand} {product.category}</div>
            <span className="badge badge-blue" style={{marginLeft:"auto"}}>{product.sku}</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 100px 100px",gap:8,marginBottom:6,fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:2,color:"var(--text-tertiary)",textTransform:"uppercase"}}>
            <span>Colour</span><span>Storage</span><span>System</span><span>Physical</span><span>Variance</span>
          </div>
          {product.variants.map((v,vi)=>{
            const key=`${product.id}-${vi}`;
            const phys=counts[key]!==undefined?Number(counts[key]):null;
            const vari=phys!==null?phys-v.qty:null;
            return (
              <div key={vi} className="stocktake-row">
                <span style={{fontSize:13,color:"var(--text-primary)"}}>{v.color}</span>
                <span style={{fontFamily:"var(--font-mono)",fontSize:12,color:"var(--text-tertiary)"}}>{v.storage}</span>
                <span style={{fontFamily:"var(--font-mono)",color:"var(--text-primary)"}}>{v.qty}</span>
                <input className="stocktake-input" type="number" min="0" value={counts[key]??""} onChange={e=>set(product.id,vi,e.target.value)} placeholder="—"/>
                <span className={vari===null?"variance-zero":vari>0?"variance-pos":vari<0?"variance-neg":"variance-zero"}>
                  {vari===null?"—":vari>0?`+${vari}`:vari}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── STOCK MANAGEMENT ─────────────────────────────────────────────────────────
function StockManagement({ stock, onUpdatePrice, onAdd, onAdjust, adjLog, onCommit, addToast, search }) {
  const [tab, setTab] = useState("view");
  const TABS = [{id:"view",label:"View Stock"},{id:"add",label:"Add Product"},{id:"adjust",label:"Adjustments"},{id:"stocktake",label:"Stock Take"}];
  return (
    <div>
      <div className="tab-bar">
        {TABS.map(t=><button key={t.id} className={`tab-btn ${tab===t.id?"active":""}`} onClick={()=>setTab(t.id)}>{t.label}</button>)}
      </div>
      {tab==="view"      && <ViewStock stock={stock} onUpdatePrice={onUpdatePrice} search={search}/>}
      {tab==="add"       && <AddProduct onAdd={onAdd} addToast={addToast}/>}
      {tab==="adjust"    && <Adjustments stock={stock} onAdjust={onAdjust} log={adjLog}/>}
      {tab==="stocktake" && <StockTake stock={stock} onCommit={onCommit} addToast={addToast}/>}
    </div>
  );
}

// ─── PRODUCT GRID ─────────────────────────────────────────────────────────────
function ProductGridView({ stock, search }) {
  const [selected, setSelected] = useState(null);
  const filtered = stock.filter(p=>
    p.category.toLowerCase().includes(search.toLowerCase())||
    p.brand.toLowerCase().includes(search.toLowerCase())||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div className="product-grid">
        {filtered.map(p=>(
          <div key={p.id} className="product-card" onClick={()=>setSelected(p)}>
            <div className="product-card-img">{p.emoji}</div>
            <div className="product-card-body">
              <div className="product-card-brand">{p.brand}</div>
              <div className="product-card-name">{p.category}</div>
              <div className="product-card-footer">
                <span className={`product-qty ${getQtyClass(totalQty(p))}`}>{totalQty(p)} units</span>
                <span className="product-price">{fmtPrice(Math.min(...p.variants.map(v=>v.price)))}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={()=>setSelected(null)}>
          <div className="modal-box" onClick={e=>e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{selected.brand} {selected.category}</div>
              <button className="modal-close" onClick={()=>setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{textAlign:"center",fontSize:52,marginBottom:16}}>{selected.emoji}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:11,color:"var(--text-tertiary)",letterSpacing:2,marginBottom:16}}>SKU: {selected.sku}</div>
              <table className="data-table">
                <thead><tr><th>Colour</th><th>Storage</th><th>Qty</th><th>Price</th></tr></thead>
                <tbody>
                  {selected.variants.map((v,i)=>(
                    <tr key={i}>
                      <td>{v.color}</td>
                      <td><span style={{fontFamily:"var(--font-mono)",fontSize:12}}>{v.storage}</span></td>
                      <td><span className={`product-qty ${getQtyClass(v.qty)}`}>{v.qty}</span></td>
                      <td><span style={{fontFamily:"var(--font-display)",fontWeight:700,color:"var(--red)"}}>{fmtPrice(v.price)}</span></td>
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

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen,  setScreen]  = useState("hero");
  const [user,    setUser]    = useState(null);
  const [stock,   setStock]   = useState(INITIAL_STOCK);
  const [adjLog,  setAdjLog]  = useState([]);
  const [navPage, setNavPage] = useState("dashboard");
  const [search,  setSearch]  = useState("");
  const [toasts,  setToasts]  = useState([]);

  const addToast = (msg, type="success") => {
    const id = Date.now();
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)), 3500);
  };

  const handleLogin = c => { setUser(c); setNavPage(c.role==="admin"?"dashboard":"products"); setScreen("app"); };

  const updatePrice = (pid,vi,price) => {
    setStock(p=>p.map(pr=>pr.id!==pid?pr:{...pr,variants:pr.variants.map((v,i)=>i!==vi?v:{...v,price})}));
    addToast("Price updated");
  };
  const addProduct = prod => setStock(p=>[...p,{...prod,id:Date.now()}]);
  const adjust = adj => {
    setStock(p=>p.map(pr=>{
      if(pr.id!==adj.productId) return pr;
      return {...pr,variants:pr.variants.map((v,i)=>{
        if(i!==adj.variantIdx) return v;
        const d=adj.type==="receive"?adj.qty:-adj.qty;
        return {...v,qty:Math.max(0,v.qty+d)};
      })};
    }));
    setAdjLog(p=>[...p,adj]);
    addToast(`${ADJ_TYPES.find(a=>a.id===adj.type)?.label} applied`);
  };
  const commit = updates => setStock(p=>p.map(pr=>({...pr,variants:pr.variants.map((v,vi)=>{
    const u=updates.find(u=>u.productId===pr.id&&u.variantIdx===vi);
    return u?{...v,qty:u.newQty}:v;
  })})));

  const NAV = user?.role==="admin"
    ? [{id:"dashboard",label:"Dashboard",Ico:IcoDash},{id:"products",label:"Products",Ico:IcoBox},{id:"stock",label:"Stock Mgmt",Ico:IcoSliders}]
    : [{id:"products",label:"Products",Ico:IcoBox}];

  const pageMeta = {
    dashboard: { title:"Dashboard",    sub:"Stock overview and alerts" },
    products:  { title:"Products",     sub:"Browse inventory" },
    stock:     { title:"Stock Mgmt",   sub:"View, add, adjust and count stock" },
  };

  if(screen==="hero")  return (<><style>{css}</style><HeroPage onEnter={()=>setScreen("login")}/><Toasts toasts={toasts}/></>);
  if(screen==="login") return (<><style>{css}</style><LoginPage onLogin={handleLogin}/><Toasts toasts={toasts}/></>);

  return (
    <>
      <style>{css}</style>
      {TEST_MODE && <div className="test-banner">⚠ TEST MODE — Data resets on refresh</div>}
      <Toasts toasts={toasts}/>

      <div className="app-wrap">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-brand">
            <div className="logo-emblem">V</div>
            <span className="logo-text">VODA<span style={{color:"var(--red)"}}>STOCK</span></span>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-section-label">Navigation</div>
            {NAV.map(({id,label,Ico})=>(
              <div key={id} className={`nav-item ${navPage===id?"active":""}`} onClick={()=>{setNavPage(id);setSearch("");}}>
                <span className="nav-icon"><Ico/></span>
                <span>{label}</span>
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="user-chip">
              <div className="user-avatar">{user?.name?.[0]}</div>
              <div><div className="user-info-name">{user?.name}</div><div className="user-role-badge">{user?.role}</div></div>
            </div>
            <button className="logout-btn" onClick={()=>{setScreen("hero");setUser(null);}}>
              <IcoOut/> Sign Out
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <div className="main-area">
          <div className="top-bar">
            <div>
              <div className="page-title">{pageMeta[navPage]?.title}</div>
              <div className="page-sub">{pageMeta[navPage]?.sub}</div>
            </div>
            <div className="search-bar">
              <IcoSearch/>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..."/>
            </div>
          </div>

          <div className="content-area">
            {navPage==="dashboard" && <Dashboard stock={stock}/>}
            {navPage==="products"  && <ProductGridView stock={stock} search={search}/>}
            {navPage==="stock" && user?.role==="admin" && (
              <StockManagement stock={stock} onUpdatePrice={updatePrice} onAdd={addProduct}
                onAdjust={adjust} adjLog={adjLog} onCommit={commit} addToast={addToast} search={search}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
