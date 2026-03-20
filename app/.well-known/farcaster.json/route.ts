import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    miniapp: {
      version: "1",
      name: "Base猜数字",  // 你的 app 名
      homeUrl: "https://finalzw04.vercel.app/",
      iconUrl: "https://finalzw04.vercel.app/icon.png",  // 加个 512x512 的 icon 到 public/ 下
      imageUrl: "https://finalzw04.vercel.app/og.png",   // 可选，分享图
      buttonTitle: "玩猜数字",
      // 其他可选：description, splashImageUrl 等
    }
  });
}
