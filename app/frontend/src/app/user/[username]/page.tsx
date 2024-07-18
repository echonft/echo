import { pathProvider } from '@echo/api/routing/path-provider'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { WithUsername } from '@echo/model/types/with-username'
import { redirect } from 'next/navigation'

export default function render({ params }: NextParams<WithUsername>) {
  redirect(pathProvider.user.items.get(params))
}
