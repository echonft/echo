'use client'
import { OFFER_STATE_EXPIRED } from '@echo/model/constants/offer-states'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import type { Nft } from '@echo/model/types/nft'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { isOfferRoleReceiver } from '@echo/ui/helpers/offer/is-offer-role-receiver'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ContractUpdateOfferArgs } from '@echo/web3-dom/types/contract-update-offer-args'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { head, path, pipe, prop } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  show?: boolean
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: (offer: OfferWithRole) => unknown
  onError?: EmptyFunction
}

export const OfferDetailsRedeemButton: FunctionComponent<Props> = ({
  offer,
  show,
  disabled,
  onClick,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details')
  const tError = useTranslations('error.offer')
  const { contractCancelOffer, contractRedeemOffer } = useDependencies()
  const chain = pipe<[OfferWithRole], Nft[], Nft, ChainName>(
    prop('receiverItems'),
    head,
    nonNullableReturn(path(['collection', 'contract', 'chain']))
  )(offer)
  const count = isOfferRoleReceiver(offer) ? offer.receiverItems.length : offer.senderItems.length
  const isRedeemable = offer.state === OFFER_STATE_EXPIRED || offer.expiresAt < Date.now()
  // In the case the offer is rejected (frontend only), user can redeem by cancelling.
  // Otherwise we use the redeem contract call
  const { trigger: triggerContractCancel } = useSWRTrigger<HexString, ContractUpdateOfferArgs>({
    key: SWRKeys.offer.contractCancel(offer),
    fetcher: contractCancelOffer,
    onSuccess: (_response) => {
      onSuccess?.(offer)
    },
    onError: {
      contexts: offerContext(offer),
      alert: {
        severity: CALLOUT_SEVERITY_ERROR,
        message: tError('cancel', {
          count
        })
      },
      onError
    }
  })
  const { trigger: triggerContractRedeem } = useSWRTrigger<HexString, ContractUpdateOfferArgs>({
    key: SWRKeys.offer.contractRedeem(offer),
    fetcher: contractRedeemOffer,
    onSuccess: (_response) => {
      onSuccess?.(offer)
    },
    onError: {
      contexts: offerContext(offer),
      alert: {
        severity: CALLOUT_SEVERITY_ERROR,
        message: tError('cancel', {
          count
        })
      },
      onError
    }
  })
  if (show) {
    return (
      <button
        className={clsx('btn-gradient', 'btn-size', 'group', disabled && 'animate-pulse')}
        disabled={disabled}
        onClick={() => {
          if (isRedeemable) {
            void triggerContractRedeem({ offerId: offer.idContract, chain })
          } else {
            void triggerContractCancel({ offerId: offer.idContract, chain })
          }
          onClick?.()
        }}
      >
        <span className={clsx('prose-label-lg', 'btn-label-gradient')}>
          {t(disabled ? 'redeemBtn.loading' : 'redeemBtn.label', { count })}
        </span>
      </button>
    )
  }
  return null
}
