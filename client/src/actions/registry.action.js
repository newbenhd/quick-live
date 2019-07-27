import axios from 'axios';

export const getRegistry = (packageName, version, versions) => {
  return dispatch => {
    dispatch(loading());
    const uri = encodeURI(`/api/registry?packageName=${packageName}&version=${version}`)
    axios.get(uri).then(res=>{
      dispatch(successGet(res.data, packageName, version, versions))
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

export const successGet = (payload, packageName, version, versions) => ({
  type: 'SUCCESS_GET',
  payload: {
    package: payload,
    name: packageName,
    currentVersion: version,
    versions
  }
});