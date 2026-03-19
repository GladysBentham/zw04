import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

// 生成 Builder Code 归因的 data suffix
// Builder Code: bc_1o0jkzql
// 使用预编码的 attribution string
const DATA_SUFFIX = '0x62635f316f306a6b7a716c0b0080218021802180218021802180218021' as const;

export const config = getDefaultConfig({
  appName: 'Base猜数字',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [base],
  ssr: true,
  // 注入 Builder Code 归因
  dataSuffix: DATA_SUFFIX,
});
