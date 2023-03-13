import { useAlchemy } from '@components/providers/alchemy-provider'
import { Nft } from '@echo/model'
import { laggy } from '@lib/../../../../../../../lib/swr/src/utils/laggy'
import { FetchContractsNftsError } from '@lib/services/alchemy/errors/fetch-error'
import { mapNftResponseToErc721 } from '@lib/services/alchemy/mappers/map-owned-nft-response'
import { failureResult, Result, successfulResult } from '@lib/services/swr/models/result'
import { flatten, isEmpty, isNil } from 'ramda'
import useSWR from 'swr'

interface Key {
  contractAddresses: string[]
}
export function useGetCollectionNfts(contractAddresses: string[] | undefined, useLaggy?: boolean) {
  const alchemy = useAlchemy()
  const { data } = useSWR<Result<Nft[]>, Error, Key | undefined>(
    !isNil(contractAddresses) && !isEmpty(contractAddresses) ? { contractAddresses } : undefined,
    ({ contractAddresses }) =>
      Promise.all<Nft[]>(
        contractAddresses.map((contractAddress: string) =>
          alchemy.nft
            .getNftsForContract(contractAddress)
            .then((result) => result.nfts.map((nft) => mapNftResponseToErc721(nft)))
        )
      )
        .then((results) => successfulResult<Nft[]>(flatten(results)))
        .catch((error) => failureResult(new FetchContractsNftsError(contractAddresses, error as Error).message)),
    useLaggy ? { use: [laggy] } : undefined
  )
  return data
}
