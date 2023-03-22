"use client";

import React, { useCallback, useRef } from "react";
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
} from "reactflow";
import { Container } from "@chakra-ui/react";
import styled from "@emotion/styled";
import "reactflow/dist/style.css";

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
  bottom: 0;
  right: 0;
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
  { id: "provider-4", data: { label: "Node 4" }, position: { x: 400, y: 200 } },
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

function FlowEditor({ i18n }: GeneralI18nProps) {
  const dict = i18n.dict;

  const reactFlowWrapper = useRef(null);
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

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  return (
    <StyledContainer ref={reactFlowWrapper}>
      <StyledFlowProvider>
        <ReactFlow
          nodes={nodes}
          onMove={() => {
            console.log("////");
          }}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChangeMod}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <Background />
          <Controls />
        </ReactFlow>

        <DebugBar nodes={nodes} setNodes={setNodes} />
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
