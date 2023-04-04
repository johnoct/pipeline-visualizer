import { Flex, Spacer, Box, Heading, Grid, GridItem } from '@chakra-ui/layout';
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
    <Flex width="100vw" height="100vh">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        proOptions={proOptions}
        fitView={true}
      >
        <Grid templateAreas={`"header header" "sidebar content"`} gridTemplateColumns={'100px 1fr'} gridTemplateRows={'100px 1fr'} h="100vh" >
          <GridItem area="header" bg="white" height="100%" width="100%">
            <Flex direction="row" align="center" justify="center" wrap="wrap" >
              <Box p="20" bg="white" width="100%">
                <Heading as='h2' size='2xl'>
                  Pipeline Visualizer</Heading>
              </Box>
            </Flex>
          </GridItem>
        </Grid>

        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </Flex >
  );
}
