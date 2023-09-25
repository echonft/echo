import { ExternalLink } from '@echo/ui/components/base/link/external-link'
import { HomeDiscordIconSvg } from '@echo/ui/components/base/svg/home-discord-icon-svg'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const DiscordTile: FunctionComponent = () => {
  const t = getTranslator()
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
          {t('home.discord.title')}
        </h1>
        <ExternalLink href={'https://discord.gg/ScXvbyPFTA'}>
          <button className={clsx('btn-primary-reverse', 'group')}>
            <span className={clsx('prose-label-md-semi', 'btn-label-primary-reverse')}>{t('home.discord.btn')}</span>
          </button>
        </ExternalLink>
      </div>
      <HomeDiscordIconSvg width={170} height={185} />
    </div>
  )
}
