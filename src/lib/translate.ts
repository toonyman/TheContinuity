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
    sourceLang: string = 'Autodetect' // Use API's robust detection
): Promise<string> {
    // If we rely on Autodetect, we can't easily skip source==target locally.
    // We'll trust the API or if sourceLang is explicitly provided, we can skip.
    if (sourceLang !== 'Autodetect' && sourceLang === targetLang) {
        return text;
    }

    // Using MyMemory API for true free/anonymous usage
    // API requires 'Autodetect' (capitalized seems safer based on tests) if unknown
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`

    try {
        const res = await fetch(apiUrl)

        if (!res.ok) {
            console.warn('Translation failed, returning original text')
            return text;
        }

        const data: TranslationResponse = await res.json()

        // Check for specific error message about invalid pair
        if (data.responseStatus !== 200) {
            console.warn('Translation API returned error:', data.responseDetails)
            return text
        }

        return data.responseData.translatedText
    } catch (error) {
        console.error('Translation error:', error)
        return text
    }
}
