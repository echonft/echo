/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'
import { Expiration } from '@echo/model/constants/expiration'
import type { Collection } from '@echo/model/types/collection'
import type { Listing } from '@echo/model/types/listing'
import type { OwnedNft } from '@echo/model/types/nft'
import { CreateListingFirstStep } from '@echo/ui/components/listing/create/create-listing-first-step'
import { CreateListingReviewStep } from '@echo/ui/components/listing/create/create-listing-review-step'
import { CreateTargetNextButton } from '@echo/ui/components/listing/create/create-target-next-button'
import { CreateTradeBottomBar } from '@echo/ui/components/trade/create/create-trade-bottom-bar'
import { CreateTradeStepIndicator } from '@echo/ui/components/trade/create/create-trade-step-indicator'
import { CreateTradeStepLayout } from '@echo/ui/components/trade/create/layout/create-trade-step-layout'
import { ListingCreationSteps } from '@echo/ui/constants/listing-creation-steps'
import { useNfts } from '@echo/ui/hooks/use-nfts'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc, isNil, type NonEmptyArray, values } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  creator: Listing['creator']
  creatorNfts: OwnedNft[]
  items: OwnedNft[]
  target: Nullable<Collection>
  loading?: boolean
  onCancel?: VoidFunction
  onComplete?: (items: NonEmptyArray<OwnedNft>, target: Listing['target'], expiration: Expiration) => void
}

export const CreateListing: FunctionComponent<Props> = ({
  creator,
  creatorNfts,
  items,
  target,
  loading,
  onCancel,
  onComplete
}) => {
  const t = useTranslations('listing.create')
  const { selection, selectNft, unselectNft } = useNfts({
    nfts: creatorNfts,
    sortBy: 'collection',
    selection: { nfts: items }
  })
  const [targetSelection, setTargetSelection] = useState<Nullable<Listing['target']>>(
    // FIXME Should be undefined to begin with
    isNil(target) ? undefined : { collection: target, quantity: 1 }
  )
  const [expiration, setExpiration] = useState(Expiration.OneDay)
  const [currentStep, setCurrentStep] = useState(0)
  const steps = values(ListingCreationSteps)
  const totalSteps = steps.length
  const subtitles = [t('steps.collection'), t('steps.review')]

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // FIXME Should not be undefined at this point
      onComplete?.(selection.nfts as NonEmptyArray<OwnedNft>, targetSelection!, expiration)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      onCancel?.()
    }
  }

  return (
    <div className={clsx('flex', 'flex-col', 'gap-12')}>
      <div className={clsx('flex', 'items-center', 'justify-center')}>
        <CreateTradeStepIndicator step={currentStep} totalSteps={totalSteps} subtitles={subtitles} />
      </div>
      <CreateTradeStepLayout>
        {currentStep === 0 && (
          <CreateListingFirstStep
            creator={creator}
            nfts={creatorNfts}
            selection={selection.nfts}
            onSelect={selectNft}
            onUnselect={unselectNft}
            target={targetSelection?.collection}
            onAddQuantity={(quantity) => {
              setTargetSelection((prevValue) => assoc('quantity', quantity, prevValue))
            }}
          />
        )}
        {currentStep === 1 && (
          <CreateListingReviewStep
            selectedExpiration={expiration}
            onSelectExpiration={setExpiration}
            loading={loading}
            creator={creator}
            items={selection.nfts as NonEmptyArray<OwnedNft>}
            // FIXME Should not be undefined at this point
            target={targetSelection!}
          />
        )}
      </CreateTradeStepLayout>
      <CreateTradeBottomBar
        items={selection.nfts}
        targetCollection={targetSelection}
        onBack={handleBack}
        loading={loading}
      >
        <CreateTargetNextButton
          creatorNfts={selection.nfts}
          target={targetSelection}
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={handleNext}
          onSuccess={handleNext}
        />
      </CreateTradeBottomBar>
    </div>
  )
}
