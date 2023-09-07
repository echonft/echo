import { links } from '@echo/ui'
import { redirect } from 'next/navigation'
import { FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionPage: FunctionComponent<Props> = ({ params: { slug } }) => {
  redirect(links.collection.collectionItemsLink(slug))
}

export default CollectionPage
