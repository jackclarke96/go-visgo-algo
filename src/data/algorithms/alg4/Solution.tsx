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
              <strong>Validate inputs</strong> — Early returns for edge cases:
              <List>
                <ListItem>Return false if start node doesn't exist in graph</ListItem>
                <ListItem>Return false if end node doesn't exist in graph</ListItem>
                <ListItem>Return true if start and end are the same node</ListItem>
              </List>
            </li>
            
            <li className="text-foreground">
              <strong>Initialize data structures:</strong>
              <List>
                <ListItem><strong>Queue:</strong> Track nodes to explore (start with S)</ListItem>
                <ListItem><strong>Visited map:</strong> Avoid re-exploring nodes (mark S as visited)</ListItem>
              </List>
            </li>
            
            <li className="text-foreground">
              <div className="inline-flex items-center gap-2 -mt-0.5">
                <IterationCw className="h-4 w-4 text-primary flex-shrink-0" />
                <strong>Loop while queue is not empty:</strong>
              </div>
              <List>
                <ListItem>Dequeue the current node</ListItem>
                <ListItem>
                  <span className="inline-flex items-center gap-2 -mt-0.5">
                    <IterationCw className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    <strong>Loop for each neighbor of current node:</strong>
                  </span>
                  <List>
                    <ListItem>If neighbor is the target node E → return true</ListItem>
                    <ListItem>If neighbor hasn't been visited → add to queue and mark as visited</ListItem>
                  </List>
                </ListItem>
              </List>
            </li>
            
            <li className="text-foreground">
              <strong>Return false</strong> — No path exists (queue exhausted without finding target)
            </li>
          </ol>
        </Callout>
    </Section>
    <Section title="Choosing Data Structures">
      <Paragraph>
      We choose a slice of pointers to the graph's nodes. The pointers allow for quick comparison of neighbours to end node.
 <Code>
{`queue := []*nodeDirectedGraph{}`}
</Code>
      </Paragraph>
            <Paragraph>
      We also choose a map of pointers to the graph's nodes to `bool`. This allows for O(1) lookup of whether a node has been visited
 <Code>
{`visited := map[*nodeDirectedGraph]bool`}
</Code>
      </Paragraph>       
    </Section>

    <Section title="Code">
      <Code language="go">
{`func (d *directedGraph) routeBetweenNodes(startNode, endNode *nodeDirectedGraph) bool {

  // 1: Validate inputs — Early returns for edge cases:
	if startNode == endNode {
		return true
	}
	if _, found := d.nodes[startNode.name]; !found {
		return false
	}
	if _, found := d.nodes[endNode.name]; !found {
		return false
	}

  // 2: Initialize data structures:
	queue := []*nodeDirectedGraph{startNode}
	visited := map[*nodeDirectedGraph]bool{startNode: true}

  // 3: Loop while queue is not empty
	for len(queue) > 0 {
    // explore neighbours of first node in queue
		current := queue[0]
		for _, n := range current.neighbours {
    // if we have found the end node we are done
			if n == endNode {
				return true
			}
      // otherwise, if we have not seen the neighbour before, add it to the
      // queue
			if !visited[n] {
				queue = append(queue, n)
				visited[n] = true
			}
		}
      // dequeue the first element
		queue = queue[1:]
	}
	return false
}
`}
      </Code>

  </>
);
