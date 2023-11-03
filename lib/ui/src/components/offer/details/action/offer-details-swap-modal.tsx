'use client'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import type { Offer } from '@echo/model/types/offer'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { ModalSubtitle } from '@echo/ui/components/layout/modal/modal-subtitle'
import { OfferDetailsSwapModalButton } from '@echo/ui/components/offer/details/action/offer-details-swap-modal-button'
import { OfferDetailsApprovalModalBody } from '@echo/ui/components/offer/details/offer-details-approval-modal-body'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { captureException } from '@sentry/nextjs'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'
import useSWR from 'swr'
import { useNetwork } from 'wagmi'

interface Props {
  offer: Offer
  open: boolean
  token: string
  getOfferSignatureFetcher: (offerId: string, token: string | undefined) => Promise<OfferSignatureResponse>
  completeOfferFetcher: (
    offerId: string,
    transactionId: HexString | undefined,
    token: string | undefined
  ) => Promise<EmptyResponse>
  onClose?: EmptyFunction
  onSuccess?: EmptyFunction
  onError?: EmptyFunction
}

export const OfferDetailsSwapModal: FunctionComponent<Props> = ({
  offer,
  open,
  token,
  getOfferSignatureFetcher,
  completeOfferFetcher,
  onClose,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.swapModal')
  // TODO Maybe we should add a line to check for the chain and if hes connected.
  // Because if wallet is locked it doesn't show as connected.
  const { chain } = useNetwork()
  const [isCompleting, setIsCompleting] = useState<boolean>(false)
  const { data: signatureResponse } = useSWR<
    OfferSignatureResponse,
    Error,
    { offerId: string; token: string } | undefined
  >(open ? { offerId: offer.id, token } : undefined, ({ offerId, token }) => getOfferSignatureFetcher(offerId, token), {
    onError: (err) => {
      captureException(err, {
        contexts: offerContext(offer)
      })
    }
  })
  const [approved, setApproved] = useState(false)

  return (
    <Modal open={open} onClose={onClose} title={t('title')} closeDisabled={isCompleting}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('subtitle')}</ModalSubtitle>
        <HideIf condition={approved}>
          <OfferDetailsApprovalModalBody
            items={offer.senderItems}
            onApproved={() => {
              setApproved(true)
            }}
          />
        </HideIf>
        <ShowIf condition={approved}>
          <OfferDetailsSwapModalButton
            offer={offer}
            token={token}
            signature={signatureResponse?.signature}
            completeOfferFetcher={completeOfferFetcher}
            chainId={chain?.id}
            onLoading={() => {
              setIsCompleting(true)
            }}
            onSuccess={() => {
              setIsCompleting(false)
              onSuccess?.()
            }}
            onError={() => {
              setIsCompleting(false)
              onError?.()
            }}
          />
        </ShowIf>
      </div>
    </Modal>
  )
}
