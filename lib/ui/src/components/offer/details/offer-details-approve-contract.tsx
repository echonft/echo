'use client'
import { getSetApprovalWagmiConfigForContract } from '@echo/ui/helpers/contract/get-set-approval-wagmi-config-for-contract'
import { Contract } from '@echo/ui/types/model/contract'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

interface Props {
  contract: Contract
}

export const OfferDetailsApproveContract: FunctionComponent<Props> = ({ contract }) => {
  const t = useTranslations('offer.details.acceptModal')
  const { config } = usePrepareContractWrite(getSetApprovalWagmiConfigForContract(contract))
  const { status, write } = useContractWrite(config)

  return (
    <button
      className={clsx('btn-gradient', 'btn-size-alt', 'group', 'outline-none')}
      onClick={write}
      disabled={status !== 'idle'}
    >
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>
        {t('approveBtn', { collectionName: contract.name })}
      </span>
    </button>
  )
}
