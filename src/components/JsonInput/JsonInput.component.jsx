import { Box, Button, TextField } from '@mui/material';
import { useJson } from 'providers/json.provider';
import { useState } from 'react';

const JsonInput = () => {
  const { setJson } = useJson();
  const [input, setInput] = useState({ definition: '', defaultValues: '' });
  const [error, setError] = useState({ definition: '', defaultValues: '' });

  const handleChange = (evt) => {
    const { value, id } = evt.target;
    if (!!error[id]) {
      setError((prev) => ({ ...prev, [id]: '' }));
    }

    setInput((prev) => ({ ...prev, [id]: value }));
  };

  const validateJson = (json, key) => {
    try {
      JSON.parse(json);
      return true;
    } catch (error) {
      setError((prev) => ({ ...prev, [key]: 'Please enter a valid JSON' }));
      return false;
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const finalObject = Object.keys(input).reduce((reducedObject, key) => {
      reducedObject[key] = JSON.parse(input[key]);
      return reducedObject;
    }, {});

    setError((prev) => ({ defaultValues: '', definition: '' }));

    setJson(finalObject);
  };

  const disableSubmit = !!error.definition || !!error.defaultValues;

  return (
    <Box component='form' sx={{ padding: '20px 0' }} onSubmit={handleSubmit}>
      <TextField
        required
        id='definition'
        multiline
        fullWidth
        error={!!error.definition}
        helperText={error.definition ?? ''}
        onBlur={() => validateJson(input.definition, 'definition')}
        label='Form Defenition'
        onChange={handleChange}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        required
        id='defaultValues'
        error={!!error.defaultValues}
        helperText={error.defaultValues ?? ''}
        onBlur={() => validateJson(input.defaultValues, 'defaultValues')}
        multiline
        fullWidth
        label='Default Values'
        onChange={handleChange}
      />
      <Button
        disabled={disableSubmit}
        variant='contained'
        sx={{ margin: 2 }}
        type='submit'
      >
        Generate Form
      </Button>
    </Box>
  );
};

export default JsonInput;
