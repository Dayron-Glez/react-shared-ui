import { IconCheck, IconCopy } from "@tabler/icons-react";
import { codeToHtml } from "shiki";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface CopyClipboardProps {
  value: string;
  variant?: "input" | "code";
  lang?: string;
}

export default function CopyClipboard({
  value,
  variant = "input",
  lang = "typescript",
}: CopyClipboardProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [highlightedHtml, setHighlightedHtml] = useState<string>("");

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  };

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 5000);
    return () => clearTimeout(timeout);
  }, [copied]);

  useEffect(() => {
    if (variant !== "code") return;
    let cancelled = false;
    codeToHtml(value, {
      lang,
      theme: "github-dark",
      structure: "inline",
    }).then((html) => {
      if (!cancelled) setHighlightedHtml(html);
    });
    return () => {
      cancelled = true;
    };
  }, [value, lang, variant]);

  const copyButton = (
    <TooltipProvider>
      <Tooltip open={copied}>
        <TooltipTrigger asChild>
          <Button
            onClick={handleCopy}
            size="icon"
            variant="ghost"
            className="hover:bg-transparent"
          >
            {copied ? (
              <IconCheck style={{ color: "hsl(170 100% 32%)" }} />
            ) : (
              <IconCopy className="text-primary" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{"Copied!"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  if (variant === "code") {
    return (
      <div className="relative max-w-lg rounded-md border border-primary overflow-hidden">
        <div className="absolute right-2 top-2">{copyButton}</div>
        <pre
          className="overflow-x-auto p-4 pr-12 text-sm leading-relaxed"
          style={{ backgroundColor: "#24292e", color: "#e1e4e8" }}
        >
          {highlightedHtml ? (
            <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
          ) : (
            <code>{value}</code>
          )}
        </pre>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 max-w-sm">
      <Input value={value} readOnly className="border-primary" />
      {copyButton}
    </div>
  );
}
