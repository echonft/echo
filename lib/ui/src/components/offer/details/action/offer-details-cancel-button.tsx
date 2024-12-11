'use client'
import { OfferState } from '@echo/model/constants/offer-state'
import type { HexString } from '@echo/model/types/hex-string'
import type { Offer } from '@echo/model/types/offer'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { useTranslations } from 'next-intl'
import { assoc, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  show?: boolean
  disabled?: boolean
  onClick?: VoidFunction
  onError?: VoidFunction
  onSuccess?: (offer: OfferWithRole) => void
}

// TODO ERC20 + ERC1155
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
  const { cancelOffer } = useDependencies()

  const { trigger: triggerContractCancel } = useSWRTrigger<HexString, Offer['idContract']>({
    key: SWRKeys.offer.contractCancel(offer),
    fetcher: cancelOffer,
    onSuccess: (_response) => {
      onSuccess?.(
        pipe<[OfferWithRole], OfferWithRole, OfferWithRole>(
          assoc('state', OfferState.Cancelled),
          assoc('locked', true)
        )(offer)
      )
    },
    onError: {
      alert: { severity: CalloutSeverity.Error, message: tError('cancel') },
      onError,
      loggerContext: {
        offer
      }
    }
  })

  if (show) {
    return (
      <LongPressButton
        id={offer.slug}
        label={t('label')}
        message={t('message')}
        disabled={disabled}
        onFinish={() => {
          onClick?.()
          void triggerContractCancel(offer.idContract)
        }}
      />
    )
  }
  return null
}
