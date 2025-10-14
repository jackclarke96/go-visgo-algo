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

  return (
    <div className="space-y-4 my-8">
      {/* Row 1: Text Description - Full Width */}
      <div className="border border-border rounded-lg p-4 bg-accent/30">
        <Paragraph>
          <strong>{title}</strong>
        </Paragraph>
        {description}
      </div>

      {/* Row 2: Visualization + State in Columns */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Visualization (Graph) */}
        <div className="border border-border rounded-lg p-4 bg-muted/30 space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground">Visualization</h4>
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

        {/* State (Queue + Map) */}
        <div className="border border-border rounded-lg p-4 bg-muted/30 space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground">State</h4>
          <div className="space-y-4">
            {queue && (
              <DiagramWrapper title="Queue" compact>
                <QueueDiagram items={queue} width={400} height={200} />
              </DiagramWrapper>
            )}

            {map && (
              <DiagramWrapper title="Visited Map" compact>
                <MapDiagram entries={map} width={400} height={200} />
              </DiagramWrapper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
