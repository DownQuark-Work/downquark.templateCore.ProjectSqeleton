import {chalq} from '../_deps.ts'

const tui = {
  height: 0, //Deno.consoleSize(Deno.stdout.rid).rows-2, // 51
  width: 0, //Deno.consoleSize(Deno.stdout.rid).columns-2, // 132
  breakChar: '\n',
  renderLog: '',
  sectionBlocks: [{
    id:0, label: 'stub for ts',
    content:'will be removed when actual values exist', // for now we're filling, but this will be replaced with dynamic text
    active:false, box:[0,0,0,0] // [x,y,x,y] <- [TL coords,BR coords]
  },]
}

type SectionBlockType = { id: number; label: string; content: string; box: number[]; active: boolean}
const registerSectionBlock = (block:SectionBlockType) => tui.sectionBlocks.push(block)

const renderView = () => {
  console.clear()
  let tmpStr = ''
  for(let y=0; y<tui.height; y++){
    for(let x=0; x<tui.width; x++){
      // BORDERS
      if((x===0 || x===tui.width-1)
          && (y===0 || y===tui.height-1)
        ) tmpStr += '◉' // CORNERS
      else if(y === 0 || y === tui.height-1) tmpStr += '⎯'
      else if(x === 0 || x === tui.width-1)  tmpStr += '│'
      else if(x !== 0 || x !== tui.width-1) {
        // Attempt to find overlapping section
        let appendChar = ' ' // if no overlap, add placeholder : this will be the main content area
        tui.sectionBlocks.forEach(block => {
          if(x>=block.box[0] && y>=block.box[1] && x<=block.box[2] && y<=block.box[3])
          { if(x===block.box[0] && y===block.box[1]) { // add label
              appendChar = '⟣ '+block.label+' ⟢ '
              x += appendChar.length-1
            }
            else if(x===block.box[0] || x===block.box[2] || y===block.box[1] || y===block.box[3]) {
              appendChar = block.active ? chalq.brightYellow(chalq.bold('.')) : chalq.yellow(chalq.bold('.'))
            }
            else {
              appendChar = block.active ? block.content : chalq.dim(block.content)
            }
          }
        })
        tmpStr += appendChar
      }
    }
    tmpStr += tui.breakChar
  }
  tui.renderLog = tmpStr
  console.clear()
  console.log(tui.renderLog)

  // console.log('chunk(4): ', 'https://github.com/terkelg/prompts/tree/master/lib/elements'.chunk(4))
}
// https://github.com/terkelg/prompts/tree/master/lib/elements
type BlueprintLayoutType = {availableDimensions:{[_:string]:number},blueprint:SectionBlockType[]}
export const createTemplate = (layout:BlueprintLayoutType) => {
  // reset & sanity
  tui.height = layout.availableDimensions.height
  tui.width = layout.availableDimensions.width
  tui.sectionBlocks = []

  layout.blueprint.forEach((block:SectionBlockType) => registerSectionBlock(block))

  renderView()
}