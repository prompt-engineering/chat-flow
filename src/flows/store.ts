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

function getInitialElements(key: string) {
  const nodes: string = localStorage.getItem(key);
  if (nodes) {
    try {
      return JSON.parse(nodes);
    } catch (e) {
      return [];
    }
  }

  return [];
}

export const NODES_STORAGE_KEY = "flowNodes";
export const EDGES_STORAGE_KEY = "flowEdges";

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useRfStore = create<RFState>((set, get) => ({
  nodes: getInitialElements(NODES_STORAGE_KEY) as Node[],
  edges: getInitialElements(EDGES_STORAGE_KEY) as Edge[],
  setEdges: (edges: Edge[]) => set({ edges }),
  setNodes: (nodes: Node[]) => set({ nodes }),
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
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the cahnges
          node.data = { ...node.data, step };
        }

        return node;
      }),
    });
  },
}));

export default useRfStore;
