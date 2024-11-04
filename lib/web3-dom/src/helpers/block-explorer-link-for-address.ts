import type { Address } from '@echo/model/types/address'

export function blockExplorerLinkForAddress(address: Address): string {
  return `https://seitrace.com/address/${address}`
}
