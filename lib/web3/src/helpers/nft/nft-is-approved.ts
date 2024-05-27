import type { Nft } from '@echo/model/types/nft'
import type { LoggerInterface } from '@echo/utils/types/logger-interface'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { getClientForChain } from '@echo/web3/helpers/get-client-for-chain'
import { getEchoAddressByChain } from '@echo/web3/helpers/get-echo-address-by-chain'
import { pipe, prop } from 'ramda'
import { erc721Abi } from 'viem'

export async function nftIsApproved(nft: Nft, logger?: LoggerInterface): Promise<boolean> {
  const {
    collection: { contract },
    owner: { wallet }
  } = nft
  if (contract.chain !== wallet.chain) {
    return false
  }
  const echoAddress = getEchoAddressByChain(contract.chain)
  const client = pipe(prop('chain'), getClientForChain)(contract)
  const approved = await client.readContract({
    abi: erc721Abi,
    functionName: 'isApprovedForAll',
    address: formatAddress(contract),
    args: [formatAddress(wallet), echoAddress]
  })
  if (!approved) {
    logger?.warn(
      `${wallet.address} has not approved echo contract for collection ${nft.collection.slug} (${contract.address})`
    )
  }
  return approved
}
