export type LanguageCode = 'en' | 'ko' | 'ja' | 'zh-CN' | 'es' | 'fr' | 'de';

export const TRANSLATIONS: Record<string, any> = {
    en: {
        subtitle: "A Global Collaborative Novel",
        header: {
            howToUse: "How to use",
            about: "About"
        },
        guide: {
            title: "How to Participate",
            intro: "Welcome to <strong>The Continuity</strong>, a global collaborative novel written by people from all over the world.",
            step1Title: "1. Read",
            step1Desc: "Scroll through the feed to read the story so far. It flows continuously.",
            step2Title: "2. Translate",
            step2Desc: "Use the language selector at the top-right to read in your preferred language.",
            step3Title: "3. Write",
            step3Desc: "Add the next sentence to the story. Keep it under 100 characters. You can write in your native language!",
            step4Title: "4. Cooldown",
            step4Desc: "To give everyone a chance, you must wait 5 minutes between contributions.",
            button: "Start Writing"
        },
        about: {
            title: "About The Continuity",
            intro: "<strong>The Continuity</strong> is an experimental project in collective storytelling. It removes language barriers, allowing imagination to flow freely across borders.",
            visionTitle: "Our Vision",
            visionDesc: "We believe that a story written by thousands of people can be more surprising and profound than one written by a single author. By integrating real-time AI translation, we enable a truly global collaboration where a sentence written in Korean can seamlessly follow one written in English, French, or Japanese.",
            featuresTitle: "Features",
            features: [
                "Real-time AI Translation",
                "Global Collaborative Writing",
                "Anonymous Contribution",
                "Live Updates"
            ],
            footer: "Built with Next.js, Supabase, and AI.<br />Designed for the world."
        },
        input: {
            title: "Translate Stories", // This was in the old design, might be unused but keeping just in case
            placeholder: "Write the next sentence...",
            placeholderCooldown: "Please wait {time} to contribute again.",
            buttonPosting: "Posting...",
            buttonCooldown: "Cooldown",
            buttonContribute: "Contribute",
            charCount: "{current}/100"
        },
        errors: {
            safety: {
                url: "Links and URLs are not allowed.",
                badWord: "Your story contains inappropriate content.",
                default: "Content cannot be posted."
            }
        }
    },
    ko: {
        subtitle: "글로벌 릴레이 소설 프로젝트",
        header: {
            howToUse: "이용 방법",
            about: "소개"
        },
        guide: {
            title: "참여 방법",
            intro: "<strong>The Continuity</strong>에 오신 것을 환영합니다. 전 세계 사람들이 함께 만들어가는 릴레이 소설입니다.",
            step1Title: "1. 읽기",
            step1Desc: "스크롤을 내려 지금까지 작성된 이야기를 읽어보세요.",
            step2Title: "2. 번역",
            step2Desc: "우측 상단의 언어 선택 기능을 통해 원하는 언어로 소설을 읽을 수 있습니다.",
            step3Title: "3. 쓰기",
            step3Desc: "다음 문장을 이어 써주세요. 100자 이내로, 모국어로 자유롭게 작성하시면 됩니다.",
            step4Title: "4. 쿨타임",
            step4Desc: "많은 사람들의 참여를 위해, 글을 쓴 후에는 5분의 대기 시간이 있습니다.",
            button: "글쓰기 시작"
        },
        about: {
            title: "프로젝트 소개",
            intro: "<strong>The Continuity</strong>는 집단 지성을 통한 storytelling 실험 프로젝트입니다. 언어의 장벽을 넘어 상상력이 자유롭게 흐르도록 돕습니다.",
            visionTitle: "우리의 비전",
            visionDesc: "수천 명의 사람들이 함께 쓰는 이야기는 한 명의 작가가 쓰는 것보다 더 놀랍고 깊이가 있을 것이라 믿습니다. 실시간 AI 번역을 통해, 한국어로 쓴 문장이 영어, 프랑스어, 일본어 문장과 자연스럽게 이어지는 진정한 글로벌 협업을 실현합니다.",
            featuresTitle: "특징",
            features: [
                "실시간 AI 번역",
                "글로벌 릴레이 집필",
                "익명 참여",
                "실시간 업데이트"
            ],
            footer: "Next.js, Supabase, AI로 제작되었습니다.<br />전 세계를 위해 디자인되었습니다."
        },
        input: {
            title: "이야기 번역",
            placeholder: "다음 문장을 입력하세요...",
            placeholderCooldown: "다시 작성하려면 {time} 기다려주세요.",
            buttonPosting: "등록 중...",
            buttonCooldown: "대기 중",
            buttonContribute: "작성하기",
            charCount: "{current}/100"
        },
        errors: {
            safety: {
                url: "링크나 URL은 입력할 수 없습니다.",
                badWord: "부적절한 내용이 포함되어 있습니다.",
                default: "내용을 등록할 수 없습니다."
            }
        }
    },
    ja: {
        subtitle: "世界をつなぐリレー小説",
        header: {
            howToUse: "使い方",
            about: "紹介"
        },
        guide: {
            title: "参加方法",
            intro: "<strong>The Continuity</strong>へようこそ。世界中の人々が共に紡ぐリレー小説プロジェクトです。",
            step1Title: "1. 読む",
            step1Desc: "スクロールして、これまでの物語を読み進めてください。",
            step2Title: "2. 翻訳",
            step2Desc: "右上の言語選択メニューから、お好みの言語で読むことができます。",
            step3Title: "3. 書く",
            step3Desc: "物語の続きを書いてください。100文字以内で、母国語で自由に書くことができます。",
            step4Title: "4. クールタイム",
            step4Desc: "多くの人が参加できるよう、投稿後は5分間の待機時間があります。",
            button: "書き始める"
        },
        about: {
            title: "プロジェクトについて",
            intro: "<strong>The Continuity</strong>は、集合知によるストーリーテリングの実験的プロジェクトです。言葉の壁を取り払い、想像力を自由に羽ばたかせます。",
            visionTitle: "ビジョン",
            visionDesc: "数千人が紡ぐ物語は、一人の作家が書く物語よりも驚きと深みがあると信じています。リアルタイムAI翻訳により、韓国語で書かれた文章が英語、フランス語、日本語の文章と自然につながる、真のグローバルコラボレーションを実現します。",
            featuresTitle: "特徴",
            features: [
                "リアルタイムAI翻訳",
                "グローバルリレー執筆",
                "匿名投稿",
                "リアルタイム更新"
            ],
            footer: "Next.js、Supabase、AIで構築。<br />世界のためにデザインされました。"
        },
        input: {
            title: "物語の翻訳",
            placeholder: "次の文章を入力してください...",
            placeholderCooldown: "再投稿まで {time} お待ちください。",
            buttonPosting: "投稿中...",
            buttonCooldown: "待機中",
            buttonContribute: "投稿する",
            charCount: "{current}/100"
        },
        errors: {
            safety: {
                url: "リンクやURLは入力できません。",
                badWord: "不適切な内容が含まれています。",
                default: "投稿できません。"
            }
        }
    },
    "zh-CN": {
        subtitle: "全球接力小说",
        header: {
            howToUse: "使用说明",
            about: "关于"
        },
        guide: {
            title: "参与方式",
            intro: "欢迎来到 <strong>The Continuity</strong>，这是一部由世界各地的人们共同编写的全球接力小说。",
            step1Title: "1. 阅读",
            step1Desc: "向下滚动阅读目前为止的故事。",
            step2Title: "2. 翻译",
            step2Desc: "使用右上角的语言选择器，以您喜欢的语言阅读。",
            step3Title: "3. 写作",
            step3Desc: "续写下一句话。限制在100字以内。您可以用母语自由创作！",
            step4Title: "4. 冷却时间",
            step4Desc: "为了给每个人参与的机会，投稿后需要等待5分钟。",
            button: "开始写作"
        },
        about: {
            title: "关于本项目",
            intro: "<strong>The Continuity</strong> 是一个关于集体叙事的实验项目。它消除了语言障碍，让想象力跨越国界自由流动。",
            visionTitle: "我们的愿景",
            visionDesc: "我们相信，由成千上万的人共同编写的故事，比单一作者的故事更令人惊喜和深刻。通过集成实时AI翻译，我们实现了真正的全球协作，韩语写成的句子可以无缝衔接英语、法语或日语的句子。",
            featuresTitle: "特点",
            features: [
                "实时AI翻译",
                "全球接力写作",
                "匿名投稿",
                "实时更新"
            ],
            footer: "基于 Next.js, Supabase 和 AI 构建。<br />为世界而设计。"
        },
        input: {
            title: "翻译故事",
            placeholder: "写下下一句话...",
            placeholderCooldown: "请等待 {time} 后再次投稿。",
            buttonPosting: "发布中...",
            buttonCooldown: "冷却中",
            buttonContribute: "投稿",
            charCount: "{current}/100"
        },
        errors: {
            safety: {
                url: "不允许包含链接或URL。",
                badWord: "包含不当内容。",
                default: "无法发布内容。"
            }
        }
    }
    // Add other languages as needed, fallback to English logic handles missing keys ideally,
    // but strict typing allows us to just ensure these 4 are good for now.
    // For others (es, fr, de), they will fall back to English or we can copy English.
};

// Fallback for other languages
['es', 'fr', 'de'].forEach(lang => {
    TRANSLATIONS[lang] = TRANSLATIONS['en'];
});
