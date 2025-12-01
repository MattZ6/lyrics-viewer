import { SONGS } from "@/data/songs"

type Input = {
  slug: string
}

export function getSongBySlug({ slug }: Input) {
  return SONGS.find(song => song.slug === slug.toLowerCase())
}
