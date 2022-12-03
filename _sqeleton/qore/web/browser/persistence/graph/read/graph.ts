let ArangoDB:any = null, aql:any = null
export const Inject = (injArangoDB:any, injAql:any) => {
  ArangoDB = injArangoDB
  aql = injAql
}

const explainBatchTraits = async () => {
  const query = aql`FOR t IN Traits RETURN t`
try {
  return await ArangoDB.explain(query, { batchSize: 2 })
} catch (error) { console.log(error); }
}

const getTraits = async () => {
  const query = aql`FOR t IN Traits RETURN t`
try {
  const adbQuery = await ArangoDB.query(query, { batchSize: 2 })
  return await adbQuery.all()
} catch (error) { console.log(error); }
}

export {
  explainBatchTraits,
  getTraits
}
