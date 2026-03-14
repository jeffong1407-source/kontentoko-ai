'use client'
import { useState } from 'react'
import { cardStyle, inputStyle, btnStyle, labelStyle, resultBoxStyle, copyBtn, spinnerStyle } from './shared'
export default function HookGenerator() {
  const [product, setProduct] = useState('')
  const [target, setTarget] = useState('')
  const [angle, setAngle] = useState('mix')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const generate = async () => {
    if (!product.trim()) return
    setLoading(true); setResult('')
    try {
      const res = await fetch('/api/hook', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ product, target, angle }) })
      const data = await res.json()
      setResult(data.result || data.error || 'Error')
    } catch { setResult('Gagal generate. Coba lagi.') }
    setLoading(false)
  }
  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:22, marginBottom:6 }}>⚡ HookGenerator AI</h2>
        <p style={{ color:'#7a8499', fontSize:14 }}>Generate 20 hook video TikTok yang bikin orang stop scrolling.</p>
      </div>
      <div style={cardStyle}>
        <div style={{ marginBottom:18 }}><label style={labelStyle}>Nama & deskripsi produk *</label><input style={inputStyle} placeholder="cth: Serum Vitamin C Brightening 30ml" value={product} onChange={e => setProduct(e.target.value)} /></div>
        <div style={{ marginBottom:18 }}><label style={labelStyle}>Target pembeli</label><input style={inputStyle} placeholder="cth: wanita 20–35 tahun, skincare enthusiast" value={target} onChange={e => setTarget(e.target.value)} /></div>
        <div style={{ marginBottom:24 }}>
          <label style={labelStyle}>Dominan angle</label>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:8 }}>
            {[['mix','🎯 Mix'],['pain','😤 Pain'],['curiosity','🤔 Curiosity'],['shock','😱 Shock'],['proof','⭐ Social Proof']].map(([v,l]) => (
              <button key={v} onClick={() => setAngle(v)} style={{ padding:'8px 14px', borderRadius:8, border: angle===v ? '1px solid #ff2d6b' : '1px solid #1a2035', background: angle===v ? 'rgba(255,45,107,0.12)' : 'transparent', color: angle===v ? '#ff2d6b' : '#7a8499', fontSize:12, fontWeight:600, cursor:'pointer' }}>{l}</button>
            ))}
          </div>
        </div>
        <button style={btnStyle(loading)} onClick={generate} disabled={loading}>{loading ? <span style={spinnerStyle} /> : null}{loading ? 'Generating...' : '⚡ Generate 20 Hook'}</button>
      </div>
      {result && (<div style={{ marginTop:24, position:'relative' }}><button style={copyBtn} onClick={copy}>{copied ? '✓ Copied!' : '📋 Copy'}</button><pre style={resultBoxStyle}>{result}</pre></div>)}
    </div>
  )
}