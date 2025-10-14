import { Algorithm } from "@/types/algorithms";
import { 
  Callout, 
  Section, 
  List, 
  ListItem, 
  Paragraph, 
  Heading, 
  Code,
} from "@/components/AlgorithmContent";
import { VisualizationStep } from "@/components/algorithm-content/VisualizationStepTwoOfThreeCols";

/**
 * This file demonstrates how to use all available components for creating algorithm content.
 * Copy and modify these examples to create your own algorithm entries.
 */

// 1) Reusable base graph (immutable so it can't be mutated accidentally)
type NodeState = "current" | "queued" | "visited" | "unvisited";
type GraphNode = { id: string; label: string; x: number; y: number };
type GraphEdge = { from: string; to: string };
type GraphData = { nodes: GraphNode[]; edges: GraphEdge[] };

const BASE_GRAPH: GraphData = Object.freeze({
  nodes: [
    { id: "S", label: "S", x: 100, y: 100 },
    { id: "A", label: "A", x: 200, y: 100 },
    { id: "B", label: "B", x: 300, y: 100 },
    { id: "C", label: "C", x: 100, y: 200 },
    { id: "E", label: "E", x: 200, y: 200 },
    { id: "D", label: "D", x: 300, y: 200 },
  ],
  edges: [
    { from: "S", to: "A" },
    { from: "A", to: "B" },
    { from: "S", to: "C" },
    { from: "C", to: "A" },
    { from: "A", to: "E" },
    { from: "B", to: "D" },
    { from: "E", to: "C" },
  ],
});

function makeNodeStates(
  nodes: GraphNode[],
  overrides: Partial<Record<string, NodeState>>,
  defaultState: NodeState = "unvisited"
): Record<string, NodeState> {
  const map: Record<string, NodeState> = {};
  for (const n of nodes) map[n.id] = overrides[n.id] ?? defaultState;
  return map;
}

export const alg4: Algorithm = {
  id: "component-showcase",
  title: "Component Showcase - How to Use All Components",
  category: "examples",
  
  problem: (
    <>
      <Paragraph>
        To solve this problem, we need to find the shortest path (or reachability) from a starting node <strong>S</strong> to a target node <strong>D</strong> in a graph. 
        Breadth-First Search (BFS) is an ideal choice for this kind of problem because it explores the graph level by level, guaranteeing that the first time we reach the target node, we have found the shortest path.
      </Paragraph>

      <Heading>Algorithm Overview</Heading>

      <Callout type="definition">
        <Paragraph>
          <strong>Breadth-First Search (BFS)</strong> systematically explores all nodes at the current depth before moving deeper into the graph. 
          It uses a <strong>queue</strong> to track the order in which nodes are visited, ensuring that we visit every neighbor of a node before progressing to the next level.
        </Paragraph>

      <Paragraph>
        The key idea is to:
      </Paragraph>

      <List>
        <ListItem>Start from a source node and enqueue it.</ListItem>
        <ListItem>Dequeue nodes one by one and explore all their unvisited neighbors.</ListItem>
        <ListItem>Mark neighbors as visited and enqueue them for later exploration.</ListItem>
        <ListItem>Continue until the target node is found or the queue becomes empty.</ListItem>
      </List>
      </Callout>

      <Heading>Why BFS Instead of DFS?</Heading>
      <Paragraph>
        <strong>BFS</strong> and <strong>DFS</strong> (Depth-First Search) are both fundamental graph traversal algorithms, but they serve different goals:
      </Paragraph>

      <List>
        <ListItem>
          <strong>BFS</strong> explores level by level — perfect for finding the <em>shortest path</em> in an unweighted graph or determining the minimum number of steps from one node to another.
        </ListItem>
        <ListItem>
          <strong>DFS</strong> dives deep into one path before backtracking — it’s more suitable for detecting cycles, topological sorting, or exploring all possible paths.
        </ListItem>
        <ListItem>
          <strong>BFS</strong> guarantees the shortest path in terms of edge count because it searches closest nodes first, while <strong>DFS</strong> does not.
        </ListItem>
        <ListItem>
          Because BFS uses a <em>queue</em> instead of recursion or a stack, it maintains predictable order and avoids deep recursion.
        </ListItem>
      </List>

      <Callout type="info">
        <Paragraph>
          In short, <strong>BFS</strong> is preferred when the goal is to reach the target in the fewest steps or to explore the graph evenly outward from a source.
        </Paragraph>
      </Callout>


      <Heading>BFS Algorithm Walkthrough</Heading>

      <VisualizationStep
        title="Step 1"
        description={
          <>
            <Paragraph>
              We initialise a queue to track the nodes we have visited.
              We start BFS from the source node <strong>S</strong>. It's marked as <em>current</em>.
              At each step, we add the neighbours of the node at the end of the queue. We also track which nodes have been visited to prevent cycles.
            </Paragraph>
            <Code>
{`Queue ← ["S"]
Visited ← { "S" }        // S marked visited (starting node)
Target ← "D"`}
            </Code>
          </>
        }
        graph={{
          data: BASE_GRAPH,
          nodeStates: { S: "current" },
        }}
        queue={[
          { value: "S", state: "current" },
        ]}
        map={[
          { key: "S", value: "true", state: "visited" },
        ]}
      />

      <VisualizationStep
        title="Step 2"
        description={
          <>
            <Paragraph>
              We explore the neighbours of node <strong>S</strong>. 
              Node <strong>S</strong>’s neighbors (<strong>A</strong> and <strong>C</strong>) are discovered and <em>queued</em>.
            </Paragraph>
<Code>
{`current ← dequeue(Queue)    // "S"
for each neighbor in neighbors("S"):   // "A", "C"
    if neighbour is Target:
        return true
    if neighbor not in Visited:
        enqueue(neighbor)
        add neighbor to Visited

// Visited: { "S", "A", "C" }`}
</Code>
          </>
        }
        graph={{
          data: BASE_GRAPH,
          nodeStates: { S: "current", A: "newlyQueued", C: "newlyQueued" },
        }}
        queue={[
          { value: "S", state: "current" },
          { value: "A", state: "highlighted" },
          { value: "C", state: "highlighted" },
        ]}
        map={[
          { key: "S", value: "true", state: "visited" },
          { key: "A", value: "true", state: "highlighted" },
          { key: "C", value: "true", state: "highlighted" },
        ]}
      />

      <VisualizationStep
        title="Step 3"
        description={
          <>
            <Paragraph>
              <strong>S</strong> is now visited. We process <strong>A</strong> and enqueue its unvisited neighbors.
            </Paragraph>
<Code>
{`current ← dequeue(Queue)    // "A"
for each neighbor in neighbors("A"):   // "B", "E"
    if neighbour is Target:
        return true
    if neighbor not in Visited:
        enqueue(neighbor)
        add neighbor to Visited

// Visited: { "S", "A", "C", "B", "E" }`}
</Code>

          </>
        }
        graph={{
          data: BASE_GRAPH,
          nodeStates: {
            S: "visited",
            A: "current",
            C: "queued",
            B: "queued",
            E: "newlyQueued",
          },
        }}
        queue={[
          { value: "A", state: "current" },
          { value: "C", state: "unvisited" },
          { value: "B", state: "unvisited" },
          { value: "E", state: "highlighted" },
        ]}
        map={[
          { key: "S", value: "true", state: "visited" },
          { key: "A", value: "true", state: "current" },
          { key: "C", value: "true", state: "visited" },
          { key: "B", value: "true", state: "visited" },
          { key: "E", value: "true", state: "highlighted" },
        ]}
      />

      <VisualizationStep
        title="Step 4"
        description={
          <>
          <Paragraph>
            We move on to <strong>C</strong>, marking it as current. Its neighbors are already visited or queued.
          </Paragraph>
        <Callout type="warning">
           This is important. In a directed graph, if we do not avoid retraversing visited nodes, we end up with an infinite loop.
      </Callout>
<Code>
{`current ← dequeue(Queue)    // "C"
for each neighbor in neighbors("C"):   // "A"
    if neighbour is Target:
        return true
    if neighbor not in Visited:
        enqueue(neighbor)
        add neighbor to Visited

// Visited: { "S", "A", "C", "B", "E" }   // unchanged`}
</Code>
</>
        }
        graph={{
          data: BASE_GRAPH,
          nodeStates: {
            S: "visited",
            A: "visited",
            C: "current",
            B: "queued",
            E: "queued",
          },
        }}
        queue={[
          { value: "C", state: "current" },
          { value: "B", state: "unvisited" },
          { value: "E", state: "unvisited" },
        ]}
        map={[
          { key: "S", value: "true", state: "visited" },
          { key: "A", value: "true", state: "visited" },
          { key: "C", value: "true", state: "current" },
          { key: "B", value: "true", state: "visited" },
          { key: "E", value: "true", state: "visited" },
        ]}
      />

      <VisualizationStep
        title="Step 5"
        description={
          <>
          <Paragraph>
            Finally, <strong>B</strong> is processed, discovering <strong>D</strong> as newly queued.
          </Paragraph>
<Code>
{`current ← dequeue(Queue)    // "B"
for each neighbor in neighbors("B"):   // "D"
    if neighbour is Target:
        return true         // returns true!
    if neighbor not in Visited:
        enqueue(neighbor)
        add neighbor to Visited

// Visited: { "S", "A", "C", "B", "E" } // unchanged`}
</Code>

          </>
        }
        graph={{
          data: BASE_GRAPH,
          nodeStates: {
            S: "visited",
            A: "visited",
            C: "visited",
            B: "current",
            E: "queued",
            D: "newlyQueued",
          },
        }}
        queue={[
          { value: "B", state: "current" },
          { value: "E", state: "unvisited" },
        ]}
        map={[
          { key: "S", value: "true", state: "visited" },
          { key: "A", value: "true", state: "visited" },
          { key: "C", value: "true", state: "visited" },
          { key: "B", value: "true", state: "current" },
          { key: "E", value: "true", state: "visited" },
        ]}
      />
    </>
  ),
  algorithm: (
    <>
      <Callout type="algorithm">
        This is an <strong>algorithm Callout</strong>. Use it to describe the main algorithmic approach.
        Great for explaining high-level strategy.
      </Callout>

      <Callout type="definition">
        This is a <strong>definition Callout</strong>. Use it to define technical terms, data structures,
        or show type definitions.
      </Callout>

      <Heading>This is a Heading Component</Heading>
      <Paragraph>
        Use Heading components to create subsections within your content.
      </Paragraph>
    </>
  ),
  
  solution: (
    <>
      <Section title="Using the Section Component">
        <Paragraph>
          The <strong>Section</strong> component groups related content together with an optional title.
        </Paragraph>

        <List>
          <ListItem>This is a <strong>List</strong> component with <strong>ListItem</strong> children</ListItem>
          <ListItem>Use it to create bulleted lists of related information</ListItem>
          <ListItem>Each ListItem gets proper spacing and styling automatically</ListItem>
          <ListItem>You can include <strong>bold</strong>, <em>italic</em>, or <code>inline code</code> in list items</ListItem>
        </List>
      </Section>

      <Section title="Code Examples">
        <Paragraph>
          Use the <strong>Code</strong> component to display syntax-highlighted code blocks.
          Default language is Go, but you can specify any language.
        </Paragraph>

        <Code language="go">
{`func example() {
    // This is Go code (default)
    fmt.Println("Hello, World!")
}`}
        </Code>

        <Code language="javascript">
{`function example() {
  // This is JavaScript code
  console.log("Hello, World!");
}`}
        </Code>

        <Code language="python">
{`def example():
    # This is Python code
    print("Hello, World!")`}
        </Code>
      </Section>

      <Section title="Combining Components">
        <Paragraph>
          You can combine components in creative ways to structure your content effectively.
        </Paragraph>

        <Callout type="definition">
          <Heading>Data Structures</Heading>
          <Code language="go">
{`type Node struct {
    Value int
    Left  *Node
    Right *Node
}`}
          </Code>
          <Paragraph>
            You can put code blocks inside callouts for emphasis.
          </Paragraph>
        </Callout>

        <Callout type="algorithm">
          <Heading>Algorithm Steps</Heading>
          <List>
            <ListItem>Initialize data structures</ListItem>
            <ListItem>Process input and build initial state</ListItem>
            <ListItem>Execute main algorithm loop</ListItem>
            <ListItem>Return results</ListItem>
          </List>
        </Callout>
      </Section>

      <Section>
        <Paragraph>
          Sections don't need titles - you can omit the title prop for untitled sections.
        </Paragraph>
      </Section>
    </>
  ),
  
  improvements: (
    <>
      <Callout type="tip">
        <Paragraph>
          <strong>Performance Optimization</strong>: You can nest Paragraphs, Headings, Lists,
          and Code blocks inside Callouts for rich, structured content.
        </Paragraph>
      </Callout>

      <Section title="Advanced Techniques">
        <List>
          <ListItem>Use multiple Sections to organize complex solutions</ListItem>
          <ListItem>Combine Callouts of different types to highlight different aspects</ListItem>
          <ListItem>Use Code blocks with different languages as needed</ListItem>
          <ListItem>Include inline code snippets within Paragraphs using HTML <code>&lt;code&gt;</code> tags</ListItem>
        </List>
      </Section>

      <Heading>Quick Reference</Heading>
      
      <Callout type="info">
        <Paragraph>
          <strong>Available Components:</strong>
        </Paragraph>
        <List>
          <ListItem><code>&lt;Paragraph&gt;</code> - Regular text content</ListItem>
          <ListItem><code>&lt;Heading&gt;</code> - Subsection headings</ListItem>
          <ListItem><code>&lt;Section title="..."&gt;</code> - Grouped content with optional title</ListItem>
          <ListItem><code>&lt;List&gt;</code> + <code>&lt;ListItem&gt;</code> - Bulleted lists</ListItem>
          <ListItem><code>&lt;Code language="..."&gt;</code> - Syntax-highlighted code blocks</ListItem>
          <ListItem><code>&lt;Callout type="..."&gt;</code> - Special highlighted boxes (info, warning, tip, definition, algorithm)</ListItem>
        </List>
      </Callout>
    </>
  ),

  codeBlocks: [
    {
      description: <strong>Example: Full Algorithm Structure</strong>,
      code: `import { Algorithm } from "@/types/algorithms";
import { Callout, Section, List, ListItem, Paragraph, Heading, Code } from "@/components/AlgorithmContent";

export const myAlgorithm: Algorithm = {
  id: "my-algorithm",
  title: "My Algorithm Title",
  category: "graphs",
  
  problem: (
    <>
      <Paragraph>Describe the problem here...</Paragraph>
      <Callout type="info">Add helpful context</Callout>
    </>
  ),
  
  algorithm: (
    <>
      <Callout type="algorithm">
        Explain your approach here
      </Callout>
    </>
  ),
  
  solution: (
    <>
      <Section title="Steps">
        <List>
          <ListItem>Step 1</ListItem>
          <ListItem>Step 2</ListItem>
        </List>
      </Section>
    </>
  ),
  
  improvements: (
    <>
      <Callout type="tip">Optimization ideas...</Callout>
    </>
  ),
  
  codeBlocks: [
    {
      description: <strong>Implementation</strong>,
      code: \`// Your code here\`,
    },
  ],
};`,
    },
  ],

  detailedExplanations: [
    {
      trigger: "deep dive example",
      section: "solution",
      content: (
        <>
          <Heading>Deep Dive Content</Heading>
          <Paragraph>
            Detailed explanations (triggered by clicking info buttons) can use all the same components.
          </Paragraph>
          
          <Callout type="algorithm">
            This content appears in a modal when users click the "deep dive example" trigger.
          </Callout>

          <Section title="Example Section in Modal">
            <List>
              <ListItem>All components work here too</ListItem>
              <ListItem>Use them to provide detailed explanations</ListItem>
              <ListItem>Keep main content concise, put details in deep dives</ListItem>
            </List>
          </Section>
        </>
      ),
    },
  ],
};
