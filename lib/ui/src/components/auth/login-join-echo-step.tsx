import { LoginButton } from '@echo/ui/components/auth/login-button'
import { LoginFlowContinueButton } from '@echo/ui/components/auth/login-flow-continue-button'
import { LoginFlowSubtitle } from '@echo/ui/components/auth/login-flow-subtitle'
import { LoginFlowTitle } from '@echo/ui/components/auth/login-flow-title'
import { ExternalLink } from '@echo/ui/components/base/link/external-link'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  username: string
  onContinue?: VoidFunction
}

export const LoginJoinEchoStep: FunctionComponent<Props> = ({ username, onContinue }) => {
  const t = useTranslations('auth.step1')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-12', 'items-center')}>
      <LoginFlowTitle>{t('title', { username })}</LoginFlowTitle>
      <div className={clsx('flex', 'flex-col', 'gap-2.5', 'items-center')}>
        <LoginFlowSubtitle>{t('subtitle')}</LoginFlowSubtitle>
        <ExternalLink href={'https://discord.gg/UhsX7xJT5t'}>
          <LoginButton disabled={false}>{t('btn.label')}</LoginButton>
        </ExternalLink>
      </div>
      <div className={clsx('flex', 'justify-end', 'w-full')}>
        <LoginFlowContinueButton disabled={false} onClick={onContinue} />
      </div>
    </div>
  )
}
