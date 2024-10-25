'use client'
import type { Contract } from '@echo/model/types/contract'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { OfferDetailsContractApprovalRowIcon } from '@echo/ui/components/offer/details/offer-details-contract-approval-row-icon'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import type { HexString } from '@echo/utils/types/hex-string'
import type { GetErc721ContractApprovalArgs } from '@echo/web3-dom/types/get-erc721-contract-approval-args'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'
import useSWR from 'swr'

interface Props {
  collectionName: string
  contract: Contract
  owner: HexString
  approved?: boolean
  onSuccess?: (contract: Contract, approved: boolean) => unknown
}

export const OfferDetailsContractApprovalRow: FunctionComponent<Props> = ({
  collectionName,
  contract,
  owner,
  approved,
  onSuccess
}) => {
  const { getErc721ContractApproval } = useDependencies()
  useSWR<boolean, Error, (GetErc721ContractApprovalArgs & Record<'name', string>) | undefined>(
    isNil(approved) ? { name: SWRKeys.contract.getErc721approval(contract), contract, owner } : undefined,
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
