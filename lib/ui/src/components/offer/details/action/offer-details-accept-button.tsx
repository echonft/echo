'use-client'
import { type EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { Offer } from '@echo/model/types/offer'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { OfferDetailsAcceptModal } from '@echo/ui/components/offer/details/action/offer-details-accept-modal'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { ErrorFunction } from '@echo/utils/types/error-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offer: Offer
  token: string
  acceptOfferFetcher: (
    offerId: string,
    signature: HexString | undefined,
    token: string | undefined
  ) => Promise<EmptyResponse>
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: EmptyFunction
  onCancel?: EmptyFunction
  onError?: ErrorFunction
}

export const OfferDetailsAcceptButton: FunctionComponent<Props> = ({
  offer,
  token,
  acceptOfferFetcher,
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
        className={clsx('btn-gradient', 'btn-size-alt', 'group')}
        onClick={() => {
          onClick?.()
          setModalShown(true)
        }}
        disabled={disabled}
      >
        <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('acceptBtn')}</span>
      </button>
      <Web3Provider>
        <OfferDetailsAcceptModal
          open={modalShown}
          offer={offer}
          token={token}
          acceptOfferFetcher={acceptOfferFetcher}
          onSuccess={() => {
            setModalShown(false)
            onSuccess?.()
          }}
          onError={(error) => {
            setModalShown(false)
            onError?.(error)
          }}
          onClose={() => {
            setModalShown(false)
            onCancel?.()
          }}
        />
      </Web3Provider>
    </>
  )
}
