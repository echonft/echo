'use client'
import type { Contract } from '@echo/model/types/contract'
import { OfferDetailsContractApprovalRowIcon } from '@echo/ui/components/offer/details/offer-details-contract-approval-row-icon'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/types/get-erc-721-contract-approval-args'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'
import useSWR from 'swr'

interface Props {
  collectionName: string
  contract: Contract
  owner: HexString
  fetcher: {
    getErc721ContractApproval: Fetcher<boolean, GetErc721ContractApprovalArgs>
  }
  approved?: boolean
  onSuccess?: (contract: Contract, approved: boolean) => unknown
}

export const OfferDetailsContractApprovalRow: FunctionComponent<Props> = ({
  collectionName,
  contract,
  owner,
  fetcher,
  approved,
  onSuccess
}) => {
  useSWR<boolean, Error, (GetErc721ContractApprovalArgs & Record<'name', string>) | undefined>(
    isNil(approved) ? { name: SWRKeys.contract.getErc721approval, contract, owner } : undefined,
    fetcher.getErc721ContractApproval,
    {
      onSuccess: (data) => {
        onSuccess?.(contract, data)
      },
      onError: errorCallback({
        onError: () => {
          onSuccess?.(contract, false)
        }
      }),
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 500
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
