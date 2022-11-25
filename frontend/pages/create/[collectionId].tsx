import { CreateOfferFetcher } from '@components/create-offer-fetcher'
import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { isNil } from 'rambda'
const DynamicAuthPage = dynamic(() => import('@components/pages/auth-page').then((mod) => mod.AuthPage), {
  ssr: false
})

const CreateOffer: NextPage = () => {
  const router = useRouter()
  const { collectionId } = router.query
  return (
    <DynamicAuthPage>
      <CreateOfferFetcher collectionId={collectionId as string} />
    </DynamicAuthPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale, defaultLocale }) => {
  return {
    props: {
      messages: (await import(`@lib/messages/${isNil(locale) ? defaultLocale! : locale}.json`)).default
    }
  }
}

export default CreateOffer
