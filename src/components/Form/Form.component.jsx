import { Button, Typography } from '@mui/material';
import DateInput from 'components/DateInput/DateInput.compnent';
import SelectField from 'components/SelectField/SelectField.component';
import { useJson } from 'providers/json.provider';
import { useState } from 'react';

import {
  getFormFields,
  getValue,
  groupedDefinition,
  textFieldType,
  validateFields,
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
  const { resetJson } = useJson();

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
    console.log(id, name, value);

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
    const value = getValue(field, parentKey, formValues);
    const validity = validateFields(value, specs.datatype, specs.label);

    switch (specs.datatype) {
      case 'date':
        return (
          <DateInput
            key={field}
            variant='filled'
            id={field}
            label={specs.label}
            value={value}
            name={field}
            helperText={validity.text}
            error={!validity.valid}
            required={specs.required}
            parentKey={parentKey}
            onChange={handleDateChange}
          />
        );
      case 'select':
        return (
          <SelectField
            options={specs.options}
            key={field}
            id={field}
            label={specs.label}
            value={value}
            name={field}
            required={specs.required}
            onChange={(evt) => handleChange(evt, parentKey)}
          />
        );
      default:
        return (
          <StyledTextField
            type={textFieldType(specs.datatype)}
            value={value}
            label={specs.label}
            key={field}
            variant='filled'
            required={specs.required}
            helperText={validity.text}
            error={!validity.valid}
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
            onClick={resetJson}
          >
            Generate New Form
          </Button>
          <Button sx={{ width: 120 }} variant='contained' type='submit'>
            Save
          </Button>
        </ButtonContainer>
      </Form>
    </>
  );
};

export default DynamicForm;
