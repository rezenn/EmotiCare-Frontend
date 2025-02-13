import React from "react";
import Header from "../component/Navbar/Header";
import styles from "./resources.module.css";
import Footer from "../component/Footer/Footer";

const resources = [
  {
    title: "Self-care for health and well-being",
    link: "https://www.who.int/health-topics/self-care#tab=tab_1",
    description: (
      <>
        <p>
          Self-care is the ability of individuals, families and communities to
          promote health, prevent disease, maintain health, and cope with
          illness and disability with or without the support of a health worker.{" "}
          <br />
          Currently 3.6 billion people – half of the world – lack access to
          essential health services. WHO recommends self-care interventions for
          every country and economic setting, as a critical path to reach
          universal health coverage, promote health, keep the world safe, and
          serve the vulnerable. <br />
          Self-care recognises individuals as active agents in managing their
          own health care, in areas including health promotion; disease
          prevention and control; self-medication; providing care to dependent
          persons, and rehabilitation, including palliative care. <br />
          Self-care interventions are evidence-based, quality tools that support
          self-care. They include medicines, counselling, diagnostics and/or
          digital technologies which can be accessed fully or partially outside
          of formal health services. Depending on the intervention, they can be
          used with or without the direct supervision of health workers. <br />
        </p>
        <p>
          <strong>Self-care interventions can:</strong>
        </p>
        <ul>
          <li>
            empower individuals and communities to manage their health and
            well-being
          </li>
          <li>
            strengthen national institutions with efficient use of domestic
            resources for health
          </li>
          <li>
            improve primary healthcare (PHC) and contribute to achieving UHC
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "How to Use a Mood Tracker",
    link: "https://www.verywellmind.com/what-is-a-mood-tracker-5119337",
    description: (
      <>
        <p>
          A mood tracker is a tool that is used to keep a record of a person's
          mood at regular intervals. The purpose of this type of tool is to help
          look for patterns in how moods vary over time and due to different
          situations and circumstances. <br />
          In some cases, a mood tracker can be useful for people with mental
          health conditions—such as depression and anxiety—to help identify and
          regulate moods. That said, they can be useful for anyone to use,
          especially if you have noticed a recent change in your mood. <br />
          Mood trackers can range from the simple (a handwritten journal) to the
          complex (an online app that collects a range of information) and are
          available at a variety of price points. <br />
        </p>
        <p>
          <strong>Why It's Important</strong> <br />
          Mood tracking can be useful for a number of different reasons. For
          example, it might help you:
        </p>
        <ul>
          <li>
            Identify external and internal triggers that cause mood changes or
            mood swings.
          </li>
          <li>
            Learn more about how factors such as sleep, diet, and daily
            activities affect your moods.
          </li>
          <li>
            Develop coping techniques to help deal with negative moods and
            unwanted behaviors.
          </li>
          <li>Spot patterns and better understand shifts in mood.</li>
          <li>Determine what is helping improve your mood.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Mental health",
    link: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
    description: (
      <>
        <p>
          Mental health is a state of mental well-being that enables people to
          cope with the stresses of life, realize their abilities, learn well
          and work well, and contribute to their community. It is an integral
          component of health and well-being that underpins our individual and
          collective abilities to make decisions, build relationships and shape
          the world we live in. Mental health is a basic human right. And it is
          crucial to personal, community and socio-economic development. Mental
          health is more than the absence of mental disorders. It exists on a
          complex continuum, which is experienced differently from one person to
          the next, with varying degrees of difficulty and distress and
          potentially very different social and clinical outcomes. Mental health
          conditions include mental disorders and psychosocial disabilities as
          well as other mental states associated with significant distress,
          impairment in functioning, or risk of self-harm. People with mental
          health conditions are more likely to experience lower levels of mental
          well-being, but this is not always or necessarily the case.
        </p>
        <p>
          <strong>Determinants of mental health</strong> <br />
          Throughout our lives, multiple individual, social and structural
          determinants may combine to protect or undermine our mental health and
          shift our position on the mental health continuum. <br />
          Risks can manifest themselves at all stages of life, but those that
          occur during developmentally sensitive periods, especially early
          childhood, are particularly detrimental. For example, harsh parenting
          and physical punishment is known to undermine child health and
          bullying is a leading risk factor for mental health conditions.
        </p>
      </>
    ),
  },

  {
    title: "What is depression?",
    link: "https://www.psychiatry.org/patients-families/depression/what-is-depression",
    description: (
      <>
        <p>
          Depression is a serious mental disorder that affects emotions,
          thoughts, and behaviors. According to a 2023 survey, 29% of adults
          have been diagnosed with depression.
        </p>
        <p>
          <strong>Symptoms include:</strong>
        </p>
        <ul>
          <li>Feeling sad, irritable, or hopeless.</li>
          <li>Loss of interest in previously enjoyed activities.</li>
          <li>Changes in appetite and weight.</li>
          <li>Sleeping too little or too much.</li>
          <li>Fatigue and low energy.</li>
          <li>Difficulty concentrating and making decisions.</li>
          <li>Thoughts of death or suicide.</li>
        </ul>
        <p>
          A diagnosis of depression requires symptoms persisting for over two
          weeks, affecting daily life. Fortunately, depression is treatable.
        </p>
      </>
    ),
  },
  {
    title: "About Attention-Deficit / Hyperactivity Disorder (ADHD)",
    link: "https://www.cdc.gov/adhd/about/index.html",
    description: (
      <>
        <p>
          ADHD is one of the most common neurodevelopmental disorders of
          childhood. Neurodevelopmental means having to do with the way the
          brain grows and develops. <br />
          ADHD is usually first diagnosed in childhood and often lasts into
          adulthood. Children with ADHD may have trouble paying attention,
          controlling impulsive behaviors (may act without thinking about what
          the result will be), or be overly active.
        </p>
        <p>
          <strong>Types</strong>
        </p>
        <p>
          There are three different ways ADHD presents itself, depending on
          which types of symptoms are strongest in the individual at the time of
          diagnosis:
          <ul>
            <li> Predominantly inattentive presentation</li>
            <li>Predominantly hyperactive-impulsive presentation</li>
            <li>
              Combined presentation (a combination of inattentive and
              hyperactive-impulsive symptoms)
            </li>
          </ul>
        </p>
      </>
    ),
  },
  {
    title: "What is anxiety?",
    link: "https://medlineplus.gov/anxiety.html",
    description: (
      <>
        <p>
          Anxiety is a feeling of fear, dread, and uneasiness. It might cause
          you to sweat, feel restless and tense, and have a rapid heartbeat. It
          can be a normal reaction to stress. But for people with anxiety
          disorders, the fear is not temporary and can be overwhelming.
        </p>
        <p>
          <strong>What are anxiety disorders?</strong> Anxiety disorders are
          conditions where anxiety does not go away and worsens over time,
          interfering with daily life.
        </p>
        <p>
          <strong>Types of anxiety disorders:</strong>
        </p>
        <ul>
          <li>
            <strong>Generalized Anxiety Disorder (GAD)</strong>: Excessive worry
            about everyday things for at least 6 months.
          </li>
          <li>
            <strong>Panic Disorder</strong>: Sudden, repeated panic attacks
            without real danger.
          </li>
          <li>
            <strong>Phobias</strong>: Intense fear of specific objects or
            situations.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Social anxiety disorder (social phobia)",
    link: "https://www.mayoclinic.org/diseases-conditions/social-anxiety-disorder/symptoms-causes/syc-20353561",
    description: (
      <>
        <p>
          It's normal to feel nervous in some social situations. For example,
          going on a date or giving a presentation may cause that feeling of
          butterflies in your stomach. But in social anxiety disorder, also
          called social phobia, everyday interactions cause significant anxiety,
          self-consciousness and embarrassment because you fear being
          scrutinized or judged negatively by others. <br />
          In social anxiety disorder, fear and anxiety lead to avoidance that
          can disrupt your life. Severe stress can affect your relationships,
          daily routines, work, school or other activities. <br />
          Social anxiety disorder can be a chronic mental health condition, but
          learning coping skills in psychotherapy and taking medications can
          help you gain confidence and improve your ability to interact with
          others.
        </p>
        <p>
          <strong>Symptoms</strong>
        </p>

        <p>
          Feelings of shyness or discomfort in certain situations aren't
          necessarily signs of social anxiety disorder, particularly in
          children. Comfort levels in social situations vary, depending on
          personality traits and life experiences. Some people are naturally
          reserved and others are more outgoing. <br />
          In contrast to everyday nervousness, social anxiety disorder includes
          fear, anxiety and avoidance that interfere with relationships, daily
          routines, work, school or other activities. Social anxiety disorder
          typically begins in the early to mid-teens, though it can sometimes
          start in younger children or in adults.
        </p>
      </>
    ),
  },
  {
    title: "What is a mood disorder?",
    link: "https://my.clevelandclinic.org/health/diseases/17843-mood-disorders",
    description: (
      <>
        <p>
          A mood disorder is a mental health condition that primarily affects
          your emotional state. It’s a disorder in which you experience long
          periods of extreme happiness, extreme sadness or both. Certain mood
          disorders involve other persistent emotions, such as anger and
          irritability. <br />
          It’s normal for your mood to change, depending on the situation.
          However, for a mood disorder diagnosis, symptoms must be present for
          several weeks or longer. Mood disorders can cause changes in your
          behavior and can affect your ability to perform routine activities,
          such as work or school. <br />
          Two of the most common mood disorders are depression and bipolar
          disorder. <br />
        </p>
        <p>
          <strong>What are all the mood disorders?</strong>
        </p>

        <p>
          Mood disorders include:
          <ul>
            <li>Depression and its subtypes.</li>
            <li>Bipolar disorder and its subtypes.</li>
            <li>Premenstrual dysphoric disorder.</li>
            <li>Disruptive mood dysregulation disorder.</li>
          </ul>
        </p>
        <p>
          <strong>What are the symptoms of mood disorders?</strong> <br />
          Each mood disorder has different symptoms and/or different patterns of
          symptoms. Mood disorders typically have symptoms that affect your
          mood, sleep, eating behaviors, energy level and thinking abilities
          (such as racing thoughts or loss of concentration). In general,
          depressive symptoms include: Feeling sad most of the time or nearly
          every day. A lack of energy or feeling sluggish. Feeling worthless or
          hopeless. Loss of interest in activities that formerly brought
          enjoyment.
        </p>
      </>
    ),
  },
  {
    title: "What is paranoia?",
    link: "https://www.mhanational.org/conditions/paranoia-and-delusional-disorders",
    description: (
      <>
        <p>
          Paranoia involves intense anxious or fearful feelings and thoughts
          often related to persecution, threat, or conspiracy. Paranoia can
          occur with many mental health conditions but is most often present in
          psychotic disorders. Paranoid thoughts can become delusions when
          irrational thoughts and beliefs become so fixed that nothing can
          convince a person that what they think or feel is not true. When a
          person has paranoia or delusions, but no other symptoms (like hearing
          or seeing things that aren't there), they might have what is called a
          delusional disorder. Because only thoughts are impacted, a person with
          delusional disorder can usually work and function in everyday life,
          however, their lives may be limited and isolated as a result of their
          delusions. <br />
          Delusional disorder is characterized by irrational or intense
          belief(s) or suspicion(s) that a person believes to be true. These
          beliefs may seem outlandish and impossible (bizarre) or fit within the
          realm of what is possible (non-bizarre). Symptoms must last for one
          month or longer in order for someone to be diagnosed with a delusional
          disorder.
        </p>
        <p>
          <strong>Signs of Paranoia</strong> <br />
          Symptoms of paranoia and delusional disorders include intense and
          irrational mistrust or suspicion, which can bring on feelings of fear,
          anger, and betrayal. Some beliefs and behaviors of individuals with
          symptoms of paranoia include mistrust, hypervigilance (constantly
          looking for threats), difficulty with forgiveness, defensive attitude
          in response to imagined criticism, preoccupation with hidden motives,
          fear of being tricked or taken advantage of, trouble relaxing, or
          being argumentative.
        </p>
      </>
    ),
  },
];

function Resources() {
  return (
    <>
      <Header activePage="/resources" />
      <div className={styles.container}>
        {resources.map((resource, index) => (
          <article className={styles.resourceContainer} key={index}>
            <h2>
              <a
                className={styles.resourceLink}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {resource.title}
              </a>
            </h2>
            <hr />
            <p className={styles.resourceDesc}>{resource.description}</p>
          </article>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Resources;
