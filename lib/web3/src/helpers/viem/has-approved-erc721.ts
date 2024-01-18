import type { Nft } from '@echo/model/types/nft'
import { erc721ABI } from '@echo/web3/constants/erc721-abi'
import { erc721FunctionNames } from '@echo/web3/constants/erc721-function-names'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { getViemClient } from '@echo/web3/helpers/viem/get-viem-client'

export async function hasApprovedErc721(nft: Nft) {
  const {
    collection: { contract },
    id,
    owner: {
      wallet: { address: ownerAddress }
    }
  } = nft
  const { chainId } = contract
  const client = getViemClient(chainId)
  const approved = await client.readContract({
    abi: erc721ABI,
    functionName: erc721FunctionNames.isApprovedForAll,
    address: formatAddress(contract),
    args: [ownerAddress, getEchoAddress(chainId)]
  })
  if (!approved) {
    throw Error(`${ownerAddress} has not approved nft ${id}`)
  }
}
