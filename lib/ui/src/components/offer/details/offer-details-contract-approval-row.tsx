'use client'
import type { Contract } from '@echo/model/types/contract'
import { OfferDetailsContractApprovalRowIcon } from '@echo/ui/components/offer/details/offer-details-contract-approval-row-icon'
import { classes } from '@echo/ui/helpers/classes'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { HexString } from '@echo/utils/types/hex-string'
import type { GetErc721ContractApprovalArgs } from '@echo/web3-dom/types/get-erc-721-contract-approval-args'
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
    isNil(approved) ? { name: SWRKeys.contract.getErc721approval, contract, owner } : undefined,
    getErc721ContractApproval,
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
    <div className={classes('flex', 'flex-row', 'gap-2', 'items-center')}>
      <OfferDetailsContractApprovalRowIcon approved={approved} />
      <div className={classes('h-1', 'w-16', 'bg-white/50', 'rounded-md')} />
      <span className={classes('prose-label-lg', 'text-white/50')}>{collectionName}</span>
    </div>
  )
}
