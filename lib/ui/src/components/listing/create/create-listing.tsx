'use client'
import { Expiration } from '@echo/model/constants/expiration'
import type { Collection } from '@echo/model/types/collection'
import type { Listing } from '@echo/model/types/listing'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import type { UserWithWallet } from '@echo/model/types/user'
import { CreateListingFirstStep } from '@echo/ui/components/listing/create/create-listing-first-step'
import { CreateListingReviewStep } from '@echo/ui/components/listing/create/create-listing-review-step'
import { CreateTargetNextButton } from '@echo/ui/components/listing/create/create-target-next-button'
import { CreateTradeBottomBar } from '@echo/ui/components/trade/create-trade-bottom-bar'
import { TradeStepIndicator } from '@echo/ui/components/trade/trade-step-indicator'
import { ListingCreationSteps } from '@echo/ui/constants/listing-creation-steps'
import { useNfts } from '@echo/ui/hooks/use-nfts'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc, isNil, values, type NonEmptyArray } from 'ramda'
import { useState, type FunctionComponent } from 'react'

interface Props {
  creator: UserWithWallet
  creatorNfts: OwnedNft[]
  // TODO Remove this, I don't think we should allow this
  items: Nullable<OwnedNft[]>
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
    isNil(target) ? undefined : { collection: target }
  )
  const [expiration, setExpiration] = useState(Expiration.OneDay)

  const [currentStep, setCurrentStep] = useState(0)
  const steps = values(ListingCreationSteps)
  const totalSteps = steps.length
  const subtitles = [t('steps.collection'), t('steps.review'), t('steps.done')]

  const handleNext = () => {
    if (currentStep < totalSteps - 2) {
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
        <TradeStepIndicator step={currentStep} totalSteps={totalSteps} subtitles={subtitles} />
      </div>
      <div className={clsx('flex-grow', 'overflow-y-auto', 'pb-32')}>
        {currentStep === 0 && (
          <CreateListingFirstStep
            user={creator}
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
      </div>
      <CreateTradeBottomBar items={selection.nfts} targetCollection={targetSelection} onBack={handleBack}>
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
