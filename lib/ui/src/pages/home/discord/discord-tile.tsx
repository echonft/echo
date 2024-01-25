import { ExternalLink } from '@echo/ui/components/base/external-link'
import { HomeDiscordIconSvg } from '@echo/ui/components/base/svg/home-discord-icon-svg'
import { DISCORD_INVITE_LINK } from '@echo/utils/constants/discord-invite-link'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const DiscordTile: FunctionComponent = () => {
  const t = useTranslations('home.discord')

  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'rounded-2xl',
        'bg-white/[0.05]',
        'py-14',
        'px-7',
        'justify-between',
        'items-center'
      )}
    >
      <div className={clsx('flex', 'flex-col', 'gap-4', 'h-max', 'w-max')}>
        <h1
          className={clsx(
            'text-[2.25rem]',
            'leading-[122%]',
            'tracking-[-0.03375rem]',
            'capitalize',
            'whitespace-pre-line',
            'font-medium',
            'font-inter',
            'text-white'
          )}
        >
          {t('title')}
        </h1>
        <ExternalLink href={DISCORD_INVITE_LINK}>
          <button className={clsx('btn-primary-reverse', 'btn-size', 'group')}>
            <span className={clsx('prose-label-md-semi', 'btn-label-primary-reverse')}>{t('btn')}</span>
          </button>
        </ExternalLink>
      </div>
      <HomeDiscordIconSvg width={170} height={185} />
    </div>
  )
}
