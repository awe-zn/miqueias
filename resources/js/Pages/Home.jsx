import { About } from '../Components/About';
import { Banner } from '../Components/Banner';
import { CaseContact } from '../Components/CaseContact';
import { Contact } from '../Components/Contact';
import { Footer } from '../Components/Footer';
import { Header } from '../Components/Header';
import { Question } from '../Components/Question';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <CaseContact />
        <About />
        <Question />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
