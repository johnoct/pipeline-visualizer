import React, { useState } from 'react';
import PipelineVisualizer from './PipelineVisualizer';
import yaml from 'js-yaml';
import { AppBar, Box, Container, TextField, Toolbar, Typography } from '@mui/material';

function App() {
  const [pipelineYaml, setPipelineYaml] = useState('');
  const [pipeline, setPipeline] = useState(null);
  const [error, setError] = useState(null);

  const handleYamlChange = (event) => {
    setPipelineYaml(event.target.value);
    try {
      const parsedPipeline = yaml.load(event.target.value);
      if (parsedPipeline.kind === 'Pipeline') {
        setPipeline(parsedPipeline);
        setError(null);
      } else {
        setError('Invalid YAML: Not a Pipeline object');
      }
    } catch (error) {
      setError('Invalid YAML: ' + error.message);
    }
  };

  return (
    <Box>
      <AppBar position="static" sx={{ marginBottom: '2rem' }}>
        <Toolbar>
          <Typography variant="h6">Pipeline Visualizer</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <TextField
          id="pipeline-yaml"
          label="PipelineRun YAML"
          multiline
          rows={10}
          fullWidth
          value={pipelineYaml}
          onChange={handleYamlChange}
          variant="outlined"
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ marginTop: '1rem' }}>
            {error}
          </Typography>
        )}
        {pipeline && <PipelineVisualizer pipeline={pipeline} />}
      </Container>
    </Box>
  );
}

export default App;
