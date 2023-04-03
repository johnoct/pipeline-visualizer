import { Flex, Spacer, Box } from '@chakra-ui/layout';
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
import PipelineControl from './components/PipelineControl';

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
  const proOptions = { hideAttribution: true };

  return (
    <Box width="100vh" height="100vh">
      {/* create a header on top*/}
      {/* <h1>Pipeline Visualizer</h1> */}
      {/* create a react flow component */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={proOptions}
        fitView
      >
        <PipelineControl />
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      {/* </Flex> */}
    </Box>
  );
}
