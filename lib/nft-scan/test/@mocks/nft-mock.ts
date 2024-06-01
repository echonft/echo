import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'

export function nftMock(): Record<
  string,
  Omit<Nft, 'collection' | 'owner' | 'updatedAt'> & Record<'collection', Pick<Collection, 'contract'>>
> {
  return {
    '1': {
      animationUrl: undefined,
      attributes: [
        { trait: 'Backgrounds', value: 'Purple' },
        { trait: 'Base', value: 'Purple Gradient' },
        { trait: 'Clothes', value: 'Blue Puffer' },
        { trait: 'Head', value: 'None' },
        { trait: 'Eyes', value: 'None' },
        { trait: 'Acessories', value: 'None' }
      ],
      collection: {
        contract: {
          address: '0x71da4d5805c1f2ecce2a41a9f9e026287f2b1f39',
          chain: 'blast'
        }
      },
      name: 'Blast Penguins #2944',
      metadataUrl: 'https://dweb.link/ipfs/bafybeier5k54xnsw26fhttl673vc57jmbddvkkjn4skiel26t5yawsi3x4/2944.json',
      pictureUrl: 'ipfs://bafybeibfviw32fzcimiobx2shiukbwis5cyufmenvddajvzbr3u4uwco3a/2944.png',
      tokenId: 2944
    },
    '2': {
      animationUrl: undefined,
      attributes: [
        { trait: 'PugLife', value: '8371' },
        { trait: 'Pug Life', value: '8207' }
      ],
      collection: {
        contract: {
          address: '0x89ae653674178738854c83426c6ac6be69900766',
          chain: 'blast'
        }
      },
      name: 'PugLife #3353',
      metadataUrl: 'https://dweb.link/ipfs/QmSdKU7BXss97e1WEgwRyzwRBSvaAUHW2CbudsP8zPojfc/3353.json',
      pictureUrl: 'ipfs://Qmbg2e3oRjbngfa1zxgD96znNbGPw7cU7SsFjLWSErhgGG//3353.png',
      tokenId: 3353
    },
    '3': {
      animationUrl: undefined,
      attributes: [
        { trait: 'PugLife', value: '8873' },
        { trait: 'Pug Life', value: '6011' }
      ],
      collection: {
        contract: {
          address: '0x89ae653674178738854c83426c6ac6be69900766',
          chain: 'blast'
        }
      },
      name: 'PugLife #3344',
      metadataUrl: 'https://dweb.link/ipfs/QmSdKU7BXss97e1WEgwRyzwRBSvaAUHW2CbudsP8zPojfc/3344.json',
      pictureUrl: 'ipfs://Qmbg2e3oRjbngfa1zxgD96znNbGPw7cU7SsFjLWSErhgGG//3344.png',
      tokenId: 3344
    }
  }
}
