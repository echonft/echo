'use client'
import { LoginStepLayout } from '@echo/ui/components/auth/layout/login-step-layout'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { useWalletStore } from '@echo/ui/hooks/use-wallet-store'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  onContinue?: VoidFunction
  onWalletButtonClick?: MouseEventHandler
}

export const LoginConnectWalletStep: FunctionComponent<Props> = ({ onContinue, onWalletButtonClick }) => {
  const t = useTranslations('auth.step2')
  const { status } = useWalletStore((state) => state.account)
  return (
    <LoginStepLayout
      title={t('title')}
      subtitle={t('subtitle')}
      btnLabel={t(`continueBtn.${status}`)}
      btnDisabled={status === AccountStatus.Connecting}
      onBtnClick={onContinue}
    >
      <ConnectWalletButton onClick={onWalletButtonClick} />
    </LoginStepLayout>
  )
}
