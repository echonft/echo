import { ModalOfferState } from '../../../types/modal-offer-state'
import { ModalSubtitle } from '../../base/modal/modal-subtitle'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  state: ModalOfferState
}

export const OfferDetailsOfferActionModalSubtitle: FunctionComponent<Props> = ({ state }) => {
  const t = useTranslations(`offer.details.actionModal.${state}`)
  return <ModalSubtitle>{t('subtitle')}</ModalSubtitle>
}
