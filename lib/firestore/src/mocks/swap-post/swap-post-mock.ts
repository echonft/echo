import type { SwapPost } from '@echo/firestore/types/model/swap-post/swap-post'

export function swapPostMock(): Record<string, SwapPost> {
  return {
    Y5nkR8DaI2YQDTXXBVZe: {
      swapId: '2ipuV3drjQlzEgkUkW7q',
      guild: {
        id: '1',
        channelId: '1'
      },
      postedAt: 1676984897
    }
  }
}
