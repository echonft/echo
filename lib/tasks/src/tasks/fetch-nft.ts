import { isTestnetChain } from '@echo/model/helpers/chain/is-testnet-chain'
import type { Contract } from '@echo/model/types/contract'
import { getNft as getNftFromNftScan } from '@echo/nft-scan/services/get-nft'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { getNft as getNftFromOpenSea } from '@echo/opensea/services/get-nft'
import { error, info } from '@echo/tasks/helpers/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { otherwise, pipe } from 'ramda'

interface FetchNftArgs {
  contract: Contract
  tokenId: string
}

/**
 * Fetches an NFT from the API
 * We use OpenSea API on testnet and NFTScan on mainnet
 * @param { contract, tokenId }
 */
export async function fetchNft({ contract, tokenId }: FetchNftArgs): Promise<Nullable<PartialNft>> {
  const fetcher = isTestnetChain(contract.chain) ? getNftFromOpenSea : getNftFromNftScan
  info({ nft: { collection: { contract }, tokenId } }, 'fetching NFT')
  return pipe(
    fetcher,
    otherwise((err) => {
      error({ err, nft: { collection: { contract }, tokenId } }, 'could not fetch NFT from API')
      return undefined
    })
  )({ contract, identifier: tokenId })
}
