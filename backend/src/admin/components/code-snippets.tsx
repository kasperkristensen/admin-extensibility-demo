import clsx from "clsx";
import copy from "copy-to-clipboard";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";
import CheckCircleFillIcon from "../icons/check-circle-fill-icon";
import ClipboardCopyIcon from "../icons/clipboard-copy-icon";

const CodeSnippets = ({
  snippets,
}: {
  snippets: {
    label: string;
    language: string;
    code: string;
  }[];
}) => {
  const [active, setActive] = useState(snippets[0]);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    setCopied(true);
    copy(active.code);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="rounded-lg bg-stone-900">
      <div className="flex gap-2 rounded-t-lg border-b border-b-stone-600 bg-stone-800 px-6 py-4">
        {snippets.map((snippet) => (
          <div
            className={clsx(
              "text-small rounded-2xl border border-transparent px-3 py-1 font-semibold inline-flex items-center justify-center",
              {
                "border-stone-600 bg-stone-900 text-white leading-tight":
                  active.label === snippet.label,
              },
              {
                "cursor-pointer text-gray-400": active.label !== snippet.label,
              }
            )}
            key={snippet.label}
            onClick={() => setActive(snippet)}
          >
            {snippet.label}
          </div>
        ))}
      </div>
      <div className="p-6 relative">
        <div
          className="absolute right-4 top-4 text-gray-600 hover:text-gray-400 cursor-pointer"
          onClick={copyToClipboard}
        >
          {copied ? (
            <CheckCircleFillIcon size="24px" />
          ) : (
            <ClipboardCopyIcon size="24px" />
          )}
        </div>
        <Highlight
          theme={{
            ...themes.palenight,
            plain: {
              color: "#7E7D86",
              backgroundColor: "#1C1C1F",
            },
          }}
          code={active.code}
          language={active.language}
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              style={{ ...style, background: "transparent", fontSize: "12px" }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default CodeSnippets;
