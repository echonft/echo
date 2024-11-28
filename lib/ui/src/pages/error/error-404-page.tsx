'use client'
import { Header } from '@echo/ui/components/base/header/header'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { EchoIconSvg } from '@echo/ui/components/base/svg/echo-icon-svg'
import { HeaderStyle } from '@echo/ui/constants/header-style'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const Error404Page: FunctionComponent = () => {
  const t = useTranslations('notFoundPage')
  return (
    <PageLayout>
      <Header options={HeaderStyle.Plain} />
      <MainSectionLayout>
        <div className={clsx('w-max', 'h-full', 'flex', 'flex-col', 'mx-auto', 'items-center')}>
          <div
            className={clsx(
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
            <EchoIconSvg className={clsx('absolute', 'top-[200px]', 'left-[230px]', 'text-yellow-500')} height={400} />
            <span className={clsx('h-max', 'mr-[130px]')}>4</span>
            <span className={clsx('h-max', 'ml-[130px]')}>4</span>
          </div>
          <div className={clsx('flex', 'flex-col', 'items-center', '-translate-y-20', 'select-none')}>
            <p
              className={clsx(
                'w-max',
                'text-[3rem]',
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
              <button className={clsx('btn-primary', 'group')}>
                <span className={clsx('btn-label-primary')}>{t('homeBtn')}</span>
              </button>
            </InternalLink>
          </div>
        </div>
      </MainSectionLayout>
    </PageLayout>
  )
}
