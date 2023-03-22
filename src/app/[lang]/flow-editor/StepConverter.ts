import { Edge, Node } from "reactflow";
import { FlowStep } from "@/flows/types/flow-step";
import yml from "js-yaml";

/**
 * convert following data:
 * ```json
 * "nodes":[{"id":"db7a9443-04c1-4880-8331-d6a4dd9267ad","type":"stepNode","position":{"x":425,"y":157},"data":{"label":"stepNode node","step":{"name":"Demos","ask":"","response":"","hiddenExecute":false,"markdownEditor":false,"cachedResponseRegex":"","values":{},"preActions":[],"postActions":[]}},"width":320,"height":422,"selected":false,"dragging":false},{"id":"f9f5cb5f-863f-4d33-879c-c87050730be0","position":{"x":948.7994746059545,"y":283.8586690017513},"data":{"label":"Node f9f5cb5f-863f-4d33-879c-c87050730be0","step":{"name":"4324234","ask":"234234","response":"","hiddenExecute":false,"markdownEditor":false,"cachedResponseRegex":"","values":{},"preActions":[],"postActions":[]}},"type":"stepNode","width":320,"height":422,"selected":false,"dragging":false},{"id":"ac6b0896-4bc5-4516-91a3-21a1363b658c","position":{"x":1360.241194711708,"y":375.91867226821165},"data":{"label":"Node ac6b0896-4bc5-4516-91a3-21a1363b658c","step":{"name":"4324234","ask":"32423423","response":"","hiddenExecute":false,"markdownEditor":false,"cachedResponseRegex":"","values":{},"preActions":[],"postActions":[]}},"type":"stepNode","width":320,"height":422,"selected":false,"dragging":false}]
 * "edges":[{"id":"f9f5cb5f-863f-4d33-879c-c87050730be0","source":"db7a9443-04c1-4880-8331-d6a4dd9267ad","target":"f9f5cb5f-863f-4d33-879c-c87050730be0"},{"id":"ac6b0896-4bc5-4516-91a3-21a1363b658c","source":"f9f5cb5f-863f-4d33-879c-c87050730be0","target":"ac6b0896-4bc5-4516-91a3-21a1363b658c"}]
 * ```
 * 1. edges will convert to Graphviz dot format, bind to `explain` variable, flowType is `interactive`, like:
 * ```dot
 * digraph G {
 *   "db7a9443-04c1-4880-8331-d6a4dd9267ad"[flowType = "interactive"]
 *   ...
 *   "db7a9443-04c1-4880-8331-d6a4dd9267ad" -> "f9f5cb5f-863f-4d33-879c-c87050730be0"
 *   ...
 * }
 * ```
 * 2. nodes will convert to `FlowStep` type, to be yaml format, like:
 *
 * ```yaml
 * steps:
 *   - name: Demos
 *     ask: ''
 *     response: ''
 *     hiddenExecute: false
 *     markdownEditor: false
 *     cachedResponseRegex: ''
 *     values: {}
 *     preActions: []
 *     postActions: []
 * ```
 * 3. combined with `explain` variable, will generate yaml format:
 *
 * ```
 * explain: |
 * steps: []
 * ```
 */
export function flowToYaml(nodes: Node[], edges: Edge[]) {
  let explain = "digraph G {\n";
  const steps: FlowStep[] = [];

  nodes.forEach((node) => {
    const step: FlowStep = node.data.step;
    explain += `  "${node.id}"[label="${step.name}", flowType = "interactive"]\n`;
    steps.push(step);
  });

  edges.forEach((edge) => {
    explain += `  "${edge.source}" -> "${edge.target}"\n`;
  });

  explain += "}\n";

  const yamlOutput = yml.dump({ explain, steps: steps });

  return yamlOutput;
}
