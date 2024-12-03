'use client'
import { Expiration } from '@echo/model/constants/expiration'
import type { OwnedNft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { CreateOfferNextButton } from '@echo/ui/components/offer/create/create-offer-next-button'
import { CreateOfferReviewStep } from '@echo/ui/components/offer/create/create-offer-review-step'
import { CreateTradeBottomBar } from '@echo/ui/components/trade/create/create-trade-bottom-bar'
import { CreateTradeStepIndicator } from '@echo/ui/components/trade/create/create-trade-step-indicator'
import { CreateTradeUserNftsSelection } from '@echo/ui/components/trade/create/create-trade-user-nfts-selection'
import { CreateTradeStepLayout } from '@echo/ui/components/trade/create/layout/create-trade-step-layout'
import { OfferCreationSteps } from '@echo/ui/constants/offer-creation-steps'
import { useNfts } from '@echo/ui/hooks/use-nfts'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { type NonEmptyArray, values } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  receiver: Offer['receiver']
  receiverNfts: OwnedNft[]
  receiverNftsSelection: NonEmptyArray<OwnedNft>
  sender: Offer['sender']
  senderNfts: OwnedNft[]
  onCancel?: VoidFunction
}

export const CreateOfferFlow: FunctionComponent<Props> = ({
  sender,
  senderNfts,
  receiver,
  receiverNfts,
  receiverNftsSelection,
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
  const router = useRouter()

  // Steps
  const [currentStep, setCurrentStep] = useState(0)
  const steps = values(OfferCreationSteps)
  const totalSteps = steps.length
  const subtitles = [t('steps.counterparty'), t('steps.offer'), t('steps.review'), t('steps.done')]

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
        <CreateTradeStepIndicator step={currentStep} totalSteps={totalSteps} subtitles={subtitles} />
      </div>
      <CreateTradeStepLayout>
        {currentStep === 0 && (
          <CreateTradeUserNftsSelection
            user={receiver}
            nfts={receiverNfts}
            selection={receiverSelection.nfts}
            onSelect={selectReceiverNfts}
            onUnselect={unselectReceiverNfts}
          />
        )}
        {currentStep === 1 && (
          <CreateTradeUserNftsSelection
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
      </CreateTradeStepLayout>
      {currentStep < totalSteps - 1 && (
        <CreateTradeBottomBar
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
              router.replace(frontendRoutes.offer.details.withQuery({ offer }).get({ username: sender.username }))
            }}
          />
        </CreateTradeBottomBar>
      )}
    </div>
  )
}
