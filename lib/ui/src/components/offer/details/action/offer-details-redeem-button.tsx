'use client'
import type { HexString } from '@echo/model/types/hex-string'
import type { Offer } from '@echo/model/types/offer'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { isOfferRoleReceiver } from '@echo/ui/helpers/offer/is-offer-role-receiver'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { timestampIsPast } from '@echo/utils/helpers/timestamp-is-past'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  show?: boolean
  disabled?: boolean
  onClick?: VoidFunction
  onError?: VoidFunction
  onSuccess?: (offer: OfferWithRole) => void
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
  // we need to check the expiration date rather than the state here, because the offer can be expired, but in another final state (e.g. REJECTED)
  const isRedeemable = timestampIsPast(offer.expiresAt)
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
