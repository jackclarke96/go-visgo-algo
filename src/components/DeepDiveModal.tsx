import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RichText } from "./RichText";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs, vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useState } from "react";
import { Callout } from "./Callout";

interface DeepDiveModalProps {
  trigger: string;
  title: string;
  content: string;
}

export const DeepDiveModal = ({ trigger, title, content }: DeepDiveModalProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    
    return () => observer.disconnect();
  }, []);

  const parseContent = () => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Handle callout blocks
      if (line.startsWith("[CALLOUT:")) {
        const typeMatch = line.match(/\[CALLOUT:(\w+)\]/);
        if (typeMatch) {
          const type = typeMatch[1].toLowerCase() as "info" | "warning" | "tip" | "definition" | "algorithm";
          let calloutContent = "";
          i++;
          
          while (i < lines.length && !lines[i].includes("[/CALLOUT]")) {
            calloutContent += lines[i] + "\n";
            i++;
          }
          
          elements.push(
            <Callout key={i} type={type}>
              <div className="whitespace-pre-wrap">
                {parseCalloutContent(calloutContent.trim())}
              </div>
            </Callout>
          );
          i++;
          continue;
        }
      }

      // Handle code blocks
      if (line.startsWith("```")) {
        const language = line.substring(3).trim() || "go";
        let codeContent = "";
        i++;
        
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeContent += lines[i] + "\n";
          i++;
        }
        
        elements.push(
          <div key={i} className="rounded-md overflow-hidden border border-border my-4">
            <SyntaxHighlighter
              language={language}
              style={isDark ? vscDarkPlus : vs}
              customStyle={{
                margin: 0,
                padding: "1rem",
                fontSize: "0.875rem",
                lineHeight: "1.5",
              }}
            >
              {codeContent.trim()}
            </SyntaxHighlighter>
          </div>
        );
        i++;
        continue;
      }

      // Handle bold headings
      if (line.match(/^\*\*[^*]+\*\*$/) && line.length > 4) {
        elements.push(
          <h3 key={i} className="font-bold text-lg mt-4 mb-2">
            {line.replace(/\*\*/g, "")}
          </h3>
        );
        i++;
        continue;
      }

      // Handle bullet points
      if (line.startsWith("• ") || line.startsWith("- ")) {
        elements.push(
          <li key={i} className="ml-6 mb-1 list-disc">
            <RichText content={line.substring(2)} />
          </li>
        );
        i++;
        continue;
      }

      // Handle numbered lists
      const numberedMatch = line.match(/^(\d+)\.\s/);
      if (numberedMatch) {
        elements.push(
          <li key={i} className="ml-6 mb-1 list-decimal">
            <RichText content={line.substring(numberedMatch[0].length)} />
          </li>
        );
        i++;
        continue;
      }

      // Regular paragraph
      if (line.trim()) {
        elements.push(
          <p key={i} className="mb-2">
            <RichText content={line} />
          </p>
        );
      } else {
        elements.push(<br key={i} />);
      }
      
      i++;
    }

    return elements;
  };

  const parseCalloutContent = (text: string) => {
    const lines = text.split("\n");
    const elements: JSX.Element[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Handle code blocks within callouts
      if (line.startsWith("```")) {
        const language = line.substring(3).trim() || "go";
        let codeContent = "";
        i++;
        
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeContent += lines[i] + "\n";
          i++;
        }
        
        elements.push(
          <div key={i} className="rounded-md overflow-hidden border border-border my-2">
            <SyntaxHighlighter
              language={language}
              style={isDark ? vscDarkPlus : vs}
              customStyle={{
                margin: 0,
                padding: "0.75rem",
                fontSize: "0.8rem",
                lineHeight: "1.4",
              }}
            >
              {codeContent.trim()}
            </SyntaxHighlighter>
          </div>
        );
        continue;
      }

      // Handle bullet points
      if (line.startsWith("• ") || line.startsWith("- ")) {
        elements.push(
          <div key={i} className="mb-1">
            <RichText content={line} />
          </div>
        );
        continue;
      }

      if (line.trim()) {
        elements.push(
          <div key={i} className="mb-1">
            <RichText content={line} />
          </div>
        );
      }
    }
    
    return elements;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-auto p-1 text-info hover:text-info/80 hover:bg-info/10 inline-flex items-center"
        >
          <Info className="h-4 w-4 mr-1" />
          <span className="underline decoration-dotted">{trigger}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="mt-4 space-y-2 text-foreground">
            {parseContent()}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
