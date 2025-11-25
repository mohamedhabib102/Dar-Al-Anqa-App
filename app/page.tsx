import { 
  BooksFetching,
  OtherBook, 
   } from "@/components/books";
import { Landing } from "@/components/home";
import Header from "@/layout/Header";



export default function Home() {
  return (
    <main>
      <Header />
      <Landing/>
      <OtherBook />
    </main>
  );
}
