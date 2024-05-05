// src/components/Services.tsx
import { Component } from 'solid-js';

const Services: Component = () => {
  return (
    <section id="services" class="services-section">
      <h2>Our Services</h2>
      <ul class="service-list">
        <li>Plumbing</li>
        <li>Electrical</li>
        <li>Carpentry</li>
        <li>Painting</li>
        <li>Appliance Repair</li>
      </ul>
    </section>
  );
};

export default Services;
