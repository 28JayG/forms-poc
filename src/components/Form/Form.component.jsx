import { Button, Typography } from '@mui/material';
import DateInput from 'components/DateInput/DateInput.compnent';
import { useJson } from 'providers/json.provider';
import { useState } from 'react';

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
} from './Form.styles';

const DynamicForm = ({ extractedData }) => {
  const [formValues, setValues] = useState(getFormFields(extractedData));
  const { setJson } = useJson();

  const definition = groupedDefinition(extractedData);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log(formValues);
  };

  const handleDateChange = (evt, id, value, parentKey) => {
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
    <>
      <Form onSubmit={handleSubmit}>
        {Object.keys(definition).map((key) =>
          renderGrourpFields(definition[key], key)
        )}
        <ButtonContainer>
          <Button
            sx={{ marginRight: 2 }}
            variant='outlined'
            onClick={() => setJson(null)}
          >
            Generate New Form
          </Button>
          <Button
            sx={{ width: 120, height: 45 }}
            variant='contained'
            type='submit'
          >
            Save
          </Button>
        </ButtonContainer>
      </Form>
    </>
  );
};

export default DynamicForm;
