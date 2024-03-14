'use client'
import type { GetOfferSignatureArgs } from '@echo/api/types/fetchers/get-offer-signature-args'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import { OfferDetailsSwapExecuteModal } from '@echo/ui/components/offer/details/action/swap/offer-details-swap-execute-modal'
import { OfferDetailsContractApprovalModal } from '@echo/ui/components/offer/details/offer-details-contract-approval-modal'
import { ConnectWalletModal } from '@echo/ui/components/wallet/connect-wallet-modal'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { captureException } from '@sentry/nextjs'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'
import useSWR from 'swr'

interface Props {
  offer: OfferWithRole
  open: boolean
  onClose?: EmptyFunction
  onSuccess?: (offer: OfferWithRole) => unknown
}

export const OfferDetailsSwapModal: FunctionComponent<Props> = ({ offer, open, onClose, onSuccess }) => {
  const t = useTranslations('offer.details.swapModal')
  const { getOfferSignature } = useDependencies()
  const [approved, setApproved] = useState(false)
  const { status } = useAccount()
  const { data: signatureResponse } = useSWR<
    OfferSignatureResponse,
    Error,
    (GetOfferSignatureArgs & Record<'name', string>) | undefined
  >(open ? { name: SWRKeys.offer.getSignature(offer), offerId: offer.id } : undefined, getOfferSignature, {
    onError: (err) => {
      captureException(err, {
        contexts: offerContext(offer)
      })
    }
  })

  if (status !== 'connected') {
    return <ConnectWalletModal open={open} onClose={onClose} />
  }

  if (approved) {
    return (
      <OfferDetailsSwapExecuteModal
        offer={offer}
        signature={signatureResponse?.signature}
        open={open}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    )
  }

  return (
    <OfferDetailsContractApprovalModal
      items={offer.senderItems}
      open={open}
      title={t('title')}
      subtitle={t('approval.subtitle')}
      onSuccess={() => {
        setApproved(true)
      }}
      onClose={onClose}
    />
  )
}
