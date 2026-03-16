import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export async function POST(req: NextRequest) {
  const { product, tone } = await req.json()
  const toneMap: Record<string,string> = {
    santai:'santai, relatable, seperti ngobrol teman',
    tegas:'tegas, persuasif, direct selling',
    edukasi:'edukatif, informatif, membangun trust',
    story:'storytelling, personal, emosional',
  }
  const prompt = `Content strategist TikTok Shop Indonesia. Buat caption pack lengkap.

Produk/konten: ${product}
Tone: ${toneMap[tone] || toneMap.santai}

Format persis:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CAPTION PACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 CAPTION 1 — [angle]
[caption 3-5 baris + emoji]

📝 CAPTION 2 — [angle]
[caption 3-5 baris + emoji]

📝 CAPTION 3 — [angle]
[caption 3-5 baris + emoji]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏷️ HASHTAG PACK

🔴 BIG (1-5M+):
[5 hashtag]

🟡 MEDIUM (100K-1M):
[7 hashtag]

🟢 NICHE (< 100K):
[8 hashtag spesifik]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏰ WAKTU POSTING OPTIMAL
[3 waktu terbaik + alasan]

Bahasa Indonesia. Langsung tulis tanpa intro.`
  try {
    const msg = await client.messages.create({ model:'claude-3-5-sonnet-20241022', max_tokens:1500, messages:[{role:'user',content:prompt}] })
    return NextResponse.json({ result: msg.content[0].type==='text' ? msg.content[0].text : 'Error' })
  } catch(e) { return NextResponse.json({ error: String(e) }, { status:500 }) }
}