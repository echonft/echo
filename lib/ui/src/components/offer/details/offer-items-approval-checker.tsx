'use client'
import type { Contract } from '@echo/model/types/contract'
import { OfferDetailsAcceptModalRow } from '@echo/ui/components/offer/details/action/offer-details-accept-modal-row'
import { getIsApprovedForAllWagmiConfigForContract } from '@echo/ui/helpers/contract/get-is-approved-for-all-wagmi-config-for-contract'
import { isNil } from 'ramda'
import { type FunctionComponent, useEffect } from 'react'
import { useContractRead } from 'wagmi'

interface Props {
  contract: Contract
  ownerAddress: string
  title: string
  onResponse?: (approvedAll: boolean) => unknown
  onError?: (error: Error) => unknown
}

function getStatus(status: 'error' | 'idle' | 'loading' | 'success', data: unknown) {
  if (status === 'idle') {
    return 'loading'
  }
  if (status === 'success' && isNil(data)) {
    return 'error'
  }
  return status
}

export const OfferItemsApprovalChecker: FunctionComponent<Props> = ({
  contract,
  ownerAddress,
  title,
  onResponse,
  onError
}) => {
  const { data, error, status } = useContractRead({
    ...getIsApprovedForAllWagmiConfigForContract(contract, ownerAddress),
    watch: true
  })

  useEffect(() => {
    if (!isNil(error)) {
      onError?.(error)
    }
  }, [error, onError])

  useEffect(() => {
    if (!isNil(data)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      onResponse?.(data)
    }
  }, [data, onResponse])

  return <OfferDetailsAcceptModalRow title={title} status={getStatus(status, data)} />
}
