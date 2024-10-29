'use client'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import { usePageLayoutStore } from '@echo/ui/hooks/use-page-layout-store'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const PageLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const background = usePageLayoutStore((state) => state.background)
  return (
    <div
      className={clsx(
        'page-layout',
        background === PageLayoutBackground.Default && 'bg-dark-500',
        background === PageLayoutBackground.Home && ['bg-home', 'bg-[length:100%_41.4375rem]', 'bg-no-repeat'],
        background === PageLayoutBackground.Collections && ['bg-home', 'bg-no-repeat']
      )}
    >
      {children}
    </div>
  )
}
