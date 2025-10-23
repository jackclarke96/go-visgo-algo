import { cn } from "@/lib/utils";

export type ListNodeState = "unvisited" | "current" | "visited" | "highlighted";

export interface ListNode {
  value: string | number;
  state?: ListNodeState;
}

interface LinkedListDiagramProps {
  nodes: ListNode[];
  width?: number;
  height?: number;
  showLegend?: boolean;
  doublyLinked?: boolean;
}

const nodeStateColors = {
  unvisited: "fill-card stroke-border",
  current: "fill-primary stroke-primary",
  visited: "fill-accent stroke-accent-foreground",
  highlighted: "fill-info/30 stroke-info",
};

const nodeStateTextColors = {
  unvisited: "fill-foreground",
  current: "fill-primary-foreground font-bold",
  visited: "fill-accent-foreground",
  highlighted: "fill-foreground",
};

export const LinkedListDiagram = ({
  nodes,
  width = 600,
  height = 150,
  showLegend = false,
  doublyLinked = false,
}: LinkedListDiagramProps) => {
  const nodeWidth = 30;
  const nodeHeight = 30;
  const gap = 30;
  const startX = 50;
  const centerY = height / 2;

  return (
    <div className="w-full bg-card border border-border rounded-lg p-4 my-4">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <marker
            id="arrowhead-list"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="2.5"
            orient="auto"
            className="fill-border"
          >
            <polygon points="0 0, 8 2.5, 0 5" />
          </marker>
          <marker
            id="arrowhead-list-back"
            markerWidth="8"
            markerHeight="8"
            refX="1"
            refY="2.5"
            orient="auto"
            className="fill-border"
          >
            <polygon points="8 0, 0 2.5, 8 5" />
          </marker>
        </defs>

        {/* Draw arrows between nodes */}
        <g>
          {nodes.map((_, idx) => {
            if (idx === nodes.length - 1) return null;
            const x1 = startX + idx * (nodeWidth + gap) + nodeWidth;
            const x2 = startX + (idx + 1) * (nodeWidth + gap);

            return (
              <g key={`arrow-${idx}`}>
                {/* Forward arrow */}
                <line
                  x1={x1}
                  y1={centerY}
                  x2={x2}
                  y2={centerY}
                  className="stroke-border stroke-[2]"
                  markerEnd="url(#arrowhead-list)"
                />
                {/* Backward arrow for doubly linked list */}
                {doublyLinked && (
                  <line
                    x1={x2}
                    y1={centerY + 8}
                    x2={x1}
                    y2={centerY + 8}
                    className="stroke-border stroke-[1.5]"
                    markerEnd="url(#arrowhead-list-back)"
                  />
                )}
              </g>
            );
          })}
        </g>

        {/* Draw nodes */}
        <g>
          {nodes.map((node, idx) => {
            const x = startX + idx * (nodeWidth + gap);
            const state = node.state || "unvisited";
            const colorClass = nodeStateColors[state];
            const textColorClass = nodeStateTextColors[state];

            return (
              <g key={`node-${idx}`}>
                <rect
                  x={x}
                  y={centerY - nodeHeight / 2}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx="4"
                  className={cn(colorClass, "stroke-[2.5] transition-all duration-300")}
                />
                <text
                  x={x + nodeWidth / 2}
                  y={centerY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={cn(textColorClass, "text-sm font-semibold transition-all duration-300")}
                >
                  {node.value}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {showLegend && (
        <div className="flex gap-4 justify-center mt-3 text-xs flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-card border-2 border-border" />
            <span>Unvisited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-info/30 border-2 border-info" />
            <span>Highlighted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-primary border-2 border-primary" />
            <span>Current</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-accent border-2 border-accent-foreground" />
            <span>Visited</span>
          </div>
        </div>
      )}
    </div>
  );
};
