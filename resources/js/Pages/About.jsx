import { About as Content } from '../Components/About';
import { Footer } from '../Components/Footer';

import { Header } from '../Components/Header';

export default function About() {
  return (
    <>
      <Header />
      <main>
        <Content />
      </main>
      <Footer />
    </>
  );
}
