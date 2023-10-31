'use client'
import type { ContractApproval } from '@echo/ui/types/contract-approval'
import { getErc721SetApprovalWriteConfig } from '@echo/web3/src/helpers/get-erc721-set-approval-write-config'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

interface Props {
  approval: ContractApproval
}

export const OfferDetailsApproveContractButton: FunctionComponent<Props> = ({ approval }) => {
  const { contract, name } = approval
  const t = useTranslations('offer.details.approval')
  const writeConfig = getErc721SetApprovalWriteConfig(contract)
  const { config } = usePrepareContractWrite(writeConfig)
  const { status, write } = useContractWrite(config)

  return (
    <button
      className={clsx('btn-gradient', 'btn-size-alt', 'group', 'outline-none')}
      onClick={write}
      disabled={status !== 'idle'}
    >
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('approveBtn', { collectionName: name })}</span>
    </button>
  )
}
