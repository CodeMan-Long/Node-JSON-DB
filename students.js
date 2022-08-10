const fs = require('fs')

module.exports = {
  put,
  get,
  remove
}

function put (_id, props, val) {
  const fileName = `data/${_id}.json`
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      let student = {}
  
      if (err) student = {}
  
      else
        try {
          student = JSON.parse(data)
        } catch (_exception) {}
  
      let obj = getProp(student, props)
      for (let key in val) {
        obj[key] = val[key]
      }
  
      const jsonData = JSON.stringify(student, null, 2)
      fs.writeFile(fileName, jsonData, (err) => {  
        if (err) resolve(false)
        return resolve(true)
      })
    })
  })
}

function get (_id, props) {
  const fileName = `data/${_id}.json`
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      let student = {}
      
      if (err) resolve(null)
      else
        try {
          student = JSON.parse(data)
        } catch (_exception) {
          resolve(null)
        }

      const obj = checkProp(student, props)
      resolve(obj)
    })
  })
}

function remove (_id, props) {
  const fileName = `data/${_id}.json`
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      let student = {}
  
      if (err) return resolve(false)
      else
        try {
          student = JSON.parse(data)
        } catch (_exception) {
          return resolve(false)
        }
  
      const success = delProp(student, props)
      if (!success) resolve(false)
  
      const jsonData = JSON.stringify(student, null, 2)
      fs.writeFile(fileName, jsonData, (err) => {
        if (err) resolve(false)
        resolve(true)
      });
    })
  })
}

function getProp (obj, prop) {
  const parts = prop.split('/')
  for (let i = 0; i < parts.length; i++) {
    let p = parts[i]
    if (obj[p] === undefined) {
      obj[p] = {}
    }
    obj = obj[p]
  }
  return obj
}

function checkProp (obj, prop) {
  const parts = prop.split('/')
  for (let i = 0; i < parts.length; i++) {
    let p = parts[i]
    if (obj[p] === undefined) {
      return null
    }
    obj = obj[p]
  }

  return obj
}

function delProp (obj, prop) {
  const parts = prop.split('/')
  let preObj = obj
  let p = ''
  for (let i = 0; i < parts.length; i++) {
    p = parts[i]
    if (obj[p] === undefined) {
      return false
    }
    preObj = obj
    obj = obj[p]
  }

  delete preObj[p]
  return true
}