
const scheme = {
  value: undefined,
  rules: [],
  message: undefined,
  initValue: undefined,
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
    update: function (scheme, schemeKey, schemeValue) {
      scheme[schemeKey] = schemeValue;
    }
  }
  
}
