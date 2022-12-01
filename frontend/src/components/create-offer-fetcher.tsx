import { CreateOffer } from '@components/create-offer'
import { useFetchCollection } from '@lib/services/firebase/hooks/use-fetch-collection'
import { useTranslations } from 'next-intl'
import { isEmpty, isNil } from 'rambda'
import { FunctionComponent } from 'react'

interface Props {
  collectionId: string
}

export const CreateOfferFetcher: FunctionComponent<Props> = ({ collectionId }) => {
  const t = useTranslations('CreateOffer')
  const collectionResult = useFetchCollection(collectionId)
  if (isNil(collectionResult)) {
    return <span>{t('loading')}</span>
  }
  if (collectionResult.successful) {
    if (isEmpty(collectionResult.data?.contractAddresses)) {
      return <span>{t('error-collection')}</span>
    }
    return <CreateOffer collection={collectionResult.data!} />
  }
  return <span>{t('error-fetching')}</span>
}
