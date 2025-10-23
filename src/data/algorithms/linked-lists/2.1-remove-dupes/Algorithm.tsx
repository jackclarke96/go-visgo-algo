import { 
  Paragraph, 
  Heading, 
  Callout, 
  List, 
  ListItem,
  Code 
} from "@/components/AlgorithmContent";
import { ListNode } from "@/components/LinkedListDiagram";
import { VisualizationStep } from "@/components/algorithm-content/VisualizationStepThreeDSLayout";

const BASE_LIST: ListNode[] = [
  { value: 1, state: "visited" },
  { value: 1, state: "visited" },
  { value: 1, state: "visited" },
  { value: 4, state: "visited" },
  { value: 5, state: "visited" },
  { value: 5, state: "visited" },
  { value: 6, state: "visited" },
  { value: 7, state: "visited" },
  { value: 7, state: "visited" },
] as const;

export const AlgorithmSection = () => (
  <>
    <Paragraph>
      To solve this problem, we walk the list and store the values of the nodes in a hashmap. At each node, we check whether we have seen it's value before.
      The tricky part is doing the rewiring.
    </Paragraph>

    <Heading>Algorithm Overview</Heading>

    <Callout type="definition">
      <Paragraph>
       To remove a node from a linked list, we essentially need to take the node prior to the current node, and link it to the node directly after the current node.
       However, in a singly linked list, there is no backwards link to the previous node. This means we need to keep the previous node in memory.
       So we need to do something like the below
        <Code language="go">
{`prev.next = curr.next`}
        </Code>

        This means there is no longer any node linking to curr, so the Go Garbage Collector will remove curr from memory
      </Paragraph>

      <Paragraph>
        The classic place to trip up is in reassignment of the previous node.
      </Paragraph>


    <List>
      <ListItem>
        <strong>BFS</strong> explores level by level — perfect for finding the <em>shortest path</em> in an unweighted graph or determining the minimum number of steps from one node to another.
      </ListItem>
      <ListItem>
        <strong>DFS</strong> dives deep into one path before backtracking — it's more suitable for detecting cycles, topological sorting, or exploring all possible paths.
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
Target ← "E"`}
          </Code>
        </>
      }
      linkedList={BASE_LIST}
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
            Node <strong>S</strong>'s neighbors (<strong>A</strong> and <strong>C</strong>) are discovered and <em>queued</em>.
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
      linkedList={BASE_LIST}
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
      linkedList={BASE_LIST}
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
      linkedList={BASE_LIST}
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
      linkedList={BASE_LIST}
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
