import { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import ReactInputMask from 'react-input-mask';

import { PAYSTUB_DEFINITION } from 'data/paystub_definition';
import {
  getFormFields,
  groupedDefinition,
  textFieldType,
} from 'utils/forms.utils';

import {
  ButtonContainer,
  FieldGroup,
  FieldGroupWrapper,
  Form,
  StyledTextField,
} from './App.styles';
import DateInput from 'components/DateInput/DateInput.compnent';

function App() {
  const [formValues, setValues] = useState(
    getFormFields(PAYSTUB_DEFINITION.extracted_data)
  );

  const definition = groupedDefinition(PAYSTUB_DEFINITION.extracted_data);
  console.log(definition)

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log(formValues);
  };

  const handleDateChange = (evt, id, value, parentKey) => {
    console.log({ id, value }, parentKey);

    if (parentKey) {
      setValues((prev) => ({
        ...prev,
        [parentKey]: { ...prev[parentKey], [id]: value },
      }));
      return;
    }

    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleChange = (evt, parentKey) => {
    const { id, name, value } = evt.target;

    if (parentKey) {
      setValues((prev) => ({
        ...prev,
        [parentKey]: { ...prev[parentKey], [id ?? name]: value },
      }));
      return;
    }

    setValues((prev) => ({ ...prev, [id ?? name]: value }));
  };

  const getTextField = (field, specs, parentKey) => {
    switch (specs.datatype) {
      case 'date':
        return (
          <DateInput
            key={field}
            variant='filled'
            id={field}
            name={field}
            required={specs.required}
            parentKey={parentKey}
            onChange={handleDateChange}
          />
        );
      default:
        return (
          <StyledTextField
            type={textFieldType(specs.datatype)}
            label={specs.label}
            key={field}
            variant='filled'
            required={specs.required}
            id={field}
            name={field}
            onChange={(evt) => handleChange(evt, parentKey)}
          />
        );
    }
  };

  const renderGrourpFields = (group, groupKey) => {
    const unnamedGroupKeyRegex = /group_[0-9]+$/;
    const showHeader = !unnamedGroupKeyRegex.test(groupKey);

    return (
      <FieldGroupWrapper key={groupKey}>
        {showHeader && (
          <Typography gutterBottom variant='h5' component='h3'>
            {groupKey}
          </Typography>
        )}
        <FieldGroup>
          {Object.keys(group).map((field) =>
            getTextField(field, group[field], showHeader ? groupKey : null)
          )}
        </FieldGroup>
      </FieldGroupWrapper>
    );
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {Object.keys(definition).map((key) =>
          renderGrourpFields(definition[key], key)
        )}
        <ButtonContainer>
          <Button
            sx={{ margin: '20px auto', width: 120, height: 45 }}
            variant='contained'
            type='submit'
          >
            Save
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default App;
