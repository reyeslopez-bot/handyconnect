import { createSignal } from 'solid-js';

const Navbar = () => {
  const [showMenu, setShowMenu] = createSignal(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu());
  };

  return (
    <nav class="landing-nav" style="background-color: #0056b3; color: white; padding: 1rem;">
      <button onClick={toggleMenu} style="background: none; border: none; cursor: pointer;">
        <svg style="width: 24px; height: 24px; fill: white;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {showMenu() ? (
            <path d="M3 18h18v-2H3v2zM3 13h18v-2H3v2zM3 6v2h18V6H3z" />
          ) : (
            <path d="M0 0h24v24H0z" fill="none" />
          )}
        </svg>
      </button>
      {showMenu() && (
        <ul style="list-style: none; padding: 0; margin: 0; text-align: right;">
          <li style="display: inline-block; margin-left: 1rem;"><a href="#" style="text-decoration: none; color: white;">Home</a></li>
          <li style="display: inline-block; margin-left: 1rem;"><a href="#services" style="text-decoration: none; color: white;">Services</a></li>
          <li style="display: inline-block; margin-left: 1rem;"><a href="#testimonials" style="text-decoration: none; color: white;">Testimonials</a></li>
          <li style="display: inline-block; margin-left: 1rem;"><a href="#contact" style="text-decoration: none; color: white;">Contact</a></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
