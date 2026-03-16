import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY || ''
  const keyPreview = apiKey ? apiKey.substring(0, 15) + '...(len:' + apiKey.length + ')' : 'MISSING'
  
  if (!apiKey || !apiKey.startsWith('sk-ant-')) {
    return NextResponse.json({ error: 'API key issue: ' + keyPreview }, { status: 500 })
  }

  const client = new Anthropic({ apiKey })
  const { product, target, angle } = await req.json()
  const angleMap: Record<string,string> = {
    mix:'campuran Pain, Curiosity, Shock, Social Proof, dan Story',
    pain:'Pain — fokus masalah pembeli',
    curiosity:'Curiosity — bikin penasaran tanpa reveal',
    shock:'Shock — fakta mengejutkan',
    proof:'Social Proof — testimoni dan angka nyata',
  }
  const prompt = `Kamu copywriter TikTok Shop Indonesia terbaik. Buat 20 hook video TikTok yang powerful.

Produk: ${product}
Target: ${target || 'seller TikTok Shop Indonesia'}
Angle: ${angleMap[angle] || angleMap.mix}

Format:
- Nomor 1-20
- Tiap hook 1-2 kalimat, cocok diucapkan 0-3 detik pertama
- Label di kurung siku: [PAIN] [CURIOSITY] [SHOCK] [PROOF] [STORY]
- Bahasa Indonesia natural, ala anak TikTok

Langsung tulis 20 hook, tanpa intro.`

  try {
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }]
    })
    return NextResponse.json({ result: msg.content[0].type === 'text' ? msg.content[0].text : 'Error' })
  } catch(e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}