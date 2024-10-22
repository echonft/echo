'use client'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { User } from '@echo/model/types/user/user'
import { CreateOfferUserNftsSelection } from '@echo/ui/components/offer/create/create-offer-user-nfts-selection'
import { CreateTradeBottomBar } from '@echo/ui/components/trade/create-trade-bottom-bar'
import { TradeStepIndicator } from '@echo/ui/components/trade/trade-step-indicator'
import { OfferCreationSteps } from '@echo/ui/constants/offer-creation-steps'
import { useNfts } from '@echo/ui/hooks/use-nfts'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type NonEmptyArray, values } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  loading: boolean
  sender: User
  senderNfts: OwnedNft[]
  receiver: User
  receiverNfts: OwnedNft[]
  receiverNftsSelection: NonEmptyArray<OwnedNft>
  onComplete?: () => void
  onCancel?: () => void
}

// TODO don't use a state to update the container here
// instead use a layout in the frontend, and set the according component according to the route
// (e.g. offer/{step}) where step is a value of OfferCreationSteps
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
  const [currentStep, setCurrentStep] = useState(0)
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
  const steps = values(OfferCreationSteps)
  const totalSteps = steps.length
  const subtitles = [t('steps.counterparty'), t('steps.offer'), t('steps.review'), t('steps.done')]

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
      <div className={clsx('flex-grow', 'overflow-y-auto')}>
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
      </div>
      <CreateTradeBottomBar
        loading={loading}
        items={receiverSelection.nfts}
        counterpartyItems={senderSelection.nfts}
        onNext={handleNext}
        onBack={handleBack}
        nextBtnLabel={currentStep === totalSteps - 1 ? t('createBtn') : t('nextBtn')}
      />
    </div>
  )
}
