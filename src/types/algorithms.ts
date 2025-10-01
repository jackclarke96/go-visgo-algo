export interface Algorithm {
  id: string;
  title: string;
  category: string;
  problem: string;
  algorithm: string;
  solution: string;
  improvements: string;
  code?: string;
  detailedExplanations?: DetailedExplanation[];
}

export interface DetailedExplanation {
  trigger: string;
  content: string;
  section: "problem" | "algorithm" | "solution" | "improvements";
}

export interface Category {
  id: string;
  name: string;
  algorithms: Algorithm[];
}
