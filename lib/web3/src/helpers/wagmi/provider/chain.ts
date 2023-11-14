import { getNetwork } from '@wagmi/core'

export type ChainProvider = () => number | undefined
export function chain() {
  return getNetwork().chain?.id
}
