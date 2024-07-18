'use client'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { PageLayout, type PageLayoutProps } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import type { PageLayoutBackgroundPickerProps } from '@echo/ui/types/props/page-layout-background-picker-props'
import { omit } from 'ramda'
import { cloneElement, type FunctionComponent, type PropsWithChildren, type ReactElement, useState } from 'react'

interface LayoutProps {
  layout?: 'default' | 'padded'
}

interface Props<T extends PageLayoutBackgroundPickerProps> extends PageLayoutProps, LayoutProps {
  children: ReactElement<T>
}

const PageLayoutBackgroundPickerLayout: FunctionComponent<PropsWithChildren<LayoutProps>> = ({ layout, children }) => {
  if (layout === 'default') {
    return <SectionLayout>{children}</SectionLayout>
  }
  if (layout === 'padded') {
    return <NavigationSectionLayout>{children}</NavigationSectionLayout>
  }
  return <>{children}</>
}

export const PageLayoutBackgroundPicker = <T extends PageLayoutBackgroundPickerProps>(props: Props<T>) => {
  const { layout, children, ...rest } = props
  const [background, setBackground] = useState(props.background)
  return (
    <PageLayout background={background} {...omit(['background'], rest)}>
      <PageLayoutBackgroundPickerLayout layout={layout}>
        {cloneElement<T>(children, {
          ...children.props,
          onPageBackgroundUpdate: setBackground
        })}
      </PageLayoutBackgroundPickerLayout>
    </PageLayout>
  )
}
