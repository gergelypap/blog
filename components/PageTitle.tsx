interface Props {
  text: string;
}

export default function PageTitle({ text }: Props) {
  return <h1 className="text-2xl font-bold mb-3">{text}</h1>;
}
