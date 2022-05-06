import nature from "./nature.jpg";

export default function Demo() {
  return (
    <figure className="relative mb-10">
      <style
        dangerouslySetInnerHTML={{
          __html: `
figcaption {
  backdrop-filter: blur(10px);
  background-color: hsl(0 0% 100% / 50%);
}
html.dark figcaption { 
  background-color: hsl(0 0% 0% / 50%);
}`,
        }}
      ></style>
      <img className="w-full" src={nature as unknown as string} alt="asdf" />
      <figcaption className="absolute bottom-0 w-full p-5 font-bold text-2xl">Some sample text</figcaption>
    </figure>
  );
}
