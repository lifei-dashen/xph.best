/**
 * 麋鹿性癖好测试 / Elk Preference Test
 * 完整版 Script - Part 1: 配置与前23题
 */

// --- 1. 维度定义 (Dimensions) ---
// 对应雷达图的22个轴
const dimensions = {
    // 核心攻受与控制
    dominance: { label: '征服 (Dom)', en: 'Dominance', desc: '掌控局面的欲望与领导力' },
    submission: { label: '臣服 (Sub)', en: 'Submission', desc: '渴望顺从与交付控制权' },
    control: { label: '控制', en: 'Control', desc: '对伴侣细节与行为的掌控' },
    obedience: { label: '服从', en: 'Obedience', desc: '执行指令带来的安全感' },
    
    // 施虐与受虐
    sadism: { label: '施虐 (S)', en: 'Sadism', desc: '从施加痛苦或精神折磨中获益' },
    masochism: { label: '受虐 (M)', en: 'Masochism', desc: '从疼痛或被折磨中获得快感' },
    
    // 羞辱与尊严
    humiliation_dom: { label: '羞辱 (S)', en: 'Degradation', desc: '贬低他人获得的优越感' },
    humiliation_sub: { label: '羞辱 (M)', en: 'Humiliation', desc: '享受被物化或贬低' },
    
    // 互动模式
    brat: { label: '叛逆 (Brat)', en: 'Brat', desc: '通过挑衅获取关注与被征服感' },
    taming: { label: '管教', en: 'Taming', desc: '享受驯服不听话伴侣的过程' }, // 对应 Brat 的另一面
    
    // 限制与强迫幻想 (CNC)
    coercion: { label: '强迫 (CNC)', en: 'Coercion', desc: '模拟非自愿情境的主导方' },
    forced: { label: '被迫 (CNC)', en: 'Forced', desc: '模拟非自愿情境的被动方' },
    
    // 角色与特定玩法
    protection: { label: '保护/DD', en: 'Caregiver', desc: '父爱般的关怀与引导' },
    dependency: { label: '依赖/lg', en: 'Little', desc: '幼儿般的依恋与退行' },
    pet: { label: '恋宠', en: 'Pet Play', desc: '动物扮演与非人化互动' },
    fetish: { label: '恋物', en: 'Fetish', desc: '对特定物品（足、胶、丝）的迷恋' },
    
    // 开放度与社会禁忌
    exhibitionism: { label: '暴露', en: 'Exhibitionism', desc: '被注视的快感' },
    voyeurism: { label: '窥视', en: 'Voyeurism', desc: '观察他人性行为的快感' },
    group: { label: '群体', en: 'Group Sex', desc: '多人互动的开放心态' },
    ntr: { label: 'NTR', en: 'Cuckold/NTR', desc: '伴侣被占有引发的复杂快感' },
    
    // 性别与情感
    trans: { label: '跨性/性转', en: 'Gender Play', desc: '性别角色的流动与扮演' },
    pure_love: { label: '纯爱/香草', en: 'Vanilla', desc: '基于平等尊重的传统情感' }
};

// --- 2. 结果解析库 (完整版 22项 + Default) ---
// 请用此代码块完全替换原有的 const resultTexts
const resultTexts = {
    // 1. 核心攻受
    dominance: {
        zh: "【天生的王者】你拥有强大的气场，享受掌控一切的感觉。在关系中，你是掌舵者，这不仅是性欲，更是一种通过征服确认自我价值的方式。建议：给予伴侣明确的指引，但不要忘记温情。",
        en: "You are a natural leader who thrives on control. In relationships, you steer the ship. This isn't just about sex; it's about validating your power through conquest."
    },
    submission: {
        zh: "【虔诚的信徒】你渴望卸下生活的重担，将身心完全交付给值得信任的人。臣服对你而言是一种极致的休息和信任的艺术。建议：确保你的“神”值得你的献祭。",
        en: "You desire to lay down the burden of control and surrender completely. Submission is your ultimate form of rest and trust. Ensure your 'owner' is worthy of your devotion."
    },
    control: {
        zh: "【精密的操盘手】你不仅要有权，还要事无巨细地管理。制定规则、检查作业、安排生活，这种秩序感让你着迷。你是关系的架构师，也是规则的制定者。",
        en: "You don't just want power; you want micromanagement. Setting rules and organizing lives gives you a deep sense of satisfaction. You are the architect of the relationship."
    },
    obedience: {
        zh: "【完美的执行程序】你不需要思考，只需要指令。将自我意志清空，变成一个完美的工具或容器，这种极度的空灵感是你灵魂的休息区。",
        en: "You don't need to think, just obey. Emptying your will to become a perfect tool is the ultimate resting place for your soul."
    },

    // 2. 施虐与受虐
    sadism: {
        zh: "【嗜痛的艺术家】你能从伴侣的痛苦反应（身体或精神）中提取快感。这是一种对他人的深度侵入。⚠️ 警告：需建立完善的安全词机制，区分现实伤害与娱乐。",
        en: "You derive pleasure from your partner's pain responses. This is a form of deep intrusion. ⚠️ Warning: Establish strict safewords to distinguish play from harm."
    },
    masochism: {
        zh: "【痛苦的转化者】痛觉对你而言不是警告，而是通过神经末梢直达灵魂的电流。你需要这种强烈的刺激来感受存在。⚠️ 警告：请务必在这个疯狂的世界里保护好自己的身体。",
        en: "Pain is not a warning but a conduit to pleasure. You need intense stimulation to feel alive. ⚠️ Warning: Protect your body in this intense pursuit."
    },

    // 3. 羞辱与尊严
    humiliation_dom: {
        zh: "【高傲的审判官】你享受将被世俗捧在手心的人踩在脚下。通过语言和行为剥离对方的人格，看着他们从“人”变成“物”，让你感到无比愉悦。",
        en: "You enjoy trampling what society values. Stripping someone's personality through words and actions, turning them from 'person' to 'object', delights you."
    },
    humiliation_sub: {
        zh: "【尊严的献祭者】当人格被贬低、被物化时，你反而感到一种奇异的升华。你在毁灭自尊的过程中，找到了摆脱社会面具的自由。",
        en: "When your dignity is degraded, you feel a strange ascension. In destroying your ego, you find freedom from your social mask."
    },

    // 4. 互动模式
    brat: {
        zh: "【娇纵的捣蛋鬼】顺从太无聊了，你喜欢在底线边缘疯狂试探。你的挑衅其实是在大喊“快来征服我”。建议：找到一个能读懂你“不要”背后含义的耐心猎手。",
        en: "Obedience is boring. You love testing boundaries. Your defiance is a cry for attention and conquest. Find a patient hunter who understands your games."
    },
    taming: {
        zh: "【耐心的驯兽师】听话的猎物没有挑战性，你更喜欢通过手段将桀骜不驯的伴侣一步步调教成温顺的模样，这种成就感无可比拟。",
        en: "Obedience is boring if it's easy. You enjoy the process of breaking a defiant partner into submission. The achievement of taming is your ultimate prize."
    },

    // 5. CNC (非自愿幻想)
    coercion: {
        zh: "【绝对意志的执行者】常规的顺从无法满足你，你渴望的是碾碎抵抗。这种在虚拟框架下的掠夺感，是你确认自身力量与存在感的极致方式。",
        en: "Regular submission isn't enough; you crave crushing resistance. This predatory feeling within a fantasy framework is how you validate your power."
    },
    forced: {
        zh: "【剧本中的无辜者】你并不真的渴望受害，而是渴望在安全的前提下，体验那种“不得不做”的免责感。这种失控的幻象让你能暂时卸下道德和理性的重担。",
        en: "You don't seek harm, but the safety of 'non-consent' scenarios. The illusion of losing control allows you to shed the burden of responsibility and morality."
    },

    // 6. 角色扮演
    protection: {
        zh: "【温柔的港湾】你的支配欲不带有攻击性，而是像大树一样笼罩。你享受对方全身心依赖你的感觉，愿意成为他/她的父兄、导师或守护神。",
        en: "Your dominance isn't aggressive but encompassing. You enjoy their total dependence and wish to be their father figure, mentor, or guardian."
    },
    dependency: {
        zh: "【永远的孩子】成人世界太累了，你只想缩回摇篮里。你渴望一段不对等的关系，在其中你可以毫无顾忌地撒娇、任性，被无条件地包容。",
        en: "The adult world is exhausting. You want to crawl back into the cradle, desiring a relationship where you can be childish and unconditionally accepted."
    },
    pet: {
        zh: "【本能的回归】做人太复杂，做狗很简单。你渴望剥离人类的语言和社会属性，只保留最原始的服从、讨好和动物性的本能。",
        en: "Being human is complex; being a pet is simple. You wish to strip away language and society, keeping only primal obedience and animal instincts."
    },
    fetish: {
        zh: "【材质的信徒】对于大多数人来说，那只是丝袜或皮革；但对你来说，那是神像。你对特定物品有着宗教般的狂热，它们比肉体更让你战栗。",
        en: "To others, it's just silk or leather; to you, it's an idol. You have a religious zeal for specific items that thrills you more than flesh."
    },

    // 7. 开放与禁忌
    exhibitionism: {
        zh: "【聚光灯下的猎物】被注视就是被通过。你渴望成为视线的焦点，哪怕那些视线包含着淫邪或鄙夷。羞耻感是你最好的助燃剂。",
        en: "To be watched is to be validated. You crave being the focal point, even if the gaze holds lust or scorn. Shame is your best fuel."
    },
    voyeurism: {
        zh: "【暗处的观察者】通过窥探他人的私密行为，你获得了一种掌控全局的快感。你不需要参与其中，观看本身就是一种占有。",
        en: "By observing others' intimacy, you gain a sense of omniscience. You don't need to participate; watching is a form of possession."
    },
    group: {
        zh: "【感官的盛宴】一对一的关系对你来说过于单薄。你渴望在多人的呼吸、触碰和视线交织中，体验那种打破社会排他性契约的禁忌快感与感官过载。",
        en: "One-on-one is too thin. You crave the sensory overload of multiple bodies, breaths, and gazes, breaking the social contract of exclusivity."
    },
    ntr: {
        zh: "【禁忌的观察者】这种极度矛盾的心理让你在嫉妒、羞耻和兴奋中反复横跳。心理防线被击溃的瞬间是你快感的巅峰，或是享受那种复杂的背德感。",
        en: "You oscillate between jealousy, shame, and arousal. The moment your psychological defenses crumble is your peak pleasure."
    },

    // 8. 其他
    trans: {
        zh: "【流动的灵魂】固定的性别枷锁限制了你的想象力。通过扮演异性或改变外在特征，你打破了生理的界限，体验着另一种性别的迷离与倒错。",
        en: "Fixed gender roles limit you. By roleplaying the opposite sex, you break biological boundaries and experience the thrill of gender fluidity."
    },
    pure_love: {
        zh: "【灵魂的共鸣者】相比花哨的玩法，你更看重眼神的交汇和灵魂的触碰。所有的技巧都比不上一句深情的“我爱你”。你是这个疯狂世界里的一股清流。",
        en: "You value soul connection over kinks. No technique compares to a deep, loving gaze and genuine emotion. You are a pure soul in a wild world."
    },

    // 默认兜底
    default: {
        zh: "该特质是你欲望拼图中的重要一块，表现出强烈的倾向性。",
        en: "This trait is a significant piece of your desire puzzle."
    }
};

// --- 3. 完整题库 (Questions 1 - 23) ---
// Part 1: 核心定位与基础攻受
const questionsPart1 = [
    {
        id: 1,
        text: { zh: "在性爱或亲密关系中，我通常更喜欢...", en: "In intimacy, I generally prefer to..." },
        options: [
            { text: { zh: "掌控局面，引导对方", en: "Take control and lead" }, scores: { dominance: 5, control: 3 } },
            { text: { zh: "听从指挥，配合对方", en: "Follow instructions and yield" }, scores: { submission: 5, obedience: 3 } },
            { text: { zh: "看情况，两者都喜欢", en: "Switch depending on mood" }, scores: { dominance: 2, submission: 2 } },
            { text: { zh: "完全平等的互动", en: "Completely equal interaction" }, scores: { pure_love: 4 } }
        ]
    },
    {
        id: 2,
        text: { zh: "如果伴侣在没有征求我意见的情况下帮我做了决定，我会...", en: "If my partner makes a decision for me without asking, I feel..." },
        options: [
            { text: { zh: "很生气，感觉被冒犯", en: "Angry and offended" }, scores: { dominance: 3 } },
            { text: { zh: "有种莫名的安心感", en: "A strange sense of relief" }, scores: { submission: 4, dependency: 3 } },
            { text: { zh: "兴奋，想看他还能做什么", en: "Excited to see what else they do" }, scores: { submission: 3, forced: 2 } },
            { text: { zh: "无所谓", en: "Indifferent" }, scores: {} }
        ]
    },
    {
        id: 3,
        text: { zh: "关于“疼痛”，我的真实感受是：", en: "My true feeling about 'pain' is:" },
        options: [
            { text: { zh: "极其厌恶，完全不能接受", en: "Hate it, absolutely unacceptable" }, scores: { pure_love: 2 } },
            { text: { zh: "如果在性奋时，可以接受轻微的", en: "Acceptable if mild and aroused" }, scores: { masochism: 1 } },
            { text: { zh: "疼痛能让我更加兴奋和专注", en: "Pain makes me more aroused and focused" }, scores: { masochism: 5 } },
            { text: { zh: "我喜欢给别人制造疼痛", en: "I like inflicting pain on others" }, scores: { sadism: 5 } }
        ]
    },
    {
        id: 4,
        text: { zh: "当你看到伴侣因为你的行为而脸红、羞耻或求饶时：", en: "When your partner blushes, feels shame, or begs because of you:" },
        options: [
            { text: { zh: "我会心软停下来", en: "I stop out of pity" }, scores: { protection: 3, pure_love: 2 } },
            { text: { zh: "我会感到强烈的满足和兴奋", en: "I feel intense satisfaction and arousal" }, scores: { sadism: 4, humiliation_dom: 4 } },
            { text: { zh: "我想更进一步欺负他/她", en: "I want to bully them even more" }, scores: { sadism: 5, dominance: 3 } },
            { text: { zh: "我不喜欢这种情况", en: "I don't like this situation" }, scores: {} }
        ]
    },
    {
        id: 5,
        text: { zh: "如果被用绳索、手铐等工具限制住行动自由：", en: "If physically restrained by ropes or handcuffs:" },
        options: [
            { text: { zh: "我会感到恐慌", en: "I would panic" }, scores: { pure_love: 1 } },
            { text: { zh: "这让我很有安全感，因为我不必负责", en: "I feel safe because I don't need to be responsible" }, scores: { submission: 3, forced: 4 } },
            { text: { zh: "我更想成为那个拿绳子的人", en: "I prefer to be the one holding the ropes" }, scores: { dominance: 3, control: 4 } },
            { text: { zh: "我喜欢这种无助的挣扎感", en: "I enjoy the helpless struggle" }, scores: { masochism: 3, submission: 4 } }
        ]
    },
    {
        id: 6,
        text: { zh: "对于“故意违抗命令”这种行为（Brat）：", en: "Regarding 'deliberately disobeying orders' (Bratting):" },
        options: [
            { text: { zh: "我喜欢故意调皮惹伴侣生气", en: "I love being naughty to provoke my partner" }, scores: { brat: 5 } },
            { text: { zh: "这让我很烦躁，不听话就该受罚", en: "It annoys me; disobedience requires punishment" }, scores: { taming: 5, dominance: 2 } },
            { text: { zh: "如果伴侣能因此惩罚我就更好了", en: "Even better if my partner punishes me for it" }, scores: { brat: 4, masochism: 2 } },
            { text: { zh: "无论是做还是看都不喜欢", en: "Dislike it completely" }, scores: { obedience: 2 } }
        ]
    },
    {
        id: 7,
        text: { zh: "关于羞辱性的词汇（如母狗、废物、肉便器等）：", en: "Regarding degrading words (e.g., bitch, slut, toy):" },
        options: [
            { text: { zh: "绝对禁止，这是不尊重", en: "Absolutely forbidden, it's disrespectful" }, scores: { pure_love: 3 } },
            { text: { zh: "听起来很带感，让我觉得自己很淫荡", en: "Turns me on, makes me feel slutty" }, scores: { humiliation_sub: 5 } },
            { text: { zh: "我喜欢这样称呼伴侣，看他们堕落", en: "I like calling my partner these to see them fall" }, scores: { humiliation_dom: 5 } },
            { text: { zh: "仅限特定语境，不能太难听", en: "Only in specific contexts, not too harsh" }, scores: { humiliation_sub: 1, humiliation_dom: 1 } }
        ]
    },
    {
        id: 8,
        text: { zh: "如果伴侣像对待小孩子一样对待我（甚至使用尿布、奶嘴）：", en: "If my partner treats me like a toddler (diapers, pacifiers):" },
        options: [
            { text: { zh: "完全无法理解", en: "Completely incomprehensible" }, scores: {} },
            { text: { zh: "觉得很温馨，想要被照顾", en: "Feels warm, I want to be taken care of" }, scores: { dependency: 5, submission: 2 } },
            { text: { zh: "我想成为那个照顾“宝宝”的人", en: "I want to be the Caregiver" }, scores: { protection: 5, dominance: 2 } },
            { text: { zh: "有点恶心", en: "A bit disgusting" }, scores: { pure_love: 1 } }
        ]
    },
    {
        id: 9,
        text: { zh: "看到伴侣像狗一样戴着项圈并在地上爬行：", en: "Seeing my partner wearing a collar and crawling like a dog:" },
        options: [
            { text: { zh: "这太怪了", en: "That's too weird" }, scores: {} },
            { text: { zh: "我会想牵起绳子，命令它", en: "I'd want to hold the leash and command it" }, scores: { pet: 3, dominance: 3, control: 2 } },
            { text: { zh: "我更想成为那个戴项圈的人", en: "I'd rather be the one wearing the collar" }, scores: { pet: 5, submission: 3 } },
            { text: { zh: "这是一种美妙的驯服艺术", en: "It's a beautiful art of taming" }, scores: { taming: 4, pet: 2 } }
        ]
    },
    {
        id: 10,
        text: { zh: "对于“公开露出”或在有风险的地方亲热：", en: "Regarding public exposure or risky sex:" },
        options: [
            { text: { zh: "太疯狂了，我会被吓死", en: "Too crazy, I'd be terrified" }, scores: { pure_love: 2 } },
            { text: { zh: "这种可能被发现的紧张感让我极度兴奋", en: "The fear of being caught makes me incredibly aroused" }, scores: { exhibitionism: 5 } },
            { text: { zh: "我喜欢看伴侣露出给别人看", en: "I like watching my partner expose themselves" }, scores: { ntr: 2, voyeurism: 3, exhibitionism: 2 } },
            { text: { zh: "只要没人真的看见就可以接受", en: "Acceptable if no one actually sees" }, scores: { exhibitionism: 2 } }
        ]
    },
    {
        id: 11,
        text: { zh: "多人运动（3P、群交）对你的吸引力：", en: "Attraction to group sex (threesomes, orgies):" },
        options: [
            { text: { zh: "毫无兴趣，我只想要一对一", en: "No interest, I only want one-on-one" }, scores: { pure_love: 5 } },
            { text: { zh: "如果是两男一女，我会感兴趣", en: "Interested if it's MMF" }, scores: { group: 4, ntr: 1 } },
            { text: { zh: "如果是两女一男，我会感兴趣", en: "Interested if it's FFM" }, scores: { group: 4 } },
            { text: { zh: "人越多越好，我喜欢混乱的快感", en: "The more the merrier, I love the chaos" }, scores: { group: 5, voyeurism: 2 } }
        ]
    },
    {
        id: 12,
        text: { zh: "如果你的伴侣当你面和别人发生关系（NTR）：", en: "If your partner has sex with someone else in front of you (NTR):" },
        options: [
            { text: { zh: "绝对分手，无法容忍背叛", en: "Break up immediately, zero tolerance" }, scores: { pure_love: 5 } },
            { text: { zh: "虽然痛苦，但心里会产生一种扭曲的兴奋", en: "Painful, but it triggers a twisted arousal" }, scores: { ntr: 5, masochism: 2 } },
            { text: { zh: "我喜欢看他/她被别人征服的样子", en: "I like seeing them conquered by others" }, scores: { ntr: 4, voyeurism: 4 } },
            { text: { zh: "只要我也能参与就没问题", en: "Fine as long as I can join in" }, scores: { group: 4 } }
        ]
    },
    {
        id: 13,
        text: { zh: "对于特定的物品（如丝袜、高跟鞋、皮靴、乳胶衣）：", en: "Regarding specific items (stockings, heels, boots, latex):" },
        options: [
            { text: { zh: "这些只是普通衣物", en: "Just normal clothes" }, scores: {} },
            { text: { zh: "我对某些材质/物品有强烈的迷恋", en: "I have a strong obsession with certain materials" }, scores: { fetish: 5 } },
            { text: { zh: "我喜欢舔舐或崇拜这些物品", en: "I like to lick or worship these items" }, scores: { fetish: 4, submission: 2 } },
            { text: { zh: "一定要穿在伴侣身上才带感", en: "Must be worn by my partner to work" }, scores: { fetish: 3 } }
        ]
    },
    {
        id: 14,
        text: { zh: "如果角色扮演医生/病人，老师/学生，父亲/女儿：", en: "Roleplay: Doctor/Patient, Teacher/Student, Father/Daughter:" },
        options: [
            { text: { zh: "觉得很尴尬，会笑场", en: "Awkward, I'd laugh" }, scores: { pure_love: 2 } },
            { text: { zh: "这能帮助我快速进入状态", en: "Helps me get into the mood quickly" }, scores: { coercion: 1, forced: 1 } },
            { text: { zh: "我喜欢拥有权力的那个角色", en: "I prefer the role with power" }, scores: { dominance: 3 } },
            { text: { zh: "我喜欢处于弱势/无知的那个角色", en: "I prefer the vulnerable/ignorant role" }, scores: { submission: 3, dependency: 2 } }
        ]
    },
    {
        id: 15,
        text: { zh: "关于“强制”或“强奸幻想”（CNC）：", en: "Regarding 'Consensual Non-Consent' (Rape fantasy):" },
        options: [
            { text: { zh: "即使是演戏也不能接受", en: "Unacceptable even as an act" }, scores: { pure_love: 3 } },
            { text: { zh: "我幻想被强行压制且无法反抗", en: "I fantasize about being forced and unable to resist" }, scores: { forced: 5, submission: 3 } },
            { text: { zh: "我幻想能够无视对方意愿进行侵犯", en: "I fantasize about taking what I want regardless of consent" }, scores: { coercion: 5, dominance: 3 } },
            { text: { zh: "这只是增加情趣的一种剧本", en: "Just a script to spice things up" }, scores: { forced: 2, coercion: 2 } }
        ]
    },
    {
        id: 16,
        text: { zh: "你是否曾经对同性产生过性幻想或冲动？", en: "Have you ever had sexual fantasies about the same sex?" },
        options: [
            { text: { zh: "从来没有，我是绝对直的", en: "Never, I'm strictly straight" }, scores: { pure_love: 1 } },
            { text: { zh: "偶尔有过，但不强烈", en: "Occasionally, but not strong" }, scores: { trans: 2 } }, // 这里用trans指代广义的酷儿/流动性
            { text: { zh: "是的，我对同性也很有感觉", en: "Yes, I'm attracted to the same sex too" }, scores: { trans: 4 } }, // 简化映射
            { text: { zh: "在特定玩法下（如被强迫）会想尝试", en: "Only in specific kinks (like being forced)" }, scores: { trans: 2, forced: 2 } }
        ]
    },
    {
        id: 17,
        text: { zh: "如果伴侣要求我在公共厕所或更衣室做那件事：", en: "If my partner asks for sex in a public restroom or fitting room:" },
        options: [
            { text: { zh: "太脏了，拒绝", en: "Too dirty, refuse" }, scores: {} },
            { text: { zh: "如果不被抓到的话，很刺激", en: "Exciting if we don't get caught" }, scores: { exhibitionism: 3, brat: 2 } },
            { text: { zh: "我就是希望能被人听到声音", en: "I hope someone hears us" }, scores: { exhibitionism: 5 } },
            { text: { zh: "为了满足伴侣我会做", en: "I'd do it to please my partner" }, scores: { submission: 2, obedience: 3 } }
        ]
    },
    {
        id: 18,
        text: { zh: "对于窒息（掐脖子）或控制呼吸：", en: "Regarding choking or breath play:" },
        options: [
            { text: { zh: "太危险，绝对不行", en: "Too dangerous, absolutely not" }, scores: { protection: 2 } },
            { text: { zh: "轻微的窒息感让我更有感觉", en: "Mild choking turns me on" }, scores: { masochism: 3 } },
            { text: { zh: "我喜欢掌控别人生死的这种感觉", en: "I like holding someone's life in my hands" }, scores: { sadism: 4, control: 4 } },
            { text: { zh: "那种缺氧的濒死感让我着迷", en: "The hypoxia and near-death feeling fascinates me" }, scores: { masochism: 5 } }
        ]
    },
    {
        id: 19,
        text: { zh: "在性行为结束后（Aftercare）：", en: "After sex (Aftercare):" },
        options: [
            { text: { zh: "我需要拥抱、抚摸和温存", en: "I need cuddling and reassurance" }, scores: { pure_love: 3, submission: 2 } },
            { text: { zh: "我喜欢照顾对方，帮他清理", en: "I like taking care of them and cleaning up" }, scores: { protection: 4, dominance: 2 } },
            { text: { zh: "各做各的，不需要特别温存", en: "Just move on, no special care needed" }, scores: { sadism: 1 } },
            { text: { zh: "我甚至希望这种被使用的感觉持续下去", en: "I want the feeling of being 'used' to last" }, scores: { humiliation_sub: 3, objectification: 2 } } // objectification 映射到 humiliation_sub
        ]
    },
    {
        id: 20,
        text: { zh: "关于“任务”或“调教”（比如规定每天必须要做的羞耻事）：", en: "Regarding 'Tasks' or 'Training' (daily shameful acts):" },
        options: [
            { text: { zh: "觉得很麻烦", en: "Sounds troublesome" }, scores: {} },
            { text: { zh: "完成任务让我觉得很有成就感", en: "Completing tasks gives me accomplishment" }, scores: { obedience: 5, submission: 3 } },
            { text: { zh: "我喜欢给别人布置这种任务", en: "I like assigning such tasks" }, scores: { control: 5, dominance: 3 } },
            { text: { zh: "我不喜欢做，但我喜欢那种不得不做的强迫感", en: "I hate doing it, but love being forced to" }, scores: { forced: 3, masochism: 2 } }
        ]
    },
    {
        id: 21,
        text: { zh: "如果是跨越性别角色的装扮（比如男穿女装，或反串）：", en: "Cross-dressing or gender-bending roles:" },
        options: [
            { text: { zh: "没兴趣", en: "No interest" }, scores: {} },
            { text: { zh: "我有变装癖，或者想看伴侣变装", en: "I enjoy cross-dressing or seeing it" }, scores: { trans: 5, fetish: 2 } },
            { text: { zh: "如果这能羞辱到对方，我喜欢", en: "I like it if it humiliates them" }, scores: { humiliation_dom: 3 } },
            { text: { zh: "如果被迫穿上羞耻的衣服，我会兴奋", en: "Being forced into shameful clothes turns me on" }, scores: { humiliation_sub: 3, forced: 2 } }
        ]
    },
    {
        id: 22,
        text: { zh: "对于“放置”（被束缚住然后被无视）：", en: "Regarding 'Denial/Neglect' (Being tied up and ignored):" },
        options: [
            { text: { zh: "会觉得无聊或生气", en: "Boring or annoying" }, scores: {} },
            { text: { zh: "那种被冷落的焦灼感让我欲罢不能", en: "The anxiety of being ignored is addictive" }, scores: { masochism: 3, submission: 3 } },
            { text: { zh: "我喜欢欣赏对方求而不得的样子", en: "I enjoy watching them beg for attention" }, scores: { sadism: 3, control: 4 } },
            { text: { zh: "只要最后能得到满足就好", en: "Fine if I get satisfied eventually" }, scores: { obedience: 2 } }
        ]
    },
    {
        id: 23,
        text: { zh: "如果你的伴侣是“性冷淡”或者主要追求柏拉图：", en: "If your partner is asexual or wants Platonic love:" },
        options: [
            { text: { zh: "可以接受，爱比性重要", en: "Acceptable, love > sex" }, scores: { pure_love: 5 } },
            { text: { zh: "完全不行，我需要强烈的肉体刺激", en: "Impossible, I need intense physical stimulation" }, scores: { masochism: 2, sadism: 2 } }, // 侧面反映重口
            { text: { zh: "我会试图开发/引诱他堕落", en: "I'd try to corrupt/seduce them" }, scores: { dominance: 3, taming: 3 } },
            { text: { zh: "这会让我很痛苦", en: "That would be painful for me" }, scores: {} }
        ]
    },
];
// (End of Part 1)

// --- Part 2: 进阶玩法与心理博弈 (Questions 24 - 50) ---
const questionsPart2 = [
    {
        id: 24,
        text: { zh: "关于“打屁股”（Spanking）或拍打身体：", en: "Regarding Spanking or impact play:" },
        options: [
            { text: { zh: "不喜欢暴力", en: "Dislike violence" }, scores: { pure_love: 2 } },
            { text: { zh: "作为前戏，轻微的拍打很有情趣", en: "Light spanking is fun foreplay" }, scores: { sadism: 1, masochism: 1 } },
            { text: { zh: "我喜欢屁股被打红、留印的感觉", en: "I love marks and redness on my butt" }, scores: { masochism: 4, submission: 2 } },
            { text: { zh: "我喜欢那种掌掴皮肉的声音和手感", en: "I love the sound and feel of striking skin" }, scores: { sadism: 4, dominance: 2 } }
        ]
    },
    {
        id: 25,
        text: { zh: "如果被要求看着镜子做爱，并评价自己的身体：", en: "Sex in front of a mirror, commenting on your body:" },
        options: [
            { text: { zh: "太羞耻了，做不到", en: "Too shameful, can't do it" }, scores: { submission: 1 } },
            { text: { zh: "我喜欢看着自己被使用的样子", en: "I like watching myself being used" }, scores: { exhibitionism: 3, humiliation_sub: 2 } },
            { text: { zh: "我喜欢强迫伴侣看着镜子里淫荡的自己", en: "I like forcing them to look at their slutty reflection" }, scores: { humiliation_dom: 4, control: 3 } },
            { text: { zh: "无所谓", en: "Indifferent" }, scores: {} }
        ]
    },
    {
        id: 26,
        text: { zh: "对于“口球”或让伴侣无法说话：", en: "Regarding gags or silencing your partner:" },
        options: [
            { text: { zh: "不仅是为了安静，更是剥夺语言能力的控制感", en: "It's about the control of stripping speech" }, scores: { control: 4, objectification: 3 } },
            { text: { zh: "戴上口球流口水的样子很性感", en: "Drooling with a gag is sexy" }, scores: { fetish: 3, humiliation_dom: 2 } },
            { text: { zh: "我喜欢那种想说话却只能呜呜叫的无助感", en: "I love the helplessness of only being able to mumble" }, scores: { submission: 4, forced: 2 } },
            { text: { zh: "不喜欢嘴巴被堵住", en: "Don't like my mouth blocked" }, scores: {} }
        ]
    },
    {
        id: 27,
        text: { zh: "如果你的伴侣想带另一个人加入（3P），你会选：", en: "If your partner wants a threesome, you'd choose:" },
        options: [
            { text: { zh: "完全拒绝", en: "Refuse completely" }, scores: { pure_love: 4 } },
            { text: { zh: "只要伴侣开心，我可以忍受", en: "I'd tolerate it for my partner" }, scores: { submission: 3, ntr: 2 } },
            { text: { zh: "我很兴奋，想看伴侣和其他人互动", en: "Excited to see them with others" }, scores: { group: 5, voyeurism: 4 } },
            { text: { zh: "我想成为焦点，让他们都服侍我", en: "I want to be the center, serviced by both" }, scores: { group: 4, dominance: 3 } }
        ]
    },
    {
        id: 28,
        text: { zh: "对于涉及排泄物（黄金/圣水）或弄脏身体的玩法：", en: "Regarding watersports or messy play:" },
        options: [
            { text: { zh: "绝对不行，这是卫生问题", en: "Absolutely not, hygiene issue" }, scores: {} },
            { text: { zh: "如果是伴侣的，我可以接受甚至喜欢", en: "Acceptable or liked if it's my partner's" }, scores: { fetish: 5, humiliation_sub: 4 } },
            { text: { zh: "看着伴侣被弄脏、狼狈的样子让我兴奋", en: "Seeing them dirty and messy turns me on" }, scores: { humiliation_dom: 5, sadism: 2 } },
            { text: { zh: "仅限轻微的（如吐口水）", en: "Only mild things (like spitting)" }, scores: { humiliation_dom: 2, humiliation_sub: 2 } }
        ]
    },
    {
        id: 29,
        text: { zh: "关于“睡眠性爱”或趁伴侣意识不清时...", en: "Somnophilia or sex while partner is unconscious..." },
        options: [
            { text: { zh: "必须清醒且同意", en: "Must be awake and consenting" }, scores: { pure_love: 3 } },
            { text: { zh: "幻想在睡梦中被“偷袭”弄醒", en: "Fantasy of being woken up by 'assault'" }, scores: { forced: 4, masochism: 2 } },
            { text: { zh: "喜欢把玩完全没有抵抗力的“玩偶”", en: "Like playing with a defenseless 'doll'" }, scores: { coercion: 5, objectification: 4 } },
            { text: { zh: "这很有安全感", en: "Feels safe" }, scores: { submission: 1 } }
        ]
    },
    {
        id: 30,
        text: { zh: "高潮控制（寸止、贞操锁）：", en: "Orgasm control (Edging, Chastity cages):" },
        options: [
            { text: { zh: "我想要释放，不喜欢被憋着", en: "I want release, don't like denial" }, scores: {} },
            { text: { zh: "求而不得的焦躁感最让我疯狂", en: "The frustration of denial drives me crazy" }, scores: { masochism: 4, submission: 4 } },
            { text: { zh: "决定伴侣何时能射/高潮是最大的权力", en: "Deciding when they cum is ultimate power" }, scores: { control: 5, dominance: 3 } },
            { text: { zh: "喜欢给伴侣戴锁，钥匙归我", en: "Like locking them up, I keep the key" }, scores: { control: 5, sadism: 2 } }
        ]
    },
    {
        id: 31,
        text: { zh: "关于足恋（舔脚、踩踏）：", en: "Foot fetish (Worship, Trampling):" },
        options: [
            { text: { zh: "无感", en: "No feeling" }, scores: {} },
            { text: { zh: "我愿意匍匐在伴侣脚下亲吻/被踩", en: "I'd crawl and kiss/be stepped on" }, scores: { fetish: 5, submission: 4 } },
            { text: { zh: "喜欢让伴侣像狗一样舔我的脚", en: "Like having them lick my feet like a dog" }, scores: { humiliation_dom: 4, dominance: 3 } },
            { text: { zh: "不仅是脚，袜子鞋子我也喜欢", en: "Not just feet, socks and shoes too" }, scores: { fetish: 5 } }
        ]
    },
    {
        id: 32,
        text: { zh: "滴蜡或电击等刺激性玩法：", en: "Wax play or Electro stimulation:" },
        options: [
            { text: { zh: "怕疼，不要", en: "Scared of pain, no" }, scores: {} },
            { text: { zh: "那种灼烧和刺痛让我神经紧绷，非常爽", en: "The burn and sting is intense and pleasurable" }, scores: { masochism: 5 } },
            { text: { zh: "看着肌肉因为电击而不由自主地抽搐很有趣", en: "Watching muscles twitch from shock is fun" }, scores: { sadism: 4, objectification: 3 } },
            { text: { zh: "视觉效果大于痛感，可以尝试", en: "Visuals over pain, willing to try" }, scores: { masochism: 2, sadism: 2 } }
        ]
    },
    {
        id: 33,
        text: { zh: "在性行为中拍照或录像：", en: "Recording photos or videos during sex:" },
        options: [
            { text: { zh: "坚决不拍，怕泄露", en: "Never, fear leaks" }, scores: { pure_love: 2 } },
            { text: { zh: "喜欢拍下来自己事后回味", en: "Like recording for personal playback" }, scores: { voyeurism: 3, narcissism: 2 } }, // narcissism 归类到 exhibitionism
            { text: { zh: "如果是伴侣想拍，我不介意当主角", en: "If they want to, I don't mind starring" }, scores: { exhibitionism: 3, submission: 2 } },
            { text: { zh: "不仅要拍，还想发给别人看/传上网", en: "Record and share online/with others" }, scores: { exhibitionism: 5, ntr: 2 } }
        ]
    },
    {
        id: 34,
        text: { zh: "关于“乱伦”角色的扮演（继父女、兄妹等）：", en: "Incest roleplay (Step-dad/daughter, siblings):" },
        options: [
            { text: { zh: "道德上无法接受", en: "Morally unacceptable" }, scores: { pure_love: 3 } },
            { text: { zh: "这种禁忌感让性爱更刺激", en: "The taboo makes it exciting" }, scores: { indulgence: 4 } },
            { text: { zh: "喜欢那种长辈对晚辈的威权压制", en: "Like the authority over the younger" }, scores: { dominance: 3, coercion: 2 } },
            { text: { zh: "喜欢那种“不可以但是不得不做”的背德感", en: "Like the 'forbidden but forced' feeling" }, scores: { submission: 3, forced: 2 } }
        ]
    },
    {
        id: 35,
        text: { zh: "如果伴侣在身体上留下永久性痕迹（纹身、穿环）作为归属标记：", en: "Permanent marks (Tattoos, Piercings) as claim of ownership:" },
        options: [
            { text: { zh: "身体是自己的，不接受", en: "My body is mine, no" }, scores: {} },
            { text: { zh: "这是极致的浪漫和忠诚", en: "Ultimate romance and loyalty" }, scores: { submission: 5, dependency: 4 } },
            { text: { zh: "我想给伴侣打上我的烙印，宣示主权", en: "I want to brand them as mine" }, scores: { control: 5, possession: 5 } }, // possession 归到 control
            { text: { zh: "如果不喜欢了会很麻烦", en: "Too troublesome if we break up" }, scores: { pure_love: 1 } }
        ]
    },
    {
        id: 36,
        text: { zh: "医疗玩法（灌肠、导尿、检查）：", en: "Medical play (Enema, Sounding, Exam):" },
        options: [
            { text: { zh: "太可怕了", en: "Too scary" }, scores: {} },
            { text: { zh: "这种尴尬和侵入感让我兴奋", en: "The embarrassment and intrusion turns me on" }, scores: { masochism: 3, humiliation_sub: 3 } },
            { text: { zh: "这种冰冷的、非人的对待方式很特别", en: "The cold, clinical treatment is unique" }, scores: { objectification: 4 } },
            { text: { zh: "我喜欢扮演冷酷的医生摆布病人", en: "I like being the cold doctor handling the patient" }, scores: { sadism: 3, roleplay: 3 } }
        ]
    },
    {
        id: 37,
        text: { zh: "如果伴侣用金钱来羞辱或控制你（Findom）：", en: "Financial Domination (Findom):" },
        options: [
            { text: { zh: "钱必须要算清楚，不能混淆", en: "Keep finances separate" }, scores: {} },
            { text: { zh: "给他/她花钱让我有快感，即使被当作提款机", en: "Spending on them feels good, even as an ATM" }, scores: { submission: 4, humiliation_sub: 3 } },
            { text: { zh: "我喜欢榨干伴侣的钱包，看他为您服务", en: "I like draining their wallet" }, scores: { dominance: 4, exploitation: 4 } }, // exploitation 归到 sadism/dominance
            { text: { zh: "这是一种在这个社会中最高级的控制形式", en: "Highest form of control in society" }, scores: { control: 4 } }
        ]
    },
    {
        id: 38,
        text: { zh: "关于催眠或精神控制（Mind Break）：", en: "Hypnosis or Mind Break:" },
        options: [
            { text: { zh: "不相信也不喜欢", en: "Don't believe or like it" }, scores: {} },
            { text: { zh: "幻想自己被洗脑，变成只会性交的傻瓜", en: "Fantasy of being brainwashed into a sex bimbo" }, scores: { forced: 5, humiliation_sub: 4 } },
            { text: { zh: "想把伴侣改造成我理想的专属玩具", en: "Want to mold them into my perfect toy" }, scores: { control: 5, objectification: 5 } },
            { text: { zh: "稍微玩玩角色设定可以", en: "Light roleplay is fine" }, scores: { pure_love: 1 } }
        ]
    },
    {
        id: 39,
        text: { zh: "把自己当作家具或物品（Human Furniture）：", en: "Being used as Human Furniture:" },
        options: [
            { text: { zh: "这是对人格的侮辱", en: "Insult to human dignity" }, scores: { pure_love: 3 } },
            { text: { zh: "我想变成椅子/脚踏，只要能被主人使用", en: "I want to be a chair/footrest, just to be used" }, scores: { objectification: 5, submission: 4 } },
            { text: { zh: "如果你甚至不是“人”，我就不需要对你负责", en: "If you aren't human, I don't need to care" }, scores: { sadism: 3, objectification: 4 } },
            { text: { zh: "偶尔试一下这种极端的安静", en: "Try this extreme silence occasionally" }, scores: { bondage: 2 } }
        ]
    },
    {
        id: 40,
        text: { zh: "对于“绿帽癖”（Cuckold）的深层感受：", en: "Deep feelings about Cuckolding:" },
        options: [
            { text: { zh: "绝对不行", en: "No way" }, scores: {} },
            { text: { zh: "我觉得自己不够好，所以伴侣找别人是理所当然的", en: "I'm not good enough, they deserve others" }, scores: { ntr: 5, humiliation_sub: 4 } },
            { text: { zh: "我要那种“全天下都知道我被绿了”的羞耻感", en: "I want the shame of everyone knowing" }, scores: { ntr: 5, humiliation_sub: 5 } },
            { text: { zh: "我喜欢给别人戴绿帽（黄毛属性）", en: "I like cucking others (Bull)" }, scores: { dominance: 4, ntr: 3 } } // 此处ntr是指作为施加者
        ]
    },
    {
        id: 41,
        text: { zh: "身体改造（如扩肛、穿刺 play）：", en: "Body mod play (Stretching, Needles):" },
        options: [
            { text: { zh: "太痛了，接受不了", en: "Too painful" }, scores: {} },
            { text: { zh: "为了容纳主人更大的欲望，我愿意开发自己", en: "I'll stretch to take more of my owner" }, scores: { submission: 4, masochism: 3 } },
            { text: { zh: "看着伴侣被开发到极限", en: "Watching them stretched to the limit" }, scores: { sadism: 4, curiosity: 3 } },
            { text: { zh: "仅限于在安全范围内尝试", en: "Only within safe limits" }, scores: { masochism: 1 } }
        ]
    },
    {
        id: 42,
        text: { zh: "关于“兽化”或 Furry（穿兽装、发出动物叫声）：", en: "Furry or Animal play:" },
        options: [
            { text: { zh: "不感兴趣", en: "Not interested" }, scores: {} },
            { text: { zh: "我想成为一只没有任何社会压力的野兽/宠物", en: "Want to be a beast/pet with no social pressure" }, scores: { pet: 5, dependency: 3 } },
            { text: { zh: "毛茸茸的触感让我兴奋", en: "The furry texture turns me on" }, scores: { fetish: 3 } },
            { text: { zh: "单纯觉得可爱", en: "Just think it's cute" }, scores: { pet: 1 } }
        ]
    },
    {
        id: 43,
        text: { zh: "如果是“换妻/换夫”游戏（Swinging）：", en: "Swinging/Partner swapping:" },
        options: [
            { text: { zh: "无法接受", en: "Unacceptable" }, scores: { pure_love: 4 } },
            { text: { zh: "这是社交和性的完美结合", en: "Perfect mix of social and sex" }, scores: { group: 4, exhibitionism: 3 } },
            { text: { zh: "我只喜欢看我的伴侣被别人搞", en: "I only like watching my partner taken" }, scores: { ntr: 4, voyeurism: 3 } },
            { text: { zh: "为了寻求新鲜感可以尝试", en: "Okay for novelty" }, scores: { indulgence: 3 } }
        ]
    },
    {
        id: 44,
        text: { zh: "对于“无套”或受孕/播种幻想（Breeding）：", en: "Breeding fantasy (Raw/Creampie):" },
        options: [
            { text: { zh: "必须戴套，安全第一", en: "Safety first, always condoms" }, scores: { pure_love: 1 } },
            { text: { zh: "被射在里面的感觉让我觉得自己真正属于对方", en: "Being filled makes me feel I truly belong" }, scores: { submission: 4, dependency: 3 } },
            { text: { zh: "标记领地，弄脏内部，这让我极度兴奋", en: "Marking territory, making a mess inside turns me on" }, scores: { dominance: 4, ownership: 4 } }, // ownership->control
            { text: { zh: "这就是生物本能的快乐", en: "Pure primal pleasure" }, scores: { indulgence: 2 } }
        ]
    },
    {
        id: 45,
        text: { zh: "如果伴侣要求你穿胶衣（Latex）把自己完全包裹起来：", en: "Full body Latex enclosure:" },
        options: [
            { text: { zh: "太闷了，会透不过气", en: "Too stuffy, can't breathe" }, scores: {} },
            { text: { zh: "那种被紧紧包裹、与世隔绝的感觉很棒", en: "Love the tight, isolated feeling" }, scores: { fetish: 5, bondage: 3 } },
            { text: { zh: "看起来像个毫无感情的物品，很性感", en: "Looks like a soulless object, sexy" }, scores: { objectification: 4, fetish: 4 } },
            { text: { zh: "我不穿，但我喜欢看伴侣穿", en: "I won't wear, but like seeing it" }, scores: { fetish: 4 } }
        ]
    },
    {
        id: 46,
        text: { zh: "在野外、车震或半公开场合：", en: "Outdoor, car sex, semi-public:" },
        options: [
            { text: { zh: "不仅是为了刺激，更是为了打破文明的规则", en: "Not just thrills, but breaking civilized rules" }, scores: { brat: 3, exhibitionism: 4 } },
            { text: { zh: "非常抗拒", en: "Resist strongly" }, scores: { pure_love: 2 } },
            { text: { zh: "如果有人路过看了一眼，我会高潮", en: "If a passerby glances, I'd cum" }, scores: { exhibitionism: 5, voyeurism: 2 } },
            { text: { zh: "只要隐蔽性好就行", en: "As long as it's hidden" }, scores: { exhibitionism: 2 } }
        ]
    },
    {
        id: 47,
        text: { zh: "对于“冷暴力”或被当空气（Psychological Neglect）：", en: "Cold shoulder / Neglect play:" },
        options: [
            { text: { zh: "这会伤害感情", en: "Hurts the relationship" }, scores: { pure_love: 2 } },
            { text: { zh: "无论我怎么讨好都被无视，这让我更加渴望", en: "Being ignored despite begging makes me want more" }, scores: { masochism: 3, submission: 4 } },
            { text: { zh: "看着他/她为了博我一笑而卑微的样子", en: "Watching them beg for a smile" }, scores: { sadism: 3, dominance: 3 } },
            { text: { zh: "不喜欢这种心理游戏", en: "Dislike mind games" }, scores: {} }
        ]
    },
    {
        id: 48,
        text: { zh: "关于“贞操带”长期佩戴：", en: "Long-term Chastity wear:" },
        options: [
            { text: { zh: "生活不方便，拒绝", en: "Inconvenient, no" }, scores: {} },
            { text: { zh: "这是一种时刻提醒我归属权的仪式", en: "A ritual reminding me of ownership" }, scores: { submission: 5, fetish: 2 } },
            { text: { zh: "我喜欢掌握伴侣的生理钥匙", en: "I like holding their biological key" }, scores: { control: 5 } },
            { text: { zh: "只有惩罚的时候戴", en: "Only for punishment" }, scores: { discipline: 3 } }
        ]
    },
    {
        id: 49,
        text: { zh: "如果让你称呼伴侣为“主人/爸爸/女王”：", en: "Calling partner Master/Daddy/Queen:" },
        options: [
            { text: { zh: "太中二了，叫不出口", en: "Too cringe, can't say it" }, scores: { pure_love: 2 } },
            { text: { zh: "这个称呼让我瞬间进入从属状态", en: "Instantly puts me in submission mode" }, scores: { submission: 5, roleplay: 3 } },
            { text: { zh: "我一定要听别人这么叫我才舒服", en: "I need to hear it to feel good" }, scores: { dominance: 5 } },
            { text: { zh: "床上叫叫无所谓", en: "Okay in bed" }, scores: { roleplay: 1 } }
        ]
    },
    {
        id: 50,
        text: { zh: "对于“完全无法反抗”的捆绑（木乃伊式）：", en: "Total immobilization (Mummification):" },
        options: [
            { text: { zh: "幽闭恐惧症，不行", en: "Claustrophobic, no" }, scores: {} },
            { text: { zh: "彻底的无助感也是彻底的放松", en: "Total helplessness is total relaxation" }, scores: { submission: 4, bondage: 5 } }, // bondage->fetish/forced
            { text: { zh: "把人打包成包裹很有趣", en: "Packing someone like a parcel is fun" }, scores: { objectification: 4, control: 3 } },
            { text: { zh: "不喜欢动不了", en: "Dislike being stuck" }, scores: {} }
        ]
    }
];
// (End of Part 2)

// --- Part 3: 终极幻想与核心逻辑 (Questions 51 - 69 & Logic) ---

const questionsPart3 = [
    {
        id: 51,
        text: { zh: "如果伴侣要求你戴上眼罩，剥夺视觉：", en: "Blindfolded / Sensory deprivation:" },
        options: [
            { text: { zh: "感到不安", en: "Feel uneasy" }, scores: {} },
            { text: { zh: "未知的触碰让我感官放大，很享受", en: "Unknown touches amplify senses, I enjoy it" }, scores: { submission: 3, masochism: 2 } },
            { text: { zh: "我喜欢剥夺对方的感官，让他惊慌", en: "I like depriving their senses to panic them" }, scores: { control: 4, sadism: 2 } },
            { text: { zh: "只要不是太久就行", en: "Okay if not too long" }, scores: { pure_love: 1 } }
        ]
    },
    {
        id: 52,
        text: { zh: "关于“体罚”或“家法”（Ritual discipline）：", en: "Ritual discipline / Punishment:" },
        options: [
            { text: { zh: "反对任何形式的体罚", en: "Against all corporal punishment" }, scores: { pure_love: 2 } },
            { text: { zh: "做错事就该受罚，这让我有赎罪的快感", en: "Punishment for wrongs gives me redemption" }, scores: { obedience: 5, masochism: 2 } },
            { text: { zh: "建立奖惩制度让我觉得关系稳固", en: "Reward/Punishment systems make it stable" }, scores: { control: 5, dominance: 3 } },
            { text: { zh: "仅限情趣扮演", en: "Roleplay only" }, scores: { roleplay: 2 } }
        ]
    },
    {
        id: 53,
        text: { zh: "如果伴侣想要把你“借”给朋友玩一次：", en: "Lending you to a friend for a night:" },
        options: [
            { text: { zh: "这绝对是底线，不行", en: "Absolute hard limit, no" }, scores: { pure_love: 5 } },
            { text: { zh: "如果伴侣在旁边看着，我可以", en: "If my partner watches, I can" }, scores: { ntr: 3, group: 3 } },
            { text: { zh: "只要是主人的命令，我就是物品，没有拒绝权", en: "I am an object, I obey the owner" }, scores: { objectification: 5, submission: 5 } },
            { text: { zh: "我喜欢这种把自己分享出去的大度感", en: "I like the generosity of sharing" }, scores: { group: 4, ntr: 4 } }
        ]
    },
    {
        id: 54,
        text: { zh: "对于“远程控制”玩具（跳蛋等）：", en: "Remote controlled toys:" },
        options: [
            { text: { zh: "在公共场合被控制，随时可能高潮", en: "Controlled in public, climax risk anytime" }, scores: { exhibitionism: 4, submission: 3 } },
            { text: { zh: "拿着遥控器看他在人群中忍耐的样子", en: "Holding the remote watching them struggle" }, scores: { control: 4, sadism: 3 } },
            { text: { zh: "自己玩玩还行", en: "Okay for solo play" }, scores: {} },
            { text: { zh: "不喜欢", en: "Dislike" }, scores: {} }
        ]
    },
    {
        id: 55,
        text: { zh: "关于“窒息式性爱”（Autoerotic asphyxiation）：", en: "Breath play intensity:" },
        options: [
            { text: { zh: "绝对禁止", en: "Hard limit" }, scores: { protection: 3 } },
            { text: { zh: "喜欢那种大脑缺氧的一瞬间空白", en: "Love the moment of blankness from hypoxia" }, scores: { masochism: 5 } },
            { text: { zh: "喜欢掌控对方呼吸节奏的主宰感", en: "Love dominating their breathing rhythm" }, scores: { sadism: 5, control: 3 } },
            { text: { zh: "轻微的掐脖子助兴可以", en: "Light choking is okay" }, scores: { masochism: 1, sadism: 1 } }
        ]
    },
    {
        id: 56,
        text: { zh: "如果伴侣对你进行人格侮辱（比如评价你的身体缺陷）：", en: "Personal insults regarding body flaws:" },
        options: [
            { text: { zh: "会非常难过，影响关系", en: "Very sad, hurts relationship" }, scores: { pure_love: 3 } },
            { text: { zh: "这种残酷的真实感反而让我兴奋", en: "Cruel honesty turns me on" }, scores: { humiliation_sub: 5, masochism: 3 } },
            { text: { zh: "我喜欢这种击碎对方自尊的过程", en: "I like crushing their ego" }, scores: { humiliation_dom: 5, sadism: 3 } },
            { text: { zh: "只要是事实就没关系", en: "Okay if true" }, scores: { humiliation_sub: 1 } }
        ]
    },
    {
        id: 57,
        text: { zh: "对于“无性恋”或极低性欲关系的看法：", en: "View on Asexual / Low libido relationships:" },
        options: [
            { text: { zh: "我可以接受柏拉图", en: "I can accept Platonic" }, scores: { pure_love: 4 } },
            { text: { zh: "不行，我需要透过性来确认权力关系", en: "No, I need sex to validate power dynamics" }, scores: { dominance: 3, submission: 3 } },
            { text: { zh: "如果是为了服务主人，我可以禁欲", en: "I can abstain if serving my owner" }, scores: { obedience: 5 } },
            { text: { zh: "性是生活必须品", en: "Sex is essential" }, scores: { indulgence: 2 } }
        ]
    },
    {
        id: 58,
        text: { zh: "关于“恋老”或年龄差巨大的关系：", en: "Gerontophilia or Huge Age Gap:" },
        options: [
            { text: { zh: "接受不了", en: "Can't accept" }, scores: {} },
            { text: { zh: "喜欢长辈的权威感和经济能力", en: "Like the authority and finance of elders" }, scores: { dependency: 4, submission: 2 } },
            { text: { zh: "喜欢年轻肉体的活力和无知", en: "Like the vitality and ignorance of youth" }, scores: { dominance: 3, protection: 2 } },
            { text: { zh: "年龄只是数字", en: "Age is just a number" }, scores: { pure_love: 2 } }
        ]
    },
    {
        id: 59,
        text: { zh: "如果要在身上滴蜡烛油：", en: "Dripping hot wax on skin:" },
        options: [
            { text: { zh: "怕烫，不要", en: "Too hot, no" }, scores: {} },
            { text: { zh: "喜欢看着蜡油在皮肤上凝固的美感", en: "Beautiful to see wax harden on skin" }, scores: { fetish: 3, sadism: 2 } },
            { text: { zh: "痛并快乐着", en: "Pain and pleasure" }, scores: { masochism: 3 } },
            { text: { zh: "不仅要滴，还要低温蜡和高温蜡交替", en: "Alternate low and high temp wax" }, scores: { masochism: 5, sadism: 5 } }
        ]
    },
    {
        id: 60,
        text: { zh: "你更倾向于哪种相处模式？", en: "Which dynamic do you prefer?" },
        options: [
            { text: { zh: "像朋友一样平等互助", en: "Friends and equals" }, scores: { pure_love: 5 } },
            { text: { zh: "像宠物与主人", en: "Pet and Owner" }, scores: { pet: 5, dominance: 2, submission: 2 } },
            { text: { zh: "像严父与顽童", en: "Strict Father and Brat" }, scores: { brat: 4, taming: 4 } },
            { text: { zh: "像掠食者与猎物", en: "Predator and Prey" }, scores: { coercion: 4, forced: 4 } }
        ]
    },
    {
        id: 61,
        text: { zh: "关于“拳交”或极大尺寸的插入：", en: "Fisting or Huge insertions:" },
        options: [
            { text: { zh: "生理上无法接受", en: "Physically impossible for me" }, scores: {} },
            { text: { zh: "那种被完全填满、撑开的极限感", en: "The feeling of being completely filled/stretched" }, scores: { masochism: 5, submission: 3 } },
            { text: { zh: "想要彻底开拓对方的身体", en: "Want to completely open them up" }, scores: { sadism: 5, curiosity: 3 } },
            { text: { zh: "仅限观看", en: "Watch only" }, scores: { voyeurism: 2 } }
        ]
    },
    {
        id: 62,
        text: { zh: "如果伴侣要求你描述你和其他人的性经历：", en: "Describing past sex with others to partner:" },
        options: [
            { text: { zh: "这是隐私，不说", en: "Privacy, no" }, scores: { pure_love: 2 } },
            { text: { zh: "说出来会让我觉得羞耻又兴奋", en: "Shameful but exciting to tell" }, scores: { humiliation_sub: 3, ntr: 2 } },
            { text: { zh: "听伴侣讲这些会让我嫉妒发狂（正面意义）", en: "Hearing it makes me crazy jealous (in a good way)" }, scores: { ntr: 5, masochism: 2 } },
            { text: { zh: "这只是聊天话题而已", en: "Just conversation" }, scores: {} }
        ]
    },
    {
        id: 63,
        text: { zh: "对于“禁欲”游戏（一个月不准高潮）：", en: "Chastity month challenge:" },
        options: [
            { text: { zh: "做不到", en: "Can't do it" }, scores: { indulgence: 3 } },
            { text: { zh: "这种长期的煎熬是最好的调情", en: "Long term suffering is best foreplay" }, scores: { masochism: 4, submission: 4 } },
            { text: { zh: "看着对方想要又得不到的样子最有趣", en: "Fun to watch them struggle" }, scores: { sadism: 4, control: 5 } },
            { text: { zh: "如果你给我钥匙，我就试", en: "If I hold the key, I'll try" }, scores: { control: 3 } }
        ]
    },
    {
        id: 64,
        text: { zh: "如果要把性爱过程直播给陌生人看：", en: "Livestreaming sex to strangers:" },
        options: [
            { text: { zh: "违法且危险，不干", en: "Illegal and dangerous, no" }, scores: { pure_love: 3 } },
            { text: { zh: "如果有打赏或者观众欢呼，我会更卖力", en: "Cheers/Tips make me perform better" }, scores: { exhibitionism: 5, indulgence: 3 } },
            { text: { zh: "我喜欢导演这场秀", en: "I like directing the show" }, scores: { voyeurism: 4, dominance: 2 } },
            { text: { zh: "仅限不露脸", en: "Only if faceless" }, scores: { exhibitionism: 2 } }
        ]
    },
    {
        id: 65,
        text: { zh: "关于“完全剃毛”或强制除毛：", en: "Forced shaving / Smooth body:" },
        options: [
            { text: { zh: "个人喜好，无所谓", en: "Personal preference" }, scores: {} },
            { text: { zh: "光溜溜的让我觉得像个婴儿/物品", en: "Smooth makes me feel like a baby/object" }, scores: { dependency: 3, objectification: 3 } },
            { text: { zh: "我不允许伴侣身上有毛发，必须由我管理", en: "I control their hair, must be smooth" }, scores: { control: 4, fetish: 2 } },
            { text: { zh: "不喜欢白虎", en: "Don't like smooth" }, scores: {} }
        ]
    },
    {
        id: 66,
        text: { zh: "对于“胶带束缚”（Tape Bondage）：", en: "Tape Bondage:" },
        options: [
            { text: { zh: "撕下来太疼了", en: "Hurts to remove" }, scores: {} },
            { text: { zh: "喜欢那种皮肤被紧紧粘住的窒息美感", en: "Love the aesthetic of taped skin" }, scores: { fetish: 4, bondage: 4 } },
            { text: { zh: "不仅要绑，还要封嘴封眼", en: "Bind, gag, and blindfold" }, scores: { control: 5, objectification: 4 } },
            { text: { zh: "视觉上很刺激", en: "Visually stimulating" }, scores: { voyeurism: 2 } }
        ]
    },
    {
        id: 67,
        text: { zh: "如果伴侣是“施虐狂”，而你并不喜欢痛：", en: "Partner is Sadist, you dislike pain:" },
        options: [
            { text: { zh: "分手，不合适", en: "Break up" }, scores: { pure_love: 3 } },
            { text: { zh: "为了爱他，我愿意忍受甚至假装享受", en: "I'd endure or fake it for love" }, scores: { submission: 5, masochism: 1 } },
            { text: { zh: "我们可以只玩精神控制，不玩肉体痛苦", en: "Mental domination only, no physical pain" }, scores: { submission: 3 } },
            { text: { zh: "我会试图反过来控制他", en: "Try to control them instead" }, scores: { brat: 4 } }
        ]
    },
    {
        id: 68,
        text: { zh: "在极度兴奋时，你是否会产生想哭的冲动？", en: "Do you cry when extremely aroused?" },
        options: [
            { text: { zh: "不会，这很奇怪", en: "No, weird" }, scores: {} },
            { text: { zh: "经常，那种崩溃感很爽", en: "Often, the breakdown feels good" }, scores: { masochism: 4, submission: 3 } },
            { text: { zh: "我喜欢把伴侣弄哭", en: "I like making them cry" }, scores: { sadism: 5, dominance: 2 } },
            { text: { zh: "偶尔感动的哭", en: "Occasionally from emotion" }, scores: { pure_love: 2 } }
        ]
    },
    {
        id: 69,
        text: { zh: "最后一个问题：你认为性爱的终极目的是？", en: "Final Q: Ultimate goal of sex?" },
        options: [
            { text: { zh: "繁衍或快乐", en: "Reproduction or fun" }, scores: { pure_love: 2 } },
            { text: { zh: "权力的交换与确认", en: "Exchange and validation of Power" }, scores: { dominance: 4, submission: 4, control: 4 } },
            { text: { zh: "打破禁忌，释放野兽", en: "Breaking taboos, releasing the beast" }, scores: { indulgence: 5, brat: 3 } },
            { text: { zh: "通过痛苦或羞耻达到升华", en: "Ascension through pain or shame" }, scores: { sadism: 4, masochism: 4, humiliation_sub: 4 } }
        ]
    }
];

// --- 核心逻辑引擎 (The Logic Engine) ---

// 1. 合并所有题目
const questions = [...questionsPart1, ...questionsPart2, ...questionsPart3];

// 2. 状态变量
let currentLang = 'zh';
let currentQuestionIndex = 0;
let userScores = {}; 
let historyStack = []; // <--- 新增：用于记录每道题选择了什么分值，以便回退

// 初始化分数对象
function initScores() {
    for (let key in dimensions) {
        userScores[key] = 0;
    }
}
initScores();

// 3. 语言切换功能
function setLanguage(lang) {
    currentLang = lang;
    // 更新按钮状态
    document.querySelectorAll('.lang-switch button').forEach(btn => {
        if(btn.onclick.toString().includes(lang)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // 更新静态页面文本
    const texts = {
        zh: {
            title: "麋鹿性癖好测试",
            subtitle: "探索你内心深处的欲望构成",
            start: "开始测试",
            restart: "重新测试",
            warning: "内容涉及成人向话题，仅供18岁以上成人自我探索使用。",
            intro: `本测试包含${questions.length}道选择题，将从22个维度分析您的倾向。请根据直觉诚实回答。`
        },
        en: {
            title: "Elk Preference Test",
            subtitle: "Explore your inner desires",
            start: "Start Test",
            restart: "Restart Test",
            warning: "Contains adult themes. For 18+ self-exploration only.",
            intro: `This test contains ${questions.length} questions analyzing 22 dimensions. Please answer honestly.`
        }
    };
    
    document.getElementById('page-title').innerText = texts[lang].title;
    document.getElementById('page-subtitle').innerText = texts[lang].subtitle;
    document.getElementById('start-btn').innerText = texts[lang].start;
    document.getElementById('restart-btn').innerText = texts[lang].restart;
    document.getElementById('warning-text').innerText = texts[lang].warning;
    document.getElementById('intro-desc').innerText = texts[lang].intro;
    
    // 如果正在答题中，刷新题目文字
    if (!document.getElementById('quiz-screen').classList.contains('hidden')) {
        loadQuestion();
    }
    // 如果在结果页，刷新结果
    if (!document.getElementById('result-screen').classList.contains('hidden')) {
        // 销毁旧图表以便重新渲染语言
        const chartStatus = Chart.getChart("radarChart"); 
        if (chartStatus != undefined) {
          chartStatus.destroy();
        }
        drawChart();
        generateReport();
    }
}

// 4. 开始测试
function startTest() {
    initScores();
    currentQuestionIndex = 0;
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('quiz-screen').classList.add('fade-in');
    loadQuestion();
}

// 5. 加载题目
function loadQuestion() {
    const q = questions[currentQuestionIndex];
    const textField = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progressBar = document.getElementById('progress');
    const prevBtn = document.getElementById('prev-btn'); // <--- 获取按钮

// --- 新增：控制上一题按钮的显示状态 ---
    if (currentQuestionIndex === 0) {
        prevBtn.style.display = 'none'; // 第一题不显示
    } else {
        prevBtn.style.display = 'block'; // 其他题显示
    }

    // 进度条动画
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    // 渲染题目
    textField.innerText = `${currentQuestionIndex + 1}. ${q.text[currentLang]}`;
    optionsContainer.innerHTML = '';

    // 渲染选项
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt.text[currentLang];
        // 绑定点击事件
        btn.onclick = function() {
            // 视觉反馈
            this.style.background = '#0071e3';
            this.style.color = 'white';
            setTimeout(() => {
                handleAnswer(opt.scores);
            }, 200); // 稍微延迟一点，让用户看到点击效果
        };
        optionsContainer.appendChild(btn);
    });
}

// 6. 处理回答
function handleAnswer(scores) {
// 1. 记录这一步加了什么分，推入历史栈
    historyStack.push(scores);
    // 累加分数
    for (let key in scores) {
        if (userScores.hasOwnProperty(key)) {
            userScores[key] += scores[key];
        }
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// 7. 显示结果
function showResults() {
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('result-screen').classList.add('fade-in');

    drawChart();
    generateReport();
}

// 8. 绘制雷达图 (Chart.js)
function drawChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    // 准备标签和数据
    // 过滤掉得分为0的维度吗？不，雷达图需要完整。
    const labels = Object.keys(dimensions).map(k => currentLang === 'zh' ? dimensions[k].label : dimensions[k].en);
    
    // 数据归一化逻辑：
    // 我们需要把原始分数转换为 0-100 的百分比。
    // 简单算法：找到目前最高的分数作为基准，或者设定一个固定的满分阈值（例如25分算满分）。
    // 这里采用动态封顶法：最高分那一项算100%，其他按比例缩放。为了避免全是0的情况，基准至少为10。
    let maxScoreInSet = Math.max(...Object.values(userScores));
    if (maxScoreInSet < 15) maxScoreInSet = 15; // 基础阈值

    const dataPoints = Object.keys(dimensions).map(k => {
        let val = (userScores[k] / maxScoreInSet) * 100;
        return val > 100 ? 100 : val; // 封顶100
    });

    // 销毁旧实例（防止重绘报错）
    const existingChart = Chart.getChart("radarChart");
    if (existingChart) existingChart.destroy();

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: currentLang === 'zh' ? '性癖倾向' : 'Preferences',
                data: dataPoints,
                backgroundColor: 'rgba(0, 113, 227, 0.4)', // 苹果蓝
                borderColor: '#0071e3',
                pointBackgroundColor: '#fff',
                pointBorderColor: '#0071e3',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#0071e3',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: 'rgba(0,0,0,0.1)' },
                    grid: { color: 'rgba(0,0,0,0.1)' },
                    pointLabels: {
                        font: { size: 11, family: "-apple-system" },
                        color: '#666'
                    },
                    ticks: { display: false }, // 不显示刻度数字，更极简
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: { display: false }
            },
            responsive: true
        }
    });
}

// 9. 生成文字报告
function generateReport() {
    const container = document.getElementById('result-details');
    container.innerHTML = '';

    // 找出得分最高的前 10 项
    const sortedKeys = Object.keys(userScores).sort((a, b) => userScores[b] - userScores[a]);
    const topKeys = sortedKeys.filter(key => userScores[key] > 0).slice(0, 10); // 取前10个非0项

    if (topKeys.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#888;">${currentLang==='zh'?'您似乎是一张白纸（或者没选任何倾向选项）。':'You seem to be a blank slate.'}</p>`;
        return;
    }

    topKeys.forEach(key => {
        const score = userScores[key];
        
        // 计算百分比显示 (粗略)
        let maxScore = Math.max(...Object.values(userScores));
        if (maxScore < 15) maxScore = 15;
        const percent = Math.round((score / maxScore) * 100);

        const div = document.createElement('div');
        div.className = 'card result-item fade-in';
        
        // 获取标题和描述
        const title = currentLang === 'zh' ? dimensions[key].label : dimensions[key].en;
        const desc = currentLang === 'zh' ? dimensions[key].desc : dimensions[key].desc; // 维度定义里的简短描述
        
        // 获取详细分析 (如果有的话，没有就用通用模板)
        let analysis = "";
        if (resultTexts[key]) {
            analysis = resultTexts[key][currentLang];
        } else {
            // 通用回退文案
            analysis = currentLang === 'zh' 
                ? `您在【${title}】维度表现突出。这表明${desc}` 
                : `You show strong traits in [${title}]. This suggests ${dimensions[key].desc}`;
        }

        // 动态HTML结构
        div.innerHTML = `
            <div class="result-title">
                <span>${title} <span style="font-size:0.8em; color:#888; font-weight:normal;">/ ${dimensions[key].en}</span></span>
                <span style="color:#0071e3;">${percent}%</span>
            </div>
            <div class="progress-bar" style="margin-bottom:15px; height:4px;">
                <div class="progress-fill" style="width:${percent}%"></div>
            </div>
            <p style="font-weight:500; margin-bottom:5px; color:#333;">${desc}</p>
            <p style="font-size:14px; color:#666; margin-top:10px; line-height:1.5; border-top:1px solid #eee; padding-top:10px;">
                ${analysis}
            </p>
        `;
        container.appendChild(div);
    });
}

// 10. 重新测试逻辑 (使用强制刷新，确保万无一失)
function restartTest() {
    window.location.reload(); 
}

// 11. 上一题逻辑
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        const lastScores = historyStack.pop();
        if (lastScores) {
            for (let key in lastScores) {
                if (userScores.hasOwnProperty(key)) {
                    userScores[key] -= lastScores[key];
                }
            }
        }
        loadQuestion();
    }
}

// 页面加载完成后初始化
window.onload = function() {
    // 默认触发一次语言设置以填充文本
    setLanguage('zh');
};