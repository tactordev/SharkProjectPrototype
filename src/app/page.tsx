"use client";
import styles from "./Home.module.css";
export default function Home() {

  function add_shark() {
    const formInputs = document.querySelectorAll<HTMLInputElement>(`.${styles.textInput}`); // fetches the formInputs (a list of the input boxes)
    const unmetRequirement = document.querySelector<HTMLParagraphElement>(`.${styles.requirementsNotMet}`); // gets the text which is for the requirementNotMet which will tell the user they have empty, required boxes to fill in
    const metRequirement = document.querySelector<HTMLParagraphElement>(`.${styles.submittedReport}`); // gets the text whcih is for submittedReport which will tell the user when the report has been put into the db successfully
    let unfinished = false; // used for later for checking if there are required and empty boxes
    const formInformation: {[key: string]: (string)} = {} // used for the api post request to have all the information in a json
    formInputs.forEach((formInput) => { // shorthand for function which loops throguh formInputs
      if (formInput.required === true) { // checks if the input box is required
        if (formInput.value.trim() === "") { // checks if empty
          formInput.classList.add(`${styles.requirementFailed}`); // makes border red by adding style
          unfinished = true; // used for later
        } else { // otherwise it will add the inputted info to the json which is sent through the api
          formInformation[formInput.id] = `${formInput.value}`
        }
      }
    }) 

    if (unmetRequirement && unfinished) { // checks whether it is unmet and then sends error message to user about not all info entered
      unmetRequirement.classList.add(`${styles.unmet}`);
      metRequirement?.classList.remove(`${styles.met}`);
    } else {
      

      // start of POST request

      fetch('https://x8ki-letl-twmt.n7.xano.io/api:2D0WNQvF/shark_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formInformation)
      })
      .then(response => { // error checking
        if(!response.ok) {
          throw new Error("Network error.")

        }
        return response.json()
      })
      .then(data => { // gets the response from the POST request
        console.log(`Success: ${data}`)
      })
      .catch(error => { // gets any error from POST request
        console.error(`Error: ${error}`)
      })

      console.log(formInformation) // logs the information sent for debugging

      unmetRequirement?.classList.remove(`${styles.unmet}`);
      metRequirement?.classList.add(`${styles.met}`)
    }
    
  }
  return ( // frontend styling
    <main> {/* title nav bar */}
      <div className={styles.titleContainer}>
        <p className={styles.title}>Miyaru Shark Report</p>
      </div>
      <div className={styles.form}> {/*start of form*/}
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

        <input type="submit" className={`${styles.formSubmit}`} name="Submit Report" onClick={add_shark}></input> {/* submit button with function which sends post request and does validation checks */}

        <p className={styles.requirementsNotMet}>Please enter all the required information.</p> {/* information messages for user*/}
        <p className={styles.submittedReport}>Your report has been submitted successfully.</p>
      </div>
 
      <div className={styles.media}> {/* image to stop it being *too* bland */}
        <img className={styles.sharkImage} src="https://lh7-us.googleusercontent.com/cQgCpYQLeh5uE32coK0lbMIlkxVz3cLFyq-9x_8d_OSI5q5sLPn_BT-4ZqeeYTAkAUDhdYjTMNwFSfZhXIDIbVkUJkO6WL3Mt_8FOVsajUNRZseheOoaHMhSb3lRcXEJ_rZjHZ1UTZhwMpcQEjYneecgh8N3Jg" alt="shark image"></img>
      </div>


    </main>
  );
}
