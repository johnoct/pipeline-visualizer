// create a component that will accept text and call a function when the button is clicked
import React, { useState } from 'react';
import { Flex, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { FormControl, FormHelperText, FormLabel } from '@chakra-ui/form-control';

const PipelineControl = (props) => {
    const [text, setText] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (text) {
            props.onAdd(text);
            setText('');
        } else {
            setError(true);
        }
    };

    return (
        <FormControl onSubmit={handleSubmit}>
            <FormLabel htmlFor="pipeline-control">Pipeline Control</FormLabel>
            <Input type="text" placeholder="Enter a value" value={text} onChange={handleChange} />
            <FormHelperText>Enter a value to add to the pipeline</FormHelperText>
            <Button type="submit">Add</Button>
            {error && <p>Input cannot be empty</p>}
        </FormControl>
    );
};

export default PipelineControl;
