'use client'
import { LoginStepLayout } from '@echo/ui/components/auth/layout/login-step-layout'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  onContinue?: VoidFunction
  onWalletButtonClick?: MouseEventHandler
}

export const LoginConnectWalletStep: FunctionComponent<Props> = ({ onContinue, onWalletButtonClick }) => {
  const t = useTranslations('auth.step2')
  const { status } = useAccount()
  return (
    <LoginStepLayout
      title={t('title')}
      subtitle={t('subtitle')}
      btnLabel={t(`continueBtn.${status}`)}
      btnDisabled={status === 'connecting'}
      onBtnClick={onContinue}
    >
      <ConnectWalletButton onClick={onWalletButtonClick} />
    </LoginStepLayout>
  )
}
