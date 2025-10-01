import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs, vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Algorithm } from "@/types/algorithms";
import { useEffect, useState } from "react";

interface ContentTabsProps {
  algorithm: Algorithm;
}

export const ContentTabs = ({ algorithm }: ContentTabsProps) => {
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

  const renderContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      // Handle bold text
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h3 key={index} className="font-bold text-lg mt-4 mb-2">
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      }
      
      // Handle bullet points
      if (line.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 mb-1">
            {line.substring(2)}
          </li>
        );
      }
      
      // Handle numbered lists
      const numberedMatch = line.match(/^(\d+)\.\s/);
      if (numberedMatch) {
        return (
          <li key={index} className="ml-6 mb-1 list-decimal">
            {line.substring(numberedMatch[0].length)}
          </li>
        );
      }
      
      // Regular paragraph
      if (line.trim()) {
        return (
          <p key={index} className="mb-2">
            {line}
          </p>
        );
      }
      
      return <br key={index} />;
    });
  };

  return (
    <Tabs defaultValue="problem" className="w-full">
      <TabsList className="border-b border-tab-border rounded-none bg-transparent p-0 h-auto">
        <TabsTrigger 
          value="problem"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 py-2"
        >
          Problem
        </TabsTrigger>
        <TabsTrigger 
          value="algorithm"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 py-2"
        >
          Algorithm
        </TabsTrigger>
        <TabsTrigger 
          value="solution"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 py-2"
        >
          Solution
        </TabsTrigger>
        <TabsTrigger 
          value="improvements"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 py-2"
        >
          Improvements
        </TabsTrigger>
      </TabsList>

      <TabsContent value="problem" className="mt-6 prose max-w-none">
        <p className="text-base leading-relaxed">{algorithm.problem}</p>
      </TabsContent>

      <TabsContent value="algorithm" className="mt-6 prose max-w-none">
        <div className="text-base leading-relaxed">
          {renderContent(algorithm.algorithm)}
        </div>
      </TabsContent>

      <TabsContent value="solution" className="mt-6 prose max-w-none">
        <div className="text-base leading-relaxed mb-6">
          {renderContent(algorithm.solution)}
        </div>
        
        {algorithm.code && (
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-3">Complexity</h3>
            <p className="mb-2">
              <strong>Time:</strong> O(V + E) — each vertex visited once, each edge considered once.
            </p>
            <p className="mb-4">
              <strong>Space:</strong> O(V) — queue + visited set.
            </p>
            
            <h3 className="font-bold text-lg mb-3 mt-6">Implementation</h3>
            <div className="rounded-md overflow-hidden border border-border">
              <SyntaxHighlighter
                language="go"
                style={isDark ? vscDarkPlus : vs}
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                }}
              >
                {algorithm.code}
              </SyntaxHighlighter>
            </div>
          </div>
        )}
      </TabsContent>

      <TabsContent value="improvements" className="mt-6 prose max-w-none">
        <p className="text-base leading-relaxed">{algorithm.improvements}</p>
      </TabsContent>
    </Tabs>
  );
};
