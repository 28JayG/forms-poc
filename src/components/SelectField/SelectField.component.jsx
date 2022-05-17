import { MenuItem } from '@mui/material';
import { StyledTextField } from 'components/Form/Form.styles';

const SelectField = ({ options, ...rest }) => {
  return (
    <StyledTextField variant='filled' select {...rest}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </StyledTextField>
  );
};

export default SelectField;
