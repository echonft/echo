'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { BannerManager } from '@echo/ui/components/base/banner/banner-manager'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { HeaderSwitch } from '@echo/ui/components/base/header/header-switch'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayoutWrapper } from '@echo/ui/components/base/layout/page-layout-wrapper'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import {
  PAGE_LAYOUT_BG_COLLECTIONS,
  PAGE_LAYOUT_BG_DEFAULT,
  PAGE_LAYOUT_BG_GREEN_GRADIENT,
  PAGE_LAYOUT_BG_HOME,
  PAGE_LAYOUT_BG_RED_GRADIENT,
  PAGE_LAYOUT_BG_YELLOW_GRADIENT
} from '@echo/ui/constants/page-layout-background'
import type { PageLayoutBackground } from '@echo/ui/types/page-layout-background'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  background?: PageLayoutBackground
  headerVariants?: {
    logoOnly?: boolean
  }
  user?: Nullable<AuthUser>
}

export const PageLayout: FunctionComponent<PropsWithChildren<Props>> = ({
  background = PAGE_LAYOUT_BG_DEFAULT,
  headerVariants,
  user,
  children
}) => {
  return (
    <PageLayoutWrapper>
      <Web3Provider>
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
        >
          <HeaderSwitch logoOnly={Boolean(headerVariants?.logoOnly)} user={user} />
          <MainSectionLayout>
            {children}
            <CalloutManager />
            <BannerManager />
          </MainSectionLayout>
        </div>
      </Web3Provider>
    </PageLayoutWrapper>
  )
}
