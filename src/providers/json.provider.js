import { createContext, useState, useContext } from 'react';

export const JsonContext = createContext({
  formData: '',
  setJson: (json) => {},
  resetJson: () => {},
});

const JsonProvider = ({ children }) => {
  const [formData, setJson] = useState(
    JSON.parse(localStorage.getItem('json')) || ''
  );

  const resetJson = () => {
    setJson('');
    localStorage.removeItem('json');
  };

  return (
    <JsonContext.Provider
      value={{
        formData,
        setJson: (formData) => {
          localStorage.setItem('json', JSON.stringify(formData));
          setJson(formData);
        },
        resetJson,
      }}
    >
      {children}
    </JsonContext.Provider>
  );
};

export default JsonProvider;

export const useJson = () => useContext(JsonContext);
