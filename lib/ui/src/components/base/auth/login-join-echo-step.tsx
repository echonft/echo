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
      <div className={clsx('w-full')}>
        <ExternalLink href={discordInviteLink} onClick={onSkip}>
          <div
            className={clsx('w-full', 'bg-gradient-to-r', 'from-[#FFE70B]', 'to-[#0e0e0e]', 'rounded-lg', 'p-[1px]')}
          >
            <button
              className={clsx(
                'bg-[#0e0e0e]',
                'rounded-lg',
                'py-5',
                'px-8',
                'w-full',
                'text-left',
                'group',
                'enabled:hover:bg-[#1f1e1e]'
              )}
            >
              <span className={clsx('prose-header-md-semi', 'bg-joinDiscordLabel', 'italic', 'bg-clip-text')}>
                {t('btn')}
              </span>
            </button>
          </div>
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
