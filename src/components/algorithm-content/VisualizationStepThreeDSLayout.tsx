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
}

export function VisualizationStep({
  title,
  description,
  graph,
  queue,
  map,
}: VisualizationStepProps) {
  const hasMultipleDS = queue && map;

  if (hasMultipleDS) {
    // Layout for 3 data structures + text:
    // Row 1: Text (col 1) | Graph (col 2-3)
    // Row 2: Queue (col 1-1.5) | Map (col 1.5-3)
    return (
      <div className="my-8 space-y-4">
        {/* Top row: Text + Graph */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          <div>
            <Paragraph>
              <strong>{title}</strong>
            </Paragraph>
            {description}
          </div>

          <div className="lg:col-span-2">
            <DiagramWrapper title={`${title} - Graph`} compact>
              <GraphDiagram
                graphData={graph.data}
                nodeStates={graph.nodeStates}
                width={graph.width ?? 300}
                height={graph.height ?? 200}
                contentOffset={{ y: -50, x: -50 }}
              />
            </DiagramWrapper>
          </div>
        </div>

        {/* Bottom row: Queue + Map */}
        <div className="grid lg:grid-cols-2 gap-4">
          <DiagramWrapper title={`${title} - Queue`} compact>
            <QueueDiagram items={queue} width={400} height={200} />
          </DiagramWrapper>

          <DiagramWrapper title={`${title} - Map`} compact>
            <MapDiagram entries={map} width={400} height={200} />
          </DiagramWrapper>
        </div>
      </div>
    );
  }

  // Original 3-column layout for fewer data structures
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 my-8">
      <div>
        <Paragraph>
          <strong>{title}</strong>
        </Paragraph>
        {description}
      </div>

      <DiagramWrapper title={`${title} - Graph`} compact>
        <GraphDiagram
          graphData={graph.data}
          nodeStates={graph.nodeStates}
          width={graph.width ?? 300}
          height={graph.height ?? 200}
          contentOffset={{ y: -50, x: -50 }}
        />
      </DiagramWrapper>

      {queue && (
        <DiagramWrapper title={`${title} - Queue`} compact>
          <QueueDiagram items={queue} width={400} height={200} />
        </DiagramWrapper>
      )}

      {map && (
        <DiagramWrapper title={`${title} - Map`} compact>
          <MapDiagram entries={map} width={400} height={200} />
        </DiagramWrapper>
      )}
    </div>
  );
}
