import type { OfferItem } from '@echo/model/types/offer-item'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { OfferDetailsApproveContractButton } from '@echo/ui/components/offer/details/offer-details-approve-contract-button'
import { OfferItemsApprovalChecker } from '@echo/ui/components/offer/details/offer-items-approval-checker'
import { mapOfferItemsToContractApprovals } from '@echo/ui/mappers/map-offer-items-to-contract-approvals'
import type { ContractApproval } from '@echo/ui/types/contract-approval'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { all, assoc, find, isNil, map, pipe, propEq, reject, when } from 'ramda'
import { type FunctionComponent, useCallback, useState } from 'react'
import { debounce } from 'throttle-debounce'

interface Props {
  items: OfferItem[]
  onApproved?: EmptyFunction
}

export const OfferDetailsApprovalModalBody: FunctionComponent<Props> = ({ items, onApproved }) => {
  const t = useTranslations('offer.details.approval')
  const [approvals, setApprovals] = useState<ContractApproval[]>(mapOfferItemsToContractApprovals(items))
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const contractToApprove = find(propEq(false, 'approved'), approvals) as ContractApproval | undefined
  const updateApprovalStatus = useCallback(
    (approval: ContractApproval, approved: boolean) => {
      const { contract } = approval
      const foundApproval = find(propEq(contract, 'contract'), approvals)
      if (!isNil(foundApproval) && foundApproval.approved !== approved) {
        if (approved && pipe(reject(propEq(contract, 'contract')), all(propEq(true, 'approved')))(approvals)) {
          onApproved?.()
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setApprovals(map(when(propEq(contract, 'contract'), assoc('approved', approved))))
      }
    },
    [approvals, onApproved]
  )
  const debouncedUpdateApprovalStatus = debounce(5000, updateApprovalStatus)

  return (
    <div className={clsx('flex', 'flex-col', 'gap-2')}>
      {map(
        (approval) => (
          <OfferItemsApprovalChecker
            key={approval.contract.address}
            approval={approval}
            title={t('title', { collectionName: approval.name })}
            onResponse={(approved) => debouncedUpdateApprovalStatus(approval, approved)}
          />
        ),
        approvals
      )}
      <HideIfNil
        checks={contractToApprove}
        render={(contractToApprove) => <OfferDetailsApproveContractButton approval={contractToApprove} />}
      />
    </div>
  )
}
