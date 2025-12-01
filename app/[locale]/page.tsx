import {

  OtherBook,
} from "@/components/books";
import { Landing, About } from "@/components/home";
import Header from "@/layout/Header";
import OverlayQuestions from "@/ui/OverlayQuestions";
import { useLocale } from "next-intl";




export default function Home() {
  const locale = useLocale();
  return (
    <main>
      <Header />
      <Landing />
      {/* <OtherBook /> */}
      <About />
      {/* <OverlayQuestions /> */}
    </main>
  );
}
