export const erc721ABI = [
  {
    type: 'event' as const,
    name: 'Approval' as const,
    inputs: [
      {
        indexed: true,
        name: 'owner' as const,
        type: 'address' as const
      },
      {
        indexed: true,
        name: 'spender' as const,
        type: 'address' as const
      },
      {
        indexed: true,
        name: 'tokenId' as const,
        type: 'uint256' as const
      }
    ]
  },
  {
    type: 'event' as const,
    name: 'ApprovalForAll' as const,
    inputs: [
      {
        indexed: true,
        name: 'owner' as const,
        type: 'address' as const
      },
      {
        indexed: true,
        name: 'operator' as const,
        type: 'address' as const
      },
      {
        indexed: false,
        name: 'approved' as const,
        type: 'bool' as const
      }
    ]
  },
  {
    type: 'event' as const,
    name: 'Transfer' as const,
    inputs: [
      {
        indexed: true,
        name: 'from' as const,
        type: 'address' as const
      },
      {
        indexed: true,
        name: 'to' as const,
        type: 'address' as const
      },
      {
        indexed: true,
        name: 'tokenId' as const,
        type: 'uint256' as const
      }
    ]
  },
  {
    type: 'function' as const,
    name: 'approve' as const,
    stateMutability: 'payable' as const,
    inputs: [
      {
        name: 'spender' as const,
        type: 'address' as const
      },
      {
        name: 'tokenId' as const,
        type: 'uint256' as const
      }
    ],
    outputs: []
  },
  {
    type: 'function' as const,
    name: 'balanceOf' as const,
    stateMutability: 'view' as const,
    inputs: [
      {
        name: 'account' as const,
        type: 'address' as const
      }
    ],
    outputs: [
      {
        name: '' as const,
        type: 'uint256' as const
      }
    ]
  },
  {
    type: 'function' as const,
    name: 'getApproved' as const,
    stateMutability: 'view' as const,
    inputs: [
      {
        name: 'tokenId' as const,
        type: 'uint256' as const
      }
    ],
    outputs: [
      {
        name: '' as const,
        type: 'address' as const
      }
    ]
  },
  {
    type: 'function' as const,
    name: 'isApprovedForAll' as const,
    stateMutability: 'view' as const,
    inputs: [
      {
        name: 'owner' as const,
        type: 'address' as const
      },
      {
        name: 'operator' as const,
        type: 'address' as const
      }
    ],
    outputs: [
      {
        name: '' as const,
        type: 'bool' as const
      }
    ]
  },
  {
    type: 'function' as const,
    name: 'name' as const,
    stateMutability: 'view' as const,
    inputs: [],
    outputs: [
      {
        name: '' as const,
        type: 'string' as const
      }
    ]
  },
  {
    type: 'function' as const,
    name: 'ownerOf' as const,
    stateMutability: 'view' as const,
    inputs: [
      {
        name: 'tokenId' as const,
        type: 'uint256' as const
      }
    ],
    outputs: [
      {
        name: 'owner' as const,
        type: 'address' as const
      }
    ]
  },
  {
    type: 'function' as const,
    name: 'safeTransferFrom' as const,
    stateMutability: 'payable' as const,
    inputs: [
      {
        name: 'from' as const,
        type: 'address' as const
      },
      {
        name: 'to' as const,
        type: 'address' as const
      },
      {
        name: 'tokenId' as const,
        type: 'uint256' as const
      }
    ],
    outputs: []
  },
  {
    type: 'function' as const,
    name: 'safeTransferFrom' as const,
    stateMutability: 'nonpayable' as const,
    inputs: [
      {
        name: 'from' as const,
        type: 'address' as const
      },
      {
        name: 'to' as const,
        type: 'address' as const
      },
      {
        name: 'id' as const,
        type: 'uint256' as const
      },
      {
        name: 'data' as const,
        type: 'bytes' as const
      }
    ],
    outputs: []
  },
  {
    type: 'function' as const,
    name: 'setApprovalForAll' as const,
    stateMutability: 'nonpayable' as const,
    inputs: [
      {
        name: 'operator' as const,
        type: 'address' as const
      },
      {
        name: 'approved' as const,
        type: 'bool' as const
      }
    ],
    outputs: []
  },
  {
    type: 'function' as const,
    name: 'symbol' as const,
    stateMutability: 'view' as const,
    inputs: [],
    outputs: [
      {
        name: '' as const,
        type: 'string' as const
      }
    ]
  },
  {
    type: 'function' as const,
    name: 'tokenByIndex' as const,
    stateMutability: 'view' as const,
    inputs: [
      {
        name: 'index' as const,
        type: 'uint256' as const
      }
    ],
    outputs: [
      {
        name: '' as const,
        type: 'uint256' as const
      }
    ]
  },
  {
    type: 'function' as const,
    name: 'tokenByIndex' as const,
    stateMutability: 'view' as const,
    inputs: [
      {
        name: 'owner' as const,
        type: 'address' as const
      },
      {
        name: 'index' as const,
        type: 'uint256' as const
      }
    ],
    outputs: [
      {
        name: 'tokenId' as const,
        type: 'uint256' as const
      }
    ]
  },
  {
    type: 'function' as const,
    name: 'tokenURI' as const,
    stateMutability: 'view' as const,
    inputs: [
      {
        name: 'tokenId' as const,
        type: 'uint256' as const
      }
    ],
    outputs: [
      {
        name: '' as const,
        type: 'string' as const
      }
    ]
  },
  {
    type: 'function' as const,
    name: 'totalSupply' as const,
    stateMutability: 'view' as const,
    inputs: [],
    outputs: [
      {
        name: '' as const,
        type: 'uint256' as const
      }
    ]
  },
  {
    type: 'function' as const,
    name: 'transferFrom' as const,
    stateMutability: 'payable' as const,
    inputs: [
      {
        name: 'sender' as const,
        type: 'address' as const
      },
      {
        name: 'recipient' as const,
        type: 'address' as const
      },
      {
        name: 'tokeId' as const,
        type: 'uint256' as const
      }
    ],
    outputs: []
  }
]
