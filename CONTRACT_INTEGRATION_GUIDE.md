# BaseGuess 合约集成指南

## 📋 概述

本文档说明了如何将前端应用与 BaseGuess 智能合约正确集成。所有代码已更新以匹配实际的合约接口。

## 🔗 合约信息

- **合约地址**: `0xb38c1d27f15d79684d58c4082784a14d3fd84189`
- **网络**: Base (Chain ID: 8453)
- **合约名称**: BaseGuess
- **Solidity 版本**: ^0.8.0

## 📝 合约接口

### 状态变量

```solidity
uint8 private secretNumber;  // 秘密数字 (1-10)
address public owner;        // 合约所有者
uint public prizeAmount;     // 奖励金额 (默认 0.01 ETH)
```

### 主要函数

#### 1. guessNumber(uint8 _guessedNumber)
- **类型**: payable
- **参数**: `_guessedNumber` - 玩家猜测的数字 (1-10)
- **要求**: 必须支付至少 `prizeAmount` 的 ETH
- **功能**: 
  - 如果猜对，触发 `GuessSuccess` 事件并返还奖励
  - 如果猜错，触发 `GuessFailure` 事件
  - 猜对后会重新生成秘密数字

#### 2. prizeAmount()
- **类型**: view
- **返回**: uint256 - 当前奖励金额
- **功能**: 查询参与游戏需要支付的金额

#### 3. owner()
- **类型**: view
- **返回**: address - 合约所有者地址
- **功能**: 查询合约所有者

#### 4. withdraw()
- **类型**: nonpayable
- **权限**: 仅合约所有者
- **功能**: 提取合约余额

### 事件

#### GuessSuccess
```solidity
event GuessSuccess(address player, uint8 guessedNumber, uint8 correctNumber);
```
- 当玩家猜对时触发

#### GuessFailure
```solidity
event GuessFailure(address player, uint8 guessedNumber, uint8 correctNumber);
```
- 当玩家猜错时触发

## 🔧 前端集成

### 文件结构

```
lib/contracts/
├── abi.ts           # 合约 ABI 定义
└── guess-game.ts    # React Hooks

components/game/
├── GameCard.tsx     # 游戏信息展示
└── GuessForm.tsx    # 猜数字表单
```

### 关键更新

#### 1. ABI 定义 (`lib/contracts/abi.ts`)

✅ **已更新**:
- 函数名从 `guess` 改为 `guessNumber`
- 参数类型从 `uint256` 改为 `uint8`
- 状态变量从 `prizePool` 改为 `prizeAmount`
- 移除了不存在的 `gameActive` 和 `targetNumber`
- 事件从 `GuessSubmitted` 改为 `GuessSuccess` 和 `GuessFailure`

#### 2. React Hooks (`lib/contracts/guess-game.ts`)

✅ **已更新**:
- `usePrizePool()` → `usePrizeAmount()`
- 添加了 `useOwner()` hook
- `useSubmitGuess()` 现在:
  - 验证数字范围 (1-10)
  - 自动读取并使用 `prizeAmount` 作为交易金额
  - 调用 `guessNumber` 函数

#### 3. 游戏卡片 (`components/game/GameCard.tsx`)

✅ **已更新**:
- 使用 `usePrizeAmount()` 替代 `usePrizePool()`
- 移除了 `gameActive` 状态显示
- 显示游戏规则 (1-10)
- 显示参与费用和奖励金额

#### 4. 猜测表单 (`components/game/GuessForm.tsx`)

✅ **已更新**:
- 输入范围限制为 1-10
- 显示需要支付的金额
- 添加输入验证
- 改进错误提示

## 🎮 使用流程

1. **连接钱包**: 用户使用 RainbowKit 连接 Base 网络钱包
2. **查看信息**: GameCard 显示参与费用和游戏规则
3. **输入猜测**: 用户在 GuessForm 中输入 1-10 之间的数字
4. **提交交易**: 
   - 自动支付 `prizeAmount` (0.01 ETH)
   - 调用 `guessNumber` 函数
5. **等待确认**: 显示交易哈希和确认状态
6. **查看结果**: 
   - 在 BaseScan 上查看交易详情
   - 检查事件日志 (GuessSuccess 或 GuessFailure)
   - 如果猜对，奖励会自动返还到钱包

## 🔍 验证方法

### 在 BaseScan 上验证

1. 访问合约地址: https://basescan.org/address/0xb38c1d27f15d79684d58c4082784a14d3fd84189
2. 查看 "Read Contract" 标签:
   - 检查 `prizeAmount` 值
   - 确认 `owner` 地址
3. 查看 "Write Contract" 标签:
   - 测试 `guessNumber` 函数
4. 查看交易的 "Logs" 标签:
   - 查找 `GuessSuccess` 或 `GuessFailure` 事件
   - 查看 `correctNumber` 参数了解正确答案

### 本地测试

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 添加 NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

# 启动开发服务器
npm run dev
```

## ⚠️ 注意事项

1. **数字范围**: 必须输入 1-10 之间的整数
2. **支付金额**: 每次猜测需要支付 0.01 ETH (可能会变化，以合约为准)
3. **Gas 费用**: 除了 prizeAmount，还需要支付 Base 网络的 gas 费
4. **秘密数字**: 
   - 存储在合约中，无法直接读取
   - 每次猜对后会重新生成
   - 使用 `block.timestamp` 生成伪随机数
5. **事件日志**: 猜测结果只能通过事件日志查看，合约不返回布尔值

## 🚀 部署到 Vercel

```bash
# 使用 Vercel CLI
vercel --prod

# 或推送到 GitHub 自动部署
git add .
git commit -m "Update contract integration"
git push origin main
```

## 📚 相关资源

- [Base 网络文档](https://docs.base.org/)
- [Wagmi 文档](https://wagmi.sh/)
- [RainbowKit 文档](https://www.rainbowkit.com/)
- [BaseScan](https://basescan.org/)

## 🐛 常见问题

### Q: 为什么看不到猜测结果？
A: 合约不返回猜测结果，需要在 BaseScan 的交易日志中查看 GuessSuccess 或 GuessFailure 事件。

### Q: 如何知道秘密数字是什么？
A: 秘密数字是私有的，只有在猜测后通过事件日志才能看到正确答案。

### Q: 猜对后奖励什么时候到账？
A: 如果猜对，奖励会在同一笔交易中立即返还到你的钱包。

### Q: 可以猜测 0 或大于 10 的数字吗？
A: 不可以，合约生成的秘密数字范围是 1-10，前端也会验证输入范围。

## 📝 更新日志

### 2026-03-19
- ✅ 更新 ABI 以匹配 BaseGuess 合约
- ✅ 修复函数名称和参数类型
- ✅ 更新所有 React Hooks
- ✅ 改进前端组件和用户体验
- ✅ 添加输入验证和错误处理
- ✅ 创建完整的集成文档
