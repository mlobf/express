const { response } = require("express");
const express = require("express");
const sequelize = require('./database')
const User = require('./User')

sequelize.sync({ force: true }).then(async () => {
  for (let x = 0;x < 10;x++) {
    const user = {
      username: `user${x}`,
      email: `user${x}@gmail.com`,
      password: `udfkjsdfksjkfjaer${x}`,
    }
    await User.create(user)
  }
})

const app = express();


app.use(express.json())

app.post('/users', async (req, res) => {
  User.create(req.body)
  res.send('user is inserted')
})

// ---------------------------------------------------------
// Add pagination
// Stoped at 16:27
app.get('/users', async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page)
  const sizeAsNumber = Number.parseInt(req.query.size)
  const { page, size } = req.query
  const users = await User.findAndCountAll({
    limit: size,
    offset: page * size
  })
  res.send(users)
})
// ---------------------------------------------------------

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

