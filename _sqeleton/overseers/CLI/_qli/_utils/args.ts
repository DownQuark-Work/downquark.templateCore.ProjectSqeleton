import { extantFile } from './fs.ts'
import {launch as dashboardLaunch} from '../tui/dashboard.ts'

type ParsedArgsType = {[x: string]: unknown; _: (string | number)[]; "--": string[];}

export const handleArgs = (parsedArgs:ParsedArgsType) => {
  if (parsedArgs._.length === 0) {
    
    extantFile()
      ? console.log('launch current dashboad')
      : console.log('prompt for install info')
      dashboardLaunch() // TODO: only run this _after_ we have ensured an install
    return
  }
  if (parsedArgs.h || parsedArgs.help) {
    console.log("Usage: ./dq.sqeleton.ts [-h|--help]");
    console.log("Examples:");
    console.log("./dq.sqeleton.ts NEW_PROJECT_NAME");
    console.log("./dq.sqeleton.ts EXISTING_PROJECT_NAME");
    return
  }
  console.log('checking for project: ', parsedArgs._[0])
  // console.log('DEBUG: ', parsedArgs)
}