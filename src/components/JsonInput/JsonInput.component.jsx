import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { useJson } from 'providers/json.provider';

const defaultInput = { definition: '', defaultValues: '' };

const getInputValues = (formData) => ({
  definition: JSON.stringify(formData.definition, null, 4) ?? '',
  defaultValues: JSON.stringify(formData.defaultValues, null, 4) ?? '',
});

const JsonInput = () => {
  const { setJson, formData } = useJson();
  const [input, setInput] = useState(getInputValues(formData));
  const [error, setError] = useState(defaultInput);

  const navigate = useNavigate();

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

    setError(defaultInput);
    setJson(finalObject);

    navigate('/form');
  };

  const disableSubmit = !!error.definition || !!error.defaultValues;

  return (
    <Box component='form' sx={{ padding: '20px 0' }} onSubmit={handleSubmit}>
      <TextField
        required
        id='definition'
        multiline
        fullWidth
        value={input.definition}
        error={!!error.definition}
        helperText={error.definition ?? ''}
        onBlur={() => validateJson(input.definition, 'definition')}
        label='Form Definition'
        onChange={handleChange}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        required
        id='defaultValues'
        error={!!error.defaultValues}
        value={input.defaultValues}
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
