'use client'
import type { Contract } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ModalSubtitle } from '@echo/ui/components/base/modal/modal-subtitle'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ShowIfNil } from '@echo/ui/components/base/utils/show-if-nil'
import { OfferDetailsApproveContractButton } from '@echo/ui/components/offer/details/offer-details-approve-contract-button'
import { OfferDetailsContractApprovalRow } from '@echo/ui/components/offer/details/offer-details-contract-approval-row'
import { mapOfferItemsToContractApprovals } from '@echo/ui/mappers/map-offer-items-to-contract-approvals'
import type { ContractApproval } from '@echo/ui/types/contract-approval'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { all, assoc, find, isNil, map, pipe, propEq, reject, when } from 'ramda'
import { type FunctionComponent, useCallback, useState } from 'react'

interface Props {
  items: Nft[]
  open: boolean
  title: string
  subtitle: string
  onSuccess?: EmptyFunction
  onClose?: EmptyFunction
}

// TODO Change name of this modal as it's used in the creation flow too
export const OfferDetailsContractApprovalModal: FunctionComponent<Props> = ({
  items,
  open,
  title,
  subtitle,
  onSuccess,
  onClose
}) => {
  const t = useTranslations('offer.details.approveModal')
  const [approvals, setApprovals] = useState<ContractApproval[]>(mapOfferItemsToContractApprovals(items))
  const [isLoading, setIsLoading] = useState(true)
  const contractToApprove = find<ContractApproval>(
    propEq(false, 'approved') as (contractApproval: ContractApproval) => boolean,
    approvals
  )
  const updateApprovalStatus = useCallback(
    (contract: Contract, approved: Nullable<boolean>) => {
      const foundApproval = find(propEq(contract, 'contract'), approvals)
      if (!isNil(foundApproval)) {
        if (pipe(reject(propEq(contract, 'contract')), all(propIsNotNil('approved')))(approvals)) {
          setIsLoading(false)
        }
        if (approved && pipe(reject(propEq(contract, 'contract')), all(propEq(true, 'approved')))(approvals)) {
          onSuccess?.()
        }
        setApprovals(
          map(when<ContractApproval, ContractApproval>(propEq(contract, 'contract'), assoc('approved', approved)))
        )
      }
    },
    [approvals, onSuccess]
  )

  return (
    <Modal open={open} onClose={isLoading ? undefined : onClose} title={title}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{subtitle}</ModalSubtitle>
        <div className={clsx('flex', 'flex-col', 'gap-2')}>
          {map(
            (approval) => (
              <OfferDetailsContractApprovalRow
                key={approval.contract.address}
                contract={approval.contract}
                collectionName={approval.name}
                owner={approval.wallet.address}
                approved={approval.approved}
                onSuccess={updateApprovalStatus}
              />
            ),
            approvals
          )}
        </div>
        <HideIfNil
          checks={contractToApprove}
          render={(contractToApprove) => (
            <OfferDetailsApproveContractButton
              contract={contractToApprove.contract}
              onApproved={(contract, approved) => {
                setIsLoading(false)
                updateApprovalStatus(contract, approved)
              }}
              onLoading={() => {
                setIsLoading(true)
              }}
              onError={() => {
                setIsLoading(false)
                // restart the whole process
                updateApprovalStatus(contractToApprove.contract, undefined)
              }}
            />
          )}
        />
        <ShowIfNil checks={contractToApprove}>
          <button className={clsx('btn-gradient', 'btn-size-alt', 'group')} disabled={true}>
            <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('btn.label')}</span>
          </button>
        </ShowIfNil>
      </div>
    </Modal>
  )
}
