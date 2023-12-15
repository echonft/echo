import type { HexString } from '@echo/utils/types/hex-string'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { pipe } from 'ramda'

/**
 * Shorten the address to display the 4 first chars and 4 last chars.
 * Function throws if the str is not an address
 * @param {{address: HexString, chainId: number}} args
 * @return {((args: {address: string, chainId: number}) => string
 */
export function shortenAddress(args: { address: HexString; chainId: number }) {
  return pipe(formatAddress, (address) => `${address.substring(0, 6)}...${address.substring(address.length - 4)}`)(args)
}
