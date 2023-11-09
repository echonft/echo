import type { Nft } from '@echo/model/types/nft'
import { erc721ABI } from '@echo/web3/constants/erc721-abi'
import { IS_APPROVED_FOR_ALL } from '@echo/web3/constants/erc721-function-names'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { getViemClient } from '@echo/web3/helpers/get-viem-client'

export async function hasApprovedErc721(nft: Nft) {
  const {
    collection: {
      contract: { address, chainId }
    },
    id,
    owner: {
      wallet: { address: ownerAddress }
    }
  } = nft
  const client = getViemClient(chainId)
  const approved = await client.readContract({
    abi: erc721ABI,
    functionName: IS_APPROVED_FOR_ALL,
    address,
    args: [ownerAddress, getEchoAddress(chainId)]
  })
  if (!approved) {
    throw Error(`${ownerAddress} has not approved nft ${id}`)
  }
}
