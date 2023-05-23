import { SizeLG } from '../../../types/size'
import { ButtonColorScheme } from '../../base/buttons/button-color-scheme'
import { TextButton } from '../../base/buttons/text-button'
import { NftDetailsAttributesPanel } from './nft-details-attributes-panel'
import { NftDetailsHeader } from './nft-details-header'
import { NftDetailsOffersPanel } from './nft-details-offers-panel'
import { NftDetailsTokenDetailsPanel } from './nft-details-token-details-panel'
import { Offer, OwnedNft } from '@echo/model'
import { clsx } from 'clsx'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface NftDetailsProps {
  nft: OwnedNft
  offers?: Offer[]
  onMakeOffer?: () => unknown
}

export const NftDetails: FunctionComponent<NftDetailsProps> = ({ nft, offers, onMakeOffer }) => {
  const t = useTranslations('nft.details')
  return (
    <div className={clsx('flex', 'flex-row', 'gap-12')}>
      <div className={clsx('flex', 'flex-col', 'flex-none', 'gap-10')}>
        <Image
          className={clsx('w-[33rem]', 'h-[33rem]', 'rounded-2xl')}
          src={nft.media[0]!.gateway.href}
          alt={nft.tokenId.toString()}
          width={528}
          height={528}
        />
        <NftDetailsTokenDetailsPanel
          chainId={nft.collection.contract.chainId}
          tokenId={nft.tokenId}
          tokenType={nft.collection.contract.tokenType}
        />
      </div>
      <div className={clsx('flex', 'flex-col', 'flex-grow', 'gap-10')}>
        <NftDetailsHeader
          collectionName={nft.collection.openSea!.collectionName!}
          title={nft.title}
          tokenId={nft.tokenId}
          owner={nft.owner}
        />
        <div className={clsx('flex', 'flex-row', 'gap-12', 'self-stretch')}>
          <TextButton
            label={t('makeOfferBtn')}
            size={SizeLG}
            colorScheme={ButtonColorScheme.PRIMARY}
            onClick={onMakeOffer}
          />
          <NftDetailsOffersPanel offers={offers} />
        </div>
        <NftDetailsAttributesPanel attributes={nft.attributes} />
      </div>
    </div>
  )
}
