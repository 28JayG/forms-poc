import { Box, Button, TextField } from '@mui/material';
import { useJson } from 'providers/json.provider';
import { useState } from 'react';

const JsonInput = () => {
  const { setJson } = useJson();
  const [input, setInput] = useState({ json: '', defaultValues: '' });

  const handleChange = (evt) => {
    const { value, id } = evt.target;

    setInput((prev) => ({ ...prev, [id]: JSON.parse(value) }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setJson(input);
  };

  return (
    <Box component='form' sx={{ padding: '20px 0' }} onSubmit={handleSubmit}>
      <TextField
        required
        id='json'
        multiline
        fullWidth
        label='Form Defenition'
        onChange={handleChange}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        required
        id='defaultValues'
        multiline
        fullWidth
        label='Default Values'
        onChange={handleChange}
      />
      <Button variant='contained' sx={{ margin: 2 }} type='submit'>
        Generate Form
      </Button>
    </Box>
  );
};

export default JsonInput;
