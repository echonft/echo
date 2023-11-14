import type { Nft } from '@echo/model/types/nft'
import { echoFunctionNames } from '@echo/web3/constants/echo-function-names'
import { erc721ABI } from '@echo/web3/constants/erc721-abi'
import { getViemClient } from '@echo/web3/helpers/viem/get-viem-client'
import { getAddress } from 'viem'

export async function isOwnerOfErc721(nft: Nft) {
  const {
    collection: {
      contract: { address, chainId }
    },
    id,
    tokenId,
    owner: {
      wallet: { address: ownerAddress }
    }
  } = nft
  const client = getViemClient(chainId)
  const realOwner = (await client.readContract({
    address,
    abi: erc721ABI,
    functionName: echoFunctionNames.ownerOf,
    args: [BigInt(tokenId)]
  })) as unknown as string
  if (getAddress(ownerAddress, chainId) !== getAddress(realOwner, chainId)) {
    throw Error(`${ownerAddress} is not the owner of nft ${id}`)
  }
}
