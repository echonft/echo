'use client'
import type { CancelOfferArgs } from '@echo/api/types/fetchers/cancel-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { Nft } from '@echo/model/types/nft'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ContractUpdateOfferArgs } from '@echo/web3-dom/types/contract-update-offer-args'
import { useTranslations } from 'next-intl'
import { assoc, head, path, pipe, prop } from 'ramda'
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
  const { cancelOffer, contractCancelOffer, logger } = useDependencies()
  const chain = pipe<[OfferWithRole], Nft[], Nft, ChainName>(
    prop('receiverItems'),
    head,
    nonNullableReturn(path(['collection', 'contract', 'chain']))
  )(offer)
  const { trigger: triggerCancel } = useSWRTrigger<OfferResponse, CancelOfferArgs>({
    key: SWRKeys.offer.cancel(offer),
    fetcher: cancelOffer,
    onSuccess: (response) => {
      onSuccess?.(assoc('role', offer.role, response.offer))
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('cancel') },
      onError,
      logger,
      loggerContext: {
        component: OfferDetailsCancelButton.name,
        fn: cancelOffer.name,
        offer
      }
    }
  })

  const { trigger: triggerContractCancel } = useSWRTrigger<HexString, ContractUpdateOfferArgs>({
    key: SWRKeys.offer.contractCancel(offer),
    fetcher: contractCancelOffer,
    onSuccess: (_response) => {
      void triggerCancel({ slug: offer.slug })
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('cancel') },
      onError,
      logger,
      loggerContext: {
        component: OfferDetailsCancelButton.name,
        fn: contractCancelOffer.name,
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
