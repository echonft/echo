import { TokenType } from '@echo/model/constants/token-type'
import type { NftResponse } from '@echo/nft-scan/types/response/nft-response'

export function nftResponseMock(): Record<string, NftResponse> {
  return {
    '1': {
      contract_address: '0x71da4d5805c1f2ecce2a41a9f9e026287f2b1f39',
      contract_name: 'BlastPenguin',
      contract_token_id: '0x0000000000000000000000000000000000000000000000000000000000000b80',
      token_id: '2944',
      erc_type: TokenType.Erc721,
      amount: '1',
      minter: '0x8eab75f97df4a5adb67bdf02aec8ecebe1f64898',
      owner: '0xf672715f2ba85794659a7150e8c21f8d157bfe1d',
      own_timestamp: 1717119521000,
      mint_timestamp: 1709301627000,
      mint_transaction_hash: '0x074d248b0ff723adc9f2284693aade99410d2d85ec6bd74c7d8c7f8c77918a7f',
      mint_price: 0.012,
      token_uri: 'https://dweb.link/ipfs/bafybeier5k54xnsw26fhttl673vc57jmbddvkkjn4skiel26t5yawsi3x4/2944.json',
      metadata_json:
        '{\n  "name": "Blast Penguins #2944",\n  "description": "One way, one dream, one 🐧",\n  "image": "ipfs://bafybeibfviw32fzcimiobx2shiukbwis5cyufmenvddajvzbr3u4uwco3a/2944.png",\n  "dna": "4b892d23a086a9705977a24cb4f2c95b51d58ef2",\n  "edition": 2944,\n  "date": 1708459626683,\n  "attributes": [\n    {\n      "trait_type": "Backgrounds",\n      "value": "Purple"\n    },\n    {\n      "trait_type": "Base",\n      "value": "Purple Gradient"\n    },\n    {\n      "trait_type": "Clothes",\n      "value": "Blue Puffer"\n    },\n    {\n      "trait_type": "Head",\n      "value": "None"\n    },\n    {\n      "trait_type": "Eyes",\n      "value": "None"\n    },\n    {\n      "trait_type": "Acessories",\n      "value": "None"\n    }\n  ],\n  "compiler": "HashLips Art Engine"\n}',
      name: 'Blast Penguins #2944',
      content_type: 'image/png',
      content_uri: 'bafybeibfviw32fzcimiobx2shiukbwis5cyufmenvddajvzbr3u4uwco3a/2944.png',
      description: 'One way, one dream, one 🐧',
      image_uri: 'bafybeibfviw32fzcimiobx2shiukbwis5cyufmenvddajvzbr3u4uwco3a/2944.png',
      external_link: '',
      latest_trade_price: 0.033,
      latest_trade_symbol: 'ETH',
      latest_trade_token: null,
      latest_trade_timestamp: 1713708793000,
      nftscan_id: 'NS366537E64805D9BA',
      nftscan_uri: null,
      small_nftscan_uri: null,
      attributes: [
        {
          attribute_name: 'Backgrounds',
          attribute_value: 'Purple',
          percentage: '9.15%'
        },
        {
          attribute_name: 'Base',
          attribute_value: 'Purple Gradient',
          percentage: '5.49%'
        },
        {
          attribute_name: 'Clothes',
          attribute_value: 'Blue Puffer',
          percentage: '1.98%'
        },
        {
          attribute_name: 'Head',
          attribute_value: 'None',
          percentage: '5.67%'
        },
        {
          attribute_name: 'Eyes',
          attribute_value: 'None',
          percentage: '98.8%'
        },
        {
          attribute_name: 'Acessories',
          attribute_value: 'None',
          percentage: '83.86%'
        }
      ],
      rarity_score: 0.8768252994037015,
      rarity_rank: 2956
    },
    '2': {
      contract_address: '0x89ae653674178738854c83426c6ac6be69900766',
      contract_name: 'PugLife',
      contract_token_id: '0x0000000000000000000000000000000000000000000000000000000000000d19',
      token_id: '3353',
      erc_type: TokenType.Erc721,
      amount: '1',
      minter: '0xaaf740ef7ee990c784964b07113fe560c3b1ab76',
      owner: '0xf672715f2ba85794659a7150e8c21f8d157bfe1d',
      own_timestamp: 1717119565000,
      mint_timestamp: 1712422889000,
      mint_transaction_hash: '0x7631e5327bab2e26fa14d1e2d26383edf4b5492f6682cdf3fbf1567f29187d63',
      mint_price: 0,
      token_uri: 'https://dweb.link/ipfs/QmSdKU7BXss97e1WEgwRyzwRBSvaAUHW2CbudsP8zPojfc/3353.json',
      metadata_json:
        '{\n  "name": "PugLife #3353",\n  "description": "PUGL",\n  "image": "https://degenbrainfinance.mypinata.cloud/ipfs/Qmbg2e3oRjbngfa1zxgD96znNbGPw7cU7SsFjLWSErhgGG//3353.png",\n  "dna": "3cc8f646c1a9cdc5aa8f196883bd9dabd9504cc8",\n  "edition": 3353,\n  "date": 1709121898812,\n  "attributes": [\n    {\n      "trait_type": "PugLife",\n      "value": "8371"\n    },\n    {\n      "trait_type": "Pug Life",\n      "value": "8207"\n    }\n  ],\n  "compiler": "HashLips Art Engine"\n}',
      name: 'PugLife #3353',
      content_type: 'image/png',
      content_uri: 'Qmbg2e3oRjbngfa1zxgD96znNbGPw7cU7SsFjLWSErhgGG//3353.png',
      description: 'PUGL',
      image_uri: 'Qmbg2e3oRjbngfa1zxgD96znNbGPw7cU7SsFjLWSErhgGG//3353.png',
      external_link: '',
      latest_trade_price: null,
      latest_trade_symbol: null,
      latest_trade_token: null,
      latest_trade_timestamp: null,
      nftscan_id: 'NS60F1676E9200CC31',
      nftscan_uri: null,
      small_nftscan_uri: null,
      attributes: [
        {
          attribute_name: 'PugLife',
          attribute_value: '8371',
          percentage: '0.04%'
        },
        {
          attribute_name: 'Pug Life',
          attribute_value: '8207',
          percentage: '0.03%'
        }
      ],
      rarity_score: 0.9409797997505572,
      rarity_rank: 8917
    },
    '3': {
      contract_address: '0x89ae653674178738854c83426c6ac6be69900766',
      contract_name: 'PugLife',
      contract_token_id: '0x0000000000000000000000000000000000000000000000000000000000000d10',
      token_id: '3344',
      erc_type: TokenType.Erc721,
      amount: '1',
      minter: '0xaaf740ef7ee990c784964b07113fe560c3b1ab76',
      owner: '0xf672715f2ba85794659a7150e8c21f8d157bfe1d',
      own_timestamp: 1717119565000,
      mint_timestamp: 1712422751000,
      mint_transaction_hash: '0x49372106358c6ab16e4cc27a530aeaa2a27929e63497e0e5ebb794865db95630',
      mint_price: 0,
      token_uri: 'https://dweb.link/ipfs/QmSdKU7BXss97e1WEgwRyzwRBSvaAUHW2CbudsP8zPojfc/3344.json',
      metadata_json:
        '{\n  "name": "PugLife #3344",\n  "description": "PUGL",\n  "image": "https://degenbrainfinance.mypinata.cloud/ipfs/Qmbg2e3oRjbngfa1zxgD96znNbGPw7cU7SsFjLWSErhgGG//3344.png",\n  "dna": "3f4958e1ce19fde59dc92053387ba27902e481b7",\n  "edition": 3344,\n  "date": 1709121213873,\n  "attributes": [\n    {\n      "trait_type": "PugLife",\n      "value": "8873"\n    },\n    {\n      "trait_type": "Pug Life",\n      "value": "6011"\n    }\n  ],\n  "compiler": "HashLips Art Engine"\n}',
      name: 'PugLife #3344',
      content_type: 'image/png',
      content_uri: 'Qmbg2e3oRjbngfa1zxgD96znNbGPw7cU7SsFjLWSErhgGG//3344.png',
      description: 'PUGL',
      image_uri: 'Qmbg2e3oRjbngfa1zxgD96znNbGPw7cU7SsFjLWSErhgGG//3344.png',
      external_link: '',
      latest_trade_price: null,
      latest_trade_symbol: null,
      latest_trade_token: null,
      latest_trade_timestamp: null,
      nftscan_id: 'NS761A00BC99ED5C04',
      nftscan_uri: null,
      small_nftscan_uri: null,
      attributes: [
        {
          attribute_name: 'PugLife',
          attribute_value: '8873',
          percentage: '0.07%'
        },
        {
          attribute_name: 'Pug Life',
          attribute_value: '6011',
          percentage: '0.02%'
        }
      ],
      rarity_score: 0.9318790137062911,
      rarity_rank: 9350
    }
  }
}
