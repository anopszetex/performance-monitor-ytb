function route(target, context) {
  const { kind, name } = context

  if(kind !== 'method') {
    return target
  }

  console.log({ target, kind, name, context })

  return async function(request, response) {
    const { statusCode, message } = await target.apply(this, [request, response])

    response.writeHead(statusCode)
    response.end(JSON.stringify(message))
  }
}

module.exports = { route }