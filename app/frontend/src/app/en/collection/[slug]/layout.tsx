import { fetcher } from '../../../../lib/helpers/fetcher'
import { collectionApiUrl, GetNftCollectionResponse } from '@echo/api'
import { CollectionDetailsApiProvided } from '@echo/ui'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionLayout: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { slug }, children }) => {
  const { data, error } = await fetcher(collectionApiUrl(slug)).fetch<GetNftCollectionResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  return (
    <>
      <section className={clsx('w-full')}>
        <CollectionDetailsApiProvided response={data.collection} />
      </section>
      <section className={clsx('w-full')}>{children}</section>
    </>
  )
}

export default CollectionLayout
