'use client'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { Offer } from '@echo/model/types/offer'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { ModalSubtitle } from '@echo/ui/components/layout/modal/modal-subtitle'
import { OfferDetailsAcceptModalButton } from '@echo/ui/components/offer/details/action/offer-details-accept-modal-button'
import { OfferDetailsApprovalModalBody } from '@echo/ui/components/offer/details/offer-details-approval-modal-body'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'
import { useNetwork } from 'wagmi'

interface Props {
  offer: Offer
  open: boolean
  token: string
  acceptOfferFetcher: (
    offerId: string,
    signature: HexString | undefined,
    token: string | undefined
  ) => Promise<OfferResponse>
  onClose?: EmptyFunction
  onSuccess?: (offer: Offer) => unknown
  onError?: EmptyFunction
}

export const OfferDetailsAcceptModal: FunctionComponent<Props> = ({
  offer,
  open,
  token,
  acceptOfferFetcher,
  onClose,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.acceptModal')
  // TODO Maybe we should add a line to check for the chain and if hes connected.
  // Because if wallet is locked it doesn't show as connected.
  const { chain } = useNetwork()
  const [approved, setApproved] = useState(false)
  const [isAccepting, setIsAccepting] = useState<boolean>(false)

  return (
    <Modal open={open} onClose={onClose} title={t('title')} closeDisabled={!approved || isAccepting}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('subtitle')}</ModalSubtitle>
        <HideIf condition={approved}>
          <OfferDetailsApprovalModalBody
            items={offer.receiverItems}
            onApproved={() => {
              setApproved(true)
            }}
          />
        </HideIf>
        <ShowIf condition={approved}>
          <OfferDetailsAcceptModalButton
            offer={offer}
            chainId={chain?.id}
            token={token}
            acceptOfferFetcher={acceptOfferFetcher}
            onLoading={() => {
              setIsAccepting(true)
            }}
            onSuccess={(offer: Offer) => {
              setIsAccepting(false)
              onSuccess?.(offer)
            }}
            onError={() => {
              setIsAccepting(false)
              onError?.()
            }}
          />
        </ShowIf>
      </div>
    </Modal>
  )
}
