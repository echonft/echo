import { PaddedLayout } from '@echo/ui/components/base/layout/padded-layout'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  title: string
  subtitle: string
}

export const HomeHeroLayout: FunctionComponent<PropsWithChildren<Props>> = ({ title, subtitle, children }) => {
  return (
    <PaddedLayout>
      <div className={clsx('flex', 'flex-row', 'items-center', 'justify-between', 'gap-28', 'w-full', 'h-max')}>
        <div className={clsx('flex', 'flex-col', 'w-max', 'h-max', 'gap-10')}>
          <h1
            className={clsx(
              'text-[3rem]',
              'leading-[122%]',
              'tracking-[-0.045rem]',
              'capitalize',
              'whitespace-pre-line',
              'font-semibold',
              'font-inter',
              'text-white'
            )}
          >
            {title}
          </h1>
          <h2 className={clsx('prose-header-md', 'text-white/70')}>{subtitle}</h2>
        </div>
        {children}
      </div>
    </PaddedLayout>
  )
}
