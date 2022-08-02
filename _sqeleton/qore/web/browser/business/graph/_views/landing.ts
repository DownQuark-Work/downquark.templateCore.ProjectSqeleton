const loadInitialGraphData = () => {
  console.log('TODO: interact with the persistence layer to retrieve data for POC')
}

const setReferrer = () => {
  console.log('TODO: interact with the persistence layer to add a timestamp and referrer as a POC')
}

export const landing = {
  Graph: {
    Query: {
      GET: {
        setReferrer
      },
    },
    Read: {
      GET: {
        init: loadInitialGraphData
      }
    }
  }
}