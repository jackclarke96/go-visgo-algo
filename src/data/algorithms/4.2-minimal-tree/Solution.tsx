import { 
  Section, 
  Paragraph, 
  List, 
  ListItem, 
  Code, 
  Callout, 
  Heading 
} from "@/components/AlgorithmContent";
import { IterationCw } from "lucide-react";

export const Solution = () => (
  <>
    <Section title="Algorithm Overview">
      <Callout type="algorithm">
        <Heading>Algorithm Steps</Heading>
        <ol className="space-y-4 list-decimal list-inside marker:font-semibold marker:text-primary">
          <li className="text-foreground">
            <strong>Base case</strong> — Handle empty or single-element arrays:
            <List>
              <ListItem>If left pointer {">"} right pointer → return nil</ListItem>
              <ListItem>This terminates recursion for subarrays</ListItem>
            </List>
          </li>
          
          <li className="text-foreground">
            <strong>Find middle element:</strong>
            <List>
              <ListItem>Calculate middle index: mid = (left + right) / 2</ListItem>
              <ListItem>Create new tree node with arr[mid] as value</ListItem>
            </List>
          </li>
          
          <li className="text-foreground">
            <div className="inline-flex items-center gap-2 -mt-0.5">
              <IterationCw className="h-4 w-4 text-primary flex-shrink-0" />
              <strong>Recursively build subtrees:</strong>
            </div>
            <List>
              <ListItem>Left subtree: recursively process arr[left...mid-1]</ListItem>
              <ListItem>Right subtree: recursively process arr[mid+1...right]</ListItem>
            </List>
          </li>
          
          <li className="text-foreground">
            <strong>Return root</strong> — The constructed BST with minimal height
          </li>
        </ol>
      </Callout>
    </Section>

    <Section title="Code">
      <Code language="go">
{`type TreeNode struct {
  Val   int
  Left  *TreeNode
  Right *TreeNode
}

func minimalTree(arr []int) *TreeNode {
  return buildTree(arr, 0, len(arr)-1)
}

func buildTree(arr []int, left, right int) *TreeNode {
  // base case: invalid range
  if left > right {
    return nil
  }
  
  // find middle element and create node
  mid := (left + right) / 2
  node := &TreeNode{Val: arr[mid]}
  
  // recursively build left and right subtrees
  node.Left = buildTree(arr, left, mid-1)
  node.Right = buildTree(arr, mid+1, right)
  
  return node
}

// Example usage with arr = [2, 5, 6, 10, 13, 21, 24]:
//
// buildTree(arr, 0, 6)           → creates node 10 (mid=3)
//   buildTree(arr, 0, 2)         → creates node 5  (mid=1)
//     buildTree(arr, 0, 0)       → creates node 2  (mid=0)
//     buildTree(arr, 2, 2)       → creates node 6  (mid=2)
//   buildTree(arr, 4, 6)         → creates node 21 (mid=5)
//     buildTree(arr, 4, 4)       → creates node 13 (mid=4)
//     buildTree(arr, 6, 6)       → creates node 24 (mid=6)`}
      </Code>
    </Section>

    <Section title="Time & Space Complexity">
      <Paragraph>
        <strong>Time Complexity:</strong> O(n) — We visit each element exactly once to create a node
      </Paragraph>
      <Paragraph>
        <strong>Space Complexity:</strong> O(log n) — The recursion stack depth equals the tree height, which is log n for a balanced tree
      </Paragraph>
    </Section>
  </>
);
