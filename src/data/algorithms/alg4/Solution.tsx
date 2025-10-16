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
              <div className="flex items-center gap-2 mb-2">
                <IterationCw className="h-4 w-4 text-primary flex-shrink-0" />
                <strong>Loop while queue is not empty:</strong>
              </div>
              <List>
                <ListItem>Dequeue the current node</ListItem>
                <ListItem>
                  <div className="flex items-center gap-2 mb-1">
                    <IterationCw className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    <strong>Loop for each neighbor of current node:</strong>
                  </div>
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
        The <strong>Section</strong> component groups related content together with an optional title.
      </Paragraph>

      <List>
        <ListItem>This is a <strong>List</strong> component with <strong>ListItem</strong> children</ListItem>
        <ListItem>Use it to create bulleted lists of related information</ListItem>
        <ListItem>Each ListItem gets proper spacing and styling automatically</ListItem>
        <ListItem>You can include <strong>bold</strong>, <em>italic</em>, or <code>inline code</code> in list items</ListItem>
      </List>
    </Section>

    <Section title="Code">
      <Paragraph>
        Use the <strong>Code</strong> component to display syntax-highlighted code blocks.
        Default language is Go, but you can specify any language.
      </Paragraph>

      <Code language="go">
{`func (d *directedGraph) routeBetweenNodes(startNode, endNode *nodeDirectedGraph) bool {
	if startNode == endNode {
		return true
	}
	if _, found := d.nodes[startNode.name]; !found {
		return false
	}
	if _, found := d.nodes[endNode.name]; !found {
		return false
	}
	queue := []*nodeDirectedGraph{startNode}
	visited := map[*nodeDirectedGraph]bool{startNode: true}
	for len(queue) > 0 {
		current := queue[0]
		for _, n := range current.neighbours {
			if n == endNode {
				return true
			}
			if !visited[n] {
				queue = append(queue, n)
				visited[n] = true
			}
		}
		queue = queue[1:]
	}
	return false
}
`}
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
);
