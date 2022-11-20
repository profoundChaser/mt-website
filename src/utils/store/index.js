const setStore = function (type, key, val) {
  if (type === 'local') {
    if (Array.isArray(val) || typeof val === 'object') {
      localStorage.setItem(key, JSON.stringify(val))
    } else {
      localStorage.setItem(key, val)
    }
  } else {
    if (Array.isArray(val) || typeof val === 'object') {
      sessionStorage.setItem(key, JSON.stringify(val))
    } else {
      sessionStorage.setItem(key, val)
    }
  }
}

const getStore = function (type, key, isStringify) {
  let res
  if (type === 'local') {
    if (isStringify) {
      res = JSON.parse(localStorage.getItem(key))
    } else {
      res = localStorage.getItem(key)
    }
  } else {
    if (isStringify) {
      res = JSON.parse(sessionStorage.getItem(key))
    } else {
      res = sessionStorage.getItem(key)
    }
  }
  return res
}

const storeLength = function (type) {
  if (type === 'local') {
    return localStorage.length
  } else {
    return sessionStorage.length
  }
}

const removeStore = function (type, key) {
  if (type === 'local') {
    return localStorage.removeItem(key)
  } else {
    return sessionStorage.removeItem(key)
  }
}

const clearStore = function (type) {
  if (type === 'local') {
    return localStorage.clear()
  } else {
    return sessionStorage.clear()
  }
}

export {
    setStore,
    getStore,
    storeLength,
    removeStore,
    clearStore
}