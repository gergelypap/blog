interface Props {
  children: React.ReactNode;
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="inline-block mb-5 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent font-normal text-4xl leading-tight">
      {children}
    </h1>
  );
}
