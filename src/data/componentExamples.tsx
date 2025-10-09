import { Algorithm } from "@/types/algorithms";
import { Callout, Section, List, ListItem, Paragraph, Heading, Code } from "@/components/AlgorithmContent";

/**
 * This file demonstrates how to use all available components for creating algorithm content.
 * Copy and modify these examples to create your own algorithm entries.
 */

export const componentShowcase: Algorithm = {
  id: "component-showcase",
  title: "Component Showcase - How to Use All Components",
  category: "examples",
  
  problem: (
    <>
      <Paragraph>
        This is a <strong>Paragraph</strong> component. Use it for regular text content.
        You can include <strong>bold text</strong>, <em>italics</em>, and inline code like <code>functionName()</code>.
      </Paragraph>
      
      <Paragraph>
        Multiple paragraphs automatically get proper spacing between them.
      </Paragraph>

      <Callout type="info">
        This is an <strong>info Callout</strong>. Use it for general information or helpful notes.
      </Callout>

      <Callout type="warning">
        This is a <strong>warning Callout</strong>. Use it to highlight potential pitfalls or things to watch out for.
      </Callout>

      <Callout type="tip">
        This is a <strong>tip Callout</strong>. Use it for optimization suggestions or best practices.
      </Callout>
    </>
  ),
  
  algorithm: (
    <>
      <Callout type="algorithm">
        This is an <strong>algorithm Callout</strong>. Use it to describe the main algorithmic approach.
        Great for explaining high-level strategy.
      </Callout>

      <Callout type="definition">
        This is a <strong>definition Callout</strong>. Use it to define technical terms, data structures,
        or show type definitions.
      </Callout>

      <Heading>This is a Heading Component</Heading>
      <Paragraph>
        Use Heading components to create subsections within your content.
      </Paragraph>
    </>
  ),
  
  solution: (
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
  ),
  
  improvements: (
    <>
      <Callout type="tip">
        <Paragraph>
          <strong>Performance Optimization</strong>: You can nest Paragraphs, Headings, Lists,
          and Code blocks inside Callouts for rich, structured content.
        </Paragraph>
      </Callout>

      <Section title="Advanced Techniques">
        <List>
          <ListItem>Use multiple Sections to organize complex solutions</ListItem>
          <ListItem>Combine Callouts of different types to highlight different aspects</ListItem>
          <ListItem>Use Code blocks with different languages as needed</ListItem>
          <ListItem>Include inline code snippets within Paragraphs using HTML <code>&lt;code&gt;</code> tags</ListItem>
        </List>
      </Section>

      <Heading>Quick Reference</Heading>
      
      <Callout type="info">
        <Paragraph>
          <strong>Available Components:</strong>
        </Paragraph>
        <List>
          <ListItem><code>&lt;Paragraph&gt;</code> - Regular text content</ListItem>
          <ListItem><code>&lt;Heading&gt;</code> - Subsection headings</ListItem>
          <ListItem><code>&lt;Section title="..."&gt;</code> - Grouped content with optional title</ListItem>
          <ListItem><code>&lt;List&gt;</code> + <code>&lt;ListItem&gt;</code> - Bulleted lists</ListItem>
          <ListItem><code>&lt;Code language="..."&gt;</code> - Syntax-highlighted code blocks</ListItem>
          <ListItem><code>&lt;Callout type="..."&gt;</code> - Special highlighted boxes (info, warning, tip, definition, algorithm)</ListItem>
        </List>
      </Callout>
    </>
  ),

  codeBlocks: [
    {
      description: <strong>Example: Full Algorithm Structure</strong>,
      code: `import { Algorithm } from "@/types/algorithms";
import { Callout, Section, List, ListItem, Paragraph, Heading, Code } from "@/components/AlgorithmContent";

export const myAlgorithm: Algorithm = {
  id: "my-algorithm",
  title: "My Algorithm Title",
  category: "graphs",
  
  problem: (
    <>
      <Paragraph>Describe the problem here...</Paragraph>
      <Callout type="info">Add helpful context</Callout>
    </>
  ),
  
  algorithm: (
    <>
      <Callout type="algorithm">
        Explain your approach here
      </Callout>
    </>
  ),
  
  solution: (
    <>
      <Section title="Steps">
        <List>
          <ListItem>Step 1</ListItem>
          <ListItem>Step 2</ListItem>
        </List>
      </Section>
    </>
  ),
  
  improvements: (
    <>
      <Callout type="tip">Optimization ideas...</Callout>
    </>
  ),
  
  codeBlocks: [
    {
      description: <strong>Implementation</strong>,
      code: \`// Your code here\`,
    },
  ],
};`,
    },
  ],

  detailedExplanations: [
    {
      trigger: "deep dive example",
      section: "solution",
      content: (
        <>
          <Heading>Deep Dive Content</Heading>
          <Paragraph>
            Detailed explanations (triggered by clicking info buttons) can use all the same components.
          </Paragraph>
          
          <Callout type="algorithm">
            This content appears in a modal when users click the "deep dive example" trigger.
          </Callout>

          <Section title="Example Section in Modal">
            <List>
              <ListItem>All components work here too</ListItem>
              <ListItem>Use them to provide detailed explanations</ListItem>
              <ListItem>Keep main content concise, put details in deep dives</ListItem>
            </List>
          </Section>
        </>
      ),
    },
  ],
};
