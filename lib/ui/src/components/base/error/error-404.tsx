import { InternalLink } from '@echo/ui/components/base/internal-link'
import { EchoIconSvg } from '@echo/ui/components/base/svg/echo-icon-svg'
import { classes } from '@echo/ui/helpers/classes'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const Error404: FunctionComponent = () => {
  const t = useTranslations('notFoundPage')
  return (
    <div className={classes('w-max', 'h-full', 'flex', 'flex-col', 'mx-auto', 'items-center')}>
      <div
        className={classes(
          'relative',
          'w-max',
          'text-[31.25rem]',
          'leading-[155%]',
          'tracking-[0.3125rem]',
          'font-semibold',
          'font-inter',
          'text-white',
          'select-none'
        )}
      >
        <EchoIconSvg className={classes('absolute', 'top-[200px]', 'left-[230px]', 'text-yellow-500')} height={400} />
        <span className={classes('h-max', 'mr-[130px]')}>4</span>
        <span className={classes('h-max', 'ml-[130px]')}>4</span>
      </div>
      <div className={classes('flex', 'flex-col', 'items-center', '-translate-y-20', 'select-none')}>
        <p
          className={classes(
            'w-max',
            'text-[4.375rem]',
            'leading-[129%]',
            'tracking-[0.04375rem]',
            'font-normal',
            'font-inter',
            'text-yellow-500',
            'opacity-40',
            'uppercase',
            'mb-12'
          )}
        >
          {t('title')}
          <br />
          {t('subtitle')}
        </p>
        <InternalLink path={'/'}>
          <button className={classes('btn-primary-reverse', 'btn-size')}>
            <span
              className={classes(
                'btn-label-primary-reverse',
                'text-[1.5rem]',
                'leading-[155%]',
                'tracking-[0.015rem]',
                'font-bold',
                'font-inter',
                'whitespace-pre-line'
              )}
            >
              {t('homeBtn')}
            </span>
          </button>
        </InternalLink>
      </div>
    </div>
  )
}
