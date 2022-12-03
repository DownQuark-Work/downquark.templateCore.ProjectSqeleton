// This whole FE interaction piece can be drastically cleaned up.
// - not 100% sure how it will flow into the final build so leaving it as-is for now
const _DEBUG = configIndexedDB_dq._DEBUG
const ViewTest = {}

const additionalCustomerData = [
  { ssn: '123-44-4444', name: 'Duke', age: 53, email: 'duke@duke.com' },
  { ssn: '321-55-5555', name: 'Earl', age: 23, email: 'earl@sandwich.org' }
]

const additionalNameData = [
  'Xavier', 'Rogue'
]

const updateTextArea = txt => {
  document.querySelector('textarea').value = JSON.stringify(txt)
}
document.getElementById('btn-loaded-db-content').addEventListener('click',e => {
  ViewTest.DB = configIndexedDB_dq._LOADED_DB
  ViewTest.TRXN = configIndexedDB_dq._Transaction
  ViewTest.OBJSTR = configIndexedDB_dq._ObjectStore

  const { version, name, objectStoreNames, } = ViewTest.DB
  updateTextArea({ version, name, objectStoreNames, _DEBUG })

  document.querySelector('#btn-add-db-content').removeAttribute('disabled')
  document.querySelector('#btn-add-db-content span').innerHTML = 'additional customer data'
  
  const getCustomer = customerData[Math.floor(Math.random()*customerData.length)],
  rndKey = Date.now() % 3

  document.querySelector('#btn-delete-db-content').removeAttribute('disabled')
  document.querySelector('#btn-delete-db-content span').innerHTML = (objectStoreNames[Math.floor(Math.random()*objectStoreNames.length)] + ' ' + (rndKey === 0 ? getCustomer.ssn : rndKey === 1 ? getCustomer.name : getCustomer.email)).replace(/(dqStore).*/i,'$1')

  document.querySelector('#btn-get-db-content').removeAttribute('disabled')
  document.querySelector('#btn-get-db-content span').innerHTML = rndKey === 0 ? getCustomer.ssn : rndKey === 1 ? getCustomer.name : getCustomer.email
  
  document.querySelector('#btn-update-db-content').removeAttribute('disabled')
  document.querySelector('#btn-update-db-content span').innerHTML = 'Alice to Diamond Skittles'

  document.querySelector('#btn-getall-customer-content').removeAttribute('disabled')
  document.querySelector('#btn-getall-customer-content span').innerHTML = Date.now() % 2 === 0 ? 'Customer' : 'Name'

  document.querySelector('#btn-create-array').removeAttribute('disabled')
  document.querySelector('#btn-create-array span').innerHTML = Date.now() % 2 === 0 ? 'Customer' : 'Name'
})

document.getElementById('btn-add-db-content').addEventListener('click',e => {
  ViewTest.TRXN.add({objectstore: 'customers', data: additionalCustomerData, index: null, cb: e => updateTextArea(e)})
  // ViewTest.TRXN.add({objectstore: 'names', data: additionalNameData, index: null, cb: e => updateTextArea(e)}) // hardcoded to see names objectstore working
})

document.getElementById('btn-delete-db-content').addEventListener('click',e => {
  const [objstr, record] = e.target.innerText.split(' ')
  if (objstr !== 'customers') { updateTextArea({CANNOT_RUN: 'current POC only set up for customers'}); return }
  const index = (!!~record.indexOf('-'))
    ? null
    : !!~record.indexOf('@')
      ? 'email' : 'name'
  if (index) { updateTextArea({CANNOT_RUN: 'current POC only set up for ssn - create a helper method to handle other indexes'}); return }
  ViewTest.TRXN.delete({objectstore: objstr, data: record, index, cb: e => updateTextArea(e)})
})

document.getElementById('btn-get-db-content').addEventListener('click',e => {
  const index = (!!~e.target.innerText.indexOf('-'))
    ? null
    : !!~e.target.innerText.indexOf('@')
      ? 'email' : 'name'
  ViewTest.TRXN.get({objectstore: 'customers', data: e.target.innerText, index, cb: e => updateTextArea(e)})
})

document.getElementById('btn-update-db-content').addEventListener('click',e => {
  const updateRecord = e => {
    const newRecord = {...e}
    newRecord.name = 'Diamond Skittles'
    ViewTest.TRXN.update({objectstore: 'customers', data: newRecord, cb: e => updateTextArea(e)})
  }
    // get first
  ViewTest.TRXN.get({objectstore: 'customers', data: 'Alice', index: 'name', cb: e => updateRecord(e)})
})

// not actual transactions
document.getElementById('btn-getall-customer-content').addEventListener('click',e => {
  const objstr = document.querySelector('#btn-getall-customer-content span').innerText.toLowerCase() + 's'
  ViewTest.OBJSTR.getAll(objstr, e => updateTextArea(e))
})
document.getElementById('btn-create-array').addEventListener('click',e => {
  const objstr = document.querySelector('#btn-create-array span').innerText.toLowerCase() + 's'
  ViewTest.OBJSTR.arrayFromCursor(objstr, e => updateTextArea(e))
})

