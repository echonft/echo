import { newOfferState } from '../../services/state'
import { Nft } from '../../types/nft'
import { User } from '../../types/user'
import { NewOfferBottomSliderAssetsContainer } from './new-offer-bottom-slider-assets-container'
import { NewOfferBottomSliderReceiverContainer } from './new-offer-bottom-slider-receiver-container'
import { isNilOrEmpty } from '@echo/utils'
import { Disclosure } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'
import { useRecoilState } from 'recoil'

interface Props {
  receiver: User
  receiverAssets: Nft[]
  senderAssets: Nft[]
  onAddMoreSenderAsset?: () => void
  onRemoveSenderAsset?: (nft: Nft) => void
  onAddMoreReceiverAsset?: () => void
  onRemoveReceiverAsset?: (nft: Nft) => void
}

export const NewOfferBottomSliderInnerContainer: FunctionComponent<Props> = ({
  receiver,
  receiverAssets,
  senderAssets = [],
  onAddMoreSenderAsset,
  onRemoveSenderAsset,
  onAddMoreReceiverAsset,
  onRemoveReceiverAsset
}) => {
  const t = useTranslations('offer.new.bottomSlider')
  const [, setModalState] = useRecoilState(newOfferState)
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('pt-6', 'pb-1')}>
        <NewOfferBottomSliderReceiverContainer receiver={receiver} />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-8')}>
        <NewOfferBottomSliderAssetsContainer
          isReceiver
          assets={receiverAssets}
          onAddMore={onAddMoreReceiverAsset}
          onRemove={onRemoveReceiverAsset}
        />
        <div className={clsx('w-full', 'h-0.5', 'bg-white/[0.08]')} />
      </div>
      <NewOfferBottomSliderAssetsContainer
        isReceiver={false}
        assets={senderAssets}
        onAddMore={onAddMoreSenderAsset}
        onRemove={onRemoveSenderAsset}
      />
      <div className={clsx('flex', 'items-center', 'justify-center', 'py-6')}>
        <Disclosure.Button
          className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')}
          disabled={isNilOrEmpty(receiverAssets) || isNilOrEmpty(senderAssets)}
          onClick={() => setModalState('TO CONFIRM')}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('finalize')}</span>
        </Disclosure.Button>
      </div>
    </div>
  )
}
