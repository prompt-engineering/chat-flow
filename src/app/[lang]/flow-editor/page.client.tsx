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
} from "reactflow";
import { Container } from "@chakra-ui/react";

function FlowEditor({ i18n }: GeneralI18nProps) {
  const dict = i18n.dict;

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // const { setViewport } = useReactFlow();

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({ ...params, className: "animate-pulse" }, eds));
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
    <Container width={"100vw"} height={"100vh"} ref={reactFlowWrapper}>
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
    </Container>
  );
}

export default FlowEditor;
