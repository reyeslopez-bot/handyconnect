import type { Component } from 'solid-js';

import { createSignal } from 'solid-js';
import logo from './logo.svg';
import Calendar from './Calendar';
import Navbar from './Navbar';

const LandingPage: Component = () => {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [message, setMessage] = createSignal('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', { name: name(), email: email(), message: message() });
    // Reset form fields after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; color: #333;">
      <nav class="landing-nav" style="background-color: #0056b3; color: white; padding: 1rem;">
      <Navbar />
      </nav>
      <header style="text-align: center; padding: 4rem 0;">
        <h1 style="font-size: 3rem; margin-bottom: 1rem;">Welcome to HandyConnect</h1>
        <p style="font-size: 1.2rem;">Your one-stop solution for all home repair needs.</p>
        <a
          href="#services"
          style="background-color: #0056b3; color: white; padding: 1rem 2rem; text-decoration: none; border-radius: 5px; margin-top: 2rem; display: inline-block;"
        >
          Learn More
        </a>
      </header>
      <section id="services" style="background-color: #fff; padding: 4rem 0; text-align: center;">
        <h2 style="font-size: 2.5rem; margin-bottom: 2rem;">Our Services</h2>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="font-size: 1.2rem; margin-bottom: 1rem;">Plumbing</li>
          <li style="font-size: 1.2rem; margin-bottom: 1rem;">Electrical</li>
          <li style="font-size: 1.2rem; margin-bottom: 1rem;">Carpentry</li>
          <li style="font-size: 1.2rem; margin-bottom: 1rem;">Painting</li>
          <li style="font-size: 1.2rem; margin-bottom: 1rem;">Appliance Repair</li>
        </ul>
      </section>
      <section id="testimonials" style="background-color: #f0f0f0; padding: 4rem 0; text-align: center;">
        <h2 style="font-size: 2.5rem; margin-bottom: 2rem;">Testimonials</h2>
        <div style="display: flex; justify-content: center;">
          <div style="max-width: 600px;">
            <p style="font-size: 1.2rem; margin-bottom: 1rem;">"HandyConnect saved my day! They fixed my leaky faucet in no time."</p>
            <p style="font-style: italic; font-size: 1rem; color: #777;">- Jane Doe</p>
          </div>
          <div style="max-width: 600px; margin-left: 2rem;">
            <p style="font-size: 1.2rem; margin-bottom: 1rem;">"I highly recommend HandyConnect. Professional service at its best!"</p>
            <p style="font-style: italic; font-size: 1rem; color: #777;">- John Smith</p>
          </div>
        </div>
      </section>
      <section id="calendar" style="background-color: #fff; padding: 4rem 0; text-align: center;">
      <div id="calendar-container">
        <h2 style="font-size: 2.5rem; margin-bottom: 2rem;">Schedule With Us!</h2>
        <Calendar />
      </div>
    </section>
      <section id="contact" style="background-color: #fff; padding: 4rem 0; text-align: center;">
  <h2 style="font-size: 2.5rem; margin-bottom: 2rem;">Contact Us</h2>
  <form onSubmit={handleSubmit} style="max-width: 600px; margin: auto;">
    {/* Contact form inputs */}
    <div style="margin-bottom: 1rem;">
      <input
        type="text"
        placeholder="Your Name"
        value={name()}
        onInput={(e) => setName(e.target.value)}
        style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 5px;"
        required
      />
    </div>
    <div style="margin-bottom: 1rem;">
      <input
        type="email"
        placeholder="Your Email"
        value={email()}
        onInput={(e) => setEmail(e.target.value)}
        style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 5px;"
        required
      />
    </div>
    <div style="margin-bottom: 1rem;">
      <textarea
        placeholder="Your Message"
        value={message()}
        onInput={(e) => setMessage(e.target.value)}
        style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 5px; resize: vertical;"
        rows="4"
        required
      ></textarea>
    </div>
    <button
      type="submit"
      style="background-color: #0056b3; color: white; padding: 0.5rem 2rem; border: none; border-radius: 5px; cursor: pointer;"
    >
      Submit
    </button>
  </form>
  <div style="margin-top: 2rem;">
    <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">Contact us via:</p>
    {/* Contact links */}
    <div style="display: flex; justify-content: center;">
      <a href="mailto:info@handyconnect.com" style="margin-right: 1rem; text-decoration: none; color: #0056b3;">
        Email
      </a>
      <a href="https://wa.me/yourphonenumber" style="margin-right: 1rem; text-decoration: none; color: #0056b3;">
        WhatsApp
      </a>
      <a href="https://www.facebook.com/handyconnect" style="text-decoration: none; color: #0056b3;">
        Facebook
      </a>
    </div>
  </div>
</section>
</div>
  );
};

export default LandingPage;
