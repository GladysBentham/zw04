import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { GUESS_GAME_ABI, CONTRACT_ADDRESS } from './abi';
import { base } from 'wagmi/chains';

// Hook 读取奖励池
export function usePrizePool() {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: GUESS_GAME_ABI,
    functionName: 'prizePool',
    chainId: base.id,
  });
}

// Hook 读取游戏是否激活
export function useGameActive() {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: GUESS_GAME_ABI,
    functionName: 'gameActive',
    chainId: base.id,
  });
}

// Hook 提交猜测
export function useSubmitGuess() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const submitGuess = (guessNumber: number) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: GUESS_GAME_ABI,
      functionName: 'guess',
      args: [BigInt(guessNumber)],
      chainId: base.id,
    });
  };

  return {
    submitGuess,
    hash,
    isPending,
    error,
  };
}

// Hook 等待交易确认
export function useGuessReceipt(hash: `0x${string}` | undefined) {
  return useWaitForTransactionReceipt({
    hash,
    chainId: base.id,
  });
}
