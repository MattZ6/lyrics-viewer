import { type Segment } from "@/atoms/player";

import { cn } from "@/lib/utils";

import { MarkerSegment } from "./components/marker";
import { LyricSegment } from "./components/lyric";

type Props = {
  segments: Segment[]
}

export function Segments({ segments }: Props) {
  return (
    <ul
      className={cn(
        "flex-1 flex flex-col items-center relative py-8 overflow-auto h-screen",
      )}
    >
      {/* <div style={{ height: topPadding }} className="w-full shrink-0" /> */}

      {segments.map((segment, index) => (
        <li
          key={index}
          // ref={(el) => (markerRefs.current[index] = el)}
          className={cn("flex items-center")}
        >
          {segment.type === 'marker' && (
            <MarkerSegment segment={segment} />
          )}

          {segment.type === 'lyric' && (
            <LyricSegment segment={segment} />
          )}

          {/* {marker.type === 'marker' && (
            <div
              className={cn(
                "transition-all",
                index > 0 ? 'mt-8' : '',
              )}
            >

              <span className={cn(
                "font-normal text-base text-muted-foreground transition-colors",
                selectedIndex && index < selectedIndex ? 'text-muted-foreground/50' : '',
              )}>
                {marker.text}
              </span>
            </div>
          )} */}

          {/* {marker.type === 'lyric' && (
            <button
              type="button"
              className={cn(
                "text-center min-h-7 py-1 px-4 rounded-md cursor-pointer transition-all hover:bg-accent",
                // selectedIndex && index < selectedIndex - 1 ? 'scale-95' : '',
                // selectedIndex && index < selectedIndex - 2 ? 'scale-90' : '',
                // selectedIndex && index < selectedIndex - 3 ? 'scale-85' : '',
                selectedIndex && index < selectedIndex ? 'scale-90' : '',
                index === selectedIndex ? 'scale-110' : ''
              )}
            >

              <span
                className={cn(
                  "font-normal text-xl transition-colors text-muted-foreground",
                  selectedIndex && index < selectedIndex ? 'text-muted-foreground/50' : '',
                  index === selectedIndex ? 'text-primary' : ''
                )}
              >
                {marker.text}
              </span>
            </button>
          )} */}
        </li>
      ))}

      {/* <div style={{ height: bottomPadding }} className="w-full shrink-0" /> */}
    </ul>
  )
}
