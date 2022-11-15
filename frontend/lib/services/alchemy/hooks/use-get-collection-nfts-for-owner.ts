import { useAlchemy } from '@echo/frontend/components/providers/alchemy-provider'
import { FetchNftsError } from '@echo/frontend/lib/services/alchemy/errors/fetch-error'
import { mapNftResponseToErc721 } from '@echo/frontend/lib/services/alchemy/mappers/map-owned-nft-response'
import { failureResult, Result, successfulResult } from '@echo/frontend/lib/services/swr/models/result'
import { Erc721 } from '@echo/model/src/erc721'
import useSWR from 'swr'
import { useAccount } from 'wagmi'

export function useGetCollectionNftsForOwner(contractAddresses: string[] | undefined) {
  const alchemy = useAlchemy()
  const { address } = useAccount()
  const { data } = useSWR<Result<Erc721[]>>(
    contractAddresses && address && { contractAddresses, address },
    ({ contractAddresses, address }) =>
      alchemy.nft
        .getNftsForOwner(address, { contractAddresses })
        .then((response) => successfulResult(response.ownedNfts.map(mapNftResponseToErc721)))
        .catch((error) => failureResult<Erc721[]>(new FetchNftsError(address, error).message))
  )
  return data
}
