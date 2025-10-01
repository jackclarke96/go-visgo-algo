import { Category } from "@/types/algorithms";
import binaryTreeImg from "@/assets/binary-tree-example.png";

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
[CALLOUT:WARNING]Must mark nodes visited → prevent infinite loops on cycles.[/CALLOUT]
[CALLOUT:WARNING]If using slices as queues, can 'leak forward' memory.[/CALLOUT]

**Data Structures:**
[CALLOUT:DEFINITION]
\`\`\`go
Graph: map[string][]string
Queue: slice or ring buffer
Visited: map[string]bool
\`\`\`
[/CALLOUT]

**Steps:**
1. Add start to a queue
2. While queue not empty: take first element
3. If neighbor is E → return true
4. Else enqueue unvisited neighbors
5. If queue empties without finding → return false`,
        improvements: `[CALLOUT:TIP]Consider using a bidirectional BFS for improved performance on large graphs. This searches from both start and end simultaneously, reducing the search space.[/CALLOUT]

[CALLOUT:ALGORITHM]
**Queue Implementation Recommendations**

**For Small to Medium Graphs** (hundreds / low thousands of nodes)
→ Slices win (simpler, faster, cache-friendly)

**For Huge Graphs** (millions of nodes)
→ Ring buffer or \`container/list\` for stable O(1) operations

**For General-Purpose Libraries**
→ Ring buffer is the most robust choice
[/CALLOUT]

**Advanced Optimization:**
Learn more about bidirectional search to understand how searching from both ends can dramatically improve performance in many scenarios.`,
        codeBlocks: [
          {
            description: "**Basic BFS Implementation**",
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
        queue = queue[1:]  // See tooltip for efficiency notes
        
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
          {
            description: "**Usage Example**",
            code: `func main() {
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
        ],
        detailedExplanations: [
          {
            trigger: "bidirectional search",
            section: "improvements",
            content: `**Understanding Bidirectional Search**

[CALLOUT:ALGORITHM]
Bidirectional search is an optimization technique that runs two simultaneous searches:
• One forward from the initial state
• One backward from the goal state
• The search terminates when the two searches meet
[/CALLOUT]

**Performance Benefits**

Lorem ipsum dolor sit amet, consectetur adipiscing elit. The key advantage is reducing the search space exponentially. Instead of exploring b^d nodes (where b is branching factor and d is depth), bidirectional search explores 2*b^(d/2) nodes.

[CALLOUT:DEFINITION]
\`\`\`
Traditional BFS: O(b^d)
Bidirectional BFS: O(2*b^(d/2))

Example with b=10, d=6:
Traditional: 1,000,000 nodes
Bidirectional: 2,000 nodes
\`\`\`
[/CALLOUT]

**Implementation Considerations**

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua:

1. **Two Queues**: Maintain separate queues for forward and backward search
2. **Two Visited Sets**: Track visited nodes from each direction separately
3. **Intersection Check**: After each step, check if the frontiers have met
4. **Path Reconstruction**: When searches meet, combine paths from both directions

[CALLOUT:WARNING]
**Trade-offs to Consider**

• Requires the graph to be bidirectional (edges work both ways)
• More complex implementation and debugging
• Path reconstruction is more involved
• Memory overhead of maintaining two search frontiers
[/CALLOUT]

**Code Structure Example**

\`\`\`go
type BiDiBFS struct {
    forwardQueue []string
    backwardQueue []string
    forwardVisited map[string]string
    backwardVisited map[string]string
}
\`\`\`

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`,
          },
          {
            trigger: "queue = queue[1:]",
            section: "solution",
            content: `**Why \`queue = queue[1:]\` is inefficient for huge queues**

[CALLOUT:DEFINITION]
**Go Slice Internal Structure**

\`\`\`go
type slice struct {
    ptr *ElementType  // pointer to first element
    len int           // number of elements in slice
    cap int           // capacity from ptr to end of backing array
}
\`\`\`

• **ptr** doesn't have to point to the start of the backing array — it can point into the middle
• **len** is how many elements you can access
• **cap** is how many elements you can append before you need a new backing array
[/CALLOUT]

**What happens when you do \`queue = queue[1:]\`:**

Initial state:
\`\`\`
[1][2][3][4]
 ^
 ptr (len=4, cap=4)
\`\`\`

After \`queue = queue[1:]\`:
\`\`\`
[1][2][3][4]
    ^
    ptr (len=3, cap=3)
\`\`\`

[CALLOUT:WARNING]
**The Memory Leak Problem**

• Element \`[1]\` is logically dropped, but **still exists in the backing array**
• As long as the slice (or any copy) exists, the garbage collector won't free the array because it's still referenced
• Memory "leaks forward" as the queue keeps walking through the array
• Capacity keeps shrinking from the front
• If you keep appending, Go might allocate new arrays again and again → reallocations
[/CALLOUT]

**What happens when capacity is exceeded:**

1. **New backing array allocated**
   • Typically 2× the old capacity (initially)
   • Then grows more slowly for larger slices
   • See: Go slice growth rule

2. **All elements copied over**
   • That's **O(n)** where n = len(old slice)
   • The slice header now points to the new array with larger cap

3. **Amortized complexity**
   • We say append is amortized **O(1)**
   • The occasional resize costs O(n)
   • But across many appends, geometric growth ensures average stays constant

[CALLOUT:TIP]
**Better Alternatives**

**For Small to Medium Graphs** (hundreds / low thousands of nodes)
→ Slices win (simpler, faster, cache-friendly)

**For Huge Graphs** (millions of nodes)
→ Ring buffer or \`container/list\` for stable O(1) operations

**For General-Purpose Graph Libraries**
→ Ring buffer queue is the most robust choice
[/CALLOUT]`,
          },
          {
            trigger: "O(V + E)",
            section: "solution",
            content: `**Why O(V + E) for BFS:**

**Vertices (V):** Each vertex visited at most once (tracked by visited map)

**Edges (E):** For each vertex, iterate over all neighbors. Across the whole run, every edge considered at most once.

**Total work:** V + E

**Why not just O(V)?**
• Dense graph: E ≈ V², so O(V+E) ≈ O(V²)
• Sparse graph: E ≈ V, so O(V+E) ≈ O(V)

The correct general statement is O(V+E) because neighbor traversal dominates in dense graphs.

**Space complexity:**
• Queue: O(V)
• Visited set: O(V)
• Total: O(V)`,
          },
        ],
      },
      {
        id: "depth-first-search",
        title: "4.2 Depth First Search",
        category: "graphs",
        problem: "Implement depth-first search (DFS) traversal for a graph.",
        algorithm: `[CALLOUT:ALGORITHM]**Depth First Search (DFS)** — Explores as far as possible along each branch before backtracking. Can be implemented recursively or iteratively using a stack.[/CALLOUT]`,
        solution: `**Things to Watch Out For:**
[CALLOUT:WARNING]Must track visited nodes to avoid cycles[/CALLOUT]
[CALLOUT:WARNING]Recursive approach can cause stack overflow on deep graphs[/CALLOUT]
- Order of neighbor exploration affects traversal order

**Data Structures:**
[CALLOUT:DEFINITION]
**Graph**: map[string][]string
**Visited**: map[string]bool
**Stack** (for iterative): []string
[/CALLOUT]

**Steps (Recursive):**
1. Mark current node as visited
2. Process current node
3. For each unvisited neighbor, recursively call DFS
4. Return when no unvisited neighbors remain`,
        improvements: `[CALLOUT:TIP]Use iterative approach with explicit stack for very deep graphs to avoid stack overflow. Consider using pre-order, in-order, or post-order traversal based on use case.[/CALLOUT]`,
        codeBlocks: [
          {
            description: "**Recursive DFS**",
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
}`,
          },
          {
            description: "**Iterative DFS** (better for deep graphs)",
            code: `func dfsIterative(graph map[string][]string, start string) {
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
        algorithm: `[CALLOUT:ALGORITHM]**Tree Traversal** — Different orders of visiting nodes: In-order (left, root, right), Pre-order (root, left, right), Post-order (left, right, root).[/CALLOUT]`,
        images: [
          {
            url: binaryTreeImg,
            alt: "Binary tree example with nodes showing values",
            caption: "Example binary tree structure with node values",
          },
        ],
        solution: `**Things to Watch Out For:**
[CALLOUT:WARNING]Nil pointer checks are essential[/CALLOUT]
- Recursive approach is most intuitive
- Each traversal order serves different purposes

**Data Structures:**
[CALLOUT:DEFINITION]
**TreeNode**: struct with Value, Left, Right pointers
**Result**: slice to collect values
[/CALLOUT]

**Traversal Orders:**
[CALLOUT:INFO]
**In-order**: Left → Root → Right (gives sorted order for BST)
**Pre-order**: Root → Left → Right (good for copying tree)
**Post-order**: Left → Right → Root (good for deletion)
[/CALLOUT]`,
        improvements: `[CALLOUT:TIP]Implement iterative versions using stacks for better space efficiency in production. Morris traversal can achieve O(1) space complexity.[/CALLOUT]`,
        codeBlocks: [
          {
            description: "**Tree Node Structure**",
            code: `package main

import "fmt"

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}`,
          },
          {
            description: "**In-order Traversal** (Left → Root → Right)",
            code: `func inorderTraversal(root *TreeNode) []int {
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
}`,
          },
          {
            description: "**Pre-order Traversal** (Root → Left → Right)",
            code: `func preorderTraversal(root *TreeNode) []int {
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
}`,
          },
          {
            description: "**Post-order Traversal** (Left → Right → Root)",
            code: `func postorderTraversal(root *TreeNode) []int {
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
        ],
      },
      {
        id: "validate-bst",
        title: "4.4 Validate Binary Search Tree",
        category: "trees",
        problem: "Determine if a binary tree is a valid binary search tree (BST).",
        algorithm: `[CALLOUT:ALGORITHM]**BST Validation** — For each node, all values in left subtree must be less than node's value, and all values in right subtree must be greater. Use range checking approach.[/CALLOUT]`,
        solution: `**Things to Watch Out For:**
[CALLOUT:WARNING]Must check against ancestor bounds, not just parent[/CALLOUT]
[CALLOUT:WARNING]Need to handle integer overflow for min/max values[/CALLOUT]
- Empty tree is valid BST

**Data Structures:**
[CALLOUT:DEFINITION]
**TreeNode**: struct with Val, Left, Right
**Min and Max bounds**: for valid range
[/CALLOUT]

**Steps:**
1. Start with full integer range (-∞, +∞)
2. For each node, check if value is within valid range
3. Recursively validate left child with updated max bound
4. Recursively validate right child with updated min bound
5. Return false if any violation found`,
        improvements: `[CALLOUT:TIP]Can also use in-order traversal approach - for valid BST, in-order should produce sorted sequence. This may be more intuitive.[/CALLOUT]`,
        codeBlocks: [
          {
            description: "**Range Checking Approach**",
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
}`,
          },
          {
            description: "**Alternative: In-order Traversal Approach**",
            code: `func isValidBSTInorder(root *TreeNode) bool {
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
      {
        id: "path-sum",
        title: "4.5 Path Sum (Paths Summing to Target)",
        category: "trees",
        problem: "Find the number of paths in a binary tree that sum to a given target value. A path can start and end at any node in the tree.",
        algorithm: `[CALLOUT:ALGORITHM]**Path Sum with Frequency Map** — Use DFS with cumulative sum tracking. At each node, check if (cumulative - target) exists in a frequency map. The key insight: if path from root to j sums to T, and path from root to i sums to S, then the subpath from j+1 to i sums to S-T.[/CALLOUT]`,
        solution: `**Things to Watch Out For:**
[CALLOUT:WARNING]Must increment frequency map BEFORE visiting children (on the way up the recursion)[/CALLOUT]
[CALLOUT:WARNING]Must decrement frequency map AFTER visiting children (on the way down - backtracking)[/CALLOUT]
- Initialize frequency map with {0: 1} to handle paths starting from root
- The frequency map tracks how many times each cumulative sum has been seen

**Data Structures:**
[CALLOUT:DEFINITION]
\`\`\`go
TreeNode: struct with value, left, right
FrequencyMap: map[int]int  // cumulative sum -> count
PathCount: int             // running total of valid paths
\`\`\`
[/CALLOUT]

**Steps:**
1. Initialize frequency map with {0: 1}
2. At each node: add current value to cumulative sum
3. Check if (cumulative - target) exists in map → add its frequency to path count
4. Increment frequency[cumulative] before recursing
5. Recurse on left and right children
6. Decrement frequency[cumulative] after recursing (backtrack)`,
        improvements: `[CALLOUT:TIP]This algorithm runs in O(n) time and O(h) space where h is the height of the tree. The frequency map never grows beyond O(h) because we backtrack and remove values as we return from recursion.[/CALLOUT]

[CALLOUT:ALGORITHM]
**Why the Frequency Map Works**

If we have a cumulative sum of 15 at node i, and we're looking for paths that sum to 8, we need to find if there's an ancestor node j where the cumulative sum was 7 (because 15 - 8 = 7).

The frequency map tells us how many such ancestor nodes exist on the current path from root to i.
[/CALLOUT]`,
        codeBlocks: [
          {
            description: "**Path Sum Implementation**",
            code: `package main

func numberOfPathsSummingToS(root *binaryTreeNode, S int) int {
    var dfs func(n *binaryTreeNode, cumulative int)
    pathCount := 0
    frequencyMap := map[int]int{0: 1}
    
    dfs = func(n *binaryTreeNode, cumulative int) {
        if n == nil {
            return
        }
        
        cumulative += n.value
        if count, ok := frequencyMap[cumulative-S]; ok {
            pathCount += count
        }

        frequencyMap[cumulative]++
        dfs(n.left, cumulative)
        dfs(n.right, cumulative)
        frequencyMap[cumulative]--
    }
    
    dfs(root, 0)
    return pathCount
}`,
          },
        ],
      },
    ],
  },
];
