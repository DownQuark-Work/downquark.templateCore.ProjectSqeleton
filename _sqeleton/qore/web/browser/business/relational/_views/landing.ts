const loadAllVisitorCounts = () => {
  return 'TODO: interact with the persistence layer to retrieve and group visitor data for POC'
}

const setVisitorInfo = () => {
  return 'TODO: interact with the persistence layer to add a count to the visitor IP, and upsert timestamp'
}

export const landing = {
  RDBMS: {
    Query: {
      GET: {
        setVisitorInfo
      },
    },
    Read: {
      GET: {
        init: loadAllVisitorCounts
      }
    }
  }
}