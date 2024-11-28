'use client'
import type { Address } from '@echo/model/types/address'
import { OfferDetailsApproveContractButton } from '@echo/ui/components/offer/details/offer-details-approve-contract-button'
import type { ContractApproval } from '@echo/ui/types/contract-approval'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  contract: Nullable<ContractApproval>
  onApproved?: (contract: Address, approved: boolean) => void
  onLoading?: VoidFunction
  onError?: (contract: Address) => void
}

export const OfferDetailsContractApprovalModalButton: FunctionComponent<Props> = ({
  contract,
  onApproved,
  onLoading,
  onError
}) => {
  const t = useTranslations('offer.details.approveModal')
  if (isNil(contract)) {
    return (
      <button className={clsx('btn-gradient', 'group')} disabled={true}>
        <span className={clsx('btn-label-gradient')}>{t('btn')}</span>
      </button>
    )
  }
  return (
    <OfferDetailsApproveContractButton
      contract={contract.contract}
      onApproved={onApproved}
      onLoading={onLoading}
      onError={onError}
    />
  )
}
