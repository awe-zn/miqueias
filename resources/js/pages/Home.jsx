import 'bootstrap';

import { Banner } from '../components/Banner';
import { CaseContact } from '../components/CaseContact';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Question } from '../components/Question';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <CaseContact />
        <Question />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
