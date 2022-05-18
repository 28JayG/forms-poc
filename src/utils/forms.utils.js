import isDate from 'validator/lib/isDate';

export const groupedDefinition = (extractedData) => {
  let groupIndex = 0;

  const data = Object.keys(extractedData).reduce((groupedData, key) => {
    if (extractedData[key]?.datatype) {
      groupedData[`group_${groupIndex}`] = {
        ...(groupedData[`group_${groupIndex}`] || {}),
        [key]: extractedData[key],
      };
    } else {
      groupedData[key] = extractedData[key];
      groupIndex++;
    }

    return groupedData;
  }, {});

  return data;
};

export const getDefaultValues = (extractedData, defaultValues) => {
  const data = Object.keys(extractedData).reduce((groupedData, key) => {
    if (!extractedData[key]?.datatype) {
      groupedData[key] = getDefaultSubFields(
        extractedData[key],
        key,
        defaultValues
      );
    } else {
      groupedData[key] =
        defaultValues[key] ??
        deafultValue(extractedData[key].datatype, defaultValues);
    }

    return groupedData;
  }, {});

  return data;
};

export const getDefaultSubFields = (subFields, parentKey, defaultValues) =>
  Object.keys(subFields).reduce((subObj, subKey) => {
    subObj[subKey] =
      defaultValues[parentKey][subKey] ??
      deafultValue(subFields[subKey].datatype);

    return subObj;
  }, {});

export const getValue = (key, parentKey, fields) =>
  parentKey ? fields[parentKey][key] : fields[key];

export const validateStrings = (value, label) => {
  switch (label.toLowerCase()) {
    case 'city':
    case 'state':
      const isValid = !/\d/.test(value);
      return {
        valid: isValid,
        text: isValid ? '' : `${label} should not containe a number`,
      };

    default:
      return {
        valid: true,
        text: '',
      };
  }
};

export const validateFields = (value, dataType, label) => {
  const errorText = `${label} should be an ${dataType}`;
  switch (dataType) {
    case 'integer':
      const isInteger = Number.isInteger(Number(value));
      return {
        valid: isInteger,
        text: isInteger ? '' : errorText,
      };
    case 'string':
      return validateStrings(value, label);
    case 'date':
      const isValid = value
        ? isDate(value, {
            format: 'mm/dd/yyyy',
          })
        : true;

      return {
        valid: isValid,
        text: isValid ? '' : 'Date not valid',
      };
    default:
      return {
        valid: true,
        text: '',
      };
  }
};

export const deafultValue = (dataType) => {
  switch (dataType) {
    case 'string':
    case 'date':
      return '';
    case 'integer':
      return 0;
    case 'float':
      return 0.0;
    default:
      return '';
  }
};

export const textFieldType = (dataType) => {
  switch (dataType) {
    case 'string':
      return 'text';
    case 'integer':
    case 'float':
      return 'number';
    case 'date':
      return 'text';
    default:
      return 'text';
  }
};
