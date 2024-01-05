import { linkProvider } from '@echo/api/services/routing/link-provider'
import { redirect } from 'next/navigation'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionPage: FunctionComponent<Props> = ({ params }) => {
  redirect(linkProvider.collection.items.get(params))
}

export default CollectionPage
