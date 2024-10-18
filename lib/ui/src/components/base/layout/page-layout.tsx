'use client'
import type { User } from '@echo/auth/types/user'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { Header } from '@echo/ui/components/base/header/header'
import { Dependencies } from '@echo/ui/components/base/layout/dependencies'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { Web3Provider } from '@echo/ui/components/base/web3-provider'
import type { Background } from '@echo/ui/constants/background'
import { useBackground } from '@echo/ui/hooks/use-background'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { pick } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export interface PageLayoutProps {
  background?: Background
  excludeProviders?: boolean
  headerVariants?: {
    logoOnly?: boolean
  }
  user?: Nullable<User>
}

const PageLayoutInner: FunctionComponent<PropsWithChildren<Exclude<PageLayoutProps, 'excludeProviders'>>> = ({
  background,
  headerVariants,
  user,
  children
}) => {
  const bgProps = useBackground(background)
  return (
    <div className={clsx('page-layout', bgProps.className)} {...pick(['style'], bgProps)}>
      <Header logoOnly={Boolean(headerVariants?.logoOnly)} user={user} />
      <MainSectionLayout>
        {children}
        <CalloutManager />
      </MainSectionLayout>
    </div>
  )
}

export const PageLayout: FunctionComponent<PropsWithChildren<PageLayoutProps>> = ({ excludeProviders, ...rest }) => {
  if (excludeProviders) {
    return <PageLayoutInner {...rest} />
  }
  return (
    <Dependencies>
      <Web3Provider>
        <PageLayoutInner {...rest} />
      </Web3Provider>
    </Dependencies>
  )
}
