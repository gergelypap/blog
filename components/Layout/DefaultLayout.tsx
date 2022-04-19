import Footer from "@components/Footer";
import Header from "@components/Header";

interface Props {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="px-5 flex-grow">{children}</main>
      <Footer />
    </>
  );
}
