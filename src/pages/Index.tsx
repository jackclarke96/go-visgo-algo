import { useState } from "react";
import { AlgorithmSidebar } from "@/components/AlgorithmSidebar";
import { ContentTabs } from "@/components/ContentTabs";
import { algorithmCategories } from "@/data/algorithms";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [selectedAlgorithmId, setSelectedAlgorithmId] = useState("route-between-nodes");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const selectedAlgorithm = algorithmCategories
    .flatMap((cat) => cat.algorithms)
    .find((alg) => alg.id === selectedAlgorithmId);

  const handleAlgorithmSelect = (id: string) => {
    setSelectedAlgorithmId(id);
    setIsMobileMenuOpen(false); // Close menu on mobile after selection
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <h1 className="text-lg font-semibold ml-2 md:ml-0">Go Algorithms</h1>
        </div>
      </header>

      <div className="flex flex-1 w-full">
        {/* Sidebar - hidden on mobile by default, shown when menu is open */}
        <div className={`
          fixed md:relative inset-y-0 left-0 z-40 
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          top-14 md:top-0
        `}>
          <AlgorithmSidebar
            selectedId={selectedAlgorithmId}
            onSelect={handleAlgorithmSelect}
          />
        </div>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden top-14"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full min-w-0">
          {selectedAlgorithm && (
            <article className="max-w-full">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground break-words">
                {selectedAlgorithm.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Problems from <em>Cracking the Coding Interview</em> by Gayle Laakmann McDowell
              </p>
              <ContentTabs algorithm={selectedAlgorithm} />
            </article>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
