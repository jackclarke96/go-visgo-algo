import { Paragraph, Callout, DiagramWrapper, GraphDiagram, QueueDiagram, MapDiagram } from "@/components/AlgorithmContent";
import { QueueItemState } from "../QueueDiagram";
import { MapEntry } from "../MapDiagram";
import { NodeState } from "@/types/visualizer";
import { LinkedListDiagram, ListNode } from "../LinkedListDiagram";

interface QueueItem {
  value: string;
  state: QueueItemState;
}

export interface VisualizationStepProps {
  title: string;
  description: React.ReactNode;
  graph?: {
    data: any;
    nodeStates: Record<string, NodeState>;
    width?: number;
    height?: number;
  };
  linkedList?: ListNode[]
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
  linkedList,
  queue,
  map,
  textOnRight = false,
}: VisualizationStepProps) {
  const hasMultipleDS = queue && map;

  return (
    <div className="border border-border rounded-lg p-6 my-8 bg-accent/30 space-y-4">
      {/* Row 1: Text Description - Full Width */}
      <div>
        <Paragraph>
          <strong>{title}</strong>
        </Paragraph>
        {description}
      </div>

      {/* Row 2: Three Diagrams Side by Side */}
      <div className="grid lg:grid-cols-3 gap-4 lg:items-stretch">
        {/* Visualization (Graph) */}
        <div className="space-y-2 flex flex-col">
          <h4 className="text-sm font-semibold text-muted-foreground">Visualization</h4>
          <DiagramWrapper title={`${title} - Graph`} compact className="flex-1">
            {graph && (
            <GraphDiagram
              graphData={graph.data}
              nodeStates={graph.nodeStates}
              width={graph.width ?? 300}
              height={graph.height ?? 200}
              contentOffset={{ y: -50, x: -50 }}
            />)}
             {linkedList && (
              <LinkedListDiagram
                nodes={linkedList}
              />
             )
             
             }
          </DiagramWrapper>
        </div>

        {/* Queue */}
        {queue && (
          <div className="space-y-2 flex flex-col">
            <h4 className="text-sm font-semibold text-muted-foreground">Queue</h4>
            <DiagramWrapper title="Queue" compact className="flex-1">
              <QueueDiagram items={queue} width={400} height={200} />
            </DiagramWrapper>
          </div>
        )}

        {/* Map */}
        {map && (
          <div className="space-y-2 flex flex-col">
            <h4 className="text-sm font-semibold text-muted-foreground">Visited Map</h4>
            <DiagramWrapper title="Visited Map" compact className="flex-1">
              <MapDiagram entries={map} width={400} height={200} />
            </DiagramWrapper>
          </div>
        )}
      </div>
    </div>
  );
}
