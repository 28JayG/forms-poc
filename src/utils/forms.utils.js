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

export const getFormFields = (extractedData) => {
  const data = Object.keys(extractedData).reduce((groupedData, key) => {
    if (!extractedData[key]?.datatype) {
      groupedData[key] = getDefaultSubFields(extractedData[key]);
    } else {
      groupedData[key] = deafultValue(extractedData[key].datatype);
    }

    return groupedData;
  }, {});

  return data;
};

export const getDefaultSubFields = (subFields) =>
  Object.keys(subFields).reduce((subObj, subKey) => {
    subObj[subKey] = deafultValue(subFields[subKey].datatype);

    return subObj;
  }, {});

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
