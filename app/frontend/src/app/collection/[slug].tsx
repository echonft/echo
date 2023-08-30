import { Collection } from '@echo/ui'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const CollectionPage: NextPage = () => {
  const router = useRouter()
  return (
    <Collection
      slug={router.query.slug as string}
      onCollectionError={(error) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (error.status === 404) {
          void router.replace('/404')
        }
      }}
    />
  )
}

export default CollectionPage
