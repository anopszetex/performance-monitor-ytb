const { once } = require('node:events')
const { randomUUID: uuid } = require('node:crypto')
const { createServer } = require('node:http')
const { setTimeout } = require('node:timers/promises')

const { serverConfig } = require('./server/config')

const { route, responseTimeTracker } = require('./decorator')

const fakerDatabase = new Map()

class Server {
  @responseTimeTracker
  @route
  static async handler(request, response) {
    await setTimeout(Number(Math.random() * 100))

    if(request.method === 'POST') {
      const data = await once(request, 'data')
      const item = JSON.parse(data)
      item.id = uuid()

      fakerDatabase.set(item.id, item)

      return {
        statusCode: 201,
        message: item
      }
    }

    return {
      statusCode: 200,
      message: [...fakerDatabase.values()]
    }
  }
}

createServer(Server.handler)
  .listen(serverConfig.PORT, () => {
    console.log(`🚀 Server is running on port ${serverConfig.PORT}`)
  })