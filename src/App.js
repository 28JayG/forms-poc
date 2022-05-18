import { Container } from '@mui/material';

import { useJson } from 'providers/json.provider';

import JsonInput from 'components/JsonInput/JsonInput.component';
import DynamicForm from 'components/Form/Form.component';

function App() {
  const { formData } = useJson();

  return (
    <Container>
      {!formData ? (
        <JsonInput />
      ) : (
        <DynamicForm
          extractedData={formData.json.extracted_data}
          defaultValues={formData.defaultValues}
        />
      )}
    </Container>
  );
}

export default App;
