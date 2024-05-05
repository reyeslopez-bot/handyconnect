import { Component, createSignal, lazy, Suspense } from 'solid-js';
import Navbar from './Navbar';
import Header from './Header';
import ContactForm from './ContactForm';
import Services from './Services';
import Testimonials from './Testimonials';
import ContactLinks from './ContactLinks';

const Calendar = lazy(() => import('./Calendar'));

const LandingPage: Component = () => {
  return (
<div style={{ "font-family": 'Arial, sans-serif', "background-color": '#f7f7f7', color: '#333' }}>
  <Navbar />
  <Header />
  <Services />
  <section id="calendar" class="section">
    <Suspense fallback={<div>Loading...</div>}>
      <Calendar />
    </Suspense>
  </section>
  <ContactForm />
  <Testimonials />
  <ContactLinks />
</div>

  );
};

export default LandingPage;
