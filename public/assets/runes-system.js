(function (global) {
  "use strict";

  const ROOT = (global.NecroModules = global.NecroModules || {});

  const RARITIES = Object.freeze({
    common: Object.freeze({
      key: "common",
      name: "Обычная",
      charges: 1,
      basePrice: 55,
      border: "#8f98ad",
      glow: "rgba(143, 152, 173, 0.36)"
    }),
    uncommon: Object.freeze({
      key: "uncommon",
      name: "Необычная",
      charges: 2,
      basePrice: 85,
      border: "#55b8f0",
      glow: "rgba(85, 184, 240, 0.42)"
    }),
    rare: Object.freeze({
      key: "rare",
      name: "Редкая",
      charges: 3,
      basePrice: 120,
      border: "#e3b34c",
      glow: "rgba(227, 179, 76, 0.48)"
    })
  });

  const RUNE_LIST = [
    // Общие руны (6) — доступны всем героям
    {
      id: "rune_sharpness",
      name: "Руна Остроты",
      shortText: "+3 урона",
      description: "Карта дополнительно наносит +3 урона цели или случайному живому врагу.",
      color: "#f08a6c",
      icon: "/assets/runes/rune_sharpness.png",
      heroIds: null,
      targetType: "enemy"
    },
    {
      id: "rune_bastion",
      name: "Руна Бастиона",
      shortText: "+3 Брони",
      description: "Карта дополнительно даёт герою +3 Брони.",
      color: "#74b9ff",
      icon: "/assets/runes/rune_bastion.png",
      heroIds: null,
      targetType: "self"
    },
    {
      id: "rune_flow",
      name: "Руна Потока",
      shortText: "Добор +1 карты",
      description: "При розыгрыше этой карты вы дополнительно добираете 1 карту.",
      color: "#56e0c8",
      icon: "/assets/runes/rune_flow.png",
      heroIds: null,
      targetType: "self"
    },
    {
      id: "rune_retain",
      name: "Руна Стойкости",
      shortText: "Сохранение в руке",
      description: "Карта получает свойство Retain — не сбрасывается в конце хода и остаётся в руке.",
      color: "#e5c687",
      icon: "/assets/runes/rune_retain.png",
      heroIds: null,
      targetType: "passive"
    },
    {
      id: "rune_impulse",
      name: "Руна Импульса",
      shortText: "+1 мана (1 раз/бой)",
      description: "Первый розыгрыш этой карты в бою даёт +1 ману (1 раз за бой на экземпляр карты).",
      color: "#ffd166",
      icon: "/assets/runes/rune_impulse.png",
      heroIds: null,
      targetType: "self"
    },
    {
      id: "rune_life",
      name: "Руна Жизни",
      shortText: "+2 HP (1 раз/бой)",
      description: "Первый розыгрыш этой карты в бою восстанавливает +2 HP (1 раз за бой на экземпляр карты).",
      color: "#74e89b",
      icon: "/assets/runes/rune_life.png",
      heroIds: null,
      targetType: "self"
    },

    // Руны Некроманта — Валдриан (3)
    {
      id: "rune_decay",
      name: "Руна Тлена",
      shortText: "+2 Тлена",
      description: "Дополнительно накладывает +2 Тлена цели или случайному живому врагу.",
      color: "#8ce06c",
      icon: "/assets/runes/rune_decay.png",
      heroIds: ["necromancer"],
      targetType: "enemy"
    },
    {
      id: "rune_bone",
      name: "Руна Кости",
      shortText: "Слуги +1 атаки на ход",
      description: "Все призванные прислужники получают +1 к атаке до конца текущего хода.",
      color: "#d8d0be",
      icon: "/assets/runes/rune_bone.png",
      heroIds: ["necromancer"],
      targetType: "self"
    },
    {
      id: "rune_sacrifice",
      name: "Руна Жертвы",
      shortText: "-2 HP, +6 урона",
      description: "Герой теряет 2 HP (не может убить, остаётся 1 HP), карта наносит +6 урона цели или случайному врагу.",
      color: "#ff6b7a",
      icon: "/assets/runes/rune_sacrifice.png",
      heroIds: ["necromancer"],
      targetType: "enemy"
    },

    // Руны Теневого Жнеца — Вейран (3)
    {
      id: "rune_dusk",
      name: "Руна Сумерек",
      shortText: "В Тени: +4 Брони",
      description: "Если герой находится в Форме Тени, карта дополнительно даёт +4 Брони.",
      color: "#b388ff",
      icon: "/assets/runes/rune_dusk.png",
      heroIds: ["shadow_reaper"],
      targetType: "self"
    },
    {
      id: "rune_spark",
      name: "Руна Искры",
      shortText: "+1 Осколок души",
      description: "При розыгрыше карты герой дополнительно получает +1 Осколок души.",
      color: "#64f0ff",
      icon: "/assets/runes/rune_spark.png",
      heroIds: ["shadow_reaper"],
      targetType: "self"
    },
    {
      id: "rune_shackles",
      name: "Руна Кандалов",
      shortText: "+2 Оков",
      description: "Дополнительно накладывает +2 Оков цели или случайному живому врагу.",
      color: "#f09a5b",
      icon: "/assets/runes/rune_shackles.png",
      heroIds: ["shadow_reaper"],
      targetType: "enemy"
    }
  ];

  const RUNES = {};
  for (let i = 0; i < RUNE_LIST.length; i++) {
    RUNES[RUNE_LIST[i].id] = RUNE_LIST[i];
  }

  let uidCounter = 1;
  function makeRuneUid() {
    uidCounter += 1;
    return "rune_" + Date.now().toString(36) + "_" + uidCounter.toString(36) + "_" + Math.floor(Math.random() * 1e6).toString(36);
  }

  function translate(text) {
    if (global.NecroI18N && typeof global.NecroI18N.t === "function") {
      return global.NecroI18N.t(text);
    }
    return text;
  }

  function pickWeightedRarity(weights, rng) {
    const rFn = typeof rng === "function" ? rng : Math.random;
    const keys = ["common", "uncommon", "rare"];
    let total = 0;
    for (let i = 0; i < keys.length; i++) {
      total += Math.max(0, weights[keys[i]] || 0);
    }
    if (total <= 0) return "common";
    let roll = rFn() * total;
    for (let i = 0; i < keys.length; i++) {
      const w = Math.max(0, weights[keys[i]] || 0);
      if (w <= 0) continue;
      if (roll < w) return keys[i];
      roll -= w;
    }
    return "common";
  }

  function resolveTargetEnemy(state, preferredEnemy, rng) {
    if (preferredEnemy && preferredEnemy.hp > 0) {
      return preferredEnemy;
    }
    const living = ROOT.CombatSystem && typeof ROOT.CombatSystem.getLivingEnemies === "function"
      ? ROOT.CombatSystem.getLivingEnemies(state)
      : (Array.isArray(state && state.enemies) ? state.enemies.filter(function (e) { return e && e.hp > 0; }) : []);
    if (!living || living.length === 0) return null;
    const rFn = typeof rng === "function" ? rng : Math.random;
    return living[Math.floor(rFn() * living.length)] || living[0];
  }

  const RunesSystem = {
    RARITIES,
    RUNES,
    RUNE_LIST,

    getDefinition(runeId) {
      if (!runeId || typeof runeId !== "string") return null;
      return RUNES[runeId] || null;
    },

    getRarity(rarityKey) {
      return RARITIES[rarityKey] || RARITIES.common;
    },

    getRarityLabel(rarityKey) {
      return translate(this.getRarity(rarityKey).name);
    },

    getPoolForHero(heroId) {
      const activeHero = heroId || "necromancer";
      return RUNE_LIST.filter(function (rune) {
        return !Array.isArray(rune.heroIds) || rune.heroIds.indexOf(activeHero) !== -1;
      });
    },

    createInventoryRune(runeId, rarityKey) {
      const def = this.getDefinition(runeId);
      if (!def) return null;
      const rarity = this.getRarity(rarityKey);
      return {
        uid: makeRuneUid(),
        id: def.id,
        rarity: rarity.key,
        charges: rarity.charges,
        maxCharges: rarity.charges
      };
    },

    sanitizeInventoryItem(entry) {
      if (!entry || typeof entry !== "object") return null;
      const def = this.getDefinition(entry.id);
      if (!def) return null;
      const rarity = this.getRarity(entry.rarity);
      const maxCharges = typeof entry.maxCharges === "number" && entry.maxCharges > 0 ? Math.round(entry.maxCharges) : rarity.charges;
      const charges = typeof entry.charges === "number" ? Math.max(0, Math.min(maxCharges, Math.round(entry.charges))) : maxCharges;
      if (charges <= 0) return null;
      return {
        uid: typeof entry.uid === "string" && entry.uid ? entry.uid : makeRuneUid(),
        id: def.id,
        rarity: rarity.key,
        charges,
        maxCharges
      };
    },

    ensureRunRuneState(runState) {
      if (!runState || typeof runState !== "object") return runState;
      if (!Array.isArray(runState.runesInventory)) {
        runState.runesInventory = [];
      } else {
        const cleaned = [];
        for (let i = 0; i < runState.runesInventory.length; i++) {
          const item = this.sanitizeInventoryItem(runState.runesInventory[i]);
          if (item) cleaned.push(item);
        }
        runState.runesInventory = cleaned;
      }
      if (typeof runState.runePityBonus !== "number" || !Number.isFinite(runState.runePityBonus) || runState.runePityBonus < 0) {
        runState.runePityBonus = 0;
      }
      if (runState.pendingRewardRune) {
        const cleanPending = this.sanitizeInventoryItem(runState.pendingRewardRune);
        runState.pendingRewardRune = cleanPending;
      } else {
        runState.pendingRewardRune = null;
      }
      const deckLen = Array.isArray(runState.runDeck) ? runState.runDeck.length : 0;
      if (!Array.isArray(runState.runDeckRunes)) {
        runState.runDeckRunes = new Array(deckLen).fill(null);
      } else {
        while (runState.runDeckRunes.length < deckLen) {
          runState.runDeckRunes.push(null);
        }
        if (runState.runDeckRunes.length > deckLen) {
          runState.runDeckRunes.length = deckLen;
        }
        for (let j = 0; j < runState.runDeckRunes.length; j++) {
          const rId = runState.runDeckRunes[j];
          runState.runDeckRunes[j] = rId && this.getDefinition(rId) ? rId : null;
        }
      }
      if (Array.isArray(runState.runDeck)) {
        try {
          Object.defineProperty(runState.runDeck, "_runesRef", {
            value: runState.runDeckRunes,
            writable: true,
            configurable: true,
            enumerable: false
          });
        } catch (e) {
          runState.runDeck._runesRef = runState.runDeckRunes;
        }
      }
      return runState;
    },

    getRuneAtIndex(runState, deckIndex) {
      if (!runState || typeof deckIndex !== "number" || deckIndex < 0) return null;
      this.ensureRunRuneState(runState);
      const rId = runState.runDeckRunes[deckIndex];
      return rId && this.getDefinition(rId) ? rId : null;
    },

    setRuneAtIndex(runState, deckIndex, runeId) {
      if (!runState || !Array.isArray(runState.runDeck) || deckIndex < 0 || deckIndex >= runState.runDeck.length) {
        return false;
      }
      this.ensureRunRuneState(runState);
      runState.runDeckRunes[deckIndex] = runeId && this.getDefinition(runeId) ? runeId : null;
      return true;
    },

    addRuneToInventory(runState, runeItem) {
      if (!runState || !runeItem) return null;
      this.ensureRunRuneState(runState);
      const clean = this.sanitizeInventoryItem(runeItem);
      if (!clean) return null;
      runState.runesInventory.push(clean);
      return clean;
    },

    socketRuneOnCard(runState, runeUid, deckIndex) {
      if (!runState || !Array.isArray(runState.runDeck)) {
        return { ok: false, reason: "invalid_run" };
      }
      this.ensureRunRuneState(runState);
      if (typeof deckIndex !== "number" || deckIndex < 0 || deckIndex >= runState.runDeck.length) {
        return { ok: false, reason: "invalid_card_index" };
      }
      const cardId = runState.runDeck[deckIndex];
      const cardDef = ROOT.CardDatabase ? ROOT.CardDatabase.getDefinition(cardId) : null;
      if (!cardDef || cardDef.type === "curse") {
        return { ok: false, reason: "curse_not_allowed" };
      }
      const invIdx = runState.runesInventory.findIndex(function (r) {
        return r && r.uid === runeUid;
      });
      if (invIdx === -1) {
        return { ok: false, reason: "rune_not_found" };
      }
      const invItem = runState.runesInventory[invIdx];
      const runeDef = this.getDefinition(invItem.id);
      if (!runeDef || invItem.charges <= 0) {
        return { ok: false, reason: "no_charges" };
      }
      const previousRuneId = runState.runDeckRunes[deckIndex] || null;
      runState.runDeckRunes[deckIndex] = runeDef.id;
      invItem.charges = Math.max(0, invItem.charges - 1);
      let exhausted = false;
      if (invItem.charges <= 0) {
        runState.runesInventory.splice(invIdx, 1);
        exhausted = true;
      }
      return {
        ok: true,
        runeDef,
        cardId,
        cardDef,
        previousRuneId,
        remainingCharges: exhausted ? 0 : invItem.charges,
        exhausted
      };
    },

    rollRandomRuneFromPool(heroId, rarityKey, rng, excludeRuneId) {
      const rFn = typeof rng === "function" ? rng : Math.random;
      let pool = this.getPoolForHero(heroId);
      if (excludeRuneId && pool.length > 1) {
        const filtered = pool.filter(function (r) { return r.id !== excludeRuneId; });
        if (filtered.length > 0) pool = filtered;
      }
      if (pool.length === 0) return null;
      const picked = pool[Math.floor(rFn() * pool.length)] || pool[0];
      return this.createInventoryRune(picked.id, rarityKey);
    },

    rollBattleRuneDrop(runState, battleKind, rng) {
      if (!runState) return null;
      this.ensureRunRuneState(runState);
      const rFn = typeof rng === "function" ? rng : Math.random;
      const kind = battleKind === "boss" || battleKind === "elite" ? battleKind : "normal";
      const heroId = runState.heroId || "necromancer";

      if (kind === "boss") {
        const rarity = pickWeightedRarity({ common: 0, uncommon: 45, rare: 55 }, rFn);
        return this.rollRandomRuneFromPool(heroId, rarity, rFn);
      }

      if (kind === "elite") {
        if (rFn() >= 0.38) return null;
        const rarity = pickWeightedRarity({ common: 35, uncommon: 45, rare: 20 }, rFn);
        return this.rollRandomRuneFromPool(heroId, rarity, rFn);
      }

      // Normal battle with pity timer (+5% per miss, resets to 0 on normal drop)
      const chance = Math.min(1, 0.10 + (runState.runePityBonus || 0));
      if (rFn() < chance) {
        runState.runePityBonus = 0;
        const rarity = pickWeightedRarity({ common: 70, uncommon: 25, rare: 5 }, rFn);
        return this.rollRandomRuneFromPool(heroId, rarity, rFn);
      }
      runState.runePityBonus = Number(((runState.runePityBonus || 0) + 0.05).toFixed(4));
      return null;
    },

    getMerchantRunePrice(rarityKey, priceScale) {
      const rarity = this.getRarity(rarityKey);
      const scale = typeof priceScale === "number" && priceScale > 0 ? priceScale : 1;
      return Math.round(rarity.basePrice * scale);
    },

    rollMerchantRune(heroId, priceScale, rng, excludeRuneId) {
      const rFn = typeof rng === "function" ? rng : Math.random;
      const rarityKey = pickWeightedRarity({ common: 50, uncommon: 35, rare: 15 }, rFn);
      const item = this.rollRandomRuneFromPool(heroId || "necromancer", rarityKey, rFn, excludeRuneId);
      if (!item) return null;
      return {
        runeId: item.id,
        rarity: item.rarity,
        charges: item.charges,
        maxCharges: item.maxCharges,
        price: this.getMerchantRunePrice(item.rarity, priceScale),
        sold: false
      };
    },

    hasRetainRune(card) {
      return Boolean(card && card.rune === "rune_retain");
    },

    applyOnPlay(card, targetEnemy, state, rng) {
      const results = [];
      if (!card || !card.rune || !state || !state.player) {
        return results;
      }
      const runeDef = this.getDefinition(card.rune);
      if (!runeDef) return results;

      const player = state.player;
      const combat = ROOT.CombatSystem;

      if (runeDef.id === "rune_sharpness") {
        const target = resolveTargetEnemy(state, targetEnemy, rng);
        if (target && combat && combat.EFFECT_HANDLERS && combat.EFFECT_HANDLERS.damage) {
          const hit = combat.EFFECT_HANDLERS.damage(state, {
            kind: "damage",
            amount: 3,
            target: "enemy",
            enemyRef: target,
            isCardAttack: false,
            fromRune: true,
            runeId: runeDef.id
          });
          if (hit) {
            hit.fromRune = true;
            hit.runeId = runeDef.id;
            results.push(hit);
          }
        }
        return results;
      }

      if (runeDef.id === "rune_bastion") {
        player.armor = (player.armor || 0) + 3;
        results.push({
          kind: "armor",
          amount: 3,
          target: "player",
          fromRune: true,
          runeId: runeDef.id
        });
        return results;
      }

      if (runeDef.id === "rune_flow") {
        if (ROOT.DeckSystem && state.deck) {
          const drawn = ROOT.DeckSystem.drawCards(state.deck, 1, null);
          if (drawn > 0) {
            results.push({
              kind: "draw_cards",
              amount: drawn,
              requested: 1,
              target: "player",
              fromRune: true,
              runeId: runeDef.id
            });
          }
        }
        return results;
      }

      if (runeDef.id === "rune_retain") {
        // Passive effect handled during end-of-turn hand discard
        return results;
      }

      if (runeDef.id === "rune_impulse") {
        if (!card._runeUsedThisCombat) {
          card._runeUsedThisCombat = true;
          player.energy = (player.energy || 0) + 1;
          results.push({
            kind: "gain_energy",
            amount: 1,
            target: "player",
            fromRune: true,
            runeId: runeDef.id
          });
        }
        return results;
      }

      if (runeDef.id === "rune_life") {
        if (!card._runeUsedThisCombat) {
          card._runeUsedThisCombat = true;
          const prevHp = player.hp || 0;
          player.hp = Math.min(player.maxHp || prevHp, prevHp + 2);
          const actual = Math.max(0, player.hp - prevHp);
          results.push({
            kind: "heal",
            amount: 2,
            actual,
            target: "player",
            fromRune: true,
            runeId: runeDef.id
          });
        }
        return results;
      }

      if (runeDef.id === "rune_decay") {
        const target = resolveTargetEnemy(state, targetEnemy, rng);
        if (target) {
          target.blight = (target.blight || 0) + 2;
          results.push({
            kind: "status",
            status: "blight",
            amount: 2,
            targetUids: [target.uid],
            fromRune: true,
            runeId: runeDef.id
          });
        }
        return results;
      }

      if (runeDef.id === "rune_bone") {
        const minions = Array.isArray(player.minions) ? player.minions : [];
        let buffed = 0;
        for (let i = 0; i < minions.length; i++) {
          const m = minions[i];
          if (m && m.hp > 0) {
            m.runeTurnDamageBonus = (m.runeTurnDamageBonus || 0) + 1;
            buffed += 1;
          }
        }
        if (buffed > 0) {
          results.push({
            kind: "rune_bone_buff",
            amount: 1,
            count: buffed,
            target: "player",
            fromRune: true,
            runeId: runeDef.id
          });
        }
        return results;
      }

      if (runeDef.id === "rune_sacrifice") {
        // Non-lethal HP loss: if HP <= 2, drops to 1 HP (cannot kill)
        const curHp = player.hp || 1;
        const loss = curHp > 1 ? Math.min(2, curHp - 1) : 0;
        if (loss > 0) {
          player.hp = curHp - loss;
          if (state.stats) {
            state.stats.damageTaken = (state.stats.damageTaken || 0) + loss;
          }
          results.push({
            kind: "lose_hp",
            amount: loss,
            target: "player",
            fromRune: true,
            runeId: runeDef.id
          });
        }
        const target = resolveTargetEnemy(state, targetEnemy, rng);
        if (target && combat && combat.EFFECT_HANDLERS && combat.EFFECT_HANDLERS.damage) {
          const hit = combat.EFFECT_HANDLERS.damage(state, {
            kind: "damage",
            amount: 6,
            target: "enemy",
            enemyRef: target,
            isCardAttack: false,
            fromRune: true,
            runeId: runeDef.id
          });
          if (hit) {
            hit.fromRune = true;
            hit.runeId = runeDef.id;
            results.push(hit);
          }
        }
        return results;
      }

      if (runeDef.id === "rune_dusk") {
        const inShadow = player.heroForm === "shadow" || Boolean(player.srDualForm);
        if (inShadow) {
          player.armor = (player.armor || 0) + 4;
          results.push({
            kind: "armor",
            amount: 4,
            target: "player",
            fromRune: true,
            runeId: runeDef.id
          });
        }
        return results;
      }

      if (runeDef.id === "rune_spark") {
        if (global.ShadowReaperModule && global.ShadowReaperModule.Engine && typeof global.ShadowReaperModule.Engine.gainSoulShards === "function") {
          const res = global.ShadowReaperModule.Engine.gainSoulShards(state, 1);
          results.push({
            kind: "rune_soul_shard",
            amount: res ? res.gained : 0,
            overflow: res ? res.overflow : 0,
            overflowHits: res && Array.isArray(res.overflowHits) ? res.overflowHits : [],
            target: "player",
            fromRune: true,
            runeId: runeDef.id
          });
        } else {
          const cap = player.maxSoulShards || 6;
          const before = player.soulShards || 0;
          player.soulShards = Math.min(cap, before + 1);
          results.push({
            kind: "rune_soul_shard",
            amount: player.soulShards - before,
            overflow: 0,
            overflowHits: [],
            target: "player",
            fromRune: true,
            runeId: runeDef.id
          });
        }
        return results;
      }

      if (runeDef.id === "rune_shackles") {
        const target = resolveTargetEnemy(state, targetEnemy, rng);
        if (target) {
          if (global.ShadowReaperModule && global.ShadowReaperModule.Engine && typeof global.ShadowReaperModule.Engine.applyShackles === "function") {
            global.ShadowReaperModule.Engine.applyShackles(target, 2);
          } else {
            target.shackles = (target.shackles || 0) + 2;
          }
          results.push({
            kind: "status",
            status: "shackles",
            amount: 2,
            targetUids: [target.uid],
            fromRune: true,
            runeId: runeDef.id
          });
        }
        return results;
      }

      return results;
    }
  };

  ROOT.RunesSystem = RunesSystem;
  global.RunesSystem = RunesSystem;
})(typeof window !== "undefined" ? window : globalThis);
