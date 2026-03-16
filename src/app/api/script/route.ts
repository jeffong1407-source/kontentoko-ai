import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic()
export async function POST(req: NextRequest) {
  const { product, pain, duration } = await req.json()
  const prompt = `Kamu scriptwriter TikTok Shop Indonesia terbaik. Buat script video siap shooting.

Produk: ${product}
Pain point: ${pain || 'masalah umum yang diselesaikan produk ini'}
Durasi: ${duration} detik

Format (gunakan judul persis):

[HOOK — 0-3 dtk]
(kalimat pembuka yang menarik)

[PROBLEM — 3-10 dtk]
(perkuat pain point)

[AGITATE — 10-18 dtk]
(perparah masalah, tunjukkan konsekuensi)

[SOLUSI — 18-30 dtk]
(perkenalkan produk, manfaat utama)

[DEMO/BUKTI — 30-${parseInt(duration)-10} dtk]
(cara kerja, hasil, testimoni singkat)

[CTA — ${parseInt(duration)-10}-${duration} dtk]
(ajakan beli dengan urgensi)

---
TIPS SHOOTING:
(3-4 tips teknis visualisasi)

Bahasa Indonesia natural. Langsung tulis tanpa intro.`
  try {
    const msg = await client.messages.create({ model:'claude-3-5-sonnet-20241022', max_tokens:1200, messages:[{role:'user',content:prompt}] })
    return NextResponse.json({ result: msg.content[0].type==='text' ? msg.content[0].text : 'Error' })
  } catch(e) { return NextResponse.json({ error: String(e) }, { status:500 }) }
}