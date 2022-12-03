import * as ReadTime from './read/time.ts'

const getRandomRecords = ReadTime.getLong

export const TimeseriesDB = {
  API: {
    v1: {
      Metrics: {
        getRandomRecords
      }
    }
  },
  View: {
    Landing: {},
    Database: {
      getRandomRecords
    },
  }
}