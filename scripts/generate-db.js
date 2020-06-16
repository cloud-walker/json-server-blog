const faker = require('faker')
const fs = require('fs')
const util = require('util')
const path = require('path')

faker.seed(20)

const writeFile = util.promisify(fs.writeFile)

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

const createPost = () => {
  const id = faker.random.uuid()
  const title = capitalize(faker.random.words(3))
  const image = `https://source.unsplash.com/random/1920x1080?id=${id}`
  const content = faker.lorem.paragraphs(10)

  return {
    id,
    title,
    image,
    content,
  }
}

const createUser = () => {
  const id = faker.random.uuid()
  const email = faker.internet.email().toLowerCase()

  return {id, email}
}

const run = async () => {
  const posts = Array.from({length: 5}, createPost)
  const users = Array.from({length: 1}, createUser)
  const db = {
    posts,
    users,
  }
  const jsonDb = JSON.stringify(db, null, 2)

  await writeFile(path.join('./db.json'), JSON.stringify(db, null, 2))
}

run()
