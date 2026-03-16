import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export async function POST(req: NextRequest) {
  const { product, target, freq } = await req.json()
  const prompt = `Content strategist TikTok Shop Indonesia. Buat 30-hari content calendar.

Toko/produk: ${product}
Target: ${target || 'pembeli TikTok Shop Indonesia'}
Frekuensi: ${freq}x per minggu

Format tiap hari posting:
Hari X | [FORMAT: Hook/Edukasi/Demo/Testimoni/Trending/Live]
💡 Ide: [1 kalimat ide konten]
🎣 Hook starter: "[kalimat pembuka]"
🏷️ Theme: [tema/angle]

Hari yang bukan posting:
Hari X | OFF — Riset & Engagement

Di akhir:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 SUMMARY DISTRIBUSI FORMAT
[breakdown tiap format]

💡 3 TIPS EKSEKUSI
[3 tips praktis]

Mulai dari Hari 1, tanpa intro.`
  try {
    const msg = await client.messages.create({ model:'claude-3-5-sonnet-20241022', max_tokens:3000, messages:[{role:'user',content:prompt}] })
    return NextResponse.json({ result: msg.content[0].type==='text' ? msg.content[0].text : 'Error' })
  } catch(e) { return NextResponse.json({ error: String(e) }, { status:500 }) }
}