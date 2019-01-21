
const schemeaa = {
  value: undefined,
  label: undefined,
  rules: [],
  initValue: undefined,
  error: undefined,
  formItem: undefined,
  comRef: undefined,
  isMount: true,
};

export default function createDinoFormStore() {
  const store = {};

  return {
    set(field, scheme) {
      store[field] = scheme;
    },
    remove(field) {
      delete store[field];
    },
    get(field) {
      if (field) {
        return store[field];
      }
      return store;
    },
    update(storeKey, obj) {
      const scheme = store[storeKey] ? store[storeKey] : {};
      store[storeKey] = {
        ...scheme,
        ...obj,
      };
      return store[storeKey];
    },
  };
}
