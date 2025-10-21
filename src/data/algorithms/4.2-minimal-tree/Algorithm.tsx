import { 
  Paragraph, 
  Heading, 
  Callout, 
  List, 
  ListItem,
  Code 
} from "@/components/AlgorithmContent";
import { VisualizationStep } from "@/components/algorithm-content/VisualizationStepThreeDSLayout";

const BASE_GRAPH = Object.freeze({
  nodes: [
    { id: "S", label: "S", x: 100, y: 100 },
    { id: "A", label: "A", x: 200, y: 100 },
    { id: "B", label: "B", x: 300, y: 100 },
    { id: "C", label: "C", x: 100, y: 200 },
    { id: "D", label: "D", x: 200, y: 200 },
    { id: "E", label: "E", x: 300, y: 200 },
  ],
  edges: [
    { from: "S", to: "A" },
    { from: "A", to: "B" },
    { from: "S", to: "C" },
    { from: "C", to: "A" },
    { from: "A", to: "D" },
    { from: "B", to: "E" },
    { from: "D", to: "C" },
  ],
});

export const AlgorithmSection = () => (
  <>
    <Callout type="definition">
      <Paragraph>
        In a <strong>binary search tree</strong>, every child node to the left of a parent must be smaller than the parent, and every node to the right is larger.
      </Paragraph>
    </Callout>
    <Paragraph>
      With that in mind, to create a binary search tree with minimal height from a sorted array, we should choose the middle element as the root. 
      The left half of the array will form the left subtree, and the right half will form the right subtree. 
      We then apply this process recursively to each half.
    </Paragraph>

    <Heading>Algorithm Walkthrough</Heading>

    <VisualizationStep
      title="Step 1"
      description={
        <>
          <Paragraph>
            <List>
              <ListItem>We create a "left" and a "right" pointer to the minimum and maximum element in the array.</ListItem>
              <ListItem>We select the element in the middle element as the root.</ListItem>
              <ListItem>We insert the entry at this middle index as the root.</ListItem>
            </List>
          </Paragraph>
          <Code>
{`arr ← [2, 5, 6, 10, 13, 21, 24]
leftPtr ← 0 // arr[0] = 2
rightPtr ← 6 // arr[6] = 24
middlPtr ← (6 + 0)/2 // arr[3] = 10`}
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
     <Callout type="info">
      <Paragraph>
        We want everything to the right of 10 to appear on the right hand side of the tree. 
        We want everything to the left of 10 to appear on the right hand side of the tree.
      </Paragraph>
      <Paragraph>
        We split step 2 in half. We use Step 2A to process the left hand side, and step 2B to process the Right Hand Side.
      </Paragraph>
    </Callout>
    <VisualizationStep
      title="Step 2A"
      description={
        <>
          <Paragraph>
            The middle pointer was previously at 3.
            This means the max element we want to consider is at index 2. The min index at 0.
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
for each neighbor in neighbors("A"):   // "B", "D"
    if neighbour is Target:
        return true
    if neighbor not in Visited:
        enqueue(neighbor)
        add neighbor to Visited

// Visited: { "S", "A", "C", "B", "D" }`}
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
          D: "newlyQueued",
        },
      }}
      queue={[
        { value: "A", state: "current" },
        { value: "C", state: "unvisited" },
        { value: "B", state: "unvisited" },
        { value: "D", state: "highlighted" },
      ]}
      map={[
        { key: "S", value: "true", state: "visited" },
        { key: "A", value: "true", state: "visited" },
        { key: "C", value: "true", state: "visited" },
        { key: "B", value: "true", state: "visited" },
        { key: "D", value: "true", state: "highlighted" },
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

// Visited: { "S", "A", "C", "B", "D" }   // unchanged`}
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
          D: "queued",
        },
      }}
      queue={[
        { value: "C", state: "current" },
        { value: "B", state: "unvisited" },
        { value: "D", state: "unvisited" },
      ]}
      map={[
        { key: "S", value: "true", state: "visited" },
        { key: "A", value: "true", state: "visited" },
        { key: "C", value: "true", state: "visited" },
        { key: "B", value: "true", state: "visited" },
        { key: "D", value: "true", state: "visited" },
      ]}
    />

    <VisualizationStep
      title="Step 5"
      description={
        <>
          <Paragraph>
            Finally, <strong>B</strong> is processed, discovering <strong>E</strong> as newly queued.
          </Paragraph>
          <Code>
{`current ← dequeue(Queue)    // "B"
for each neighbor in neighbors("B"):   // "E"
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
          D: "queued",
          E: "newlyQueued",
        },
      }}
      queue={[
        { value: "B", state: "current" },
        { value: "D", state: "unvisited" },
      ]}
      map={[
        { key: "S", value: "true", state: "visited" },
        { key: "A", value: "true", state: "visited" },
        { key: "C", value: "true", state: "visited" },
        { key: "B", value: "true", state: "visited" },
        { key: "D", value: "true", state: "visited" },
      ]}
    />
  </>
);
