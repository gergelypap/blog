import type { ReadTimeResults } from "reading-time";

interface Props {
  data: ReadTimeResults;
}

export default function ReadingTime({ data }: Props) {
  const coffees = data.minutes < 5 ? "☕" : data.minutes < 10 ? "☕☕" : "☕☕☕";

  return (
    <span>
      {coffees} {data.text}
    </span>
  );
}
