'use-client'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import type { Offer } from '@echo/model/types/offer'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { OfferDetailsSwapModal } from '@echo/ui/components/offer/details/action/offer-details-swap-modal'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { ErrorFunction } from '@echo/utils/types/error-function'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offer: Offer
  token: string
  getOfferSignatureFetcher: (offerId: string, token: string | undefined) => Promise<OfferSignatureResponse>
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: EmptyFunction
  onCancel?: EmptyFunction
  onError?: ErrorFunction
}

export const OfferDetailsSwapButton: FunctionComponent<Props> = ({
  offer,
  token,
  getOfferSignatureFetcher,
  disabled,
  onClick,
  onSuccess,
  onCancel,
  onError
}) => {
  const t = useTranslations('offer.details')
  const [modalShown, setModalShown] = useState(false)

  return (
    <>
      <button
        className={clsx('btn-cancel', 'btn-size-alt', 'group')}
        onClick={() => {
          onClick?.()
          setModalShown(true)
        }}
        disabled={disabled}
      >
        <span className={clsx('prose-label-lg', 'btn-label-cancel')}>{t('completeBtn')}</span>
      </button>
      <Web3Provider>
        <OfferDetailsSwapModal
          open={modalShown}
          offer={offer}
          token={token}
          getOfferSignatureFetcher={getOfferSignatureFetcher}
          onSuccess={onSuccess}
          onError={onError}
          onClose={onCancel}
        />
      </Web3Provider>
    </>
  )
}
