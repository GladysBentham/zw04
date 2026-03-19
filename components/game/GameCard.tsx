'use client';

import { usePrizePool, useGameActive } from '@/lib/contracts/guess-game';
import { formatEther } from 'viem';

export function GameCard() {
  const { data: prizePool } = usePrizePool();
  const { data: gameActive } = useGameActive();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">游戏信息</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600">游戏状态</span>
          <span className={`font-semibold ${gameActive ? 'text-green-600' : 'text-red-600'}`}>
            {gameActive === undefined ? '加载中...' : gameActive ? '🟢 进行中' : '🔴 已结束'}
          </span>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600">奖励池</span>
          <span className="font-semibold text-blue-600">
            {prizePool !== undefined ? `${formatEther(prizePool)} ETH` : '加载中...'}
          </span>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600">合约地址</span>
          <a
            href="https://basescan.org/address/0xb38c1d27f15d79684d58c4082784a14d3fd84189"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 font-mono"
          >
            0xb38c...4189
          </a>
        </div>
      </div>
    </div>
  );
}
