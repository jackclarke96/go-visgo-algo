import { 
  Callout, 
  Paragraph,
  Section, 
} from "@/components/AlgorithmContent";

export const Improvements = () => (
  <>
    <Callout type="tip">
      The question asks us whether we can do this without creating any extra data structures in memory i.e. we cannot create the `seen` map
    </Callout>

    <Callout type="algorithm" title="Queue Implementation Recommendations">
      <Paragraph>
        To do this, upon arrival at a node, rather than add to the map and continue, we would have to traverse the entire remainder of the list and remove dupes on the way.
      </Paragraph>
      <Paragraph>
       We would then move onto the next node and repeat, meanng that we travsersed the entire remainder of the list at each step in the algorithm.
      </Paragraph>
    </Callout>
      <Section title="Time & Space Complexity">
      <Paragraph>
        <strong>Time Complexity:</strong>  At best, when every node's value is a duplicate of the first, we traverse the list once — O(n).
  At worst (no duplicates), the first node is compared against n–1 others, the second against n–2, the third against n–3, and so on, 
  until the last node. This gives us a total of 
  Σ<sub>i=1</sub><sup>n</sup> i steps, which simplifies to (n × (n + 1)) / 2 = O(n²).
      </Paragraph>
      <Paragraph>
        <strong>Space Complexity:</strong> O(1) — We use memory to store a pointer to `curr` and that's about it. O(1).
      </Paragraph>
    </Section>
  </>
);
