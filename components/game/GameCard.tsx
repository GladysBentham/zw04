'use client';

import { usePrizeAmount, useOwner } from '@/lib/contracts/guess-game';
import { formatEther } from 'viem';

export function GameCard() {
  const { data: prizeAmount } = usePrizeAmount();
  const { data: owner } = useOwner();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">游戏信息</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600">游戏规则</span>
          <span className="font-semibold text-blue-600">
            猜测 1-10 之间的数字
          </span>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600">参与费用</span>
          <span className="font-semibold text-green-600">
            {prizeAmount !== undefined ? `${formatEther(prizeAmount)} ETH` : '加载中...'}
          </span>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600">猜对奖励</span>
          <span className="font-semibold text-purple-600">
            {prizeAmount !== undefined ? `${formatEther(prizeAmount)} ETH` : '加载中...'}
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

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          💡 <strong>提示：</strong>猜对数字即可获得奖励！秘密数字在每次猜对后会重新生成。
        </p>
      </div>
    </div>
  );
}
