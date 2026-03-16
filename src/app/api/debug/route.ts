import { NextResponse } from 'next/server'
export async function GET() {
  const key = process.env.ANTHROPIC_API_KEY || 'MISSING'
  return NextResponse.json({
    len: key.length,
    start: key.substring(0, 20),
    end: key.slice(-10),
    valid: key.startsWith('sk-ant-api03-')
  })
}