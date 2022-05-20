import useAppVersionChange from 'hooks/useAppVersionChange';

const ManageVersionChange = ({ children }) => {
  useAppVersionChange();
  return <div>{children}</div>;
};

export default ManageVersionChange;
