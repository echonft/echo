import { useDiscordGuild } from '@echo/firebase-react'
import { R } from '@mobily/ts-belt'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  collectionId: string
}

export const CreateOfferFetcher: FunctionComponent<Props> = ({ collectionId }) => {
  const t = useTranslations('CreateOffer')
  const { isLoading, data: result } = useDiscordGuild(collectionId)
  if (isLoading) {
    return <span>{t('loading')}</span>
  }
  // FIXME
  if (!isNil(result) && R.isOk(result)) {
    return null
  }
  return <span>{t('error-fetching')}</span>
}
