/* eslint-disable jsx-a11y/anchor-is-valid */
import Layout from "../components/Layout";
import "../assets/styles/homepage.scss";

const Homepage = () => {
  return (
    <Layout>
      <h1>Curseur customisé</h1>
      <h2>Paragraphe</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <h2>input et button</h2>
      <div className="input-container">
        <input type="text" />
        <button>Button</button>
      </div>
      <h2>Lien</h2>
      <a href="#">Survolez sur le lien</a>
    </Layout>
  );
};

export default Homepage;
