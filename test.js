const tape = require('tape')
const jsonist = require('jsonist')

const port = (process.env.PORT = process.env.PORT || require('get-port-sync')())
const endpoint = `http://localhost:${port}`

const server = require('./server')

tape('health', async function (t) {
  const url = `${endpoint}/health`
  jsonist.get(url, (err, body) => {
    if (err) t.error(err)

    t.ok(body.success, 'should have successful healthcheck')
    t.end()
  })
})

tape('put value', async function (t) {
  const url = `${endpoint}/12/profile/name`
  const data = {
    'firstName' : 'John',
    'lastName': 'Doe'
  }

  jsonist.put(url, data, (err, body) => {
    if (err) t.error(err)

    t.ok(body.success, 'should be able to put the value')
    t.end()
  })
})

tape('get value correct', async function (t) {
  const url = `${endpoint}/12/profile/name/firstName`

  jsonist.get(url, (err, body) => {
    if (err) t.error(err)

    t.equal(body.data, 'John')
    t.ok(body.success, 'should be able to get the value')
    t.end()
  })
})

tape('get value incorrect', async function (t) {
  const url = `${endpoint}/12/profile/name/surName`

  jsonist.get(url, (err, body) => {
    if (err) t.error(err)

    t.equal(body.error, 'Not Found')
    t.end()
  })
})

tape('delete value correct', async function (t) {
  const url = `${endpoint}/12/profile/name/firstName`

  jsonist.delete(url, (err, body) => {
    if (err) t.error(err)

    t.ok(body.success, 'should be able to delete the value')
    t.end()
  })
})

tape('delete value incorrect', async function (t) {
  const url = `${endpoint}/12/profile/name/surName`

  jsonist.delete(url, (err, body) => {
    if (err) t.error(err)

    t.equal(body.error, 'Not Found')
    t.end()
  })
})

tape('cleanup', function (t) {
  server.close()
  t.end()
})
