import { CreateOffer } from '@components/create-offer'
import { useFetchCollection } from '@lib/hooks/use-fetch-collection'
import { isEmpty, isNil } from 'ramda'
import React from 'react'
import { useTranslations } from 'use-intl'

interface Props {
  collectionId: string
}

export const CreateOfferFetcher: React.FunctionComponent<Props> = ({ collectionId }) => {
  const t = useTranslations('CreateOffer')
  const collectionResult = useFetchCollection(collectionId)
  if (isNil(collectionResult)) {
    return <span>{t('loading')}</span>
  }
  if (collectionResult.successful) {
    if (isEmpty(collectionResult.data?.contractAddresses)) {
      return <span>{t('error-collection')}</span>
    }
    return <CreateOffer contractAddresses={collectionResult.data!.contractAddresses} />
  }
  return <span>{t('error-fetching')}</span>
}
