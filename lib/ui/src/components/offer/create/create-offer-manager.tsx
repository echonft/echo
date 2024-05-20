'use client'
import { DEFAULT_EXPIRATION_TIME } from '@echo/model/constants/default-expiration-time'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { CreateOffer } from '@echo/ui/components/offer/create/create-offer'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { mapItemsToRequests } from '@echo/ui/mappers/to-api/map-items-to-requests'
import { mapNftsToItems } from '@echo/ui/mappers/to-api/map-nfts-to-items'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import type { HexString } from '@echo/utils/types/hex-string'
import type { CreateOfferArgs } from '@echo/web3-dom/types/create-offer-args'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { isNil, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  receiver: User
  receiverItems: Nft[]
  senderNfts: SelectableNft[]
}

export const CreateOfferManager: FunctionComponent<Props> = ({ receiver, receiverItems, senderNfts }) => {
  const t = useTranslations('error.offer')
  const router = useRouter()
  const { chainId } = useAccount()
  const { createOffer, getAccount } = useDependencies()
  const { account: sender } = getAccount()
  const { trigger, isMutating } = useSWRTrigger<HexString, CreateOfferArgs>({
    key: SWRKeys.offer.create,
    fetcher: createOffer,
    onSuccess: (response) => {
      // router.replace(linkProvider.offer.details.get({ offerId: response.offer.id }))
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
        if (isNil(sender.address)) {
          // TODO we need to connect the wallet
        } else {
          void trigger({
            sender: sender.address,
            receiver: receiver.wallet.address,
            senderItems: pipe(mapNftsToItems, mapItemsToRequests)(senderSelection),
            receiverItems: pipe(mapNftsToItems, mapItemsToRequests)(receiverItems),
            expiration: DEFAULT_EXPIRATION_TIME,
            chainId
          })
        }
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}
