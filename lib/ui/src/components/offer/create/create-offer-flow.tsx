'use client'
import { Expiration } from '@echo/model/constants/expiration'
import type { OwnedNft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { CreateOfferReviewStep } from '@echo/ui/components/offer/create/create-offer-review-step'
import { CreateOfferUserNftsSelection } from '@echo/ui/components/offer/create/create-offer-user-nfts-selection'
import { CreatedOfferCreated } from '@echo/ui/components/offer/created/created-offer-created'
import { CreateTradeBottomBar } from '@echo/ui/components/trade/create-trade-bottom-bar'
import { TradeStepIndicator } from '@echo/ui/components/trade/trade-step-indicator'
import { OfferCreationSteps } from '@echo/ui/constants/offer-creation-steps'
import { useNfts } from '@echo/ui/hooks/use-nfts'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type NonEmptyArray, values } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  sender: User & Required<Pick<User, 'wallet'>>
  senderNfts: OwnedNft[]
  receiver: User & Required<Pick<User, 'wallet'>>
  receiverNfts: OwnedNft[]
  receiverNftsSelection: NonEmptyArray<OwnedNft>
  loading?: boolean
  onComplete?: VoidFunction
  onCancel?: VoidFunction
}

export const CreateOfferFlow: FunctionComponent<Props> = ({
  loading,
  sender,
  senderNfts,
  receiver,
  receiverNfts,
  receiverNftsSelection,
  onComplete,
  onCancel
}) => {
  const t = useTranslations('offer.create')
  // User inputs
  const {
    selection: senderSelection,
    selectNft: selectSenderNfts,
    unselectNft: unselectSenderNfts
  } = useNfts({ nfts: senderNfts, sortBy: 'collection' })
  const {
    selection: receiverSelection,
    selectNft: selectReceiverNfts,
    unselectNft: unselectReceiverNfts
  } = useNfts({ nfts: receiverNfts, selection: { nfts: receiverNftsSelection }, sortBy: 'collection' })
  const [expiration, setExpiration] = useState(Expiration.OneDay)

  // Steps
  const [currentStep, setCurrentStep] = useState(0)
  const steps = values(OfferCreationSteps)
  const totalSteps = steps.length
  const subtitles = [t('steps.counterparty'), t('steps.offer'), t('steps.review'), t('steps.done')]
  const [createdOffer, setCreatedOffer] = useState<Offer>()

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete?.()
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
            user={receiver}
            nfts={receiverNfts}
            selection={receiverSelection.nfts}
            onSelect={selectReceiverNfts}
            onUnselect={unselectReceiverNfts}
          />
        )}
        {currentStep === 1 && (
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
        {currentStep === 3 && createdOffer && <CreatedOfferCreated offer={createdOffer} />}
      </div>
      {currentStep < totalSteps - 1 && (
        <CreateTradeBottomBar
          loading={loading}
          items={receiverSelection.nfts}
          counterpartyItems={senderSelection.nfts}
          onBack={handleBack}
        >
          <CreateOfferNextButton
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
          />
        </CreateTradeBottomBar>
      )}
    </div>
  )
}
