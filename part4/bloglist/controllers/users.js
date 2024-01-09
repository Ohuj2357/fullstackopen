const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if(password){
    if (password.length<3){
        return response.status(400).send({error: "password must have at least 3 characters"})
    }
  }else{
    return response.status(400).send({error: "password must exist"})
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {author: 1, title: 1, url: 1})
    response.json(users)
})

module.exports = usersRouter