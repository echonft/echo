'use client'
import { PaddedContainer } from '../../layout/padded-container'
import { NftDetailsAttributesPanel } from './nft-details-attributes-panel'
import { NftDetailsHeader } from './nft-details-header'
import { NftDetailsListingsPanel } from './nft-details-listings-panel'
import { NftDetailsTokenDetailsPanel } from './nft-details-token-details-panel'
import { Listing, Nft } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  nft: Nft
  listings: Array<Listing>
  onMakeOffer?: () => unknown
}

export const NftDetails: FunctionComponent<Props> = ({ nft, listings, onMakeOffer }) => {
  const t = useTranslations('nft.details')
  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-row', 'gap-12')}>
        <div className={clsx('flex', 'flex-col', 'flex-none', 'gap-10')}>
          <img
            className={clsx('w-[33rem]', 'h-[33rem]', 'rounded-2xl')}
            src={nft.pictureUrl.href}
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
            collectionName={nft.collection.name}
            title={nft.name}
            tokenId={nft.tokenId}
            owner={nft.owner}
          />
          <div className={clsx('flex', 'flex-row', 'gap-12', 'self-stretch')}>
            <button
              onClick={onMakeOffer}
              className={clsx('btn-primary', 'group', 'rounded-lg', 'w-max', 'py-[0.88rem]', 'px-10')}
            >
              <span className={clsx('prose-label-lg-semi', 'btn-label-primary')}>{t('makeOfferBtn')}</span>
            </button>
            <NftDetailsListingsPanel listings={listings} />
          </div>
          <NftDetailsAttributesPanel attributes={nft.attributes} />
        </div>
      </div>
    </PaddedContainer>
  )
}
