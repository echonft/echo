'use client'

import type { Address } from '@echo/model/types/address'
import type { OwnedNft } from '@echo/model/types/nft'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ModalSubtitle } from '@echo/ui/components/base/modal/modal-subtitle'
import { OfferDetailsContractApprovalModalButton } from '@echo/ui/components/offer/details/offer-details-contract-approval-modal-button'
import { OfferDetailsContractApprovalRow } from '@echo/ui/components/offer/details/offer-details-contract-approval-row'
import { offerItemsToContractApprovals } from '@echo/ui/mappers/offer-items-to-contract-approvals'
import type { ContractApproval } from '@echo/ui/types/contract-approval'
import { propIsNotNil } from '@echo/utils/helpers/prop-is-not-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { all, assoc, find, isNil, map, type NonEmptyArray, propEq, when } from 'ramda'
import { type FunctionComponent, useCallback, useEffect, useState } from 'react'

interface Props {
  items: NonEmptyArray<OwnedNft>
  open: boolean
  title: string
  subtitle: string
  onClose?: VoidFunction
  onSuccess?: VoidFunction
}

// TODO Change name of this modal as it's used in the creation flow too
export const OfferDetailsContractApprovalModal: FunctionComponent<Props> = ({
  items,
  open,
  title,
  subtitle,
  onClose,
  onSuccess
}) => {
  const [approvals, setApprovals] = useState<ContractApproval[]>(offerItemsToContractApprovals(items))
  const [isLoading, setIsLoading] = useState(true)
  const contractToApprove = find<ContractApproval>(
    propEq(false, 'approved') as (contractApproval: ContractApproval) => boolean,
    approvals
  )

  const updateApprovalStatus = useCallback(
    (contract: Address, approved: Nullable<boolean>) => {
      const foundApproval = find(propEq(contract, 'contract'), approvals)
      if (!isNil(foundApproval)) {
        setApprovals(
          map(when<ContractApproval, ContractApproval>(propEq(contract, 'contract'), assoc('approved', approved)))
        )
      }
    },
    [approvals]
  )

  useEffect(() => {
    if (isLoading && all(propIsNotNil('approved'), approvals)) {
      setIsLoading(false)
    }
    if (all(propEq(true, 'approved') as (approval: ContractApproval) => boolean, approvals)) {
      onSuccess?.()
    }
  }, [approvals, isLoading, onSuccess])

  return (
    <Modal open={open} onClose={isLoading ? undefined : onClose} title={title}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch', 'p-6')}>
        <ModalSubtitle>{subtitle}</ModalSubtitle>
        <div className={clsx('flex', 'flex-col', 'gap-2')}>
          {map(
            (approval) => (
              <OfferDetailsContractApprovalRow
                key={approval.contract}
                contract={approval.contract}
                collectionName={approval.name}
                wallet={approval.wallet}
                approved={approval.approved}
                onSuccess={updateApprovalStatus}
              />
            ),
            approvals
          )}
        </div>
        <OfferDetailsContractApprovalModalButton
          contract={contractToApprove}
          onApproved={(contract, approved) => {
            setIsLoading(false)
            updateApprovalStatus(contract, approved)
          }}
          onLoading={() => {
            setIsLoading(true)
          }}
          onError={(contract) => {
            setIsLoading(false)
            // restart the whole process
            updateApprovalStatus(contract, undefined)
          }}
        />
      </div>
    </Modal>
  )
}
