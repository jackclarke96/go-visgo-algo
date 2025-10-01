export interface Algorithm {
  id: string;
  title: string;
  category: string;
  problem: string;
  algorithm: string;
  solution: string;
  improvements: string;
  code?: string;
}

export interface Category {
  id: string;
  name: string;
  algorithms: Algorithm[];
}
