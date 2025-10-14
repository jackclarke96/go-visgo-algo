import { Paragraph, Callout, DiagramWrapper, GraphDiagram, QueueDiagram } from "@/components/AlgorithmContent";
import { QueueItemState } from "../QueueDiagram";
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
}
export function VisualizationStep({
  title,
  description,
  graph,
  queue,
}: VisualizationStepProps) {
  return (
    <div className="grid md:grid-cols-3 gap-4 my-8">
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
    </div>
  );
}
