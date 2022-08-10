const cuid = require('cuid')

const db = require('../db')

const Student = db.model('Student', {
  _id: { type: String, default: cuid },
  data: { type: db.Schema.Types.Mixed }
})

module.exports = {
  put,
  get,
  remove,
  model: Student
}

async function put(_id, props, val) {
  let student = await Student.findById(_id)

  if (student) {
    let data = {}
    if (typeof student.data === 'undefined')
      data = {}
    else
      data = student.data

    if (typeof data === 'string')
      data = {}
    
    let obj = getProp(data, props)
    for (let key in val) {
      obj[key] = val[key]
    }

    const options = { multi: true }
    json = {}
    json['data'] = data

    json = await Student.updateOne({ _id }, json, options)
    return true
  } else {
    student = new Student({ _id })
    let data = {}
    let obj = getProp(data, props)

    for (let key in val) {
      obj[key] = val[key]
    }
    student['data'] = data

    json = await student.save()
    return true
  }
}

async function get(_id, props) {
  let student = await Student.findById(_id)
  if (student) {
    const { data } = student
    const obj = checkProp(data, props)
    return obj
  } else {
    return null
  }
}

async function remove(_id, props) {
  let student = await Student.findById(_id)
  if (student) {
    const { data } = student
    const success = delProp(data, props)
    return success
  } else {
    return false
  }
}

function getProp (obj, prop) {
  const parts = prop.split('/')
  for (let i = 0; i < parts.length; i++) {
    let p = parts[i]
    if (typeof obj[p] === 'undefined') {
      if (typeof obj === 'string')
        obj = {}
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
    if (typeof obj[p] === 'undefined') {
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
    if (typeof obj[p] === 'undefined') {
      return false
    }
    preObj = obj
    obj = obj[p]
  }

  delete preObj[p]
  return true
}