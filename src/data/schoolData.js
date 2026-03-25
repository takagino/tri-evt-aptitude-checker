const NEO_COLORS = {
  CYAN: '#00F0FF', // 進級・エンジニア系
  MAGENTA: '#FF00E5', // 卒業・デザイナー系
  YELLOW: '#FFDE00', // 入学・マーケター系
  GREEN: '#00FF94', // 就職・広報系
  PURPLE: '#7000FF', // 印刷・ディレクター系
  ORANGE: '#FF9100', // 通学・探検家系
  RED: '#FF3D00', // 未経験・警告系
  BLUE: '#2979FF', // 番人系
  DEEP_PURPLE: '#4A148C', // 分析家系
  GRAY: '#cbd5e1', // その他
  BLACK: '#000000',
  WHITE: '#FFFFFF',
};

export const schoolData = {
  // ==========================================
  // ① なにを学ぶの？（タイムライン）
  // ==========================================
  timeline: [
    {
      id: 'm1',
      type: 'milestone',
      title: '1年次 4月 🌸 入学',
      bgColor: NEO_COLORS.YELLOW,
      color: NEO_COLORS.BLACK,
    },
    {
      id: 1,
      type: 'event',
      year: 1,
      badge: '5月',
      title: 'スポーツ大会 🏆',
      description: 'クラスの団結力を高める最初のイベント！',
      imageUrl:
        'https://computer.trident.ac.jp/datas/cache/images/2024/05/22/615x410_2ae395417f98b42be3d881be00011165_7c438ba95d757d299735f6eec01c5b9bf1d0b258.jpg',
    },
    {
      id: 2,
      type: 'event',
      year: 1,
      badge: '9月',
      title: '夏休み集中授業 💻',
      description: '一気にスキルアップ！初めてのブログ制作に挑戦。',
      linkUrl: 'https://tridentwebdesign.blog.fc2.com/e/blog2025',
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf',
    },
    {
      id: 3,
      type: 'event',
      year: 1,
      badge: '11月',
      title: '学園祭 🎉',
      description:
        '出店やコスプレ、ビンゴ大会など、ただただ全力で楽しむ最高の一日！',
      imageUrl:
        'https://computer.trident.ac.jp/datas/cache/images/2023/11/21/400x266_2ae395417f98b42be3d881be00011165_5beb66e26b3e57484500d5dac45d41a1bec6ad31.jpg',
    },
    {
      id: 4,
      type: 'event',
      year: 1,
      badge: '2月',
      title: '進級展 ✨',
      description: '1年間の集大成！多くの人に作品を見てもらうチャンス。',
      linkUrl: 'https://tridentwebdesign.blog.fc2.com/e/2025exhibition',
      imageUrl:
        'https://computer.trident.ac.jp/datas/cache/images/2026/01/19/615x410_2ae395417f98b42be3d881be00011165_198660562f91d817b8dfa993aafa27f5aa534f18.jpg',
    },
    {
      id: 5,
      type: 'event',
      year: 1,
      badge: '3月',
      title: '合同合宿 🏕️',
      description:
        '全国の学生が大集結！学校の垣根を越えたチームで共に作品を制作します。',
      linkUrl: 'https://tridentwebdesign.blog.fc2.com/e/webcamp2025',
      imageUrl:
        'https://computer.trident.ac.jp/datas/cache/images/2025/04/01/400x266_2ae395417f98b42be3d881be00011165_3de5fb25d08ec9e8bd7434d147c307150fb1a153.jpg',
    },
    {
      id: 'm-mid',
      type: 'milestone',
      title: '2年次 4月 ✨ 進級',
      bgColor: NEO_COLORS.CYAN,
      color: NEO_COLORS.BLACK,
    },
    {
      id: 6,
      type: 'event',
      year: 2,
      badge: '4月',
      title: 'ポートフォリオ制作 💼',
      description: '就職活動に向けて、自分だけの最強の作品集を制作！',
      linkUrl: 'https://tridentwebdesign.blog.fc2.com/e/portfolio2025',
      imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546',
    },
    {
      id: 7,
      type: 'event',
      year: 2,
      badge: '8月',
      title: 'Webサイト制作（チーム） 🤝',
      description: '実在するクライアントの課題をチームで解決する実践授業。',
      linkUrl: 'https://computer.trident.ac.jp/news/703/',
      imageUrl:
        'https://computer.trident.ac.jp/datas/cache/images/2025/05/29/615x410_2ae395417f98b42be3d881be00011165_2d8cd5c2239f1ff41d996fe7bdb03eb9c4cf67cc.jpg',
    },
    {
      id: 8,
      type: 'event',
      year: 2,
      badge: '11月',
      title: 'コンテスト応募 🏆',
      description: '外部コンテストへの挑戦！プロからの評価をもらいます。',
      linkUrl: 'https://tridentwebdesign.blog.fc2.com/e/html5award-2024',
      imageUrl:
        'https://computer.trident.ac.jp/datas/cache/images/2025/02/07/349x262_ea1e9d427fb5664c32c517a73e421e58_84a73514a0e14e5e1dbe9328131714636230dfc2.png',
    },
    {
      id: 9,
      type: 'event',
      year: 2,
      badge: '2月',
      title: '卒業制作展 🎓',
      description: '2年間の全てを注ぎ込んだ、学生生活最後の超大作！',
      linkUrl: 'https://tridentwebdesign.blog.fc2.com/e/graduation2025',
      imageUrl:
        'https://computer.trident.ac.jp/datas/cache/images/2026/01/19/615x410_2ae395417f98b42be3d881be00011165_69851ebd2f7a10d4603d367aa74d66aed6e1d253.jpg',
    },
    {
      id: 'm2',
      type: 'milestone',
      title: '2年次 3月 🎓 卒業！',
      bgColor: NEO_COLORS.MAGENTA,
      color: NEO_COLORS.WHITE,
    },
  ],

  // ==========================================
  // ② どんな学生がいるの？
  // ==========================================
  demographics: {
    gender: [
      { name: '男子', value: 60, color: NEO_COLORS.CYAN },
      { name: '女子', value: 35, color: NEO_COLORS.MAGENTA },
      { name: 'その他', value: 5, color: NEO_COLORS.YELLOW },
    ],
    highSchool: [
      { name: '普通科', value: 55, color: NEO_COLORS.RED },
      { name: '商業・情報', value: 25, color: NEO_COLORS.GREEN },
      { name: '工業', value: 10, color: NEO_COLORS.BLUE },
      { name: 'その他', value: 10, color: NEO_COLORS.PURPLE },
    ],
    commute: [
      { name: '名古屋市内', value: 40, color: NEO_COLORS.ORANGE },
      { name: '愛知県内', value: 35, color: NEO_COLORS.BLUE },
      { name: '岐阜・三重', value: 20, color: NEO_COLORS.YELLOW },
      { name: 'その他', value: 5, color: NEO_COLORS.CYAN },
    ],
    mbti: [
      { name: 'INTJ', value: 3, color: '#4A148C' },
      { name: 'INTP', value: 8, color: '#6A1B9A' },
      { name: 'ENTJ', value: 2, color: '#7B1FA2' },
      { name: 'ENTP', value: 5, color: '#8E24AA' }, // 紫系(分析家)
      { name: 'INFJ', value: 6, color: '#1B5E20' },
      { name: 'INFP', value: 15, color: '#2E7D32' },
      { name: 'ENFJ', value: 3, color: '#388E3C' },
      { name: 'ENFP', value: 10, color: '#43A047' }, // 緑系(外交官)
      { name: 'ISTJ', value: 7, color: '#0D47A1' },
      { name: 'ISFJ', value: 9, color: '#1565C0' },
      { name: 'ESTJ', value: 2, color: '#1976D2' },
      { name: 'ESFJ', value: 4, color: '#1E88E5' }, // 青系(番人)
      { name: 'ISTP', value: 12, color: '#FF6F00' },
      { name: 'ISFP', value: 10, color: '#FF8F00' },
      { name: 'ESTP', value: 1, color: '#FFA000' },
      { name: 'ESFP', value: 3, color: '#FFB300' }, // 橙系(探検家)
    ],
    sns: [
      { name: 'Instagram', value: 45, color: '#E1306C' },
      { name: 'X', value: 30, color: NEO_COLORS.BLACK },
      { name: 'TikTok', value: 15, color: '#00F2EA' },
      { name: 'YouTube', value: 10, color: '#FF0000' },
    ],
    culture: [
      { name: '推し活・趣味', value: 40, color: NEO_COLORS.MAGENTA },
      { name: '友達と遊ぶ', value: 25, color: NEO_COLORS.GREEN },
      { name: '制作・勉強', value: 15, color: NEO_COLORS.BLUE },
      { name: 'バイト', value: 10, color: NEO_COLORS.YELLOW },
      { name: 'ゆっくり寝る', value: 10, color: NEO_COLORS.GRAY },
    ],
    partTimeJob: [
      { name: 'している', value: 75, color: NEO_COLORS.GREEN },
      { name: 'していない', value: 25, color: NEO_COLORS.RED },
    ],
    experience: [
      { name: '未経験', value: 80, color: NEO_COLORS.RED },
      { name: '授業で少し', value: 15, color: NEO_COLORS.BLUE },
      { name: '独学・趣味', value: 5, color: NEO_COLORS.GREEN },
    ],
  },

  // ==========================================
  // ③ どこへ就職するの？
  // ==========================================
  career: {
    industryTypes: [
      {
        name: '制作会社',
        color: NEO_COLORS.CYAN,
        description:
          'クライアントから依頼を受け、様々な企業のWebサイトやアプリを制作します。常に新しいデザインや技術に触れられる刺激的な環境です。',
        companies: [
          {
            name: '株式会社カークスヴィル',
            pref: '東京',
            url: 'https://kirksville.jp/',
          },
          {
            name: '株式会社アクアリング',
            pref: '愛知',
            url: 'https://www.aquaring.co.jp/',
          },
          { name: '株式会社リーピー', pref: '岐阜', url: 'https://leapy.jp/' },
        ],
      },
      {
        name: '自社サービス会社',
        color: NEO_COLORS.MAGENTA,
        description:
          'SNS、マッチングアプリ、Webツールなど、自社で企画・開発しているサービスを育てます。ユーザーの反応をダイレクトに見られるのが魅力です。',
        companies: [
          {
            name: '東建コーポレーション株式会社',
            pref: '愛知',
            url: 'https://www.token.co.jp/',
          },
          { name: '株式会社Clap', pref: '岐阜', url: 'https://clapltd.com/' },
        ],
      },
      {
        name: 'ECサイト運営会社',
        color: NEO_COLORS.GREEN,
        description:
          'オンラインショップの構築やデザイン、キャンペーン企画などを行い、商品の売上アップやブランド力向上に直接貢献する仕事です。',
        companies: [
          {
            name: 'honu加藤珈琲店株式会社',
            pref: '愛知',
            url: 'https://www.katocoffee.net/',
          },
          {
            name: '株式会社ホスコ',
            pref: '愛知',
            url: 'https://www.hosco.co.jp/',
          },
        ],
      },
      {
        name: '印刷会社',
        color: NEO_COLORS.PURPLE,
        description:
          '紙媒体のデザインノウハウを活かし、Webサイトやデジタルコンテンツの制作も幅広く手掛ける企業です。クロスメディアでの提案力が身につきます。',
        companies: [
          {
            name: '半田中央印刷株式会社',
            pref: '愛知',
            url: 'https://handa-cp.co.jp/',
          },
          {
            name: '株式会社ソーゴー',
            pref: '愛知',
            url: 'https://sogo-aichi.co.jp/',
          },
        ],
      },
      {
        name: '一般企業のWeb・広報',
        color: NEO_COLORS.YELLOW,
        description:
          'メーカー、アパレルなど、自社のWebサイト更新やSNS運用、デジタルマーケティングを担う重要なポジションです。',
        companies: [
          {
            name: '株式会社寿商店',
            pref: '愛知',
            url: 'https://s-kotobuki.co.jp/',
          },
          {
            name: '株式会社TryHard Japan',
            pref: '大阪',
            url: 'https://tryhard.me/',
          },
        ],
      },
    ],
    threeYearStats: [
      {
        year: 2025,
        employmentRate: 98.5,
        industryRate: 85.0,
        jobRoles: [
          { name: 'デザイナー', value: 35, color: NEO_COLORS.MAGENTA },
          { name: 'エンジニア', value: 30, color: NEO_COLORS.CYAN },
          { name: 'ディレクター', value: 10, color: NEO_COLORS.PURPLE },
          { name: 'Web・広報担当', value: 10, color: NEO_COLORS.GREEN },
          { name: 'マーケター', value: 5, color: NEO_COLORS.YELLOW },
          { name: 'IT系', value: 5, color: NEO_COLORS.ORANGE },
          { name: 'その他', value: 5, color: NEO_COLORS.GRAY },
        ],
      },
      {
        year: 2024,
        employmentRate: 98.5,
        industryRate: 85.0,
        jobRoles: [
          { name: 'デザイナー', value: 35, color: NEO_COLORS.MAGENTA },
          { name: 'エンジニア', value: 30, color: NEO_COLORS.CYAN },
          { name: 'ディレクター', value: 10, color: NEO_COLORS.PURPLE },
          { name: 'Web・広報担当', value: 10, color: NEO_COLORS.GREEN },
          { name: 'マーケター', value: 5, color: NEO_COLORS.YELLOW },
          { name: 'IT系', value: 5, color: NEO_COLORS.ORANGE },
          { name: 'その他', value: 5, color: NEO_COLORS.GRAY },
        ],
      },
      {
        year: 2023,
        employmentRate: 98.5,
        industryRate: 85.0,
        jobRoles: [
          { name: 'デザイナー', value: 35, color: NEO_COLORS.MAGENTA },
          { name: 'エンジニア', value: 30, color: NEO_COLORS.CYAN },
          { name: 'ディレクター', value: 10, color: NEO_COLORS.PURPLE },
          { name: 'Web・広報担当', value: 10, color: NEO_COLORS.GREEN },
          { name: 'マーケター', value: 5, color: NEO_COLORS.YELLOW },
          { name: 'IT系', value: 5, color: NEO_COLORS.ORANGE },
          { name: 'その他', value: 5, color: NEO_COLORS.GRAY },
        ],
      },
    ],
  },
};
