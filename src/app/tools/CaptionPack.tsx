'use client'
import { useState } from 'react'
import { cardStyle, inputStyle, btnStyle, labelStyle, resultBoxStyle, copyBtn, spinnerStyle } from './shared'
export default function CaptionPack() {
  const [product, setProduct] = useState('')
  const [tone, setTone] = useState('santai')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const generate = async () => {
    if (!product.trim()) return
    setLoading(true); setResult('')
    try {
      const res = await fetch('/api/caption', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ product, tone }) })
      const data = await res.json()
      setResult(data.result || data.error || 'Error')
    } catch { setResult('Gagal generate. Coba lagi.') }
    setLoading(false)
  }
  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:22, marginBottom:6 }}>✍️ CaptionPack AI</h2>
        <p style={{ color:'#7a8499', fontSize:14 }}>Generate 3 caption + hashtag pack 3 tier + waktu posting optimal.</p>
      </div>
      <div style={cardStyle}>
        <div style={{ marginBottom:18 }}><label style={labelStyle}>Produk / konten video *</label><input style={inputStyle} placeholder="cth: Serum Vitamin C Brightening — video unboxing" value={product} onChange={e => setProduct(e.target.value)} /></div>
        <div style={{ marginBottom:24 }}>
          <label style={labelStyle}>Tone caption</label>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:8 }}>
            {[['santai','😎 Santai'],['tegas','💪 Tegas'],['edukasi','📚 Edukatif'],['story','📖 Story']].map(([v,l]) => (
              <button key={v} onClick={() => setTone(v)} style={{ padding:'8px 14px', borderRadius:8, border: tone===v ? '1px solid #00e5c9' : '1px solid #1a2035', background: tone===v ? 'rgba(0,229,201,0.08)' : 'transparent', color: tone===v ? '#00e5c9' : '#7a8499', fontSize:12, fontWeight:600, cursor:'pointer' }}>{l}</button>
            ))}
          </div>
        </div>
        <button style={btnStyle(loading)} onClick={generate} disabled={loading}>{loading ? <span style={spinnerStyle} /> : null}{loading ? 'Generating...' : '✍️ Generate Caption + Hashtag'}</button>
      </div>
      {result && (<div style={{ marginTop:24, position:'relative' }}><button style={copyBtn} onClick={copy}>{copied ? '✓ Copied!' : '📋 Copy'}</button><pre style={resultBoxStyle}>{result}</pre></div>)}
    </div>
  )
}