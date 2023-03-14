import { useAlchemy } from '@components/providers/alchemy-provider'
import { Nft, OfferItem } from '@echo/model'
import { FetchNftsError } from '@lib/services/alchemy/errors/fetch-error'
import { mapNftResponseToErc721 } from '@lib/services/alchemy/mappers/map-owned-nft-response'
import { failureResult, Result, successfulResult } from '@lib/services/swr/models/result'
import { flatten, isEmpty, isNil, join } from 'ramda'
import useSWR from 'swr'

interface Key {
  items: OfferItem[]
}
export function useGetNftsForItems(items: OfferItem[] | undefined) {
  const alchemy = useAlchemy()
  const { data } = useSWR<Result<Nft[]>, Error, Key | undefined>(
    !isNil(items) && !isEmpty(items) ? { items } : undefined,
    ({ items }) =>
      Promise.all(
        items
          .filter((item: OfferItem) => !isNil(item.id))
          .map((item: OfferItem) =>
            alchemy.nft.getNftMetadata(item.contractAddress, item.id!).then((result) => mapNftResponseToErc721(result))
          )
      )
        .then((results) => successfulResult<Nft[]>(flatten(results)))
        .catch((error) =>
          failureResult(
            new FetchNftsError(
              join(
                ',',
                items.map((item: OfferItem) => item.contractAddress)
              ),
              error as Error
            ).message
          )
        )
  )
  return data
}
