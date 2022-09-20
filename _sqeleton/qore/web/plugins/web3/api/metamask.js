// https://docs.metamask.io/guide/
// import detectEthereumProvider from '@metamask/detect-provider';
// OR
// <script src="https://unpkg.com/@metamask/detect-provider/dist/detect-provider.min.js"></script>
import { ethers } from '../../_external/ethers-5.6.esm.min.js'

// METAMASK
let currentAccnt = null
const btnMetaMaskConnect = document.getElementById('btn-connect-to-metamask')
const btnReqPermissions = document.getElementById('btn-request-permissions', requestPermissions);
const showAccount = document.querySelector('.metamask-account');

const setCurrentAccount = accnts => {
  currentAccnt = accnts[0];
  showAccount.innerHTML = currentAccnt || 'No Account Connected';
}

ethereum.on('connect', connectInfo => console.log('connectInfo: ', connectInfo));
ethereum.on('disconnect', error => console.error('on disconnect', error));
ethereum.on('message', message => alert(message));
ethereum.on('accountsChanged', setCurrentAccount);
ethereum.on('chainChanged', (chainId) => {
  // Correctly handling chain changes can be complicated - recommend reloading the page unless you have good reason not to.
  console.log('user changed chain to: ' + chainId)
  window.location.reload();
});


const provider = await detectEthereumProvider();

async function connectToMetaMask() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  setCurrentAccount(accounts)
}

const startApp = () => {
  if (provider !== window.ethereum) {
    alert('Cannot Proceed! Do you have multiple wallets installed?');
  }
  console.log('starting Metamask: ', ethers)
  btnMetaMaskConnect.removeAttribute('disabled')
  btnMetaMaskConnect.addEventListener('click', connectToMetaMask);
  btnReqPermissions.addEventListener('click', requestPermissions);
}
if (provider) {
  startApp(provider); // initialize your app
} else {
  btnMetaMaskConnect.innerText = 'Please install MetaMask!'
  console.log();
}

function requestPermissions() {
  ethereum
    .request({
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: {} }],
    })
    .then((permissions) => {
      console.log('permissions: ', permissions)
      const accountsPermission = permissions.find(
        (permission) => permission.parentCapability === 'eth_accounts'
      );
      if (accountsPermission) {
        console.log('eth_accounts permission successfully requested!');
      }
    })
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Permissions needed to continue.');
      } else {
        console.error(error);
      }
    });
}

// ETHERS
// const ethersProvider = new ethers.providers.JsonRpcProvider();
// run hardhat (or the like for the above)

// The "any" network will allow spontaneous network changes
const ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any') // using metamask
await ethersProvider.send("eth_requestAccounts", []); // connect with metamask
const signer = ethersProvider.getSigner()
showAccount.innerHTML = signer.provider.provider.selectedAddress || 'No Account Connected';

const curBlockNum = await ethersProvider.getBlockNumber()

ethersProvider.on("network", (_newNetwork, oldNetwork) => {
  // When a Provider makes its initial connection, it emits a "network"
  // event with a null oldNetwork along with the newNetwork. So, if the
  // oldNetwork exists, it represents a changing network
  if (oldNetwork) {
      window.location.reload();
  }
});

//SIGNING
/* const signSimpleString = await signer.signMessage('downquark simple string to sign'); */

// A common case is also signing a hash, which is 32
// bytes. It is important to note, that to sign binary
// data it MUST be an Array (or TypedArray)
  /* // This string is 66 characters long
const sixtysixChars = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      messageBytes = ethers.utils.arrayify(sixtysixChars); // This array representation is 32 bytes long
  // To sign a hash, you most often want to sign the bytes
/* const signHash = await signer.signMessage(messageBytes) */

const finalWordInList = ethers.wordlists.en.getWord(2047)
document.querySelector('body').innerHTML = document.querySelector('body').innerHTML + '<b>ETHERS:</b>'
document.querySelector('body').innerHTML = document.querySelector('body').innerHTML + '<br/>CurBlockNum: ' + curBlockNum
document.querySelector('body').innerHTML = document.querySelector('body').innerHTML + '<br/>Final Word in list `ethers.wordlists.en.getWord(2047)`: ' + finalWordInList
/* document.querySelector('body').innerHTML = document.querySelector('body').innerHTML + '<br/>signSimpleString: ' + signSimpleString */
/* document.querySelector('body').innerHTML = document.querySelector('body').innerHTML + '<br/>signHash: ' + signHash */



console.log('ETHERS')
console.log('ethersProvider: ', ethersProvider)
console.log('signer: ', signer)
console.log('signer.provider: ', signer.provider)
console.log('signer.provider.provider: ', signer.provider.provider)
console.log('signer.provider.provider.selectedAddress: ', signer.provider.provider.selectedAddress)