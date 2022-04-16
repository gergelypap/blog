interface Props {
  text: string;
}

export default function PageTitle({ text }: Props) {
  return (
    <h1 className="inline-block mb-10 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent font-bold text-4xl leading-tight">
      {text}
    </h1>
  );
}
