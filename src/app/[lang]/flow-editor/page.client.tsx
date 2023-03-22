"use client";

import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlowInstance,
  ReactFlowProvider,
  useStore,
} from "reactflow";
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import StepNode from "@/flows/react-flow-nodes/StepNode";
import { OnConnectStartParams } from "@reactflow/core/dist/esm/types/general";

import "reactflow/dist/style.css";
import { shallow } from "zustand/shallow";
import useRfStore from "@/flows/store";
import { uuidv4 } from "lib0/random";
import { flowToYaml } from "@/app/[lang]/flow-editor/StepConverter";

const transformSelector = (state: any) => state.transform;

const NavbarHeight = 60;

export function DebugBar({ nodes }: { nodes: any[] }) {
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

export function Sidebar(props: { onGenerate: () => void }) {
  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <StyledSidebar>
      <Flex direction='column' justify='space-between' h='100%'>
        <Box>
          <Text>You can drag these nodes to the pane on the right.</Text>
          <Box className='dndnode' onDragStart={(event) => onDragStart(event, "stepNode")} draggable>
            Step
          </Box>
        </Box>
        <StyledBottomBox>
          <Button colorScheme='pink' onClick={props.onGenerate}>
            Generate YAML
          </Button>
        </StyledBottomBox>
      </Flex>
    </StyledSidebar>
  );
}

const StyledBottomBox = styled(Box)`
  text-align: center;
  padding: 20px;
`;

const StyledSidebar = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  height: 100vh - ${NavbarHeight}px;
  background: #fff;
  border-right: 2px solid #ddd;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);

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

const getId = () => uuidv4();

const nodeTypes = {
  stepNode: StepNode,
};

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  addNode: state.addNode,
  addEdge: state.addEdge,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

function FlowEditor({ i18n }: GeneralI18nProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  // const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(storedNodes as any);
  // const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(storedEdges as any);

  const { nodes, edges, addEdge, addNode, onNodesChange, onEdgesChange, onConnect } = useRfStore(selector, shallow);

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

      addNode(newNode);
    },
    [reactFlowInstance],
  );

  const connectingNodeId = useRef<any>();
  const onConnectStart = useCallback((_: any, { nodeId }: OnConnectStartParams) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event: any) => {
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = reactFlowWrapper.current!.getBoundingClientRect();
        const id = getId();
        const newNode: Node = {
          id,
          // we are removing the half of the node width (75) to center the new node
          position: reactFlowInstance!.project({ x: event.clientX - left - 75, y: event.clientY - top }),
          data: { label: `Node ${id}` },
          type: "stepNode",
        };

        addNode(newNode);
        addEdge({ id, source: connectingNodeId.current, target: id } as unknown as Edge);
      }
    },
    [reactFlowInstance],
  );

  const generateYaml = () => {
    const yaml = flowToYaml(nodes, edges);
    navigator.clipboard.writeText(yaml).then((r) => alert("Copied to clipboard"));
  };

  return (
    <StyledContainer ref={reactFlowWrapper}>
      <StyledFlowProvider>
        <ReactFlow
          fitView
          nodes={nodes}
          nodeTypes={nodeTypes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onInit={setReactFlowInstance}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <Background />
          <Controls />
        </ReactFlow>

        <Sidebar onGenerate={generateYaml} />
        <DebugBar nodes={nodes} />

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
  width: calc(100vw - 200px);
  height: calc(100vh - ${NavbarHeight}px);
  margin-top: ${NavbarHeight}px;
  min-width: 100%;
`;

const StyledFlowProvider = styled(ReactFlowProvider)`
  width: 100%;
  height: 100%;
`;

export default FlowEditor;
