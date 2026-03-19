'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId } from 'wagmi';
import { base } from 'wagmi/chains';
import { GameCard } from '@/components/game/GameCard';
import { GuessForm } from '@/components/game/GuessForm';

export default function Home() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const isCorrectNetwork = chainId === base.id;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎲 Base 猜数字
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            在 Base 链上玩猜数字游戏，猜对即可获得奖励！
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </header>

        {/* 提示信息 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <span className="text-2xl mr-3">💡</span>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">游戏说明</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 连接钱包后输入你的猜测数字</li>
                <li>• 提交猜测只需支付极低的 gas 费用，无额外收费</li>
                <li>• 猜对数字即可获得奖励池中的奖励</li>
                <li>• 所有交易在 Base 链上透明可查</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 网络检查 */}
        {isConnected && !isCorrectNetwork && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 font-medium">
              ⚠️ 请切换到 Base 网络
            </p>
          </div>
        )}

        {/* 游戏区域 */}
        {isConnected && isCorrectNetwork && (
          <>
            <GameCard />
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">开始猜测</h2>
              <GuessForm />
            </div>
          </>
        )}

        {/* 未连接钱包提示 */}
        {!isConnected && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🔗</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              连接钱包开始游戏
            </h2>
            <p className="text-gray-600">
              请点击上方按钮连接你的钱包
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Base 链上的去中心化猜数字游戏</p>
          <p className="mt-2">
            合约地址:{' '}
            <a
              href="https://basescan.org/address/0xb38c1d27f15d79684d58c4082784a14d3fd84189"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-mono"
            >
              0xb38c1d27f15d79684d58c4082784a14d3fd84189
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
