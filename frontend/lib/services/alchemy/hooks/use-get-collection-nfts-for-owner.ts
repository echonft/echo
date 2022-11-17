import { useAlchemy } from '@components/providers/alchemy-provider'
import { Erc721 } from '@echo/model/erc721'
import { FetchNftsError } from '@lib/services/alchemy/errors/fetch-error'
import { mapNftResponseToErc721 } from '@lib/services/alchemy/mappers/map-owned-nft-response'
import { failureResult, Result, successfulResult } from '@lib/services/swr/models/result'
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
