const readTime = () => {
  console.log('TODO: interact with the persistence layer to read the time series db')
}

const qryTime = () => {
  console.log('TODO: interact with the persistence layer to update the time series db')
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