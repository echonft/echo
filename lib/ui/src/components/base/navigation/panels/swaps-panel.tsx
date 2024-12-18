'use client'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { SwapCards } from '@echo/ui/components/swap/card/swap-cards'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import { TabPanel } from '@headlessui/react'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { type FunctionComponent } from 'react'

interface Props {
  swaps: SwapWithRole[]
  show?: boolean
}

export const SwapsPanel: FunctionComponent<Props> = ({ swaps, show }) => {
  const router = useRouter()

  if (show) {
    return (
      <TabPanel className={clsx('outline-none')}>
        <SwapCards
          swaps={swaps}
          onSelect={(slug) => {
            router.push(frontendRoutes.swap.details.getUrl({ slug }))
          }}
        />
      </TabPanel>
    )
  }
  return null
}
