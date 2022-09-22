const { once } = require('node:events')
const { randomUUID: uuid } = require('node:crypto')
const { createServer } = require('node:http')

const { serverConfig } = require('./server/config')

const { route } = require('./decorator')

const fakerDatabase = new Map()
class Server {
  @route
  static async handler(request, response) {
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
  .listen(serverConfig.PORT, () => process.stdout.write(`🚀 Server is running on port ${serverConfig.PORT}`))