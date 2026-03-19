'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useSubmitGuess, useGuessReceipt } from '@/lib/contracts/guess-game';
import { trackTransaction } from '@/utils/track';

export function GuessForm() {
  const [guessNumber, setGuessNumber] = useState('');
  const { address } = useAccount();
  const { submitGuess, hash, isPending, error } = useSubmitGuess();
  const { isLoading: isConfirming, isSuccess } = useGuessReceipt(hash);

  // 交易成功后调用埋点
  useEffect(() => {
    if (isSuccess && hash && address) {
      // 调用交易归因埋点
      trackTransaction('app-001', 'Base猜数字', address, hash);
    }
  }, [isSuccess, hash, address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(guessNumber);
    if (!isNaN(num) && num >= 0) {
      submitGuess(num);
    }
  };

  const isValid = guessNumber !== '' && !isNaN(parseInt(guessNumber)) && parseInt(guessNumber) >= 0;

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="guess" className="block text-sm font-medium mb-2">
            输入你的猜测数字
          </label>
          <input
            id="guess"
            type="number"
            min="0"
            value={guessNumber}
            onChange={(e) => setGuessNumber(e.target.value)}
            placeholder="请输入数字"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isPending || isConfirming}
          />
        </div>

        <button
          type="submit"
          disabled={!address || !isValid || isPending || isConfirming}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {isPending ? '等待钱包确认...' : isConfirming ? '交易确认中...' : '提交猜测'}
        </button>
      </form>

      {/* 交易状态显示 */}
      {hash && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-2">交易已提交</p>
          <a
            href={`https://basescan.org/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 break-all"
          >
            {hash}
          </a>
        </div>
      )}

      {isSuccess && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-sm font-medium text-green-900">✅ 交易成功！</p>
          <p className="text-xs text-green-700 mt-1">请查看链上结果确认是否猜中</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-sm font-medium text-red-900">❌ 交易失败</p>
          <p className="text-xs text-red-700 mt-1">{error.message}</p>
        </div>
      )}
    </div>
  );
}
