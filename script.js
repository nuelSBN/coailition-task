const patientsListCol = document.getElementById("patients-list");
const mainContentRight = document.querySelector(".main__content-right");
const ctx = document.getElementById("myChart").getContext("2d");
const diastolicValue = document.getElementById("diastolicValue");
const systolicValue = document.getElementById("systolicValue");
const mainContentCenterTableBody = document.querySelector(
  ".main__content-center-table-body"
);

let username = "coalition";
let password = "skills-test";
let auth = btoa(`${username}:${password}`);

fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
  headers: {
    Authorization: `Basic ${auth}`,
  },
})
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  })
  .then(function (data) {
    data.forEach((patient) => {
      if (patient.name === "Jessica Taylor") {
        patient.isActive = true;
        console.log(patient.diagnosis_history);
      } else {
        patient.isActive = false;
      }
    });

    data.forEach((patient) => {
      const userProfile = document.createElement("div");
      userProfile.className = "user__profile";

      if (patient.isActive) {
        userProfile.classList.add("active");
      }

      const userProfileLeft = document.createElement("div");
      userProfileLeft.className = "user__profile-left";

      const profileImg = document.createElement("img");
      profileImg.src = patient.profile_picture;
      profileImg.alt = `${patient.name} portrait`;
      profileImg.title = patient.name;

      const profileDetails = document.createElement("div");
      profileDetails.className = "user__profile-details";

      const nameElement = document.createElement("h1");
      nameElement.textContent = patient.name;

      const ageGenderElement = document.createElement("h3");
      ageGenderElement.textContent = `${
        patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)
      }, ${patient.age}`;

      profileDetails.appendChild(nameElement);
      profileDetails.appendChild(ageGenderElement);

      userProfileLeft.appendChild(profileImg);
      userProfileLeft.appendChild(profileDetails);

      const userProfileIcon = document.createElement("div");
      userProfileIcon.className = "user__profile-icon";

      const iconImg = document.createElement("img");
      iconImg.src = "assets/svg/more_hori.svg";
      iconImg.alt = "";

      userProfileIcon.appendChild(iconImg);

      userProfile.appendChild(userProfileLeft);
      userProfile.appendChild(userProfileIcon);

      patientsListCol.appendChild(userProfile);
    });

    data.forEach((patient) => {
      if (patient.name === "Jessica Taylor") {
        console.log(patient);
        const monthAbbreviations = {
          January: "Jan",
          February: "Feb",
          March: "Mar",
          April: "Apr",
          May: "May",
          June: "Jun",
          July: "Jul",
          August: "Aug",
          September: "Sep",
          October: "Oct",
          November: "Nov",
          December: "Dec",
        };

        const labels = patient.diagnosis_history.map(
          (entry) => monthAbbreviations[entry.month] + " " + entry.year
        );
        const systolicData = patient.diagnosis_history.map(
          (entry) => entry.blood_pressure.systolic.value
        );
        const diastolicData = patient.diagnosis_history.map(
          (entry) => entry.blood_pressure.diastolic.value
        );

        new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Systolic Blood Pressure",
                data: systolicData,
                backgroundColor: "#E66FD2",
                borderColor: "#E66FD2",
                borderWidth: 1,
              },
              {
                label: "Diastolic Blood Pressure",
                data: diastolicData,
                backgroundColor: "#8C6FE6",
                borderColor: "#8C6FE6",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },

            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    });

    data.forEach((patient) => {
      if (patient.name === "Jessica Taylor") {
        mainContentRight.innerHTML = `
          <div class="main__content-right-top">
            <div class="main__content-right-img">
              <img src=${patient.profile_picture} alt="${patient.name}" />
              <h1 title="${patient.name}">${patient.name}</h1>
            </div>
            <div class="main__content-right-info">
              <div class="main__content-details">
                <img src="assets/svg/BirthIcon.svg" alt="" title="calendar" />
                <div class="main__content-details-texts">
                  <p>Date Of Birth</p>
                  <h1>${patient.date_of_birth}</h1>
                </div>
              </div>
              <div class="main__content-details">
                <img src="assets/svg/FemaleIcon.svg" alt="" title="calendar" />
                <div class="main__content-details-texts">
                  <p>Gender</p>
                  <h1>${patient.gender}</h1>
                </div>
              </div>
              <div class="main__content-details">
                <img src="assets/svg/PhoneIcon.svg" alt="" title="calendar" />
                <div class="main__content-details-texts">
                  <p>Contact Info.</p>
                  <h1>${patient.phone_number}</h1>
                </div>
              </div>
              <div class="main__content-details">
                <img src="assets/svg/PhoneIcon.svg" alt="" title="calendar" />
                <div class="main__content-details-texts">
                  <p>Emergency Contacts</p>
                  <h1>${patient.emergency_contact}</h1>
                </div>
              </div>
              <div class="main__content-details">
                <img src="assets/svg/InsuranceIcon.svg" alt="" title="calendar" />
                <div class="main__content-details-texts">
                  <p>Insurance Provider</p>
                  <h1>${patient.insurance_type}</h1>
                </div>
              </div>
              <div class="main__content-details">
                <button>Show All Information</button>
              </div>
            </div>
          </div>

          <div class="main__content-right-bottom">
             <h1>Lab Results</h1>
             <div class="results">
             <div class="results_rows">
                <p>Blood Tests</p>
                <img src="assets/svg/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt="" />
             </div>
             <div class="results_rows">
                <p>CT Scans</p>
                <img src="assets/svg/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt="" />
             </div>
             <div class="results_rows">
                <p>Radiology Reports</p>
                <img src="assets/svg/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt="" />
             </div>
             <div class="results_rows">
                <p>X-Rays</p>
                <img src="assets/svg/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt="" />
             </div>
             <div class="results_rows">
                <p>Urine Test</p>
                <img src="assets/svg/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt="" />
             </div>
             </div>
          </div>
        `;

        // the first item in the array
        const diagnosis_history = patient.diagnosis_history[0];

        // Respiratory Rate
        document.getElementById(
          "rbpm"
        ).innerText = `${diagnosis_history.respiratory_rate.value} bpm`;
        document.getElementById(
          "rbpm_levels"
        ).innerText = `${diagnosis_history.respiratory_rate.levels}`;

        // Temperature Rate
        document.getElementById(
          "temp"
        ).innerText = `${diagnosis_history.temperature.value}F`;
        document.getElementById(
          "temp_levels"
        ).innerText = `${diagnosis_history.temperature.levels}`;

        // Temperature Rate
        document.getElementById(
          "hbpm"
        ).innerText = `${diagnosis_history.heart_rate.value} bpm`;
        document.getElementById(
          "hbpm_levels"
        ).innerText = `${diagnosis_history.heart_rate.levels}`;

        patient.diagnostic_list.forEach((diagnosis) => {
          const row = document.createElement("div");
          row.className = "main__content-center-table-row";
          row.innerHTML = `
            <p>${diagnosis.name}</p>
            <p>${diagnosis.description}</p>
            <p>${diagnosis.status}</p>
          `;
          mainContentCenterTableBody.appendChild(row);
        });
      }
    });
  })
  .catch(function (error) {
    console.warn(error);
  });
