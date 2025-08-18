import {
  DropdownMenu,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu";

import { Songs } from "./components/songs";
import { CurrentSong } from "./components/current-song";

export function SongSwitcher() {

  return (
    <DropdownMenu>
      <CurrentSong />

      <DropdownMenuContent
        className="rounded-lg bg-white/10 border border-white/10"
        side="bottom"
        align="start"
        sideOffset={8}
      >
        <Songs />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
