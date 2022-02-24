import 'bootstrap';

import { Banner } from '../components/sections/Banner';
import { CaseContact } from '../components/sections/CaseContact';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Question } from '../components/sections/Question';

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
