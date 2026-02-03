export interface TranslationResponse {
    responseData: {
        translatedText: string
    }
}

export const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'ko', name: 'Korean' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh-CN', name: 'Chinese' }, // MyMemory uses zh-CN
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
]


// Basic language detection helper
function detectLanguage(text: string): string {
    const koPattern = /[\u3131-\uD79D]/;
    const jaPattern = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/;
    const zhPattern = /[\u4e00-\u9fa5]/;

    // Check for Korean first (specific range)
    if (koPattern.test(text)) return 'ko';

    // Check for Japanese (Hiragana, Katakana)
    if (jaPattern.test(text)) return 'ja';

    // Check for Chinese (if not captured by above, though CJK overlaps)
    // Simplified checks for this MVP
    if (zhPattern.test(text)) return 'zh-CN';

    return 'en'; // Default fallback
}

export async function translateText(
    text: string,
    targetLang: string,
    sourceLang: string = 'auto'
): Promise<string> {
    // Detect source language if set to auto
    const actualSource = sourceLang === 'auto' ? detectLanguage(text) : sourceLang;

    // Skip if source equals target
    if (actualSource === targetLang) return text;

    // Using MyMemory API for true free/anonymous usage
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${actualSource}|${targetLang}`

    try {
        const res = await fetch(apiUrl)

        if (!res.ok) {
            console.warn('Translation failed, returning original text')
            return text;
        }

        const data: TranslationResponse = await res.json()
        // Decode HTML entities if necessary using a basic replace or a library (simplifying here)
        return data.responseData.translatedText
    } catch (error) {
        console.error('Translation error:', error)
        return text
    }
}
