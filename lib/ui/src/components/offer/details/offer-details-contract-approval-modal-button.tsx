'use client'
import type { Wallet } from '@echo/model/types/wallet'
import { OfferDetailsApproveContractButton } from '@echo/ui/components/offer/details/offer-details-approve-contract-button'
import type { ContractApproval } from '@echo/ui/types/contract-approval'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  contract: Nullable<ContractApproval>
  onApproved?: (contract: Wallet, approved: boolean) => void
  onLoading?: VoidFunction
  onError?: VoidFunction
}

export const OfferDetailsContractApprovalModalButton: FunctionComponent<Props> = ({
  contract,
  onApproved,
  onLoading,
  onError
}) => {
  const t = useTranslations('offer.details.approveModal.btn')
  if (isNil(contract)) {
    return (
      <button className={clsx('btn-gradient', 'btn-size-alt', 'group')} disabled={true}>
        <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('label')}</span>
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
