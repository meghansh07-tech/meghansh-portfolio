import { ImageResponse } from 'next/og'

export const alt = 'Meghansh Singh — Aspiring AI Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const tags = ['GenAI', 'RAG', 'LangChain', 'Python', 'Data Science']

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'radial-gradient(circle at 85% 15%, #1f2a1a 0%, #050505 55%)',
          color: '#f5f5f5',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, color: '#a3a3a3' }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: '#c6f432' }} />
          Open to opportunities
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 104, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>Meghansh Singh</div>
          <div style={{ fontSize: 48, color: '#c6f432', fontWeight: 600 }}>Aspiring AI Engineer</div>
        </div>

        <div style={{ display: 'flex', gap: 14 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                padding: '10px 22px',
                borderRadius: 999,
                border: '1px solid #333',
                fontSize: 24,
                color: '#d4d4d4',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
