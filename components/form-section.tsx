'use client'

import type { Dispatch, SetStateAction } from 'react'
import { Check, Sun, Moon, PanelTop, PanelLeft } from 'lucide-react'
import {
  PROFESSION_OPTIONS,
  PRESET_COLORS,
  SNS_OPTIONS,
  type PromptFormState,
  type SnsKey,
} from '@/lib/prompt'

interface FormSectionProps {
  state: PromptFormState
  setState: Dispatch<SetStateAction<PromptFormState>>
}

function Label({
  children,
  required,
  htmlFor,
}: {
  children: React.ReactNode
  required?: boolean
  htmlFor?: string
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground"
    >
      {children}
      {required ? (
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-primary">
          必須
        </span>
      ) : (
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold tracking-wide text-muted-foreground">
          任意
        </span>
      )}
    </label>
  )
}

const inputBase =
  'w-full rounded-xl border border-border bg-card/60 px-4 py-2.5 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30'

export function FormSection({ state, setState }: FormSectionProps) {
  const toggleSns = (key: SnsKey) => {
    setState((prev) => ({
      ...prev,
      sns: prev.sns.includes(key)
        ? prev.sns.filter((s) => s !== key)
        : [...prev.sns, key],
    }))
  }

  const nameJaInvalid = state.nameJa.trim() === ''
  const nameEnInvalid = state.nameEn.trim() === ''
  const customInvalid =
    state.profession === 'その他' && state.customProfession.trim() === ''

  return (
    <div className="rounded-3xl border border-border/70 bg-card/50 p-6 shadow-xl shadow-primary/5 backdrop-blur-xl sm:p-8">
      <h2 className="mb-1 text-lg font-semibold text-foreground">入力フォーム</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        あなたの情報を入力してください。プロンプトは自動で更新されます。
      </p>

      <div className="flex flex-col gap-6">
        {/* Name JA */}
        <div>
          <Label htmlFor="nameJa" required>
            お名前 (日本語)
          </Label>
          <input
            id="nameJa"
            type="text"
            value={state.nameJa}
            onChange={(e) =>
              setState((p) => ({ ...p, nameJa: e.target.value }))
            }
            placeholder="例：山田 太郎"
            className={`${inputBase} ${nameJaInvalid ? 'border-destructive/50' : ''}`}
            aria-required="true"
          />
        </div>

        {/* Name EN */}
        <div>
          <Label htmlFor="nameEn" required>
            お名前 (ローマ字)
          </Label>
          <input
            id="nameEn"
            type="text"
            value={state.nameEn}
            onChange={(e) =>
              setState((p) => ({ ...p, nameEn: e.target.value }))
            }
            placeholder="例：Taro Yamada"
            className={`${inputBase} ${nameEnInvalid ? 'border-destructive/50' : ''}`}
            aria-required="true"
          />
        </div>

        {/* Profession */}
        <div>
          <Label htmlFor="profession" required>
            職種
          </Label>
          <select
            id="profession"
            value={state.profession}
            onChange={(e) =>
              setState((p) => ({
                ...p,
                profession: e.target.value as PromptFormState['profession'],
              }))
            }
            className={inputBase}
          >
            {PROFESSION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {state.profession === 'その他' && (
            <input
              type="text"
              value={state.customProfession}
              onChange={(e) =>
                setState((p) => ({ ...p, customProfession: e.target.value }))
              }
              placeholder="例: Videographer（英語の職種名を入力）"
              className={`${inputBase} mt-3 ${customInvalid ? 'border-destructive/50' : ''}`}
            />
          )}
        </div>

        {/* Color */}
        <div>
          <Label required>サイトのカラー</Label>
          <div className="flex flex-wrap items-center gap-3">
            {PRESET_COLORS.map((color) => {
              const selected =
                state.colorHex.toLowerCase() === color.toLowerCase()
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => setState((p) => ({ ...p, colorHex: color }))}
                  className={`relative h-10 w-10 rounded-full border shadow-sm transition-transform hover:scale-110 ${selected
                    ? 'border-foreground ring-2 ring-primary ring-offset-2 ring-offset-background'
                    : 'border-border'
                    }`}
                  style={{ backgroundColor: color }}
                  aria-label={`カラー ${color} を選択`}
                >
                  {selected && (
                    <Check
                      className="absolute inset-0 m-auto h-4 w-4 text-white"
                      strokeWidth={3}
                    />
                  )}
                </button>
              )
            })}
            <label className="relative flex h-10 cursor-pointer items-center gap-2 rounded-full border border-dashed border-border bg-card/60 px-3 text-xs text-muted-foreground transition-colors hover:border-primary">
              <span
                className="h-5 w-5 rounded-full border border-border"
                style={{ backgroundColor: state.colorHex }}
              />
              カスタム
              <input
                type="color"
                value={state.colorHex}
                onChange={(e) =>
                  setState((p) => ({ ...p, colorHex: e.target.value }))
                }
                className="absolute inset-0 cursor-pointer opacity-0"
                aria-label="カスタムカラーを選択"
              />
            </label>
            <span className="font-mono text-xs uppercase text-muted-foreground">
              {state.colorHex}
            </span>
          </div>
        </div>

        {/* Color Mode */}
        <div>
          <Label required>カラーモード</Label>
          <div className="inline-flex rounded-xl border border-border bg-muted/50 p-1">
            <button
              type="button"
              onClick={() => setState((p) => ({ ...p, colorMode: 'light' }))}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${state.colorMode === 'light'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground'
                }`}
              aria-pressed={state.colorMode === 'light'}
            >
              <Sun className="h-4 w-4" />
              ライトモード
            </button>
            <button
              type="button"
              onClick={() => setState((p) => ({ ...p, colorMode: 'dark' }))}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${state.colorMode === 'dark'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground'
                }`}
              aria-pressed={state.colorMode === 'dark'}
            >
              <Moon className="h-4 w-4" />
              ダークモード
            </button>
          </div>
        </div>

        {/* Layout */}
        <div>
          <Label required>メニュー配置</Label>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { value: 'top', label: 'トップナビゲーション', icon: PanelTop },
                { value: 'sidebar', label: '左側サイドバー', icon: PanelLeft },
              ] as const
            ).map(({ value, label, icon: Icon }) => {
              const selected = state.layout === value
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setState((p) => ({ ...p, layout: value }))}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${selected
                    ? 'border-primary bg-primary/5 text-foreground'
                    : 'border-border bg-card/60 text-muted-foreground hover:border-primary/50'
                    }`}
                  aria-pressed={selected}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${selected ? 'border-primary' : 'border-border'
                      }`}
                  >
                    {selected && (
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    )}
                  </span>
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Catchphrase */}
        <div>
          <Label htmlFor="catchphrase">メインキャッチコピー</Label>
          <input
            id="catchphrase"
            type="text"
            value={state.catchphrase}
            onChange={(e) =>
              setState((p) => ({
                ...p, catchphrase: e.target.value
              }))
            }
            placeholder="未入力の場合はAIが自動生成します"
            className={inputBase}
          />
        </div>

        {/* SNS */}
        <div>
          <Label>SNSリンク</Label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SNS_OPTIONS.map((sns) => {
              const checked = state.sns.includes(sns)
              return (
                <button
                  key={sns}
                  type="button"
                  onClick={() => toggleSns(sns)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${checked
                    ? 'border-primary bg-primary/5 text-foreground'
                    : 'border-border bg-card/60 text-muted-foreground hover:border-primary/50'
                    }`}
                  aria-pressed={checked}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded border ${checked
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border'
                      }`}
                  >
                    {checked && <Check className="h-3 w-3" strokeWidth={3} />}
                  </span>
                  {sns}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
