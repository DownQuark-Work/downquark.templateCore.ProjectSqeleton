// The base value to use for rem units
module.exports.basePxFontSize = 16

// For use when mapping a component to CTI
// A plain object where we map the CSS property name to the proper category and type.
// these will be defined when a new object is created in the `_defs/components.json` file
const propertiesToCTI = {
  // Category: COLOR
  blue: { category: 'color', type: 'font' },
  white: { category: 'color', type: 'font' },

  // Category: CONTENT
  "content-after": { category: 'content', type: 'integration', item:'social' },

  // Category: SIZE
  padding: { category: 'size', type: 'dimension', item: 'padding' }
}

module.exports.componentCtiTransform = SD => (prop) => { // this works alongside the above `propertiesToCTI`
  if (prop.path[0] === 'component') { // Only do this custom functionality in the 'component' top-level namespace.
    // When defining component tokens, the _category_ token is the final key in the path.
    // use that key look up the correct values for _type_, _item_, etc from the `propertiesToCTI` hash above.
    // - and place the rendered values into the correct files (_colors.scss, _fonts.css, etc)
    return propertiesToCTI[prop.path[prop.path.length - 1]]
  }
  // Fallback to the original 'attribute/cti' transformer if no key is matched
  return SD.transform['attribute/cti'].transformer(prop)
}