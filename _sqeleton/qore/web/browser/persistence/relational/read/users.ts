import { MariaDb } from "../../../network/deps.ts";

let db:MariaDb
export const Connect = (dbConn:MariaDb) => {db = dbConn}

const getMembers = async (col:string, val:string) => {
  return await db.query(
    'select username from member WHERE ?? = ?',
    [col, val]
  ).then(obj => obj[0])
}
export {
  getMembers
}