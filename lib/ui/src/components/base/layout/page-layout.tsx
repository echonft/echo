'use client'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  background?: PageLayoutBackground
}

export const PageLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  background = PageLayoutBackground.Default,
  children
}) => {
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
