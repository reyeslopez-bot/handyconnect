import { createSignal } from 'solid-js';

const ContactForm = () => {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [message, setMessage] = createSignal('');

  const handleSubmit = (e: Event) => {  // Here you specify that e is of type Event
    e.preventDefault();
    console.log('Form submitted:', { name: name(), email: email(), message: message() });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} style="max-width: 600px; margin: auto;">
      <div style="margin-bottom: 1rem;">
        <input type="text" placeholder="Your Name" value={name()} onInput={(e) => setName(e.currentTarget.value)} style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 5px;" required />
      </div>
      <div style="margin-bottom: 1rem;">
        <input type="email" placeholder="Your Email" value={email()} onInput={(e) => setEmail(e.currentTarget.value)} style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 5px;" required />
      </div>
      <div style="margin-bottom: 1rem;">
        <textarea placeholder="Your Message" value={message()} onInput={(e) => setMessage(e.currentTarget.value)} style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 5px; resize: vertical;" rows="4" required></textarea>
      </div>
      <button type="submit" style="background-color: #0056b3; color: white; padding: 0.5rem 2rem; border: none; border-radius: 5px; cursor: pointer;">
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
