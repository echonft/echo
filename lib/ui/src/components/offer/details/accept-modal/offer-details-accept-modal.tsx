'use client'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { ShowIfNil } from '@echo/ui/components/base/utils/show-if-nil'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { ModalSubtitle } from '@echo/ui/components/layout/modal/modal-subtitle'
import { OfferDetailsAcceptModalAcceptButton } from '@echo/ui/components/offer/details/accept-modal/offer-details-accept-modal-accept-button'
import { OfferDetailsApproveContract } from '@echo/ui/components/offer/details/offer-details-approve-contract'
import { OfferItemsApprovalChecker } from '@echo/ui/components/offer/details/offer-items-approval-checker'
import { OfferItemsOwnerChecker } from '@echo/ui/components/offer/details/offer-items-owner-checker'
import { getOfferItemsUniqueContracts } from '@echo/ui/helpers/offer/get-offer-items-unique-contracts'
import { Contract } from '@echo/ui/types/model/contract'
import { ContractApprovalStatus } from '@echo/ui/types/model/contract-approval-status'
import { Offer } from '@echo/ui/types/model/offer'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { adjust, always, append, find, findIndex, isNil, pipe, prop, propEq, unless } from 'ramda'
import { FunctionComponent, useCallback, useMemo, useState } from 'react'
import { useNetwork } from 'wagmi'

interface Props {
  offer: Offer
  open: boolean
  token: string
  onClose?: () => unknown
  onSuccess?: () => unknown
  onInvalidate?: () => unknown
  onError?: (error: Error) => unknown
}

export const OfferDetailsAcceptModal: FunctionComponent<Props> = ({
  offer,
  open,
  token,
  onClose,
  onSuccess,
  onInvalidate,
  onError
}) => {
  const t = useTranslations('offer.details.acceptModal')
  // TODO Maybe we should add a line to check for the chain and if hes connected.
  // Because if wallet is locked it doesn't show as connected.
  const { chain } = useNetwork()
  const [ownsAllAssets, setOwnsAllAssets] = useState<boolean>()
  const [approvalStatuses, setApprovalStatuses] = useState<ContractApprovalStatus[]>([])
  const uniqueContracts = useMemo(() => getOfferItemsUniqueContracts(offer.receiverItems), [offer])

  const getContractToApprove: () => Contract | undefined = useCallback(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      pipe(find<ContractApprovalStatus>(propEq(false, 'approved')), unless(isNil, prop('contract')))(approvalStatuses),
    [approvalStatuses]
  )

  const updateApprovalStatus = useCallback(
    (status: ContractApprovalStatus) =>
      setApprovalStatuses((statuses) => {
        // TODO Functionnal program that shit!
        const index = findIndex(propEq(status.contract, 'contract'))(statuses)
        if (index === -1) {
          return append(status, statuses)
        }
        return adjust(index, always(status), statuses)
      }),
    [setApprovalStatuses]
  )

  const updateOwnsAllAssets = useCallback(
    (partlyOwns: boolean) => {
      setOwnsAllAssets((prevState) => {
        // TODO Functionnal program that shit!
        // If it was never set, set the new value
        if (isNil(prevState)) {
          return partlyOwns
        }
        // If it was previously false, we keep it false, it means one of the parties does not own the assets
        if (!prevState) {
          return prevState
        }
        return partlyOwns
      })
    },
    [setOwnsAllAssets]
  )
  return (
    <Modal open={open} onClose={onClose} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('subtitle')}</ModalSubtitle>
        <div className={clsx('flex', 'flex-col', 'gap-2')}>
          <OfferItemsOwnerChecker
            title={t('counterpartyAssets')}
            offerItems={offer.senderItems}
            ownerAddress={offer.sender.wallet.address}
            onError={() => updateOwnsAllAssets(false)}
            onResponse={updateOwnsAllAssets}
          />
          <OfferItemsOwnerChecker
            title={t('ownerAssets')}
            offerItems={offer.receiverItems}
            ownerAddress={offer.receiver.wallet.address}
            onError={() => updateOwnsAllAssets(false)}
            onResponse={updateOwnsAllAssets}
          />
          {uniqueContracts.map((contract) => (
            <OfferItemsApprovalChecker
              key={contract.address}
              contract={contract}
              ownerAddress={offer.receiver.wallet.address}
              title={t('approval', { collectionName: contract.name })}
              onResponse={(approved) => updateApprovalStatus({ contract, approved })}
            />
          ))}
        </div>
        <HideIf
          condition={isNil(ownsAllAssets) || !ownsAllAssets}
          render={() => (
            <>
              <HideIfNil
                checks={getContractToApprove()}
                render={(contract) => <OfferDetailsApproveContract contract={contract} />}
              />
              <ShowIfNil checks={getContractToApprove()}>
                <HideIfNil
                  checks={chain?.id}
                  render={(chainId) => (
                    <OfferDetailsAcceptModalAcceptButton
                      offer={offer}
                      chainId={chainId}
                      token={token}
                      onSuccess={onSuccess}
                      onError={onError}
                    />
                  )}
                />
              </ShowIfNil>
            </>
          )}
        />
        <ShowIf condition={!ownsAllAssets}>
          {/*  TODO Need to have a cancel call */}
          <button onClick={onInvalidate}>Reject button</button>
        </ShowIf>
      </div>
    </Modal>
  )
}
