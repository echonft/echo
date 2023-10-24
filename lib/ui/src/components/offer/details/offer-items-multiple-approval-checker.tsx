'use client'
import type { Contract } from '@echo/model/types/contract'
import { OfferDetailsAcceptModalRow } from '@echo/ui/components/offer/details/action/offer-details-accept-modal-row'
import { getIsApprovedForAllWagmiConfigForContract } from '@echo/ui/helpers/contract/get-is-approved-for-all-wagmi-config-for-contract'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { all, equals, F, ifElse, isNil, pipe, prop } from 'ramda'
import { type FunctionComponent, useEffect, useMemo } from 'react'
import { useContractReads } from 'wagmi'

interface Props {
  contracts: NonEmptyArray<Contract>
  ownerAddress: string
  title: string
  onResponse?: (approvedAll: boolean) => unknown
  onError?: (error: Error) => unknown
}

function getStatus(status: 'error' | 'idle' | 'loading' | 'success', approved: boolean, data: unknown) {
  if (status === 'idle') {
    return 'loading'
  }
  if (status === 'success') {
    if (isNil(data)) {
      return 'error'
    }
    return approved ? 'success' : 'error'
  }
  return status
}

export const OfferItemsMultipleApprovalChecker: FunctionComponent<Props> = ({
  contracts,
  ownerAddress,
  title,
  onResponse,
  onError
}) => {
  const { data, error, status } = useContractReads({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    contracts: contracts.map((contract) => getIsApprovedForAllWagmiConfigForContract(contract, ownerAddress))
  })

  const approvedAllContracts = useMemo(() => ifElse(isNil, F, all(pipe(prop('result'), equals(true))))(data), [data])

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
      onResponse?.(approvedAllContracts)
    }
  }, [approvedAllContracts, data, onResponse])

  return <OfferDetailsAcceptModalRow title={title} status={getStatus(status, approvedAllContracts, data)} />
}
