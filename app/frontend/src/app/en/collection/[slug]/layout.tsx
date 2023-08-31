import { GetNftCollectionResponse, nftCollectionApiUrl } from '@echo/api-public'
import { CollectionDetailsApiProvided } from '@echo/ui'
import { getData } from '@echo/utils'
import { clsx } from 'clsx'
import { notFound } from 'next/navigation'
import { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  params: {
    slug: string
  }
}
const CollectionLayout: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { slug }, children }) => {
  try {
    const collectionResponse = await getData<GetNftCollectionResponse>(nftCollectionApiUrl(slug))
    return (
      <>
        <section className={clsx('w-full')}>
          <CollectionDetailsApiProvided collectionResponse={collectionResponse} />
        </section>
        <section className={clsx('w-full', 'pt-14')}>{children}</section>
      </>
    )
  } catch (e) {
    notFound()
  }
}

export default CollectionLayout
