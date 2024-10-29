// noinspection JSUnusedGlobalSymbols

import { Header as Component } from '@echo/ui/components/base/header/header'
import { HeaderStyle } from '@echo/ui/constants/header-style'
import { useHeaderStore } from '@echo/ui/hooks/use-header-store'
import { type Meta, type StoryObj } from '@storybook/react'
import { useEffect } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Base/Header',
  component: Component
}

export default metadata

export const LogoOnly: StoryObj<typeof Component> = {
  render: () => {
    const setStyle = useHeaderStore((state) => state.setStyle)

    useEffect(() => {
      setStyle(HeaderStyle.Plain)
      return (): void => {
        setStyle(HeaderStyle.Default)
      }
    }, [setStyle])

    return <Component user={undefined} />
  }
}
