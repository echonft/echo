'use client'
import { OFFER_STATE_CANCELLED } from '@echo/model/constants/offer-states'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ContractUpdateOfferArgs } from '@echo/web3-dom/types/contract-update-offer-args'
import { useTranslations } from 'next-intl'
import { assoc, head, type NonEmptyArray, path, pipe, prop } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  show?: boolean
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: (offer: OfferWithRole) => unknown
  onError?: EmptyFunction
}

export const OfferDetailsCancelButton: FunctionComponent<Props> = ({
  offer,
  show,
  disabled,
  onClick,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.cancelBtn')
  const tError = useTranslations('error.offer')
  const { contractCancelOffer } = useDependencies()
  const chain = pipe<[OfferWithRole], NonEmptyArray<OwnedNft>, OwnedNft, ChainName>(
    prop('receiverItems'),
    head,
    nonNullableReturn(path(['collection', 'contract', 'chain']))
  )(offer)

  const { trigger: triggerContractCancel } = useSWRTrigger<HexString, ContractUpdateOfferArgs>({
    key: SWRKeys.offer.contractCancel(offer),
    fetcher: contractCancelOffer,
    onSuccess: (_response) => {
      onSuccess?.(
        pipe<[OfferWithRole], OfferWithRole, OfferWithRole>(
          assoc('state', OFFER_STATE_CANCELLED),
          assoc('readOnly', true)
        )(offer)
      )
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('cancel') },
      onError,
      loggerContext: {
        component: OfferDetailsCancelButton.name,
        fetcher: contractCancelOffer.name,
        offer
      }
    }
  })

  if (show) {
    return (
      <LongPressButton
        id={offer.slug}
        label={t(disabled ? 'loading' : 'label')}
        message={t('message')}
        disabled={disabled}
        onFinish={() => {
          onClick?.()
          void triggerContractCancel({ offerId: offer.idContract, chain })
        }}
      />
    )
  }
  return null
}
