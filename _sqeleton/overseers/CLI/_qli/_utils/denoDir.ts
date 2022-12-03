// deno run -A denoDir.ts

// this is to be used with ./_constants.ts['QLI_PERSISTENT_FILENAME']
//   - and any others that will be needed
async function getNames(currentPath: string, recurse = true): Promise<string[]> {
  const names: string[] = [];

  for await (const dirEntry of Deno.readDir(currentPath)) {
    const entryPath = `${currentPath}/${dirEntry.name}`;
    names.push(entryPath);

    if (recurse && dirEntry.isDirectory) {
      names.push(...await getNames(entryPath));
    }
  }

  return names.map(n => n.replace(/(\.+\/)+/g,'')).flat();
}
 // 
console.log('getNames: ', await getNames('../..'))
console.log('getNames: ', await getNames('/dq/dq/downquark.templateCore.ProjectSqeleton/_sqeleton/overseers/CLI/_qli/_utils'))
console.log('getNames: ', await getNames('../',false))

// Below shows examples of reading and writing to files

/*
import {ensureFileSync} from 'https://deno.land/std@0.164.0/fs/mod.ts';
const makeTestStubTemplate = (fileName: string, aliasPath: string) => `import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import i18n from '@/i18n'
import VueRouter from 'vue-router'
import ${fileName.replace('.vue','')} from '@${aliasPath.replace('./src','')}'
Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
describe('${fileName}', () => {
  let vuetify: Vuetify
  let wrapper: any
  beforeEach(() => {
    vuetify = new Vuetify()
    /* STUBBED TEMPLATE
    wrapper = mount(${fileName.replace('.vue','')}, {
      vuetify,
      localVue,
      i18n,
      propsData: {}
    })
    * /
  })
  it('stubs', () => {
    // wrapper.html()
    expect(true).toBe(true)
  })
})
`
const pathsToFileName = (paths: string[]) => paths.map((p: string) => p.split('/').at(-1)).map((p: string) => p.split('.')[0].toLowerCase())
const existingTests =  await getNames('./tests/unit').then(paths => pathsToFileName(paths))// paths.map(p => p.split('/').at(-1)).map(p => p.split('.')[0].toLowerCase()))
const filePaths = await getNames('./src')
  .then(path => path.filter(nm => /\.(tzzzs|vue)$/.test(nm)).filter(n => !/\.d\.ts$/.test(n)).filter(n => !/\/locales\//.test(n)))
const fileNames = [...new Set(pathsToFileName(filePaths))]
const overlaps = fileNames.filter(name => existingTests.indexOf(name) != -1 );
console.log('existingTests: ', existingTests)
console.log(filePaths);
console.log('fileNames: ', fileNames)
console.log('overlaps: ', overlaps)
let stop = 0
filePaths.forEach(async path => {
  if(stop >= 2) return
  // stop++
  console.log('path: ', path.replace('/src/','/__tests__/unit/').replace('.vue','.spec.ts'))
  const testPath = path.replace('/src/','/__tests__/unit/').replace('.vue','.spec.ts')
  const testName = path.split('/').at(-1)
  ensureFileSync(testPath)
  // console.log('testName: ', testName, overlaps.includes(testName?.replace('.vue','').toLowerCase()))
  if(overlaps.includes(testName?.replace('.vue','').toLowerCase())){
    console.log('pre-existing test: ', testName)
    // stop = 13
    const preExistingTestContent = await Deno.readTextFile(`./tests/unit/${testName?.replace('.vue','')}.spec.ts`)
    await Deno.writeTextFile(testPath, preExistingTestContent);
    // console.log('preExistingTestContent: ', preExistingTestContent)
  }
  else await Deno.writeTextFile(testPath, makeTestStubTemplate(testName,path));
})
export {}
/* */