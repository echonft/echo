import { CreateOfferFetcher } from '@components/create-offer-fetcher'
import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
const DynamicAuthPage = dynamic(() => import('@components/pages/auth-page').then((mod) => mod.AuthPage), { ssr: false })

const CreateOffer: NextPage = () => {
  const router = useRouter()
  const { collectionId } = router.query
  return (
    <DynamicAuthPage>
      <CreateOfferFetcher collectionId={collectionId as string} />
    </DynamicAuthPage>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  }
}

export default CreateOffer
