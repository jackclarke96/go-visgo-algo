import { Category } from "@/types/algorithms";

export const algorithmCategories: Category[] = [
  {
    id: "graphs",
    name: "Graphs",
    algorithms: [
      {
        id: "route-between-nodes",
        title: "4.1 Route Between Nodes",
        category: "graphs",
        problem: "Given a directed graph and two nodes (S and E), determine if there exists a route from S to E.",
        algorithm: `**Breadth First Search (BFS)** — Explores closer nodes first (shortest path). DFS also works but may go deep unnecessarily.`,
        solution: `**Things to Watch Out For:**
- Must mark nodes visited → prevent infinite loops on cycles.
- If using slices as queues, can 'leak forward' memory.

**Data Structures:**
- Graph: map[string][]string
- Queue: slice or ring buffer
- Visited: map[string]bool

**Steps:**
1. Add start to a queue
2. While queue not empty: take first element
3. If neighbor is E → return true
4. Else enqueue unvisited neighbors
5. If queue empties without finding → return false`,
        improvements: "Consider using a bidirectional BFS for improved performance on large graphs. This searches from both start and end simultaneously, reducing the search space.",
        code: `package main

import "fmt"

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
}

func main() {
    graph := map[string][]string{
        "A": {"B", "C"},
        "B": {"D"},
        "C": {"D", "E"},
        "D": {"E"},
        "E": {},
    }
    
    fmt.Println(hasRoute(graph, "A", "E")) // true
    fmt.Println(hasRoute(graph, "B", "A")) // false
}`,
      },
      {
        id: "depth-first-search",
        title: "4.2 Depth First Search",
        category: "graphs",
        problem: "Implement depth-first search (DFS) traversal for a graph.",
        algorithm: "**Depth First Search (DFS)** — Explores as far as possible along each branch before backtracking. Can be implemented recursively or iteratively using a stack.",
        solution: `**Things to Watch Out For:**
- Must track visited nodes to avoid cycles
- Recursive approach can cause stack overflow on deep graphs
- Order of neighbor exploration affects traversal order

**Data Structures:**
- Graph: map[string][]string
- Visited: map[string]bool
- Stack (for iterative): []string

**Steps (Recursive):**
1. Mark current node as visited
2. Process current node
3. For each unvisited neighbor, recursively call DFS
4. Return when no unvisited neighbors remain`,
        improvements: "Use iterative approach with explicit stack for very deep graphs to avoid stack overflow. Consider using pre-order, in-order, or post-order traversal based on use case.",
        code: `package main

import "fmt"

func dfsRecursive(graph map[string][]string, node string, visited map[string]bool) {
    visited[node] = true
    fmt.Println(node)
    
    for _, neighbor := range graph[node] {
        if !visited[neighbor] {
            dfsRecursive(graph, neighbor, visited)
        }
    }
}

func dfsIterative(graph map[string][]string, start string) {
    visited := make(map[string]bool)
    stack := []string{start}
    
    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        
        if !visited[node] {
            visited[node] = true
            fmt.Println(node)
            
            for _, neighbor := range graph[node] {
                if !visited[neighbor] {
                    stack = append(stack, neighbor)
                }
            }
        }
    }
}`,
      },
    ],
  },
  {
    id: "trees",
    name: "Trees",
    algorithms: [
      {
        id: "binary-tree-traversal",
        title: "4.3 Binary Tree Traversal",
        category: "trees",
        problem: "Implement in-order, pre-order, and post-order traversal of a binary tree.",
        algorithm: "**Tree Traversal** — Different orders of visiting nodes: In-order (left, root, right), Pre-order (root, left, right), Post-order (left, right, root).",
        solution: `**Things to Watch Out For:**
- Nil pointer checks are essential
- Recursive approach is most intuitive
- Each traversal order serves different purposes

**Data Structures:**
- TreeNode with Value, Left, Right pointers
- Result slice to collect values

**Traversal Orders:**
- **In-order**: Left → Root → Right (gives sorted order for BST)
- **Pre-order**: Root → Left → Right (good for copying tree)
- **Post-order**: Left → Right → Root (good for deletion)`,
        improvements: "Implement iterative versions using stacks for better space efficiency in production. Morris traversal can achieve O(1) space complexity.",
        code: `package main

import "fmt"

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

// In-order: Left -> Root -> Right
func inorderTraversal(root *TreeNode) []int {
    result := []int{}
    var traverse func(*TreeNode)
    traverse = func(node *TreeNode) {
        if node == nil {
            return
        }
        traverse(node.Left)
        result = append(result, node.Val)
        traverse(node.Right)
    }
    traverse(root)
    return result
}

// Pre-order: Root -> Left -> Right
func preorderTraversal(root *TreeNode) []int {
    result := []int{}
    var traverse func(*TreeNode)
    traverse = func(node *TreeNode) {
        if node == nil {
            return
        }
        result = append(result, node.Val)
        traverse(node.Left)
        traverse(node.Right)
    }
    traverse(root)
    return result
}

// Post-order: Left -> Right -> Root
func postorderTraversal(root *TreeNode) []int {
    result := []int{}
    var traverse func(*TreeNode)
    traverse = func(node *TreeNode) {
        if node == nil {
            return
        }
        traverse(node.Left)
        traverse(node.Right)
        result = append(result, node.Val)
    }
    traverse(root)
    return result
}`,
      },
      {
        id: "validate-bst",
        title: "4.4 Validate Binary Search Tree",
        category: "trees",
        problem: "Determine if a binary tree is a valid binary search tree (BST).",
        algorithm: "**BST Validation** — For each node, all values in left subtree must be less than node's value, and all values in right subtree must be greater. Use range checking approach.",
        solution: `**Things to Watch Out For:**
- Must check against ancestor bounds, not just parent
- Need to handle integer overflow for min/max values
- Empty tree is valid BST

**Data Structures:**
- TreeNode with Val, Left, Right
- Min and Max bounds for valid range

**Steps:**
1. Start with full integer range (-∞, +∞)
2. For each node, check if value is within valid range
3. Recursively validate left child with updated max bound
4. Recursively validate right child with updated min bound
5. Return false if any violation found`,
        improvements: "Can also use in-order traversal approach - for valid BST, in-order should produce sorted sequence. This may be more intuitive.",
        code: `package main

import "math"

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func isValidBST(root *TreeNode) bool {
    return validate(root, math.MinInt64, math.MaxInt64)
}

func validate(node *TreeNode, min, max int) bool {
    if node == nil {
        return true
    }
    
    if node.Val <= min || node.Val >= max {
        return false
    }
    
    return validate(node.Left, min, node.Val) && 
           validate(node.Right, node.Val, max)
}

// Alternative: In-order traversal approach
func isValidBSTInorder(root *TreeNode) bool {
    prev := math.MinInt64
    var inorder func(*TreeNode) bool
    
    inorder = func(node *TreeNode) bool {
        if node == nil {
            return true
        }
        
        if !inorder(node.Left) {
            return false
        }
        
        if node.Val <= prev {
            return false
        }
        prev = node.Val
        
        return inorder(node.Right)
    }
    
    return inorder(root)
}`,
      },
    ],
  },
];
