export type Locale = "en" | "ja"

export const translations = {
  en: {
    nav: {
      fastRead: "Fast Read",
      projects: "Projects",
      caseStudies: "Case Studies",
      about: "About",
      demosLive: "Runnable demos live",
      langToggle: "日本語",
    },
    hero: {
      openTo: "Open to product engineering roles",
      tagline: "Systems, workflows, and trusted operator tools",
      name: "Raffi Windarto",
      role: "Product-minded Software Engineer — Osaka / Remote",
      pitch:
        "I build internal products, operator surfaces, and AI-assisted workflows that stay calm when the work gets messy.",
      sub: "Over the last 3+ years, I've focused on internal tools, integration layers, and operations software where clarity matters as much as raw capability.",
      viewProjects: "View Projects",
      readCaseStudies: "Read Case Studies",
      scrollHint: "Scroll to explore",
      stats: [
        { label: "3+ years", caption: "shipping internal tools and workflow software" },
        { label: "Ops-first", caption: "interfaces for teams working under pressure" },
        { label: "Verification-led", caption: "automation that stays explainable and safe to trust" },
      ],
    },
    recruiterSummary: {
      eyebrow: "Fast Read",
      heading: "Fast read for hiring managers",
      intro: "Good fit if you need someone who can turn messy operational work into software people actually trust.",
      bestFitLabel: "Best fit",
      whatTeamsGetLabel: "What teams get",
      bestFit: [
        "Internal tools & operator software",
        "AI-assisted workflows with trust signals",
        "Workflow automation and integration-heavy products",
      ],
      workStyle: [
        "Product-minded engineering",
        "Calm, readable UX for messy operational work",
        "Verification-first shipping with smaller safe slices",
      ],
      quickProofLabel: "Quick proof",
      quickProof:
        "Nine case studies are live, six with interactive demos — you can go from headline to actual product surface in one click. The Kakeibo and Record Sync demos have the most moving parts.",
      startHereLabel: "Start here",
      proofLinks: [
        { label: "Try Kakeibo — receipt scan + OCR", href: "/demos/kakeibo" },
        { label: "See Record Sync pipeline demo", href: "/demos/record-sync-service" },
        { label: "Browse all 9 case studies", href: "/#case-studies" },
      ],
    },
    currentFocus: {
      sectionLabel: "Current Focus",
      items: [
        {
          label: "Right now",
          title: "AI-assisted operations tooling",
          detail:
            "Building interfaces where AI does the heavy lifting but operators stay in control — visible state, safe retries, clean handoffs.",
        },
        {
          label: "Actively exploring",
          title: "Reliable integration patterns",
          detail:
            "Webhook-driven sync, canonical record fetching, deterministic ID resolution — the backend decisions that make systems stay honest.",
        },
        {
          label: "Always cared about",
          title: "Operator clarity under pressure",
          detail:
            "Interfaces that make the next right action obvious — even when someone is tired, rushed, or inheriting someone else's context.",
        },
      ],
    },
    featuredProjects: {
      sectionLabel: "Featured Product Work",
      heading: "Products and systems I can walk through from problem to implementation.",
      readCaseStudy: "Read full case study",
      tryDemo: "Try runnable demo",
    },
    engineeringPrinciples: {
      sectionLabel: "Engineering Principles",
      heading: "How I think about building systems that last.",
      principles: [
        {
          title: "Build for trust, not just speed",
          description:
            "Operators need confidence in their tools. Every feature ships with clear feedback, predictable behavior, and graceful degradation.",
        },
        {
          title: "Small safe slices over noisy rewrites",
          description:
            "Large changes create large risks. I prefer incremental delivery that maintains stability while moving toward better architecture.",
        },
        {
          title: "Operator clarity matters",
          description:
            "The person using the system at 2am during an incident shouldn't have to guess what a button does or what state they're in.",
        },
        {
          title: "Verification before completion",
          description:
            "A task isn't done until it's verified. Build in checkpoints, confirmations, and audit trails so nothing slips through.",
        },
      ],
    },
    capabilities: {
      sectionLabel: "Capabilities",
      heading: "Where I focus my energy.",
      items: [
        {
          title: "Internal Tools",
          description:
            "Admin panels, operator interfaces, and back-office systems designed for power users who need efficiency.",
        },
        {
          title: "Workflow Automation",
          description:
            "End-to-end automation of manual processes with proper error handling, notifications, and recovery.",
        },
        {
          title: "System Integrations",
          description:
            "Connecting disparate systems through APIs, event streams, and data pipelines with robust sync guarantees.",
        },
        {
          title: "Dashboard UX",
          description:
            "Information-dense interfaces that surface what matters without overwhelming. Built for decision-making.",
        },
        {
          title: "Reliability Work",
          description:
            "Migrations, refactors, and performance improvements that maintain service while improving architecture.",
        },
      ],
    },
    caseStudies: {
      sectionLabel: "Case Studies",
      heading: "The thinking behind the work.",
      problemLabel: "Problem",
      constraintsLabel: "Constraints",
      decisionsLabel: "Decisions",
      outcomeLabel: "Outcome",
      readFull: "Read the full case study",
      tryDemo: "Try runnable demo",
    },
    about: {
      sectionLabel: "About",
      heading: "I like software that helps someone make the next good decision.",
      paragraphs: [
        "Most of my work has lived in the unglamorous middle of a business: internal tools, operator workflows, integration layers, and the systems people depend on when something has already gone a little sideways.",
        "That kind of software needs a different quality bar. It has to stay legible when someone is tired, rushed, or inheriting context from another teammate. A useful interface is not the one with the most state. It is the one that makes the next step obvious.",
        "So I tend to work across product and engineering at the same time: clarify the workflow, cut noise, make failure states explainable, and ship the verification steps that let people trust automation without hand-waving.",
      ],
      currentlyLabel: "Currently",
      currentlyTitle: "Open to product engineering roles and select builds",
      currentlyDetail:
        "Best fit: internal tools, ops software, AI-assisted workflows, and reliability-heavy products.",
      backgroundLabel: "Background",
      backgroundItems: [
        "3+ years in production software engineering",
        "Internal tools, workflow systems, and operator UX",
        "Integration, reliability, and decision-support surfaces",
        "Product-minded engineering from discovery through shipping",
      ],
      cvLabel: "CV and work history",
      cvLinks: [
        { label: "Request CV by email", href: "mailto:raffiwindartobisnis@gmail.com?subject=CV%20request" },
      ],
    },
    footer: {
      getInTouchLabel: "Get in touch",
      heading: "Open to product engineering roles and select builds.",
      detail:
        "I do my best work on internal tools, operator software, AI-assisted workflows, and messy systems that need calmer UX. Based in Osaka, available remotely.",
      links: [
        { name: "Browse demos", href: "/demos" },
        { name: "Kakeibo demo", href: "/demos/kakeibo" },
        { name: "GitHub", href: "https://github.com/Wallens11", external: true },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-raffi-windarto-520aa2330/", external: true },
        { name: "Email me", href: "mailto:raffiwindartobisnis@gmail.com", external: true },
      ],
      fitSignals: [
        {
          label: "Internal tools & ops software",
          detail: "The kind that runs quietly and earns trust from the people who depend on it daily.",
        },
        {
          label: "AI-assisted workflows",
          detail: "Systems where the automation is explainable and operators stay in control.",
        },
        {
          label: "Integration-heavy backends",
          detail: "Webhook pipelines, record sync, diagnostics — built to be debuggable, not just functional.",
        },
      ],
      copyright: "All rights reserved.",
      location: "Osaka / Remote",
    },
  },

  ja: {
    nav: {
      fastRead: "概要",
      projects: "プロジェクト",
      caseStudies: "ケーススタディ",
      about: "自己紹介",
      demosLive: "デモを試す",
      langToggle: "English",
    },
    hero: {
      openTo: "プロダクトエンジニアリングのポジション募集中",
      tagline: "システム・ワークフロー・現場が信頼するツール",
      name: "Raffi Windarto",
      role: "プロダクト志向のソフトウェアエンジニア — 大阪 / リモート",
      pitch:
        "社内プロダクト、オペレーター向けインターフェース、AI支援ワークフローを構築します。現場が混乱しても、システムは落ち着いていられるように。",
      sub: "3年以上にわたり、社内ツール・インテグレーション・オペレーション支援システムに特化してきました。明確さが、純粋な機能と同じくらい重要な領域です。",
      viewProjects: "プロジェクトを見る",
      readCaseStudies: "ケーススタディを読む",
      scrollHint: "スクロールして探索",
      stats: [
        { label: "3年以上", caption: "社内ツールとワークフローソフトウェアの本番運用" },
        { label: "現場優先", caption: "プレッシャー下で働くチームのためのインターフェース" },
        { label: "検証ファースト", caption: "説明可能で安全に信頼できる自動化" },
      ],
    },
    recruiterSummary: {
      eyebrow: "採用担当者向け概要",
      heading: "採用担当者向けファストリード",
      intro:
        "複雑な業務オペレーションを、現場が本当に信頼できるソフトウェアに変換できるエンジニアをお探しなら。",
      bestFitLabel: "適性のある分野",
      whatTeamsGetLabel: "チームが得られるもの",
      bestFit: [
        "社内ツール・オペレーターソフトウェア",
        "信頼シグナルを持つAI支援ワークフロー",
        "ワークフロー自動化・インテグレーション重視のプロダクト",
      ],
      workStyle: [
        "プロダクト志向のエンジニアリング",
        "複雑な業務のための落ち着いた、読みやすいUX",
        "検証ファースト・小さく安全なスライスでのリリース",
      ],
      quickProofLabel: "実績のご確認",
      quickProof:
        "ケーススタディが9件公開済みで、うち6件はインタラクティブなデモ付き。Kakeiboのレシートスキャン（Gemini OCR）とRecord Syncのパイプラインデモが特に見どころです。",
      startHereLabel: "まずはここから",
      proofLinks: [
        { label: "Kakeibo デモ — レシートスキャン体験", href: "/demos/kakeibo" },
        { label: "Record Sync パイプラインデモ", href: "/demos/record-sync-service" },
        { label: "全9件のケーススタディを見る", href: "/#case-studies" },
      ],
    },
    currentFocus: {
      sectionLabel: "現在のフォーカス",
      items: [
        {
          label: "現在",
          title: "AI支援オペレーションツール",
          detail:
            "AIが重い処理を担いつつ、オペレーターが制御を保てるインターフェースを構築しています。可視状態・安全なリトライ・明確な引き継ぎ。",
        },
        {
          label: "積極的に探求中",
          title: "信頼性の高いインテグレーションパターン",
          detail:
            "Webhook駆動の同期・正規レコード取得・決定論的ID解決——システムを正直に保つためのバックエンドの判断。",
        },
        {
          label: "常に大切にしてきたこと",
          title: "プレッシャー下でのオペレーターの明確性",
          detail:
            "疲れていても、急いでいても、他の人のコンテキストを引き継いでいても、次にすべきことが明確になるインターフェース。",
        },
      ],
    },
    featuredProjects: {
      sectionLabel: "注目プロダクトワーク",
      heading: "課題整理から実装まで説明できるプロダクトとシステム。",
      readCaseStudy: "ケーススタディ全文を読む",
      tryDemo: "実際に動くデモを試す",
    },
    engineeringPrinciples: {
      sectionLabel: "エンジニアリング原則",
      heading: "長く使われるシステムを構築するための考え方。",
      principles: [
        {
          title: "速度だけでなく、信頼のために構築する",
          description:
            "オペレーターはツールに確信を持つ必要があります。すべての機能は、明確なフィードバック・予測可能な動作・優雅な劣化とともにリリースされます。",
        },
        {
          title: "騒がしいリライトより小さく安全なスライス",
          description:
            "大きな変更は大きなリスクを生む。より良いアーキテクチャへ向かいながら安定性を維持するインクリメンタルデリバリーを好みます。",
        },
        {
          title: "オペレーターの明確性が重要",
          description:
            "インシデント中の深夜2時にシステムを使う人は、ボタンが何をするか、どの状態にいるかを推測しなくていいはずです。",
        },
        {
          title: "完了前に検証する",
          description:
            "タスクは検証が完了するまで終わっていません。チェックポイント・確認・監査証跡を組み込んで、何も抜け落ちないようにします。",
        },
      ],
    },
    capabilities: {
      sectionLabel: "専門分野",
      heading: "エネルギーを注いでいる分野。",
      items: [
        {
          title: "社内ツール",
          description:
            "管理パネル、オペレーターインターフェース、効率性を必要とするパワーユーザー向けのバックオフィスシステム。",
        },
        {
          title: "ワークフロー自動化",
          description:
            "適切なエラーハンドリング・通知・リカバリーを備えた、手動プロセスのエンドツーエンド自動化。",
        },
        {
          title: "システムインテグレーション",
          description:
            "API・イベントストリーム・データパイプラインを通じた異種システムの連携。堅牢な同期保証付き。",
        },
        {
          title: "ダッシュボードUX",
          description:
            "重要な情報を圧倒せずに表示する情報密度の高いインターフェース。意思決定のために構築。",
        },
        {
          title: "信頼性向上作業",
          description:
            "サービスを維持しながらアーキテクチャを改善する、マイグレーション・リファクタリング・パフォーマンス改善。",
        },
      ],
    },
    caseStudies: {
      sectionLabel: "ケーススタディ",
      heading: "作業の背景にある思考。",
      problemLabel: "課題",
      constraintsLabel: "制約",
      decisionsLabel: "決断",
      outcomeLabel: "結果",
      readFull: "ケーススタディ全文を読む",
      tryDemo: "実際に動くデモを試す",
    },
    about: {
      sectionLabel: "自己紹介",
      heading: "次の良い判断を助けるソフトウェアが好きです。",
      paragraphs: [
        "私の仕事のほとんどは、ビジネスの地味な中間部分に存在しています：社内ツール、オペレーターワークフロー、インテグレーション層、そして何かが少しうまくいかなくなったときに人々が頼るシステムです。",
        "そういったソフトウェアには異なる品質基準が必要です。疲れているとき、急いでいるとき、チームメートからコンテキストを引き継いだときでも読みやすくなければなりません。使いやすいインターフェースとは、最も状態が多いものではなく、次のステップを明確にするものです。",
        "だから私はプロダクトとエンジニアリングを同時に横断する傾向があります：ワークフローを明確にし、ノイズを削除し、失敗状態を説明可能にし、自動化を曖昧にせずに信頼できる検証ステップを実装します。",
      ],
      currentlyLabel: "現在",
      currentlyTitle: "プロダクトエンジニアリングのポジションおよび選定プロジェクトを募集中",
      currentlyDetail:
        "最適分野：社内ツール・オペレーションソフトウェア・AI支援ワークフロー・信頼性重視のプロダクト。",
      backgroundLabel: "バックグラウンド",
      backgroundItems: [
        "3年以上のプロダクションソフトウェアエンジニアリング経験",
        "社内ツール・ワークフローシステム・オペレーターUX",
        "インテグレーション・信頼性・意思決定支援インターフェース",
        "ディスカバリーから出荷まで一貫したプロダクト志向エンジニアリング",
      ],
      cvLabel: "CV・職務経歴",
      cvLinks: [
        { label: "メールでCVを依頼", href: "mailto:raffiwindartobisnis@gmail.com?subject=CV%20request" },
      ],
    },
    footer: {
      getInTouchLabel: "お問い合わせ",
      heading: "プロダクトエンジニアリングのポジションおよび選定プロジェクトを募集中です。",
      detail:
        "社内ツール・オペレーターソフトウェア・AI支援ワークフロー・混乱したシステムのUX改善で最高の成果を発揮します。大阪在住、リモート対応可能です。",
      links: [
        { name: "デモを試す", href: "/demos" },
        { name: "Kakeiboデモ", href: "/demos/kakeibo" },
        { name: "GitHub", href: "https://github.com/Wallens11", external: true },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-raffi-windarto-520aa2330/", external: true },
        { name: "メールで連絡", href: "mailto:raffiwindartobisnis@gmail.com", external: true },
      ],
      fitSignals: [
        {
          label: "社内ツール・オペレーションソフトウェア",
          detail: "静かに動き続け、毎日頼りにする人々の信頼を勝ち取るタイプのソフトウェアです。",
        },
        {
          label: "AI支援ワークフロー",
          detail: "自動化が説明可能で、オペレーターが制御を保てるシステム。",
        },
        {
          label: "インテグレーション重視のバックエンド",
          detail: "Webhookパイプライン・レコード同期・診断機能——機能するだけでなく、デバッグしやすく構築。",
        },
      ],
      copyright: "全著作権所有。",
      location: "大阪 / リモート",
    },
  },
} as const

export type Translations = (typeof translations)["en"]
