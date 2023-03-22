import "@testing-library/jest-dom";
import { flowToYaml } from "@/app/[lang]/flow-editor/StepConverter";

describe("Step To Yaml", () => {
  it("simple step", () => {
    const nodes = [
      {
        id: "db7a9443-04c1-4880-8331-d6a4dd9267ad",
        type: "stepNode",
        position: { x: 425, y: 157 },
        data: {
          label: "stepNode node",
          step: {
            name: "Demos",
            ask: "",
            response: "",
            hiddenExecute: false,
            markdownEditor: false,
            cachedResponseRegex: "",
            values: {},
            preActions: [],
            postActions: [],
          },
        },
        width: 320,
        height: 422,
        selected: false,
        dragging: false,
      },
      {
        id: "f9f5cb5f-863f-4d33-879c-c87050730be0",
        position: { x: 948.7994746059545, y: 283.8586690017513 },
        data: {
          label: "Node f9f5cb5f-863f-4d33-879c-c87050730be0",
          step: {
            name: "4324234",
            ask: "234234",
            response: "",
            hiddenExecute: false,
            markdownEditor: false,
            cachedResponseRegex: "",
            values: {},
            preActions: [],
            postActions: [],
          },
        },
        type: "stepNode",
        width: 320,
        height: 422,
        selected: false,
        dragging: false,
      },
      {
        id: "ac6b0896-4bc5-4516-91a3-21a1363b658c",
        position: { x: 1360.241194711708, y: 375.91867226821165 },
        data: {
          label: "Node ac6b0896-4bc5-4516-91a3-21a1363b658c",
          step: {
            name: "4324234",
            ask: "32423423",
            response: "",
            hiddenExecute: false,
            markdownEditor: false,
            cachedResponseRegex: "",
            values: {},
            preActions: [],
            postActions: [],
          },
        },
        type: "stepNode",
        width: 320,
        height: 422,
        selected: false,
        dragging: false,
      },
    ];
    const edges = [
      {
        id: "f9f5cb5f-863f-4d33-879c-c87050730be0",
        source: "db7a9443-04c1-4880-8331-d6a4dd9267ad",
        target: "f9f5cb5f-863f-4d33-879c-c87050730be0",
      },
      {
        id: "ac6b0896-4bc5-4516-91a3-21a1363b658c",
        source: "f9f5cb5f-863f-4d33-879c-c87050730be0",
        target: "ac6b0896-4bc5-4516-91a3-21a1363b658c",
      },
    ];

    const yaml = flowToYaml(nodes, edges);
    expect(yaml).toBe(`explain: |
  digraph G {
    "db7a9443-04c1-4880-8331-d6a4dd9267ad"[label="Demos", flowType = "interactive"]
    "f9f5cb5f-863f-4d33-879c-c87050730be0"[label="4324234", flowType = "interactive"]
    "ac6b0896-4bc5-4516-91a3-21a1363b658c"[label="4324234", flowType = "interactive"]
    "db7a9443-04c1-4880-8331-d6a4dd9267ad" -> "f9f5cb5f-863f-4d33-879c-c87050730be0"
    "f9f5cb5f-863f-4d33-879c-c87050730be0" -> "ac6b0896-4bc5-4516-91a3-21a1363b658c"
  }
steps:
  - name: Demos
    ask: ''
    response: ''
    hiddenExecute: false
    markdownEditor: false
    cachedResponseRegex: ''
    values: {}
    preActions: []
    postActions: []
  - name: '4324234'
    ask: '234234'
    response: ''
    hiddenExecute: false
    markdownEditor: false
    cachedResponseRegex: ''
    values: {}
    preActions: []
    postActions: []
  - name: '4324234'
    ask: '32423423'
    response: ''
    hiddenExecute: false
    markdownEditor: false
    cachedResponseRegex: ''
    values: {}
    preActions: []
    postActions: []
`);
  });
});
