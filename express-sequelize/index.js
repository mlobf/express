const { response } = require("express");
const express = require("express");
const sequelize = require('./database')
const User = require('./User')

sequelize.sync({ force: true }).then(() => {
  console.log('db is ready')
})

const app = express();


app.use(express.json())

app.post('/users', async (req, res) => {
  User.create(req.body)
  res.send('user is inserted')
})

app.get('/users', async (req, res) => {
  const users = await User.findAll()
  res.send(users)
})

app.get('/users/:id', async (req, res) => {
  const resquestedId = req.params.id
  const user = await User.findOne({ where: { id: resquestedId } })
  res.send(user)
})

app.put('/users/:id', async (req, res) => {
  const resquestedId = req.params.id
  const user = await User.findOne({ where: { id: resquestedId } })
  user.username = req.body.username
  await user.save()
  res.send('User updated')
})

app.delete('/users/:id', async (req, res) => {
  const resquestedId = req.params.id
  const user = await User.destroy({ where: { id: resquestedId } })
  res.send('User deleted')
})


app.listen(3000, () => {
  console.log("app is running");
});