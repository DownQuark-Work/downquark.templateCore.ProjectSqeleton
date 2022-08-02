// TODO: Flush this out
import { require } from '../network/deps.ts'
const businessLogic = (type:'Query'|'Read',dbs:Array<'Graph'|'Relational'|'TimeSeries'>,view:'Landing') => {
  const bizLogic:{[k:string]:any} = {}
  dbs.forEach(db => {
    // console.log('import.meta.url', import.meta.url)
    bizLogic[db] = require(`./${db.toLocaleLowerCase()}/${type.toLocaleLowerCase()}`)
  })
}
export default businessLogic