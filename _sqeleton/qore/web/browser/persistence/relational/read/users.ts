import { MariaDb } from "../../../network/deps.ts";

let db:MariaDb
export const Connect = (dbConn:MariaDb) => {db = dbConn}

const getMembers = async (col:string, val:string) => {
  return await db.query(
    col
    ? 'SELECT `username` FROM `member` WHERE ?? = ?'
    : 'SELECT `username` FROM `member` WHERE 1',
    [col, val]
  ).then(obj => obj[0])
}
export {
  getMembers
}