'use client'
import { OfferState } from '@echo/model/constants/offer-state'
import type { HexString } from '@echo/model/types/hex-string'
import type { Offer } from '@echo/model/types/offer'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { isOfferRoleReceiver } from '@echo/ui/helpers/offer/is-offer-role-receiver'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  show?: boolean
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: (offer: OfferWithRole) => unknown
  onError?: EmptyFunction
}

// TODO ERC20
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
  const { cancelOffer, redeemOffer } = useDependencies()
  const count = isOfferRoleReceiver(offer) ? offer.receiverItems.length : offer.senderItems.length
  const isRedeemable = offer.state === OfferState.Expired
  // In the case the offer is rejected (frontend only), user can redeem by cancelling.
  // Otherwise we use the redeem contract call
  const { trigger: triggerContractCancel } = useSWRTrigger<HexString, Offer['idContract']>({
    key: SWRKeys.offer.contractCancel(offer),
    fetcher: cancelOffer,
    onSuccess: (_response) => {
      onSuccess?.(offer)
    },
    onError: {
      alert: {
        severity: CalloutSeverity.Error,
        message: tError('cancel', {
          count
        })
      },
      onError,
      loggerContext: {
        component: OfferDetailsRedeemButton.name,
        fetcher: cancelOffer.name,
        offer
      }
    }
  })
  const { trigger: triggerContractRedeem } = useSWRTrigger<HexString, Offer['idContract']>({
    key: SWRKeys.offer.contractRedeem(offer),
    fetcher: redeemOffer,
    onSuccess: (_response) => {
      onSuccess?.(offer)
    },
    onError: {
      alert: {
        severity: CalloutSeverity.Error,
        message: tError('redeem', {
          count
        })
      },
      onError,
      loggerContext: {
        offer
      }
    }
  })
  if (show) {
    return (
      <button
        className={clsx('btn-gradient', 'group', disabled && 'animate-pulse')}
        disabled={disabled}
        onClick={() => {
          if (isRedeemable) {
            void triggerContractRedeem(offer.idContract)
          } else {
            void triggerContractCancel(offer.idContract)
          }
          onClick?.()
        }}
      >
        <span className={clsx('btn-label-gradient')}>{t('redeemBtn.label', { count })}</span>
      </button>
    )
  }
  return null
}
