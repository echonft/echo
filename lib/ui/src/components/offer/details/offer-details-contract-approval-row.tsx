'use client'
import type { Address } from '@echo/model/types/address'
import { OfferDetailsContractApprovalRowIcon } from '@echo/ui/components/offer/details/offer-details-contract-approval-row-icon'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import type { GetErc721ContractApprovalArgs } from '@echo/web3-dom/services/get-erc721-contract-approval'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'
import useSWR from 'swr'

interface Props {
  collectionName: string
  contract: Address
  wallet: Address
  approved?: boolean
  onSuccess?: (contract: Address, approved: boolean) => unknown
}

export const OfferDetailsContractApprovalRow: FunctionComponent<Props> = ({
  collectionName,
  contract,
  wallet,
  approved,
  onSuccess
}) => {
  const { getErc721ContractApproval } = useDependencies()
  useSWR<boolean, Error, (GetErc721ContractApprovalArgs & Record<'name', string>) | undefined>(
    isNil(approved) ? { name: SWRKeys.contract.getErc721approval(contract), contract, wallet: wallet } : undefined,
    getErc721ContractApproval,
    {
      onSuccess: (data) => {
        onSuccess?.(contract, data)
      },
      onError: errorCallback({
        onError: () => {
          onSuccess?.(contract, false)
        },
        loggerContext: { component: OfferDetailsContractApprovalRow.name, fetcher: getErc721ContractApproval.name }
      }),
      errorRetryCount: 3,
      errorRetryInterval: 500,
      shouldRetryOnError: true
    }
  )
  return (
    <div className={clsx('flex', 'flex-row', 'gap-2', 'items-center')}>
      <OfferDetailsContractApprovalRowIcon approved={approved} />
      <div className={clsx('h-1', 'w-16', 'bg-white/50', 'rounded-md')} />
      <span className={clsx('prose-label-lg', 'text-white/50')}>{collectionName}</span>
    </div>
  )
}
