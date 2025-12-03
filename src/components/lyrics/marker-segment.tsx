type MarkerSegment = {
  type: "marker";
  text: string;
};

type Props = {
  segment: MarkerSegment;
};

export function MarkerSegmentItem({ segment }: Props) {
  return (
    <li className="flex flex-col">
      <span className="text-muted-foreground text-center">{segment.text}</span>
    </li>
  );
}
