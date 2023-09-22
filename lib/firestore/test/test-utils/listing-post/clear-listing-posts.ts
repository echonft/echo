import { deleteListingPost } from '@echo/firestore/crud/listing-post/delete-listing-post'
import { getAllListingPosts } from '@echo/firestore/crud/listing-post/get-all-listing-posts'

export async function clearListingPosts() {
  const documents = await getAllListingPosts()
  for (const document of documents) {
    try {
      await deleteListingPost(document.id)
    } catch (e) {
      // nothing to do
    }
  }
}
