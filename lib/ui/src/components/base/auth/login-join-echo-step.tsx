'use client'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { LoginStepLayout } from '@echo/ui/components/base/auth/layout/login-step-layout'
import { ExternalLink } from '@echo/ui/components/base/external-link'
import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { Direction } from '@echo/ui/constants/direction'
import { discordInviteLink } from '@echo/ui/constants/discord-invite-link'
import { clsx } from 'clsx'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { isNil } from 'ramda'
import { type FunctionComponent, useCallback } from 'react'

interface Props {
  username: string
}

export const LoginJoinEchoStep: FunctionComponent<Props> = ({ username }) => {
  const router = useRouter()
  const t = useTranslations('auth.join-discord')
  const onSkip = useCallback(() => {
    const callbackPath = Cookies.get('callbackPath')
    Cookies.remove('callbackPath')
    if (isNil(callbackPath)) {
      router.replace(frontendRoutes.base.home.get())
    } else {
      router.replace(callbackPath)
    }
  }, [router])

  return (
    <LoginStepLayout title={t('title', { username })}>
      <ExternalLink
        className={clsx(
          'w-full',
          'bg-gradient-to-r',
          'from-[#FFE70B]',
          'to-[#0e0e0e]',
          'rounded-lg',
          'p-[1px]',
          'group'
        )}
        href={discordInviteLink}
        onClick={onSkip}
      >
        <button
          className={clsx(
            'bg-[#0e0e0e]',
            'group-hover:bg-[rgba(14,14,14,0.8)]',
            'rounded-lg',
            'py-5',
            'px-8',
            'w-full'
          )}
        >
          <span className={clsx('prose-header-md-semi', 'bg-joinDiscordLabel', 'italic', 'bg-clip-text')}>
            {t('btn')}
          </span>
        </button>
      </ExternalLink>
      <div className={clsx('flex', 'justify-end', 'w-full')}>
        <button className={clsx('btn-primary', 'group')} onClick={onSkip}>
          <div className={clsx('btn-label-with-icon-layout', 'btn-label-primary')}>
            <span>{t('skipBtn')}</span>
            <SideCaretSvg direction={Direction.Right} />
          </div>
        </button>
      </div>
    </LoginStepLayout>
  )
}
