import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';

import { useJson } from 'providers/json.provider';
import useAppVersionChange from 'hooks/useAppVersionChange';

import JsonInput from 'components/JsonInput/JsonInput.component';
import DynamicForm from 'components/Form/Form.component';

function App() {
  useAppVersionChange();
  const { formData } = useJson();

  return (
    <Container>
      <Routes>
        <Route path='/' element={<JsonInput />} />

        <Route
          path='/form'
          element={
            <DynamicForm
              extractedData={formData.definition?.extracted_data ?? {}}
              defaultValues={formData.defaultValues?.extracted_data ?? {}}
            />
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
