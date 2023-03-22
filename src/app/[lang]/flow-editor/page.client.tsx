"use client";

import React, { useCallback, useRef } from "react";
import ReactFlow, { addEdge, Connection, EdgeChange, useEdgesState, useNodesState, useReactFlow } from "reactflow";

function FlowEditor({ i18n }: GeneralI18nProps) {
  const dict = i18n.dict;

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setViewport } = useReactFlow();

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
    <div className="w-full h-full" ref={ reactFlowWrapper }>
      <ReactFlow
        nodes={ nodes }
        onMove={ () => {
          console.log("////");
        }
        }
        edges={ edges }
        onNodesChange={ onNodesChange }
        onEdgesChange={ onEdgesChangeMod }
        onConnect={ onConnect }
        onDragOver={ onDragOver }
        onDrop={ onDrop }
      >
      </ReactFlow>
    </div>
  );
}

export default FlowEditor;
