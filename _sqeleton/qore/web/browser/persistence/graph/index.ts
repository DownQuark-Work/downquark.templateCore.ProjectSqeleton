import { arangoDB, aql } from '../../network/resources/types/persistence/graph.ts'

import * as ReadGraph from './read/graph.ts'
ReadGraph.Inject(arangoDB, aql)

// const explainBatchTraits = () => 'boo'

const {
  explainBatchTraits,
  getTraits,
} = ReadGraph

export const GraphDB = {
  API: {
    v1: {
      Users: {
        explainBatchTraits
      }
    }
  },
  View: {
    Landing: {},
    Database: {
      getTraits
    },
  }
}