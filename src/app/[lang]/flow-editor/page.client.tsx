"use client";

import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  Connection,
  EdgeChange,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
  useStore,
  MiniMap,
  ReactFlowInstance,
} from "reactflow";
import { Container } from "@chakra-ui/react";
import styled from "@emotion/styled";
import "reactflow/dist/style.css";
import StepNode from "@/flows/react-flow-nodes/StepNode";

const transformSelector = (state: any) => state.transform;

export function DebugBar({ nodes, setNodes }: { nodes: any[]; setNodes: any }) {
  const transform = useStore(transformSelector);

  return (
    <StyledDebugBar>
      <div>Zoom & pan transform</div>
      <div>
        [{transform[0].toFixed(2)}, {transform[1].toFixed(2)}, {transform[2].toFixed(2)}]
      </div>
      <div className='title'>Nodes</div>
      {nodes.map((node) => (
        <div key={node.id}>
          Node {node.id} - x: {node.position.x.toFixed(2)}, y: {node.position.y.toFixed(2)}
        </div>
      ))}
    </StyledDebugBar>
  );
}

const StyledDebugBar = styled.div`
  position: absolute;
  bottom: 20px;
  right: 300px;

  font-size: 12px;
`;

const initialNodes = [
  {
    id: "provider-1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
  { id: "provider-2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
  { id: "provider-3", data: { label: "Node 3" }, position: { x: 400, y: 100 } },
  { id: "provider-4", data: { label: "Node 4" }, position: { x: 400, y: 200 }, type: "stepNode" },
];

const initialEdges = [
  {
    id: "provider-e1-2",
    source: "provider-1",
    target: "provider-2",
    animated: true,
  },
  { id: "provider-e1-3", source: "provider-1", target: "provider-3" },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

function FlowEditor({ i18n }: GeneralI18nProps) {
  const dict = i18n.dict;

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection) => {
    setEdges((els) => addEdge(params, els));
  }, []);

  const onEdgesChangeMod = useCallback((s: EdgeChange[]) => {
    onEdgesChange(s);
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current!.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance!.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  return (
    <StyledContainer ref={reactFlowWrapper}>
      <StyledFlowProvider>
        <ReactFlow
          nodes={nodes}
          onMove={() => {
            console.log("////");
          }}
          nodeTypes={{
            stepNode: StepNode,
          }}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChangeMod}
          onInit={setReactFlowInstance}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <Background />
          <Controls />
        </ReactFlow>

        <DebugBar nodes={nodes} setNodes={setNodes} />

        <MiniMap
          nodeStrokeColor={(n: any) => {
            if (n.type === "input") return "#0041d0" as any;
            if (n.type === "selectorNode") return "#000" as any;
            if (n.type === "output") return "#ff0072" as any;
          }}
          nodeColor={(n) => {
            if (n.type === "selectorNode") return "#000";
            return "#fff";
          }}
        />
      </StyledFlowProvider>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)`
  width: 100vw;
  height: calc(100vh - 60px);
  margin-top: 60px;
  min-width: 100%;
`;

const StyledFlowProvider = styled(ReactFlowProvider)`
  width: 100%;
  height: 100%;
`;

export default FlowEditor;
