'use client'
import type { User } from '@echo/auth/types/user'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { Header } from '@echo/ui/components/base/header/header'
import { Dependencies } from '@echo/ui/components/base/layout/dependencies'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { Web3Provider } from '@echo/ui/components/base/web3-provider'
import {
  PAGE_LAYOUT_BG_COLLECTIONS,
  PAGE_LAYOUT_BG_DEFAULT,
  PAGE_LAYOUT_BG_GREEN_GRADIENT,
  PAGE_LAYOUT_BG_HOME,
  PAGE_LAYOUT_BG_RED_GRADIENT,
  PAGE_LAYOUT_BG_SUCCESS,
  PAGE_LAYOUT_BG_YELLOW_GRADIENT
} from '@echo/ui/constants/page-layout-background'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import type { PageLayoutBackground } from '@echo/ui/types/page-layout-background'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  background?: PageLayoutBackground
  excludeProviders?: boolean
  headerVariants?: {
    logoOnly?: boolean
  }
  user?: Nullable<User>
}

const PageLayoutInner: FunctionComponent<PropsWithChildren<Exclude<Props, 'excludeProviders'>>> = ({
  background = PAGE_LAYOUT_BG_DEFAULT,
  headerVariants,
  user,
  children
}) => {
  return (
    <div
      className={clsx(
        'w-full',
        'h-full',
        background === PAGE_LAYOUT_BG_DEFAULT && 'bg-dark-500',
        background === PAGE_LAYOUT_BG_HOME && ['bg-home', 'bg-[length:100%_41.4375rem]', 'bg-no-repeat'],
        background === PAGE_LAYOUT_BG_COLLECTIONS && ['bg-home', 'bg-no-repeat'],
        background === PAGE_LAYOUT_BG_GREEN_GRADIENT && ['bg-gradientGreen', 'bg-no-repeat'],
        background === PAGE_LAYOUT_BG_YELLOW_GRADIENT && ['bg-gradientYellow', 'bg-no-repeat'],
        background === PAGE_LAYOUT_BG_RED_GRADIENT && ['bg-gradientRed', 'bg-no-repeat']
      )}
      style={
        background === PAGE_LAYOUT_BG_SUCCESS
          ? {
              background: `url('https://storage.googleapis.com/echo-dev-public/success-banner-left.png?alt=media') 0 1.5rem no-repeat, url('https://storage.googleapis.com/echo-dev-public/success-banner-right.png?alt=media') 100% 1.5rem no-repeat, ${themeExtension.colors.dark['500']}`
            }
          : undefined
      }
    >
      <Header logoOnly={Boolean(headerVariants?.logoOnly)} user={user} />
      <MainSectionLayout>
        {children}
        <CalloutManager />
      </MainSectionLayout>
    </div>
  )
}

export const PageLayout: FunctionComponent<PropsWithChildren<Props>> = ({ excludeProviders, ...rest }) => {
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
