'use client'
import { OfferDetailsAcceptModalRow } from '@echo/ui/components/offer/details/action/offer-details-accept-modal-row'
import type { ContractApproval } from '@echo/ui/types/contract-approval'
import { getErc721IsApprovedForAllReadConfig } from '@echo/web3/src/helpers/get-erc721-is-approved-for-all-read-config'
import type { Erc721Abi } from '@echo/web3/src/types/erc721-abi'
import type { IsApprovedForAllFn } from '@echo/web3/src/types/erc721-function-name-types'
import { isNil } from 'ramda'
import { type FunctionComponent, useEffect } from 'react'
import { useContractRead } from 'wagmi'

interface Props {
  approval: ContractApproval
  title: string
  onResponse?: (approved: boolean) => unknown
  onError?: (error: Error) => unknown
}

function getStatus(status: 'error' | 'idle' | 'loading' | 'success', data: boolean | undefined) {
  if (status === 'idle') {
    return 'loading'
  }
  if (status === 'success') {
    if (isNil(data)) {
      return 'error'
    }
    return data ? 'success' : 'error'
  }
  return status
}

export const OfferItemsApprovalChecker: FunctionComponent<Props> = ({ approval, title, onResponse, onError }) => {
  const { contract, wallet } = approval
  const config = getErc721IsApprovedForAllReadConfig(contract, wallet.address, true)
  const { data, error, status } = useContractRead<Erc721Abi, IsApprovedForAllFn>(config)

  useEffect(() => {
    if (!isNil(error)) {
      onError?.(error)
    }
  }, [error, onError])

  useEffect(() => {
    if (!isNil(data)) {
      onResponse?.(data as boolean)
    }
  }, [data, onResponse])

  return <OfferDetailsAcceptModalRow title={title} status={getStatus(status, Boolean(data))} />
}
