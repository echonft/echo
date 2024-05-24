import { getChainId } from '@echo/utils/helpers/get-chain-id'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { formatAddress } from '@echo/web3/helpers/format-address'

/**
 * Shorten the address to display the 4 first chars and 4 last chars.
 * Function throws if the str is not an address
 * @param {Wallet} args
 * @return {((args: {address: string, chainId: number}) => string
 */
export function shortenAddress(args: { address: HexString; chain: ChainName }): string {
  const formattedAddress = formatAddress({
    address: args.address,
    chainId: getChainId(args.chain)
  })
  return `${formattedAddress.substring(0, 6)}...${formattedAddress.substring(formattedAddress.length - 4)}`
}
