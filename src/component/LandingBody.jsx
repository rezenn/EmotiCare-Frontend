import style from "./landing.module.css";

function LandingBody(){
  return(
        <>
        <main className={style.main}>
          <div id={style.banner}>
            <div id={style.saying}>
              <h1 className={style.slogan}>
                Track your <span className={style.keyword}>Mood</span> <br />
                and Maintain a <br />
                Healthy Relation <br />
                with Yourself <br />
              </h1>
            </div>
            <div >
              <img
                className={style.moodImage}
                src="./src/assets/loginPageImg.png"
                alt="moodometer"
                width="775"
                height="auto"
              />
            </div>
          </div>
          <div id={style.boxDescription}>
            <div className={style.description}>
              <h2 className={style.title}>Custom Chart</h2>
              <br />
              <p className={style.Information}>
                You can fully customize and track any health measurement and display
                it on your chart. We start you out with various health measurements
                that your can customize like mood levels. Over time patterns may
                emerge identifying what works and what doesn't work. The length of
                time shown on the charts can be adjusted to any date range.
              </p>
            </div>
            <div className={style.description}>
              <h2 className={style.title}>Self-Care Checklist</h2>
              <br />
              <p className={style.Information}>
                A self-care checklist is a practical tool designed to help
                individuals track and prioritize activities that promote mental
                health, emotional well-being, and overall resilience. By providing a
                structured approach to self-care, it ensures that essential aspects
                of your physical, emotional, social, and mental health are regularly
                addressed.
              </p>
            </div>
          </div>
        </main>
      </>
  );
}

export default LandingBody;