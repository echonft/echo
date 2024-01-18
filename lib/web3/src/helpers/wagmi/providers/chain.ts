import { getNetwork } from '@wagmi/core'

export function chain() {
  return getNetwork().chain?.id
}
