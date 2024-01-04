import { Header, type HeaderProps } from '@echo/ui/components/layout/header/header'
import { MainSectionLayout } from '@echo/ui/components/layout/main-section-layout'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  headerProps: HeaderProps
  bg?: 'default' | 'transparent'
}

export const PageLayout: FunctionComponent<PropsWithChildren<Props>> = ({ headerProps, bg = 'default', children }) => {
  return (
    <div
      className={clsx(
        'w-full',
        'h-full',
        'overflow-y-auto',
        bg === 'default' && 'bg-dark-500',
        !isNil(headerProps?.absolute) && 'relative'
      )}
    >
      <Header {...headerProps} />
      <MainSectionLayout>{children}</MainSectionLayout>
    </div>
  )
}
