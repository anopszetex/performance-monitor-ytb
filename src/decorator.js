
const { randomUUID: uuid } = require('node:crypto')

const isUiDisabled = process.env.UI_DISABLED

let ui = null

if(isUiDisabled) {
  ui = { updateGraph: () => {} }
} else {
  const Ui = require('./ui')
  ui = new Ui()
}
 

function route(target, context) {
  const { kind, name } = context

  if(kind !== 'method') {
    return target
  }

  return async function(request, response) {
    const { statusCode, message } = await target.apply(this, [request, response])

    response.writeHead(statusCode)
    response.end(JSON.stringify(message))
  }
}


function log(...args) {
  if(isUiDisabled) {
    console.log(...args)
  }
}

function responseTimeTracker(target, context) {
  const { kind, name } = context

  if(kind !== 'method') {
    return target
  }

  return function(request, response) {
    const reqId = uuid()
    
    const requestStartedAt = performance.now()

    const methodsTimeTracker = {
      GET: performance.now(),
      POST: performance.now()
    }

    const afterExecution = target.apply(this, [request, response])

    const data = {
      reqId,
      name,
      method: request.method,
      url: request.url
    }

    const onFinally = onRequestEnded({ 
      data,
      response,
      requestStartedAt, 
      methodsTimeTracker 
    })

    afterExecution.finally(onFinally)

    return afterExecution
  }
}


function onRequestEnded(args) {
  const { 
    data, 
    response, 
    requestStartedAt, 
    methodsTimeTracker 
  } = args

  return () => {
    const requestEndedAt = performance.now()
    let timeDiff = requestEndedAt - requestStartedAt
    let seconds = Math.round(timeDiff)


    data.statusCode = response.statusCode
    data.message = response.statusMessage
    data.elapsed = timeDiff.toFixed(2).concat('ms')

    log('benchmark', data)

    const trackerDiff = requestEndedAt - methodsTimeTracker[data.method]

    if(trackerDiff >= 200) {
      ui.updateGraph(data.method, seconds)
      methodsTimeTracer[data.method] = performance.now()
    }
      
  }
}


module.exports = { 
  route,
  responseTimeTracker 
}