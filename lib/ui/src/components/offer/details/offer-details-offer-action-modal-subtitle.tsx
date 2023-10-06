import { UpdateOfferAction } from '@echo/api/types/update-offer-action'
import { ModalSubtitle } from '@echo/ui/components/layout/modal/modal-subtitle'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  action: UpdateOfferAction
}

export const OfferDetailsOfferActionModalSubtitle: FunctionComponent<Props> = ({ action }) => {
  const t = useTranslations(`offer.details.actionModal.${action}`)
  return <ModalSubtitle>{t('subtitle')}</ModalSubtitle>
}
