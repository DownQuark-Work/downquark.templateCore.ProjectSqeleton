import {SCREENS} from './_content/blueprint.ts'
import {processKeyPress} from '../interactions/keyboard.ts'
import {createTemplate} from '../ui/layout.ts'

const _withBlueprint = () => { // mock for now
  // TODO: return object based on terminal/consule resolution
  // SCREENS.Default.large.availableDimensions = [...SCREENS.availableDimensions]
  return {
    availableDimensions: {...SCREENS.availableDimensions}, // SSoT for sizing
    blueprint: [...SCREENS.Default.large.sections]
  }
}
export const launch = () => {
  // configures and prints initial dashboard
  createTemplate(_withBlueprint())
  // listens for keyboard events
  //  and prevents the process from exiting
  processKeyPress()
}

let currentActiveSection = 0
const _changeSelection = () => // TODO: Move this into blueprint.actions.ts
{ SCREENS.Default.large.sections[currentActiveSection].active = false
  if(++currentActiveSection>=SCREENS.Default.large.sections.length) currentActiveSection = 0
  SCREENS.Default.large.sections[currentActiveSection].active = true
  createTemplate(_withBlueprint()) }

export const handleParsedKeyboardEvent = (kbParsed:{name?:string}) => {
  switch(kbParsed.name)
  { case 'tab': _changeSelection(); break }
  console.log('kbParsed: ', kbParsed)
}
