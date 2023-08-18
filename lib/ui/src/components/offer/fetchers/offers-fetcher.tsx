import { User } from '../../../types/user'
import { PaddedContainer } from '../../layout/padded-container'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent, PropsWithChildren, useEffect } from 'react'

export interface OffersFetcherProps {
  user: User
  onOffersError?: (error: Error) => unknown
}

export const OffersFetcher: FunctionComponent<PropsWithChildren<OffersFetcherProps>> = ({ user, onOffersError }) => {
  const { data, error } = useNftCollection('test')

  // error handling
  useEffect(() => {
    if (!isNil(error) && !isNil(onOffersError)) {
      onOffersError(error)
    }
  }, [error, onOffersError])

  if (isNil(data)) {
    return null
  }

  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'grow', 'gap-14')}>
        {/*<CollectionDetails*/}
        {/*  description={description}*/}
        {/*  size={totalSupply}*/}
        {/*  collectionName={name}*/}
        {/*  pictureUrl={profilePictureUrl}*/}
        {/*  bannerUrl={bannerUrl}*/}
        {/*  discordUrl={discordUrl}*/}
        {/*  websiteUrl={websiteUrl}*/}
        {/*  twitterUsername={twitterUsername}*/}
        {/*/>*/}
        {/*<CollectionNftsFetcher collectionSlug={slug} onMakeOfferForNft={onMakeOfferForNft} onError={onNftsError} />*/}
      </div>
    </PaddedContainer>
  )
}
