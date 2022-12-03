export { aql } from '../../../deps.ts'

import {
  ArangoDb,
  aql
} from '../../../deps.ts'

export const arangoDB = new ArangoDb({
  url: 'http://localhost:8529/',
  auth: { username: 'root', password: 'root' },
  name: 'dq', // database name
})

// FOR DEBUG
// const query = aql`FOR t IN Traits RETURN t`
// try {
  // const cursor = await arangoDB.query(query, { batchSize: 2 });
  // console.log({cursor: await cursor.all(),});// { cursor: [ 2, 3 ] }
//   const more = await cursor.nextBatch(); // it is new Cursor or undefined
//   console.log({more: await more?.all(),}); // { more: [ 4, 5 ] }
// } catch (error) { console.log(error); }