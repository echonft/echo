import { useAlchemy } from '@echo/frontend/components/providers/alchemy-provider'
import { FetchNftsError } from '@echo/frontend/lib/services/alchemy/errors/fetch-error'
import { mapNftResponseToErc721 } from '@echo/frontend/lib/services/alchemy/mappers/map-owned-nft-response'
import { failureResult, Result, successfulResult } from '@echo/frontend/lib/services/swr/models/result'
import { Erc721 } from '@echo/model/src/erc721'
import { OfferItem } from '@echo/model/src/offer-item'
import { flatten, isNil, join } from 'ramda'
import useSWR from 'swr'

export function useGetNftsForItems(items: OfferItem[] | undefined) {
  const alchemy = useAlchemy()
  const { data } = useSWR<Result<Erc721[]>>(items && { items }, ({ items }) =>
    Promise.all(
      items
        .filter((item: OfferItem) => !isNil(item.id))
        .map((item: OfferItem) =>
          alchemy.nft.getNftMetadata(item.contractAddress, item.id!).then((result) => mapNftResponseToErc721(result))
        )
    )
      .then((results) => successfulResult(flatten(results)))
      .catch((error) =>
        failureResult<Erc721[]>(
          new FetchNftsError(
            join(
              ',',
              items.map((item: OfferItem) => item.contractAddress)
            ),
            error
          ).message
        )
      )
  )
  return data
}
