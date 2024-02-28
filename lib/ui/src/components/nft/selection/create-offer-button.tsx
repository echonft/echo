'use client'
import {
  NftSelectionButton,
  type NftSelectionButtonProps
} from '@echo/ui/components/nft/selection/nft-selection-button'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export interface CreateOfferButtonProps extends Omit<NftSelectionButtonProps, 'label'> {}

export const CreateOfferButton: FunctionComponent<CreateOfferButtonProps> = ({ count, onClick }) => {
  const t = useTranslations('nft.action')
  return <NftSelectionButton label={t('offer')} count={count} onClick={onClick} />
}
