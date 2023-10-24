'use client'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import { getItemsUniqueContracts } from '@echo/model/helpers/item/get-items-unique-contracts'
import type { Contract } from '@echo/model/types/contract'
import type { Offer } from '@echo/model/types/offer'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { ModalSubtitle } from '@echo/ui/components/layout/modal/modal-subtitle'
import { OfferDetailsAcceptModalButtons } from '@echo/ui/components/offer/details/action/offer-details-accept-modal-buttons'
import { OfferItemsApprovalChecker } from '@echo/ui/components/offer/details/offer-items-approval-checker'
import { type ContractApprovalStatus } from '@echo/ui/types/contract-approval-status'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { ErrorFunction } from '@echo/utils/types/error-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { any, applySpec, find, findIndex, identity, isNil, map, pipe, prop, propEq, unless, update } from 'ramda'
import { type FunctionComponent, useState } from 'react'
import { useNetwork } from 'wagmi'

interface Props {
  offer: Offer
  open: boolean
  token: string
  acceptOfferFetcher: (
    offerId: string,
    signature: HexString | undefined,
    token: string | undefined
  ) => Promise<EmptyResponse>
  onClose?: EmptyFunction
  onSuccess?: EmptyFunction
  onError?: ErrorFunction
}

export const OfferDetailsAcceptModal: FunctionComponent<Props> = ({
  offer,
  open,
  token,
  acceptOfferFetcher,
  onClose,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.acceptModal')
  // TODO Maybe we should add a line to check for the chain and if hes connected.
  // Because if wallet is locked it doesn't show as connected.
  const { chain } = useNetwork()
  const contracts = getItemsUniqueContracts(offer.receiverItems)
  const [approvalStatuses, setApprovalStatuses] = useState<ContractApprovalStatus[]>(
    map(applySpec<ContractApprovalStatus>({ contract: identity }), contracts)
  )
  const approvalPending = any(propIsNil('approved'))(approvalStatuses)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const contractToApprove = pipe(find(propEq(false, 'approved')), unless(isNil, prop('contract')))(approvalStatuses) as
    | Contract
    | undefined
  const updateApprovalStatus = (contract: Contract, approved: boolean) => {
    // FIXME Either functional program this shit or fix the other call because it keeps on setting the state
    // setApprovalStatuses(map(when(propEq(contract, 'contract'), assoc('approved', approved))))
    setApprovalStatuses((prevState) => {
      const index = findIndex(propEq(contract, 'contract'), prevState)
      if (index === -1) {
        return prevState.concat([{ contract, approved }])
      } else if (prevState[index]!.approved !== approved) {
        return update(index, { contract, approved }, prevState)
      }
      return prevState
    })
  }

  return (
    <Modal open={open} onClose={onClose} title={t('title')} closeDisabled={approvalPending}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('subtitle')}</ModalSubtitle>
        <div className={clsx('flex', 'flex-col', 'gap-2')}>
          {map(
            (contract) => (
              <OfferItemsApprovalChecker
                key={contract.address}
                contract={contract}
                ownerAddress={offer.receiver.wallet.address}
                title={t('approval', { collectionName: contract.name })}
                onResponse={(approved) => updateApprovalStatus(contract, approved)}
              />
            ),
            contracts
          )}
        </div>
        <OfferDetailsAcceptModalButtons
          approvalPending={approvalPending}
          contract={contractToApprove}
          offer={offer}
          token={token}
          chainId={chain?.id}
          acceptOfferFetcher={acceptOfferFetcher}
          onSuccess={onSuccess}
          onError={onError}
        />
      </div>
    </Modal>
  )
}
