const Students = require('./students')
const fs = require('fs')

module.exports = {
  getHealth,
  putValue,
  getValue,
  delValue
}

async function getHealth (req, res, next) {
  res.json({ success: true })
}

async function putValue (req, res, next) {
  const { studentId } = req.params
  const props = req.params[0]
  const body = req.body

  const success = await Students.put(studentId, props, body)

  return res.json({ success })
}

async function getValue (req, res, next) {
  const { studentId } = req.params
  const props = req.params[0]
  const error = 'Not Found'

  const student = await Students.get(studentId, props)

  if (student) return res.json({ success: true, data: student })
  return res.status(404).json({ error })
}

async function delValue (req, res, next) {
  const { studentId } = req.params
  const props = req.params[0]
  const error = 'Not Found'

  const success = await Students.remove(studentId, props)

  if (success) return res.json({ success })
  return res.status(404).json({ error })
}
