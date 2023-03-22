import { create } from "zustand";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "reactflow";
import { FlowStep } from "@/flows/types/flow-step";
import { persist, createJSONStorage } from "zustand/middleware";

export type NodeData = {
  step: FlowStep;
};

export type RFState = {
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNodeStep: (nodeId: string, step: FlowStep) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useRfStore = create(
  persist(
    (set, get: any) => ({
      nodes: [],
      edges: [],
      addNode(node: Node<NodeData>) {
        set({
          nodes: [...get().nodes, node],
        });
      },
      addEdge(edge: Edge) {
        set({
          edges: [...get().edges, edge],
        });
      },
      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
        });
      },
      onEdgesChange: (changes: EdgeChange[]) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
        });
      },
      onConnect: (connection: Connection) => {
        set({
          edges: addEdge(connection, get().edges),
        });
      },
      updateNodeStep: (nodeId: string, step: FlowStep) => {
        set({
          nodes: get().nodes.map((node: any) => {
            if (node.id === nodeId) {
              // it's important to create a new object here, to inform React Flow about the cahnges
              node.data = { ...node.data, step };
            }

            return node;
          }),
        });
      },
    }),
    {
      name: "flow",
      partialize: (state: any) => ({
        nodes: state.nodes,
        edges: state.edges,
      }),
    },
  ),
);

export default useRfStore;
