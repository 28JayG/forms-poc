import ReactInputMask from 'react-input-mask';
import _omit from 'lodash/omit';

import { StyledTextField } from '../Form/Form.styles';

const DateInput = ({ ...otherProps }) => {
  const omitedProps = _omit(
    otherProps,
    'id',
    'required',
    'value',
    'minDate',
    'maxDate',
    'onChange',
    'parentKey',
    'skipValidation'
  );
  return (
    <ReactInputMask
      mask='99/99/9999'
      required={otherProps.required}
      value={otherProps.value}
      onChange={(evt) =>
        otherProps.onChange(
          evt,
          otherProps.id,
          evt.target.value,
          otherProps.parentKey
        )
      }
      maskChar=' '
    >
      {() => <StyledTextField placeholder='mm/dd/yyyy' {...omitedProps} />}
    </ReactInputMask>
  );
};

export default DateInput;
