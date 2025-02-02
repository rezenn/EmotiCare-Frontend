import React, { useState } from "react";
import styles from "./journalView.module.css";

function JournalView() {
  const [selectedJournal, setSelectedJournal] = useState(null);

  // Function to truncate HTML content and extract plain text
  const truncateText = (html, maxLength) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html; // Parse HTML
    const plainText = tempDiv.textContent || tempDiv.innerText || ""; // Extract plain text
    return plainText.length > maxLength
      ? `${plainText.slice(0, 700)}...`
      : plainText;
  };

  const journals = [
    {
      id: 1,
      title: "Test",
      date: "02/03/2025",
      content: `CNN
 — 
Bey-lieve it or not: The 2025 album of the year category might be the most high stakes Grammys race in years.

But let’s back up.

The category has a little something for everyone this year – from the pink-drenched newcomer Chappell Roan’s velvety vocals in her debut album “The Rise and Fall of a Midwest Princess” to André 3000’s flute-centric “New Blue Sun.”

“It’s a phenomenal slate of nominees. It’s jam packed. I think it can hold its own with any year in history in terms of the albums that are going up against each other,” Rolling Stone senior writer, critic and author Rob Sheffield told CNN. “It’s an all-time slate of classic albums all happening at the same time.”

But Beyoncé’s genre-bending smash “Cowboy Carter” in particular is the one album out of the versatile crop of nominees that seems to hold the highest stakes – not for the artist herself, but for the Grammys.

The Recording Academy has consistently overlooked Beyoncé in this specific category, with the singer losing four times for her albums “Renaissance” (2023), “Lemonade” (2017), “Beyoncé” (2015) and “I Am… Sasha Fierce (2010).

For the most part, Beyoncé has remained unfazed. She even referred to her unsuccessful bids in the category on the “Cowboy Carter” song “Sweet Honey Buckin,” singing in part that she takes the losses “on the chin.”

While Beyoncé has seemingly accepted her losses with a gracious smile, each time showing the utmost respect for the winner, her husband Jay-Z – and her millions of supporters known as the Beyhive – have been more vocal, calling out the Recording Academy, the group behind the Grammys, for overlooking an artist that is widely considered to be one of the most influential of our time.

“She knows she’s an artist who knows that the art itself is the legacy,” Sheffield said. “I think she cares about making these genius records one after another… But there’s a sense that for this particular Grammy category to matter, Beyoncé has to win it.”`,
    },
    {
      id: 2,
      title: "Test",
      date: "03/03/2025",
      content: `CNN
 — 
While everyone is hanging at the edge of their seats for more info on the fifth and final season of “Stranger Things,” the brothers behind the hit show are already cooking up their next projects.

At a Netflix presentation of the streaming giant’s 2025 slate for press on Wednesday, “Stranger Things” creators Ross and Matt Duffer revealed that in 2026 they will be executive producing two new shows, titled “The Boroughs” and “Something Very Bad is Going to Happen,” both of which “encompass what we feel is at the core of ‘Stranger Things,’” according to Ross Duffer – “they’re stories about ordinary people who encounter the extraordinary.”

Matt Duffer added that “The Boroughs” “probably shares the most DNA with ‘Stranger Things’ because it’s about a group of misfits who fight an otherworldly evil.”

“Only unlike ‘Stranger Things,’ it’s set in a retirement community, so that’s something different,” he quipped. “This time our misfits are a little on the older side. They ride golf carts, not bikes,” he said, in reference to the young characters in “Stranger Things” who ride their bicycles around Hawkins, Indiana.`,
    },
    {
      id: 3,
      title: "Liam Payne to be seen as judge in Netflix talent show",
      date: "04/03/2025",
      content: `Netflix will release a talent show judged by One Direction star Liam Payne later this year, it has confirmed.

Building the Band was one of the last projects Payne worked on before he died at the age of 31 following a fall from a hotel balcony in Buenos Aires, Argentina, last October.

The singer filmed his role as a judge in the series alongside Destiny's Child singer Kelly Rowland and Pussycat Doll Nicole Scherzinger.

Netflix has not announced a date, but confirmed the release as it revealed a raft of new TV and film content for 2025.

Building the Band brings together singers seeking to form their very own band, in a concept similar to Love is Blind as they are kept in separate booths without seeing each other.

The show's synopsis says: "All they have to go on is musical compatibility, connection, chemistry and merit... with incredible performances, compelling drama, and one big goal - to find the next great music band - the stage is set for an unforgettable experience."

Backstreet Boys star AJ Mclean will host the series, with Pussycat Dolls star Nicole Scherzinger taking on the role of mentor and judge on the show, while Payne and Rowland will appear as guest judges.

Scherzinger was a judge on The X Factor when Payne auditioned in 2010 as a solo contestant, before being grouped with Harry Styles, Zayn Malik, Niall Horan and Louis Tomlinson to form One Direction.`,
    },
  ];

  const handleJournalClick = (journal) => {
    setSelectedJournal(journal);
  };

  const handleBackClick = () => {
    setSelectedJournal(null);
  };

  return (
    <>
      <div className={styles.journal}>
        <div className={styles.journal_header}>
          {!selectedJournal ? (
            <>
              <div className={styles.journal_title}>Journals</div>
              {/* <button className="create_button">Create Request</button> */}
            </>
          ) : (
            <>
              <h3 className={styles.selectedTitle}>{selectedJournal.date}</h3>

              <button className={styles.back_button} onClick={handleBackClick}>
                <span className={styles.backText}>Back</span>
              </button>
            </>
          )}
        </div>
        <hr />

        {/* journal Content */}
        <div className={styles.journal_content}>
          {selectedJournal ? (
            <div className={styles.journal_details}>
              <h3>{selectedJournal.title}</h3>
              <div
                dangerouslySetInnerHTML={{ __html: selectedJournal.content }}
              ></div>
            </div>
          ) : (
            <div className={styles.journal_list}>
              {journals.map((journal) => (
                <div
                  key={journal.id}
                  className={styles.journal_preview}
                  onClick={() => handleJournalClick(journal)}
                >
                  <h3>{journal.date}</h3>
                  <h5>{journal.title}</h5>
                  <p>{truncateText(journal.content, 150)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default JournalView;
