import { useAlchemy } from '@components/providers/alchemy-provider'
import { Nft } from '@echo/model'
import { FetchNftsError } from '@lib/services/alchemy/errors/fetch-error'
import { mapNftResponseToErc721 } from '@lib/services/alchemy/mappers/map-owned-nft-response'
import { failureResult, Result, successfulResult } from '@lib/services/swr/models/result'
import { isEmpty, isNil } from 'ramda'
import useSWR from 'swr'
import { useAccount } from 'wagmi'

interface Key {
  address: string
  contractAddresses: string[]
}
export function useGetCollectionNftsForOwner(contractAddresses: string[] | undefined) {
  const alchemy = useAlchemy()
  const { address } = useAccount()
  const { data } = useSWR<Result<Nft[]>, Error, Key | undefined>(
    !isNil(contractAddresses) && !isEmpty(contractAddresses) && !isNil(address) && !isEmpty(address)
      ? { contractAddresses, address }
      : undefined,
    ({ contractAddresses, address }) =>
      alchemy.nft
        .getNftsForOwner(address, { contractAddresses })
        .then((response) => successfulResult(response.ownedNfts.map(mapNftResponseToErc721)))
        .catch((error) => failureResult<Nft[]>(new FetchNftsError(address, error as Error).message))
  )
  return data
}
