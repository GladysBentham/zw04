// 猜数字游戏合约 ABI
// 合约地址: 0xb38c1d27f15d79684d58c4082784a14d3fd84189
// 
// 注意：这是一个基础 ABI 结构，包含常见的猜数字游戏方法
// 如果实际合约方法名或参数不同，请根据实际情况调整

export const GUESS_GAME_ABI = [
  // 提交猜测 - 可能的方法名: guess, submitGuess, makeGuess
  {
    name: 'guess',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'number', type: 'uint256' }],
    outputs: [],
  },
  // 读取游戏状态
  {
    name: 'targetNumber',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'prizePool',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'gameActive',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'bool' }],
  },
  // 事件
  {
    name: 'GuessSubmitted',
    type: 'event',
    inputs: [
      { name: 'player', type: 'address', indexed: true },
      { name: 'guess', type: 'uint256', indexed: false },
      { name: 'won', type: 'bool', indexed: false },
    ],
  },
] as const;

export const CONTRACT_ADDRESS = '0xb38c1d27f15d79684d58c4082784a14d3fd84189' as const;
