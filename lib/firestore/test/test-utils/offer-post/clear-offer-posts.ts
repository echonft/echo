import { deleteOfferPost } from '@echo/firestore/crud/offer-post/delete-offer-post'
import { getAllOfferPosts } from '@echo/firestore/crud/offer-post/get-all-offer-posts'

export async function clearOfferPosts() {
  const documents = await getAllOfferPosts()
  for (const document of documents) {
    try {
      await deleteOfferPost(document.id)
    } catch (e) {
      // nothing to do
    }
  }
}
