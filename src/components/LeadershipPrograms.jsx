import styles from "./LeadershipPrograms.module.css";
import data from "../data/api-response.json";
import classNames from "classnames";
import { useState } from "react";
import registrationOpenImg from "../assets/registration-open.png";
import learnMoreImg from "../assets/learn-more.png";
import scrollBtnImg from "../assets/scroll-btn.png";
import { useMediaQuery } from "react-responsive";
import { useRef } from "react";

const LeadershipPrograms = () => {
  const sectionsRef = useRef(null);
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  console.log(isMobile);
  const [openSection, setOpenSection] = useState(null);
  const { titleText, titleSubtext } = data.sectionContent.find(
    (item) => item._modelApiKey === "section_title"
  );
  const sections = data.sectionContent.filter(
    (item) => item._modelApiKey === "ila_program_card"
  );
  const handleSectionClick = (section) => {
    if (isMobile) {
      return false;
    }
    if (openSection === section.id) {
      setOpenSection(null);
    } else {
      setOpenSection(section.id);
      sections.forEach((s) => (s.open = false));
      section.open = true;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{titleText}</div>
      <div className={styles.subtitle}>{titleSubtext}</div>
      <div className={styles.sectionsWrapper}>
        <div className={styles.sections} ref={sectionsRef}>
          {sections.map((section) => (
            <div
              key={section.id}
              style={{
                backgroundImage: `url(${section.desktopImage.url})`,
              }}
              className={classNames(styles.section, {
                [styles.open]: openSection === section.id || isMobile,
              })}
              onClick={() => handleSectionClick(section)}
            >
              <img
                src={registrationOpenImg}
                className={section.tag ? styles.registrationImg : "hidden"}
              />
              <img
                src={section.logo.url}
                className={classNames(styles.logoImg, {
                  [styles.open]: openSection === section.id || isMobile,
                })}
              />
              <div
                className={classNames(styles.desc, {
                  [styles.open]: openSection === section.id || isMobile,
                })}
              >
                <div className={styles.descText}>
                  {
                    section.description.value.document.children[0].children[0]
                      .value
                  }
                </div>
                <hr />
                <div className={styles.footer}>
                  <div className={styles.date}>{section.date}</div>
                  <img
                    className="pointer"
                    src={learnMoreImg}
                    onClick={() =>
                      alert(`Going to: ${section.link[0].linkUrl}`)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <img
          src={scrollBtnImg}
          className={classNames(styles.scrollBtn, styles.left)}
          onClick={() => {
            let currentmargin = parseInt(
              sectionsRef.current.style.marginLeft.slice(0, -2)
            );
            if (isNaN(currentmargin)) {
              currentmargin = 0;
            }
            sectionsRef.current.style.marginLeft = `${currentmargin - 200}px`;
          }}
        />
        <img
          src={scrollBtnImg}
          className={classNames(styles.scrollBtn, styles.right)}
          onClick={() => {
            let currentmargin = parseInt(
              sectionsRef.current.style.marginLeft.slice(0, -2)
            );
            if (isNaN(currentmargin)) {
              currentmargin = 0;
            }
            sectionsRef.current.style.marginLeft = `${currentmargin + 200}px`;
          }}
        />
      </div>
      {/* <img src={scrollBtnImg} /> */}
    </div>
  );
};

export default LeadershipPrograms;
