import { Box, Button, TextField } from '@mui/material';
import { useJson } from 'providers/json.provider';
import { useState } from 'react';

const JsonInput = () => {
  const { setJson } = useJson();
  const [input, setInput] = useState('');

  const handleChange = (evt) => {
    const { value } = evt.target;

    setInput(value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setJson(input);
  };

  return (
    <Box component='form' sx={{ padding: '20px 0' }} onSubmit={handleSubmit}>
      <TextField required multiline fullWidth onChange={handleChange} />
      <Button variant='contained' sx={{ margin: 2 }} type='submit'>
        Generate Form
      </Button>
    </Box>
  );
};

export default JsonInput;
