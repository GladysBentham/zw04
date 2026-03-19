import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { GUESS_GAME_ABI, CONTRACT_ADDRESS } from './abi';
import { base } from 'wagmi/chains';
import { parseEther } from 'viem';

// Hook 读取奖励金额
export function usePrizeAmount() {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: GUESS_GAME_ABI,
    functionName: 'prizeAmount',
    chainId: base.id,
  });
}

// Hook 读取合约所有者
export function useOwner() {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: GUESS_GAME_ABI,
    functionName: 'owner',
    chainId: base.id,
  });
}

// Hook 提交猜测
export function useSubmitGuess() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { data: prizeAmount } = usePrizeAmount();

  const submitGuess = (guessNumber: number) => {
    // 确保数字在 1-10 范围内
    if (guessNumber < 1 || guessNumber > 10) {
      throw new Error('猜测数字必须在 1-10 之间');
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: GUESS_GAME_ABI,
      functionName: 'guessNumber',
      args: [guessNumber],
      value: prizeAmount || parseEther('0.01'), // 使用合约的 prizeAmount 或默认 0.01 ETH
      chainId: base.id,
    });
  };

  return {
    submitGuess,
    hash,
    isPending,
    error,
    prizeAmount,
  };
}

// Hook 等待交易确认
export function useGuessReceipt(hash: `0x${string}` | undefined) {
  return useWaitForTransactionReceipt({
    hash,
    chainId: base.id,
  });
}
