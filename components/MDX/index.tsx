import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import YouTube from "./YouTube";

interface Props {
  code: string;
}

const components = {
  img: (props: { src: string; alt: string }) => {
    return (
      <figure className="aspect-video	relative my-10 block">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image {...props} layout="fill" objectFit="contain" />
      </figure>
    );
  },
  Image: (props: { src: string; alt: string; width: number; height: number }) => {
    return (
      <figure className="my-10 text-center">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <Image {...props} />
      </figure>
    );
  },
  YouTube,
};

export default function MDX({ code }: Props) {
  const MDXContent = useMDXComponent(code);

  return <MDXContent components={components} />;
}
