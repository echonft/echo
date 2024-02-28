'use client'
import {
  NftSelectionButton,
  type NftSelectionButtonProps
} from '@echo/ui/components/nft/selection/nft-selection-button'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const CreateListingButton: FunctionComponent<Omit<NftSelectionButtonProps, 'label'>> = ({ count, onClick }) => {
  const t = useTranslations('nft.action')
  return <NftSelectionButton label={t('listing')} count={count} onClick={onClick} />
}
