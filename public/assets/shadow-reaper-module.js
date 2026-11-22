(function (global) {
  "use strict";

  const HERO_ID = "shadow_reaper";

  const SCHOOLS = Object.freeze({
    shadow: Object.freeze({
      id: "shadow",
      name: "Тень",
      cardLabel: "Тень",
      aliases: Object.freeze(["shadow", "тень", "школа тени", "тінь", "школа тіні"]),
      cardSchoolValues: Object.freeze(["Тень", "Школа Тени"]),
      tagKey: "sr_shadow",
      heroClass: HERO_ID
    }),
    reap: Object.freeze({
      id: "reap",
      name: "Жатва",
      cardLabel: "Жатва",
      aliases: Object.freeze(["reap", "harvest", "жатва", "школа жатвы", "жнива", "школа жнив"]),
      cardSchoolValues: Object.freeze(["Жатва", "Школа Жатвы"]),
      tagKey: "sr_reap",
      heroClass: HERO_ID
    }),
    shackles: Object.freeze({
      id: "shackles",
      name: "Оковы",
      cardLabel: "Оковы",
      aliases: Object.freeze(["shackles", "оковы", "школа оков", "кайдани", "школа кайданів"]),
      cardSchoolValues: Object.freeze(["Оковы", "Школа Оков"]),
      tagKey: "sr_shackles",
      heroClass: HERO_ID
    })
  });

  const STARTER_DECK_RECIPE = Object.freeze([
    Object.freeze({ cardId: "sr_blade_strike", count: 4 }),
    Object.freeze({ cardId: "sr_guard_stance", count: 4 }),
    Object.freeze({ cardId: "sr_veil_step", count: 1 }),
    Object.freeze({ cardId: "sr_spark_extract", count: 1 })
  ]);

  function makeCard(spec) {
    const isStarter = spec.rewardEligible === false;
    const isPower = spec.type === "power";
    const exhaust = Boolean(spec.exhaustOnPlay || isPower);
    return Object.freeze({
      id: spec.id,
      name: spec.name,
      rarity: spec.rarity || "common",
      cost: typeof spec.cost === "number" ? spec.cost : 1,
      type: spec.type || "skill",
      school: spec.school || "Базовая",
      heroClass: HERO_ID,
      headline: spec.headline || "",
      description: spec.description || "",
      image: spec.image || "",
      fallbackImage: spec.fallbackImage || spec.image || "",
      spriteImage: null,
      fallbackSpriteImage: null,
      artKey: spec.id,
      rewardEligible: !isStarter,
      unlocked: true,
      exhaustOnPlay: exhaust,
      requiresShards: spec.requiresShards || 0,
      srSchoolKey: spec.srSchoolKey || "basic",
      pools: isStarter ? Object.freeze([]) : Object.freeze(["crypt", HERO_ID]),
      tags: Object.freeze((spec.tags || []).concat([HERO_ID])),
      effects: Object.freeze(
        (spec.effects || []).map(function (e) {
          return Object.freeze(Object.assign({}, e));
        })
      )
    });
  }

  const CARD_LIST = [
    // ===== 4 Нейтральные стартовые карты (10 в колоде: 4+4+1+1) =====
    makeCard({
      id: "sr_blade_strike",
      name: "Удар клинком",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Базовая",
      srSchoolKey: "basic",
      rewardEligible: false,
      image: "/assets/cards/shadow-reaper/sr_blade_strike.webp",
      headline: "6 урона",
      description: "Наносите выбранному врагу 6 урона.",
      tags: ["starter", "damage"],
      effects: [{ kind: "damage", amount: 6, target: "enemy" }]
    }),
    makeCard({
      id: "sr_guard_stance",
      name: "Защитная стойка",
      rarity: "common",
      cost: 1,
      type: "defense",
      school: "Базовая",
      srSchoolKey: "basic",
      rewardEligible: false,
      image: "/assets/cards/shadow-reaper/sr_guard_stance.webp",
      headline: "+5 брони",
      description: "Получаете 5 брони.",
      tags: ["starter", "armor"],
      effects: [{ kind: "armor", amount: 5, target: "self" }]
    }),
    makeCard({
      id: "sr_veil_step",
      name: "Шаг сквозь грань",
      rarity: "common",
      cost: 1,
      type: "skill",
      school: "Базовая",
      srSchoolKey: "basic",
      rewardEligible: false,
      image: "/assets/cards/shadow-reaper/sr_veil_step.webp",
      headline: "Смена формы · +4 бр. · +1 Осколок",
      description: "Переключает форму (Плоть ↔ Тень). Получаете 4 брони и +1 Осколок души.",
      tags: ["starter", "form", "armor", "shard"],
      effects: [
        { kind: "sr_toggle_form", target: "self" },
        { kind: "armor", amount: 4, target: "self" },
        { kind: "sr_gain_shards", amount: 1, target: "self" }
      ]
    }),
    makeCard({
      id: "sr_spark_extract",
      name: "Извлечение искры",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Базовая",
      srSchoolKey: "basic",
      rewardEligible: false,
      image: "/assets/cards/shadow-reaper/sr_spark_extract.webp",
      headline: "5 урона · +1 Осколок · убийство: +1 карта",
      description: "Наносите 5 урона и получаете +1 Осколок души. Если цель погибает — добор 1 карты.",
      tags: ["starter", "damage", "shard"],
      effects: [{ kind: "sr_spark_extract", amount: 5, shards: 1, killDraw: 1, target: "enemy" }]
    }),

    // ===== ШКОЛА ТЕНИ (24 карты: #01–#24) =====
    makeCard({
      id: "sr_phantom_dash",
      name: "Призрачный рывок",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_phantom_dash.webp",
      headline: "6 ур. · Форма Тени · +1 карта",
      description: "Наносите 6 урона. Переход в Форму Тени и добор 1 карты.",
      tags: ["damage", "form", "draw"],
      effects: [
        { kind: "damage", amount: 6, target: "enemy" },
        { kind: "sr_enter_form", form: "shadow", target: "self" },
        { kind: "draw_cards", amount: 1, target: "self" }
      ]
    }),
    makeCard({
      id: "sr_mist_retreat",
      name: "Туманный отход",
      rarity: "common",
      cost: 1,
      type: "skill",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_mist_retreat.webp",
      headline: "+7 брони · сброс 1 → +1 Осколок",
      description: "Получаете 7 брони. Сбросьте 1 карту из руки, чтобы получить +1 Осколок души.",
      tags: ["armor", "discard", "shard"],
      effects: [
        { kind: "armor", amount: 7, target: "self" },
        { kind: "sr_discard_for_shards", amount: 1, shardsPerDiscard: 1, target: "self" }
      ]
    }),
    makeCard({
      id: "sr_dark_whisper",
      name: "Шёпот из мрака",
      rarity: "common",
      cost: 0,
      type: "skill",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_dark_whisper.webp",
      headline: "+2 карты · сброс 1 · Тень: +1 Осколок",
      description: "Добор 2 карт, затем сбросьте 1 карту. В Форме Тени: +1 Осколок души.",
      tags: ["draw", "discard", "shard"],
      effects: [
        { kind: "draw_cards", amount: 2, target: "self" },
        { kind: "discard_from_hand", amount: 1, target: "self" },
        { kind: "sr_shadow_bonus_shards", amount: 1, target: "self" }
      ]
    }),
    makeCard({
      id: "sr_void_strike",
      name: "Удар из пустоты",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_void_strike.webp",
      headline: "7 ур. · в Тени без штрафа и игнор брони",
      description: "Наносите 7 урона. В Форме Тени не получает штраф -25% и игнорирует Броню цели.",
      tags: ["damage", "shadow"],
      effects: [{ kind: "sr_void_strike", amount: 7, target: "enemy" }]
    }),
    makeCard({
      id: "sr_dissolve",
      name: "Растворение",
      rarity: "common",
      cost: 1,
      type: "skill",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_dissolve.webp",
      headline: "Снять дебафф · Форма Тени",
      description: "Снимает Паутину и 1 ед. Слабости. Переход в Форму Тени.",
      tags: ["cleanse", "form"],
      effects: [
        { kind: "sr_dissolve", weakRemove: 1, target: "self" },
        { kind: "sr_enter_form", form: "shadow", target: "self" }
      ]
    }),
    makeCard({
      id: "sr_shadow_trail",
      name: "Теневой след",
      rarity: "common",
      cost: 1,
      type: "skill",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_shadow_trail.webp",
      headline: "+6 брони · след. ход +1 карта",
      description: "Получаете 6 брони. В начале следующего хода добираете +1 дополнительную карту.",
      tags: ["armor", "draw"],
      effects: [
        { kind: "armor", amount: 6, target: "self" },
        { kind: "sr_next_turn_draw", amount: 1, target: "self" }
      ]
    }),
    makeCard({
      id: "sr_dusk_shard",
      name: "Осколок сумрака",
      rarity: "common",
      cost: 0,
      type: "skill",
      school: "Тень",
      srSchoolKey: "shadow",
      exhaustOnPlay: true,
      image: "/assets/cards/shadow-reaper/sr_dusk_shard.webp",
      headline: "+2 Осколка · Сжигается",
      description: "Получаете +2 Осколка душ. Сжигается до конца боя.",
      tags: ["shard", "exhaust"],
      effects: [{ kind: "sr_gain_shards", amount: 2, target: "self" }]
    }),
    makeCard({
      id: "sr_gliding_blade",
      name: "Скользящий клинок",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_gliding_blade.webp",
      headline: "5 ур. (10 ур. после смены формы)",
      description: "Наносите 5 урона (10 урона, если в этом ходу уже меняли форму).",
      tags: ["damage", "form"],
      effects: [{ kind: "sr_gliding_blade", baseAmount: 5, boostedAmount: 10, target: "enemy" }]
    }),
    makeCard({
      id: "sr_hidden_pocket",
      name: "Скрытый карман",
      rarity: "common",
      cost: 1,
      type: "skill",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_hidden_pocket.webp",
      headline: "+6 брони · сохранить 1 карту",
      description: "Получаете 6 брони. В конце хода сохраняете 1 карту в руке до следующего хода.",
      tags: ["armor", "retain"],
      effects: [
        { kind: "armor", amount: 6, target: "self" },
        { kind: "sr_retain_cards", amount: 1, target: "self" }
      ]
    }),
    makeCard({
      id: "sr_step_echo",
      name: "Эхо шагов",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_step_echo.webp",
      headline: "4 ур. ×2 · Тень: +4 брони",
      description: "Наносите 4 урона дважды. В Форме Тени получаете +4 брони.",
      tags: ["damage", "armor"],
      effects: [{ kind: "sr_step_echo", amount: 4, hits: 2, shadowArmor: 4, target: "enemy" }]
    }),
    makeCard({
      id: "sr_mist_double",
      name: "Двойник из мглы",
      rarity: "uncommon",
      cost: 1,
      type: "skill",
      school: "Тень",
      srSchoolKey: "shadow",
      exhaustOnPlay: true,
      image: "/assets/cards/shadow-reaper/sr_mist_double.webp",
      headline: "В Тени: уклонение от след. атаки · Сжигается",
      description: "В Форме Тени: следующая атака врага в этом ходу промахивается (0 урона). Сжигается.",
      tags: ["dodge", "shadow", "exhaust"],
      effects: [{ kind: "sr_mist_double", target: "self" }]
    }),
    makeCard({
      id: "sr_edge_dance",
      name: "Танец граней",
      rarity: "uncommon",
      cost: 1,
      type: "power",
      school: "Тень",
      srSchoolKey: "shadow",
      exhaustOnPlay: true,
      image: "/assets/cards/shadow-reaper/sr_edge_dance.webp",
      headline: "До конца боя: смена формы → +4 брони",
      description: "До конца боя каждая смена формы (Тень ↔ Плоть) даёт +4 брони.",
      tags: ["power", "form", "armor"],
      effects: [{ kind: "sr_power_flag", flag: "srEdgeDanceArmor", amount: 4, mode: "add", target: "self" }]
    }),
    makeCard({
      id: "sr_phase_steel",
      name: "Проход сквозь сталь",
      rarity: "uncommon",
      cost: 2,
      type: "attack",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_phase_steel.webp",
      headline: "12 ур. · игнор Брони и Бесплотности · Тень: 1 эн.",
      description: "Наносите 12 урона, игнорируя Броню и Бесплотность врага. В Форме Тени стоит 1 энергии.",
      tags: ["damage", "pierce", "shadow"],
      effects: [{ kind: "damage", amount: 12, ignoreArmor: true, ignoreEthereal: true, target: "enemy" }]
    }),
    makeCard({
      id: "sr_curse_devour",
      name: "Поглощение проклятия",
      rarity: "uncommon",
      cost: 0,
      type: "skill",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_curse_devour.webp",
      headline: "Сжечь проклятие → +1 эн. · +2 Осколка",
      description: "Сожгите 1 проклятие или статус в руке, чтобы получить +1 энергии и +2 Осколка душ.",
      tags: ["cleanse", "energy", "shard"],
      effects: [{ kind: "sr_curse_devour", energyGain: 1, shardGain: 2, target: "self" }]
    }),
    makeCard({
      id: "sr_instant_shift",
      name: "Мгновенный сдвиг",
      rarity: "uncommon",
      cost: 0,
      type: "skill",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_instant_shift.webp",
      headline: "Смена формы · +1 карта",
      description: "Мгновенно смените текущую форму (Тень ↔ Плоть). Добор 1 карты.",
      tags: ["form", "draw"],
      effects: [
        { kind: "sr_toggle_form", target: "self" },
        { kind: "draw_cards", amount: 1, target: "self" }
      ]
    }),
    makeCard({
      id: "sr_silence_veil",
      name: "Завеса безмолвия",
      rarity: "uncommon",
      cost: 2,
      type: "skill",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_silence_veil.webp",
      headline: "+12 бр. · Форма Тени · +1 Осколок за карты 0 эн.",
      description: "Получаете +12 брони и переходите в Форму Тени. Каждая карта в руке с ценой 0 даёт +1 Осколок.",
      tags: ["armor", "form", "shard"],
      effects: [
        { kind: "armor", amount: 12, target: "self" },
        { kind: "sr_enter_form", form: "shadow", target: "self" },
        { kind: "sr_shards_per_zero_cost", amount: 1, target: "self" }
      ]
    }),
    makeCard({
      id: "sr_cold_calculus",
      name: "Холодный расчёт",
      rarity: "uncommon",
      cost: 1,
      type: "skill",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_cold_calculus.webp",
      headline: "Топ-3: 1 в руку, 2 в сброс (+1 Осколок за сброс)",
      description: "Смотрите 3 верхние карты колоды: 1 выбираете в руку, остальные сбрасываете (+1 Осколок за каждую сброшенную).",
      tags: ["scry", "draw", "shard"],
      effects: [{ kind: "sr_cold_calculus", lookCount: 3, keepCount: 1, shardPerDiscard: 1, target: "self" }]
    }),
    makeCard({
      id: "sr_shadow_parity",
      name: "Теневой паритет",
      rarity: "uncommon",
      cost: 1,
      type: "power",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_shadow_parity.webp",
      exhaustOnPlay: true,
      headline: "До конца боя: в Тени нет штрафа -25% к атакам",
      description: "До конца боя в Форме Тени штраф -25% к урону атак полностью убирается.",
      tags: ["power", "shadow"],
      effects: [{ kind: "sr_power_flag", flag: "srNoShadowPenalty", value: true, mode: "bool", target: "self" }]
    }),
    makeCard({
      id: "sr_eternal_dusk",
      name: "Вечные сумерки",
      rarity: "rare",
      cost: 2,
      type: "power",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_eternal_dusk.webp",
      exhaustOnPlay: true,
      headline: "До конца боя: сохранение Тени и +1 Осколок/ход",
      description: "До конца боя вы сохраняете Форму Тени между ходами; в начале каждого хода в Тени получаете +1 Осколок души.",
      tags: ["power", "shadow", "shard"],
      effects: [{ kind: "sr_power_flag", flag: "srPersistShadow", amount: 1, mode: "add", target: "self" }]
    }),
    makeCard({
      id: "sr_void_mirror",
      name: "Зеркало пустоты",
      rarity: "rare",
      cost: 1,
      type: "skill",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_void_mirror.webp",
      headline: "В Тени: след. Навык или Атака ×2",
      description: "Если вы в Форме Тени, следующая сыгранная карта Навыка или Атаки в этом ходу срабатывает дважды.",
      tags: ["combo", "shadow"],
      effects: [{ kind: "sr_void_mirror", target: "self" }]
    }),
    makeCard({
      id: "sr_vanish",
      name: "Исчезновение",
      rarity: "rare",
      cost: 2,
      type: "skill",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_vanish.webp",
      exhaustOnPlay: true,
      headline: "Форма Тени · 0 урона от всех атак · Сжигается",
      description: "Переход в Форму Тени; до начала следующего хода вы получаете 0 урона от всех атак врагов. Сжигается.",
      tags: ["form", "dodge", "exhaust"],
      effects: [
        { kind: "sr_enter_form", form: "shadow", target: "self" },
        { kind: "sr_full_dodge", target: "self" }
      ]
    }),
    makeCard({
      id: "sr_edge_master",
      name: "Повелитель граней",
      rarity: "rare",
      cost: 3,
      type: "power",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_edge_master.webp",
      exhaustOnPlay: true,
      headline: "До конца боя: 1-я смена формы/ход → +1 эн. и +2 карты",
      description: "До конца боя первая смена формы в каждом ходу даёт +1 энергии и добор 2 карт.",
      tags: ["power", "form", "energy", "draw"],
      effects: [{ kind: "sr_power_flag", flag: "srEdgeMaster", value: true, mode: "bool", target: "self" }]
    }),
    makeCard({
      id: "sr_faceless_lord",
      name: "Владыка Безликих",
      rarity: "legendary",
      cost: 3,
      type: "power",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_faceless_lord.webp",
      exhaustOnPlay: true,
      headline: "До конца боя: Тень + Плоть одновременно",
      description: "До конца боя вы одновременно в Форме Тени и Плоти (-50% входящего урона без штрафа -25%, бонусы обеих форм). Первая смена формы за ход даёт +1 карту и +1 Осколок.",
      tags: ["power", "legendary", "form"],
      effects: [{ kind: "sr_faceless_lord", target: "self" }]
    }),
    makeCard({
      id: "sr_world_eclipse",
      name: "Затмение Мира",
      rarity: "legendary",
      cost: 2,
      type: "power",
      school: "Тень",
      srSchoolKey: "shadow",
      image: "/assets/cards/shadow-reaper/sr_world_eclipse.webp",
      exhaustOnPlay: true,
      headline: "Тень · промах всех атак · 8 ур. и +1 Оск. за уклонение",
      description: "Переход в Форму Тени; до следующего хода все атаки врагов промахиваются (0 урона). До конца боя каждый раз при уклонении или снижении урона в Тени случайный враг получает 8 урона, а вы +1 Осколок души.",
      tags: ["power", "legendary", "dodge", "shadow"],
      effects: [
        { kind: "sr_enter_form", form: "shadow", target: "self" },
        { kind: "sr_full_dodge", target: "self" },
        { kind: "sr_power_flag", flag: "srEclipseDamage", amount: 8, mode: "add", target: "self" }
      ]
    }),

    // ===== ШКОЛА ЖАТВЫ (24 карты: #25–#48) =====
    makeCard({
      id: "sr_harvest_reap",
      name: "Сбор жатвы",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_harvest_reap.webp",
      headline: "7 урона · убийство: +3 Осколка и +1 эн.",
      description: "Наносите 7 урона. При убийстве цели получаете +3 Осколка душ и +1 энергии.",
      tags: ["damage", "shard", "energy"],
      effects: [{ kind: "sr_harvest_reap", amount: 7, killShards: 3, killEnergy: 1, target: "enemy" }]
    }),
    makeCard({
      id: "sr_shard_burst",
      name: "Разряд осколков",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_shard_burst.webp",
      headline: "Тратит до 3 Осколков: 6 + 4×Осколки ур.",
      description: "Тратит до 3 Осколков душ: наносит 6 + 4 урона за каждый потраченный Осколок.",
      tags: ["damage", "shard_spend"],
      effects: [{ kind: "sr_shard_burst", baseDamage: 6, perShard: 4, maxSpend: 3, target: "enemy" }]
    }),
    makeCard({
      id: "sr_blade_fan",
      name: "Веер клинков",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_blade_fan.webp",
      headline: "5 урона всем · +1 Осколок за каждого врага",
      description: "Наносите 5 урона всем врагам. Получаете +1 Осколок души за каждого задетого врага.",
      tags: ["damage", "aoe", "shard"],
      effects: [{ kind: "sr_blade_fan", amount: 5, shardsPerHit: 1, target: "all_enemies" }]
    }),
    makeCard({
      id: "sr_exact_cut",
      name: "Точный разрез",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_exact_cut.webp",
      headline: "9 урона (+4, если сыграно ≤2 карт)",
      description: "Наносите 9 урона. Если в этом ходу сыграно ≤2 карт — наносит +4 урона.",
      tags: ["damage"],
      effects: [{ kind: "sr_exact_cut", baseDamage: 9, bonusDamage: 4, maxCardsPlayed: 2, target: "enemy" }]
    }),
    makeCard({
      id: "sr_double_slash",
      name: "Двойной росчерк",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_double_slash.webp",
      headline: "4 урона ×2 · в Плоти +1 Осколок за удар",
      description: "Наносите 4 урона дважды. В Форме Плоти каждый удар даёт +1 Осколок души.",
      tags: ["damage", "flesh", "shard"],
      effects: [{ kind: "sr_double_slash", amount: 4, hits: 2, fleshShardsPerHit: 1, target: "enemy" }]
    }),
    makeCard({
      id: "sr_spirit_hone",
      name: "Заточка духом",
      rarity: "common",
      cost: 0,
      type: "skill",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_spirit_hone.webp",
      requiresShards: 1,
      headline: "-1 Осколок → след. Атака +6 урона",
      description: "Потратьте 1 Осколок души, чтобы следующая Атака в этом ходу нанесла +6 урона.",
      tags: ["shard_spend", "buff"],
      effects: [{ kind: "sr_spirit_hone", shardCost: 1, bonusDamage: 6, target: "self" }]
    }),
    makeCard({
      id: "sr_reaper_wedge",
      name: "Клин жнеца",
      rarity: "common",
      cost: 2,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_reaper_wedge.webp",
      headline: "14 ур. · Форма Плоти · по Броне +5 ур.",
      description: "Переход в Форму Плоти. Наносите 14 урона (+5 урона, если у врага есть Броня).",
      tags: ["damage", "form"],
      effects: [{ kind: "sr_reaper_wedge", baseDamage: 14, armorBonus: 5, target: "enemy" }]
    }),
    makeCard({
      id: "sr_shard_vortex",
      name: "Вихрь осколков",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_shard_vortex.webp",
      requiresShards: 2,
      headline: "-2 Осколка → 4 урона ×3 случайным врагам",
      description: "Потратьте 2 Осколка душ, чтобы нанести 4 урона трижды случайным врагам.",
      tags: ["damage", "shard_spend"],
      effects: [{ kind: "sr_shard_vortex", shardCost: 2, amount: 4, hits: 3, target: "all_enemies" }]
    }),
    makeCard({
      id: "sr_soul_blood_trail",
      name: "Кровавый след души",
      rarity: "common",
      cost: 1,
      type: "skill",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_soul_blood_trail.webp",
      headline: "+2 Осколка · если 4+ Осколков: +2 карты",
      description: "Получаете +2 Осколка душ. Если у вас уже 4 или больше Осколков — добираете 2 карты.",
      tags: ["shard", "draw"],
      effects: [{ kind: "sr_soul_blood_trail", shards: 2, threshold: 4, drawAmount: 2, target: "self" }]
    }),
    makeCard({
      id: "sr_hunter_lunge",
      name: "Охотничий выпад",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_hunter_lunge.webp",
      headline: "8 ур. (13 ур., если у цели <50% HP)",
      description: "Наносите 8 урона (13 урона, если у цели меньше 50% HP).",
      tags: ["damage", "execute"],
      effects: [{ kind: "sr_hunter_lunge", baseDamage: 8, executeDamage: 13, target: "enemy" }]
    }),
    makeCard({
      id: "sr_soul_harvest",
      name: "Жатва душ",
      rarity: "uncommon",
      cost: 2,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_soul_harvest.webp",
      headline: "Тратит ВСЕ Осколки: 8 + 5×Оск. (≤3 карт: +30%)",
      description: "Тратит ВСЕ Осколки душ: наносит 8 + 5×Осколки урона. Если сыграно ≤3 карт за ход — +30% урона.",
      tags: ["damage", "shard_spend", "finisher"],
      effects: [{ kind: "sr_soul_harvest", baseDamage: 8, perShard: 5, maxCardsBonus: 3, bonusMult: 1.3, target: "enemy" }]
    }),
    makeCard({
      id: "sr_amethyst_flash",
      name: "Вспышка аметиста",
      rarity: "uncommon",
      cost: 1,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_amethyst_flash.webp",
      requiresShards: 2,
      headline: "-2 Осколка → 11 ур. всем (игнор Брони)",
      description: "Потратьте 2 Осколка душ: наносите 11 урона всем врагам, игнорируя Броню.",
      tags: ["damage", "aoe", "pierce", "shard_spend"],
      effects: [{ kind: "sr_amethyst_flash", shardCost: 2, amount: 11, target: "all_enemies" }]
    }),
    makeCard({
      id: "sr_blade_resonance",
      name: "Резонанс клинков",
      rarity: "uncommon",
      cost: 1,
      type: "power",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_blade_resonance.webp",
      exhaustOnPlay: true,
      headline: "До конца боя: трата Осколков → +1 Ярости на ход",
      description: "До конца боя каждая трата Осколков душ даёт +1 Ярости (+1 к урону атак) до конца хода.",
      tags: ["power", "shard_spend", "rage"],
      effects: [{ kind: "sr_power_flag", flag: "srBladeResonance", amount: 1, mode: "add", target: "self" }]
    }),
    makeCard({
      id: "sr_soul_overflow",
      name: "Переполнение",
      rarity: "uncommon",
      cost: 1,
      type: "power",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_soul_overflow.webp",
      exhaustOnPlay: true,
      headline: "До конца боя: лишний Осколок → 5 ур. случ. врагу",
      description: "До конца боя каждый Осколок души сверх лимита наносит 5 урона случайному врагу.",
      tags: ["power", "shard", "damage"],
      effects: [{ kind: "sr_power_flag", flag: "srOverflowDmg", amount: 5, mode: "add", target: "self" }]
    }),
    makeCard({
      id: "sr_unhurried_exec",
      name: "Казнь без спешки",
      rarity: "uncommon",
      cost: 2,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_unhurried_exec.webp",
      headline: "18 урона · завершает ход · Форма Тени",
      description: "Наносите 18 урона. Немедленно завершает ваш ход и переводит вас в Форму Тени.",
      tags: ["damage", "form"],
      effects: [
        { kind: "damage", amount: 18, target: "enemy" },
        { kind: "sr_enter_form", form: "shadow", target: "self" },
        { kind: "sr_force_end_turn", target: "self" }
      ]
    }),
    makeCard({
      id: "sr_essence_siphon",
      name: "Вытягивание эссенции",
      rarity: "uncommon",
      cost: 1,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_essence_siphon.webp",
      exhaustOnPlay: true,
      headline: "8 ур. · -2 Осколка → +5 HP · Сжигается",
      description: "Наносите 8 урона. Если есть 2+ Осколка, тратит 2 Осколка и восстанавливает 5 HP. Сжигается.",
      tags: ["damage", "heal", "shard_spend", "exhaust"],
      effects: [{ kind: "sr_essence_siphon", amount: 8, shardCost: 2, healAmount: 5, target: "enemy" }]
    }),
    makeCard({
      id: "sr_triple_verdict",
      name: "Тройной приговор",
      rarity: "uncommon",
      cost: 2,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_triple_verdict.webp",
      headline: "5 ур. ×3 (+2 за удар после Тень→Плоть)",
      description: "Наносите 5 урона трижды. Если в этом ходу вы переходили из Тени в Плоть — +2 к каждому удару.",
      tags: ["damage", "form"],
      effects: [{ kind: "sr_triple_verdict", amount: 5, hits: 3, shiftBonus: 2, target: "enemy" }]
    }),
    makeCard({
      id: "sr_crystal_fury",
      name: "Хрустальная ярость",
      rarity: "uncommon",
      cost: 1,
      type: "skill",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_crystal_fury.webp",
      exhaustOnPlay: true,
      requiresShards: 3,
      headline: "-3 Осколка → +2 Ярости до конца боя · Сжигается",
      description: "Потратьте 3 Осколка душ: получаете +2 Ярости (+2 к урону всех атак) до конца боя. Сжигается.",
      tags: ["shard_spend", "rage", "exhaust"],
      effects: [{ kind: "sr_crystal_fury", shardCost: 3, rageAmount: 2, target: "self" }]
    }),
    makeCard({
      id: "sr_reaper_apotheosis",
      name: "Апофеоз Жнеца",
      rarity: "rare",
      cost: 2,
      type: "power",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_reaper_apotheosis.webp",
      exhaustOnPlay: true,
      headline: "До конца боя: макс. Осколков = 10 · +2 каждые 2 хода",
      description: "До конца боя максимум Осколков душ увеличивается до 10; сразу и в начале каждого 2-го хода получаете +2 Осколка.",
      tags: ["power", "shard"],
      effects: [{ kind: "sr_reaper_apotheosis", newMax: 10, periodicShards: 2, target: "self" }]
    }),
    makeCard({
      id: "sr_soul_rift",
      name: "Разлом душ",
      rarity: "rare",
      cost: 3,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_soul_rift.webp",
      headline: "24 урона всем · цена -1 за каждые 2 Осколка",
      description: "Наносите 24 урона всем врагам. Цена снижается на 1 за каждые 2 имеющихся Осколка (не тратит их).",
      tags: ["damage", "aoe", "shard"],
      effects: [{ kind: "sr_aoe_damage", amount: 24, target: "all_enemies" }]
    }),
    makeCard({
      id: "sr_final_stroke",
      name: "Последний штрих",
      rarity: "rare",
      cost: 1,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_final_stroke.webp",
      headline: "10 ур. · если 3-я карта: ×2 ур. и возврат в руку",
      description: "Наносите 10 урона. Если это 3-я карта в ходу — урон удваивается и карта возвращается в руку (1 раз за ход).",
      tags: ["damage", "combo"],
      effects: [{ kind: "sr_final_stroke", baseDamage: 10, targetCardNumber: 3, target: "enemy" }]
    }),
    makeCard({
      id: "sr_oblivion_scythe",
      name: "Коса забвения",
      rarity: "rare",
      cost: 2,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_oblivion_scythe.webp",
      headline: "Тратит ВСЕ Осколки: 7×Осколки ур. · игнор Бесплотности",
      description: "Тратит ВСЕ Осколки душ: наносит 7 урона за каждый Осколок, игнорируя Бесплотность врага.",
      tags: ["damage", "shard_spend", "pierce"],
      effects: [{ kind: "sr_oblivion_scythe", perShard: 7, target: "enemy" }]
    }),
    makeCard({
      id: "sr_reaper_heart",
      name: "Сердце Жнеца",
      rarity: "legendary",
      cost: 3,
      type: "power",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_reaper_heart.webp",
      exhaustOnPlay: true,
      headline: "До конца боя: возврат 50% Осколков · +1 ур./потраченный",
      description: "До конца боя все траты Осколков возвращают 50% (округл. вверх). Каждый потраченный Осколок до конца боя даёт +1 к урону всех Атак.",
      tags: ["power", "legendary", "shard"],
      effects: [{ kind: "sr_power_flag", flag: "srHeartActive", value: true, mode: "bool", target: "self" }]
    }),
    makeCard({
      id: "sr_judgment_hour",
      name: "Судный Час",
      rarity: "legendary",
      cost: 2,
      type: "attack",
      school: "Жатва",
      srSchoolKey: "reap",
      image: "/assets/cards/shadow-reaper/sr_judgment_hour.webp",
      headline: "Тратит ВСЕ Осколки: 12×Оск. всем · убийство: рефреш",
      description: "Тратит ВСЕ Осколки душ: 12 урона × Осколки ВСЕМ врагам, игнорируя Броню и Бесплотность. Если убит ≥1 враг — восстанавливает всю энергию и возвращает карту в руку (1 раз за бой).",
      tags: ["damage", "aoe", "legendary", "shard_spend"],
      effects: [{ kind: "sr_judgment_hour", perShard: 12, target: "all_enemies" }]
    }),

    // ===== ШКОЛА ОКОВ (26 карт: #49–#74) =====
    makeCard({
      id: "sr_restraint_chain",
      name: "Цепь сдерживания",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_restraint_chain.webp",
      headline: "6 урона · +2 Оков",
      description: "Наносите 6 урона и накладываете +2 Оков на цель.",
      tags: ["damage", "shackles"],
      effects: [
        { kind: "damage", amount: 6, target: "enemy" },
        { kind: "sr_apply_shackles", amount: 2, target: "enemy" }
      ]
    }),
    makeCard({
      id: "sr_break_aim",
      name: "Сбить прицел",
      rarity: "common",
      cost: 1,
      type: "skill",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_break_aim.webp",
      headline: "+5 брони · враг с атакой ≥10: -5 урона",
      description: "Получаете +5 брони. Если выбранный враг готовит атаку ≥10 урона — снижает её урон на 5 в этом ходу.",
      tags: ["armor", "debuff"],
      effects: [
        { kind: "armor", amount: 5, target: "self" },
        { kind: "sr_break_aim", threshold: 10, reduce: 5, target: "enemy" }
      ]
    }),
    makeCard({
      id: "sr_soul_knot",
      name: "Узел душ",
      rarity: "common",
      cost: 1,
      type: "skill",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_soul_knot.webp",
      headline: "Связь душ на 2 врагов (2 хода, 40% урона)",
      description: "Связывает цель и ещё 1 врага на 2 хода: 40% получаемого урона передаётся второму.",
      tags: ["soul_link", "debuff"],
      effects: [{ kind: "sr_soul_link", count: 2, turns: 2, pct: 0.4, target: "enemy" }]
    }),
    makeCard({
      id: "sr_silence_cuffs",
      name: "Кандалы молчания",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_silence_cuffs.webp",
      headline: "7 ур. · враг не атакует: +2 Оск. и +4 Оков",
      description: "Наносите 7 урона. Если цель не атакует в этом ходу — получаете +2 Осколка и накладываете +4 Оков.",
      tags: ["damage", "shackles", "shard"],
      effects: [{ kind: "sr_silence_cuffs", amount: 7, bonusShards: 2, bonusShackles: 4, target: "enemy" }]
    }),
    makeCard({
      id: "sr_shield_shatter",
      name: "Раскол щита",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_shield_shatter.webp",
      headline: "Снять всю Броню врага · затем 6 урона",
      description: "Снимает всю Броню выбранного врага, затем наносит ему 6 урона.",
      tags: ["damage", "strip_armor"],
      effects: [
        { kind: "sr_strip_armor", target: "enemy" },
        { kind: "damage", amount: 6, target: "enemy" }
      ]
    }),
    makeCard({
      id: "sr_chain_grip",
      name: "Хватка цепи",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_chain_grip.webp",
      headline: "5 + 2×Оковы урона",
      description: "Наносите 5 урона + 2 урона за каждый заряд Оков на цели.",
      tags: ["damage", "shackles"],
      effects: [{ kind: "sr_chain_grip", baseDamage: 5, perShackle: 2, target: "enemy" }]
    }),
    makeCard({
      id: "sr_iron_weight",
      name: "Тяжесть железа",
      rarity: "common",
      cost: 1,
      type: "skill",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_iron_weight.webp",
      headline: "+6 брони · +3 Оков цели",
      description: "Получаете +6 брони и накладываете +3 Оков на выбранного врага.",
      tags: ["armor", "shackles"],
      effects: [
        { kind: "armor", amount: 6, target: "self" },
        { kind: "sr_apply_shackles", amount: 3, target: "enemy" }
      ]
    }),
    makeCard({
      id: "sr_seize_init",
      name: "Перехват инициативы",
      rarity: "common",
      cost: 0,
      type: "skill",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_seize_init.webp",
      headline: "Враг баффается/защищается → +2 карты и +1 Оск.",
      description: "Если выбранный враг готовит бафф, защиту или проклятие — добор 2 карт и +1 Осколок души.",
      tags: ["draw", "shard"],
      effects: [{ kind: "sr_seize_init", drawAmount: 2, shardAmount: 1, target: "enemy" }]
    }),
    makeCard({
      id: "sr_chain_yank",
      name: "Рывок за цепь",
      rarity: "common",
      cost: 1,
      type: "attack",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_chain_yank.webp",
      headline: "8 урона · если Оковы на цели: +5 брони",
      description: "Наносите 8 урона. Если на цели есть Оковы — получаете +5 брони.",
      tags: ["damage", "armor", "shackles"],
      effects: [{ kind: "sr_chain_yank", amount: 8, armorBonus: 5, target: "enemy" }]
    }),
    makeCard({
      id: "sr_dispel_charms",
      name: "Сброс чар",
      rarity: "common",
      cost: 1,
      type: "skill",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_dispel_charms.webp",
      headline: "Снять Бесплотность или 2 Ярости · +4 брони",
      description: "Снимает с выбранного врага Бесплотность или 2 ед. Ярости. Получаете +4 брони.",
      tags: ["dispel", "armor"],
      effects: [
        { kind: "sr_dispel_charms", furyRemove: 2, target: "enemy" },
        { kind: "armor", amount: 4, target: "self" }
      ]
    }),
    makeCard({
      id: "sr_ritual_disrupt",
      name: "Срыв ритуала",
      rarity: "uncommon",
      cost: 2,
      type: "attack",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_ritual_disrupt.webp",
      headline: "10 ур. · срыв баффа/призыва · -50% атаки врага",
      description: "Наносите 10 урона. Отменяет усиленную атаку и призыв врага в этом ходу (враг наносит 50% урона).",
      tags: ["damage", "debuff"],
      effects: [
        { kind: "damage", amount: 10, target: "enemy" },
        { kind: "sr_ritual_disrupt", target: "enemy" }
      ]
    }),
    makeCard({
      id: "sr_shackle_net",
      name: "Сеть кандалов",
      rarity: "uncommon",
      cost: 1,
      type: "skill",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_shackle_net.webp",
      headline: "+4 Оков всем врагам · Тень: +6 брони",
      description: "Накладывает +4 Оков ВСЕМ врагам. В Форме Тени получаете +6 брони.",
      tags: ["shackles", "aoe", "armor"],
      effects: [{ kind: "sr_shackle_net", shackles: 4, shadowArmor: 6, target: "all_enemies" }]
    }),
    makeCard({
      id: "sr_mirror_bonds",
      name: "Зеркальные узы",
      rarity: "uncommon",
      cost: 1,
      type: "skill",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_mirror_bonds.webp",
      headline: "50% входящего урона отражается во врага с Оковами",
      description: "До конца хода 50% получаемого вами урона отражается во врага с Оковами.",
      tags: ["reflect", "shackles"],
      effects: [{ kind: "sr_mirror_bonds", pct: 0.5, target: "self" }]
    }),
    makeCard({
      id: "sr_armor_theft",
      name: "Кража брони",
      rarity: "uncommon",
      cost: 1,
      type: "skill",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_armor_theft.webp",
      headline: "Забрать до 10 Брони у врага себе",
      description: "Забирает до 10 Брони у выбранного врага и передаёт её вам.",
      tags: ["armor", "strip_armor"],
      effects: [{ kind: "sr_armor_theft", maxSteal: 10, target: "enemy" }]
    }),
    makeCard({
      id: "sr_time_loop",
      name: "Петля времени",
      rarity: "uncommon",
      cost: 1,
      type: "skill",
      school: "Оковы",
      srSchoolKey: "shackles",
      requiresShards: 2,
      image: "/assets/cards/shadow-reaper/sr_time_loop.webp",
      headline: "-2 Осколка → вернуть карту из сброса (-1 эн.)",
      description: "Потратьте 2 Осколка душ: верните 1 карту из сброса в руку со скидкой -1 к цене в этом ходу.",
      tags: ["shard_spend", "recycle"],
      effects: [{ kind: "sr_time_loop", shardCost: 2, discount: 1, target: "self" }]
    }),
    makeCard({
      id: "sr_linked_fates",
      name: "Связанные судьбы",
      rarity: "uncommon",
      cost: 2,
      type: "skill",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_linked_fates.webp",
      headline: "Связь ВСЕХ врагов (2 хода, 50%) · +2 Оков всем",
      description: "Связывает ВСЕХ врагов на 2 хода (50% урона делится) и накладывает +2 Оков всем врагам.",
      tags: ["soul_link", "shackles", "aoe"],
      effects: [
        { kind: "sr_soul_link", count: 99, turns: 2, pct: 0.5, target: "all_enemies" },
        { kind: "sr_apply_shackles", amount: 2, target: "all_enemies" }
      ]
    }),
    makeCard({
      id: "sr_numbing_cold",
      name: "Окоченение",
      rarity: "uncommon",
      cost: 1,
      type: "power",
      school: "Оковы",
      srSchoolKey: "shackles",
      exhaustOnPlay: true,
      image: "/assets/cards/shadow-reaper/sr_numbing_cold.webp",
      headline: "До конца боя: срабатывание Оков → +1 Осколок",
      description: "До конца боя каждое срабатывание Оков даёт вам +1 Осколок души.",
      tags: ["power", "shackles", "shard"],
      effects: [{ kind: "sr_power_flag", flag: "srFrostbite", amount: 1, mode: "add", target: "self" }]
    }),
    makeCard({
      id: "sr_prison_bell",
      name: "Тюремный звон",
      rarity: "uncommon",
      cost: 1,
      type: "skill",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_prison_bell.webp",
      headline: "Активирует Оковы цели (урон = Оковы ×2)",
      description: "Немедленно активирует Оковы на выбранной цели (урон = Оковы × 2), не снимая их.",
      tags: ["shackles", "damage"],
      effects: [{ kind: "sr_prison_bell", multiplier: 2, target: "enemy" }]
    }),
    makeCard({
      id: "sr_summon_ban",
      name: "Запрет призыва",
      rarity: "uncommon",
      cost: 1,
      type: "skill",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_summon_ban.webp",
      headline: "2 хода: без Брони и призыва · +1 Осколок",
      description: "На 2 хода цель не может получать Броню и призывать союзников. Вы получаете +1 Осколок души.",
      tags: ["debuff", "shard"],
      effects: [
        { kind: "sr_summon_ban", turns: 2, target: "enemy" },
        { kind: "sr_gain_shards", amount: 1, target: "self" }
      ]
    }),
    makeCard({
      id: "sr_eternal_shackles",
      name: "Оковы вечности",
      rarity: "rare",
      cost: 2,
      type: "power",
      school: "Оковы",
      srSchoolKey: "shackles",
      exhaustOnPlay: true,
      image: "/assets/cards/shadow-reaper/sr_eternal_shackles.webp",
      headline: "До конца боя: Оковы не спадают и бьют при атаке",
      description: "До конца боя Оковы не спадают между ходами и срабатывают при каждой атаке врага.",
      tags: ["power", "shackles"],
      effects: [{ kind: "sr_power_flag", flag: "srEternalShackles", value: true, mode: "bool", target: "self" }]
    }),
    makeCard({
      id: "sr_soul_paralysis",
      name: "Паралич души",
      rarity: "rare",
      cost: 2,
      type: "skill",
      school: "Оковы",
      srSchoolKey: "shackles",
      exhaustOnPlay: true,
      requiresShards: 4,
      image: "/assets/cards/shadow-reaper/sr_soul_paralysis.webp",
      headline: "-4 Осколка → оглушение врага на 1 ход · Сжигается",
      description: "Потратьте 4 Осколка душ, чтобы оглушить выбранного врага на 1 ход (пропустит ход). Сжигается.",
      tags: ["stun", "shard_spend", "exhaust"],
      effects: [{ kind: "sr_soul_paralysis", shardCost: 4, stunTurns: 1, target: "enemy" }]
    }),
    makeCard({
      id: "sr_chain_judgment",
      name: "Суд цепей",
      rarity: "rare",
      cost: 2,
      type: "attack",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_chain_judgment.webp",
      headline: "Удваивает Оковы цели · урон = новые Оковы ×2",
      description: "Удваивает Оковы на цели, затем наносит ей урон, равный новому числу Оков × 2.",
      tags: ["damage", "shackles"],
      effects: [{ kind: "sr_chain_judgment", multiplier: 2, target: "enemy" }]
    }),
    makeCard({
      id: "sr_sever_link",
      name: "Разрыв связи",
      rarity: "rare",
      cost: 1,
      type: "attack",
      school: "Оковы",
      srSchoolKey: "shackles",
      image: "/assets/cards/shadow-reaper/sr_sever_link.webp",
      headline: "12 ур. · связанным врагам передаётся 100% урона",
      description: "Наносите 12 урона. Если цель связана — передаёт 100% нанесённого урона всем остальным связанным врагам.",
      tags: ["damage", "soul_link"],
      effects: [{ kind: "sr_sever_link", amount: 12, target: "enemy" }]
    }),
    makeCard({
      id: "sr_warden_verdict",
      name: "Приговор Хранителя",
      rarity: "rare",
      cost: 3,
      type: "power",
      school: "Оковы",
      srSchoolKey: "shackles",
      exhaustOnPlay: true,
      image: "/assets/cards/shadow-reaper/sr_warden_verdict.webp",
      headline: "До конца боя: в начале хода +2 Оков всем и -4 к 1-й атаке",
      description: "До конца боя в начале каждого хода накладывает +2 Оков всем врагам и снижает урон первой атаки по вам на 4.",
      tags: ["power", "shackles", "defense"],
      effects: [{ kind: "sr_warden_verdict", shacklesPerTurn: 2, firstHitReduce: 4, target: "self" }]
    }),
    makeCard({
      id: "sr_soul_prison",
      name: "Тюрьма Душ",
      rarity: "legendary",
      cost: 3,
      type: "power",
      school: "Оковы",
      srSchoolKey: "shackles",
      exhaustOnPlay: true,
      image: "/assets/cards/shadow-reaper/sr_soul_prison.webp",
      headline: "До конца боя: все связаны (50%) · триггер Оков по всем +4 бр.",
      description: "До конца боя все враги постоянно связаны (50% урона делится). При получении врагом Брони, баффа или призыва ВСЕ враги получают урон = сумме всех Оков на поле, а вы +4 брони.",
      tags: ["power", "legendary", "soul_link", "shackles"],
      effects: [{ kind: "sr_soul_prison", armorGain: 4, target: "self" }]
    }),
    makeCard({
      id: "sr_absolute_ban",
      name: "Абсолютный Запрет",
      rarity: "legendary",
      cost: 2,
      type: "skill",
      school: "Оковы",
      srSchoolKey: "shackles",
      exhaustOnPlay: true,
      image: "/assets/cards/shadow-reaper/sr_absolute_ban.webp",
      headline: "+6 Оков всем · снять Броню/Беспл./Ярость · оглушить всех",
      description: "Накладывает +6 Оков всем врагам, снимает всю Броню, Бесплотность и Ярость, и оглушает всех врагов на 1 ход. Сжигается.",
      tags: ["legendary", "shackles", "stun", "dispel", "exhaust"],
      effects: [{ kind: "sr_absolute_ban", shackles: 6, stunTurns: 1, target: "all_enemies" }]
    })
  ];

  const CARD_MAP = {};
  for (let i = 0; i < CARD_LIST.length; i++) {
    CARD_MAP[CARD_LIST[i].id] = CARD_LIST[i];
  }

  const UPGRADE_SPECS = Object.freeze({
    // ===== 4 Стартовые карты =====
    sr_blade_strike: {
      headline: "9 урона",
      description: "Наносите выбранному врагу 9 урона.",
      patchEffect(e) { e.amount = 9; }
    },
    sr_guard_stance: {
      headline: "+8 брони",
      description: "Получаете 8 брони.",
      patchEffect(e) { e.amount = 8; }
    },
    sr_veil_step: {
      headline: "Смена формы · +7 бр. · +1 Осколок",
      description: "Переключает форму (Плоть ↔ Тень). Получаете 7 брони и +1 Осколок души.",
      patchEffect(e) { if (e.kind === "armor") e.amount = 7; }
    },
    sr_spark_extract: {
      headline: "8 урона · +1 Осколок · убийство: +1 карта",
      description: "Наносите 8 урона и получаете +1 Осколок души. Если цель погибает — добор 1 карты.",
      patchEffect(e) { e.amount = 8; }
    },

    // ===== ШКОЛА ТЕНИ (24 карты) =====
    sr_phantom_dash: {
      headline: "9 ур. · Форма Тени · +1 карта",
      description: "Наносите 9 урона. Переход в Форму Тени и добор 1 карты.",
      patchEffect(e) { if (e.kind === "damage") e.amount = 9; }
    },
    sr_mist_retreat: {
      headline: "+10 брони · сброс 1 → +1 Осколок",
      description: "Получаете 10 брони. Сбросьте 1 карту из руки, чтобы получить +1 Осколок души.",
      patchEffect(e) { if (e.kind === "armor") e.amount = 10; }
    },
    sr_dark_whisper: {
      headline: "+3 карты · сброс 1 · Тень: +1 Осколок",
      description: "Добор 3 карт, затем сбросьте 1 карту. В Форме Тени: +1 Осколок души.",
      patchEffect(e) { if (e.kind === "draw_cards") e.amount = 3; }
    },
    sr_void_strike: {
      headline: "10 ур. · в Тени без штрафа и игнор брони",
      description: "Наносите 10 урона. В Форме Тени не получает штраф -25% и игнорирует Броню цели.",
      patchEffect(e) { e.amount = 10; }
    },
    sr_dissolve: {
      cost: 0,
      headline: "Снять дебаффы · Форма Тени",
      description: "Снимает Паутину и до 2 ед. Слабости. Переход в Форму Тени.",
      patchEffect(e) { if (e.kind === "sr_dissolve") e.weakRemove = 2; }
    },
    sr_shadow_trail: {
      headline: "+9 брони · след. ход +1 карта",
      description: "Получаете 9 брони. В начале следующего хода добираете +1 дополнительную карту.",
      patchEffect(e) { if (e.kind === "armor") e.amount = 9; }
    },
    sr_dusk_shard: {
      headline: "+3 Осколка · Сжигается",
      description: "Получаете +3 Осколка душ. Сжигается до конца боя.",
      patchEffect(e) { e.amount = 3; }
    },
    sr_gliding_blade: {
      headline: "7 ур. (14 ур. после смены формы)",
      description: "Наносите 7 урона (14 урона, если в этом ходу уже меняли форму).",
      patchEffect(e) { e.baseAmount = 7; e.boostedAmount = 14; }
    },
    sr_hidden_pocket: {
      headline: "+8 брони · сохранить до 2 карт",
      description: "Получаете 8 брони. В конце хода сохраняете до 2 карт в руке до следующего хода.",
      patchEffect(e) {
        if (e.kind === "armor") e.amount = 8;
        if (e.kind === "sr_retain_cards") e.amount = 2;
      }
    },
    sr_step_echo: {
      headline: "6 ур. ×2 · Тень: +6 брони",
      description: "Наносите 6 урона дважды. В Форме Тени получаете +6 брони.",
      patchEffect(e) { e.amount = 6; e.shadowArmor = 6; }
    },
    sr_mist_double: {
      cost: 0,
      headline: "В Тени: уклонение от след. атаки · Сжигается",
      description: "В Форме Тени: следующая атака врага в этом ходу промахивается (0 урона). Сжигается."
    },
    sr_edge_dance: {
      headline: "До конца боя: смена формы → +6 брони",
      description: "До конца боя каждая смена формы (Тень ↔ Плоть) даёт +6 брони.",
      patchEffect(e) { e.amount = 6; }
    },
    sr_phase_steel: {
      headline: "16 ур. · игнор Брони и Бесплотности · Тень: 1 эн.",
      description: "Наносите 16 урона, игнорируя Броню и Бесплотность врага. В Форме Тени стоит 1 энергии.",
      patchEffect(e) { e.amount = 16; }
    },
    sr_curse_devour: {
      headline: "Сжечь проклятие → +1 эн. · +3 Осколка",
      description: "Сожгите 1 проклятие или статус в руке, чтобы получить +1 энергии и +3 Осколка душ.",
      patchEffect(e) { e.shardGain = 3; }
    },
    sr_instant_shift: {
      headline: "Смена формы · +2 карты",
      description: "Мгновенно смените текущую форму (Тень ↔ Плоть). Добор 2 карт.",
      patchEffect(e) { if (e.kind === "draw_cards") e.amount = 2; }
    },
    sr_silence_veil: {
      headline: "+16 бр. · Форма Тени · +1 Осколок за карты 0 эн.",
      description: "Получаете +16 брони и переходите в Форму Тени. Каждая карта в руке с ценой 0 даёт +1 Осколок.",
      patchEffect(e) { if (e.kind === "armor") e.amount = 16; }
    },
    sr_cold_calculus: {
      headline: "Топ-4: 1 в руку, 3 в сброс (+1 Осколок за сброс)",
      description: "Смотрите 4 верхние карты колоды: выбираете 1 в руку, остальные сбрасываются (+1 Осколок за каждую сброшенную).",
      patchEffect(e) { e.lookCount = 4; }
    },
    sr_shadow_parity: {
      cost: 0,
      headline: "До конца боя: в Тени нет штрафа -25% к атакам",
      description: "До конца боя в Форме Тени штраф -25% к урону атак полностью убирается."
    },
    sr_eternal_dusk: {
      cost: 1,
      headline: "До конца боя: сохранение Тени и +1 Осколок/ход",
      description: "До конца боя вы сохраняете Форму Тени между ходами; в начале каждого хода в Тени получаете +1 Осколок души."
    },
    sr_void_mirror: {
      cost: 0,
      headline: "В Тени: след. Навык или Атака ×2",
      description: "Если вы в Форме Тени, следующая сыгранная карта Навыка или Атаки в этом ходу срабатывает дважды."
    },
    sr_vanish: {
      cost: 1,
      headline: "Форма Тени · 0 урона от всех атак · Сжигается",
      description: "Переход в Форму Тени; до начала следующего хода вы получаете 0 урона от всех атак врагов. Сжигается."
    },
    sr_edge_master: {
      cost: 2,
      headline: "До конца боя: 1-я смена формы/ход → +1 эн. и +2 карты",
      description: "До конца боя первая смена формы в каждом ходу даёт +1 энергии и добор 2 карт."
    },
    sr_faceless_lord: {
      cost: 2,
      headline: "До конца боя: Тень + Плоть одновременно",
      description: "До конца боя вы одновременно в Форме Тени и Плоти (-50% входящего урона без штрафа -25%, бонусы обеих форм). Первая смена формы за ход даёт +1 карту и +1 Осколок."
    },
    sr_world_eclipse: {
      cost: 1,
      headline: "Тень · промах всех атак · 10 ур. и +1 Оск. за уклонение",
      description: "Переход в Форму Тени; до следующего хода все атаки врагов промахиваются (0 урона). До конца боя каждый раз при уклонении или снижении урона в Тени случайный враг получает 10 урона, а вы +1 Осколок души.",
      patchEffect(e) { if (e.kind === "sr_power_flag") e.amount = 10; }
    },

    // ===== ШКОЛА ЖАТВЫ (24 карты) =====
    sr_harvest_reap: {
      headline: "10 урона · убийство: +3 Осколка и +1 эн.",
      description: "Наносите 10 урона. При убийстве цели получаете +3 Осколка душ и +1 энергии.",
      patchEffect(e) { e.amount = 10; }
    },
    sr_shard_burst: {
      headline: "Тратит до 3 Осколков: 9 + 5×Осколки ур.",
      description: "Тратит до 3 Осколков душ: наносит 9 + 5 урона за каждый потраченный Осколок.",
      patchEffect(e) { e.baseDamage = 9; e.perShard = 5; }
    },
    sr_blade_fan: {
      headline: "8 урона всем · +1 Осколок за каждого врага",
      description: "Наносите 8 урона всем врагам. Получаете +1 Осколок души за каждого задетого врага.",
      patchEffect(e) { e.amount = 8; }
    },
    sr_exact_cut: {
      headline: "12 урона (+6, если сыграно ≤2 карт)",
      description: "Наносите 12 урона. Если в этом ходу сыграно ≤2 карт — наносит +6 урона.",
      patchEffect(e) { e.baseDamage = 12; e.bonusDamage = 6; }
    },
    sr_double_slash: {
      headline: "6 урона ×2 · в Плоти +1 Осколок за удар",
      description: "Наносите 6 урона дважды. В Форме Плоти каждый удар даёт +1 Осколок души.",
      patchEffect(e) { e.amount = 6; }
    },
    sr_spirit_hone: {
      headline: "-1 Осколок → след. Атака +9 урона",
      description: "Потратьте 1 Осколок души, чтобы следующая Атака в этом ходу нанесла +9 урона.",
      patchEffect(e) { e.bonusDamage = 9; }
    },
    sr_reaper_wedge: {
      headline: "18 ур. · Форма Плоти · по Броне +7 ур.",
      description: "Переход в Форму Плоти. Наносите 18 урона (+7 урона, если у врага есть Броня).",
      patchEffect(e) { e.baseDamage = 18; e.armorBonus = 7; }
    },
    sr_shard_vortex: {
      headline: "-2 Осколка → 6 урона ×3 случайным врагам",
      description: "Потратьте 2 Осколка душ, чтобы нанести 6 урона трижды случайным врагам.",
      patchEffect(e) { e.amount = 6; }
    },
    sr_soul_blood_trail: {
      headline: "+3 Осколка · если 3+ Осколков: +2 карты",
      description: "Получаете +3 Осколка душ. Если у вас уже 3 или больше Осколков — добираете 2 карты.",
      patchEffect(e) { e.shards = 3; e.threshold = 3; }
    },
    sr_hunter_lunge: {
      headline: "11 ур. (17 ур., если у цели <50% HP)",
      description: "Наносите 11 урона (17 урона, если у цели меньше 50% HP).",
      patchEffect(e) { e.baseDamage = 11; e.executeDamage = 17; }
    },
    sr_soul_harvest: {
      headline: "Тратит ВСЕ Осколки: 11 + 6×Оск. (≤3 карт: +30%)",
      description: "Тратит ВСЕ Осколки душ: наносит 11 + 6×Осколки урона. Если сыграно ≤3 карт за ход — +30% урона.",
      patchEffect(e) { e.baseDamage = 11; e.perShard = 6; }
    },
    sr_amethyst_flash: {
      headline: "-2 Осколка → 15 ур. всем (игнор Брони)",
      description: "Потратьте 2 Осколка душ: наносите 15 урона всем врагам, игнорируя Броню.",
      patchEffect(e) { e.amount = 15; }
    },
    sr_blade_resonance: {
      headline: "До конца боя: трата Осколков → +2 Ярости на ход",
      description: "До конца боя каждая трата Осколков душ даёт +2 Ярости (+2 к урону атак) до конца хода.",
      patchEffect(e) { e.amount = 2; }
    },
    sr_soul_overflow: {
      headline: "До конца боя: лишний Осколок → 8 ур. случ. врагу",
      description: "До конца боя каждый Осколок души сверх лимита наносит 8 урона случайному врагу.",
      patchEffect(e) { e.amount = 8; }
    },
    sr_unhurried_exec: {
      headline: "24 урона · завершает ход · Форма Тени",
      description: "Наносите 24 урона. Немедленно завершает ваш ход и переводит вас в Форму Тени.",
      patchEffect(e) { if (e.kind === "damage") e.amount = 24; }
    },
    sr_essence_siphon: {
      headline: "11 ур. · -2 Осколка → +7 HP · Сжигается",
      description: "Наносите 11 урона. Если есть 2+ Осколка, тратит 2 Осколка и восстанавливает 7 HP. Сжигается.",
      patchEffect(e) { e.amount = 11; e.healAmount = 7; }
    },
    sr_triple_verdict: {
      headline: "7 ур. ×3 (+3 за удар после Тень→Плоть)",
      description: "Наносите 7 урона трижды. Если в этом ходу вы переходили из Тени в Плоть — +3 к каждому удару.",
      patchEffect(e) { e.amount = 7; e.shiftBonus = 3; }
    },
    sr_crystal_fury: {
      headline: "-3 Осколка → +3 Ярости до конца боя · Сжигается",
      description: "Потратьте 3 Осколка душ: получаете +3 Ярости (+3 к урону всех атак) до конца боя. Сжигается.",
      patchEffect(e) { e.rageAmount = 3; }
    },
    sr_reaper_apotheosis: {
      cost: 1,
      headline: "До конца боя: макс. Осколков = 10 · +2 каждые 2 хода",
      description: "До конца боя максимум Осколков душ увеличивается до 10; сразу и в начале каждого 2-го хода получаете +2 Осколка."
    },
    sr_soul_rift: {
      headline: "30 урона всем · цена -1 за каждые 2 Осколка",
      description: "Наносите 30 урона всем врагам. Цена снижается на 1 за каждые 2 имеющихся Осколка (не тратит их).",
      patchEffect(e) { e.amount = 30; }
    },
    sr_final_stroke: {
      headline: "14 ур. · если 3-я карта: ×2 ур. и возврат в руку",
      description: "Наносите 14 урона. Если это 3-я карта в ходу — урон удваивается и карта возвращается в руку (1 раз за ход).",
      patchEffect(e) { e.baseDamage = 14; }
    },
    sr_oblivion_scythe: {
      headline: "Тратит ВСЕ Осколки: 9×Осколки ур. · игнор Бесплотности",
      description: "Тратит ВСЕ Осколки душ: наносит 9 урона за каждый Осколок, игнорируя Бесплотность врага.",
      patchEffect(e) { e.perShard = 9; }
    },
    sr_reaper_heart: {
      cost: 2,
      headline: "До конца боя: возврат 50% Осколков · +1 ур./потраченный",
      description: "До конца боя все траты Осколков возвращают 50% (округл. вверх). Каждый потраченный Осколок до конца боя даёт +1 к урону всех Атак."
    },
    sr_judgment_hour: {
      headline: "Тратит ВСЕ Осколки: 15×Оск. всем · убийство: рефреш",
      description: "Тратит ВСЕ Осколки душ: 15 урона × Осколки ВСЕМ врагам, игнорируя Броню и Бесплотность. Если убит ≥1 враг — восстанавливает всю энергию и возвращает карту в руку (1 раз за бой).",
      patchEffect(e) { e.perShard = 15; }
    },

    // ===== ШКОЛА ОКОВ (26 карт) =====
    sr_restraint_chain: {
      headline: "8 урона · +3 Оков",
      description: "Наносите 8 урона и накладываете +3 Оков на цель.",
      patchEffect(e) {
        if (e.kind === "damage") e.amount = 8;
        if (e.kind === "sr_apply_shackles") e.amount = 3;
      }
    },
    sr_break_aim: {
      headline: "+7 брони · враг с атакой ≥10: -7 урона",
      description: "Получаете +7 брони. Если выбранный враг готовит атаку ≥10 урона — снижает её урон на 7 в этом ходу.",
      patchEffect(e) {
        if (e.kind === "armor") e.amount = 7;
        if (e.kind === "sr_break_aim") e.reduce = 7;
      }
    },
    sr_soul_knot: {
      headline: "Связь душ на 2 врагов (3 хода, 50% урона)",
      description: "Связывает цель и ещё 1 врага на 3 хода: 50% получаемого урона передаётся второму.",
      patchEffect(e) { e.turns = 3; e.pct = 0.5; }
    },
    sr_silence_cuffs: {
      headline: "10 ур. · враг не атакует: +2 Оск. и +5 Оков",
      description: "Наносите 10 урона. Если цель не атакует в этом ходу — получаете +2 Осколка и накладываете +5 Оков.",
      patchEffect(e) { e.amount = 10; e.bonusShackles = 5; }
    },
    sr_shield_shatter: {
      headline: "Снять всю Броню врага · затем 10 урона",
      description: "Снимает всю Броню выбранного врага, затем наносит ему 10 урона.",
      patchEffect(e) { if (e.kind === "damage") e.amount = 10; }
    },
    sr_chain_grip: {
      headline: "7 + 3×Оковы урона",
      description: "Наносите 7 урона + 3 урона за каждый заряд Оков на цели.",
      patchEffect(e) { e.baseDamage = 7; e.perShackle = 3; }
    },
    sr_iron_weight: {
      headline: "+9 брони · +4 Оков цели",
      description: "Получаете +9 брони и накладываете +4 Оков на выбранного врага.",
      patchEffect(e) {
        if (e.kind === "armor") e.amount = 9;
        if (e.kind === "sr_apply_shackles") e.amount = 4;
      }
    },
    sr_seize_init: {
      headline: "Враг баффается/защищается → +3 карты и +2 Оск.",
      description: "Если выбранный враг готовит бафф, защиту или проклятие — добор 3 карт и +2 Осколка души.",
      patchEffect(e) { e.drawAmount = 3; e.shardAmount = 2; }
    },
    sr_chain_yank: {
      headline: "11 урона · если Оковы на цели: +7 брони",
      description: "Наносите 11 урона. Если на цели есть Оковы — получаете +7 брони.",
      patchEffect(e) { e.amount = 11; e.armorBonus = 7; }
    },
    sr_dispel_charms: {
      headline: "Снять Бесплотность или 4 Ярости · +7 брони",
      description: "Снимает с выбранного врага Бесплотность или 4 ед. Ярости. Получаете +7 брони.",
      patchEffect(e) {
        if (e.kind === "sr_dispel_charms") e.furyRemove = 4;
        if (e.kind === "armor") e.amount = 7;
      }
    },
    sr_ritual_disrupt: {
      headline: "14 ур. · срыв баффа/призыва · -50% атаки врага",
      description: "Наносите 14 урона. Отменяет усиленную атаку и призыв врага в этом ходу (враг наносит 50% урона).",
      patchEffect(e) { if (e.kind === "damage") e.amount = 14; }
    },
    sr_shackle_net: {
      headline: "+6 Оков всем врагам · Тень: +8 брони",
      description: "Накладывает +6 Оков ВСЕМ врагам. В Форме Тени получаете +8 брони.",
      patchEffect(e) { e.shackles = 6; e.shadowArmor = 8; }
    },
    sr_mirror_bonds: {
      cost: 0,
      headline: "50% входящего урона отражается во врага с Оковами",
      description: "До конца хода 50% получаемого вами урона отражается во врага с Оковами."
    },
    sr_armor_theft: {
      headline: "Забрать до 14 Брони у врага себе",
      description: "Забирает до 14 Брони у выбранного врага и передаёт её вам.",
      patchEffect(e) { e.maxSteal = 14; }
    },
    sr_time_loop: {
      requiresShards: 1,
      headline: "-1 Осколок → вернуть карту из сброса (-1 эн.)",
      description: "Потратьте 1 Осколок души: верните 1 карту из сброса в руку со скидкой -1 к цене в этом ходу.",
      patchEffect(e) { e.shardCost = 1; }
    },
    sr_linked_fates: {
      headline: "Связь ВСЕХ врагов (3 хода, 50%) · +4 Оков всем",
      description: "Связывает ВСЕХ врагов на 3 хода (50% урона делится) и накладывает +4 Оков всем врагам.",
      patchEffect(e) {
        if (e.kind === "sr_soul_link") e.turns = 3;
        if (e.kind === "sr_apply_shackles") e.amount = 4;
      }
    },
    sr_numbing_cold: {
      headline: "До конца боя: срабатывание Оков → +2 Осколка",
      description: "До конца боя каждое срабатывание Оков даёт вам +2 Осколка души.",
      patchEffect(e) { e.amount = 2; }
    },
    sr_prison_bell: {
      headline: "Активирует Оковы цели (урон = Оковы ×3)",
      description: "Немедленно активирует Оковы на выбранной цели (урон = Оковы × 3), не снимая их.",
      patchEffect(e) { e.multiplier = 3; }
    },
    sr_summon_ban: {
      headline: "3 хода: без Брони и призыва · +2 Осколка",
      description: "На 3 хода цель не может получать Броню и призывать союзников. Вы получаете +2 Осколка душ.",
      patchEffect(e) {
        if (e.kind === "sr_summon_ban") e.turns = 3;
        if (e.kind === "sr_gain_shards") e.amount = 2;
      }
    },
    sr_eternal_shackles: {
      cost: 1,
      headline: "До конца боя: Оковы не спадают и бьют при атаке",
      description: "До конца боя Оковы не спадают между ходами и срабатывают при каждой атаке врага."
    },
    sr_soul_paralysis: {
      cost: 1,
      requiresShards: 3,
      headline: "-3 Осколка → оглушение врага на 1 ход · Сжигается",
      description: "Потратьте 3 Осколка душ, чтобы оглушить выбранного врага на 1 ход (пропустит ход). Сжигается.",
      patchEffect(e) { e.shardCost = 3; }
    },
    sr_chain_judgment: {
      headline: "Удваивает Оковы цели · урон = новые Оковы ×3",
      description: "Удваивает Оковы на цели, затем наносит ей урон, равный новому числу Оков × 3.",
      patchEffect(e) { e.multiplier = 3; }
    },
    sr_sever_link: {
      headline: "16 ур. · связанным врагам передаётся 100% урона",
      description: "Наносите 16 урона. Если цель связана — передаёт 100% нанесённого урона всем остальным связанным врагам.",
      patchEffect(e) { e.amount = 16; }
    },
    sr_warden_verdict: {
      cost: 2,
      headline: "До конца боя: в начале хода +2 Оков всем и -4 к 1-й атаке",
      description: "До конца боя в начале каждого хода накладывает +2 Оков всем врагам и снижает урон первой атаки по вам на 4."
    },
    sr_soul_prison: {
      cost: 2,
      headline: "До конца боя: все связаны (50%) · триггер Оков по всем +4 бр.",
      description: "До конца боя все враги постоянно связаны (50% урона делится). При получении врагом Брони, баффа или призыва ВСЕ враги получают урон = сумме всех Оков на поле, а вы +4 брони."
    },
    sr_absolute_ban: {
      cost: 1,
      headline: "+8 Оков всем · снять Броню/Беспл./Ярость · оглушить всех",
      description: "Накладывает +8 Оков всем врагам, снимает всю Броню, Бесплотность и Ярость, и оглушает всех врагов на 1 ход. Сжигается.",
      patchEffect(e) { e.shackles = 8; }
    }
  });

  function buildUpgradedCard(baseDef) {
    const spec = UPGRADE_SPECS[baseDef.id];
    let nextCost = spec && typeof spec.cost === "number" ? spec.cost : baseDef.cost;
    let nextReqShards = spec && typeof spec.requiresShards === "number" ? spec.requiresShards : (baseDef.requiresShards || 0);
    let nextHeadline = spec && spec.headline ? spec.headline : baseDef.headline;
    let nextDescription = spec && spec.description ? spec.description : baseDef.description;

    const upgradedEffects = baseDef.effects.map(function (eff) {
      const n = Object.assign({}, eff);
      if (spec && typeof spec.patchEffect === "function") {
        spec.patchEffect(n);
      } else if (!spec) {
        if (typeof n.amount === "number") n.amount += 3;
        if (typeof n.baseDamage === "number") n.baseDamage += 3;
      }
      return Object.freeze(n);
    });

    if (!spec && baseDef.type === "power" && baseDef.cost >= 2) {
      nextCost = Math.max(1, baseDef.cost - 1);
    }

    return Object.freeze(
      Object.assign({}, baseDef, {
        id: baseDef.id + "+",
        baseId: baseDef.id,
        upgraded: true,
        cost: nextCost,
        requiresShards: nextReqShards,
        name: baseDef.name + " +",
        headline: nextHeadline,
        description: nextDescription,
        effects: Object.freeze(upgradedEffects)
      })
    );
  }

  // ===== COMBAT ENGINE =====
  const Engine = {
    initPlayerState(player, heroId) {
      const isSR = heroId === HERO_ID;
      player.heroId = heroId || "necromancer";
      player.heroForm = "flesh";
      player.srDualForm = false;
      player.soulShards = 0;
      player.maxSoulShards = 6;
      player.srRageTurn = 0;
      player.srRageBattle = 0;
      player.srHeartDmgBonus = 0;
      player.srFormChangedThisTurn = false;
      player.srFormChangesThisTurn = 0;
      player.srSwitchedShadowToFleshThisTurn = false;
      player.srEdgeDanceArmor = 0;
      player.srNoShadowPenalty = false;
      player.srPersistShadow = 0;
      player.srEdgeMaster = false;
      player.srEclipseDamage = 0;
      player.srNextAttackDodge = false;
      player.srFullDodgeThisTurn = false;
      player.srDoubleNextCard = false;
      player.srNextTurnDraw = 0;
      player.srRetainCount = 0;
      player.srBladeResonance = 0;
      player.srOverflowDmg = 0;
      player.srApotheosis = false;
      player.srApotheosisShards = 0;
      player.srHeartActive = false;
      player.srJudgmentUsedInBattle = false;
      player.srFinalStrokeReturnedThisTurn = false;
      player.srFrostbite = 0;
      player.srEternalShackles = false;
      player.srWardenShackles = 0;
      player.srFirstHitReduce = 0;
      player.srFirstHitReducedThisTurn = false;
      player.srSoulPrison = false;
      player.srSoulPrisonArmor = 0;
      player.srMirrorBondsPct = 0;
      player.srShardConcentrateCharges = 0;
      player._activeShardConcentrate = false;
      player.srCrystalHeartUsedThisTurn = false;
      player.srPendingCrystalHeartBonus = 0;
      player.srWardenKeyUsedThisTurn = false;
      player.srWardenKeyCarryArmor = 0;
      player._playingAttackCard = false;
      if (isSR) {
        player.name = "Теневой жнец";
      }
    },

    initEnemyState(enemy) {
      if (!enemy) return;
      enemy.shackles = enemy.shackles || 0;
      enemy.soulLinkTurns = enemy.soulLinkTurns || 0;
      enemy.soulLinkPct = enemy.soulLinkPct || 0;
      enemy.soulLinkPermanent = Boolean(enemy.soulLinkPermanent);
      enemy.stunTurns = enemy.stunTurns || 0;
      enemy.stunned = enemy.stunned || enemy.stunTurns || 0;
      enemy.noArmorSummonTurns = enemy.noArmorSummonTurns || 0;
      enemy.attackReduceThisTurn = enemy.attackReduceThisTurn || 0;
      enemy.disruptedThisTurn = Boolean(enemy.disruptedThisTurn);
    },

    isShadowReaper(player) {
      return Boolean(player && player.heroId === HERO_ID);
    },

    isShadowForm(player) {
      if (!player) return false;
      return Boolean(player.srDualForm || player.heroForm === "shadow");
    },

    isFleshForm(player) {
      if (!player) return true;
      return Boolean(player.srDualForm || player.heroForm !== "shadow");
    },

    getVisualForm(player) {
      if (!player) return "flesh";
      return player.srDualForm || player.heroForm === "shadow" ? "shadow" : "flesh";
    },

    getLivingEnemies(state) {
      const list = state && Array.isArray(state.enemies) ? state.enemies : state && state.enemy ? [state.enemy] : [];
      return list.filter(function (e) {
        return e && e.hp > 0;
      });
    },

    getRandomLivingEnemy(state) {
      const living = this.getLivingEnemies(state);
      if (living.length === 0) return null;
      return living[Math.floor(Math.random() * living.length)];
    },

    gainSoulShards(state, amount) {
      const p = state && state.player;
      if (!p || !(amount > 0)) return { gained: 0, overflow: 0, overflowHits: [] };
      const cap = p.maxSoulShards || 6;
      const before = p.soulShards || 0;
      const afterRaw = before + amount;
      const gained = Math.max(0, Math.min(cap, afterRaw) - before);
      const overflow = Math.max(0, afterRaw - cap);
      p.soulShards = Math.min(cap, afterRaw);
      const overflowHits = [];
      if (overflow > 0 && p.srOverflowDmg > 0) {
        const ROOT = global.NecroModules || {};
        for (let i = 0; i < overflow; i++) {
          const target = this.getRandomLivingEnemy(state);
          if (!target) break;
          if (ROOT.CombatSystem && ROOT.CombatSystem.EFFECT_HANDLERS) {
            const hit = ROOT.CombatSystem.EFFECT_HANDLERS.damage(state, {
              kind: "damage",
              amount: p.srOverflowDmg,
              target: "enemy",
              enemyRef: target,
              isCardAttack: false
            });
            if (hit) overflowHits.push(hit);
          }
        }
      }
      return { gained, overflow, total: p.soulShards, overflowHits };
    },

    spendSoulShards(state, amount) {
      const p = state && state.player;
      if (!p || !(amount > 0)) return { spent: 0, refunded: 0, rageGained: 0, heartBonusGained: 0 };
      const available = p.soulShards || 0;
      const spent = Math.min(available, amount);
      if (spent <= 0) return { spent: 0, refunded: 0, rageGained: 0, heartBonusGained: 0 };
      p.soulShards = available - spent;
      let rageGained = 0;
      if (p.srBladeResonance > 0) {
        rageGained = p.srBladeResonance;
        p.srRageTurn = (p.srRageTurn || 0) + rageGained;
      }
      let refunded = 0;
      let heartBonusGained = 0;
      if (p.srHeartActive) {
        refunded = Math.ceil(spent * 0.5);
        p.soulShards = Math.min(p.maxSoulShards || 6, p.soulShards + refunded);
        heartBonusGained = spent;
        p.srHeartDmgBonus = (p.srHeartDmgBonus || 0) + heartBonusGained;
      }
      let crystalHeartBonus = 0;
      const ROOT = global.NecroModules || {};
      if (!p.srCrystalHeartUsedThisTurn && ROOT.BlessingSystem && ROOT.BlessingSystem.hasBlessing(p, "crystal_heart")) {
        p.srCrystalHeartUsedThisTurn = true;
        crystalHeartBonus = 3;
        if (p._playingAttackCard) {
          p.srPendingCrystalHeartBonus = (p.srPendingCrystalHeartBonus || 0) + crystalHeartBonus;
        } else {
          p.nextAttackBonusDamage = (p.nextAttackBonusDamage || 0) + crystalHeartBonus;
        }
      }
      return { spent, refunded, rageGained, heartBonusGained, crystalHeartBonus };
    },

    setHeroForm(state, nextForm) {
      const p = state && state.player;
      if (!p) return { changed: false, form: "flesh" };
      const prevForm = p.heroForm || "flesh";
      const resolvedNext = nextForm === "toggle" ? (prevForm === "shadow" ? "flesh" : "shadow") : nextForm;
      const didChange = resolvedNext !== prevForm;
      p.heroForm = resolvedNext;
      let edgeDanceArmor = 0;
      let edgeMasterTriggered = false;
      let facelessTriggered = false;
      let facelessOverflowHits = [];
      let newMoonSealTriggered = false;
      let newMoonSealArmor = 0;
      let newMoonSealDraw = 0;
      if (didChange) {
        const isFirstChangeThisTurn = !p.srFormChangedThisTurn;
        p.srFormChangedThisTurn = true;
        p.srFormChangesThisTurn = (p.srFormChangesThisTurn || 0) + 1;
        if (prevForm === "shadow" && resolvedNext === "flesh") {
          p.srSwitchedShadowToFleshThisTurn = true;
        }
        if (p.srEdgeDanceArmor > 0) {
          edgeDanceArmor = p.srEdgeDanceArmor;
          p.armor = (p.armor || 0) + edgeDanceArmor;
        }
        const ROOT = global.NecroModules || {};
        if (isFirstChangeThisTurn && ROOT.BlessingSystem && ROOT.BlessingSystem.hasBlessing(p, "new_moon_seal")) {
          newMoonSealTriggered = true;
          newMoonSealArmor = 3;
          p.armor = (p.armor || 0) + newMoonSealArmor;
          if (ROOT.DeckSystem && state.deck) {
            newMoonSealDraw = ROOT.DeckSystem.drawCards(state.deck, 1, null);
          }
        }
        if (isFirstChangeThisTurn && p.srEdgeMaster) {
          edgeMasterTriggered = true;
          p.energy = (p.energy || 0) + 1;
          if (ROOT.DeckSystem && state.deck) {
            ROOT.DeckSystem.drawCards(state.deck, 2, null);
          }
        }
        if (isFirstChangeThisTurn && p.srDualForm) {
          facelessTriggered = true;
          if (ROOT.DeckSystem && state.deck) {
            ROOT.DeckSystem.drawCards(state.deck, 1, null);
          }
          const facelessShardRes = this.gainSoulShards(state, 1);
          if (Array.isArray(facelessShardRes.overflowHits)) {
            facelessOverflowHits = facelessShardRes.overflowHits;
          }
        }
      }
      return {
        changed: didChange,
        prevForm,
        form: resolvedNext,
        edgeDanceArmor,
        edgeMasterTriggered,
        facelessTriggered,
        newMoonSealTriggered,
        newMoonSealArmor,
        newMoonSealDraw,
        overflowHits: facelessOverflowHits
      };
    },

    willCardSpendShardsForDamage(state, card) {
      if (!state || !state.player || !card || card.type !== "attack") return false;
      const effects = Array.isArray(card.effects) ? card.effects : [];
      const shards = state.player.soulShards || 0;
      for (let i = 0; i < effects.length; i++) {
        const eff = effects[i];
        if (!eff) continue;
        if (
          eff.kind === "sr_shard_burst" ||
          eff.kind === "sr_soul_harvest" ||
          eff.kind === "sr_oblivion_scythe" ||
          eff.kind === "sr_judgment_hour"
        ) {
          return shards > 0;
        }
        if (
          eff.kind === "sr_shard_vortex" ||
          eff.kind === "sr_amethyst_flash" ||
          eff.kind === "sr_essence_siphon"
        ) {
          const req = eff.shardCost || card.requiresShards || 2;
          return shards >= req;
        }
      }
      return Boolean(card.requiresShards > 0 && shards >= card.requiresShards);
    },

    applyShackles(enemy, amount) {
      if (!enemy || enemy.hp <= 0 || !(amount > 0)) return 0;
      enemy.shackles = (enemy.shackles || 0) + amount;
      return enemy.shackles;
    },

    triggerShacklesOnEnemy(state, enemy, reason) {
      const p = state && state.player;
      const ROOT = global.NecroModules || {};
      if (!state || !p || !ROOT.CombatSystem || !ROOT.CombatSystem.EFFECT_HANDLERS) return null;
      const hits = [];
      const overflowHits = [];
      let armorGained = 0;
      let shardsGained = 0;
      if (p.srSoulPrison) {
        const living = this.getLivingEnemies(state);
        const totalShackles = living.reduce(function (sum, e) {
          return sum + Math.max(0, e.shackles || 0);
        }, 0);
        armorGained = p.srSoulPrisonArmor || 4;
        p.armor = (p.armor || 0) + armorGained;
        if (totalShackles > 0) {
          for (let i = 0; i < living.length; i++) {
            const le = living[i];
            const h = ROOT.CombatSystem.EFFECT_HANDLERS.damage(state, {
              kind: "damage",
              amount: totalShackles,
              target: "enemy",
              enemyRef: le,
              isCardAttack: false,
              isShacklesTrigger: true,
              isSoulLinkSplash: true
            });
            if (h) hits.push(h);
          }
          if (p.srFrostbite > 0) {
            const sRes = this.gainSoulShards(state, p.srFrostbite);
            shardsGained += sRes.gained;
            if (Array.isArray(sRes.overflowHits)) {
              for (let oi = 0; oi < sRes.overflowHits.length; oi++) overflowHits.push(sRes.overflowHits[oi]);
            }
          }
        }
      } else if (enemy && enemy.hp > 0 && (enemy.shackles || 0) > 0) {
        const h = ROOT.CombatSystem.EFFECT_HANDLERS.damage(state, {
          kind: "damage",
          amount: enemy.shackles,
          target: "enemy",
          enemyRef: enemy,
          isCardAttack: false,
          isShacklesTrigger: true
        });
        if (h) hits.push(h);
        if (p.srFrostbite > 0) {
          const sRes = this.gainSoulShards(state, p.srFrostbite);
          shardsGained += sRes.gained;
          if (Array.isArray(sRes.overflowHits)) {
            for (let oi = 0; oi < sRes.overflowHits.length; oi++) overflowHits.push(sRes.overflowHits[oi]);
          }
        }
      }
      let wardenKeyTriggered = false;
      if (hits.length > 0 && !p.srWardenKeyUsedThisTurn && ROOT.BlessingSystem && ROOT.BlessingSystem.hasBlessing(p, "warden_key")) {
        p.srWardenKeyUsedThisTurn = true;
        p.armor = (p.armor || 0) + 4;
        armorGained += 4;
        wardenKeyTriggered = true;
        const enemyTurnPhase = ROOT.GameState && ROOT.GameState.PHASES ? ROOT.GameState.PHASES.ENEMY_TURN : "enemy_turn";
        if (state.phase === enemyTurnPhase) {
          p.srWardenKeyCarryArmor = (p.srWardenKeyCarryArmor || 0) + 4;
        }
      }
      if (hits.length === 0 && armorGained === 0) return null;
      return { kind: "sr_shackles_trigger", reason: reason || "action", hits, overflowHits, armorGained, shardsGained, wardenKeyTriggered };
    },

    applySoulLinkSplash(state, sourceEnemy, rawDamage, overridePct) {
      if (!state || !sourceEnemy || !(rawDamage > 0)) return [];
      const isLinked = Boolean(sourceEnemy.soulLinkPermanent || (sourceEnemy.soulLinkTurns || 0) > 0);
      if (!isLinked) return [];
      const pct = typeof overridePct === "number" ? overridePct : (sourceEnemy.soulLinkPct || 0.4);
      const sharedDmg = Math.max(1, Math.round(rawDamage * pct));
      const ROOT = global.NecroModules || {};
      if (!ROOT.CombatSystem || !ROOT.CombatSystem.EFFECT_HANDLERS) return [];
      const living = this.getLivingEnemies(state);
      const splashHits = [];
      for (let i = 0; i < living.length; i++) {
        const other = living[i];
        if (other === sourceEnemy) continue;
        if (!(other.soulLinkPermanent || (other.soulLinkTurns || 0) > 0)) continue;
        const hit = ROOT.CombatSystem.EFFECT_HANDLERS.damage(state, {
          kind: "damage",
          amount: sharedDmg,
          target: "enemy",
          enemyRef: other,
          isCardAttack: false,
          isSoulLinkSplash: true
        });
        if (hit) splashHits.push(hit);
      }
      return splashHits;
    },

    getDynamicCardCost(state, card, baseCost) {
      let cost = baseCost;
      if (!state || !state.player || !card) return cost;
      const baseId = card.baseId || card.cardId || card.id;
      if (baseId === "sr_phase_steel" && this.isShadowForm(state.player)) {
        cost = Math.min(cost, 1);
      }
      if (baseId === "sr_soul_rift") {
        const discount = Math.floor((state.player.soulShards || 0) / 2);
        cost = Math.max(0, cost - discount);
      }
      if (typeof card.turnCostDiscount === "number" && card.turnCostDiscount > 0) {
        cost = Math.max(0, cost - card.turnCostDiscount);
      }
      return cost;
    },

    canPlayCardCheck(state, card) {
      if (!state || !state.player || !card) return { ok: true };
      if (state.srPendingChoice || state.srPendingSecondLink) {
        return { ok: false, reason: "sr_pending_choice", card };
      }
      const req = card.requiresShards || 0;
      if (req > 0 && (state.player.soulShards || 0) < req) {
        return { ok: false, reason: "insufficient_shards", required: req, card };
      }
      const baseId = card.baseId || card.cardId || card.id;
      if (baseId === "sr_time_loop" && (!state.deck || !Array.isArray(state.deck.discardPile) || state.deck.discardPile.length === 0)) {
        return { ok: false, reason: "sr_empty_discard", card };
      }
      return { ok: true };
    },

    modifyIncomingPlayerHit(state, enemy, incomingDamage) {
      const p = state && state.player;
      if (!p || !(incomingDamage > 0)) {
        return { damage: incomingDamage, dodged: false, reducedByShadow: false, eclipseHits: [], reflectedHit: null };
      }
      let dmg = incomingDamage;
      let dodged = false;
      let reducedByShadow = false;
      const eclipseHits = [];
      let reflectedHit = null;

      if (p.srFullDodgeThisTurn) {
        dmg = 0;
        dodged = true;
      } else if (p.srNextAttackDodge) {
        p.srNextAttackDodge = false;
        dmg = 0;
        dodged = true;
      } else {
        if (p.srFirstHitReduce > 0 && !p.srFirstHitReducedThisTurn) {
          p.srFirstHitReducedThisTurn = true;
          dmg = Math.max(0, dmg - p.srFirstHitReduce);
        }
        if (this.isShadowForm(p) && dmg > 0) {
          dmg = Math.floor(dmg * 0.5);
          reducedByShadow = true;
        }
      }

      const ROOT = global.NecroModules || {};
      if ((dodged || reducedByShadow) && p.srEclipseDamage > 0 && this.isShadowForm(p)) {
        const target = this.getRandomLivingEnemy(state);
        if (target && ROOT.CombatSystem && ROOT.CombatSystem.EFFECT_HANDLERS) {
          const eh = ROOT.CombatSystem.EFFECT_HANDLERS.damage(state, {
            kind: "damage",
            amount: p.srEclipseDamage,
            target: "enemy",
            enemyRef: target,
            isCardAttack: false
          });
          if (eh) eclipseHits.push(eh);
        }
        this.gainSoulShards(state, 1);
      }

      if (dmg > 0 && p.srMirrorBondsPct > 0 && ROOT.CombatSystem && ROOT.CombatSystem.EFFECT_HANDLERS) {
        const living = this.getLivingEnemies(state);
        const selectedTarget = typeof state.selectedEnemyIndex === "number" && state.enemies && state.enemies[state.selectedEnemyIndex]
          ? state.enemies[state.selectedEnemyIndex]
          : null;
        const shackledTarget = (enemy && enemy.hp > 0 && (enemy.shackles || 0) > 0)
          ? enemy
          : (selectedTarget && selectedTarget.hp > 0 && (selectedTarget.shackles || 0) > 0)
          ? selectedTarget
          : living.find(function (e) { return (e.shackles || 0) > 0; });
        if (shackledTarget && shackledTarget.hp > 0 && (shackledTarget.shackles || 0) > 0) {
          const reflectAmt = Math.max(1, Math.round(dmg * p.srMirrorBondsPct));
          reflectedHit = ROOT.CombatSystem.EFFECT_HANDLERS.damage(state, {
            kind: "damage",
            amount: reflectAmt,
            target: "enemy",
            enemyRef: shackledTarget,
            isCardAttack: false
          });
        }
      }

      return { damage: dmg, dodged, reducedByShadow, eclipseHits, reflectedHit };
    },

    onStartPlayerTurn(state) {
      const p = state && state.player;
      if (!p) return { extraDraw: 0, shacklesApplied: 0, shardsGained: 0 };
      let extraDraw = 0;
      let shacklesApplied = 0;
      let shardsGained = 0;

      // Clear turn-only discounts on cards
      const allPiles = [state.deck && state.deck.hand, state.deck && state.deck.drawPile, state.deck && state.deck.discardPile];
      for (let pi = 0; pi < allPiles.length; pi++) {
        const pile = allPiles[pi];
        if (!Array.isArray(pile)) continue;
        for (let ci = 0; ci < pile.length; ci++) {
          if (pile[ci] && pile[ci].turnCostDiscount) pile[ci].turnCostDiscount = 0;
        }
      }

      // Reset per-turn Shadow Reaper flags
      p.srRageTurn = 0;
      p.srFormChangedThisTurn = false;
      p.srFormChangesThisTurn = 0;
      p.srSwitchedShadowToFleshThisTurn = false;
      p.srFullDodgeThisTurn = false;
      p.srNextAttackDodge = false;
      p.srMirrorBondsPct = 0;
      p.srFinalStrokeReturnedThisTurn = false;
      p.srDoubleNextCard = false;
      p.srFirstHitReducedThisTurn = false;
      p.srCrystalHeartUsedThisTurn = false;
      p.srPendingCrystalHeartBonus = 0;
      p.srWardenKeyUsedThisTurn = false;
      p.srRetainCount = 0;
      p.srChosenRetainIds = [];
      state.srRetainResolvedThisTurn = false;
      state.srPendingChoice = null;
      state.srChoiceQueue = [];
      state.srPendingSecondLink = null;

      // Form persistence / revert
      if (this.isShadowReaper(p)) {
        if (!p.srDualForm) {
          if (p.heroForm === "shadow") {
            if (p.srPersistShadow > 0) {
              const sRes = this.gainSoulShards(state, p.srPersistShadow);
              shardsGained += sRes.gained;
            } else {
              p.heroForm = "flesh";
            }
          }
        } else if (p.srPersistShadow > 0) {
          const sRes = this.gainSoulShards(state, p.srPersistShadow);
          shardsGained += sRes.gained;
        }
      }

      if (p.srApotheosis && state.turn % 2 === 0) {
        const aRes = this.gainSoulShards(state, p.srApotheosisShards || 2);
        shardsGained += aRes.gained;
      }

      const living = this.getLivingEnemies(state);
      for (let i = 0; i < living.length; i++) {
        const e = living[i];
        e.attackReduceThisTurn = 0;
        e.disruptedThisTurn = false;
        if (!e.soulLinkPermanent && (e.soulLinkTurns || 0) > 0) {
          e.soulLinkTurns = Math.max(0, e.soulLinkTurns - 1);
          if (e.soulLinkTurns === 0) e.soulLinkPct = 0;
        }
        if ((e.noArmorSummonTurns || 0) > 0) {
          e.noArmorSummonTurns = Math.max(0, e.noArmorSummonTurns - 1);
        }
        if ((e.shackles || 0) > 0 && !p.srEternalShackles) {
          e.shackles = Math.max(0, e.shackles - 1);
        }
        if (p.srWardenShackles > 0) {
          this.applyShackles(e, p.srWardenShackles);
          shacklesApplied += p.srWardenShackles;
        }
        if (p.srSoulPrison) {
          e.soulLinkPermanent = true;
          e.soulLinkPct = Math.max(e.soulLinkPct || 0, 0.5);
        }
      }

      if (p.srNextTurnDraw > 0) {
        extraDraw = p.srNextTurnDraw;
        p.srNextTurnDraw = 0;
      }

      return { extraDraw, shacklesApplied, shardsGained };
    },

    discardHandRespectingRetain(state) {
      const deck = state && state.deck;
      const p = state && state.player;
      if (!deck || !Array.isArray(deck.hand)) return 0;
      const isRuneRetain = function (c) {
        return Boolean(c && c.rune === "rune_retain");
      };
      const keep = Math.max(0, (p && p.srRetainCount) || 0);
      if (deck.hand.length === 0) return 0;
      const hasAnyRuneRetain = deck.hand.some(isRuneRetain);
      if (keep <= 0 && !hasAnyRuneRetain) {
        const count = deck.hand.length;
        while (deck.hand.length > 0) {
          deck.discardPile.push(deck.hand.pop());
        }
        return count;
      }
      let keptSet = new Set();
      for (let r = 0; r < deck.hand.length; r++) {
        if (isRuneRetain(deck.hand[r])) {
          keptSet.add(deck.hand[r].instanceId);
        }
      }
      if (keep > 0) {
        if (p && Array.isArray(p.srChosenRetainIds) && p.srChosenRetainIds.length > 0) {
          const chosen = p.srChosenRetainIds.slice(0, keep);
          for (let cIdx = 0; cIdx < chosen.length; cIdx++) keptSet.add(chosen[cIdx]);
          p.srChosenRetainIds = [];
        } else {
          // Fallback for headless simulator or hand.length <= keep: keep highest-cost/rarity non-curse cards not already rune-retained
          const scored = deck.hand
            .filter(function (c) { return !keptSet.has(c.instanceId); })
            .map(function (c, idx) {
              const isCurse = c.type === "curse";
              const score = isCurse ? -100 : (c.cost || 0) * 10 + (c.rarity === "legendary" ? 8 : c.rarity === "rare" ? 5 : c.rarity === "uncommon" ? 3 : 1);
              return { c, idx, score };
            });
          scored.sort(function (a, b) { return b.score - a.score; });
          for (let k = 0; k < Math.min(keep, scored.length); k++) {
            keptSet.add(scored[k].c.instanceId);
          }
        }
      }
      const nextHand = [];
      let discarded = 0;
      for (let i = 0; i < deck.hand.length; i++) {
        if (keptSet.has(deck.hand[i].instanceId)) {
          nextHand.push(deck.hand[i]);
        } else {
          deck.discardPile.push(deck.hand[i]);
          discarded += 1;
        }
      }
      deck.hand = nextHand;
      return discarded;
    },

    isCurseOrStatusCard(c) {
      if (!c) return false;
      if (c.type === "curse" || c.type === "status" || c.isBattleOnly) return true;
      if (Array.isArray(c.tags)) {
        if (
          c.tags.indexOf("event_curse") !== -1 ||
          c.tags.indexOf("boss_curse") !== -1 ||
          c.tags.indexOf("status") !== -1 ||
          c.tags.indexOf("curse") !== -1
        ) {
          return true;
        }
      }
      const ROOT = global.NecroModules || {};
      if (ROOT.CardDatabase && typeof ROOT.CardDatabase.getDefinition === "function") {
        const cid = c.cardId || c.id;
        if (cid) {
          const def = ROOT.CardDatabase.getDefinition(cid);
          if (def) {
            if (def.type === "curse" || def.type === "status" || def.isBattleOnly) return true;
            if (Array.isArray(def.tags)) {
              if (
                def.tags.indexOf("event_curse") !== -1 ||
                def.tags.indexOf("boss_curse") !== -1 ||
                def.tags.indexOf("status") !== -1 ||
                def.tags.indexOf("curse") !== -1
              ) {
                return true;
              }
            }
          }
        }
      }
      return false;
    },

    enqueueChoice(state, choice) {
      if (!state || !choice) return;
      if (!Array.isArray(state.srChoiceQueue)) state.srChoiceQueue = [];
      if (!state.srPendingChoice) {
        state.srPendingChoice = choice;
      } else {
        state.srChoiceQueue.push(choice);
      }
    },

    advanceChoiceQueue(state) {
      if (!state) return;
      state.srPendingChoice = null;
      while (Array.isArray(state.srChoiceQueue) && state.srChoiceQueue.length > 0) {
        const nextChoice = state.srChoiceQueue.shift();
        if (!nextChoice) continue;
        if (nextChoice.kind === "discard_pick") {
          const disc = state.deck && Array.isArray(state.deck.discardPile) ? state.deck.discardPile : [];
          if (disc.length === 0) continue;
          if (disc.length === 1) {
            const picked = disc.pop();
            picked.turnCostDiscount = (picked.turnCostDiscount || 0) + (nextChoice.discount || 1);
            state.deck.hand.push(picked);
            continue;
          }
          nextChoice.cards = disc.slice().reverse();
        } else if (nextChoice.kind === "curse_devour") {
          const hand = state.deck && Array.isArray(state.deck.hand) ? state.deck.hand : [];
          const self = this;
          const matches = hand.filter(function (c) { return self.isCurseOrStatusCard(c); });
          if (matches.length === 0) continue;
          if (matches.length === 1) {
            const c = matches[0];
            const idx = hand.indexOf(c);
            if (idx !== -1) hand.splice(idx, 1);
            if (!Array.isArray(state.deck.exhaustPile)) state.deck.exhaustPile = [];
            state.deck.exhaustPile.push(c);
            state.player.energy = (state.player.energy || 0) + (nextChoice.energyGain || 1);
            this.gainSoulShards(state, nextChoice.shardGain || 2);
            continue;
          }
          nextChoice.cards = matches;
        }
        state.srPendingChoice = nextChoice;
        break;
      }
    },

    needsInteractiveRetainChoice(state) {
      if (!state || !state._interactiveChoices || !state.player || !state.deck || !Array.isArray(state.deck.hand)) return false;
      const keep = Math.max(0, state.player.srRetainCount || 0);
      if (keep <= 0 || state.deck.hand.length <= keep) return false;
      if (state.srRetainResolvedThisTurn) return false;
      return true;
    },

    openRetainChoice(state) {
      if (!state || !state.deck || !Array.isArray(state.deck.hand)) return null;
      const maxKeep = Math.min(state.deck.hand.length, Math.max(1, (state.player && state.player.srRetainCount) || 1));
      const choice = {
        kind: "retain_pick",
        sourceCardName: "Скрытый карман",
        cards: state.deck.hand.slice(),
        maxKeep: maxKeep,
        selectedIds: []
      };
      this.enqueueChoice(state, choice);
      return state.srPendingChoice;
    },

    toggleRetainCard(state, instanceId) {
      if (!state || !state.srPendingChoice || state.srPendingChoice.kind !== "retain_pick") return null;
      const ch = state.srPendingChoice;
      if (!Array.isArray(ch.selectedIds)) ch.selectedIds = [];
      const idx = ch.selectedIds.indexOf(instanceId);
      if (idx !== -1) {
        ch.selectedIds.splice(idx, 1);
      } else if (ch.selectedIds.length < (ch.maxKeep || 1)) {
        ch.selectedIds.push(instanceId);
      } else if ((ch.maxKeep || 1) === 1) {
        ch.selectedIds = [instanceId];
      }
      return ch.selectedIds.slice();
    },

    confirmRetainChoice(state) {
      if (!state || !state.srPendingChoice || state.srPendingChoice.kind !== "retain_pick") {
        return { resolved: false };
      }
      const ch = state.srPendingChoice;
      const chosen = Array.isArray(ch.selectedIds) ? ch.selectedIds.slice(0, ch.maxKeep || 1) : [];
      if (chosen.length === 0) return { resolved: false, reason: "none_selected" };
      state.player.srChosenRetainIds = chosen;
      state.srRetainResolvedThisTurn = true;
      this.advanceChoiceQueue(state);
      return { resolved: true, retainedIds: chosen };
    },

    resolveScryPick(state, instanceId) {
      if (!state || !state.srPendingChoice || state.srPendingChoice.kind !== "scry_pick") {
        return { resolved: false };
      }
      const ch = state.srPendingChoice;
      const cards = Array.isArray(ch.cards) ? ch.cards : [];
      const chosenIdx = cards.findIndex(function (c) { return c && c.instanceId === instanceId; });
      if (chosenIdx === -1) return { resolved: false };
      const kept = cards.splice(chosenIdx, 1)[0];
      state.deck.hand.push(kept);
      let discarded = 0;
      while (cards.length > 0) {
        state.deck.discardPile.push(cards.pop());
        discarded += 1;
      }
      const s = discarded > 0 ? this.gainSoulShards(state, discarded * (ch.shardPerDiscard || 1)) : { gained: 0, overflowHits: [] };
      this.advanceChoiceQueue(state);
      return { resolved: true, keptCard: kept, discardedCount: discarded, shardsGained: s.gained, overflowHits: s.overflowHits || [] };
    },

    resolveDiscardPick(state, instanceId) {
      if (!state || !state.srPendingChoice || state.srPendingChoice.kind !== "discard_pick") {
        return { resolved: false };
      }
      const ch = state.srPendingChoice;
      const discard = state.deck && Array.isArray(state.deck.discardPile) ? state.deck.discardPile : [];
      const idx = discard.findIndex(function (c) { return c && c.instanceId === instanceId; });
      if (idx === -1) return { resolved: false };
      const picked = discard.splice(idx, 1)[0];
      picked.turnCostDiscount = (picked.turnCostDiscount || 0) + (ch.discount || 1);
      state.deck.hand.push(picked);
      this.advanceChoiceQueue(state);
      return { resolved: true, pickedCard: picked, discount: ch.discount || 1 };
    },

    resolveCurseDevour(state, instanceId) {
      if (!state || !state.srPendingChoice || state.srPendingChoice.kind !== "curse_devour") {
        return { resolved: false };
      }
      const ch = state.srPendingChoice;
      const hand = state.deck && Array.isArray(state.deck.hand) ? state.deck.hand : [];
      const idx = hand.findIndex(function (c) { return c && c.instanceId === instanceId; });
      if (idx === -1) return { resolved: false };
      const burned = hand.splice(idx, 1)[0];
      if (!Array.isArray(state.deck.exhaustPile)) state.deck.exhaustPile = [];
      state.deck.exhaustPile.push(burned);
      state.player.energy = (state.player.energy || 0) + (ch.energyGain || 1);
      const s = this.gainSoulShards(state, ch.shardGain || 2);
      this.advanceChoiceQueue(state);
      return { resolved: true, burnedCard: burned, energyGained: ch.energyGain || 1, shardsGained: s.gained, overflowHits: s.overflowHits || [] };
    },

    reconcilePendingSecondLink(state) {
      if (!state || !state.srPendingSecondLink) return null;
      const pending = state.srPendingSecondLink;
      const living = this.getLivingEnemies(state);
      const picked = Array.isArray(pending.pickedUids) ? pending.pickedUids : [];
      const candidates = living.filter(function (e) {
        return e.uid !== pending.primaryUid && picked.indexOf(e.uid) === -1;
      });
      if (candidates.length === 0 || (pending.remainingLinks || 0) <= 0) {
        state.srPendingSecondLink = null;
        return null;
      }
      if (candidates.length === 1 && (pending.remainingLinks || 1) >= 1) {
        const autoTarget = candidates[0];
        autoTarget.soulLinkTurns = Math.max(autoTarget.soulLinkTurns || 0, pending.turns || 2);
        autoTarget.soulLinkPct = Math.max(autoTarget.soulLinkPct || 0, pending.pct || 0.4);
        state.srPendingSecondLink = null;
        return autoTarget;
      }
      return null;
    },

    resolveSecondLink(state, enemyUid) {
      if (!state || !state.srPendingSecondLink) return { resolved: false };
      const pending = state.srPendingSecondLink;
      const living = this.getLivingEnemies(state);
      const target = living.find(function (e) { return e.uid === enemyUid; });
      if (!target) return { resolved: false };
      if (!Array.isArray(pending.pickedUids)) pending.pickedUids = [];
      if (target.uid === pending.primaryUid && living.some(function (e) { return e.uid !== pending.primaryUid; })) {
        return { resolved: false, reason: "same_as_primary" };
      }
      if (pending.pickedUids.indexOf(target.uid) !== -1) {
        return { resolved: false, reason: "already_picked" };
      }
      target.soulLinkTurns = Math.max(target.soulLinkTurns || 0, pending.turns || 2);
      target.soulLinkPct = Math.max(target.soulLinkPct || 0, pending.pct || 0.4);
      pending.pickedUids.push(target.uid);
      pending.remainingLinks = Math.max(0, (pending.remainingLinks || 1) - 1);
      if (pending.remainingLinks <= 0) {
        state.srPendingSecondLink = null;
      } else {
        this.reconcilePendingSecondLink(state);
      }
      return { resolved: true, target, pct: pending.pct || 0.4, turns: pending.turns || 2 };
    },

    // Register all Shadow Reaper effect handlers into CombatSystem.EFFECT_HANDLERS
    registerEffectHandlers(CombatSystem) {
      const H = CombatSystem.EFFECT_HANDLERS;
      const E = this;
      const ROOT = global.NecroModules || {};

      function deal(state, amt, enemy, extra) {
        return H.damage(
          state,
          Object.assign(
            {
              kind: "damage",
              amount: amt,
              target: "enemy",
              enemyRef: enemy || CombatSystem.getTargetEnemy(state),
              isCardAttack: true
            },
            extra || {}
          )
        );
      }

      function resolveEchoSpend(state, eff, key, wantAmount) {
        const isEcho = Boolean(eff && eff.srEchoCache && eff.srPassIndex > 0);
        if (isEcho && eff.srEchoCache[key]) {
          return eff.srEchoCache[key];
        }
        const sp = E.spendSoulShards(state, wantAmount);
        if (eff && eff.srEchoCache && eff.srPassIndex === 0) {
          eff.srEchoCache[key] = sp;
        }
        return sp;
      }

      H.sr_toggle_form = function (state) {
        const r = E.setHeroForm(state, "toggle");
        return Object.assign({ kind: "sr_form_shift", target: "player" }, r);
      };
      H.sr_enter_form = function (state, eff) {
        const r = E.setHeroForm(state, eff.form || "shadow");
        return Object.assign({ kind: "sr_form_shift", target: "player" }, r);
      };
      H.sr_gain_shards = function (state, eff) {
        const r = E.gainSoulShards(state, eff.amount || 1);
        return Object.assign({ kind: "sr_shards", target: "player", delta: r.gained }, r);
      };
      H.sr_shadow_bonus_shards = function (state, eff) {
        if (!E.isShadowForm(state.player)) return null;
        const r = E.gainSoulShards(state, eff.amount || 1);
        return Object.assign({ kind: "sr_shards", target: "player", delta: r.gained }, r);
      };
      H.sr_spark_extract = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        if (!target || target.hp <= 0) return null;
        const dmg = deal(state, eff.amount || 5, target);
        const s = E.gainSoulShards(state, eff.shards || 1);
        let drawn = 0;
        if (target.hp <= 0 && ROOT.DeckSystem && state.deck) {
          drawn = ROOT.DeckSystem.drawCards(state.deck, eff.killDraw || 1, null);
        }
        return Object.assign({}, dmg, { shardsGained: s.gained, killDrawn: drawn, overflowHits: s.overflowHits || [] });
      };
      H.sr_discard_for_shards = function (state, eff) {
        const hand = state.deck && state.deck.hand ? state.deck.hand : [];
        if (hand.length === 0) return null;
        const req = eff.amount || 1;
        if (state.pendingDiscard && state.pendingDiscard.count > 0) {
          state.pendingDiscard.count = Math.min(hand.length, state.pendingDiscard.count + req);
          state.pendingDiscard.shardsPerDiscard = Math.max(state.pendingDiscard.shardsPerDiscard || 0, eff.shardsPerDiscard || 1);
        } else {
          state.pendingDiscard = {
            count: Math.min(req, hand.length),
            discardedCount: 0,
            drawPerDiscard: 0,
            shardsPerDiscard: eff.shardsPerDiscard || 1,
            optional: false,
            sourceCardName: eff.sourceCardName || "Туманный отход"
          };
        }
        return { kind: "pending_discard", target: "player", count: state.pendingDiscard.count };
      };
      H.sr_void_strike = function (state, eff) {
        const inShadow = E.isShadowForm(state.player);
        return deal(state, eff.amount || 7, eff.enemyRef, {
          ignoreShadowPenalty: inShadow,
          ignoreArmor: inShadow
        });
      };
      H.sr_dissolve = function (state, eff) {
        const p = state.player;
        const removedWeb = p.webbed || 0;
        const removedWeak = Math.min(p.weak || 0, eff.weakRemove || 1);
        p.webbed = 0;
        p.weak = Math.max(0, (p.weak || 0) - removedWeak);
        return { kind: "sr_cleanse", target: "player", removedWeb, removedWeak };
      };
      H.sr_next_turn_draw = function (state, eff) {
        state.player.srNextTurnDraw = (state.player.srNextTurnDraw || 0) + (eff.amount || 1);
        return { kind: "sr_buff", target: "player", label: "След. ход: +" + (eff.amount || 1) + " карта" };
      };
      H.sr_gliding_blade = function (state, eff) {
        const amt = state.player.srFormChangedThisTurn ? (eff.boostedAmount || 10) : (eff.baseAmount || 5);
        return deal(state, amt, eff.enemyRef);
      };
      H.sr_retain_cards = function (state, eff) {
        state.player.srRetainCount = (state.player.srRetainCount || 0) + (eff.amount || 1);
        return { kind: "sr_buff", target: "player", label: "Сохранить " + state.player.srRetainCount + " карт." };
      };
      H.sr_step_echo = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        const hits = [];
        for (let i = 0; i < (eff.hits || 2); i++) {
          if (!target || target.hp <= 0) break;
          const h = deal(state, eff.amount || 4, target);
          if (h) hits.push(h);
        }
        let armorGained = 0;
        if (E.isShadowForm(state.player)) {
          armorGained = eff.shadowArmor || 4;
          state.player.armor = (state.player.armor || 0) + armorGained;
        }
        return { kind: "sr_multi_hit", hits, armorGained };
      };
      H.sr_mist_double = function (state) {
        if (!E.isShadowForm(state.player)) {
          return { kind: "sr_buff", target: "player", label: "Нужна Форма Тени" };
        }
        state.player.srNextAttackDodge = true;
        return { kind: "sr_buff", target: "player", label: "Уклонение от след. атаки" };
      };
      H.sr_power_flag = function (state, eff) {
        const p = state.player;
        if (eff.mode === "bool") {
          p[eff.flag] = Boolean(eff.value);
        } else {
          p[eff.flag] = (p[eff.flag] || 0) + (eff.amount || 1);
        }
        return { kind: "sr_power", target: "player", flag: eff.flag, label: eff.sourceCardName || "Сила" };
      };
      H.sr_curse_devour = function (state, eff) {
        const hand = state.deck && state.deck.hand ? state.deck.hand : [];
        const matches = hand.filter(function (c) {
          return E.isCurseOrStatusCard(c);
        });
        if (matches.length === 0) {
          return { kind: "sr_buff", target: "player", label: "Нет проклятий в руке" };
        }
        if (state._interactiveChoices && matches.length >= 2) {
          E.enqueueChoice(state, {
            kind: "curse_devour",
            sourceCardName: eff.sourceCardName || "Поглощение проклятия",
            cards: matches.slice(),
            energyGain: eff.energyGain || 1,
            shardGain: eff.shardGain || 2
          });
          return { kind: "sr_buff", target: "player", label: "Выберите проклятие" };
        }
        const targetCurse = matches[0];
        const idx = hand.indexOf(targetCurse);
        const burned = idx !== -1 ? hand.splice(idx, 1)[0] : targetCurse;
        if (!Array.isArray(state.deck.exhaustPile)) state.deck.exhaustPile = [];
        state.deck.exhaustPile.push(burned);
        state.player.energy = (state.player.energy || 0) + (eff.energyGain || 1);
        const s = E.gainSoulShards(state, eff.shardGain || 2);
        return { kind: "sr_buff", target: "player", label: "Сожжено: +" + (eff.energyGain || 1) + " эн., +" + s.gained + " Оск." };
      };
      H.sr_shards_per_zero_cost = function (state, eff) {
        const hand = state.deck && state.deck.hand ? state.deck.hand : [];
        let zeroCount = 0;
        for (let i = 0; i < hand.length; i++) {
          if (CombatSystem.getEffectiveCardCost(state, hand[i]) === 0) zeroCount++;
        }
        if (zeroCount <= 0) return null;
        const s = E.gainSoulShards(state, zeroCount * (eff.amount || 1));
        return Object.assign({ kind: "sr_shards", target: "player", delta: s.gained }, s);
      };
      H.sr_cold_calculus = function (state, eff) {
        const deck = state.deck;
        if (!deck) return null;
        const look = eff.lookCount || 3;
        const peeked = [];
        for (let i = 0; i < look; i++) {
          if (deck.drawPile.length === 0 && deck.discardPile.length > 0 && ROOT.DeckSystem) {
            deck.drawPile = ROOT.DeckSystem.shuffle(deck.discardPile);
            deck.discardPile = [];
          }
          if (deck.drawPile.length > 0) peeked.push(deck.drawPile.pop());
        }
        if (peeked.length === 0) return { kind: "sr_buff", target: "player", label: "Колода пуста" };
        if (peeked.length === 1) {
          deck.hand.push(peeked[0]);
          return { kind: "sr_buff", target: "player", label: "Взято: " + peeked[0].name };
        }
        if (state._interactiveChoices) {
          E.enqueueChoice(state, {
            kind: "scry_pick",
            sourceCardName: eff.sourceCardName || "Холодный расчёт",
            cards: peeked,
            shardPerDiscard: eff.shardPerDiscard || 1
          });
          return { kind: "sr_buff", target: "player", label: "Выберите 1 карту из " + peeked.length };
        }
        peeked.sort(function (a, b) {
          const rScore = { legendary: 5, rare: 4, uncommon: 3, common: 2 };
          const sa = (a.type === "curse" ? -10 : (rScore[a.rarity] || 1) * 5 + (a.cost || 0));
          const sb = (b.type === "curse" ? -10 : (rScore[b.rarity] || 1) * 5 + (b.cost || 0));
          return sb - sa;
        });
        const kept = peeked.shift();
        deck.hand.push(kept);
        let discarded = 0;
        while (peeked.length > 0) {
          deck.discardPile.push(peeked.pop());
          discarded++;
        }
        const s = discarded > 0 ? E.gainSoulShards(state, discarded * (eff.shardPerDiscard || 1)) : { gained: 0 };
        return { kind: "sr_buff", target: "player", label: "Взято: " + kept.name + (s.gained > 0 ? " (+" + s.gained + " Оск.)" : "") };
      };
      H.sr_void_mirror = function (state) {
        if (!E.isShadowForm(state.player)) {
          return { kind: "sr_buff", target: "player", label: "Нужна Форма Тени" };
        }
        state.player.srDoubleNextCard = true;
        return { kind: "sr_buff", target: "player", label: "След. Навык/Атака сработает ×2" };
      };
      H.sr_full_dodge = function (state) {
        state.player.srFullDodgeThisTurn = true;
        return { kind: "sr_buff", target: "player", label: "0 урона от всех атак" };
      };
      H.sr_faceless_lord = function (state) {
        state.player.srDualForm = true;
        state.player.srNoShadowPenalty = true;
        state.player.heroForm = "shadow";
        return { kind: "sr_form_shift", target: "player", changed: true, form: "shadow", label: "Владыка Безликих" };
      };
      H.sr_harvest_reap = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        if (!target || target.hp <= 0) return null;
        const dmg = deal(state, eff.amount || 7, target);
        let killShards = 0;
        let killEnergy = 0;
        let overflowHits = [];
        if (target.hp <= 0) {
          const s = E.gainSoulShards(state, eff.killShards || 3);
          killShards = s.gained;
          overflowHits = s.overflowHits || [];
          killEnergy = eff.killEnergy || 1;
          state.player.energy = (state.player.energy || 0) + killEnergy;
        }
        return Object.assign({}, dmg, { killShards, killEnergy, overflowHits });
      };
      H.sr_shard_burst = function (state, eff) {
        const sp = resolveEchoSpend(state, eff, "sr_shard_burst", Math.min(eff.maxSpend || 3, state.player.soulShards || 0));
        const total = (eff.baseDamage || 6) + sp.spent * (eff.perShard || 4);
        return deal(state, total, eff.enemyRef);
      };
      H.sr_blade_fan = function (state, eff) {
        const living = E.getLivingEnemies(state);
        const hits = [];
        for (let i = 0; i < living.length; i++) {
          const h = deal(state, eff.amount || 5, living[i]);
          if (h) hits.push(h);
        }
        const s = hits.length > 0 ? E.gainSoulShards(state, hits.length * (eff.shardsPerHit || 1)) : { gained: 0, overflowHits: [] };
        return { kind: "sr_multi_hit", hits, shardsGained: s.gained, overflowHits: s.overflowHits || [] };
      };
      H.sr_exact_cut = function (state, eff) {
        const played = state.player.cardsPlayedThisTurn || 1;
        const amt = (eff.baseDamage || 9) + (played <= (eff.maxCardsPlayed || 2) ? (eff.bonusDamage || 4) : 0);
        return deal(state, amt, eff.enemyRef);
      };
      H.sr_double_slash = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        const inFlesh = E.isFleshForm(state.player);
        const hits = [];
        const overflowHits = [];
        let shardsGained = 0;
        for (let i = 0; i < (eff.hits || 2); i++) {
          if (!target || target.hp <= 0) break;
          const h = deal(state, eff.amount || 4, target);
          if (h) {
            hits.push(h);
            if (inFlesh) {
              const sRes = E.gainSoulShards(state, eff.fleshShardsPerHit || 1);
              shardsGained += sRes.gained;
              if (Array.isArray(sRes.overflowHits)) {
                for (let oi = 0; oi < sRes.overflowHits.length; oi++) overflowHits.push(sRes.overflowHits[oi]);
              }
            }
          }
        }
        return { kind: "sr_multi_hit", hits, shardsGained, overflowHits };
      };
      H.sr_spirit_hone = function (state, eff) {
        const req = eff.shardCost || 1;
        const sp = resolveEchoSpend(state, eff, "sr_spirit_hone", req);
        if (sp.spent < req) return null;
        state.player.nextAttackBonusDamage = (state.player.nextAttackBonusDamage || 0) + (eff.bonusDamage || 6);
        return { kind: "sr_buff", target: "player", label: "След. Атака +" + (eff.bonusDamage || 6) + " ур." };
      };
      H.sr_reaper_wedge = function (state, eff) {
        E.setHeroForm(state, "flesh");
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        const bonus = target && target.armor > 0 ? (eff.armorBonus || 5) : 0;
        return deal(state, (eff.baseDamage || 14) + bonus, target);
      };
      H.sr_shard_vortex = function (state, eff) {
        const req = eff.shardCost || 2;
        const sp = resolveEchoSpend(state, eff, "sr_shard_vortex", req);
        if (sp.spent < req) return null;
        const hits = [];
        for (let i = 0; i < (eff.hits || 3); i++) {
          const rnd = E.getRandomLivingEnemy(state);
          if (!rnd) break;
          const h = deal(state, eff.amount || 4, rnd);
          if (h) hits.push(h);
        }
        return { kind: "sr_multi_hit", hits };
      };
      H.sr_soul_blood_trail = function (state, eff) {
        const hadEnough = (state.player.soulShards || 0) >= (eff.threshold || 4);
        const s = E.gainSoulShards(state, eff.shards || 2);
        let drawn = 0;
        if ((hadEnough || (state.player.soulShards || 0) >= (eff.threshold || 4)) && ROOT.DeckSystem && state.deck) {
          drawn = ROOT.DeckSystem.drawCards(state.deck, eff.drawAmount || 2, null);
        }
        return { kind: "sr_shards", target: "player", delta: s.gained, drawn, overflowHits: s.overflowHits || [] };
      };
      H.sr_hunter_lunge = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        const isLow = target && target.hp * 2 < target.maxHp;
        return deal(state, isLow ? (eff.executeDamage || 13) : (eff.baseDamage || 8), target);
      };
      H.sr_soul_harvest = function (state, eff) {
        const sp = resolveEchoSpend(state, eff, "sr_soul_harvest", state.player.soulShards || 0);
        let dmg = (eff.baseDamage || 8) + sp.spent * (eff.perShard || 5);
        if ((state.player.cardsPlayedThisTurn || 1) <= (eff.maxCardsBonus || 3)) {
          dmg = Math.round(dmg * (eff.bonusMult || 1.3));
        }
        return deal(state, dmg, eff.enemyRef);
      };
      H.sr_amethyst_flash = function (state, eff) {
        const req = eff.shardCost || 2;
        const sp = resolveEchoSpend(state, eff, "sr_amethyst_flash", req);
        if (sp.spent < req) return null;
        const living = E.getLivingEnemies(state);
        const hits = [];
        for (let i = 0; i < living.length; i++) {
          const h = deal(state, eff.amount || 11, living[i], { ignoreArmor: true });
          if (h) hits.push(h);
        }
        return { kind: "sr_multi_hit", hits };
      };
      H.sr_force_end_turn = function () {
        return { kind: "sr_force_end_turn", target: "player" };
      };
      H.sr_essence_siphon = function (state, eff) {
        const dmg = deal(state, eff.amount || 8, eff.enemyRef);
        let healed = 0;
        const req = eff.shardCost || 2;
        const sp = resolveEchoSpend(state, eff, "sr_essence_siphon", (state.player.soulShards || 0) >= req ? req : 0);
        if (sp.spent >= req) {
          const missing = Math.max(0, state.player.maxHp - state.player.hp);
          healed = Math.min(missing, eff.healAmount || 5);
          state.player.hp += healed;
        }
        return Object.assign({}, dmg || { kind: "damage", amount: 0 }, { healed });
      };
      H.sr_triple_verdict = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        const perHit = (eff.amount || 5) + (state.player.srSwitchedShadowToFleshThisTurn ? (eff.shiftBonus || 2) : 0);
        const hits = [];
        for (let i = 0; i < (eff.hits || 3); i++) {
          if (!target || target.hp <= 0) break;
          const h = deal(state, perHit, target);
          if (h) hits.push(h);
        }
        return { kind: "sr_multi_hit", hits };
      };
      H.sr_crystal_fury = function (state, eff) {
        const req = eff.shardCost || 3;
        const sp = resolveEchoSpend(state, eff, "sr_crystal_fury", req);
        if (sp.spent < req) return null;
        state.player.srRageBattle = (state.player.srRageBattle || 0) + (eff.rageAmount || 2);
        return { kind: "sr_buff", target: "player", label: "+" + (eff.rageAmount || 2) + " Ярости на бой" };
      };
      H.sr_reaper_apotheosis = function (state, eff) {
        state.player.srApotheosis = true;
        state.player.maxSoulShards = Math.max(state.player.maxSoulShards || 6, eff.newMax || 10);
        state.player.srApotheosisShards = (state.player.srApotheosisShards || 0) + (eff.periodicShards || 2);
        const s = E.gainSoulShards(state, eff.periodicShards || 2);
        return { kind: "sr_shards", target: "player", delta: s.gained, overflowHits: s.overflowHits || [], label: "Макс. Осколков = " + state.player.maxSoulShards };
      };
      H.sr_aoe_damage = function (state, eff) {
        const living = E.getLivingEnemies(state);
        const hits = [];
        for (let i = 0; i < living.length; i++) {
          const h = deal(state, eff.amount || 24, living[i]);
          if (h) hits.push(h);
        }
        return { kind: "sr_multi_hit", hits };
      };
      H.sr_final_stroke = function (state, eff) {
        const isThird = (state.player.cardsPlayedThisTurn || 0) === (eff.targetCardNumber || 3);
        const amt = isThird ? (eff.baseDamage || 10) * 2 : (eff.baseDamage || 10);
        const dmg = deal(state, amt, eff.enemyRef);
        let returnToHand = false;
        if (isThird && !state.player.srFinalStrokeReturnedThisTurn) {
          state.player.srFinalStrokeReturnedThisTurn = true;
          returnToHand = true;
        }
        return Object.assign({}, dmg || { kind: "damage", amount: 0 }, { returnToHand });
      };
      H.sr_oblivion_scythe = function (state, eff) {
        const sp = resolveEchoSpend(state, eff, "sr_oblivion_scythe", state.player.soulShards || 0);
        const dmg = sp.spent * (eff.perShard || 7);
        if (dmg <= 0) return { kind: "sr_buff", target: "player", label: "Нет Осколков" };
        return deal(state, dmg, eff.enemyRef, { ignoreEthereal: true });
      };
      H.sr_judgment_hour = function (state, eff) {
        const sp = resolveEchoSpend(state, eff, "sr_judgment_hour", state.player.soulShards || 0);
        const dmg = sp.spent * (eff.perShard || 12);
        const living = E.getLivingEnemies(state);
        const hits = [];
        let killedAny = false;
        for (let i = 0; i < living.length; i++) {
          if (dmg > 0) {
            const h = deal(state, dmg, living[i], { ignoreArmor: true, ignoreEthereal: true });
            if (h) hits.push(h);
            if (living[i].hp <= 0) killedAny = true;
          }
        }
        let returnToHand = false;
        if (killedAny && !state.player.srJudgmentUsedInBattle) {
          state.player.srJudgmentUsedInBattle = true;
          state.player.energy = state.player.maxEnergy;
          returnToHand = true;
        }
        return { kind: "sr_multi_hit", hits, returnToHand, energyRefreshed: returnToHand };
      };

      // Shackles School Handlers
      H.sr_apply_shackles = function (state, eff) {
        const targets = eff.target === "all_enemies" ? E.getLivingEnemies(state) : [eff.enemyRef || CombatSystem.getTargetEnemy(state)].filter(Boolean);
        const uids = [];
        for (let i = 0; i < targets.length; i++) {
          if (targets[i].hp > 0) {
            E.applyShackles(targets[i], eff.amount || 2);
            uids.push(targets[i].uid);
          }
        }
        return { kind: "sr_shackles_apply", amount: eff.amount || 2, targetUids: uids };
      };
      H.sr_break_aim = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        if (!target || target.hp <= 0) return null;
        const intentDmg = target.intent ? (target.intent.damage || 0) * Math.max(1, target.intent.multiHit || 1) : 0;
        if (intentDmg >= (eff.threshold || 10)) {
          target.attackReduceThisTurn = (target.attackReduceThisTurn || 0) + (eff.reduce || 5);
          if (ROOT.EnemyLogic) ROOT.EnemyLogic.refreshIntentForEnemy(state, target);
          return { kind: "sr_debuff_enemy", enemyUid: target.uid, label: "Атака -" + (eff.reduce || 5) };
        }
        return null;
      };
      H.sr_soul_link = function (state, eff) {
        const living = E.getLivingEnemies(state);
        const primary = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        const targets = [];
        if (eff.count >= 10 || eff.target === "all_enemies") {
          for (let i = 0; i < living.length; i++) targets.push(living[i]);
        } else {
          if (primary && primary.hp > 0) targets.push(primary);
          const others = living.filter(function (e) { return e !== primary; });
          if (state._interactiveChoices && others.length >= 2) {
            if (primary && primary.hp > 0) {
              primary.soulLinkTurns = Math.max(primary.soulLinkTurns || 0, eff.turns || 2);
              primary.soulLinkPct = Math.max(primary.soulLinkPct || 0, eff.pct || 0.4);
            }
            if (state.srPendingSecondLink) {
              const alreadyPicked = Array.isArray(state.srPendingSecondLink.pickedUids) ? state.srPendingSecondLink.pickedUids.length : 0;
              state.srPendingSecondLink.remainingLinks = Math.min(Math.max(0, others.length - alreadyPicked), (state.srPendingSecondLink.remainingLinks || 1) + 1);
            } else {
              state.srPendingSecondLink = {
                primaryUid: primary ? primary.uid : null,
                pickedUids: [],
                turns: eff.turns || 2,
                pct: eff.pct || 0.4,
                remainingLinks: 1,
                sourceCardName: eff.sourceCardName || "Узел душ"
              };
            }
            return {
              kind: "sr_soul_link",
              targetUids: primary ? [primary.uid] : [],
              pct: eff.pct || 0.4,
              turns: eff.turns || 2,
              awaitingSecondTarget: true
            };
          }
          for (let i = 0; i < living.length && targets.length < (eff.count || 2); i++) {
            if (living[i] !== primary) targets.push(living[i]);
          }
        }
        const uids = [];
        for (let i = 0; i < targets.length; i++) {
          targets[i].soulLinkTurns = Math.max(targets[i].soulLinkTurns || 0, eff.turns || 2);
          targets[i].soulLinkPct = Math.max(targets[i].soulLinkPct || 0, eff.pct || 0.4);
          uids.push(targets[i].uid);
        }
        return { kind: "sr_soul_link", targetUids: uids, pct: eff.pct || 0.4, turns: eff.turns || 2 };
      };
      H.sr_silence_cuffs = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        if (!target || target.hp <= 0) return null;
        const notAttacking = !target.intent || !(target.intent.damage > 0);
        const dmg = deal(state, eff.amount || 7, target);
        let shardsGained = 0;
        let shacklesApplied = 0;
        let overflowHits = [];
        if (notAttacking) {
          const sRes = E.gainSoulShards(state, eff.bonusShards || 2);
          shardsGained = sRes.gained;
          overflowHits = sRes.overflowHits || [];
          if (target.hp > 0) {
            E.applyShackles(target, eff.bonusShackles || 4);
            shacklesApplied = eff.bonusShackles || 4;
          }
        }
        return Object.assign({}, dmg || { kind: "damage", amount: 0 }, { shardsGained, shacklesApplied, overflowHits });
      };
      H.sr_strip_armor = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        if (!target || target.hp <= 0) return null;
        const stripped = target.armor || 0;
        target.armor = 0;
        return stripped > 0 ? { kind: "sr_debuff_enemy", enemyUid: target.uid, label: "Броня снята (-" + stripped + ")" } : null;
      };
      H.sr_chain_grip = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        const stacks = target ? (target.shackles || 0) : 0;
        return deal(state, (eff.baseDamage || 5) + stacks * (eff.perShackle || 2), target);
      };
      H.sr_seize_init = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        const intent = target && target.intent;
        const isUtilityIntent = Boolean(
          intent &&
          (intent.armor > 0 || intent.furyGain > 0 || intent.allyArmor > 0 || intent.allyArmorAll > 0 || intent.allyFuryAll > 0 || intent.becomesEthereal || intent.applyPlayerWeak > 0 || intent.applyPlayerWeb > 0 || intent.applyPlayerBlight > 0 || intent.shufflesCurseId || intent.summonEnemyId || intent.heal > 0)
        );
        if (!isUtilityIntent) return { kind: "sr_buff", target: "player", label: "Враг не готовит бафф/защиту" };
        let drawn = 0;
        if (ROOT.DeckSystem && state.deck) {
          drawn = ROOT.DeckSystem.drawCards(state.deck, eff.drawAmount || 2, null);
        }
        const s = E.gainSoulShards(state, eff.shardAmount || 1);
        return { kind: "sr_shards", target: "player", delta: s.gained, drawn, overflowHits: s.overflowHits || [] };
      };
      H.sr_chain_yank = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        const hadShackles = Boolean(target && (target.shackles || 0) > 0);
        const dmg = deal(state, eff.amount || 8, target);
        let armorGained = 0;
        if (hadShackles) {
          armorGained = eff.armorBonus || 5;
          state.player.armor = (state.player.armor || 0) + armorGained;
        }
        return Object.assign({}, dmg || { kind: "damage", amount: 0 }, { armorGained });
      };
      H.sr_dispel_charms = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        if (!target || target.hp <= 0) return null;
        if (target.isEthereal) {
          target.isEthereal = false;
          return { kind: "sr_debuff_enemy", enemyUid: target.uid, label: "Бесплотность снята" };
        }
        if ((target.fury || 0) > 0) {
          const rem = Math.min(target.fury, eff.furyRemove || 2);
          target.fury -= rem;
          if (ROOT.EnemyLogic) ROOT.EnemyLogic.refreshIntentForEnemy(state, target);
          return { kind: "sr_debuff_enemy", enemyUid: target.uid, label: "Ярость -" + rem };
        }
        return null;
      };
      H.sr_ritual_disrupt = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        if (!target || target.hp <= 0) return null;
        target.disruptedThisTurn = true;
        if (ROOT.EnemyLogic) ROOT.EnemyLogic.refreshIntentForEnemy(state, target);
        return { kind: "sr_debuff_enemy", enemyUid: target.uid, label: "Ритуал сорван (-50%)" };
      };
      H.sr_shackle_net = function (state, eff) {
        const living = E.getLivingEnemies(state);
        const uids = [];
        for (let i = 0; i < living.length; i++) {
          E.applyShackles(living[i], eff.shackles || 4);
          uids.push(living[i].uid);
        }
        let armorGained = 0;
        if (E.isShadowForm(state.player)) {
          armorGained = eff.shadowArmor || 6;
          state.player.armor = (state.player.armor || 0) + armorGained;
        }
        return { kind: "sr_shackles_apply", amount: eff.shackles || 4, targetUids: uids, armorGained };
      };
      H.sr_mirror_bonds = function (state, eff) {
        state.player.srMirrorBondsPct = Math.max(state.player.srMirrorBondsPct || 0, eff.pct || 0.5);
        return { kind: "sr_buff", target: "player", label: "Отражение 50% урона" };
      };
      H.sr_armor_theft = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        if (!target || target.hp <= 0) return null;
        const stolen = Math.min(target.armor || 0, eff.maxSteal || 10);
        if (stolen <= 0) return { kind: "sr_buff", target: "player", label: "У врага нет брони" };
        target.armor -= stolen;
        state.player.armor = (state.player.armor || 0) + stolen;
        return { kind: "armor", target: "player", amount: stolen };
      };
      H.sr_time_loop = function (state, eff) {
        const req = eff.shardCost || 2;
        const sp = resolveEchoSpend(state, eff, "sr_time_loop", req);
        if (sp.spent < req) return null;
        const discard = state.deck && state.deck.discardPile ? state.deck.discardPile : [];
        if (discard.length === 0) return { kind: "sr_buff", target: "player", label: "Сброс пуст" };
        if (state._interactiveChoices && discard.length >= 2) {
          E.enqueueChoice(state, {
            kind: "discard_pick",
            sourceCardName: eff.sourceCardName || "Петля времени",
            cards: discard.slice().reverse(),
            discount: eff.discount || 1
          });
          return { kind: "sr_buff", target: "player", label: "Выберите карту из сброса" };
        }
        // Pick strongest non-curse card from discard (fallback or single-card discard)
        let bestIdx = discard.length - 1;
        let bestScore = -999;
        const rScore = { legendary: 5, rare: 4, uncommon: 3, common: 2 };
        for (let i = 0; i < discard.length; i++) {
          const c = discard[i];
          const sc = c.type === "curse" ? -100 : (rScore[c.rarity] || 1) * 5 + (c.cost || 0) * 2 + i * 0.01;
          if (sc > bestScore) { bestScore = sc; bestIdx = i; }
        }
        const picked = discard.splice(bestIdx, 1)[0];
        picked.turnCostDiscount = (picked.turnCostDiscount || 0) + (eff.discount || 1);
        state.deck.hand.push(picked);
        return { kind: "sr_buff", target: "player", label: "Возврат: " + picked.name + " (-" + (eff.discount || 1) + " эн.)" };
      };
      H.sr_prison_bell = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        if (!target || target.hp <= 0) return null;
        const dmgAmt = (target.shackles || 0) * (eff.multiplier || 2);
        if (dmgAmt <= 0) return { kind: "sr_debuff_enemy", enemyUid: target.uid, label: "Нет Оков" };
        const h = H.damage(state, { kind: "damage", amount: dmgAmt, target: "enemy", enemyRef: target, isCardAttack: false });
        let shardsGained = 0;
        let armorGained = 0;
        let overflowHits = [];
        if (state.player.srFrostbite > 0) {
          const sRes = E.gainSoulShards(state, state.player.srFrostbite);
          shardsGained = sRes.gained;
          overflowHits = sRes.overflowHits || [];
        }
        if (!state.player.srWardenKeyUsedThisTurn && ROOT.BlessingSystem && ROOT.BlessingSystem.hasBlessing(state.player, "warden_key")) {
          state.player.srWardenKeyUsedThisTurn = true;
          state.player.armor = (state.player.armor || 0) + 4;
          armorGained = 4;
        }
        return Object.assign({}, h || { kind: "damage", amount: 0 }, { shardsGained, armorGained, overflowHits });
      };
      H.sr_summon_ban = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        if (!target || target.hp <= 0) return null;
        target.noArmorSummonTurns = Math.max(target.noArmorSummonTurns || 0, eff.turns || 2);
        return { kind: "sr_debuff_enemy", enemyUid: target.uid, label: "Запрет брони/призыва (" + target.noArmorSummonTurns + ")" };
      };
      H.sr_soul_paralysis = function (state, eff) {
        const req = eff.shardCost || 4;
        const sp = resolveEchoSpend(state, eff, "sr_soul_paralysis", req);
        if (sp.spent < req) return null;
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        if (!target || target.hp <= 0) return null;
        target.stunTurns = (target.stunTurns || 0) + (eff.stunTurns || 1);
        target.stunned = (target.stunned || 0) + (eff.stunTurns || 1);
        if (ROOT.EnemyLogic) ROOT.EnemyLogic.refreshIntentForEnemy(state, target);
        return { kind: "sr_debuff_enemy", enemyUid: target.uid, label: "Оглушение!" };
      };
      H.sr_chain_judgment = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        if (!target || target.hp <= 0) return null;
        target.shackles = (target.shackles || 0) * 2;
        const dmgAmt = target.shackles * (eff.multiplier || 2);
        if (dmgAmt <= 0) return { kind: "sr_debuff_enemy", enemyUid: target.uid, label: "Оковы: 0" };
        return deal(state, dmgAmt, target);
      };
      H.sr_sever_link = function (state, eff) {
        const target = eff.enemyRef || CombatSystem.getTargetEnemy(state);
        if (!target || target.hp <= 0) return null;
        return deal(state, eff.amount || 12, target, { soulLinkPctOverride: 1.0 });
      };
      H.sr_warden_verdict = function (state, eff) {
        state.player.srWardenShackles = (state.player.srWardenShackles || 0) + (eff.shacklesPerTurn || 2);
        state.player.srFirstHitReduce = (state.player.srFirstHitReduce || 0) + (eff.firstHitReduce || 4);
        return { kind: "sr_power", target: "player", label: "Приговор Хранителя" };
      };
      H.sr_soul_prison = function (state, eff) {
        state.player.srSoulPrison = true;
        state.player.srSoulPrisonArmor = (state.player.srSoulPrisonArmor || 0) + (eff.armorGain || 4);
        const living = E.getLivingEnemies(state);
        for (let i = 0; i < living.length; i++) {
          living[i].soulLinkPermanent = true;
          living[i].soulLinkPct = Math.max(living[i].soulLinkPct || 0, 0.5);
        }
        return { kind: "sr_power", target: "player", label: "Тюрьма Душ активна" };
      };
      H.sr_absolute_ban = function (state, eff) {
        const living = E.getLivingEnemies(state);
        const uids = [];
        for (let i = 0; i < living.length; i++) {
          const e = living[i];
          E.applyShackles(e, eff.shackles || 6);
          e.armor = 0;
          e.isEthereal = false;
          e.fury = 0;
          e.stunTurns = (e.stunTurns || 0) + (eff.stunTurns || 1);
          e.stunned = (e.stunned || 0) + (eff.stunTurns || 1);
          if (ROOT.EnemyLogic) ROOT.EnemyLogic.refreshIntentForEnemy(state, e);
          uids.push(e.uid);
        }
        return { kind: "sr_shackles_apply", amount: eff.shackles || 6, targetUids: uids, label: "Абсолютный Запрет!" };
      };
    },

    getSchoolSigilSvg(schoolKey, rarity) {
      const accent =
        rarity === "legendary"
          ? "#fbbf24"
          : schoolKey === "shadow"
          ? "#a855f7"
          : schoolKey === "reap"
          ? "#38bdf8"
          : schoolKey === "shackles"
          ? "#2dd4bf"
          : "#94a3b8";
      const accent2 =
        rarity === "legendary"
          ? "#f97316"
          : schoolKey === "shadow"
          ? "#38bdf8"
          : schoolKey === "reap"
          ? "#c084fc"
          : schoolKey === "shackles"
          ? "#60a5fa"
          : "#64748b";
      if (schoolKey === "shadow") {
        return (
          '<svg viewBox="0 0 120 80" class="sr-card-sigil" aria-hidden="true">' +
          '<defs><radialGradient id="srg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="' + accent + '" stop-opacity="0.45"/><stop offset="100%" stop-color="#090712" stop-opacity="0"/></radialGradient></defs>' +
          '<circle cx="60" cy="40" r="36" fill="url(#srg)"/>' +
          '<path d="M60 12 C42 20 34 38 42 56 C48 68 62 72 74 64 C56 64 48 48 54 32 C57 24 62 18 70 14 Z" fill="' + accent + '" opacity="0.9"/>' +
          '<path d="M46 42 L78 24 L66 44 L82 54 L48 52 Z" fill="' + accent2 + '" opacity="0.72"/>' +
          "</svg>"
        );
      }
      if (schoolKey === "reap") {
        return (
          '<svg viewBox="0 0 120 80" class="sr-card-sigil" aria-hidden="true">' +
          '<defs><radialGradient id="rrg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="' + accent2 + '" stop-opacity="0.45"/><stop offset="100%" stop-color="#090712" stop-opacity="0"/></radialGradient></defs>' +
          '<circle cx="60" cy="40" r="36" fill="url(#rrg)"/>' +
          '<path d="M24 62 L78 16 C92 22 96 42 84 56 C86 42 80 30 68 28 L30 68 Z" fill="' + accent + '" opacity="0.92"/>' +
          '<polygon points="60,12 68,26 60,40 52,26" fill="' + accent2 + '" opacity="0.95"/>' +
          "</svg>"
        );
      }
      if (schoolKey === "shackles") {
        return (
          '<svg viewBox="0 0 120 80" class="sr-card-sigil" aria-hidden="true">' +
          '<defs><radialGradient id="krg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="' + accent + '" stop-opacity="0.42"/><stop offset="100%" stop-color="#090712" stop-opacity="0"/></radialGradient></defs>' +
          '<circle cx="60" cy="40" r="36" fill="url(#krg)"/>' +
          '<rect x="30" y="26" width="28" height="28" rx="10" fill="none" stroke="' + accent + '" stroke-width="4.5"/>' +
          '<rect x="62" y="26" width="28" height="28" rx="10" fill="none" stroke="' + accent2 + '" stroke-width="4.5"/>' +
          '<line x1="48" y1="40" x2="72" y2="40" stroke="#e2e8f0" stroke-width="4" stroke-linecap="round"/>' +
          "</svg>"
        );
      }
      return (
        '<svg viewBox="0 0 120 80" class="sr-card-sigil" aria-hidden="true">' +
        '<path d="M36 62 L84 18 M42 18 L78 62" stroke="' + accent + '" stroke-width="4.5" stroke-linecap="round"/>' +
        '<polygon points="60,24 68,40 60,56 52,40" fill="' + accent2 + '" opacity="0.85"/>' +
        "</svg>"
      );
    }
  };

  global.ShadowReaperModule = {
    HERO_ID,
    SCHOOLS,
    STARTER_DECK_RECIPE,
    CARD_LIST,
    CARD_MAP,
    buildUpgradedCard,
    Engine
  };
})(typeof window !== "undefined" ? window : globalThis);
