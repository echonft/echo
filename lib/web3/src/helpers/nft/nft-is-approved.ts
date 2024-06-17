import type { Nft } from '@echo/model/types/nft'
import type { LoggerInterface } from '@echo/utils/types/logger-interface'
import { getClientForChain } from '@echo/web3/helpers/chain/get-client-for-chain'
import { formatWalletAddress } from '@echo/web3/helpers/format-wallet-address'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
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
  const echoAddress = getEchoAddress(contract.chain)
  const client = await pipe(prop('chain'), getClientForChain)(contract)
  const approved = await client.readContract({
    abi: erc721Abi,
    functionName: 'isApprovedForAll',
    address: formatWalletAddress(contract),
    args: [formatWalletAddress(wallet), echoAddress]
  })
  if (!approved) {
    logger?.warn(
      `${wallet.address} has not approved echo contract for collection ${nft.collection.slug} (${contract.address})`
    )
  }
  return approved
}
