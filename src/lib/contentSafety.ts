
// Basic content safety filters
// This is a client-side filter. For production, consider using a server-side solution or AI moderation API.

const URL_PATTERN = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/)/i;

// Keywords categories
const BAD_WORDS = [
    // Profanity (English & Korean)
    'fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'whore', 'slut', 'cunt', 'bastard',
    '시발', '씨발', '개새끼', '병신', '지랄', '좆', '씹', '창녀', '걸레', '미친년', '미친놈', '애미', '느금마',

    // Sexual Content
    'sex', 'porn', 'nude', 'incest', 'rape', 'masturbate', 'orgasm', 'ejaculation',
    '섹스', '포르노', '야동', '성폭행', '강간', '자위', '오르가즘', '질사', '콘돔',

    // Violence / Abuse / Hate
    'kill yourself', 'suicide', 'die', 'murder', 'terrorist', 'nigger', 'faggot', 'retard',
    '자살', '죽어', '살인', '테러', '나가뒤져', '재기해', '운지',

    // Gambling / Illegal
    'casino', 'gambling', 'toto', 'drug',
    '카지노', '도박', '토토', '마약',
];

// Helper to normalize text for checking (remove spaces, special chars for keyword matching)
const normalizeText = (text: string) => {
    return text.toLowerCase().replace(/[\s\-_.]/g, '');
};

interface SafetyCheckResult {
    safe: boolean;
    reason?: 'url' | 'bad_word' | 'length' | null;
    message?: string;
}

export const checkContentSafety = (text: string): SafetyCheckResult => {
    // 1. Check for URLs
    if (URL_PATTERN.test(text)) {
        return {
            safe: false,
            reason: 'url',
            message: 'Links and URLs are not allowed.'
        };
    }

    const normalized = normalizeText(text);
    const lowerText = text.toLowerCase();

    // 2. Check for Bad Words
    for (const word of BAD_WORDS) {
        // Check exact match in normalized text or inclusion in original text
        if (lowerText.includes(word) || normalized.includes(normalizeText(word))) {
            return {
                safe: false,
                reason: 'bad_word',
                message: 'Your story contains inappropriate content.'
            };
        }
    }

    return { safe: true };
};
