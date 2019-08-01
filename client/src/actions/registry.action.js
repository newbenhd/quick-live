import axios from 'axios';

export const getFullDependency = (payload, name, version, versions, parent) => {
  return dispatch => {
    dispatch(loading());
    const uri = encodeURI(`/api/registry/full?name=${name}&version=${version}`);
    axios.get(uri).then(res => {
      const data = res.data;
      dispatch(successGet(data.depn, data.payload, data.name, data.version, versions, parent));
    }).catch(e=>dispatch(fail(e)));
  }
};
export const getDependency = (packageName) => {
  return dispatch => {
    dispatch(loading());
    const uri = encodeURI(`/api/registry?name=${packageName}`);
    axios.get(uri).then(res=>{
      const data = res.data;
      dispatch(getFullDependency(data.payload, data.name, data.latestVersion, data.versions, ''));
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

export const successGet = (depn, payload, name, version, versions, parent) => ({
  type: 'SUCCESS_GET',
  data: {
    name,
    version,
    versions,
    depn,
    payload,
    parent
  }
});