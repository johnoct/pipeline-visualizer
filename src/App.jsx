import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
  { id: 'build', position: { x: 250, y: 250 }, data: { label: 'build' }, type: 'input' },
  { id: 'test', position: { x: 250, y: 450 }, data: { label: 'test' } },
  { id: 'deploy', position: { x: 250, y: 650 }, data: { label: 'deploy' } },

];
const initialEdges = [{ id: 'e1-2', source: 'build', target: 'test', type: 'smoothstep', animated: true },
{ id: 'e2-3', source: 'test', target: 'deploy', type: 'smoothstep', animated: true }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
