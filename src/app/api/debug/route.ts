import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function GET() {
  const key = process.env.ANTHROPIC_API_KEY || 'MISSING'
  
  // Quick test call
  try {
    const client = new Anthropic({ apiKey: key })
    const msg = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 10,
      messages: [{ role: 'user', content: 'hi' }]
    })
    return NextResponse.json({ 
      status: 'OK', 
      key_len: key.length, 
      key_start: key.substring(0, 15),
      response: msg.content[0].type === 'text' ? msg.content[0].text : 'ok'
    })
  } catch(e: unknown) {
    return NextResponse.json({ 
      status: 'ERROR', 
      key_len: key.length,
      key_start: key.substring(0, 15),
      error: String(e).substring(0, 200)
    })
  }
}