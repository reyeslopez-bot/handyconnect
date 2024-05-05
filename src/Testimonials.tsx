// src/components/Testimonials.tsx
import { Component } from 'solid-js';
import styles from './Testimonials.module.css'; // Assuming you are using CSS modules

const Testimonials: Component = () => {
  return (
    <section id="testimonials" class={styles.testimonials}>
      <div class={styles.testimonialContainer}>
        <div class={styles.testimonialBlock}>
          <p>"HandyConnect saved my day! They fixed my leaky faucet in no time."</p>
          <p class={styles.author}>- Jane Doe</p>
        </div>
        <div class={styles.testimonialBlock}>
          <p>"I highly recommend HandyConnect. Professional service at its best!"</p>
          <p class={styles.author}>- John Smith</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
