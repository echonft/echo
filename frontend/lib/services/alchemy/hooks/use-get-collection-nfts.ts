import { useAlchemy } from '@echo/frontend/components/providers/alchemy-provider'
import { FetchContractsNftsError } from '@echo/frontend/lib/services/alchemy/errors/fetch-error'
import { mapNftResponseToErc721 } from '@echo/frontend/lib/services/alchemy/mappers/map-owned-nft-response'
import { failureResult, Result, successfulResult } from '@echo/frontend/lib/services/swr/models/result'
import { laggy } from '@echo/frontend/lib/services/swr/utils/laggy'
import { Erc721 } from '@echo/model/src/erc721'
import { flatten } from 'ramda'
import useSWR from 'swr'

export function useGetCollectionNfts(contractAddresses: string[] | undefined, useLaggy?: boolean) {
  const alchemy = useAlchemy()
  const { data } = useSWR<Result<Erc721[]>>(
    contractAddresses && { contractAddresses },
    ({ contractAddresses }) =>
      Promise.all(
        contractAddresses.map((contractAddress: string) =>
          alchemy.nft
            .getNftsForContract(contractAddress)
            .then((result) => result.nfts.map((nft) => mapNftResponseToErc721(nft)))
        )
      )
        .then((results) => successfulResult(flatten(results)))
        .catch((error) => failureResult<Erc721[]>(new FetchContractsNftsError(contractAddresses, error).message)),
    useLaggy ? { use: [laggy] } : undefined
  )
  return data
}
