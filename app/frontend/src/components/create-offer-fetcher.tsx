import { CreateOffer } from '@components/create-offer'
import { useDiscordGuild } from '@echo/firebase-react'
import { useTranslations } from 'next-intl'
import { isEmpty, isNil } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  collectionId: string
}

export const CreateOfferFetcher: FunctionComponent<Props> = ({ collectionId }) => {
  const t = useTranslations('CreateOffer')
  const collectionResult = useDiscordGuild(collectionId)
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
