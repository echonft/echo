'use client'
import { Expiration } from '@echo/model/constants/expiration'
import type { Collection } from '@echo/model/types/collection'
import type { Listing } from '@echo/model/types/listing'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import type { UserWithWallet } from '@echo/model/types/user'
import { CreateOfferUserNftsSelection } from '@echo/ui/components/offer/create/create-offer-user-nfts-selection'
import { CreateTradeBottomBar } from '@echo/ui/components/trade/create-trade-bottom-bar'
import { TradeStepIndicator } from '@echo/ui/components/trade/trade-step-indicator'
import { ListingCreationSteps } from '@echo/ui/constants/listing-creation-steps'
import { useNfts } from '@echo/ui/hooks/use-nfts'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil, values, type NonEmptyArray } from 'ramda'
import { useState, type FunctionComponent } from 'react'

interface Props {
  creator: UserWithWallet
  creatorNfts: OwnedNft[]
  items: Nullable<OwnedNft[]>
  target: Nullable<Collection>
  loading?: boolean
  onCancel?: VoidFunction
  onComplete?: (items: NonEmptyArray<OwnedNft>, target: Listing['target'], expiration: Expiration) => void
}

export const CreateListing: FunctionComponent<Props> = ({ creator, creatorNfts, items, target, loading, onCancel }) => {
  const t = useTranslations('listing.create')
  const { nfts, selection, selectNft, unselectNft } = useNfts({
    nfts: creatorNfts,
    sortBy: 'collection',
    selection: { nfts: items }
  })
  const [targetSelection, setTargetSelection] = useState<Nullable<Listing['target']>>(
    isNil(target) ? undefined : { collection: target, quantity: 1 }
  )
  const [expiration, setExpiration] = useState(Expiration.OneDay)

  const [currentStep, setCurrentStep] = useState(0)
  const steps = values(ListingCreationSteps)
  const totalSteps = steps.length
  const subtitles = [t('steps.collection'), t('steps.review'), t('steps.done')]

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
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
          <CreateOfferUserNftsSelection
            user={creator}
            nfts={nfts}
            selection={selection.nfts}
            onSelect={selectNft}
            onUnselect={unselectNft}
          />
        )}
        {/* {currentStep === 1 && (
          <CreateOfferUserNftsSelection
            user={sender}
            nfts={senderNfts}
            selection={senderSelection.nfts}
            onSelect={selectSenderNfts}
            onUnselect={unselectSenderNfts}
          />
        )}
        {currentStep === 2 && (
          <CreateOfferReviewStep
            sender={sender}
            senderNftsSelection={senderSelection.nfts}
            receiver={receiver}
            receiverNftsSelection={receiverSelection.nfts}
            selectedExpiration={expiration}
            onSelectExpiration={setExpiration}
          />
        )}
        {currentStep === 3 && createdOffer && <CreatedOfferCreated offer={createdOffer} />} */}
      </div>
      {currentStep < totalSteps - 1 && (
        <CreateTradeBottomBar items={selection.nfts} targetCollection={targetSelection} onBack={handleBack}>
          {/* <CreateOfferNextButton
            currentStep={currentStep}
            totalSteps={totalSteps}
            expiration={expiration}
            senderItems={senderSelection.nfts}
            receiverItems={receiverSelection.nfts}
            onNext={handleNext}
            onSuccess={(offer) => {
              handleNext()
              setCreatedOffer(offer)
            }}
          /> */}
        </CreateTradeBottomBar>
      )}
    </div>
  )
}
