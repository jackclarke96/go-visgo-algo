import { 
  Paragraph, 
  Heading, 
  Callout, 
  List, 
  ListItem,
  Code,
  ArrayDiagram,
  TreeDiagram,
  DiagramWrapper
} from "@/components/AlgorithmContent";

export const AlgorithmSection = () => (
  <>
    <Callout type="definition">
      <Paragraph>
        In a <strong>binary search tree</strong>, every node in the left subtree is smaller than the parent, and every node in the right subtree is larger.
      </Paragraph>
    </Callout>
    
    <Heading>Traditional BST Insert (Not Optimal)</Heading>
    <Paragraph>
      A traditional insertion compares each value and goes left if smaller, right if larger:
    </Paragraph>
    <Code>
{`insert(node, value):
  IF node = NULL THEN
    RETURN new TreeNode(value)
  END IF
  
  IF value < node.val THEN
    node.left ← insert(node.left, value)   // go left if smaller
  ELSE
    node.right ← insert(node.right, value) // go right if larger
  END IF
  
  RETURN node

// Inserting [2, 5, 6, 10, 13, 21, 24] in order:
// insert(root, 2)  → creates root
// insert(root, 5)  → goes right of 2
// insert(root, 6)  → goes right of 2, right of 5
// insert(root, 10) → goes right of 2, right of 5, right of 6
// ... creates a linked list with O(n) height!`}
    </Code>
    
    <Callout type="info">
      <Paragraph>
        Traditional insertion on a sorted array creates a completely unbalanced tree.
        We need a different approach to create a minimal-height tree.
      </Paragraph>
    </Callout>
    
    <Heading>Optimal Approach: Divide and Conquer</Heading>
    <Paragraph>
      To create a BST with minimal height from a sorted array, choose the middle element as the root. 
      The left half forms the left subtree, and the right half forms the right subtree. 
      Apply this process recursively to each half.
    </Paragraph>

    <Heading>Step 1: Choose the Middle as Root</Heading>
    <Paragraph>
      We create left and right pointers at the array boundaries and select the middle element as the root.
    </Paragraph>
    <Code>
{`arr ← [2, 5, 6, 10, 13, 21, 24]
leftPtr ← 0    // arr[0] = 2
rightPtr ← 6   // arr[6] = 24
midPtr ← (0 + 6) / 2 = 3   // arr[3] = 10

root ← buildTree(arr, 0, 6)  // creates node with value 10`}
    </Code>
    
    <div className="grid lg:grid-cols-2 gap-4 mt-4">
      <DiagramWrapper title="Input Array" compact>
        <ArrayDiagram
          cells={[
            { value: 2, state: "unvisited" },
            { value: 5, state: "unvisited" },
            { value: 6, state: "unvisited" },
            { value: 10, state: "current" },
            { value: 13, state: "unvisited" },
            { value: 21, state: "unvisited" },
            { value: 24, state: "unvisited" },
          ]}
          showIndices={true}
          pointers={[
            { index: 0, label: "L" },
            { index: 3, label: "M" },
            { index: 6, label: "R" },
          ]}
        />
      </DiagramWrapper>
      <DiagramWrapper title="Tree (Root: 10)" compact>
        <TreeDiagram
          root={{
            value: 10,
            state: "current",
          }}
        />
      </DiagramWrapper>
    </div>

    <Callout type="info">
      <Paragraph>
        Everything left of index 3 (values 2, 5, 6) will form the left subtree. 
        Everything right of index 3 (values 13, 21, 24) will form the right subtree.
      </Paragraph>
    </Callout>

    <Heading>Step 2A: Build Left Subtree</Heading>
    <Paragraph>
      Process the left half using indices 0-2. The middle is index 1, giving us value 5.
    </Paragraph>
    <Code>
{`leftPtr ← 0    // arr[0] = 2
rightPtr ← 2   // arr[2] = 6
midPtr ← (0 + 2) / 2 = 1   // arr[1] = 5

root.left ← buildTree(arr, 0, 2)  // creates node with value 5`}
    </Code>
    
    <div className="grid lg:grid-cols-2 gap-4 mt-4">
      <DiagramWrapper title="Array (processing left subtree)" compact>
        <ArrayDiagram
          cells={[
            { value: 2, state: "unvisited" },
            { value: 5, state: "current" },
            { value: 6, state: "unvisited" },
            { value: 10, state: "visited" },
            { value: 13, state: "unvisited" },
            { value: 21, state: "unvisited" },
            { value: 24, state: "unvisited" },
          ]}
          showIndices={true}
          pointers={[
            { index: 0, label: "L" },
            { index: 1, label: "M" },
            { index: 2, label: "R" },
          ]}
        />
      </DiagramWrapper>
      <DiagramWrapper title="Tree" compact>
        <TreeDiagram
          root={{
            value: 10,
            state: "visited",
            left: { value: 5, state: "current" },
          }}
        />
      </DiagramWrapper>
    </div>

    <Heading>Step 2B: Build Right Subtree</Heading>
    <Paragraph>
      Process the right half using indices 4-6. The middle is index 5, giving us value 21.
    </Paragraph>
    <Code>
{`leftPtr ← 4    // arr[4] = 13
rightPtr ← 6   // arr[6] = 24
midPtr ← (4 + 6) / 2 = 5   // arr[5] = 21

root.right ← buildTree(arr, 4, 6)  // creates node with value 21`}
    </Code>
    
    <div className="grid lg:grid-cols-2 gap-4 mt-4">
      <DiagramWrapper title="Array (processing right subtree)" compact>
        <ArrayDiagram
          cells={[
            { value: 2, state: "visited" },
            { value: 5, state: "visited" },
            { value: 6, state: "visited" },
            { value: 10, state: "visited" },
            { value: 13, state: "unvisited" },
            { value: 21, state: "current" },
            { value: 24, state: "unvisited" },
          ]}
          showIndices={true}
          pointers={[
            { index: 4, label: "L" },
            { index: 5, label: "M" },
            { index: 6, label: "R" },
          ]}
        />
      </DiagramWrapper>
      <DiagramWrapper title="Tree" compact>
        <TreeDiagram
          root={{
            value: 10,
            state: "visited",
            left: { value: 5, state: "visited" },
            right: { value: 21, state: "current" },
          }}
        />
      </DiagramWrapper>
    </div>

    <Heading>Step 3: Recursively Fill Remaining Nodes</Heading>
    <Paragraph>
      Continue the process for the remaining subarrays. When we reach single-element arrays, 
      all three pointers (L, M, R) point to the same index, creating a leaf node:
    </Paragraph>
    <Code>
{`// Each leaf node is created by a buildTree call:
node5.left ← buildTree(arr, 0, 0)   // creates node 2
node5.right ← buildTree(arr, 2, 2)  // creates node 6
node21.left ← buildTree(arr, 4, 4)  // creates node 13
node21.right ← buildTree(arr, 6, 6) // creates node 24`}
    </Code>
    
    <div className="grid grid-cols-2 gap-4 mt-4">
      <DiagramWrapper title="Node 2" compact>
        <ArrayDiagram
          cells={[
            { value: 2, state: "current" },
            { value: 5, state: "visited" },
            { value: 6, state: "visited" },
            { value: 10, state: "visited" },
            { value: 13, state: "visited" },
            { value: 21, state: "visited" },
            { value: 24, state: "visited" },
          ]}
          showIndices={true}
          pointers={[
            { index: 0, label: "L/M/R" },
          ]}
        />
      </DiagramWrapper>
      
      <DiagramWrapper title="Node 6" compact>
        <ArrayDiagram
          cells={[
            { value: 2, state: "visited" },
            { value: 5, state: "visited" },
            { value: 6, state: "current" },
            { value: 10, state: "visited" },
            { value: 13, state: "visited" },
            { value: 21, state: "visited" },
            { value: 24, state: "visited" },
          ]}
          showIndices={true}
          pointers={[
            { index: 2, label: "L/M/R" },
          ]}
        />
      </DiagramWrapper>
      
      <DiagramWrapper title="Node 13" compact>
        <ArrayDiagram
          cells={[
            { value: 2, state: "visited" },
            { value: 5, state: "visited" },
            { value: 6, state: "visited" },
            { value: 10, state: "visited" },
            { value: 13, state: "current" },
            { value: 21, state: "visited" },
            { value: 24, state: "visited" },
          ]}
          showIndices={true}
          pointers={[
            { index: 4, label: "L/M/R" },
          ]}
        />
      </DiagramWrapper>
      
      <DiagramWrapper title="Node 24" compact>
        <ArrayDiagram
          cells={[
            { value: 2, state: "visited" },
            { value: 5, state: "visited" },
            { value: 6, state: "visited" },
            { value: 10, state: "visited" },
            { value: 13, state: "visited" },
            { value: 21, state: "visited" },
            { value: 24, state: "current" },
          ]}
          showIndices={true}
          pointers={[
            { index: 6, label: "L/M/R" },
          ]}
        />
      </DiagramWrapper>
    </div>
    
    <Paragraph>
      When <Code>leftPtr &gt; rightPtr</Code>, we've exhausted the subarray and return nil, stopping the recursion.
    </Paragraph>
    
    <div className="grid lg:grid-cols-2 gap-4 mt-4">
      <DiagramWrapper title="Final Array" compact>
        <ArrayDiagram
          cells={[
            { value: 2, state: "visited" },
            { value: 5, state: "visited" },
            { value: 6, state: "visited" },
            { value: 10, state: "visited" },
            { value: 13, state: "visited" },
            { value: 21, state: "visited" },
            { value: 24, state: "visited" },
          ]}
          showIndices={true}
        />
      </DiagramWrapper>
      <DiagramWrapper title="Final Tree" compact>
        <TreeDiagram
          root={{
            value: 10,
            state: "visited",
            left: {
              value: 5,
              state: "visited",
              left: { value: 2, state: "visited" },
              right: { value: 6, state: "visited" },
            },
            right: {
              value: 21,
              state: "visited",
              left: { value: 13, state: "visited" },
              right: { value: 24, state: "visited" },
            },
          }}
        />
      </DiagramWrapper>
    </div>
  </>
);
