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

export async function translateText(
    text: string,
    targetLang: string,
    sourceLang: string = 'en'
): Promise<string> {
    // Using MyMemory API for true free/anonymous usage
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`

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
