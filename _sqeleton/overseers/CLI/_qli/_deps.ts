// wrapper for npm packages
// import chalk from "npm:chalk@5";
// export const chalq = chalk

export * as chalq from "https://deno.land/std@0.164.0/fmt/colors.ts";
export {ensureFileSync} from "https://deno.land/std@0.164.0/fs/mod.ts";
export {parse} from "https://deno.land/std@0.164.0/flags/mod.ts";

export { parse as keyParse } from "https://deno.land/x/cliffy@v0.25.4/keycode/mod.ts";
export type { KeyCode as KeyCodeType} from "https://deno.land/x/cliffy@v0.25.4/keycode/mod.ts";
