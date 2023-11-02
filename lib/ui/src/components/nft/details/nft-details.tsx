'use client'
import { type Listing } from '@echo/model/types/listing'
import { type Nft } from '@echo/model/types/nft'
import { Img } from '@echo/ui/components/base/img'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { NftDetailsAttributesPanel } from '@echo/ui/components/nft/details/nft-details-attributes-panel'
import { NftDetailsHeader } from '@echo/ui/components/nft/details/nft-details-header'
import { NftDetailsListingsPanel } from '@echo/ui/components/nft/details/nft-details-listings-panel'
import { NftDetailsTokenDetailsPanel } from '@echo/ui/components/nft/details/nft-details-token-details-panel'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
  listings: Listing[]
  onMakeOffer?: EmptyFunction
}

export const NftDetails: FunctionComponent<Props> = ({ nft, listings, onMakeOffer }) => {
  const t = useTranslations('nft.details')
  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-row', 'gap-12')}>
        <div className={clsx('flex', 'flex-col', 'flex-none', 'gap-10')}>
          <Img
            className={clsx('w-[33rem]', 'h-[33rem]', 'rounded-2xl')}
            src={nft.pictureUrl}
            alt={nft.tokenId.toString()}
            width={528}
            height={528}
          />
          <NftDetailsTokenDetailsPanel
            chainId={nft.collection.contract.chainId}
            tokenId={nft.tokenId}
            tokenType={nft.tokenType}
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
              className={clsx('btn-primary', 'group', 'h-max', 'w-max', 'py-[0.88rem]', 'px-10')}
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
