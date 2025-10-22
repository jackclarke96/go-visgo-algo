import { useState } from "react";
import { AlgorithmSidebar } from "@/components/AlgorithmSidebar";
import { ContentTabs } from "@/components/ContentTabs";
import { algorithmCategories } from "@/data/algorithms";

const Index = () => {
  const [selectedAlgorithmId, setSelectedAlgorithmId] = useState("route-between-nodes");

  const selectedAlgorithm = algorithmCategories
    .flatMap((cat) => cat.algorithms)
    .find((alg) => alg.id === selectedAlgorithmId);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AlgorithmSidebar
        selectedId={selectedAlgorithmId}
        onSelect={setSelectedAlgorithmId}
      />
      
      <main className="flex-1 p-8 overflow-y-auto">
        {selectedAlgorithm && (
          <article>
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              {selectedAlgorithm.title}
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Problems from <em>Cracking the Coding Interview</em> by Gayle Laakmann McDowell
            </p>
            <ContentTabs algorithm={selectedAlgorithm} />
          </article>
        )}
      </main>
    </div>
  );
};

export default Index;
