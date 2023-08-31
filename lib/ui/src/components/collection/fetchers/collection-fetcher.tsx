'use client'
import { useApiHooks } from '../../../dependencies/hooks/use-api-hooks'
import { PaddedContainer } from '../../layout/padded-container'
import { CollectionDetails } from '../collection-details'
import { CollectionNftsFetcher } from './collection-nfts-fetcher'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent, PropsWithChildren, useEffect } from 'react'

export interface CollectionFetcherProps {
  slug: string
  onMakeOfferForNft?: (id: string) => unknown
  onCollectionError?: (error: Error) => unknown
  onNftsError?: (error: Error) => unknown
}

export const CollectionFetcher: FunctionComponent<PropsWithChildren<CollectionFetcherProps>> = ({
  slug,
  onMakeOfferForNft,
  onCollectionError,
  onNftsError
}) => {
  const { useNftCollection } = useApiHooks()
  const { data, error } = useNftCollection(slug)

  // error handling
  useEffect(() => {
    if (!isNil(error) && !isNil(onCollectionError)) {
      onCollectionError(error)
    }
  }, [error, onCollectionError])

  if (isNil(data)) {
    return null
  }

  const { description, totalSupply, name, profilePictureUrl, bannerUrl, discordUrl, websiteUrl, twitterUsername } = data
  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'grow', 'gap-14')}>
        <CollectionDetails
          description={description}
          size={totalSupply}
          collectionName={name}
          pictureUrl={profilePictureUrl}
          bannerUrl={bannerUrl}
          discordUrl={discordUrl}
          websiteUrl={websiteUrl}
          twitterUsername={twitterUsername}
        />
        <CollectionNftsFetcher collectionSlug={slug} onMakeOfferForNft={onMakeOfferForNft} onError={onNftsError} />
      </div>
    </PaddedContainer>
  )
}
