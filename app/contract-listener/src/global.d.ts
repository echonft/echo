import { WatchContractEventOnLogsFn, WatchContractEventParameters } from '@echo/web3/global'

declare module 'viem' {
  export { WatchContractEventOnLogsFn, WatchContractEventParameters }
}
