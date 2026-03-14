'use client'
import { useState } from 'react'
import { cardStyle, inputStyle, btnStyle, labelStyle, resultBoxStyle, copyBtn, spinnerStyle } from './shared'
export default function ScriptVideo() {
  const [product, setProduct] = useState('')
  const [pain, setPain] = useState('')
  const [duration, setDuration] = useState('45')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const generate = async () => {
    if (!product.trim()) return
    setLoading(true); setResult('')
    try {
      const res = await fetch('/api/script', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ product, pain, duration }) })
      const data = await res.json()
      setResult(data.result || data.error || 'Error')
    } catch { setResult('Gagal generate. Coba lagi.') }
    setLoading(false)
  }
  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:900, fontSize:22, marginBottom:6 }}>🎬 ScriptVideo AI</h2>
        <p style={{ color:'#7a8499', fontSize:14 }}>Generate script TikTok lengkap siap shooting.</p>
      </div>
      <div style={cardStyle}>
        <div style={{ marginBottom:18 }}><label style={labelStyle}>Produk *</label><input style={inputStyle} placeholder="cth: Serum Vitamin C Brightening" value={product} onChange={e => setProduct(e.target.value)} /></div>
        <div style={{ marginBottom:18 }}><label style={labelStyle}>Pain point utama pembeli</label><input style={inputStyle} placeholder="cth: kulit kusam setelah pakai banyak produk" value={pain} onChange={e => setPain(e.target.value)} /></div>
        <div style={{ marginBottom:24 }}>
          <label style={labelStyle}>Durasi video</label>
          <div style={{ display:'flex', gap:8, marginTop:8 }}>
            {['30','45','60'].map(d => (<button key={d} onClick={() => setDuration(d)} style={{ padding:'8px 20px', borderRadius:8, border: duration===d ? '1px solid #ff2d6b' : '1px solid #1a2035', background: duration===d ? 'rgba(255,45,107,0.12)' : 'transparent', color: duration===d ? '#ff2d6b' : '#7a8499', fontSize:13, fontWeight:600, cursor:'pointer' }}>{d} dtk</button>))}
          </div>
        </div>
        <button style={btnStyle(loading)} onClick={generate} disabled={loading}>{loading ? <span style={spinnerStyle} /> : null}{loading ? 'Generating...' : '🎬 Generate Script'}</button>
      </div>
      {result && (<div style={{ marginTop:24, position:'relative' }}><button style={copyBtn} onClick={copy}>{copied ? '✓ Copied!' : '📋 Copy'}</button><pre style={resultBoxStyle}>{result}</pre></div>)}
    </div>
  )
}