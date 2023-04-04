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
      <Grid templateAreas={`"header header" "content content"`} gridTemplateColumns={'20% 1fr'} gridTemplateRows={'8% 1fr'} h="100vh" w="100vw" >
        <GridItem area="header" bg="white" height="100%" width="100%">
          <Flex flexDirection="row" justifyContent='center' alignItems='center' gap='2' width="100%" height="100%" >
            <Heading as='h1' >
              Pipeline Visualizer</Heading>
            <Spacer />
          </Flex>
        </GridItem>
        <GridItem area="content" bg="white" height="100%" width="100%">
          {/* <Heading as="h1">Content</Heading> */}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            proOptions={proOptions}
            fitView={true}
          >

            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </GridItem>
      </Grid>

    </Flex >
  );
}
