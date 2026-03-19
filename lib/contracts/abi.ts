// 猜数字游戏合约 ABI - BaseGuess
// 合约地址: 0xb38c1d27f15d79684d58c4082784a14d3fd84189
// 
// 合约功能：玩家猜测1-10之间的数字，猜对获得奖励

export const GUESS_GAME_ABI = [
  // 玩家猜数字 - 需要支付 prizeAmount 的 ETH
  {
    name: 'guessNumber',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: '_guessedNumber', type: 'uint8' }],
    outputs: [],
  },
  // 读取奖励金额
  {
    name: 'prizeAmount',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  // 读取合约所有者
  {
    name: 'owner',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
  },
  // 所有者提款
  {
    name: 'withdraw',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  // 事件：猜测成功
  {
    name: 'GuessSuccess',
    type: 'event',
    inputs: [
      { name: 'player', type: 'address', indexed: false },
      { name: 'guessedNumber', type: 'uint8', indexed: false },
      { name: 'correctNumber', type: 'uint8', indexed: false },
    ],
  },
  // 事件：猜测失败
  {
    name: 'GuessFailure',
    type: 'event',
    inputs: [
      { name: 'player', type: 'address', indexed: false },
      { name: 'guessedNumber', type: 'uint8', indexed: false },
      { name: 'correctNumber', type: 'uint8', indexed: false },
    ],
  },
] as const;

export const CONTRACT_ADDRESS = '0xb38c1d27f15d79684d58c4082784a14d3fd84189' as const;
