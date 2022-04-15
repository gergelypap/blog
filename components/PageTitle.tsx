interface Props {
  text: string;
}

export default function PageTitle({ text }: Props) {
  return (
    <h1 className="inline-block mb-10 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-extrabold text-4xl">
      {text}
    </h1>
  );
}
