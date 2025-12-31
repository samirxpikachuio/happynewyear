
const SOUNDS = {
  tap: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  whoosh: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  magic: 'https://assets.mixkit.co/active_storage/sfx/2434/2434-preview.mp3', // Soft notification chime instead of loud magic
  shutter: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3', // Soft interface click instead of loud chime
  flip: 'https://assets.mixkit.co/active_storage/sfx/1471/1471-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3',
  sparkle: 'https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3'
};

const BG_MUSIC_URL = 'https://files.catbox.moe/sef0i9.m4a';

class SoundManager {
  private audios: Map<string, HTMLAudioElement> = new Map();
  private bgMusic: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.3;

  constructor() {
    Object.entries(SOUNDS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      this.audios.set(key, audio);
    });

    this.bgMusic = new Audio(BG_MUSIC_URL);
    this.bgMusic.loop = true;
    this.bgMusic.volume = this.volume;
  }

  play(name: keyof typeof SOUNDS) {
    if (this.isMuted) return;
    const audio = this.audios.get(name);
    if (audio) {
      const clone = audio.cloneNode() as HTMLAudioElement;
      // Reduced volume for a more "low sound" feel as requested
      clone.volume = 0.2; 
      clone.play().catch(() => {});
    }
  }

  startBgMusic() {
    if (!this.bgMusic || this.isMuted) return;
    this.bgMusic.play().catch(() => {});
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgMusic) {
      if (this.isMuted) {
        this.bgMusic.pause();
      } else {
        this.bgMusic.play().catch(() => {});
      }
    }
    return this.isMuted;
  }

  getMutedStatus() {
    return this.isMuted;
  }
}

export const soundManager = new SoundManager();
