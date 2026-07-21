'use client'

import { useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'

interface OutputSectionProps {
  prompt: string
}

export function OutputSection({ prompt }: OutputSectionProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement('textarea')
      el.value = prompt
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col rounded-3xl border border-border/70 bg-card/50 p-6 shadow-xl shadow-primary/5 backdrop-blur-xl sm:p-8 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            生成されたプロンプト
          </h2>
          <p className="text-sm text-muted-foreground">
            v0 に貼り付けて使用してください。
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition-all ${
            copied
              ? 'bg-primary/15 text-primary'
              : 'bg-primary text-primary-foreground hover:opacity-90 active:scale-95'
          }`}
          aria-live="polite"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" strokeWidth={3} />
              コピーしました
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              プロンプトをコピー
            </>
          )}
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-2xl border border-border/50 bg-[oklch(0.19_0.02_220)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-white/50">
            <Terminal className="h-3.5 w-3.5" />
            prompt.txt
          </span>
        </div>
        <pre className="max-h-[60vh] overflow-auto p-5 font-mono text-[13px] leading-relaxed text-white/85 lg:max-h-[calc(100vh-16rem)]">
          <code>{prompt}</code>
        </pre>
      </div>
    </div>
  )
}
