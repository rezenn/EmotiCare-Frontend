import "./Footer2.css";

function Footer2() {
  return (
    <>
      <footer className="footer">
        <img src="./src/assets/logo.png" alt="EmotiCare Logo" />
        <a className="top" href="#top">
          Back to Top
        </a>
        <hr />
        <div className="copyright">
          <p>© {new Date().getFullYear()}, EmotiCare All rights reserved</p>
        </div>
      </footer>
    </>
  );
}
export default Footer2;
