import { Category } from "@/types/algorithms";
import { componentShowcase } from "./componentExamples";
import { alg4pt1 } from "./algorithms/4.1-bfs";

export const algorithmCategories: Category[] = [
  {
    id: "graphs",
    name: "Graphs",
    algorithms: [
      {
        ...alg4pt1,
        id: "route-between-nodes-2",
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
];
