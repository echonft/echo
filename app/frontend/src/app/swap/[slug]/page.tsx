import { getSwap } from '@echo/firestore/crud/swap/get-swap'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { toSwapWithRole } from '@echo/frontend/lib/helpers/swap/to-swap-with-role'
import type { User } from '@echo/model/types/user'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SwapDetails } from '@echo/ui/components/swap/details/swap-details'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import { andThen, isNil, pipe } from 'ramda'

interface SwapPageProps {
  params: {
    slug: Lowercase<string>
  }
  user: Nullable<User>
}

async function render({ params: { slug }, user }: SwapPageProps) {
  const swap = await pipe(getSwap, andThen(unlessNil(toSwapWithRole(user))))(slug)

  if (isNil(swap)) {
    notFound()
  }

  return (
    <PageLayout>
      <Header />
      <MainSectionLayout>
        <SwapDetails swap={swap} />
      </MainSectionLayout>
    </PageLayout>
  )
}

export default withUser(render)
