// Hero video: put the academy's approved file in client/public/videos/ and set src, e.g. '/videos/hero.mp4'.
// Leave src empty to show the placeholder. captions: path to a .vtt file, e.g. '/videos/hero.vtt'.
export const HERO_VIDEO = { src: '/videos/hero.mp4', poster: '', captions: '' }

// Placeholder options for the UI-only search preview. The academy must approve the real lists.
export const JOB_SEARCH_OPTIONS = {
  disability: ['visual', 'hearing', 'locomotor', 'intellectual', 'other'],
  location: ['madhyaPradesh', 'maharashtra', 'delhi', 'karnataka'],
  qualification: ['below10', 'pass10', 'pass12', 'diploma', 'graduate'],
}