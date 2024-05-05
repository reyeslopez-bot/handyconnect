// src/components/ContactLinks.tsx
import { Component } from 'solid-js';

const ContactLinks: Component = () => {
  return (
    <div class="contact-links">
      <p>Contact us via:</p>
      <a href="mailto:info@handyconnect.com" rel="noopener noreferrer" style="margin-right: 1rem; text-decoration: none; color: #0056b3;">
        Email
      </a>
      <a href="https://wa.me/yourphonenumber" rel="noopener noreferrer" style="margin-right: 1rem; text-decoration: none; color: #0056b3;">
        WhatsApp
      </a>
      <a href="https://www.facebook.com/handyconnect" rel="noopener noreferrer" style="text-decoration: none; color: #0056b3;">
        Facebook
      </a>
    </div>
  );
};

export default ContactLinks;
