'use client'
import { linkProvider } from '@echo/api/routing/link-provider'
import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { OfferItem } from '@echo/model/types/offer-item'
import type { User } from '@echo/model/types/user'
import { CreateOffer } from '@echo/ui/components/offer/create/create-offer'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { mapItemsToRequests } from '@echo/ui/mappers/to-api/map-items-to-requests'
import { mapNftToItem } from '@echo/ui/mappers/to-api/map-nft-to-item'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { map, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  receiver: User
  receiverItems: OfferItem[]
  senderNfts: SelectableNft[]
}

export const CreateOfferManager: FunctionComponent<Props> = ({ receiver, receiverItems, senderNfts }) => {
  const tError = useTranslations('error.offer')
  const router = useRouter()
  const { createOffer } = useDependencies()

  const { trigger, isMutating } = useSWRTrigger<OfferResponse, CreateOfferRequest>({
    key: SWRKeys.offer.create,
    fetcher: createOffer,
    onSuccess: (response) => {
      router.replace(linkProvider.offer.details.get({ offerId: response.offer.id }))
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('new') }
    }
  })

  return (
    <CreateOffer
      receiver={receiver}
      receiverItems={receiverItems}
      senderNfts={senderNfts}
      loading={isMutating}
      onComplete={(senderSelection) => {
        void trigger({
          senderItems: pipe(map(mapNftToItem), mapItemsToRequests)(senderSelection),
          receiverItems: mapItemsToRequests(receiverItems)
        })
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}
