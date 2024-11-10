'use client'
import { LoginStepLayout } from '@echo/ui/components/auth/layout/login-step-layout'
import { WalletButton } from '@echo/ui/components/wallet/wallet-button'
import { useAccount } from '@echo/ui/hooks/use-account'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  onContinue?: VoidFunction
  onWalletButtonClick?: MouseEventHandler
}

export const LoginConnectWalletStep: FunctionComponent<Props> = ({ onContinue, onWalletButtonClick }) => {
  const t = useTranslations('auth.wallet')
  const { status } = useAccount()
  return (
    <LoginStepLayout
      title={t('title')}
      subtitle={t('subtitle')}
      btnLabel={status === AccountStatus.Connected ? t('btn.continue') : t('btn.skip')}
      btnDisabled={status === AccountStatus.Connecting}
      onBtnClick={onContinue}
    >
      <WalletButton onClick={onWalletButtonClick} />
    </LoginStepLayout>
  )
}
