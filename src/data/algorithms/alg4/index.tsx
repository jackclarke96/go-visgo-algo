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
