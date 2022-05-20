import { useEffect } from 'react';
import pkjson from '../../package.json';

const setAppVersion = (newVersion) => {
  localStorage.clear();
  localStorage.setItem('app_version', newVersion);
};

const useAppVersionChange = () => {
  useEffect(() => {
    const prevVersion = localStorage.getItem('app_version');
    if (prevVersion) {
      console.log('I have previous version');
      if (prevVersion !== pkjson.version) {
        setAppVersion(pkjson.version);
      }
    } else {
      console.log('I do not have previous version');
      setAppVersion(pkjson.version);
    }
  }, []);
};

export default useAppVersionChange;
