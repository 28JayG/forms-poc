import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { useJson } from 'providers/json.provider';
import { ButtonContainer } from 'components/Form/Form.styles';

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

  const clearField = (evt, fieldId) => {
    evt.preventDefault();
    const finalObject = Object.keys(input).reduce((reducedObject, key) => {
      if (key === fieldId) {
        reducedObject[key] = '';
        return reducedObject;
      }

      reducedObject[key] = input[key] ? JSON.parse(input[key]) : '';
      return reducedObject;
    }, {});

    setInput((prev) => ({ ...prev, [fieldId]: '' }));

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
      <ButtonContainer>
        <Button
          disabled={disableSubmit}
          variant='contained'
          sx={{ margin: 2 }}
          type='submit'
        >
          Generate Form
        </Button>
        <Button
          disabled={!input.definition}
          variant='outlined'
          onClick={(evt) => clearField(evt, 'definition')}
          sx={{ margin: 2 }}
          type='button'
        >
          Clear Definition
        </Button>
        <Button
          disabled={!input.defaultValues}
          variant='outlined'
          onClick={(evt) => clearField(evt, 'defaultValues')}
          sx={{ margin: 2 }}
          type='button'
        >
          Clear Default Values
        </Button>
      </ButtonContainer>
    </Box>
  );
};

export default JsonInput;
