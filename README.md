# Base 猜数字 Mini App

一个部署在 Base 链上的去中心化猜数字游戏 Mini App。用户可以连接钱包，提交猜测数字，猜对即可获得奖励。

## 🎮 功能特性

- ✅ 钱包连接（支持多种钱包）
- ✅ Base 链网络支持
- ✅ 智能合约交互
- ✅ 实时游戏状态显示
- ✅ 交易状态追踪
- ✅ 移动端友好界面
- ✅ 交易归因埋点
- ✅ Builder Code 归因集成

## 🛠 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **区块链交互**: wagmi + viem
- **钱包连接**: RainbowKit
- **链网络**: Base
- **归因**: ox (ERC-8021)

## 📦 项目结构

```
C:\zw04baseminiapp
├── app/
│   ├── layout.tsx          # 根布局（包含 Meta 标签）
│   ├── page.tsx            # 主页面
│   ├── providers.tsx       # Web3 Provider 配置
│   ├── wagmi.ts            # Wagmi 配置（含 Builder Code 归因）
│   └── globals.css         # 全局样式
├── components/
│   └── game/
│       ├── GameCard.tsx    # 游戏信息卡片
│       └── GuessForm.tsx   # 猜测表单（含交易埋点）
├── lib/
│   └── contracts/
│       ├── abi.ts          # 合约 ABI
│       └── guess-game.ts   # 合约交互 Hooks
├── utils/
│   └── track.js            # 交易归因埋点工具
├── .env.local              # 本地环境变量（含敏感 token）
├── .env.example            # 环境变量示例
└── package.json
```

## 🚀 本地运行

### 1. 安装依赖

```bash
cd C:\zw04baseminiapp
npm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env.local`（已创建），并配置：

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_PROJECT_ID
```

获取 WalletConnect Project ID：https://cloud.walletconnect.com/

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 📝 合约信息

- **合约地址**: `0xb38c1d27f15d79684d58c4082784a14d3fd84189`
- **网络**: Base
- **区块浏览器**: https://basescan.org/address/0xb38c1d27f15d79684d58c4082784a14d3fd84189

### 合约方法（预设）

如果实际合约方法不同，请修改 `lib/contracts/abi.ts`：

- `guess(uint256 number)` - 提交猜测
- `prizePool()` - 查询奖励池
- `gameActive()` - 查询游戏状态
- `targetNumber()` - 查询目标数字（可能不可见）

## 🔗 交易归因集成

### 1. 交易埋点

位置：`utils/track.js`

所有成功的链上交易都会自动调用埋点 API：

```javascript
trackTransaction('app-001', 'Base猜数字', userAddress, txHash)
```

- **App ID**: `app-001`
- **App Name**: `Base猜数字`
- **API**: `https://base-dashboard-zeta.vercel.app/api/track`

埋点已集成在 `components/game/GuessForm.tsx` 的交易成功回调中。

### 2. Builder Code 归因

位置：`app/wagmi.ts`

使用 ERC-8021 标准，通过 RainbowKit 的 `dataSuffix` 参数注入：

```typescript
const DATA_SUFFIX = '0x62635f316f306a6b7a716c0b0080218021802180218021802180218021';
```

- **Builder Code**: `bc_1o0jkzql`
- **Encoded String**: 已预编码并注入到所有交易中

### 3. Mini App Meta 标签

位置：`app/layout.tsx`

```html
<meta name="base:app_id" content="69ba665b5b0dee671be77ec5" />
```

## 🌐 部署到 Vercel

### 方式一：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录（使用 .env.local 中的 VERCEL_TOKEN）
vercel login

# 部署
vercel --prod
```

### 方式二：通过 Vercel Dashboard

1. 访问 https://vercel.com/
2. 导入 Git 仓库
3. 配置环境变量：
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
4. 点击 Deploy

### 环境变量配置

在 Vercel 项目设置中添加：

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

## ⚠️ 重要提示

### 敏感信息

`.env.local` 文件包含敏感 token（GitHub Token 和 Vercel Token）

**请注意**：
1. 这些 token 已保存在 `.env.local` 中（已被 .gitignore 忽略）
2. 请勿将这些 token 提交到公开仓库
3. 建议定期轮换这些 token
4. 如需分享项目，请使用 `.env.example` 作为模板

### 合约 ABI

当前 ABI 是基于常见猜数字游戏合约的预设结构。如果实际合约方法名或参数不同，请：

1. 访问 BaseScan 获取实际 ABI
2. 修改 `lib/contracts/abi.ts`
3. 更新 `lib/contracts/guess-game.ts` 中的方法调用

## 🐛 故障排除

### 钱包连接问题

- 确保已安装 MetaMask 或其他支持的钱包
- 确保钱包已切换到 Base 网络
- 检查 WalletConnect Project ID 是否正确

### 交易失败

- 确保钱包有足够的 ETH 支付 gas
- 确认合约地址正确
- 检查合约方法名是否匹配

### 构建错误

```bash
# 清除缓存重新构建
rm -rf .next node_modules
npm install
npm run build
```

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**项目创建时间**: 2026-03-19  
**Base Mini App ID**: 69ba665b5b0dee671be77ec5  
**Builder Code**: bc_1o0jkzql
