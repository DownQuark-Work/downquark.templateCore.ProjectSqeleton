const readTime = () => {
  return'TODO: interact with the persistence layer to read the time series db'
}

const qryTime = () => {
  return'TODO: interact with the persistence layer to update the time series db'
}

export const landing = {
  TIME: {
    Query: {
      GET: {
        qryTime
      },
    },
    Read: {
      GET: {
        init: readTime
      }
    }
  }
}