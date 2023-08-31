import { InternalLink } from '../base/internal-link'
import { EchoIconSvg } from '../base/svg/echo-icon-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const NotFound: FunctionComponent = () => {
  const t = useTranslations('notFoundPage')
  return (
    <div className={clsx('w-max', 'flex', 'flex-col', 'mt-44', 'mx-auto', 'items-center')}>
      <div
        className={clsx(
          'relative',
          'w-max',
          'text-[31.25rem]',
          'leading-[155%]',
          'tracking-[0.3125rem]',
          'font-semibold',
          'font-inter',
          'text-white'
        )}
      >
        <EchoIconSvg
          className={clsx('absolute', 'top-[200px]', 'left-[230px]', 'z-20', 'text-yellow-500')}
          height={400}
        />
        <span className={clsx('h-max', 'mr-[130px]')}>4</span>
        <span className={clsx('h-max', 'ml-[130px]')}>4</span>
      </div>
      <div className={clsx('flex', 'flex-col', 'items-center', '-translate-y-20')}>
        <p
          className={clsx(
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
          {t.rich('title', {
            br: () => <br />
          })}
        </p>
        <InternalLink link={'/'}>
          <button className={clsx('btn-primary-reverse', 'group', 'w-max', 'rounded-lg', 'px-5', 'py-2.5')}>
            <span
              className={clsx(
                'btn-label-primary-reverse',
                'text-[1.5rem]',
                'leading-[155%]',
                'tracking-[0.015rem]',
                'font-bold',
                'font-inter',
                'whitespace-pre-line'
              )}
            >
              {t('button.label')}
            </span>
          </button>
        </InternalLink>
      </div>
    </div>
  )
}
