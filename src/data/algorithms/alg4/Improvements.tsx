import { 
  Callout, 
  Paragraph, 
  Section, 
  List, 
  ListItem, 
  Heading 
} from "@/components/AlgorithmContent";

export const Improvements = () => (
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
);
