const route = require('express').Router()
const { db } = require('../db')

const container = db.container('Items')

route.get('/', async (req, res) => {
  try {
    const { resources: todos } = await container.items.readAll().fetchAll()
    res.send(todos)
  } catch (err) {
    console.error(err.message)
    res.sendStatus(err.code)
  }
})

route.get('/:id', async (req, res) => {
  try {
    const { resource: todo } = await container.item(req.params.id).read()
    res.send(todo)
  } catch (err) {
    console.error(err.message)
    res.sendStatus(err.code)
  }
})

route.post('/', async (req, res) => {
  try {
    const { resource: todo } = await container.items.create(req.body)
    res.send(todo)
  } catch (err) {
    console.error(err.message)
    res.sendStatus(err.code)
  }
})

route.put('/:id', async (req, res) => {
  try {
    const { resource: todo } = await container.item(req.params.id).read()
    const { resource: newTodo } = await container
      .item(req.params.id)
      .replace({ ...todo, ...req.body })
    res.send(newTodo)
  } catch (err) {
    console.error(err.message)
    res.sendStatus(err.code)
  }
})

route.delete('/:id', async (req, res) => {
  try {
    const { resource: todo } = await container.item(req.params.id).delete()
    res.send(todo)
  } catch (err) {
    console.error(err.message)
    res.sendStatus(err.code)
  }
})

module.exports = route
