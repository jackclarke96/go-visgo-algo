import { Category } from "@/types/algorithms";
import { componentShowcase } from "./componentExamples";
import { alg4pt1 } from "./algorithms/4.1-bfs";
import { alg4pt2 } from "./algorithms/4.2-minimal-tree";

export const algorithmCategories: Category[] = [
  {
    id: "graphs",
    name: "Graphs",
    algorithms: [
      {
        ...alg4pt1,
        id: "route-between-nodes",
        title: "4.1 Path from S to E",
        category: "graphs",
      },
      {
        ...componentShowcase,
        id: "example-components",
        title: "4.0 Example - Component Showcase",
        category: "graphs",
      },
    ],
  },
  {
    id: "trees",
    name: "Trees",
    algorithms: [
      {
        ...alg4pt2,
        id: "route-between-nodes-2",
        title: "4.2 Path from S to E",
        category: "graphs",
      },
      {
        ...componentShowcase,
        id: "example-components",
        title: "4.0 Example - Component Showcase",
        category: "graphs",
      },
    ],
  },
];
