'use client'
import type { Listing } from '@echo/model/types/listing'
import type { OwnedNft } from '@echo/model/types/nft'
import { isCreateTargetNextButtonDisabled } from '@echo/ui/helpers/offer/is-create-target-next-button-disabled'
import type { Nullable } from '@echo/utils/types/nullable'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  creatorNfts: OwnedNft[]
  target: Nullable<Listing['target']>
  currentStep: number
  totalSteps: number
  onNext: VoidFunction
  onSuccess?: VoidFunction
}

export const CreateTargetNextButton: FunctionComponent<Props> = ({
  creatorNfts,
  target,
  currentStep,
  totalSteps,
  onNext,
  onSuccess
}) => {
  const t = useTranslations('listing.create')
  const loading = isCreateTargetNextButtonDisabled(creatorNfts, target, currentStep)

  const handleNext = () => {
    if (currentStep < totalSteps - 2) {
      onNext()
    } else {
      onSuccess?.()
    }
  }

  const getNextBtnLabel = () => {
    if (currentStep < totalSteps - 2) {
      return t('nextBtn')
    }
    return t('createBtn')
  }

  return (
    <button
      className={clsx('btn-gradient', 'btn-size-alt', 'group', loading && 'animate-pulse')}
      disabled={loading}
      onClick={() => {
        handleNext()
      }}
    >
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{getNextBtnLabel()}</span>
    </button>
  )
}
