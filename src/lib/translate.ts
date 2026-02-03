export interface TranslationResponse {
    responseData: {
        translatedText: string
    }
    responseStatus: number
    responseDetails: string
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
    sourceLang: string = 'auto' // Use API's robust detection
): Promise<string> {
    // If we rely on Auto, we can't easily skip source==target locally.
    // We'll trust the API or if sourceLang is explicitly provided, we can skip.
    if (sourceLang !== 'auto' && sourceLang === targetLang) {
        return text;
    }

    // Using Google GTX API for better reliability and limits
    const apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`

    try {
        const res = await fetch(apiUrl)

        if (!res.ok) {
            console.warn(`Translation failed: ${res.status} ${res.statusText}`)
            return text;
        }

        const data = await res.json()

        // Google GTX returns complex array structure
        // data[0] is array of sentences: [[translated, source, ...], [translated, source, ...]]
        if (data && data[0]) {
            return data[0].map((item: any) => item[0]).join('')
        }

        return text
    } catch (error) {
        console.error('Translation error:', error)
        return text
    }
}
