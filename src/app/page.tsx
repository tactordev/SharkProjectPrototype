"use client";
import styles from "./Home.module.css";
export default function Home() {

  function add_shark() {
    //alert("api link: https://x8ki-letl-twmt.n7.xano.io/api:2D0WNQvF/shark_data");
    console.log("work1")
    const formInputs = document.querySelectorAll<HTMLInputElement>(`.${styles.textInput}`);
    const unmetRequirement = document.querySelector<HTMLParagraphElement>(`.${styles.requirementsNotMet}`);
    let unfinished = false;
    formInputs.forEach((formInput) => {
      if (formInput.required === true && (formInput.value === null || formInput.value === " " || formInput.value === "")  ) {
        formInput.classList.add(`${styles.requirementFailed}`);
        unfinished = true;

      }
      console.log(formInput.value)
    }) 

    if (unmetRequirement && unfinished) {
      unmetRequirement.classList.add(`${styles.unmet}`);
    }
    
  }
  return (
    <main>
      <div className={styles.titleContainer}>
        <p className={styles.title}>Miyaru Shark Report</p>
      </div>
      <div className={styles.form}>
        <div className={`${styles.input} ${styles.inputText}`}>
          <p className={styles.inputHeader}>Shark Name:</p>
          <input className={styles.textInput} placeholder="Enter the shark name here..." id="sharkname" required={true}></input>
        </div>
        <div className={`${styles.input} ${styles.inputText}`}>
          <p className={styles.inputHeader}>Shark Description:</p>
          <input className={styles.textInput} placeholder="Enter the shark name here..." id="sharkdescription" required={true}></input>
        </div>
        <div className={`${styles.input} ${styles.inputText}`}>
          <p className={styles.inputHeader}>GPS Location:</p>
          <input className={styles.textInput} placeholder="Enter the shark name here..." id="gps_location" required={true}></input>
        </div>
        <div className={`${styles.input} ${styles.inputText}`}>
          <p className={styles.inputHeader}>Approximate size:</p>
          <input className={styles.textInput} placeholder="Enter the shark name here..." id="approximate_size" required={true}></input>
        </div>
        <div className={`${styles.input} ${styles.inputText}`}>
          <p className={styles.inputHeader}>Features of surrounding area:</p>
          <input className={styles.textInput} placeholder="Enter the shark name here..." id="surroundfeatures"></input>
        </div>

        <input type="submit" className={styles.formSubmit} name="Submit Report" onClick={add_shark}></input>

        <p className={styles.requirementsNotMet}>Please enter all the required information.</p>
      </div>

      <div className={styles.media}>
        <img className={styles.sharkImage} src="https://lh7-us.googleusercontent.com/cQgCpYQLeh5uE32coK0lbMIlkxVz3cLFyq-9x_8d_OSI5q5sLPn_BT-4ZqeeYTAkAUDhdYjTMNwFSfZhXIDIbVkUJkO6WL3Mt_8FOVsajUNRZseheOoaHMhSb3lRcXEJ_rZjHZ1UTZhwMpcQEjYneecgh8N3Jg" alt="shark image"></img>
      </div>


    </main>
  );
}
