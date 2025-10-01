import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { algorithmCategories } from "@/data/algorithms";
import { cn } from "@/lib/utils";

interface AlgorithmSidebarProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export const AlgorithmSidebar = ({ selectedId, onSelect }: AlgorithmSidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["graphs", "trees"]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar-background p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-sidebar-foreground">Topics</h2>
      
      <nav>
        {algorithmCategories.map((category) => {
          const isExpanded = expandedCategories.includes(category.id);
          
          return (
            <div key={category.id} className="mb-6">
              <button
                onClick={() => toggleCategory(category.id)}
                className="flex items-center gap-2 w-full text-left mb-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <h3 className="font-bold text-lg">{category.name}</h3>
              </button>
              
              {isExpanded && (
                <ul className="ml-2 space-y-1">
                  {category.algorithms.map((algorithm) => (
                    <li key={algorithm.id}>
                      <button
                        onClick={() => onSelect(algorithm.id)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded text-sm transition-colors",
                          selectedId === algorithm.id
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                      >
                        {algorithm.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
