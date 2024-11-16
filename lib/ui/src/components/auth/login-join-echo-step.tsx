'use client'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { LoginStepLayout } from '@echo/ui/components/auth/layout/login-step-layout'
import { LoginJoinDiscordButton } from '@echo/ui/components/auth/login-join-discord-button'
import { ExternalLink } from '@echo/ui/components/base/external-link'
import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { Direction } from '@echo/ui/constants/direction'
import { discordInviteLink } from '@echo/ui/constants/discord-invite-link'
import { useLoginStore } from '@echo/ui/hooks/use-login-store'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { isNil } from 'ramda'
import { type FunctionComponent, useCallback } from 'react'

interface Props {
  username: string
}

export const LoginJoinEchoStep: FunctionComponent<Props> = ({ username }) => {
  const router = useRouter()
  const { callbackPath, reset } = useLoginStore.getState()
  const t = useTranslations('auth.join-discord')
  const onSkip = useCallback(() => {
    reset()
    if (isNil(callbackPath)) {
      router.replace(frontendRoutes.base.home.get())
    } else {
      router.replace(callbackPath)
    }
  }, [callbackPath, reset, router])

  return (
    <LoginStepLayout title={t('title', { username })}>
      <div className={clsx('w-full')}>
        <ExternalLink href={discordInviteLink} onClick={onSkip}>
          <LoginJoinDiscordButton>{t('btn')}</LoginJoinDiscordButton>
        </ExternalLink>
      </div>
      <div className={clsx('flex', 'justify-end', 'w-full')}>
        <button
          className={clsx('group', 'btn', 'gap-8', 'pr-2', 'pl-8', 'py-2.5', 'enabled:hover:bg-white/[0.08]')}
          onClick={onSkip}
        >
          <span className={clsx('btn-label-secondary', 'prose-paragraph-sm', '!text-[0.9375rem]')}>{t('skipBtn')}</span>
          <span className={clsx('btn-label-secondary')}>
            <SideCaretSvg direction={Direction.Right} />
          </span>
        </button>
      </div>
    </LoginStepLayout>
  )
}
