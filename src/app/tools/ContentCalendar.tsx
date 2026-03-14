'use client'
import { useState } from 'react'
import { cardStyle, inputStyle, btnStyle, labelStyle, resultBoxStyle, copyBtn, spinnerStyle } from './shared'
export default function ContentCalendar() {
  const [product, setProduct] = useState('')
  const [target, setTarget] = useState('')
  const [freq, setFreq] = useState('5')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const generate = async () => {
    if (!product.trim()) return
    setLoading(true); setResult('')
    try {
      const res = await fetch('/api/calendar', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ product, target, freq }) })
      const data = await res.json()
      setResult(data.result || data.error || 'Error')
    } catch { setResult('Gagal generate. Coba lagi.') }
    setLoading(false)
  }
  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:22, marginBottom:6 }}>📅 ContentCalendar AI</h2>
        <p style={{ color:'#7a8499', fontSize:14 }}>Generate 30-hari content plan lengkap per hari.</p>
      </div>
      <div style={cardStyle}>
        <div style={{ marginBottom:18 }}><label style={labelStyle}>Toko / produk utama *</label><input style={inputStyle} placeholder="cth: Skincare UMKM — Serum, Toner, Moisturizer" value={product} onChange={e => setProduct(e.target.value)} /></div>
        <div style={{ marginBottom:18 }}><label style={labelStyle}>Target audiens</label><input style={inputStyle} placeholder="cth: wanita 20–35 tahun, concern kulit kusam" value={target} onChange={e => setTarget(e.target.value)} /></div>
        <div style={{ marginBottom:24 }}>
          <label style={labelStyle}>Frekuensi posting per minggu</label>
          <div style={{ display:'flex', gap:8, marginTop:8 }}>
            {['3','5','7'].map(f => (<button key={f} onClick={() => setFreq(f)} style={{ padding:'8px 20px', borderRadius:8, border: freq===f ? '1px solid #ffe141' : '1px solid #1a2035', background: freq===f ? 'rgba(255,225,65,0.08)' : 'transparent', color: freq===f ? '#ffe141' : '#7a8499', fontSize:13, fontWeight:600, cursor:'pointer' }}>{f}x/minggu</button>))}
          </div>
        </div>
        <button style={btnStyle(loading)} onClick={generate} disabled={loading}>{loading ? <span style={spinnerStyle} /> : null}{loading ? 'Generating...' : '📅 Generate 30-Hari Calendar'}</button>
      </div>
      {result && (<div style={{ marginTop:24, position:'relative' }}><button style={copyBtn} onClick={copy}>{copied ? '✓ Copied!' : '📋 Copy'}</button><pre style={resultBoxStyle}>{result}</pre></div>)}
    </div>
  )
}