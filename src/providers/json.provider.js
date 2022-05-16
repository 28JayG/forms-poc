import { createContext, useState, useContext } from 'react';

export const JsonContext = createContext({
  json: '',
  setJson: (json) => {},
});

const JsonProvider = ({ children }) => {
  const [json, setJson] = useState('');

  return (
    <JsonContext.Provider value={{ json, setJson: (text) => setJson(text) }}>
      {children}
    </JsonContext.Provider>
  );
};

export default JsonProvider;

export const useJson = () => useContext(JsonContext);
