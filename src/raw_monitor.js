const { randomUUID: uuid } = require('node:crypto')
const { createServer, Server } = require('node:http')
const { setTimeout } = require('node:timers/promises')

const PORT = 3000

const handler = {
  __proto__: null,
  apply(fn, thisArg, argumentsList) {
    const requestStartedAt = performance.now()

     const data = { 
      reqId: uuid(), 
      name: fn.name, 
      method: argumentsList[0].method, 
      url: argumentsList[0].url, 
      elapsed: null
    } 

    const afterExectuion = Reflect.apply(fn, thisArg, argumentsList) 

    afterExectuion.finally(() => {
      const requestEndedAt = performance.now()
      const timeDiff = requestEndedAt - requestStartedAt
      data.elapsed = timeDiff.toFixed(2).concat('ms')
            
      console.log('\nBenchmark', data)
    })

    return afterExectuion
  }
}


const proxy = new Proxy(myRoute, handler)

function random() {
  return Number(Math.random() * 2000)
}

async function myRoute(res, reply) {
  await setTimeout(random())

    const data = {
      statusCode: 200,
      message: 'Hello World'
    }

    reply.writeHead(data.statusCode)
    reply.end(JSON.stringify(data.message))
}

function run() {
  createServer(proxy)
  .listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
  })
}

run()

