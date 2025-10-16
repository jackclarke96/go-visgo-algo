import { 
  Section, 
  Paragraph, 
  List, 
  ListItem, 
  Code, 
  Callout, 
  Heading 
} from "@/components/AlgorithmContent";

export const Solution = () => (
  <>
    <Section title="Algorithm Overview">
      <Callout type="algorithm">
          <Heading>Algorithm Steps</Heading>
          <List>
            <ListItem>Check input parameters to cut the algorithm short where possible:</ListItem>
              <List>
                <ListItem>If the start Node does not appear in the graph, return false</ListItem>
                <ListItem>If the end Node does not appear in the graph, return false</ListItem>
                <ListItem>If the start Node is the same as the end node, return true</ListItem>
              </List>
            <ListItem>Initialize data structures:
              <List>
              <ListItem>A queue to track nodes graph nodes to explore. Add S to the queue</ListItem>
              <ListItem>A map to track nodes we have already visited in order to avoid re-exploring explored nodes. Add S to the map</ListItem>
              </List>
            </ListItem>
            <ListItem>While the queue is not empty:
              <List>
              <ListItem>Explore neighbours, of the first element in the queue. For each neighbour:
                    <List>
                <ListItem>If the neighbour is E, we have found the target node! return true</ListItem>
                <ListItem>If the neighbour is not in the visited queue we have not explored it yet. Add it to the queue and mark it as visited</ListItem>
                <ListItem>Select the next item in the queue.</ListItem>
                </List>
              </ListItem>
              </List>
            </ListItem>
            <ListItem>If we exit the loop, we have explored all possible paths without finding the target node. There is no path to the target node. Return false.</ListItem>
          </List>
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
