'use client'

import { useMemo, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { FormSection } from '@/components/form-section'
import { OutputSection } from '@/components/output-section'
import { buildPrompt, INITIAL_STATE, type PromptFormState } from '@/lib/prompt'

export function PromptGenerator() {
  const [state, setState] = useState<PromptFormState>(INITIAL_STATE)

  const prompt = useMemo(() => buildPrompt(state), [state])

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
        <header className="mb-10 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            v0 PORTFOLIO PROMPT
          </span>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            ポートフォリオ プロンプトジェネレーター
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            必要な情報を入力するだけで、v0
            であなただけのポートフォリオサイトを作成するための最適なプロンプトを自動生成します。
          </p>
        </header>

        <div className="flex flex-col gap-6">
          <FormSection state={state} setState={setState} />
          <OutputSection prompt={prompt} />
        </div>
      </div>
    </main>
  )
}
