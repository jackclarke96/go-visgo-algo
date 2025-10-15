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
    <Section title="Using the Section Component">
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

    <Section title="Code Examples">
      <Paragraph>
        Use the <strong>Code</strong> component to display syntax-highlighted code blocks.
        Default language is Go, but you can specify any language.
      </Paragraph>

      <Code language="go">
{`func example() {
    // This is Go code (default)
    fmt.Println("Hello, World!")
}`}
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
