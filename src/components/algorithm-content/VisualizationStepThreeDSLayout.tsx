import { Paragraph, Callout, DiagramWrapper, GraphDiagram, QueueDiagram, MapDiagram } from "@/components/AlgorithmContent";
import { QueueItemState } from "../QueueDiagram";
import { MapEntry } from "../MapDiagram";
import { NodeState } from "@/types/visualizer";

interface QueueItem {
  value: string;
  state: QueueItemState;
}

export interface VisualizationStepProps {
  title: string;
  description: React.ReactNode;
  graph: {
    data: any;
    nodeStates: Record<string, NodeState>;
    width?: number;
    height?: number;
  };
  queue?: QueueItem[];
  stack?: { value: string; state: string }[];
  array?: { value: string; state: string }[];
  map?: MapEntry[];
  textOnRight?: boolean; // If true, text on right, diagrams on left
}

export function VisualizationStep({
  title,
  description,
  graph,
  queue,
  map,
  textOnRight = false,
}: VisualizationStepProps) {
  const hasMultipleDS = queue && map;

  const textContent = (
    <div>
      <Paragraph>
        <strong>{title}</strong>
      </Paragraph>
      {description}
    </div>
  );

  const diagramContent = (
    <div className="space-y-4">
      {/* Graph - full width */}
      <DiagramWrapper title={`${title} - Graph`} compact>
        <GraphDiagram
          graphData={graph.data}
          nodeStates={graph.nodeStates}
          width={graph.width ?? 300}
          height={graph.height ?? 200}
          contentOffset={{ y: -50, x: -50 }}
        />
      </DiagramWrapper>

      {/* Queue and Map side by side */}
      {hasMultipleDS && (
        <div className="grid grid-cols-2 gap-4">
          <DiagramWrapper title={`${title} - Queue`} compact>
            <QueueDiagram items={queue} width={400} height={200} />
          </DiagramWrapper>

          <DiagramWrapper title={`${title} - Map`} compact>
            <MapDiagram entries={map} width={400} height={200} />
          </DiagramWrapper>
        </div>
      )}

      {/* Single data structure - full width */}
      {!hasMultipleDS && queue && (
        <DiagramWrapper title={`${title} - Queue`} compact>
          <QueueDiagram items={queue} width={400} height={200} />
        </DiagramWrapper>
      )}

      {!hasMultipleDS && map && (
        <DiagramWrapper title={`${title} - Map`} compact>
          <MapDiagram entries={map} width={400} height={200} />
        </DiagramWrapper>
      )}
    </div>
  );

  return (
    <div className="grid lg:grid-cols-2 gap-6 my-8">
      {textOnRight ? (
        <>
          {diagramContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {diagramContent}
        </>
      )}
    </div>
  );
}
