"use client";

import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useStore,
} from "reactflow";
import { Container, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import "reactflow/dist/style.css";
import StepNode from "@/flows/react-flow-nodes/StepNode";

const transformSelector = (state: any) => state.transform;

const NavbarHeight = 60;

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

export function Sidebar() {
  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <StyledSidebar>
      <Text>You can drag these nodes to the pane on the right.</Text>
      <div className='dndnode' onDragStart={(event) => onDragStart(event, "stepNode")} draggable>
        Step
      </div>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  height: 100vh - ${NavbarHeight}px;
  background: #fff;
  border-right: 2px solid #ddd;
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.1);

  .dndnode {
    height: 40px;
    width: 120px;
    padding: 4px;
    border-radius: 2px;
    margin: 0 auto 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;

    border: 2px solid #0041d0;
  }
`;

let id = 0;
const getId = () => `dndnode_${id++}`;

function FlowEditor({ i18n }: GeneralI18nProps) {
  const dict = i18n.dict;

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

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
      const newNode: Node = {
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

        <Sidebar />
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
  height: calc(100vh - ${NavbarHeight}px);
  margin-top: ${NavbarHeight}px;
  margin-left: 200px;
  min-width: 100%;
`;

const StyledFlowProvider = styled(ReactFlowProvider)`
  width: 100%;
  height: 100%;
`;

export default FlowEditor;
