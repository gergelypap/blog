import Image from "next/image";

export default function Custom404() {
  return (
    <div className="text-center">
      <h1 className="text-center text-3xl mb-[-2rem]">Page Not Found!</h1>
      <Image className="scale-150 ]" src="/img/404.svg" width="550" height="550" alt="404" />
    </div>
  );
}
