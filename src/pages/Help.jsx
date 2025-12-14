import React from "react";
import { HelpCircle, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FAQItem from "../components/ui/FAQItem";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const faqs = [
  {
    q: "クレジットカードがなくても支払えますか？",
    a: "はい、Vプリカやバンドルカードなどのプリペイドカード、またはデビットカードがご利用いただけます。",
  },
  {
    q: "特典はいつ反映されますか？",
    a: "決済完了後、通常5分以内にDiscordおよびゲーム内に自動反映されます。Discord連携が済んでいることをご確認ください。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "はい、月額プランはDiscordのマイページ、または当サイトからいつでも解約可能です。解約後も、支払い済みの期間は特典が継続します。",
  },
  {
    q: "集まった資金は何に使われますか？",
    a: "100%がサーバーの維持費（レンタルサーバー代など）に充てられます。余剰分が出た場合は、イベントの賞品などに還元されます。",
  },
];

const Help = () => {
  const navigate = useNavigate();
  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleLogin = () => navigate("/join");
  const handleLogout = () => {
    localStorage.removeItem("discord_user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] text-[#1e293b]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700;800&family=Outfit:wght@500;700;900&display=swap');
        body { font-family: 'M PLUS Rounded 1c', sans-serif; }
        h1, h2, h3, .brand-font { font-family: 'Outfit', sans-serif; }
        .glass-header {
          background: rgba(255, 255, 255, 0.60);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
        }
        .btn-push {
          transition: transform 0.08s cubic-bezier(0.3, 0, 0.5, 1), box-shadow 0.08s cubic-bezier(0.3, 0, 0.5, 1);
          box-shadow: 0 4px 0 #4752c4;
        }
        .btn-push:active {
          transform: translateY(4px);
          box-shadow: 0 0 0 transparent;
        }
      `}</style>

      <Header
        isLoggedIn={false}
        user={null}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onScrollTop={handleScrollTop}
      />

      <main className="container mx-auto px-4 pt-40 md:pt-48 pb-16 max-w-3xl">
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800">FAQ / ヘルプページ</h1>
          <p className="text-sm md:text-base text-slate-600">
            まずはこちらをご確認ください。
          </p>
        </div>

        <div className="space-y-4 mb-10">
          {faqs.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              それでも解決しない場合
            </div>
            <div className="text-lg font-black text-slate-800">
              Discord のお問い合わせチャンネルへどうぞ
            </div>
            <p className="text-sm text-slate-600 mt-1">
              スタッフが直接対応いたします。
            </p>
          </div>
          <a
            href="https://discord.com/channels/746587719827980359/1137833421704536176"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm text-white bg-[#5865F2] hover:bg-[#4752c4] transition-colors btn-push"
          >
            チャンネルを開く
            <MessageCircle size={16} className="text-white" />
          </a>
        </div>
      </main>
      <Footer onScrollTop={handleScrollTop} />
    </div>
  );
};

export default Help;
