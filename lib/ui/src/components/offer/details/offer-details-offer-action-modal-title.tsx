import { ModalOfferState } from '../../../types/modal-offer-state'
import { ModalTitle } from '../../base/modal/modal-title'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  state: ModalOfferState
}

export const OfferDetailsOfferActionModalTitle: FunctionComponent<Props> = ({ state }) => {
  const t = useTranslations(`offer.details.actionModal.${state}`)
  return <ModalTitle>{t('title')}</ModalTitle>
}
