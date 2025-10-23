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
      To solve this problem, we walk the list and store the values of the nodes in a hashmap. At each node, we check whether we have seen its value before.
      The tricky part is doing the rewiring.
    </Paragraph>

    <Heading>Algorithm Overview</Heading>

    <Callout type="definition">
      <Paragraph>
       To remove a node from a linked list, we essentially need to take the node prior to the current node, and link it to the node directly after the current node.
       However, in a singly linked list, there is no backwards link to the previous node. This means we need to keep the previous node in memory.
      </Paragraph>
      <Code language="go">
{`prev.next = curr.next`}
      </Code>
      <Paragraph>
        This means there is no longer any node linking to curr, so the Go Garbage Collector will remove curr from memory.
      </Paragraph>
    </Callout>

    <Heading>Deduplication Walkthrough</Heading>

    <VisualizationStep
      title="Step 1: Initialize"
      description={
        <>
          <Paragraph>
            Start with <code>prev</code> and <code>curr</code> pointers. We also initialize a hashmap to track seen values.
          </Paragraph>
          <Code language="go">
{`prev := head
curr := head.next
seen := map[int]bool{head.value: true}`}
          </Code>
        </>
      }
      linkedList={[
        { value: 1, state: "current" },
        { value: 1, state: "unvisited" },
        { value: 1, state: "unvisited" },
        { value: 4, state: "unvisited" },
        { value: 5, state: "unvisited" },
        { value: 5, state: "unvisited" },
      ]}
      map={[
        { key: "1", value: "true", state: "visited" },
      ]}
    />

    <VisualizationStep
      title="Step 2: Found Duplicate"
      description={
        <>
          <Paragraph>
            <code>curr.value</code> is 1, which we've seen. We need to remove this node by rewiring <code>prev.next</code> to <code>curr.next</code>.
          </Paragraph>
          <Code language="go">
{`if seen[curr.value] {
    prev.next = curr.next  // skip curr
} else {
    seen[curr.value] = true
    prev = curr
}
curr = curr.next`}
          </Code>
          <Callout type="warning">
            Note that we don't advance "prev" when curr is deleted. If we did, prev would become the deleted node. This is the most common place to trip up in this algorithm.
          </Callout>
        </>
      }
      linkedList={[
        { value: 1, state: "visited" },
        { value: 1, state: "current" },
        { value: 1, state: "unvisited" },
        { value: 4, state: "unvisited" },
        { value: 5, state: "unvisited" },
        { value: 5, state: "unvisited" },
      ]}
      customArrows={[
        { from: 0, to: 2, label: "prev.next", color: "primary" }
      ]}
      map={[
        { key: "1", value: "true", state: "visited" },
      ]}
    />

    <VisualizationStep
      title="Step 3: Node Removed"
      description={
        <>
          <Paragraph>
            The duplicate node is no longer referenced and will be garbage collected. Nothing to do here. Go does this automatically. We move forward.
          </Paragraph>
        </>
      }
      linkedList={[
        { value: 1, state: "visited" },
        { value: 1, state: "garbage", inMemory: false },
        { value: 1, state: "current" },
        { value: 4, state: "unvisited" },
        { value: 5, state: "unvisited" },
        { value: 5, state: "unvisited" },
      ]}
      brokenLinks={[
        { afterNode: 1 }
      ]}
      map={[
        { key: "1", value: "true", state: "visited" },
      ]}
    />

    <VisualizationStep
      title="Step 4: Another Duplicate"
      description={
        <>
          <Paragraph>
            Found another 1. Same process - rewire around it.
          </Paragraph>
        </>
      }
      linkedList={[
        { value: 1, state: "visited" },
        { value: 1, state: "garbage", inMemory: false },
        { value: 1, state: "current" },
        { value: 4, state: "unvisited" },
        { value: 5, state: "unvisited" },
        { value: 5, state: "unvisited" },
      ]}
      customArrows={[
        { from: 0, to: 3, label: "prev.next", color: "primary" }
      ]}
      map={[
        { key: "1", value: "true", state: "visited" },
      ]}
    />

    <VisualizationStep
      title="Step 5: New Value"
      description={
        <>
          <Paragraph>
            Value 4 hasn't been seen before. Add it to the map and move <code>prev</code> forward.
          </Paragraph>
        </>
      }
      linkedList={[
        { value: 1, state: "visited" },
        { value: 4, state: "current" },
        { value: 5, state: "unvisited" },
        { value: 5, state: "unvisited" },
      ]}
      map={[
        { key: "1", value: "true", state: "visited" },
        { key: "4", value: "true", state: "highlighted" },
      ]}
    />

    <VisualizationStep
      title="Step 6: Final Result"
      description={
        <>
          <Paragraph>
            Continue until the end. All duplicates are removed!
          </Paragraph>
        </>
      }
      linkedList={[
        { value: 1, state: "visited" },
        { value: 4, state: "visited" },
        { value: 5, state: "visited" },
        { value: 6, state: "visited" },
        { value: 7, state: "visited" },
      ]}
      map={[
        { key: "1", value: "true", state: "visited" },
        { key: "4", value: "true", state: "visited" },
        { key: "5", value: "true", state: "visited" },
        { key: "6", value: "true", state: "visited" },
        { key: "7", value: "true", state: "visited" },
      ]}
    />
  </>
);
