import { Algorithm } from "@/types/algorithms";
import { Callout, Section, List, ListItem, Paragraph, Heading, Code } from "@/components/AlgorithmContent";

// This is an example showing how to write algorithm content using components
export const exampleAlgorithm: Algorithm = {
  id: "example",
  title: "Example Algorithm",
  category: "example",
  
  problem: (
    <>
      <Paragraph>
        Given a directed graph and two nodes (S and E), determine if there exists a route from S to E.
      </Paragraph>
    </>
  ),
  
  algorithm: (
    <>
      <Paragraph>
        <strong>Breadth First Search (BFS)</strong> — Explores closer nodes first (shortest path). 
        DFS also works but may go deep unnecessarily.
      </Paragraph>
    </>
  ),
  
  solution: (
    <>
      <Section title="Things to Watch Out For:">
        <Callout type="warning">
          Must mark nodes visited → prevent infinite loops on cycles.
        </Callout>
        <Callout type="warning">
          If using slices as queues, can 'leak forward' memory.
        </Callout>
      </Section>

      <Section title="Data Structures:">
        <Callout type="definition">
          <Code language="go">
{`Graph: map[string][]string
Queue: slice or ring buffer
Visited: map[string]bool`}
          </Code>
        </Callout>
      </Section>

      <Section title="Steps:">
        <List>
          <ListItem>Add start to a queue</ListItem>
          <ListItem>While queue not empty: take first element</ListItem>
          <ListItem>If neighbor is E → return true</ListItem>
          <ListItem>Else enqueue unvisited neighbors</ListItem>
          <ListItem>If queue empties without finding → return false</ListItem>
        </List>
      </Section>
    </>
  ),
  
  improvements: (
    <>
      <Callout type="tip">
        Consider using a bidirectional BFS for improved performance on large graphs. 
        This searches from both start and end simultaneously, reducing the search space.
      </Callout>

      <Callout type="algorithm" title="Queue Implementation Recommendations">
        <Paragraph>
          <strong>For Small to Medium Graphs</strong> (hundreds / low thousands of nodes)
          → Slices win (simpler, faster, cache-friendly)
        </Paragraph>
        <Paragraph>
          <strong>For Huge Graphs</strong> (millions of nodes)
          → Ring buffer or container/list for stable O(1) operations
        </Paragraph>
      </Callout>
    </>
  ),
  
  codeBlocks: [
    {
      description: <strong>Basic BFS Implementation</strong>,
      code: `package main

func hasRoute(graph map[string][]string, start, end string) bool {
    if start == end {
        return true
    }
    
    visited := make(map[string]bool)
    queue := []string{start}
    visited[start] = true
    
    for len(queue) > 0 {
        current := queue[0]
        queue = queue[1:]
        
        for _, neighbor := range graph[current] {
            if neighbor == end {
                return true
            }
            
            if !visited[neighbor] {
                visited[neighbor] = true
                queue = append(queue, neighbor)
            }
        }
    }
    
    return false
}`,
    },
  ],
};
