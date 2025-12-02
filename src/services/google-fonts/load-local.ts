import { readFileSync } from "node:fs";
import { join } from "node:path";

const FONTS_CACHE = new Map<string, Buffer>();

type LoadFontInput = {
  path: string
}

function loadFont({ path }: LoadFontInput) {
  if (FONTS_CACHE.has(path)) {
    const cachedFontBuffer = FONTS_CACHE.get(path)

    if (cachedFontBuffer) {
      return cachedFontBuffer
    }
  }

  const fontBuffer = readFileSync(join(process.cwd(), path))

  FONTS_CACHE.set(path, fontBuffer)

  return fontBuffer
}

export function loadPoppinsRegularFontFamily() {
  return loadFont({ path: "public/fonts/poppins/Poppins-Regular.ttf" })
}

export function loadPoppinsMediumFontFamily() {
  return loadFont({ path: "public/fonts/poppins/Poppins-Medium.ttf" });
}

export function loadPoppinsSemiBoldFontFamily() {
  return loadFont({ path: "public/fonts/poppins/Poppins-SemiBold.ttf" });
}
