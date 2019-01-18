
const scheme = {
  value: undefined,
  rules: [],
  initValue: undefined,
  formItem: undefined,
  comRef: undefined,
  isMount: true,
};

export default function createDinoFormStore(){
  const store = {};
  
  return {
    set: function (field, scheme) {
      store[field] = scheme;
    },
    remove: function(field){
      delete store[field];
    },
    get: function (field) {
      if(field){
       return store[field];
      }
      return store;
    },
    update: function (storeKey, obj) {
      const scheme = store[storeKey]? store[storeKey]: {};
      store[storeKey] = {
        ...scheme,
        ...obj
      };
      return store[storeKey];
    }
  }
  
}
