import { FC } from "react";
import ReactMarkdown from "react-markdown";
import rangeParser from "parse-numeric-range";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);

type MarkdownProps = {
  markdown: string;
};

const Markdown: FC<MarkdownProps> = ({ markdown }) => {
  const theme = useTheme();
  const syntaxTheme = oneDark;

  const MarkdownComponents: object = {
    // @ts-ignore
    code({ node, inline, className, ...props }) {
      const hasLang = /language-(\w+)/.exec(className || "");
      const hasMeta = node?.data?.meta;

      const applyHighlights: object = (applyHighlights: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata: string = node.data.meta?.replace(/\s/g, "");
          const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)?.[1] ?? "0"
            : "0";
          const highlightLines = rangeParser(strlineNumbers);
          const highlight = highlightLines;
          const data: string | null = highlight.includes(applyHighlights)
            ? "highlight"
            : null;
          return { data };
        } else {
          return {};
        }
      };

      return hasLang ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={hasLang[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={hasMeta}
          useInlineStyles={true}
          lineProps={applyHighlights}
        >
          {props.children}
        </SyntaxHighlighter>
      ) : (
        <Box
          component="code"
          className={className}
          sx={{
            background: theme.palette.neutral[200],
            borderRadius: 1,
            borderColor: theme.palette.neutral[200],
            borderStyle: "solid",
            borderWidth: "2px 3px",
          }}
          {...props}
        />
      );
    },
  };

  return (
    <ReactMarkdown components={MarkdownComponents}>{markdown}</ReactMarkdown>
  );
};

export default Markdown;
