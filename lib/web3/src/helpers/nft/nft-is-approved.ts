import type { Nft } from '@echo/model/types/nft'
import { echoAddress } from '@echo/web3/constants/echo-address'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { getViemClient } from '@echo/web3/helpers/viem/get-viem-client'
import { pipe } from 'ramda'
import { erc721Abi } from 'viem'

export async function nftIsApproved(nft: Nft): Promise<boolean> {
  const {
    collection: { contract },
    owner: { wallet }
  } = nft
  const { chainId } = contract
  if (contract.chainId !== wallet.chainId) {
    return false
  }
  const client = pipe(getChainById, getViemClient)(chainId)
  return client.readContract({
    abi: erc721Abi,
    functionName: 'isApprovedForAll',
    address: formatAddress(contract),
    args: [formatAddress(wallet), echoAddress]
  })
}
