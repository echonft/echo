'use client'
import { OfferDetailsAcceptModalRow } from '@echo/ui/components/offer/details/accept-modal/offer-details-accept-modal-row'
import { getIsApprovedForAllWagmiConfigForContract } from '@echo/ui/helpers/contract/get-is-approved-for-all-wagmi-config-for-contract'
import { Contract } from '@echo/ui/types/model/contract'
import { isNil } from 'ramda'
import { FunctionComponent, useEffect } from 'react'
import { useContractRead } from 'wagmi'

interface Props {
  contract: Contract
  ownerAddress: string
  title: string
  onResponse?: (approvedAll: boolean) => unknown
  onError?: (error: Error) => unknown
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
  }, [error])

  useEffect(() => {
    if (!isNil(data)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      onResponse?.(data)
    }
  }, [data])

  return (
    <OfferDetailsAcceptModalRow title={title} loading={status === 'loading'} success={!isNil(data) && Boolean(data)} />
  )
}
