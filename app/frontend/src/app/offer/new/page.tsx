import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextSearchParams } from '@echo/frontend/lib/types/next-search-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { DetailsPaddedContainer } from '@echo/ui/components/base/layout/details-padded-container'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { notFound } from 'next/navigation'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<
  NextSearchParams<{
    receiverItems?: string[]
  }>
>

function render({ searchParams: { receiverItems }, user }: Params) {
  // Cannot go to that page without previously selected data. Could change in the future
  if (isNilOrEmpty(receiverItems)) {
    notFound()
  }

  // TODO Fetch the items

  // TODO Design
  return (
    <PageLayout user={user}>
      <SectionLayout>
        <DetailsPaddedContainer></DetailsPaddedContainer>
      </SectionLayout>
    </PageLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
