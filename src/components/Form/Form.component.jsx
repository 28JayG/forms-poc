import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { useJson } from 'providers/json.provider';
import DateInput from 'components/DateInput/DateInput.compnent';
import SelectField from 'components/SelectField/SelectField.component';

import {
  getDefaultValues,
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

const DynamicForm = ({ extractedData, defaultValues }) => {
  const [formValues, setValues] = useState(
    getDefaultValues(extractedData, defaultValues)
  );
  const navigate = useNavigate();
  const { resetJson, setJson, formData } = useJson();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const definition = groupedDefinition(extractedData);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log(formValues);
    setJson({ ...formData, defaultValues: { extracted_data: formValues } });
    navigate('/');
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
    const value = getValue(field, parentKey, formValues);
    const validity = validateFields(value, specs.datatype, specs.label);

    switch (specs.datatype) {
      case 'date':
        console.log(specs.label);
        console.log({ field, parentKey, formValues });
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

  const retry = () => {
    resetJson();
    navigate('/');
  };

  if (!Object.keys(defaultValues).length || !Object.keys(definition).length) {
    return (
      <>
        <Typography>
          Failed to generate form, might be one of these cases:
        </Typography>
        <ul>
          <li>Default Fields JSON must be empty</li>
          <li>Definition JSON must be empty</li>
        </ul>
        <Button sx={{ marginRight: 2 }} variant='contained' onClick={retry}>
          Retry
        </Button>
      </>
    );
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {Object.keys(definition).map((key) =>
          renderGrourpFields(definition[key], key)
        )}
        <ButtonContainer>
          <Button sx={{ marginRight: 2 }} variant='outlined' onClick={retry}>
            Generate New Form
          </Button>
          {Object.keys(definition).length && (
            <Button sx={{ width: 120 }} variant='contained' type='submit'>
              Save
            </Button>
          )}
        </ButtonContainer>
      </Form>
    </>
  );
};

export default DynamicForm;
