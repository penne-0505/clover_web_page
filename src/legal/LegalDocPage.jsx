import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { legalDocs, legalDocList } from "./config";

const slugify = (text) =>
  text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\- ]/gu, "")
    .replace(/\s+/g, "-");

const stripFrontMatter = (markdown) => {
  if (!markdown.startsWith("---")) return markdown;
  const end = markdown.indexOf("\n---", 3);
  if (end === -1) return markdown;
  return markdown.slice(end + 4).trimStart();
};

const getTextContent = (children) => {
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (children?.props?.children) return getTextContent(children.props.children);
  return "";
};

const SegmentedTabs = ({ activeKey, onSelect }) => {
  const activeIndex = legalDocList.findIndex((d) => d.key === activeKey);
  const width = `${100 / legalDocList.length}%`;

  return (
    <div
      className="no-print overflow-x-auto -mx-1 px-1 pb-3"
      role="tablist"
      aria-label="規約切替タブ"
    >
      <div className="min-w-[320px] max-w-2xl w-full mx-auto bg-slate-100 p-1.5 rounded-2xl flex relative shadow-inner">
        <div
          className="absolute top-1.5 bottom-1.5 bg-white rounded-xl shadow-sm transition-all duration-300 ease-out z-0"
          style={{
            left: `calc(${width} * ${Math.max(activeIndex, 0)})`,
            width: `calc(${width} - 6px)`,
          }}
        />
        {legalDocList.map((item, idx) => {
          const selected = item.key === activeKey;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${item.key}-panel`}
              id={`${item.key}-tab`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onSelect?.(item.key)}
              className={`flex-1 relative z-10 py-2.5 text-sm font-bold transition-colors duration-200 ${
                selected ? "text-[#1e293b]" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const LegalDocPage = ({ docKey }) => {
  const doc = legalDocs[docKey] ?? legalDocs.terms;
  const navigate = useNavigate();

  const content = useMemo(() => stripFrontMatter(doc.content), [doc.content]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [doc.key]);

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleLogin = () => navigate("/join");
  const handleLogout = () => {
    localStorage.removeItem("discord_user");
    window.location.href = "/";
  };

  const renderers = (() => {
    const counts = new Map();
    return {
      h2({ node, children, ...props }) {
        const title = getTextContent(children);
        const base = slugify(title);
        const current = counts.get(base) ?? 0;
        const id = current === 0 ? base : `${base}-${current}`;
        counts.set(base, current + 1);
        return (
          <h2 id={id} {...props} className="scroll-mt-24 text-2xl font-black text-slate-800 mt-10 mb-3 flex items-center gap-2">
            <span>{children}</span>
          </h2>
        );
      },
      h3({ node, children, ...props }) {
        const title = getTextContent(children);
        const base = slugify(title);
        const current = counts.get(base) ?? 0;
        const id = current === 0 ? base : `${base}-${current}`;
        counts.set(base, current + 1);
        return (
          <h3 id={id} {...props} className="scroll-mt-24 text-xl font-bold text-slate-800 mt-6 mb-2 flex items-center gap-2">
            <span>{children}</span>
          </h3>
        );
      },
      a({ node, ...props }) {
        return (
          <a
            {...props}
            className="text-[#5865F2] font-semibold underline underline-offset-2"
            target={props.href?.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
          />
        );
      },
      ul({ node, ...props }) {
        return <ul className="list-disc pl-5 space-y-1" {...props} />;
      },
      ol({ node, ...props }) {
        return <ol className="list-decimal pl-5 space-y-1" {...props} />;
      },
      p({ node, ...props }) {
        return <p className="leading-relaxed text-slate-700" {...props} />;
      },
      strong({ node, ...props }) {
        return <strong className="font-bold text-slate-800" {...props} />;
      },
    };
  })();

  return (
    <div className="min-h-screen bg-[#f0f9ff] text-[#1e293b] font-sans">
      <Header
        isLoggedIn={false}
        user={null}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onScrollTop={handleScrollTop}
      />

      <main className="container mx-auto px-4 md:px-6 pt-32 pb-24 max-w-5xl">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700;800&family=Outfit:wght@500;700;900&display=swap');
          .glass-header {
            background: rgba(255, 255, 255, 0.60);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.4);
          }
          .btn-push {
            transition: transform 0.08s cubic-bezier(0.3, 0, 0.5, 1), box-shadow 0.08s cubic-bezier(0.3, 0, 0.5, 1);
          }
          .btn-push:active {
            transform: translateY(4px) !important;
            box-shadow: 0 0 0 transparent !important;
          }
        `}</style>
        <div className="flex justify-start mb-8">
          <motion.a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 no-print"
            whileHover={{ color: "#1f2937" }} // hover時に濃く
            transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
          >
            <ArrowLeft size={18} />
            ホームへ戻る
          </motion.a>
        </div>

        <SegmentedTabs
          activeKey={doc.key}
          onSelect={(key) => {
            if (key !== doc.key) {
              navigate(`/legal/${key}`);
            }
          }}
        />

        <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-6 md:p-8" id={`${doc.key}-panel`} role="tabpanel" aria-labelledby={`${doc.key}-tab`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-1 mb-2">{doc.title}</h1>
              <p className="text-sm md:text-base text-slate-600">{doc.description}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-600">
              <div>最終改定日: <span className="font-bold text-slate-800">{doc.updatedAt}</span></div>
              <div>適用開始日: <span className="font-bold text-slate-800">{doc.effectiveAt}</span></div>
              <div>固定URL: <code className="text-[11px] bg-white border border-slate-200 px-2 py-1 rounded">{doc.path}</code></div>
            </div>
          </div>

          <article className="prose max-w-none prose-slate">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>
              {content}
            </ReactMarkdown>
          </article>
        </div>

      </main>
      <Footer onScrollTop={handleScrollTop} />
    </div>
  );
};

export default LegalDocPage;
