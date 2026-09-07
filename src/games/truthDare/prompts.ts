import type { Prompt, TruthDareMode } from './types'

const normalTruth: Prompt[] = [
  { en: 'What is your most embarrassing childhood memory?', fa: 'خجالت‌آورترین خاطره کودکی‌ات چیست؟' },
  { en: 'Who was your first crush?', fa: 'اولین کسی که عاشقش شدی کی بود؟' },
  { en: 'What habit of yours would surprise your friends?', fa: 'کدام عادتت دوستانت را غافلگیر می‌کند؟' },
  { en: 'What song do you secretly love?', fa: 'کدام آهنگ را مخفیانه دوست داری؟' },
  { en: 'What is the nicest compliment you have received?', fa: 'بهترین تعریفی که شنیده‌ای چیست؟' },
  { en: 'If you could travel anywhere tomorrow, where?', fa: 'اگر فردا بتوانی به هر جا بروی، کجا می‌روی؟' },
  { en: 'What is a skill you wish you had?', fa: 'چه مهارتی آرزو داری داشته باشی؟' },
  { en: 'What makes you laugh every time?', fa: 'چه چیزی همیشه خنده‌ات می‌گیرد؟' },
]

const normalDare: Prompt[] = [
  { en: 'Do your best celebrity impression for 20 seconds.', fa: 'به مدت ۲۰ ثانیه بهترین تقلید سلبریتی‌ات را انجام بده.' },
  { en: 'Send a funny voice note to the chat.', fa: 'یک ویس بامزه در چت بفرست.' },
  { en: 'Dance for 15 seconds without music.', fa: '۱۵ ثانیه بدون موزیک برقص.' },
  { en: 'Speak only in questions until your next turn.', fa: 'تا نوبت بعدی فقط با سؤال حرف بزن.' },
  { en: 'Draw a self-portrait in 30 seconds and show it.', fa: 'در ۳۰ ثانیه از خودت نقاشی بکش و نشان بده.' },
  { en: 'Invent a new handshake and teach it.', fa: 'یک دست‌دادن جدید اختراع کن و یاد بده.' },
  { en: 'Tell a joke — even a bad one counts.', fa: 'یک جوک بگو — حتی جوک بد هم قبول است.' },
  { en: 'Make up a short song about the other player.', fa: 'یک آهنگ کوتاه درباره بازیکن مقابل بساز.' },
]

const adultTruth: Prompt[] = [
  { en: 'What is your biggest turn-on?', fa: 'بزرگ‌ترین چیزی که بهت حال می‌دهد چیست؟' },
  { en: 'Describe your ideal flirty night out.', fa: 'یک شب ایده‌آل و کمی شیطنت‌آمیزت را توصیف کن.' },
  { en: 'Have you ever had a crush on a friend’s partner?', fa: 'تا حالا به پارتنر دوستت کرش داشته‌ای؟' },
  { en: 'What is a secret fantasy you rarely share?', fa: 'چه فانتزی مخفی‌ای داری که کمتر تعریف می‌کنی؟' },
  { en: 'What is the boldest message you have ever sent?', fa: 'جسورانه‌ترین پیامی که فرستاده‌ای چه بوده؟' },
  { en: 'Where is the riskiest place you have made out?', fa: 'ریسکی‌ترین جایی که بوسه کرده‌ای کجا بوده؟' },
  { en: 'What outfit makes you feel the most confident?', fa: 'کدام لباس بیشتر بهت اعتمادبه‌نفس می‌دهد؟' },
  { en: 'Who here would you most want a slow dance with?', fa: 'با کدام‌تان بیشتر دلت می‌خواهد آهسته برقصی؟' },
]

const adultDare: Prompt[] = [
  { en: 'Send a flirty compliment to the chat.', fa: 'یک تعریف کمی شیطنت‌آمیز در چت بفرست.' },
  { en: 'Hold eye contact with someone for 20 seconds.', fa: '۲۰ ثانیه با کسی چشم‌توچشم شو.' },
  { en: 'Whisper something bold into someone’s ear.', fa: 'چیز جسورانه‌ای در گوش کسی نجوا کن.' },
  { en: 'Give someone a 10-second shoulder massage.', fa: '۱۰ ثانیه به کسی ماساژ شانه بده.' },
  { en: 'Act out your best seductive walk across the room.', fa: 'بهترین راه رفتن اغواگرانت را در اتاق اجرا کن.' },
  { en: 'Let someone choose a song and dance to it.', fa: 'بگذار کسی آهنگ انتخاب کند و با آن برقص.' },
  { en: 'Show your most charming smile for a photo.', fa: 'جذاب‌ترین لبخندت را برای یک عکس نشان بده.' },
  { en: 'Compliment three things about the person next to you.', fa: 'سه تعریف از نفر کنارت بگو.' },
]

export const promptDecks: Record<TruthDareMode, { truth: Prompt[]; dare: Prompt[] }> = {
  normal: { truth: normalTruth, dare: normalDare },
  adult: { truth: adultTruth, dare: adultDare },
}

export function pickPrompt(mode: TruthDareMode, kind: 'truth' | 'dare', excludeText?: string) {
  const list = promptDecks[mode][kind]
  if (list.length === 0) return null
  const filtered = excludeText ? list.filter((p) => p.en !== excludeText) : list
  const pool = filtered.length > 0 ? filtered : list
  return pool[Math.floor(Math.random() * pool.length)]!
}
