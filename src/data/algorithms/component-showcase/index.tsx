import { Algorithm } from "@/types/algorithms";
import { Paragraph, Heading, Section, List, ListItem } from "@/components/AlgorithmContent";
import { Problem } from "./Problem";
import { AlgorithmSection } from "./Algorithm";
import { Solution } from "./Solution";
import { Improvements } from "./Improvements";

export const alg4: Algorithm = {
  id: "component-showcase",
  title: "Component Showcase - How to Use All Components",
  category: "examples",
  
  problem: <Problem />,
  algorithm: <AlgorithmSection />,
  solution: <Solution />,
  improvements: <Improvements />,

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
