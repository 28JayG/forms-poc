import { styled, TextField, Box } from '@mui/material';

export const Form = styled('form')`
  padding-top: 40px;
`;

export const FieldGroupWrapper = styled(Box)`
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const FieldGroup = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`;

export const StyledTextField = styled(TextField)`
  margin: 10px;
  width: 350px !important;
`;

export const ButtonContainer = styled('div')`
  margin: 20px auto;
  text-align: center;
`;
