const StyleDictionary = require('style-dictionary')
const { basePxFontSize, componentCtiTransform } = require('./token-config-utils')

// A transform object that defines a transformer method, which will override the default
const CTITransform = {
  transformer: componentCtiTransform(StyleDictionary)
}

function throwSizeError (name, value, unitType) {
  throw `Invalid Number: '${name}: ${value}' is not a valid number, cannot transform to '${unitType}' \n`
}

// Transform that convert px to rem
StyleDictionary.registerTransform({
  name: 'size/pxToRem', type: 'value',
  matcher: function (prop)
    { return prop.attributes.type !== 'breakpoint' && prop.attributes.category === 'size' },
  transformer: function (prop) {
    const val = parseFloat(prop.value)
    if (isNaN(val)) throwSizeError(prop.name, prop.value, 'rem')
    return `${val / basePxFontSize}rem`
  }
})

const filtersToRegister = [
  ['isColorToken','color'],
  ['isContentToken','content'],
  ['isFontToken','font'],
  ['isDimensionConstant','size'],
  ['isTransitionConstant','transition-constant'],
  ['isTypographyConstant','typography'],
  ['isComponentVar','component']
]
filtersToRegister.forEach(fltr => {
  StyleDictionary.registerFilter({
    name: fltr[0],
    matcher: function (prop) { return prop.attributes.category === fltr[1] }
  })
})

module.exports = {
  transform: { // Override the attribute/cti transform
    'attribute/cti': CTITransform // allows for component naming convention
  },
  source: ['scss/_tokens/_conf/_defs/**/*.json'],
  platforms: {
    scss: {
      basePxFontSize,
      transformGroup: 'scss',
      transforms: ['attribute/cti', 'color/hsl', 'name/cti/camel', 'size/pxToRem'],
      buildPath: 'scss/_tokens/scss/',
      prefix: 'dq',
      files: [
        {
          destination: '_colors.scss',
          format: 'scss/variables',
          filter: 'isColorToken',
          options: {
            outputReferences: true
          }
        },
        {
          destination: '_content.scss',
          format: 'scss/variables',
          filter: 'isContentToken'
        },
        {
          destination: '_dimensions.scss',
          format: 'scss/variables',
          filter: 'isDimensionConstant',
          options: {
            outputReferences: true
          }
        },
        {
          destination: '_fonts.scss',
          format: 'scss/variables',
          filter: 'isFontToken',
          options: {
            outputReferences: true
          }
        },
        {
          destination: '_typography.scss',
          format: 'scss/variables',
          filter: 'isTypographyConstant'
        }
      ]
    },
    css: {
      basePxFontSize,
      transformGroup: 'css',
      transforms: ['attribute/cti', 'color/hsl', 'name/cti/kebab', 'size/pxToRem'],
      buildPath: 'scss/_tokens/css/',
      prefix: 'dq',
      files: [
        {
          destination: '_colors.css',
          format: 'css/variables',
          filter: 'isColorToken',
          options: { /* outputReferences: true */ }
        },
        {
          destination: '_content.css',
          format: 'css/variables',
          filter: 'isContentToken'
        },
        {
          destination: '_dimensions.css',
          format: 'css/variables',
          filter: 'isDimensionConstant',
          options: {
            outputReferences: true
          }
        },
        {
          destination: '_fonts.css',
          format: 'css/variables',
          filter: 'isFontToken',
          options: {
            outputReferences: true
          }
        },
        {
          destination: '_typography.css',
          format: 'css/variables',
          filter: 'isTypographyConstant'
        }
      ]
    }
  }
}