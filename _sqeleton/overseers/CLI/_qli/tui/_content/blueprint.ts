const availableDimensions = {
  width: Deno.consoleSize(Deno.stdout.rid).columns-2,
  height: Deno.consoleSize(Deno.stdout.rid).rows-2
}
export const SCREENS = { 
  availableDimensions,
  Default : {
    large: { minResolution: [80,35], // 3 windows + 2 menus on screen
      sections: [
        {
          id:0, label: 'Keyboard Actions Menu',
          content:'X', // for now we're filling, but this will be replaced with dynamic text
          box:[1,1,Deno.consoleSize(Deno.stdout.rid).columns-4,4], // [x,y,x,y] <- [TL coords,BR coords]
          active: true,
        },
        {
          id:1, label: 'Category Select',
          content:'•',
          box:[1,5,Math.floor(availableDimensions.width*.25),Math.floor(availableDimensions.height*.5)],
          active: false,
        },
        {
          id:2, label: 'Action Select',
          content:'∆',
          box:[1,Math.floor(availableDimensions.height*.5),Math.floor(availableDimensions.width*.25),availableDimensions.height-5],
          active: false,
        },
        {
          id:3, label: 'Footer Nav',
          content:'Z',
          box:[1,availableDimensions.height-5,availableDimensions.width-2,availableDimensions.height-2],
          active: false,
        },
        { // main section is last on the stack with a negative id for simple iteration protection
          id:-1, label: 'Main - TODO: HANDLE ACTUAL CONTENT :: - TODO: HANDLE ACTUAL CONTENT',
          content:'?',
          box:[Math.ceil(availableDimensions.width*.25), 4, availableDimensions.width-2, availableDimensions.height-5],
          active: false,
        }
      ]
    },
    small: { minResolution: [0,0], // 1 windows + 1 menu on screen
      TODO: 'configure this one'
    },
  }
}