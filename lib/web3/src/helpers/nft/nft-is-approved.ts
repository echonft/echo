import type { Nft } from '@echo/model/types/nft'
import { getChainId } from '@echo/utils/helpers/get-chain-id'
import type { LoggerInterface } from '@echo/utils/types/logger-interface'
import { ECHO_ADDRESS } from '@echo/web3/constants/echo-address'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { getViemClient } from '@echo/web3/helpers/get-viem-client'
import { pipe } from 'ramda'
import { erc721Abi } from 'viem'

export async function nftIsApproved(nft: Nft, logger?: LoggerInterface): Promise<boolean> {
  const {
    collection: { contract },
    owner: { wallet }
  } = nft
  // FIXME Contract[] Not sure if thats the proper behaviour
  const chainId = getChainId(contract.chain)
  if (contract.chain !== wallet.chain) {
    return false
  }
  const client = pipe(getChainById, getViemClient)(chainId)
  const approved = await client.readContract({
    abi: erc721Abi,
    functionName: 'isApprovedForAll',
    address: formatAddress(contract),
    args: [formatAddress(wallet), ECHO_ADDRESS]
  })
  if (!approved) {
    logger?.warn(
      `${wallet.address} has not approved echo contract for collection ${nft.collection.slug} (${contract.address})`
    )
  }
  return approved
}
