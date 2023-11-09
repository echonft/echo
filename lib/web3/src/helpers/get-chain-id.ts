import { isProd } from '@echo/utils/constants/is-prod'

// TODO Should change this to allow multi-chain
export function getChainId(): number {
  return isProd ? 1 : 11155111
}
