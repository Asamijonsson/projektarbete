let getData = async (URL) => {
  let response = await fetch(URL);
  let data = await response.json();
  return data;
};

async function renderData() {
  let students = await getData("https://api.mocki.io/v2/01047e91/students");
  let schools = await getData("https://api.mocki.io/v2/01047e91/schools");

  //Skriva ut samtliga elever i en lista när sidan laddas
  students.forEach((object) => {
    let student = document.createElement("li");
    student.textContent = object.firstName + " " + object.lastName + " ";
    document.querySelector("#studentList").appendChild(student);

    //fixa en knapp för att visa passande skolan till eleva
    let showSchoolBtn = document.createElement("button");
    showSchoolBtn.innerText = "Visa skolan";
    let showSchool = document.querySelector("#studentSchool");
    showSchoolBtn.addEventListener("click", () => {
      showSchool.innerHTML = "";

      //Filtrera elevernas hobbys & önskade utbildning och skolans activitet & utbildning
      let schoolInfo = schools;
      let schoolActivities = schools[0].activities;
      let schoolEducation = schools[0].programmes;

      let compareActivities = schoolActivities.filter(function (e) {
        return object.hobbies.indexOf(e) > -1;
      });
      let compareEducation = schoolEducation.filter(function (e) {
        return object.programme.indexOf(e) > -1;
      });
      if (compareActivities.length && compareEducation.length) {
        let firstSchool = document.createElement("li");
        firstSchool.textContent = schoolInfo[0].name;
        showSchool.appendChild(firstSchool);
      }

      let schoolActivities2 = schools[1].activities;
      let schoolEducation2 = schools[1].programmes;

      let compareActivities2 = schoolActivities2.filter(function (e) {
        return object.hobbies.indexOf(e) > -1;
      });
      let compareEducation2 = schoolEducation2.filter(function (e) {
        return object.programme.indexOf(e) > -1;
      });

      if (compareActivities2.length && compareEducation2.length) {
        let secondSchool = document.createElement("li");
        secondSchool.textContent = schoolInfo[1].name;
        showSchool.appendChild(secondSchool);
      }

      let schoolActivities3 = schools[2].activities;
      let schoolEducation3 = schools[2].programmes;
      let compareActivities3 = schoolActivities3.filter(function (e) {
        return object.hobbies.indexOf(e) > -1;
      });
      let compareEducation3 = schoolEducation3.filter(function (e) {
        return object.programme.indexOf(e) > -1;
      });

      if (compareActivities3.length && compareEducation3.length) {
        let thirdSchool = document.createElement("li");
        thirdSchool.textContent = schoolInfo[2].name;
        showSchool.appendChild(thirdSchool);
      }

      // !Den här skolan har ingen activitet
      // let schoolActivities4 = schools[3].activities;
      let schoolEducation4 = schools[3].programmes;
      // let compareActivities4 = schoolActivities4.filter(function (e) {
      //   return object.hobbies.indexOf(e) > -1;
      // });
      let compareEducation4 = schoolEducation4.filter(function (e) {
        return object.programme.indexOf(e) > -1;
      });
      if (compareEducation4.length) {
        let fourthSchool = document.createElement("li");
        fourthSchool.textContent = schoolInfo[3].name;
        showSchool.appendChild(fourthSchool);
      }

      let schoolActivities5 = schools[4].activities;
      let schoolEducation5 = schools[4].programmes;
      let compareActivities5 = schoolActivities5.filter(function (e) {
        return object.hobbies.indexOf(e) > -1;
      });
      let compareEducation5 = schoolEducation5.filter(function (e) {
        return object.programme.indexOf(e) > -1;
      });
      if (compareActivities5.length && compareEducation5.length) {
        let fifthSchool = document.createElement("li");
        fifthSchool.textContent = schoolInfo[4].name;
        showSchool.appendChild(fifthSchool);
      }
    });
    student.appendChild(showSchoolBtn);
  });

  //Filtrera eleverna i listan baserat på utbildning med radio button
  let filterButton = document.querySelector("#filterButton");
  let infoContainer = document.querySelector("#studentEducation");

  filterButton.addEventListener("click", () => {
    infoContainer.innerHTML = "";

    let filteredStudent = (filterBy) => {
      let filteredStudentsList = document.createElement("ul");
      //   filteredStudentList.style.listStyle = "none";
      // let studentInfo = document.querySelector("#studentInfo");
      // studentInfo.appendChild(filteredStudentList);

      if (filterBy === "Frontend") {
        students.forEach((item) => {
          if (item.programme.includes("Frontend") == true) {
            let frontend = document.createElement("li");
            frontend.textContent = item.firstName;
            filteredStudentsList.appendChild(frontend);
          }
        });
      } else if (filterBy === "Backend") {
        students.forEach((item) => {
          if (item.programme.includes("Backend") == true) {
            let backend = document.createElement("li");
            backend.textContent = item.firstName;
            filteredStudentsList.appendChild(backend);
          }
        });
      } else if (filterBy === ".NET") {
        students.forEach((item) => {
          if (item.programme.includes(".NET") == true) {
            let net = document.createElement("li");
            net.textContent = item.firstName;
            filteredStudentsList.appendChild(net);
          }
        });
      } else {
      }
      infoContainer.appendChild(filteredStudentsList);
    };

    let radioOptions = document.querySelectorAll("[name='filterOption']");
    radioOptions.forEach((option) => {
      if (option.checked) {
        filteredStudent(option.value);
      }
    });
  });

  students.forEach((info) => {
    let sortButton = document.querySelector("#sortButton");
    let sortContainer = document.querySelector("#studentInfo");

    sortButton.addEventListener("click", () => {
      sortContainer.innerHTML = "";

      //Skriva ut alla elevernas information
      let allStudents = document.createElement("ul");
      sortContainer.append(allStudents);

      students.forEach((object) => {
        let studentName = document.createElement("p");
        studentName.textContent =
          "Name: " + object.firstName + " " + object.lastName;
        allStudents.appendChild(studentName);

        let studentAge = document.createElement("p");
        studentAge.textContent = "Age:" + object.age;
        studentName.appendChild(studentAge);
        let text = document.createElement("p");

        text.innerText = "Hobbies: ";
        studentAge.appendChild(text);
        let studentHobby = document.createElement("ul");
        object.hobbies.forEach((index) => {
          let studentHobbies = document.createElement("li");
          studentHobbies.innerHTML = index;
          text.appendChild(studentHobby);
          studentHobby.appendChild(studentHobbies);
        });

        let studentEducation = document.createElement("p");
        studentEducation.textContent = "Programme:" + object.programme;
        text.appendChild(studentEducation);
      });

      //Sotera listan baserat på Ålder(lägst först)
      students.sort((a, b) => (a.age > b.age ? 1 : -1));

      // Förnamn(alfabetisk ordning)
      students.sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });

      //Efternamn(alfabetisk ordning)
      students.sort((a, b) => {
        if (a.lastName < b.lastName) {
          return -1;
        }
        if (a.lastName > b.lastName) {
          return 1;
        }
        return 0;
      });
    });
  });
}

renderData();
