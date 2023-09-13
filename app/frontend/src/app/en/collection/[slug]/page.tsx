import { links } from '@echo/ui/constants/links'
import { redirect } from 'next/navigation'
import type { FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionPage: FunctionComponent<Props> = ({ params: { slug } }) => {
  redirect(links.collection.items(slug))
}

export default CollectionPage
