'use client'
import { linkProvider } from '@echo/api/routing/link-provider'
import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { DEFAULT_EXPIRATION_TIME } from '@echo/model/constants/default-expiration-time'
import { getNftIndexForNfts } from '@echo/model/helpers/nft/get-nft-index-for-nfts'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { CreateOffer } from '@echo/ui/components/offer/create/create-offer'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  receiver: User
  receiverItems: Nft[]
  senderNfts: SelectableNft[]
}

export const CreateOfferManager: FunctionComponent<Props> = ({ receiver, receiverItems, senderNfts }) => {
  const t = useTranslations('error.offer')
  const router = useRouter()
  const { createOffer, getAccount } = useDependencies()
  const { account: sender } = getAccount()
  const { trigger, isMutating } = useSWRTrigger<OfferResponse, CreateOfferRequest>({
    key: SWRKeys.offer.create,
    fetcher: createOffer,
    onSuccess: (response) => {
      router.replace(linkProvider.offer.details.get({ slug: response.offer.slug }))
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('new') }
    }
  })

  return (
    <CreateOffer
      receiver={receiver}
      receiverItems={receiverItems}
      senderNfts={senderNfts}
      loading={isMutating}
      onComplete={(senderSelection) => {
        if (isNil(sender.wallet)) {
          // TODO we need to connect the wallet
        } else {
          void trigger({
            senderItems: getNftIndexForNfts(senderSelection),
            receiverItems: getNftIndexForNfts(receiverItems),
            // FIXME expiration should be set
            expiresAt: dayjs().add(DEFAULT_EXPIRATION_TIME, 'day').unix()
          })
        }
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}
