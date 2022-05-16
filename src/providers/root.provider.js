import JsonProvider from './json.provider';

const RootProvider = ({ children }) => {
  return <JsonProvider>{children}</JsonProvider>;
};

export default RootProvider;
