import { SizeLG, SizeSM } from '../../../types/size'
import { ButtonColorScheme } from '../../base/buttons/button-color-scheme'
import { TextButton } from '../../base/buttons/text-button'
import { useTranslations } from 'next-intl'
import { FunctionComponent, MouseEventHandler } from 'react'

export interface ConnectButtonProps {
  onConnect?: MouseEventHandler
}

export const ConnectButton: FunctionComponent<ConnectButtonProps> = ({ onConnect }) => {
  const t = useTranslations()
  return (
    <TextButton
      size={SizeSM}
      colorScheme={ButtonColorScheme.GRADIENT}
      label={t('layout.header.connectButton')}
      fixedWidth={SizeLG}
      onClick={onConnect}
    />
  )
}
