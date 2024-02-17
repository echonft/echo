import type { Nft } from '@echo/model/types/nft'
import { echoFunctionNames } from '@echo/web3/constants/echo-function-names'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { getViemClient } from '@echo/web3/helpers/viem/get-viem-client'
import { pipe, toLower } from 'ramda'
import { erc721Abi } from 'viem'

export async function isOwnerOfErc721(nft: Nft): Promise<boolean> {
  const {
    collection: { contract },
    tokenId,
    owner: { wallet }
  } = nft
  const { chainId } = contract
  if (contract.chainId !== wallet.chainId) {
    return false
  }
  const client = pipe(getChainById, getViemClient)(chainId)
  const realOwner = await client.readContract({
    address: formatAddress(contract),
    abi: erc721Abi,
    functionName: echoFunctionNames.ownerOf,
    args: [BigInt(tokenId)]
  })
  return toLower(realOwner) === toLower(wallet.address)
}
