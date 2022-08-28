// interacting via the API is the best bet for QuestDb (at this time)
export const TimeseriesFetch = async (qry:string): Promise<Record<string, unknown>> => {
  const resp = await fetch(`http://localhost:9000/exec?query=${encodeURIComponent(qry)}`, {})
  const respJson = await resp.json()
  return respJson
}