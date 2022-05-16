import { createContext, useState, useContext } from 'react';

export const JsonContext = createContext({
  json: '',
  setJson: (json) => {},
  resetJson: () => {},
});

const JsonProvider = ({ children }) => {
  const [json, setJson] = useState(localStorage.getItem('json') || '');
  const resetJson = () => {
    setJson('');
    localStorage.removeItem('json');
  };

  return (
    <JsonContext.Provider
      value={{
        json,
        setJson: (text) => {
          localStorage.setItem('json', text);
          setJson(text);
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
