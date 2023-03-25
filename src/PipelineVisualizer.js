import React from 'react';
import { Typography } from '@mui/material';
import DirectedGraph from './DirectedGraph';

const PipelineVisualizer = ({ pipeline }) => {
  return (
    <>
      <Typography variant="h5">{pipeline.metadata.name}</Typography>
      <DirectedGraph pipeline={pipeline} />
    </>
  );
};

export default PipelineVisualizer;
