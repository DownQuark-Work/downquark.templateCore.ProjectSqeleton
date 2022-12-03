// prototype typings
declare global { interface String {
  chunk(len: number): string[];
}}
declare global { interface Number {
  clamp(min: number, max: number): number;
  fits(min: number, max: number): boolean;
}}

/* [ register prototypes ] */
// NUMBER
/** Clamp {toClamp} between {min} and {max} */
Number.prototype.clamp = function(min, max){
  const toClamp = this.valueOf()
  return Math.max(Math.min(toClamp, max), min)
}

/** Check whether {toFit} fits in <{min}, {max}> range */
Number.prototype.fits = function(min, max): boolean {
  const toFit = this.valueOf()
  return toFit === toFit.clamp(min, max);
}

// STRING
String.prototype.chunk = function(len){
  const chunkRegEx = new RegExp(`.{1,${len}}`,'g')
  const thisString = this.valueOf()
  return thisString.match(chunkRegEx) || [thisString]
} // allows `'abcdet'.chunk(4)` -returns-> (2)['abcd', 'et']