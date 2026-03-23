'use client';

import { useCallback, useEffect, useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SoundName = 'bounce' | 'brickBreak' | 'gameOver' | 'win' | 'loseLife' | 'click';

interface AudioState {
  enabled: boolean;
  toggle: () => void;
  playSound: (name: SoundName) => void;
  startMusic: () => void;
  stopMusic: () => void;
  pauseMusic: () => void;
  resumeMusic: () => void;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const STORAGE_KEY = 'neondojo-audio-enabled';

const NOTE = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.0,
  B5: 987.77,
  C3: 130.81,
  D3: 146.83,
  E3: 164.81,
  G3: 196.0,
  A3: 220.0,
  B3: 246.94,
  F3: 174.61,
} as const;

type NoteName = (typeof NOTE)[keyof typeof NOTE];

// Simple 8-bar chiptune melody (square wave friendly notes)
const MELODY: NoteName[] = [
  NOTE.E4,
  NOTE.G4,
  NOTE.A4,
  NOTE.B4,
  NOTE.C5,
  NOTE.B4,
  NOTE.A4,
  NOTE.G4,
  NOTE.E4,
  NOTE.D4,
  NOTE.C4,
  NOTE.D4,
  NOTE.E4,
  NOTE.E4,
  NOTE.E4,
  NOTE.E4, // hold
  NOTE.G4,
  NOTE.A4,
  NOTE.B4,
  NOTE.C5,
  NOTE.D5,
  NOTE.C5,
  NOTE.B4,
  NOTE.A4,
  NOTE.G4,
  NOTE.F4,
  NOTE.E4,
  NOTE.F4,
  NOTE.G4,
  NOTE.G4,
  NOTE.G4,
  NOTE.G4, // hold
];

const BASS: NoteName[] = [
  NOTE.C3,
  NOTE.C3,
  NOTE.C3,
  NOTE.C3,
  NOTE.G3,
  NOTE.G3,
  NOTE.G3,
  NOTE.G3,
  NOTE.A3,
  NOTE.A3,
  NOTE.A3,
  NOTE.A3,
  NOTE.E3,
  NOTE.E3,
  NOTE.E3,
  NOTE.E3,
  NOTE.C3,
  NOTE.C3,
  NOTE.C3,
  NOTE.C3,
  NOTE.G3,
  NOTE.G3,
  NOTE.G3,
  NOTE.G3,
  NOTE.F3,
  NOTE.F3,
  NOTE.F3,
  NOTE.F3,
  NOTE.G3,
  NOTE.G3,
  NOTE.G3,
  NOTE.G3,
];

const NOTE_DURATION = 0.14; // seconds per 16th note at ~108 BPM

// ─── Audio Context Singleton ─────────────────────────────────────────────────

let globalCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let musicGain: GainNode | null = null;
let sfxGain: GainNode | null = null;
let musicLoopTimeout: ReturnType<typeof setTimeout> | null = null;
let musicStartTime = 0;
let musicPauseTime = 0;
let musicPlaying = false;
let melodyOsc: OscillatorNode | null = null;
let bassOsc: OscillatorNode | null = null;
let arpeggioOsc: OscillatorNode | null = null;
let beatOsc: OscillatorNode | null = null;

function getCtx(): AudioContext {
  if (!globalCtx) {
    globalCtx = new AudioContext();
    masterGain = globalCtx.createGain();
    masterGain.gain.value = 0.5;
    masterGain.connect(globalCtx.destination);

    musicGain = globalCtx.createGain();
    musicGain.gain.value = 0.25;
    musicGain.connect(masterGain);

    sfxGain = globalCtx.createGain();
    sfxGain.gain.value = 0.6;
    sfxGain.connect(masterGain);
  }
  return globalCtx;
}

function resumeCtx() {
  const ctx = getCtx();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
}

// ─── Music Loop ──────────────────────────────────────────────────────────────

function stopAllMusicOscillators() {
  try {
    melodyOsc?.stop();
    bassOsc?.stop();
    arpeggioOsc?.stop();
    beatOsc?.stop();
  } catch {
    // ignore if already stopped
  }
  melodyOsc = null;
  bassOsc = null;
  arpeggioOsc = null;
  beatOsc = null;
  musicPlaying = false;
}

function scheduleMusicLoop(ctx: AudioContext, startOffset = 0) {
  stopAllMusicOscillators();

  const loopLen = MELODY.length * NOTE_DURATION; // ~7 bars at 108bpm
  const now = ctx.currentTime;

  // Melody oscillator
  melodyOsc = ctx.createOscillator();
  melodyOsc.type = 'square';
  melodyOsc.connect(musicGain!);
  melodyOsc.start(now);

  // Bass oscillator
  bassOsc = ctx.createOscillator();
  bassOsc.type = 'square';
  bassOsc.connect(musicGain!);
  bassOsc.start(now);

  // Beat/hi-hat noise (pulse wave approximation)
  beatOsc = ctx.createOscillator();
  beatOsc.type = 'square';
  beatOsc.frequency.value = 0; // we'll modulate it
  beatOsc.connect(musicGain!);
  beatOsc.start(now);

  musicPlaying = true;
  musicStartTime = now - startOffset;

  let noteIdx = Math.floor(startOffset / NOTE_DURATION) % MELODY.length;

  const scheduleNotes = () => {
    if (!musicPlaying || !ctx || !melodyOsc || !bassOsc) return;

    const currentTime = ctx.currentTime;
    const elapsed = currentTime - musicStartTime;
    const currentNoteIdx = Math.floor(elapsed / NOTE_DURATION) % MELODY.length;

    // Schedule a few notes ahead
    while (noteIdx !== currentNoteIdx) {
      const noteTime = musicStartTime + noteIdx * NOTE_DURATION;
      const melodyNote = MELODY[noteIdx % MELODY.length];
      const bassNote = BASS[noteIdx % BASS.length];

      // Melody note
      try {
        melodyOsc.frequency.setValueAtTime(melodyNote, noteTime);
      } catch {
        // ignore
      }

      // Bass note (every 4 notes)
      if (noteIdx % 4 === 0) {
        try {
          bassOsc.frequency.setValueAtTime(bassNote / 2, noteTime);
        } catch {
          // ignore
        }
      }

      noteIdx = (noteIdx + 1) % MELODY.length;
    }

    musicLoopTimeout = setTimeout(scheduleNotes, NOTE_DURATION * 500); // check every half-note
  };

  // Initial schedule
  scheduleNotes();

  // Schedule loop restart
  const loopEndTime = now + loopLen - startOffset;
  const timeoutDelay = (loopEndTime - ctx.currentTime) * 1000;
  musicLoopTimeout = setTimeout(
    () => {
      if (musicPlaying) {
        scheduleMusicLoop(ctx, 0);
      }
    },
    Math.max(0, timeoutDelay)
  );
}

function startMusic(enabled: boolean) {
  if (!enabled) return;
  resumeCtx();
  const ctx = getCtx();
  scheduleMusicLoop(ctx, 0);
}

function stopMusic() {
  if (musicLoopTimeout) {
    clearTimeout(musicLoopTimeout);
    musicLoopTimeout = null;
  }
  stopAllMusicOscillators();
}

function pauseMusic() {
  if (!musicPlaying) return;
  musicPauseTime = (getCtx().currentTime - musicStartTime) % (MELODY.length * NOTE_DURATION);
  stopAllMusicOscillators();
  if (musicLoopTimeout) {
    clearTimeout(musicLoopTimeout);
    musicLoopTimeout = null;
  }
}

function resumeMusic(enabled: boolean) {
  if (!enabled) return;
  resumeCtx();
  const ctx = getCtx();
  scheduleMusicLoop(ctx, musicPauseTime);
  musicPauseTime = 0;
}

// ─── Sound Effects ───────────────────────────────────────────────────────────

function playSfx(
  freq: number,
  duration: number,
  type: OscillatorType = 'square',
  gainValue = 0.4,
  freqEnd?: number
) {
  if (!sfxGain) return;
  resumeCtx();
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  if (freqEnd !== undefined) {
    osc.frequency.linearRampToValueAtTime(freqEnd, ctx.currentTime + duration);
  }

  gain.gain.setValueAtTime(gainValue, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(sfxGain);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

const SOUNDS: Record<SoundName, () => void> = {
  bounce: () => {
    const freq = 300 + Math.random() * 200;
    playSfx(freq, 0.08, 'square', 0.3);
  },
  brickBreak: () => {
    const freq = 600 + Math.random() * 200;
    playSfx(freq, 0.12, 'square', 0.4, 150);
  },
  gameOver: () => {
    // Descending sad tones
    const notes = [400, 350, 300, 200];
    notes.forEach((freq, i) => {
      setTimeout(() => playSfx(freq, 0.25, 'square', 0.35), i * 200);
    });
  },
  win: () => {
    // Ascending triumphant arpeggio
    const notes = [NOTE.C4, NOTE.E4, NOTE.G4, NOTE.C5, NOTE.E5, NOTE.G5];
    notes.forEach((freq, i) => {
      setTimeout(() => playSfx(freq, 0.15, 'square', 0.3), i * 80);
    });
  },
  loseLife: () => {
    playSfx(100, 0.3, 'sawtooth', 0.5, 50);
  },
  click: () => {
    playSfx(800, 0.05, 'square', 0.15, 600);
  },
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAudio(): AudioState {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(STORAGE_KEY) !== 'false';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(enabled));
  }, [enabled]);

  // Cleanup: stop music on unmount
  useEffect(() => {
    return () => {
      stopMusic();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (!next) {
        stopMusic();
      } else {
        startMusic(true);
      }
      return next;
    });
  }, []);

  const playSound = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      SOUNDS[name]();
    },
    [enabled]
  );

  const startMusicFn = useCallback(() => {
    if (!enabled) return;
    resumeCtx();
    startMusic(true);
  }, [enabled]);

  const stopMusicFn = useCallback(() => {
    stopMusic();
  }, []);

  const pauseMusicFn = useCallback(() => {
    pauseMusic();
  }, []);

  const resumeMusicFn = useCallback(() => {
    resumeMusic(enabled);
  }, [enabled]);

  return {
    enabled,
    toggle,
    playSound,
    startMusic: startMusicFn,
    stopMusic: stopMusicFn,
    pauseMusic: pauseMusicFn,
    resumeMusic: resumeMusicFn,
  };
}
