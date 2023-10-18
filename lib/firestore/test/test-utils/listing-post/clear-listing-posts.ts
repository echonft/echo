import { deleteListingPost } from '@test-utils/listing-post/delete-listing-post'
import { getAllListingPosts } from '@test-utils/listing-post/get-all-listing-posts'

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
