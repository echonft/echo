'use client'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { ModalSubtitle } from '@echo/ui/components/layout/modal/modal-subtitle'
import { OfferDetailsApproveContract } from '@echo/ui/components/offer/details/offer-details-approve-contract'
import { OfferItemsApprovalChecker } from '@echo/ui/components/offer/details/offer-items-approval-checker'
import { OfferItemsOwnerChecker } from '@echo/ui/components/offer/details/offer-items-owner-checker'
import { getOfferItemsUniqueContracts } from '@echo/ui/helpers/offer/get-offer-items-unique-contracts'
import { ContractApprovalStatus } from '@echo/ui/types/model/contract-approval-status'
import { Offer } from '@echo/ui/types/model/offer'
import { addToArrayIfNotPresent } from '@echo/utils/array/add-to-array-if-not-present'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { find } from 'ramda'
import { FunctionComponent, useCallback, useMemo, useState } from 'react'

interface Props {
  offer: Offer
}

export const OfferDetailsAcceptModal: FunctionComponent<Props> = ({ offer }) => {
  const t = useTranslations('offer.details.acceptModal')
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [receiverAssetsOwned, setReceiverAssetsOwned] = useState<boolean>()
  const [senderAssetsOwned, setSenderAssetsOwned] = useState<boolean>()
  const [approvalStatuses, setApprovalStatuses] = useState<ContractApprovalStatus[]>([])
  const uniqueContracts = useMemo(() => getOfferItemsUniqueContracts(offer.receiverItems), [offer])

  const getContractToApprove = useCallback(
    () => find((status: ContractApprovalStatus) => !status.approved)(approvalStatuses)?.contract,
    [approvalStatuses]
  )
  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('subtitle')}</ModalSubtitle>
        <div className={clsx('flex', 'flex-col', 'gap-2')}>
          <OfferItemsOwnerChecker
            title={t('counterpartyAssets')}
            offerItems={offer.senderItems}
            ownerAddress={offer.sender.wallet.address}
            onError={() => setSenderAssetsOwned(false)}
            onResponse={setSenderAssetsOwned}
          />
          <OfferItemsOwnerChecker
            title={t('ownerAssets')}
            offerItems={offer.receiverItems}
            ownerAddress={offer.receiver.wallet.address}
            onError={() => setReceiverAssetsOwned(false)}
            onResponse={setReceiverAssetsOwned}
          />
          {uniqueContracts.map((contract) => (
            <OfferItemsApprovalChecker
              key={contract.address}
              contract={contract}
              ownerAddress={offer.receiver.wallet.address}
              title={t('approval', { collectionName: contract.name })}
              onResponse={(approved) => {
                setApprovalStatuses((prevState) =>
                  //  FIXME: Need to update if present
                  addToArrayIfNotPresent(
                    prevState,
                    { contract, approved },
                    (source) => (target) =>
                      source.contract.address === target.contract.address &&
                      source.contract.chainId === target.contract.chainId
                  )
                )
              }}
            />
          ))}
        </div>
        <HideIfNil
          checks={getContractToApprove()}
          render={(contract) => (
            <OfferDetailsApproveContract contract={contract} ownerAddress={offer.receiver.wallet.address} />
          )}
        />
      </div>
    </Modal>
  )
}
