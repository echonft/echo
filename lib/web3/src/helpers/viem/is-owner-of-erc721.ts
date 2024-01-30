import type { Nft } from '@echo/model/types/nft'
import { echoFunctionNames } from '@echo/web3/constants/echo-function-names'
import { erc721ABI } from '@echo/web3/constants/erc721-abi'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { getViemClient } from '@echo/web3/helpers/viem/get-viem-client'
import { pipe } from 'ramda'
import { getAddress } from 'viem'

export async function isOwnerOfErc721(nft: Nft) {
  const {
    collection: { contract },
    id,
    tokenId,
    owner: {
      wallet: { address: ownerAddress }
    }
  } = nft
  const { chainId } = contract
  const client = pipe(getChainById, getViemClient)(chainId)
  const realOwner = (await client.readContract({
    address: formatAddress(contract),
    abi: erc721ABI,
    functionName: echoFunctionNames.ownerOf,
    args: [BigInt(tokenId)]
  })) as unknown as string
  if (getAddress(ownerAddress, chainId) !== getAddress(realOwner, chainId)) {
    throw Error(`${ownerAddress} is not the owner of nft ${id}`)
  }
}
