"use client";
import styles from "./Home.module.css";
export default function Home() {

  function add_shark() {
    const formInputs = document.querySelectorAll<HTMLInputElement>(`.${styles.textInput}`);
    const unmetRequirement = document.querySelector<HTMLParagraphElement>(`.${styles.requirementsNotMet}`);
    const metRequirement = document.querySelector<HTMLParagraphElement>(`.${styles.submittedReport}`);
    let unfinished = false;
    const formInformation: {[key: string]: (string)} = {}
    formInputs.forEach((formInput) => {
      if (formInput.required === true) {
        if (formInput.value.trim() === "") {
          formInput.classList.add(`${styles.requirementFailed}`);
          unfinished = true;
        } else {
          formInformation[formInput.id] = `${formInput.value}`
        }
      }
    }) 

    if (unmetRequirement && unfinished) {
      unmetRequirement.classList.add(`${styles.unmet}`);
      metRequirement?.classList.remove(`${styles.met}`);
    } else {
      

      fetch('https://x8ki-letl-twmt.n7.xano.io/api:2D0WNQvF/shark_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formInformation)
      })
      .then(response => {
        if(!response.ok) {
          throw new Error("Network error.")

        }
        return response.json()
      })
      .then(data => {
        console.log(`Success: ${data}`)
      })
      .catch(error => {
        console.error(`Error: ${error}`)
      })

      console.log(formInformation)

      unmetRequirement?.classList.remove(`${styles.unmet}`);
      metRequirement?.classList.add(`${styles.met}`)
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
          <input className={styles.textInput} placeholder="Enter the shark name here..." id="surroundfeatures" required></input>
        </div>

        <input type="submit" className={`${styles.formSubmit}`} name="Submit Report" onClick={add_shark}></input>

        <p className={styles.requirementsNotMet}>Please enter all the required information.</p>
        <p className={styles.submittedReport}>Your report has been submitted successfully.</p>
      </div>

      <div className={styles.media}>
        <img className={styles.sharkImage} src="https://lh7-us.googleusercontent.com/cQgCpYQLeh5uE32coK0lbMIlkxVz3cLFyq-9x_8d_OSI5q5sLPn_BT-4ZqeeYTAkAUDhdYjTMNwFSfZhXIDIbVkUJkO6WL3Mt_8FOVsajUNRZseheOoaHMhSb3lRcXEJ_rZjHZ1UTZhwMpcQEjYneecgh8N3Jg" alt="shark image"></img>
      </div>


    </main>
  );
}
