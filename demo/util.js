
export function mapObject(obj, callback) {
  const mapedObj = {};
  for (const [key, value] of Object.entries(obj)) {
    Object.assign(mapedObj, callback(key, value, obj));
  }
  return mapedObj;
}

export async function mapObjectAsync(obj, callback) {
  const mapedObj = {};
  for (const [key, value] of Object.entries(obj)) {
    Object.assign(mapedObj, await callback(key, value, obj));
  }
  return mapedObj;
}

export function getValueFromEvent(e) {
  const { target } = e;
  return target.type === 'checkbox' ? target.checked : target.value;
}


export function isEventObj(obj) {
  if (obj === null || typeof obj !== 'object') {
    return false;
  }

  return (
    obj.type !== undefined
    && obj.target !== undefined
    && typeof obj.preventDefault === 'function'
  );
}

export const prefix = className => `dino-form-${className}`;
