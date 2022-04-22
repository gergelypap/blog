interface Props {
  videoId: string;
  className?: string;
}

export default function YouTube({ videoId, className = undefined }: Props) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?showinfo=0&rel=0&iv_load_policy=3&color=white&modestbranding=1`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className={["aspect-video w-full mb-5", className].join(" ")}
    ></iframe>
  );
}
