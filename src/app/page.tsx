'use client'
import { useState } from 'react'
import HookGenerator from './tools/HookGenerator'
import ScriptVideo from './tools/ScriptVideo'
import CaptionPack from './tools/CaptionPack'
import ContentCalendar from './tools/ContentCalendar'
const TOOLS = [
  { id: 'hook', label: 'HookGenerator', icon: '⚡' },
  { id: 'script', label: 'ScriptVideo', icon: '🎬' },
  { id: 'caption', label: 'CaptionPack', icon: '✍️' },
  { id: 'calendar', label: 'ContentCalendar', icon: '📅' },
]
export default function Home() {
  const [active, setActive] = useState('hook')
  return (
    <main style={{ minHeight:'100vh', background:'#06080d', color:'#f0ede8', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
      <header style={{ borderBottom:'1px solid #1a2035', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:60, background:'rgba(6,8,13,0.95)', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ fontFamily:"'Syne', sans-serif", fontWeight:900, fontSize:18, background:'linear-gradient(90deg, #ff2d6b, #00e5c9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>KontenToko AI</div>
        <div style={{ fontSize:11, color:'#7a8499', fontFamily:'monospace', letterSpacing:'0.1em' }}>4-IN-1 CONTENT MACHINE</div>
      </header>
      <div style={{ display:'flex', gap:0, borderBottom:'1px solid #1a2035', overflowX:'auto', background:'#0c0f18', padding:'0 16px' }}>
        {TOOLS.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)} style={{ padding:'14px 20px', border:'none', cursor:'pointer', background:'transparent', borderBottom: active===t.id ? '2px solid #ff2d6b' : '2px solid transparent', color: active===t.id ? '#f0ede8' : '#7a8499', fontFamily:"'Syne', sans-serif", fontWeight:700, fontSize:13, whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:7 }}>
            <span>{t.icon}</span><span>{t.label}</span>
            <span style={{ fontSize:9, padding:'2px 6px', borderRadius:4, fontFamily:'monospace', background: active===t.id ? 'rgba(255,45,107,0.15)' : 'rgba(255,255,255,0.05)', color: active===t.id ? '#ff2d6b' : '#3a4258' }}>AI</span>
          </button>
        ))}
      </div>
      <div style={{ maxWidth:800, margin:'0 auto', padding:'32px 20px' }}>
        {active === 'hook' && <HookGenerator />}
        {active === 'script' && <ScriptVideo />}
        {active === 'caption' && <CaptionPack />}
        {active === 'calendar' && <ContentCalendar />}
      </div>
    </main>
  )
}