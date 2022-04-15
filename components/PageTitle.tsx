interface Props {
  text: string;
}

export default function PageTitle({ text }: Props) {
  return <h1 className="text-xl font-bold mb-2.5">{text}</h1>;
}
