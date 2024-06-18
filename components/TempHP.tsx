import { useEffect } from 'react';
import styles from '../styles/TempHP.module.css'; // Assuming you have a CSS module for styling
import React from 'react';
import Image from 'next/image';
import world from "../public/finalGlobe.png";
import finger from "../public/finger.png";
import Link from 'next/link'; 




const TempHP: React.FC = () => {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector(`.${styles.fixedNav}`);  // Corrected the class reference
      if (nav) {
        if (window.scrollY > 0) {
          nav.classList.add(styles.black);  // Ensure styles.black is correctly defined in your CSS module
        } else {
          nav.classList.remove(styles.black);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (

    <div className={styles.firstSection}>     
    <div className={styles.container}> 
      <nav className={styles.fixedNav}>
        <div className={styles.logo}>
          <h2><span className={styles.blacktext}>HEALDOC</span>.<span className={styles.orangetext}>AI</span></h2>
        </div>
        <div className={styles.topRightButton}>
          <Link legacyBehavior href="../../newLogin/newLogin">
            <a>
              <button className={styles.buttong} >
                  <h2>
                  Login / Sign Up
                  </h2>
              </button>
            </a>
          </Link>
        </div>
      </nav>


        <div className={styles.healthO}>
          <button>
            <span className={styles.wordHealth}> Introducing </span>
            <span className={styles.wordOS}> HEALTH OS </span>
          </button>
        </div>

        <div className={styles.content}>
          <h2>
            Empower your Healthcare Journey with HealthOS - the ultimate choice for AI Driven Intelligent Automation. Get
            started by seamlessly installing our powerful pre-built Workflows - or build your own by selecting one of many
            popular AI models in seconds...
          </h2>
        </div>

        <div className={styles.getStarted}>
          <h2></h2>
        </div>

        <div className={styles.centreContainer}>
      
          <div>
            <Link legacyBehavior href="pages/DummyProto">
            <a>
              <button className={styles.buttonz}>
                <h2>
                Get in touch
                </h2>
              </button>
            </a>
            </Link>
          </div>


          <div>
            <Link legacyBehavior href="pages/DummyProto">
              <a>
                <button className={styles.buttonz}>
                  <h2>
                  Product Demo
                  </h2>
                </button>
              </a>
            </Link>  
          </div>


          {/* <div>
            <Link legacyBehavior href="pagesz/DummyProto">
              <a>
                <button
                  className={`custom-hover px-6 py-1 rounded-full tracking-widest bg-transparent additional-class ${styles.productDemoButton}`}
                  style={{ fontSize: '25px', border: '2px solid black', fontFamily: 'Arial', fontWeight: 'bold' }}
                >
                  <span style={{ color: 'black' }}>Product </span>
                  <span style={{ color: '#F28C28' }}>Demo</span>
                </button>
              </a>
            </Link>
          </div> */}



        </div>

        <div className={styles.iconContainer}>
          <Image src={finger} alt="finger" width={50} height={50} />
        </div>

        <div className={styles.textContainer}>
          <span className="text-xs">Day 0 Security</span>
          <span className="text-xs">Regulatory Compliance</span>
          <span className="text-xs">Health information Privacy</span>
          <span className="text-xs">Zero Data Residency</span>
        </div>

        <div className={styles.globeContainer}>
          <Image src={world} alt="world" width={70} height={70} style={{ marginTop: '100px' }} />
        </div>

      </div>
    </div>
  );
};

export default TempHP;




























































