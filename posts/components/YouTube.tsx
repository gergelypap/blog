interface Props {
  videoId: string;
}

export default function YouTube({ videoId }: Props) {
  return (
    <iframe
      width="640"
      height="320"
      src={`https://www.youtube.com/embed/${videoId}?showinfo=0&rel=0&iv_load_policy=3&color=white&modestbranding=1`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full mb-10"
    ></iframe>
  );
}
