import { useCallback, useId, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './CodeBlock.module.css';

/** Prism 支持的语言标识（文档站常用） */
export type CodeLanguage =
  | 'tsx'
  | 'jsx'
  | 'typescript'
  | 'javascript'
  | 'bash'
  | 'json'
  | 'css'
  | 'plaintext';

type CodeBlockProps = {
  code: string;
  /** 语法高亮语言，默认 tsx */
  language?: CodeLanguage;
};

const CODE_BG = '#222222';

function copyViaTextarea(text: string): boolean {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const text = code.trim();
  const hasCode = text.length > 0;
  const [expanded, setExpanded] = useState(false);
  const paneId = useId();
  const toggleId = useId();

  const paneClass = expanded
    ? `${styles.codePane} ${styles.codePaneVisible}`
    : `${styles.codePane} ${styles.codePaneHidden}`;

  const handleCopy = useCallback(async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      ok = copyViaTextarea(text);
    }
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        {hasCode ? (
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            aria-controls={paneId}
            id={toggleId}
          >
            <svg
              className={expanded ? `${styles.chevron} ${styles.chevronOpen}` : styles.chevron}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {expanded ? '收起代码' : '展开代码'}
          </button>
        ) : null}
        <button
          type="button"
          className={styles.copyBtn}
          onClick={() => void handleCopy()}
          aria-label={copied ? '已复制到剪贴板' : '复制代码'}
          title={copied ? '已复制' : '复制'}
        >
          {copied ? (
            <svg
              className={styles.copyIcon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              className={styles.copyIcon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <rect
                x="8"
                y="8"
                width="12"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
      <div
        id={paneId}
        className={paneClass}
        role={hasCode ? 'region' : undefined}
        aria-labelledby={hasCode ? toggleId : undefined}
      >
        {expanded && hasCode ? (
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            PreTag="div"
            customStyle={{
              margin: 0,
              padding: 'var(--spacing-150) var(--spacing-200)',
              background: CODE_BG,
              fontSize: 'var(--spacing-125)',
              lineHeight: 1.55,
            }}
            codeTagProps={{
              style: {
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              },
            }}
          >
            {text}
          </SyntaxHighlighter>
        ) : null}
      </div>
    </div>
  );
}
