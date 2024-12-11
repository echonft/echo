'use client'
import type { Expiration } from '@echo/model/constants/expiration'
import type { OwnedNft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { CreateOfferModalSwitch } from '@echo/ui/components/offer/create/create-offer-modal-switch'
import { isCreateOfferNextButtonDisabled } from '@echo/ui/helpers/offer/is-create-offer-next-button-disabled'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import type { NonEmptyArray } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  currentStep: number
  expiration: Expiration
  senderItems: OwnedNft[]
  receiverItems: OwnedNft[]
  totalSteps: number
  onNext?: () => void
  onSuccess?: (offer: Offer) => void
}

export const CreateOfferNextButton: FunctionComponent<Props> = ({
  senderItems,
  receiverItems,
  expiration,
  currentStep,
  totalSteps,
  onNext,
  onSuccess
}) => {
  const t = useTranslations('offer.create')
  const loading = isCreateOfferNextButtonDisabled(senderItems, receiverItems, currentStep)
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      onNext?.()
    } else {
      setIsApproveModalOpen(true)
    }
  }

  const getNextBtnLabel = () => {
    if (currentStep < totalSteps - 1) {
      return t('nextBtn')
    }
    return t('createBtn')
  }

  return (
    <>
      <button
        className={clsx('btn-gradient', 'group', loading && 'animate-pulse')}
        disabled={loading}
        onClick={() => {
          handleNext()
        }}
      >
        <span className={clsx('btn-label-gradient')}>{getNextBtnLabel()}</span>
      </button>
      {currentStep >= 2 && (
        <CreateOfferModalSwitch
          senderItems={senderItems as NonEmptyArray<OwnedNft>}
          receiverItems={receiverItems as NonEmptyArray<OwnedNft>}
          expiration={expiration}
          open={isApproveModalOpen}
          onClose={() => {
            setIsApproveModalOpen(false)
          }}
          onSuccess={(offer) => {
            setIsApproveModalOpen(false)
            onSuccess?.(offer)
          }}
        />
      )}
    </>
  )
}
