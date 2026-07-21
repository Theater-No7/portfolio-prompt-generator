export type ProfessionKey =
  | 'イラストレーター'
  | 'デザイナー'
  | 'フォトグラファー'
  | 'エンジニア'
  | 'その他'

export const PROFESSION_OPTIONS: ProfessionKey[] = [
  'イラストレーター',
  'デザイナー',
  'フォトグラファー',
  'エンジニア',
  'その他',
]

const PROFESSION_EN: Record<Exclude<ProfessionKey, 'その他'>, string> = {
  イラストレーター: 'Illustrator',
  デザイナー: 'Designer',
  フォトグラファー: 'Photographer',
  エンジニア: 'Engineer',
}

export type ColorMode = 'light' | 'dark'
export type Layout = 'top' | 'sidebar'
export type SnsKey = 'X' | 'Instagram' | 'GitHub' | 'Note'

export const SNS_OPTIONS: SnsKey[] = ['X', 'Instagram', 'GitHub', 'Note']

export const PRESET_COLORS = [
  '#009297',
  '#1E293B',
  '#E11D48',
  '#F59E0B',
  '#7C3AED',
]

export interface PromptFormState {
  nameJa: string
  nameEn: string
  profession: ProfessionKey
  customProfession: string
  colorHex: string
  colorMode: ColorMode
  layout: Layout
  catchphrase: string
  sns: SnsKey[]
}

export const INITIAL_STATE: PromptFormState = {
  nameJa: '',
  nameEn: '',
  profession: 'イラストレーター',
  customProfession: '',
  colorHex: '#009297',
  colorMode: 'light',
  layout: 'top',
  catchphrase: '',
  sns: ['X', 'Instagram'],
}

export function resolveProfession(state: PromptFormState): string {
  if (state.profession === 'その他') {
    return state.customProfession.trim() || 'Creative Professional'
  }
  return PROFESSION_EN[state.profession]
}

export function buildPrompt(state: PromptFormState): string {
  const profession = resolveProfession(state)
  const nameJa = state.nameJa.trim() || '（お名前）'
  const nameEn = state.nameEn.trim() || '(Name)'
  const colorMode = state.colorMode === 'light' ? 'Light' : 'Dark'
  const layout =
    state.layout === 'top' ? 'Top Navigation' : 'Left Sidebar'
  const catchphrase = state.catchphrase.trim()
  const snsList =
    state.sns.length > 0 ? state.sns.join(', ') : 'no specific social links'

  return `You are an expert UI/UX Designer and Frontend Engineer.
Create a modern, highly sophisticated portfolio website for a ${profession}.

# 1. Critical Text & Language Rules
* ALL visible text on the website MUST be in Japanese.
* The user's name is "${nameJa}" (${nameEn}).
* Use English only for stylish accent typographies (e.g., "WORKS", "ABOUT ME").
* Main Catchphrase: ${
    catchphrase ||
    'Generate a catchy Japanese phrase suitable for the profession'
  }

# 2. Visual Theme & Colors
* **Theme:** ${colorMode} Mode.
* **Primary Color:** ${state.colorHex}. Use this for accents, buttons, and important text.
* **Aesthetic:** Glassmorphism with generous padding and modern typography.

# 3. Layout & Structure
* **Navigation:** ${layout}.
* **Hero Section:** Big impactful catchphrase, a placeholder for a profile picture, and a primary CTA button.
* **About:** Name, a short Japanese bio, and skill tags.
* **Works:** A grid of 3 project cards with placeholder images, Japanese titles, and smooth hover animations.
* **Contact:** A clean contact form and social icons (${snsList}).

# 4. Image Handling (Strict Rule)
* DO NOT generate AI images containing people or text.
* Use beautiful, abstract placeholder images or Lucide React icons.

# 5. Technical Requirements
* Use React, Tailwind CSS, and Lucide React.
* Ensure perfect mobile responsiveness.`
}
