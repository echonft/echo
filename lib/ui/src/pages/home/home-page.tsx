'use client'
import type { Swap } from '@echo/model/types/swap'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import { usePageLayoutStore } from '@echo/ui/hooks/use-page-layout-store'
import { HomeCollections } from '@echo/ui/pages/home/collection/home-collections'
import { DiscordTile } from '@echo/ui/pages/home/discord/discord-tile'
import { HomeHero } from '@echo/ui/pages/home/hero/home-hero'
import { HomeDiscordTileLayout } from '@echo/ui/pages/home/layout/home-discord-tile-layout'
import { HomeLayout } from '@echo/ui/pages/home/layout/home-layout'
import { HomeSectionsLayout } from '@echo/ui/pages/home/layout/home-sections-layout'
import { RecentSwaps } from '@echo/ui/pages/home/swap/recent-swaps'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { head, tail } from 'ramda'
import { type FunctionComponent, useEffect } from 'react'

interface Props {
  collections: CollectionWithRank[]
  swaps: Swap[]
}

export const HomePage: FunctionComponent<Props> = ({ collections, swaps }) => {
  const setBackground = usePageLayoutStore((state) => state.setBackground)

  useEffect(() => {
    setBackground(PageLayoutBackground.Home)
    return (): void => {
      setBackground(PageLayoutBackground.Default)
    }
  }, [setBackground])

  return (
    <HomeLayout>
      <HomeSectionsLayout>
        <HomeHero collection={head(collections)} />
        <HomeCollections collections={tail(collections)} />
        <RecentSwaps swaps={swaps} />
        <HomeDiscordTileLayout>
          <DiscordTile />
        </HomeDiscordTileLayout>
      </HomeSectionsLayout>
    </HomeLayout>
  )
}
