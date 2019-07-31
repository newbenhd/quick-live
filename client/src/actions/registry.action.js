import axios from 'axios';

export const getFullDependency = (thisPackage, packageName, version, versions) => {
  return dispatch => {
    dispatch(loading());
    const uri = encodeURI(`/api/registry/full?packageName=${packageName}&${version}`);
    axios.get(uri).then(res => {
      dispatch(successGet(res.data, thisPackage,packageName, version, versions));
    }).catch(e=>dispatch(fail(e)));
  }
};
export const getDependency = (packageName) => {
  return dispatch => {
    dispatch(loading());
    const uri = encodeURI(`/api/registry/full?packageName=${packageName}`);
    axios.get(uri).then(res=>{
      const thisPackage = res.data;
      const versions = res.data.versions;
      const latestVersion = res.data['dist-tags'].latest;
      const name = res.data.name;
      dispatch(getFullDependency(thisPackage, name, latestVersion, versions));
    }).catch(e=>{
      dispatch(fail(e));
    })
  }
};

export const getRegistry = (packageName, version, versions) => {
  return dispatch => {
    dispatch(loading());
    const uri = encodeURI(`/api/registry?packageName=${packageName}&version=${version}`);
    axios.get(uri).then(res=>{
      dispatch(successGet(undefined, res.data, packageName, version, versions))
    }).catch(e=>{
      dispatch(fail(e))
    })
  }
};

export const getRegistryWithPackageName = (packageName) => {
  return dispatch => {
    dispatch(loading());
    const uri = encodeURI(`/api/registry?packageName=${packageName}`);
    axios.get(uri).then(res=>{
      const versions = res.data.versions;
      const latestVersion = res.data['dist-tags'].latest;
      const name = res.data.name;
      dispatch(getRegistry(name, latestVersion, versions));
    }).catch(e=>{
      dispatch(fail(e));
    })
  }
};

export const fail = (error) => ({
  type: 'FAIL',
  error
});

export const loading = () => ({
  type: 'LOADING'
});

export const successGet = (depn, thisPackage, packageName, version, versions) => ({
  type: 'SUCCESS_GET',
  payload: {
    package: thisPackage,
    depn,
    name: packageName,
    currentVersion: version,
    versions
  }
});