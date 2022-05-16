import { Container } from '@mui/material';

import { useJson } from 'providers/json.provider';

import JsonInput from 'components/JsonInput/JsonInput.component';
import DynamicForm from 'components/Form/Form.component';

function App() {
  const { json } = useJson();

  return (
    <Container>
      {!json ? (
        <JsonInput />
      ) : (
        <DynamicForm extractedData={JSON.parse(json).extracted_data} />
      )}
    </Container>
  );
}

export default App;
