(function (global) {
  "use strict";

  /**
   * Конфиг 2.5D-спрайтов всех обычных и элитных врагов.
   * Главный герой (Некромант) и финальный босс (crypt_warden) сюда НЕ входят —
   * их текущее отображение оставлено нетронутым.
   *
   * Для замены любого врага достаточно обновить соответствующую запись:
   *  - imageUrl: путь к основному спрайту (idle, PNG/WebP без фона)
   *  - scale: масштаб спрайта (1.0 = базовый; для элиты умножается на масштаб элиты арены)
   *  - flipX: true, если исходная картинка смотрит вправо (все враги должны смотреть влево, в сторону игрока)
   *  - attackFrames / hitFrames / deathFrames (опционально): массив кадров для покадровой анимации состояния
   *  - actionScale (опционально): поправка масштаба для action-кадров, если у них увеличен верхний запас под замах оружия
   *  - shadowWidth (опционально): ширина контактной тени (например, "76%")
   */
  const ENEMY_SPRITES_CONFIG = {
    // ===== ОБЫЧНЫЕ ВРАГИ =====
    cursed_warrior: {
      imageUrl: "/assets/enemies-25d/cursed_warrior/idle.webp",
      fallbackUrl: "/assets/skeleton.png",
      attackFrames: [
        "/assets/enemies-25d/cursed_warrior/attack-1.webp",
        "/assets/enemies-25d/cursed_warrior/attack-2.webp",
        "/assets/enemies-25d/cursed_warrior/attack-3.webp"
      ],
      hitFrames: [
        "/assets/enemies-25d/cursed_warrior/hit-1.webp",
        "/assets/enemies-25d/cursed_warrior/hit-2.webp",
        "/assets/enemies-25d/cursed_warrior/hit-3.webp"
      ],
      scale: 1.08,
      actionScale: 1.15,
      flipX: false,
      shadowWidth: "74%",
      attackDurationMs: 520,
      hitDurationMs: 460
    },
    skeleton_archer: {
      imageUrl: "/assets/enemies-25d/skeleton_archer/idle.webp",
      fallbackUrl: "/assets/enemy-skeleton-archer.png",
      attackFrames: [
        "/assets/enemies-25d/skeleton_archer/attack-1.webp",
        "/assets/enemies-25d/skeleton_archer/attack-2.webp",
        "/assets/enemies-25d/skeleton_archer/attack-3.webp"
      ],
      hitFrames: [
        "/assets/enemies-25d/skeleton_archer/hit-1.webp",
        "/assets/enemies-25d/skeleton_archer/hit-2.webp",
        "/assets/enemies-25d/skeleton_archer/hit-3.webp"
      ],
      scale: 1.06,
      actionScale: 1.085,
      flipX: false,
      shadowWidth: "70%",
      attackDurationMs: 560,
      hitDurationMs: 460,
      projectile: {
        type: "soul_arrow",
        originX: 0.14,
        originY: 0.36,
        releaseDelayMs: 165,
        travelMs: 320,
        arcHeight: 16,
        triggerOn: "attack"
      }
    },
    infected_zombie: {
      imageUrl: "/assets/enemies-25d/infected_zombie/idle.webp",
      fallbackUrl: "/assets/enemy-plague-ghoul.png",
      attackFrames: [
        "/assets/enemies-25d/infected_zombie/attack-1.webp",
        "/assets/enemies-25d/infected_zombie/attack-2.webp",
        "/assets/enemies-25d/infected_zombie/attack-3.webp"
      ],
      hitFrames: [
        "/assets/enemies-25d/infected_zombie/hit-1.webp",
        "/assets/enemies-25d/infected_zombie/hit-2.webp",
        "/assets/enemies-25d/infected_zombie/hit-3.webp"
      ],
      scale: 1.02,
      actionScale: 1.14,
      flipX: false,
      shadowWidth: "78%",
      attackDurationMs: 540,
      hitDurationMs: 460
    },
    grave_wraith: {
      imageUrl: "/assets/enemies-25d/grave_wraith/idle.webp",
      fallbackUrl: "/assets/enemy-grave-wraith.png",
      attackFrames: [
        "/assets/enemies-25d/grave_wraith/attack-1.webp",
        "/assets/enemies-25d/grave_wraith/attack-2.webp",
        "/assets/enemies-25d/grave_wraith/attack-3.webp"
      ],
      hitFrames: [
        "/assets/enemies-25d/grave_wraith/hit-1.webp",
        "/assets/enemies-25d/grave_wraith/hit-2.webp",
        "/assets/enemies-25d/grave_wraith/hit-3.webp"
      ],
      scale: 1.06,
      actionScale: 1.104,
      flipX: false,
      shadowWidth: "68%",
      attackDurationMs: 560,
      hitDurationMs: 480
    },
    enemy_necromancer: {
      imageUrl: "/assets/enemies-25d/enemy_necromancer/idle.webp",
      fallbackUrl: "/assets/enemy-necromancer.png",
      attackFrames: [
        "/assets/enemies-25d/enemy_necromancer/attack-1.webp",
        "/assets/enemies-25d/enemy_necromancer/attack-2.webp",
        "/assets/enemies-25d/enemy_necromancer/attack-3.webp"
      ],
      hitFrames: [
        "/assets/enemies-25d/enemy_necromancer/hit-1.webp",
        "/assets/enemies-25d/enemy_necromancer/hit-2.webp",
        "/assets/enemies-25d/enemy_necromancer/hit-3.webp"
      ],
      scale: 1.06,
      actionScale: 1.051,
      flipX: false,
      shadowWidth: "74%",
      attackDurationMs: 580,
      hitDurationMs: 480,
      projectile: {
        type: "dark_bolt",
        originX: 0.14,
        originY: 0.30,
        releaseDelayMs: 170,
        travelMs: 370,
        arcHeight: 18,
        triggerOn: "attack"
      }
    },
    bone_golem: {
      imageUrl: "/assets/enemies-25d/bone_golem/idle.webp",
      fallbackUrl: "/assets/enemy-bone-golem.png",
      attackFrames: [
        "/assets/enemies-25d/bone_golem/attack-1.webp",
        "/assets/enemies-25d/bone_golem/attack-2.webp",
        "/assets/enemies-25d/bone_golem/attack-3.webp"
      ],
      hitFrames: [
        "/assets/enemies-25d/bone_golem/hit-1.webp",
        "/assets/enemies-25d/bone_golem/hit-2.webp",
        "/assets/enemies-25d/bone_golem/hit-3.webp"
      ],
      scale: 1.14,
      actionScale: 1.003,
      flipX: false,
      shadowWidth: "84%",
      attackDurationMs: 580,
      hitDurationMs: 480
    },
    cursed_witch: {
      imageUrl: "/assets/enemies-25d/cursed_witch/idle.webp",
      fallbackUrl: "/assets/enemy-cursed-witch.png",
      attackFrames: [
        "/assets/enemies-25d/cursed_witch/attack-1.webp",
        "/assets/enemies-25d/cursed_witch/attack-2.webp",
        "/assets/enemies-25d/cursed_witch/attack-3.webp"
      ],
      hitFrames: [
        "/assets/enemies-25d/cursed_witch/hit-1.webp",
        "/assets/enemies-25d/cursed_witch/hit-2.webp",
        "/assets/enemies-25d/cursed_witch/hit-3.webp"
      ],
      scale: 1.05,
      actionScale: 1.04,
      flipX: false,
      shadowWidth: "70%",
      attackDurationMs: 580,
      hitDurationMs: 480,
      projectile: {
        type: "witch_hex",
        originX: 0.12,
        originY: 0.35,
        releaseDelayMs: 175,
        travelMs: 390,
        arcHeight: 22,
        triggerOn: "attack_or_debuff"
      }
    },
    cemetery_spider: {
      imageUrl: "/assets/enemies-25d/cemetery_spider/idle.webp",
      fallbackUrl: "/assets/enemy-cemetery-spider.png",
      attackFrames: [
        "/assets/enemies-25d/cemetery_spider/attack-1.webp",
        "/assets/enemies-25d/cemetery_spider/attack-2.webp",
        "/assets/enemies-25d/cemetery_spider/attack-3.webp"
      ],
      hitFrames: [
        "/assets/enemies-25d/cemetery_spider/hit-1.webp",
        "/assets/enemies-25d/cemetery_spider/hit-2.webp",
        "/assets/enemies-25d/cemetery_spider/hit-3.webp"
      ],
      scale: 0.98,
      actionScale: 1.04,
      flipX: false,
      shadowWidth: "82%",
      attackDurationMs: 560,
      hitDurationMs: 480,
      projectile: {
        type: "web_shot",
        originX: 0.22,
        originY: 0.46,
        releaseDelayMs: 170,
        travelMs: 360,
        arcHeight: 26,
        triggerOn: "web_only"
      }
    },
    ratkin_warlock: {
      imageUrl: "/assets/enemies-25d/ratkin_warlock/idle.webp",
      fallbackUrl: "/assets/enemy-ratkin-warlock.png",
      attackFrames: [
        "/assets/enemies-25d/ratkin_warlock/attack-1.webp",
        "/assets/enemies-25d/ratkin_warlock/attack-2.webp",
        "/assets/enemies-25d/ratkin_warlock/attack-3.webp"
      ],
      hitFrames: [
        "/assets/enemies-25d/ratkin_warlock/hit-1.webp",
        "/assets/enemies-25d/ratkin_warlock/hit-2.webp",
        "/assets/enemies-25d/ratkin_warlock/hit-3.webp"
      ],
      scale: 1.05,
      actionScale: 1.04,
      flipX: false,
      shadowWidth: "74%",
      attackDurationMs: 580,
      hitDurationMs: 480,
      projectile: {
        type: "dark_bolt",
        originX: 0.14,
        originY: 0.34,
        releaseDelayMs: 175,
        travelMs: 380,
        arcHeight: 20,
        triggerOn: "attack"
      }
    },
    summoned_skeleton: {
      imageUrl: "/assets/enemies-25d/summoned_skeleton/idle.webp",
      fallbackUrl: "/assets/skeleton.png",
      attackFrames: [
        "/assets/enemies-25d/summoned_skeleton/attack-1.webp",
        "/assets/enemies-25d/summoned_skeleton/attack-2.webp",
        "/assets/enemies-25d/summoned_skeleton/attack-3.webp"
      ],
      hitFrames: [
        "/assets/enemies-25d/summoned_skeleton/hit-1.webp",
        "/assets/enemies-25d/summoned_skeleton/hit-2.webp",
        "/assets/enemies-25d/summoned_skeleton/hit-3.webp"
      ],
      scale: 0.96,
      actionScale: 1.051,
      flipX: false,
      shadowWidth: "66%",
      attackDurationMs: 520,
      hitDurationMs: 460
    },

    // ===== ЭЛИТНЫЕ ВРАГИ =====
    grim_knight: {
      imageUrl: "/assets/enemies-25d/grim_knight/idle.webp",
      fallbackUrl: "/assets/enemy-bone-warden.png",
      attackFrames: [
        "/assets/enemies-25d/grim_knight/attack-1.webp",
        "/assets/enemies-25d/grim_knight/attack-2.webp",
        "/assets/enemies-25d/grim_knight/attack-3.webp"
      ],
      hitFrames: [
        "/assets/enemies-25d/grim_knight/hit-1.webp",
        "/assets/enemies-25d/grim_knight/hit-2.webp",
        "/assets/enemies-25d/grim_knight/hit-3.webp"
      ],
      scale: 1.06,
      actionScale: 1.056,
      flipX: false,
      shadowWidth: "82%",
      attackDurationMs: 560,
      hitDurationMs: 480
    },
    blood_inquisitor: {
      imageUrl: "/assets/enemies-25d/blood_inquisitor/idle.webp",
      fallbackUrl: "/assets/enemy-blood-inquisitor.png",
      attackFrames: [
        "/assets/enemies-25d/blood_inquisitor/attack-1.webp",
        "/assets/enemies-25d/blood_inquisitor/attack-2.webp",
        "/assets/enemies-25d/blood_inquisitor/attack-3.webp"
      ],
      hitFrames: [
        "/assets/enemies-25d/blood_inquisitor/hit-1.webp",
        "/assets/enemies-25d/blood_inquisitor/hit-2.webp",
        "/assets/enemies-25d/blood_inquisitor/hit-3.webp"
      ],
      scale: 1.05,
      actionScale: 1.122,
      flipX: false,
      shadowWidth: "78%",
      attackDurationMs: 560,
      hitDurationMs: 480,
      projectile: {
        type: "blood_bolt",
        originX: 0.16,
        originY: 0.38,
        releaseDelayMs: 170,
        travelMs: 350,
        arcHeight: 16,
        triggerOn: "attack_or_debuff"
      }
    },
    bone_sculptor: {
      imageUrl: "/assets/enemies-25d/bone_sculptor/idle.webp",
      fallbackUrl: "/assets/enemy-bone-sculptor.png",
      attackFrames: [
        "/assets/enemies-25d/bone_sculptor/attack-1.webp",
        "/assets/enemies-25d/bone_sculptor/attack-2.webp",
        "/assets/enemies-25d/bone_sculptor/attack-3.webp"
      ],
      hitFrames: [
        "/assets/enemies-25d/bone_sculptor/hit-1.webp",
        "/assets/enemies-25d/bone_sculptor/hit-2.webp",
        "/assets/enemies-25d/bone_sculptor/hit-3.webp"
      ],
      scale: 1.08,
      actionScale: 1.003,
      flipX: false,
      shadowWidth: "82%",
      attackDurationMs: 580,
      hitDurationMs: 480
    },
    plague_herald: {
      imageUrl: "/assets/enemies-25d/plague_herald/idle.webp",
      fallbackUrl: "/assets/enemy-plague-herald.png",
      attackFrames: [
        "/assets/enemies-25d/plague_herald/attack-1.webp",
        "/assets/enemies-25d/plague_herald/attack-2.webp",
        "/assets/enemies-25d/plague_herald/attack-3.webp"
      ],
      hitFrames: [
        "/assets/enemies-25d/plague_herald/hit-1.webp",
        "/assets/enemies-25d/plague_herald/hit-2.webp",
        "/assets/enemies-25d/plague_herald/hit-3.webp"
      ],
      scale: 1.06,
      actionScale: 1.026,
      flipX: false,
      shadowWidth: "78%",
      attackDurationMs: 580,
      hitDurationMs: 480,
      projectile: {
        type: "plague_glob",
        originX: 0.14,
        originY: 0.36,
        releaseDelayMs: 175,
        travelMs: 380,
        arcHeight: 24,
        triggerOn: "attack_or_debuff"
      }
    },

    // ===== БОССЫ АКТА I =====
    crimson_executioner: {
      imageUrl: "/assets/enemies-25d/crimson_executioner/idle.webp",
      fallbackUrl: "/assets/enemies-25d/crimson_executioner/idle.webp",
      attackFrames: [
        "/assets/enemies-25d/crimson_executioner/attack-1.webp",
        "/assets/enemies-25d/crimson_executioner/attack-2.webp",
        "/assets/enemies-25d/crimson_executioner/attack-3.webp"
      ],
      hitFrames: [
        "/assets/enemies-25d/crimson_executioner/hit-1.webp",
        "/assets/enemies-25d/crimson_executioner/hit-2.webp",
        "/assets/enemies-25d/crimson_executioner/hit-3.webp"
      ],
      scale: 1.12,
      actionScale: 1.012,
      flipX: false,
      shadowWidth: "84%",
      attackDurationMs: 620,
      hitDurationMs: 500
    },
    mistress_of_pestilence: {
      imageUrl: "/assets/enemies-25d/mistress_of_pestilence/idle.webp",
      fallbackUrl: "/assets/enemies-25d/mistress_of_pestilence/idle.webp",
      attackFrames: [
        "/assets/enemies-25d/mistress_of_pestilence/attack-1.webp",
        "/assets/enemies-25d/mistress_of_pestilence/attack-2.webp",
        "/assets/enemies-25d/mistress_of_pestilence/attack-3.webp"
      ],
      castFrames: [
        "/assets/enemies-25d/mistress_of_pestilence/cast-1.webp",
        "/assets/enemies-25d/mistress_of_pestilence/cast-2.webp",
        "/assets/enemies-25d/mistress_of_pestilence/cast-3.webp"
      ],
      hitFrames: [],
      scale: 1.14,
      actionScale: 1.077,
      flipX: false,
      shadowWidth: "78%",
      attackDurationMs: 620,
      hitDurationMs: 460,
      projectile: {
        type: "plague_glob",
        originX: 0.14,
        originY: 0.36,
        releaseDelayMs: 185,
        travelMs: 390,
        arcHeight: 22,
        triggerOn: "attack_or_debuff"
      }
    }
  };

  /**
   * Конфиг 2.5D-спрайтов призванных слуг игрока (смотрят вправо, к врагам).
   * Ключи соответствуют minion.role: "skeleton" | "guardian" | "knight".
   */
  const MINION_SPRITES_CONFIG = {
    skeleton: {
      imageUrl: "/assets/minions-25d/skeleton/idle.webp",
      fallbackUrl: "/assets/minion-skeleton.png",
      attackFrames: [
        "/assets/minions-25d/skeleton/attack-1.webp",
        "/assets/minions-25d/skeleton/attack-2.webp",
        "/assets/minions-25d/skeleton/attack-3.webp"
      ],
      hitFrames: [
        "/assets/minions-25d/skeleton/hit-1.webp",
        "/assets/minions-25d/skeleton/hit-2.webp",
        "/assets/minions-25d/skeleton/hit-3.webp"
      ],
      scale: 1.0,
      actionScale: 1.0,
      flipX: false,
      shadowWidth: "74%",
      attackDurationMs: 520,
      hitDurationMs: 440,
      isAlly: true
    },
    guardian: {
      imageUrl: "/assets/minions-25d/bone_guardian/idle.webp",
      fallbackUrl: "/assets/minion-skeleton.png",
      attackFrames: [
        "/assets/minions-25d/bone_guardian/attack-1.webp",
        "/assets/minions-25d/bone_guardian/attack-2.webp",
        "/assets/minions-25d/bone_guardian/attack-3.webp"
      ],
      hitFrames: [
        "/assets/minions-25d/bone_guardian/hit-1.webp",
        "/assets/minions-25d/bone_guardian/hit-2.webp",
        "/assets/minions-25d/bone_guardian/hit-3.webp"
      ],
      scale: 1.04,
      actionScale: 1.0,
      flipX: false,
      shadowWidth: "82%",
      attackDurationMs: 540,
      hitDurationMs: 460,
      isAlly: true
    },
    knight: {
      imageUrl: "/assets/minions-25d/bone_knight/idle.webp",
      fallbackUrl: "/assets/minion-skeleton.png",
      attackFrames: [
        "/assets/minions-25d/bone_knight/attack-1.webp",
        "/assets/minions-25d/bone_knight/attack-2.webp",
        "/assets/minions-25d/bone_knight/attack-3.webp"
      ],
      hitFrames: [
        "/assets/minions-25d/bone_knight/hit-1.webp",
        "/assets/minions-25d/bone_knight/hit-2.webp",
        "/assets/minions-25d/bone_knight/hit-3.webp"
      ],
      scale: 1.08,
      actionScale: 1.0,
      flipX: false,
      shadowWidth: "82%",
      attackDurationMs: 560,
      hitDurationMs: 460,
      isAlly: true
    }
  };

  // Кэш предзагруженных кадров, чтобы при первой атаке/ударе не было мерцания
  const preloadedUrls = new Set();
  function preloadImage(url) {
    if (!url || preloadedUrls.has(url) || typeof Image === "undefined") return;
    preloadedUrls.add(url);
    const img = new Image();
    img.decoding = "async";
    img.src = url;
  }

  function resolveAssetUrl(url, resolver) {
    if (!url) return "";
    if (typeof resolver === "function") return resolver(url);
    return url;
  }

  /**
   * Единый 2.5D-компонент отображения и процедурной анимации врага.
   * Поддерживает состояния: 'idle' | 'attack' | 'hit' | 'death',
   * параметры imageUrl, scale, flipX и опциональные покадровые спрайты состояний.
   */
  class EnemySprite {
    constructor(options) {
      const opts = options || {};
      this.resolveAsset = typeof opts.resolveAsset === "function" ? opts.resolveAsset : null;
      this.imageUrl = opts.imageUrl || "/assets/skeleton.png";
      this.fallbackUrl = opts.fallbackUrl || "/assets/skeleton.png";
      this.alt = opts.alt || "";
      this.scale = typeof opts.scale === "number" && isFinite(opts.scale) ? opts.scale : 1;
      this.actionScale = typeof opts.actionScale === "number" && isFinite(opts.actionScale) ? opts.actionScale : 1;
      this.flipX = Boolean(opts.flipX);
      this.shadowWidth = opts.shadowWidth || "74%";
      this.attackFrames = Array.isArray(opts.attackFrames) ? opts.attackFrames.slice() : [];
      this.castFrames = Array.isArray(opts.castFrames) ? opts.castFrames.slice() : [];
      this.hitFrames = Array.isArray(opts.hitFrames) ? opts.hitFrames.slice() : [];
      this.deathFrames = Array.isArray(opts.deathFrames) ? opts.deathFrames.slice() : [];
      this.attackDurationMs = opts.attackDurationMs || 480;
      this.hitDurationMs = opts.hitDurationMs || 420;
      this.state = "idle";
      this._timers = [];
      this._destroyed = false;

      // Рандомная задержка и лёгкий разброс темпа дыхания для рассинхронизации отряда
      const idleDelay = -(Math.random() * 2.8).toFixed(2) + "s";
      const idleDuration = (2.75 + Math.random() * 0.65).toFixed(2) + "s";

      // Корневой 2.5D-контейнер (overflow: visible, опора строго снизу по центру)
      this.isAlly = Boolean(opts.isAlly);
      this.el = document.createElement("div");
      this.el.className = this.isAlly ? "enemy-sprite-25d enemy-sprite-25d--ally" : "enemy-sprite-25d";
      this.el.dataset.state = "idle";
      this.el.style.setProperty("--es-scale", String(this.scale));
      this.el.style.setProperty("--es-action-scale", "1");
      this.el.style.setProperty("--es-flip", this.flipX ? "-1" : "1");
      this.el.style.setProperty("--es-idle-delay", idleDelay);
      this.el.style.setProperty("--es-idle-duration", idleDuration);
      this.el.style.setProperty("--es-shadow-w", this.shadowWidth);
      if (typeof opts.zIndex === "number") {
        this.el.style.zIndex = String(opts.zIndex);
      }

      // Мягкая контактная тень на плоскости арены, реагирующая на движения
      this.shadowEl = document.createElement("div");
      this.shadowEl.className = "enemy-sprite-25d__shadow";
      this.shadowEl.setAttribute("aria-hidden", "true");

      // Сцена с flipX и базовым scale от нижней опорной точки
      this.stageEl = document.createElement("div");
      this.stageEl.className = "enemy-sprite-25d__stage";

      // Актёр, на котором проигрываются 2.5D-трансформации состояний
      this.actorEl = document.createElement("div");
      this.actorEl.className = "enemy-sprite-25d__actor";

      // Основное изображение спрайта (object-contain, привязано к нижней линии)
      this.imgEl = document.createElement("img");
      this.imgEl.className = "enemy-sprite-25d__img character-sprite";
      this.imgEl.alt = this.alt;
      this.imgEl.draggable = false;
      this.imgEl.decoding = "async";
      this._idleResolved = resolveAssetUrl(this.imageUrl, this.resolveAsset);
      this._fallbackResolved = resolveAssetUrl(this.fallbackUrl, this.resolveAsset);
      this.imgEl.dataset.fallbackSrc = this._fallbackResolved;
      this.imgEl.src = this._idleResolved;
      this.imgEl.onerror = () => {
        if (!this.imgEl.dataset.fb && this._fallbackResolved && this.imgEl.src !== this._fallbackResolved) {
          this.imgEl.dataset.fb = "1";
          this.imgEl.src = this._fallbackResolved;
        }
      };

      this.actorEl.appendChild(this.imgEl);
      this.stageEl.appendChild(this.actorEl);
      this.el.appendChild(this.shadowEl);
      this.el.appendChild(this.stageEl);

      // Предзагрузка кадров анимаций
      this._preloadFrames();

      if (opts.state && opts.state !== "idle") {
        this.setState(opts.state);
      }
    }

    _preloadFrames() {
      const lists = [this.attackFrames, this.castFrames, this.hitFrames, this.deathFrames];
      for (let i = 0; i < lists.length; i++) {
        const arr = lists[i];
        for (let j = 0; j < arr.length; j++) {
          preloadImage(resolveAssetUrl(arr[j], this.resolveAsset));
        }
      }
    }

    _clearTimers() {
      for (let i = 0; i < this._timers.length; i++) {
        global.clearTimeout(this._timers[i]);
      }
      this._timers.length = 0;
    }

    _setTimeout(fn, ms) {
      const id = global.setTimeout(() => {
        const idx = this._timers.indexOf(id);
        if (idx !== -1) this._timers.splice(idx, 1);
        if (!this._destroyed) fn();
      }, ms);
      this._timers.push(id);
      return id;
    }

    _setFrameSrc(url, isActionFrame) {
      const resolved = resolveAssetUrl(url || this.imageUrl, this.resolveAsset);
      if (resolved && this.imgEl.getAttribute("src") !== resolved) {
        this.imgEl.setAttribute("src", resolved);
      }
      const actScale = isActionFrame ? this.actionScale : 1;
      this.el.style.setProperty("--es-action-scale", String(actScale));
    }

    _playFrameSequence(frames, totalDurationMs, keepLast) {
      if (!frames || frames.length === 0) {
        this._setFrameSrc(this.imageUrl, false);
        return;
      }
      const count = frames.length;
      // Распределяем кадры с акцентом на фазу удара/отдачи
      const weights = count === 3 ? [0.28, 0.42, 0.30] : frames.map(() => 1 / count);
      let elapsed = 0;
      for (let i = 0; i < count; i++) {
        const frameUrl = frames[i];
        const delay = Math.round(elapsed);
        if (delay === 0) {
          this._setFrameSrc(frameUrl, true);
        } else {
          this._setTimeout(() => {
            this._setFrameSrc(frameUrl, true);
          }, delay);
        }
        elapsed += totalDurationMs * weights[i];
      }
      if (!keepLast) {
        this._setTimeout(() => {
          if (this.state !== "death") {
            this._setFrameSrc(this.imageUrl, false);
          }
        }, totalDurationMs);
      }
    }

    setState(nextState, opts) {
      if (this._destroyed) return;
      const state = nextState === "attack" || nextState === "hit" || nextState === "death" ? nextState : "idle";
      if (this.state === "death" && state !== "idle" && !(opts && opts.force)) {
        return;
      }

      this._clearTimers();
      this.state = state;

      // Принудительный перезапуск CSS-анимации при повторных ударах/атаках
      if (state === "attack" || state === "hit") {
        this.el.dataset.state = "idle";
        void this.actorEl.offsetWidth;
      }
      this.el.dataset.state = state;

      if (state === "idle") {
        this._setFrameSrc(this.imageUrl, false);
      } else if (state === "attack") {
        const dur = (opts && opts.durationMs) || this.attackDurationMs;
        const variant = opts && opts.variant;
        const frames = (variant === "cast" && this.castFrames.length > 0) ? this.castFrames : this.attackFrames;
        this.el.style.setProperty("--es-attack-dur", dur + "ms");
        this._playFrameSequence(frames, dur, false);
        this._setTimeout(() => {
          if (this.state === "attack") {
            this.setState("idle");
          }
        }, dur + 20);
      } else if (state === "hit") {
        const dur = (opts && opts.durationMs) || this.hitDurationMs;
        this.el.style.setProperty("--es-hit-dur", dur + "ms");
        this._playFrameSequence(this.hitFrames, dur, false);
        this._setTimeout(() => {
          if (this.state === "hit") {
            this.setState("idle");
          }
        }, dur + 20);
      } else if (state === "death") {
        if (this.deathFrames.length > 0) {
          this._playFrameSequence(this.deathFrames, 460, true);
        } else {
          this._setFrameSrc(this.imageUrl, false);
        }
      }
    }

    playAttack(durationMs, variant) {
      const opts = {};
      if (durationMs) opts.durationMs = durationMs;
      if (variant) opts.variant = variant;
      this.setState("attack", Object.keys(opts).length > 0 ? opts : undefined);
    }

    playHit(durationMs) {
      this.setState("hit", durationMs ? { durationMs } : undefined);
    }

    setDead(isDead) {
      if (isDead) {
        if (this.state !== "death") {
          this.setState("death");
        }
      } else if (this.state === "death") {
        this.setState("idle", { force: true });
      }
    }

    updateConfig(cfg) {
      if (!cfg || this._destroyed) return;
      if (cfg.imageUrl) {
        this.imageUrl = cfg.imageUrl;
        this._idleResolved = resolveAssetUrl(this.imageUrl, this.resolveAsset);
        if (this.state === "idle") {
          this._setFrameSrc(this.imageUrl, false);
        }
      }
      if (typeof cfg.scale === "number" && isFinite(cfg.scale)) {
        this.scale = cfg.scale;
        this.el.style.setProperty("--es-scale", String(this.scale));
      }
      if (typeof cfg.actionScale === "number" && isFinite(cfg.actionScale)) {
        this.actionScale = cfg.actionScale;
      }
      if (typeof cfg.flipX === "boolean") {
        this.flipX = cfg.flipX;
        this.el.style.setProperty("--es-flip", this.flipX ? "-1" : "1");
      }
      if (cfg.shadowWidth) {
        this.shadowWidth = cfg.shadowWidth;
        this.el.style.setProperty("--es-shadow-w", this.shadowWidth);
      }
      if (Array.isArray(cfg.attackFrames)) this.attackFrames = cfg.attackFrames.slice();
      if (Array.isArray(cfg.castFrames)) this.castFrames = cfg.castFrames.slice();
      if (Array.isArray(cfg.hitFrames)) this.hitFrames = cfg.hitFrames.slice();
      if (Array.isArray(cfg.deathFrames)) this.deathFrames = cfg.deathFrames.slice();
      this._preloadFrames();
    }

    destroy() {
      this._destroyed = true;
      this._clearTimers();
    }
  }

  /**
   * Движок дальнобойных снарядов врагов (стрела лучника, магия ведьмы, тёмный сгусток, паутина, чумная сфера, кровавый болт).
   * Рисует на собственном оверлей-канвасе поверх .battle-stage (не затрагивает NecromancerAnimator и CryptWardenAnimator).
   */
  const EnemyProjectileVFX = {
    canvas: null,
    ctx: null,
    stageEl: null,
    projectiles: [],
    particles: [],
    rings: [],
    rafId: null,
    lastTs: 0,

    ensureCanvas() {
      if (typeof document === "undefined") return null;
      const stage = document.querySelector(".battle-stage");
      if (!stage) return null;
      if (!this.canvas || !this.canvas.parentNode || this.stageEl !== stage) {
        this.stageEl = stage;
        let existing = document.getElementById("enemy-projectile-vfx-canvas");
        if (!existing) {
          existing = document.createElement("canvas");
          existing.id = "enemy-projectile-vfx-canvas";
          existing.className = "enemy-projectile-vfx-canvas";
          existing.setAttribute("aria-hidden", "true");
          stage.appendChild(existing);
        }
        this.canvas = existing;
        this.ctx = existing.getContext("2d");
      }
      this.syncSize();
      return this.ctx;
    },

    syncSize() {
      if (!this.canvas || !this.stageEl) return;
      const rect = this.stageEl.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pw = Math.round(w * dpr);
      const ph = Math.round(h * dpr);
      if (this.canvas.width !== pw || this.canvas.height !== ph) {
        this.canvas.width = pw;
        this.canvas.height = ph;
        this.canvas.style.width = w + "px";
        this.canvas.style.height = h + "px";
      }
      if (this.ctx) {
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    },

    getProjectileConfig(enemy, intent, hasPlayerMinions) {
      if (!enemy || !intent) return null;
      const cfg = ENEMY_SPRITES_CONFIG[enemy.id];
      if (!cfg || !cfg.projectile) return null;
      const p = cfg.projectile;
      const hasAttack = (intent.damage || 0) > 0 || ((intent.minionSplashDamage || 0) > 0 && hasPlayerMinions);
      const hasDebuff = (intent.applyPlayerWeak || 0) > 0 || (intent.applyPlayerBlight || 0) > 0 || (intent.applyPlayerWeb || 0) > 0 || Boolean(intent.shuffleCurseCardId || intent.shufflesCurseId);
      const hasWeb = (intent.applyPlayerWeb || 0) > 0;
      if (p.triggerOn === "web_only") {
        return hasWeb ? p : null;
      }
      if (p.triggerOn === "attack_or_debuff") {
        return (hasAttack || hasDebuff) ? p : null;
      }
      return hasAttack ? p : null;
    },

    launch(opts) {
      const ctx = this.ensureCanvas();
      if (!ctx || !this.stageEl) {
        if (opts && typeof opts.onImpact === "function") opts.onImpact();
        return;
      }
      const stageRect = this.stageEl.getBoundingClientRect();
      const fromRect = opts.fromEl ? opts.fromEl.getBoundingClientRect() : null;
      const toRect = opts.toEl ? opts.toEl.getBoundingClientRect() : null;
      if (!fromRect || !toRect || stageRect.width < 10 || stageRect.height < 10) {
        if (opts && typeof opts.onImpact === "function") opts.onImpact();
        return;
      }

      const ox = typeof opts.originX === "number" ? opts.originX : 0.16;
      const oy = typeof opts.originY === "number" ? opts.originY : 0.38;
      const startX = (fromRect.left - stageRect.left) + fromRect.width * ox;
      const startY = (fromRect.top - stageRect.top) + fromRect.height * oy;
      const endX = (toRect.left - stageRect.left) + toRect.width * (typeof opts.targetX === "number" ? opts.targetX : 0.56);
      const endY = (toRect.top - stageRect.top) + toRect.height * (typeof opts.targetY === "number" ? opts.targetY : 0.48);

      const type = opts.type || "witch_hex";
      const proj = {
        type: type,
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        x: startX,
        y: startY,
        prevX: startX,
        prevY: startY,
        elapsed: 0,
        duration: Math.max(180, opts.travelMs || 340),
        arcHeight: typeof opts.arcHeight === "number" ? opts.arcHeight : 18,
        isHeavy: Boolean(opts.isHeavy),
        seed: Math.random() * Math.PI * 2,
        trail: [],
        onImpact: typeof opts.onImpact === "function" ? opts.onImpact : null,
        impacted: false
      };

      // Вспышка в точке выпуска (лук / рука ведьмы)
      this._spawnMuzzleFlash(startX, startY, type, proj.isHeavy);
      this.projectiles.push(proj);
      this._ensureLoop();
    },

    _palette(type, isHeavy) {
      if (type === "soul_arrow") {
        return {
          core: "#ffffff",
          mid: isHeavy ? "#bae6fd" : "#7dd3fc",
          outer: isHeavy ? "#38bdf8" : "#0284c7",
          glow: "rgba(56, 189, 248, 0.85)",
          smoke: "rgba(56, 189, 248, 0.35)"
        };
      }
      if (type === "witch_hex") {
        return {
          core: "#f5d0fe",
          mid: "#c084fc",
          outer: "#38bdf8",
          glow: "rgba(192, 132, 252, 0.9)",
          smoke: "rgba(46, 16, 101, 0.55)"
        };
      }
      if (type === "plague_glob") {
        return {
          core: "#ecfccb",
          mid: "#84cc16",
          outer: "#16a34a",
          glow: "rgba(132, 204, 22, 0.85)",
          smoke: "rgba(22, 101, 52, 0.45)"
        };
      }
      if (type === "web_shot") {
        return {
          core: "#ffffff",
          mid: "#e2e8f0",
          outer: "#94a3b8",
          glow: "rgba(226, 232, 240, 0.8)",
          smoke: "rgba(148, 163, 184, 0.35)"
        };
      }
      if (type === "blood_bolt") {
        return {
          core: "#ffe4e6",
          mid: "#fb7185",
          outer: "#be123c",
          glow: "rgba(244, 63, 94, 0.88)",
          smoke: "rgba(136, 19, 55, 0.48)"
        };
      }
      // dark_bolt default
      return {
        core: "#e9d5ff",
        mid: "#a855f7",
        outer: "#4c1d95",
        glow: "rgba(168, 85, 247, 0.88)",
        smoke: "rgba(30, 14, 58, 0.5)"
      };
    },

    _spawnMuzzleFlash(x, y, type, isHeavy) {
      const pal = this._palette(type, isHeavy);
      this.rings.push({
        x: x,
        y: y,
        r: 4,
        maxR: isHeavy ? 34 : 24,
        life: 0,
        maxLife: 200,
        color: pal.mid,
        lineWidth: 2.5
      });
      const count = type === "witch_hex" ? 10 : 7;
      for (let i = 0; i < count; i++) {
        const ang = Math.PI + (Math.random() - 0.5) * 1.4;
        const spd = 45 + Math.random() * 110;
        this.particles.push({
          x: x,
          y: y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          r: 2 + Math.random() * 2.5,
          life: 0,
          maxLife: 180 + Math.random() * 160,
          color: i % 2 === 0 ? pal.core : pal.mid,
          drag: 0.92
        });
      }
    },

    _spawnImpactBurst(x, y, type, isHeavy) {
      const pal = this._palette(type, isHeavy);
      this.rings.push({
        x: x,
        y: y,
        r: 6,
        maxR: isHeavy ? 62 : 46,
        life: 0,
        maxLife: 300,
        color: pal.mid,
        lineWidth: isHeavy ? 4 : 3
      });
      if (type === "witch_hex" || type === "dark_bolt") {
        this.rings.push({
          x: x,
          y: y,
          r: 4,
          maxR: 32,
          life: 0,
          maxLife: 240,
          color: pal.outer,
          lineWidth: 2.2
        });
      }
      const sparkCount = isHeavy ? 24 : 18;
      for (let i = 0; i < sparkCount; i++) {
        const ang = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.35;
        const spd = 70 + Math.random() * 190;
        this.particles.push({
          x: x,
          y: y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 20,
          r: 2.2 + Math.random() * 3.8,
          life: 0,
          maxLife: 260 + Math.random() * 240,
          color: i % 3 === 0 ? pal.core : (i % 3 === 1 ? pal.mid : pal.outer),
          drag: 0.91
        });
      }
      // Тёмно-фиолетовый дымок при попадании ведьминой магии
      if (type === "witch_hex" || type === "dark_bolt" || type === "plague_glob") {
        for (let s = 0; s < 8; s++) {
          const ang = Math.random() * Math.PI * 2;
          const spd = 24 + Math.random() * 55;
          this.particles.push({
            x: x + (Math.random() - 0.5) * 14,
            y: y + (Math.random() - 0.5) * 14,
            vx: Math.cos(ang) * spd,
            vy: Math.sin(ang) * spd - 16,
            r: 7 + Math.random() * 10,
            life: 0,
            maxLife: 380 + Math.random() * 220,
            color: pal.smoke,
            isSmoke: true,
            drag: 0.94
          });
        }
      }
    },

    _ensureLoop() {
      if (this.rafId !== null) return;
      this.lastTs = performance.now();
      const self = this;
      const tick = function (now) {
        const dt = Math.min(48, Math.max(8, now - self.lastTs));
        self.lastTs = now;
        self._step(dt);
        self._render();
        if (self.projectiles.length > 0 || self.particles.length > 0 || self.rings.length > 0) {
          self.rafId = window.requestAnimationFrame(tick);
        } else {
          self.rafId = null;
        }
      };
      this.rafId = window.requestAnimationFrame(tick);
    },

    _step(dt) {
      const dtSec = dt / 1000;
      for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const p = this.projectiles[i];
        p.elapsed += dt;
        const t = Math.min(1, p.elapsed / p.duration);
        p.prevX = p.x;
        p.prevY = p.y;

        // Плавная кривая полёта: лёгкое ускорение стрелы / волнообразное плетение магии ведьмы
        const easeT = p.type === "soul_arrow" ? (t * (0.82 + 0.18 * t)) : t;
        const arc = -Math.sin(t * Math.PI) * p.arcHeight;
        const wave = (p.type === "witch_hex" || p.type === "dark_bolt")
          ? Math.sin(t * Math.PI * 3 + p.seed) * 9 * Math.sin(t * Math.PI)
          : 0;

        p.x = p.startX + (p.endX - p.startX) * easeT;
        p.y = p.startY + (p.endY - p.startY) * easeT + arc + wave;

        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > (p.type === "soul_arrow" ? 11 : 15)) {
          p.trail.shift();
        }

        // Частицы шлейфа
        const pal = this._palette(p.type, p.isHeavy);
        const emitCount = p.type === "witch_hex" ? 3 : 2;
        for (let k = 0; k < emitCount; k++) {
          const isWitchSmoke = p.type === "witch_hex" && k === 2;
          this.particles.push({
            x: p.x + (Math.random() - 0.5) * (isWitchSmoke ? 12 : 6),
            y: p.y + (Math.random() - 0.5) * (isWitchSmoke ? 12 : 6),
            vx: (Math.random() - 0.5) * 28 + 18,
            vy: (Math.random() - 0.5) * 34 - (isWitchSmoke ? 12 : 0),
            r: isWitchSmoke ? (6 + Math.random() * 6) : (1.8 + Math.random() * 2.4),
            life: 0,
            maxLife: isWitchSmoke ? 280 : (170 + Math.random() * 140),
            color: isWitchSmoke ? pal.smoke : (k === 0 ? pal.mid : pal.outer),
            isSmoke: isWitchSmoke,
            drag: 0.94
          });
        }

        if (t >= 1) {
          this._spawnImpactBurst(p.endX, p.endY, p.type, p.isHeavy);
          this.projectiles.splice(i, 1);
          if (!p.impacted && p.onImpact) {
            p.impacted = true;
            try { p.onImpact(); } catch (_err) {}
          }
        }
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const pt = this.particles[i];
        pt.life += dt;
        if (pt.life >= pt.maxLife) {
          this.particles.splice(i, 1);
          continue;
        }
        pt.x += pt.vx * dtSec;
        pt.y += pt.vy * dtSec;
        pt.vx *= pt.drag;
        pt.vy *= pt.drag;
        if (pt.isSmoke) pt.r += dtSec * 14;
      }

      for (let i = this.rings.length - 1; i >= 0; i--) {
        const rg = this.rings[i];
        rg.life += dt;
        if (rg.life >= rg.maxLife) {
          this.rings.splice(i, 1);
          continue;
        }
        const rt = rg.life / rg.maxLife;
        rg.r = 4 + (rg.maxR - 4) * (1 - Math.pow(1 - rt, 2.4));
      }
    },

    _render() {
      if (!this.ctx || !this.canvas) return;
      const ctx = this.ctx;
      const rect = this.stageEl ? this.stageEl.getBoundingClientRect() : { width: this.canvas.width, height: this.canvas.height };
      ctx.clearRect(0, 0, rect.width, rect.height);

      // 1. Дымка (обычный блендинг)
      for (let i = 0; i < this.particles.length; i++) {
        const pt = this.particles[i];
        if (!pt.isSmoke) continue;
        const a = Math.max(0, 1 - pt.life / pt.maxLife);
        ctx.save();
        ctx.globalAlpha = a * 0.72;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 2. Светящиеся кольца и искры (аддитивное свечение)
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < this.rings.length; i++) {
        const rg = this.rings[i];
        const a = Math.max(0, 1 - rg.life / rg.maxLife);
        ctx.save();
        ctx.globalAlpha = a * 0.85;
        ctx.strokeStyle = rg.color;
        ctx.lineWidth = rg.lineWidth * a;
        ctx.beginPath();
        ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      for (let i = 0; i < this.particles.length; i++) {
        const pt = this.particles[i];
        if (pt.isSmoke) continue;
        const a = Math.max(0, 1 - pt.life / pt.maxLife);
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * (0.4 + 0.6 * a), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 3. Активные снаряды
      for (let i = 0; i < this.projectiles.length; i++) {
        const p = this.projectiles[i];
        const pal = this._palette(p.type, p.isHeavy);
        const angle = Math.atan2(p.y - p.prevY, p.x - p.prevX);

        // Светящийся хвост-лента
        if (p.trail.length >= 2) {
          for (let j = 1; j < p.trail.length; j++) {
            const frac = j / p.trail.length;
            ctx.save();
            ctx.globalAlpha = frac * (p.type === "soul_arrow" ? 0.82 : 0.75);
            ctx.strokeStyle = frac > 0.65 ? pal.mid : pal.outer;
            ctx.lineWidth = (p.type === "soul_arrow" ? (p.isHeavy ? 7 : 5) : 13) * frac;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(p.trail[j - 1].x, p.trail[j - 1].y);
            ctx.lineTo(p.trail[j].x, p.trail[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(angle);

        if (p.type === "soul_arrow") {
          const s = p.isHeavy ? 1.24 : 1.04;
          ctx.scale(s, s);
          // Сияющий ореол вокруг стрелы
          const grad = ctx.createRadialGradient(8, 0, 1, 0, 0, 26);
          grad.addColorStop(0, "rgba(255,255,255,0.95)");
          grad.addColorStop(0.35, pal.glow);
          grad.addColorStop(1, "rgba(2,132,199,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.ellipse(2, 0, 28, 10, 0, 0, Math.PI * 2);
          ctx.fill();

          // Древко стрелы
          ctx.strokeStyle = "#e0f2fe";
          ctx.lineWidth = 2.6;
          ctx.beginPath();
          ctx.moveTo(-26, 0);
          ctx.lineTo(14, 0);
          ctx.stroke();

          // Оперение
          ctx.strokeStyle = "#7dd3fc";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-22, 0); ctx.lineTo(-30, -6);
          ctx.moveTo(-22, 0); ctx.lineTo(-30, 6);
          ctx.moveTo(-16, 0); ctx.lineTo(-23, -5);
          ctx.moveTo(-16, 0); ctx.lineTo(-23, 5);
          ctx.stroke();

          // Пламенный наконечник
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.moveTo(22, 0);
          ctx.lineTo(7, -6.5);
          ctx.lineTo(11, 0);
          ctx.lineTo(7, 6.5);
          ctx.closePath();
          ctx.fill();
        } else if (p.type === "witch_hex") {
          // Вихревой магический сгусток ведьмы (фиолетово-голубой)
          const rOuter = 24;
          const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, rOuter);
          grad.addColorStop(0, "#ffffff");
          grad.addColorStop(0.28, pal.core);
          grad.addColorStop(0.62, pal.mid);
          grad.addColorStop(1, "rgba(56, 189, 248, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, rOuter, 0, Math.PI * 2);
          ctx.fill();

          // Вращающиеся магические языки
          const spin = p.elapsed * 0.018;
          ctx.strokeStyle = "#67e8f9";
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.arc(0, 0, 12, spin, spin + Math.PI * 1.15);
          ctx.stroke();
          ctx.strokeStyle = "#e879f9";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(0, 0, 15, -spin + 1.2, -spin + 1.2 + Math.PI * 1.1);
          ctx.stroke();

          // Яркое ядро
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(2, 0, 6, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === "web_shot") {
          // Летящая сеть кладбищенской паутины со светящимися нитями
          const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, 24);
          grad.addColorStop(0, "#ffffff");
          grad.addColorStop(0.45, "rgba(224, 242, 254, 0.78)");
          grad.addColorStop(1, "rgba(148, 163, 184, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, 24, 0, Math.PI * 2);
          ctx.fill();

          const webSpin = p.elapsed * 0.008;
          ctx.save();
          ctx.rotate(webSpin);
          ctx.strokeStyle = "rgba(248, 250, 252, 0.92)";
          ctx.lineWidth = 1.4;
          for (let s = 0; s < 6; s++) {
            const a = (Math.PI * 2 * s) / 6;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(a) * 16, Math.sin(a) * 16);
            ctx.stroke();
          }
          ctx.beginPath();
          ctx.arc(0, 0, 7, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, 13, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // Тянущиеся позади нити паутины
          ctx.strokeStyle = "rgba(226, 232, 240, 0.85)";
          ctx.lineWidth = 1.6;
          for (let w = -1; w <= 1; w++) {
            ctx.beginPath();
            ctx.moveTo(2, w * 4);
            ctx.quadraticCurveTo(-12, w * 11, -28, w * 7);
            ctx.stroke();
          }
        } else if (p.type === "dark_bolt") {
          // Электрический фиолетово-голубой сгусток скверны (Крысолюд-колдун / Вражеский некромант)
          const rOuter = 23;
          const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, rOuter);
          grad.addColorStop(0, "#ffffff");
          grad.addColorStop(0.32, "#e9d5ff");
          grad.addColorStop(0.66, "#a855f7");
          grad.addColorStop(1, "rgba(56, 189, 248, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, rOuter, 0, Math.PI * 2);
          ctx.fill();

          const spin = p.elapsed * 0.022;
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.arc(0, 0, 11, spin, spin + Math.PI * 1.1);
          ctx.stroke();
          ctx.strokeStyle = "#c084fc";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(0, 0, 15, -spin + 0.8, -spin + 0.8 + Math.PI * 0.95);
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(2, 0, 5.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // plague_glob / blood_bolt
          const rOuter = 20;
          const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, rOuter);
          grad.addColorStop(0, "#ffffff");
          grad.addColorStop(0.35, pal.core);
          grad.addColorStop(0.7, pal.mid);
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, rOuter, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
      ctx.restore();
    },

    clear() {
      if (this.rafId !== null) {
        window.cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      this.projectiles.length = 0;
      this.particles.length = 0;
      this.rings.length = 0;
      if (this.ctx && this.canvas) {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  };

  function getEnemySpriteConfig(enemy) {
    if (!enemy || enemy.id === "crypt_warden") return null;
    const preset = ENEMY_SPRITES_CONFIG[enemy.id];
    if (preset) {
      return Object.assign({}, preset, {
        fallbackUrl: preset.fallbackUrl || enemy.fallbackImage || "/assets/skeleton.png"
      });
    }
    return {
      imageUrl: enemy.image || "/assets/skeleton.png",
      fallbackUrl: enemy.fallbackImage || "/assets/skeleton.png",
      scale: 1.0,
      flipX: false,
      shadowWidth: "74%"
    };
  }

  function getMinionSpriteConfig(minion) {
    const role = (minion && minion.role) || "skeleton";
    const preset = MINION_SPRITES_CONFIG[role] || MINION_SPRITES_CONFIG.skeleton;
    return Object.assign({}, preset, {
      fallbackUrl: preset.fallbackUrl || (minion && minion.fallbackImage) || "/assets/minion-skeleton.png",
      alt: (minion && minion.name) || ""
    });
  }

  global.ENEMY_SPRITES_CONFIG = ENEMY_SPRITES_CONFIG;
  global.MINION_SPRITES_CONFIG = MINION_SPRITES_CONFIG;
  global.EnemySprite = EnemySprite;
  global.EnemyProjectileVFX = EnemyProjectileVFX;
  global.getEnemySpriteConfig = getEnemySpriteConfig;
  global.getMinionSpriteConfig = getMinionSpriteConfig;
})(window);
