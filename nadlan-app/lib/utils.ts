import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Path of a photo in public/images, with the export base path. */
export function img(name: string) {
  return `${BASE}/images/${name}.webp`;
}

export function href(path: string) {
  return `${BASE}${path}`;
}

/** 12400000 -> "12,400,000 ₪" */
export function price(n: number) {
  return `${n.toLocaleString('en-US')} ₪`;
}

export function clamp(v: number, a = 0, b = 1) {
  return Math.min(b, Math.max(a, v));
}
