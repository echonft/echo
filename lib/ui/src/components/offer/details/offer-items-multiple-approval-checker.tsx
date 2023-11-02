'use client'
import type { Contract } from '@echo/model/types/contract'
import { OfferDetailsAcceptModalRow } from '@echo/ui/components/offer/details/action/offer-details-accept-modal-row'
import type { HexString } from '@echo/utils/types/hex-string'
import { getErc721IsApprovedForAllReadConfig } from '@echo/web3/helpers/get-erc721-is-approved-for-all-read-config'
import { all, equals, F, ifElse, isNil, pipe, prop } from 'ramda'
import { type FunctionComponent, useEffect, useMemo } from 'react'
import { useContractReads } from 'wagmi'

interface Props {
  contracts: Contract[]
  ownerAddress: HexString
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
    contracts: contracts.map((contract) => getErc721IsApprovedForAllReadConfig(contract, ownerAddress))
  })

  const approvedAllContracts = useMemo(() => ifElse(isNil, F, all(pipe(prop('result'), equals(true))))(data), [data])

  useEffect(() => {
    if (!isNil(error)) {
      onError?.(error)
    }
  }, [error, onError])

  useEffect(() => {
    if (!isNil(data)) {
      onResponse?.(approvedAllContracts)
    }
  }, [approvedAllContracts, data, onResponse])

  return <OfferDetailsAcceptModalRow title={title} status={getStatus(status, approvedAllContracts, data)} />
}
