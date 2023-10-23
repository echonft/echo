'use client'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { getItemsContracts } from '@echo/model/helpers/item/get-items-contracts'
import type { Contract } from '@echo/model/types/contract'
import type { Offer } from '@echo/model/types/offer'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { ModalSubtitle } from '@echo/ui/components/layout/modal/modal-subtitle'
import { OfferDetailsSwapModalButtons } from '@echo/ui/components/offer/details/action/offer-details-swap-modal-buttons'
import { OfferItemsApprovalChecker } from '@echo/ui/components/offer/details/offer-items-approval-checker'
import type { ContractApprovalStatus } from '@echo/ui/types/contract-approval-status'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { ErrorFunction } from '@echo/utils/types/error-function'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { any, applySpec, assoc, find, identity, isNil, map, pipe, prop, propEq, unless, when } from 'ramda'
import { type FunctionComponent, useState } from 'react'
import useSWR from 'swr'
import { useNetwork } from 'wagmi'

interface Props {
  offer: Offer
  open: boolean
  token: string
  getOfferSignatureFetcher: (offerId: string, token: string | undefined) => Promise<OfferSignatureResponse>
  onClose?: EmptyFunction
  onSuccess?: EmptyFunction
  onError?: ErrorFunction
}

export const OfferDetailsSwapModal: FunctionComponent<Props> = ({
  offer,
  open,
  token,
  getOfferSignatureFetcher,
  onClose,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.swapModal')
  // TODO Maybe we should add a line to check for the chain and if hes connected.
  // Because if wallet is locked it doesn't show as connected.
  const { chain } = useNetwork()
  const { data: signatureResponse } = useSWR<
    OfferSignatureResponse,
    Error,
    { offerId: string; token: string } | undefined
  >(open ? { offerId: offer.id, token } : undefined, ({ offerId, token }) => getOfferSignatureFetcher(offerId, token), {
    onError
  })
  const contracts = getItemsContracts(offer.senderItems)
  const [approvalStatuses, setApprovalStatuses] = useState<ContractApprovalStatus[]>(
    map(applySpec<ContractApprovalStatus>({ contract: identity }), contracts)
  )
  const approvalPending = any(propIsNil('approved'))(approvalStatuses)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const contractToApprove = pipe(find(propEq(false, 'approved')), unless(isNil, prop('contract')))(approvalStatuses) as
    | Contract
    | undefined
  const updateApprovalStatus = (contract: Contract, approved: boolean) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setApprovalStatuses(map(when(propEq(contract, 'contract'), assoc('approved', approved))))
  }

  return (
    <Modal open={open} onClose={onClose} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('subtitle')}</ModalSubtitle>
        <div className={clsx('flex', 'flex-col', 'gap-2')}>
          {/*<OfferItemsOwnerChecker*/}
          {/*  title={t('counterpartyAssets')}*/}
          {/*  offerItems={offer.receiverItems}*/}
          {/*  ownerAddress={offer.receiver.wallet.address}*/}
          {/*  onError={() => updateOwnsAllAssets(false)}*/}
          {/*  onResponse={updateOwnsAllAssets}*/}
          {/*/>*/}
          {/*<OfferItemsOwnerChecker*/}
          {/*  title={t('ownerAssets')}*/}
          {/*  offerItems={offer.senderItems}*/}
          {/*  ownerAddress={offer.sender.wallet.address}*/}
          {/*  onError={() => updateOwnsAllAssets(false)}*/}
          {/*  onResponse={updateOwnsAllAssets}*/}
          {/*/>*/}
          {/*<OfferItemsMultipleApprovalChecker*/}
          {/*  contracts={uniqueReceiverContracts}*/}
          {/*  ownerAddress={offer.receiver.wallet.address}*/}
          {/*  title={t('counterpartyApproval')}*/}
          {/*/>*/}
          {map(
            (contract) => (
              <OfferItemsApprovalChecker
                key={contract.address}
                contract={contract}
                ownerAddress={offer.sender.wallet.address}
                title={t('approval', { collectionName: contract.name })}
                onResponse={(approved) => updateApprovalStatus(contract, approved)}
              />
            ),
            contracts
          )}
        </div>
        <OfferDetailsSwapModalButtons
          offer={offer}
          signature={signatureResponse?.signature}
          contract={contractToApprove}
          chainId={chain?.id}
          approvalPending={approvalPending}
          onSuccess={onSuccess}
          onError={onError}
        />
      </div>
    </Modal>
  )
}
