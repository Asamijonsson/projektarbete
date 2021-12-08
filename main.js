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

    //sortera elever i stigande och fallande ordning

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
      let schoolActivities4 = schools[3].activities;
      let schoolEducation4 = schools[3].programmes;
      // let compareActivities4 = schoolActivities4.filter(function (e) {
      //   return object.hobbies.indexOf(e) > -1;
      // });
      let compareEducation4 = schoolEducation4.filter(function (e) {
        return object.programme.indexOf(e) > -1;
      });
      if (schoolActivities4.length == compareEducation4.length) {
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

    let filteredEducation = (filterBy) => {
      let filteredStudentsList = document.createElement("ul");

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
        filteredEducation(option.value);
      }
    });
  });

  //Sortera eleverna
  students.forEach((info) => {
    let sortContainer = document.querySelector("#studentInfo");

    //Baserat på ålder(lägst först)
    document.querySelector(".age").addEventListener("click", () => {
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

      let sortByAge = () => {
        students.sort((a, b) => (a.age > b.age ? 1 : -1));
      };
      sortByAge();
    });

    //Baserat på förnamn(stigande ordning)
    document.querySelector(".firstName").addEventListener("click", () => {
      // sortButton.addEventListener("click", () => {
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

      let sortByFirstName = () => {
        students.sort((a, b) => {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        });
      };
      sortByFirstName();
    });

    //Baserat på förnamn(fallande ordning)
    document.querySelector(".firstName2").addEventListener("click", () => {
      // sortButton.addEventListener("click", () => {
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

      const sortByFirstName2 = () => {
        students.sort((a, b) => {
          if (b.firstName < a.firstName) {
            return -1;
          }
          if (b.firstName > a.firstName) {
            return 1;
          }
          return 0;
        });
      };
      sortByFirstName2();
    });

    //Baserat på efternamn(stigande ordning)
    document.querySelector(".lastName").addEventListener("click", () => {
      // sortButton.addEventListener("click", () => {
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

      let sortByLastName = () => {
        students.sort((a, b) => {
          if (a.lastName < b.lastName) {
            return -1;
          }
          if (a.lastName > b.lastName) {
            return 1;
          }
          return 0;
        });
      };
      sortByLastName();
    });

    //Baserat på förnamn(fallande ordning)
    document.querySelector(".lastName2").addEventListener("click", () => {
      // sortButton.addEventListener("click", () => {
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

      let sortByLastName2 = () => {
        students.sort((a, b) => {
          if (b.lastName < a.lastName) {
            return -1;
          }
          if (b.lastName > a.lastName) {
            return 1;
          }
          return 0;
        });
      };
      sortByLastName2();
    });
  });

  //
  //Söka eleverna med nickel ord
  students.forEach((info) => {
    let showStudentsBtn = document.querySelector("#showStudents");
    showStudentsBtn.addEventListener("click", () => {
      let output = document.querySelector("#studentOutput");
      output.innerHTML = "";
      let textbox = document.querySelector("#inputMessage");
      let inputValue = textbox.value;
      let outputMessage = document.createElement("p");
      outputMessage.innerHTML = inputValue;

      //Loopa igenom varje elevernas profile
      let studentInfo = students;
      let student1 = studentInfo[0];
      let student1Hobbies = studentInfo[0].hobbies;

      if (
        inputValue.toLowerCase() === student1.lastName.toLowerCase() ||
        inputValue.toLowerCase() === student1.firstName.toLowerCase() ||
        inputValue.toLowerCase() === student1.programme.toLowerCase() ||
        student1Hobbies.includes(inputValue)
      ) {
        let student1List = document.createElement("ul");
        let student1Name = document.createElement("p");
        student1Name.innerHTML = student1.firstName + " " + student1.lastName;
        student1List.appendChild(student1Name);
        let student1Age = document.createElement("p");
        student1Age.innerHTML = student1.age;
        student1Name.appendChild(student1Age);
        let student1HobbiesList = document.createElement("ul");
        student1.hobbies.forEach((index) => {
          let student1Hobbies = document.createElement("li");
          student1Hobbies.innerHTML = index;
          student1Age.appendChild(student1HobbiesList);
          student1HobbiesList.appendChild(student1Hobbies);
        });
        let student1Education = document.createElement("p");
        student1Education.innerHTML = student1.programme;
        student1HobbiesList.appendChild(student1Education);
        output.appendChild(student1List);
      }

      let student2 = studentInfo[1];
      let student2Hobbies = studentInfo[1].hobbies;

      if (
        inputValue.toLowerCase() === student2.lastName.toLowerCase() ||
        inputValue.toLowerCase() === student2.firstName.toLowerCase() ||
        inputValue.toLowerCase() === student2.programme.toLowerCase() ||
        student2Hobbies.includes(inputValue)
      ) {
        let student2List = document.createElement("ul");
        let student2Name = document.createElement("p");
        student2Name.innerHTML = student2.firstName + " " + student2.lastName;
        student2List.appendChild(student2Name);
        let student2Age = document.createElement("p");
        student2Age.innerHTML = student2.age;
        student2Name.appendChild(student2Age);
        let student2HobbiesList = document.createElement("ul");
        student2.hobbies.forEach((index) => {
          let student2Hobbies = document.createElement("li");
          student2Hobbies.innerHTML = index;
          student2Age.appendChild(student2HobbiesList);
          student2HobbiesList.appendChild(student2Hobbies);
        });
        let student2Education = document.createElement("p");
        student2Education.innerHTML = student2.programme;
        student2HobbiesList.appendChild(student2Education);
        output.appendChild(student2List);
      }

      let student3 = studentInfo[2];
      let student3Hobbies = studentInfo[2].hobbies;

      if (
        inputValue.toLowerCase() === student3.lastName.toLowerCase() ||
        inputValue.toLowerCase() === student3.firstName.toLowerCase() ||
        inputValue.toLowerCase() === student3.programme.toLowerCase() ||
        student3Hobbies.includes(inputValue)
      ) {
        let student3List = document.createElement("ul");
        let student3Name = document.createElement("p");
        student3Name.innerHTML = student3.firstName + " " + student3.lastName;
        student3List.appendChild(student3Name);
        let student3Age = document.createElement("p");
        student3Age.innerHTML = student3.age;
        student3Name.appendChild(student3Age);
        let student3HobbiesList = document.createElement("ul");
        student3.hobbies.forEach((index) => {
          let student3Hobbies = document.createElement("li");
          student3Hobbies.innerHTML = index;
          student3Age.appendChild(student3HobbiesList);
          student3HobbiesList.appendChild(student3Hobbies);
        });
        let student3Education = document.createElement("p");
        student3Education.innerHTML = student3.programme;
        student3HobbiesList.appendChild(student3Education);
        output.appendChild(student3List);
      }

      let student4 = studentInfo[3];
      let student4Hobbies = studentInfo[3].hobbies;

      if (
        inputValue.toLowerCase() === student4.lastName.toLowerCase() ||
        inputValue.toLowerCase() === student4.firstName.toLowerCase() ||
        inputValue.toLowerCase() === student4.programme.toLowerCase() ||
        student4Hobbies.includes(inputValue)
      ) {
        let student4List = document.createElement("ul");
        let student4Name = document.createElement("p");
        student4Name.innerHTML = student4.firstName + " " + student4.lastName;
        student4List.appendChild(student4Name);
        let student4Age = document.createElement("p");
        student4Age.innerHTML = student4.age;
        student4Name.appendChild(student4Age);
        let student4HobbiesList = document.createElement("ul");
        student4.hobbies.forEach((index) => {
          let student4Hobbies = document.createElement("li");
          student4Hobbies.innerHTML = index;
          student4Age.appendChild(student4HobbiesList);
          student4HobbiesList.appendChild(student4Hobbies);
        });
        let student4Education = document.createElement("p");
        student4Education.innerHTML = student4.programme;
        student4HobbiesList.appendChild(student4Education);
        output.appendChild(student4List);
      }

      let student5 = studentInfo[4];
      let student5Hobbies = studentInfo[4].hobbies;

      if (
        inputValue.toLowerCase() === student5.lastName.toLowerCase() ||
        inputValue.toLowerCase() === student5.firstName.toLowerCase() ||
        inputValue.toLowerCase() === student5.programme.toLowerCase() ||
        student5Hobbies.includes(inputValue)
      ) {
        let student5List = document.createElement("ul");
        let student5Name = document.createElement("p");
        student5Name.innerHTML = student5.firstName + " " + student5.lastName;
        student5List.appendChild(student5Name);
        let student5Age = document.createElement("p");
        student5Age.innerHTML = student5.age;
        student5Name.appendChild(student5Age);
        let student5HobbiesList = document.createElement("ul");
        student5.hobbies.forEach((index) => {
          let student5Hobbies = document.createElement("li");
          student5Hobbies.innerHTML = index;
          student5Age.appendChild(student5HobbiesList);
          student5HobbiesList.appendChild(student5Hobbies);
        });
        let student5Education = document.createElement("p");
        student5Education.innerHTML = student5.programme;
        student5HobbiesList.appendChild(student5Education);
        output.appendChild(student5List);
      }

      let student6 = studentInfo[5];
      let student6Hobbies = studentInfo[5].hobbies;

      if (
        inputValue.toLowerCase() === student6.lastName.toLowerCase() ||
        inputValue.toLowerCase() === student6.firstName.toLowerCase() ||
        inputValue.toLowerCase() === student6.programme.toLowerCase() ||
        student6Hobbies.includes(inputValue)
      ) {
        let student6List = document.createElement("ul");
        let student6Name = document.createElement("p");
        student6Name.innerHTML = student6.firstName + " " + student6.lastName;
        student6List.appendChild(student6Name);
        let student6Age = document.createElement("p");
        student6Age.innerHTML = student6.age;
        student6Name.appendChild(student6Age);
        let student6HobbiesList = document.createElement("ul");
        student6.hobbies.forEach((index) => {
          let student6Hobbies = document.createElement("li");
          student6Hobbies.innerHTML = index;
          student6Age.appendChild(student6HobbiesList);
          student6HobbiesList.appendChild(student6Hobbies);
        });
        let student6Education = document.createElement("p");
        student6Education.innerHTML = student6.programme;
        student6HobbiesList.appendChild(student6Education);
        output.appendChild(student6List);
      }

      let student7 = studentInfo[6];
      let student7Hobbies = studentInfo[6].hobbies;

      if (
        inputValue.toLowerCase() === student7.lastName.toLowerCase() ||
        inputValue.toLowerCase() === student7.firstName.toLowerCase() ||
        inputValue.toLowerCase() === student7.programme.toLowerCase() ||
        student7Hobbies.includes(inputValue)
      ) {
        let student7List = document.createElement("ul");
        let student7Name = document.createElement("p");
        student7Name.innerHTML = student7.firstName + " " + student7.lastName;
        student7List.appendChild(student7Name);
        let student7Age = document.createElement("p");
        student7Age.innerHTML = student7.age;
        student7Name.appendChild(student7Age);
        let student7HobbiesList = document.createElement("ul");
        student7.hobbies.forEach((index) => {
          let student7Hobbies = document.createElement("li");
          student7Hobbies.innerHTML = index;
          student7Age.appendChild(student7HobbiesList);
          student7HobbiesList.appendChild(student7Hobbies);
        });
        let student7Education = document.createElement("p");
        student7Education.innerHTML = student7.programme;
        student7HobbiesList.appendChild(student7Education);
        output.appendChild(student7List);
      }

      let student8 = studentInfo[7];
      let student8Hobbies = studentInfo[7].hobbies;

      if (
        inputValue.toLowerCase() === student8.lastName.toLowerCase() ||
        inputValue.toLowerCase() === student8.firstName.toLowerCase() ||
        inputValue.toLowerCase() === student8.programme.toLowerCase() ||
        student8Hobbies.includes(inputValue)
      ) {
        let student8List = document.createElement("ul");
        let student8Name = document.createElement("p");
        student8Name.innerHTML = student8.firstName + " " + student8.lastName;
        student8List.appendChild(student8Name);
        let student8Age = document.createElement("p");
        student8Age.innerHTML = student8.age;
        student8Name.appendChild(student8Age);
        let student8HobbiesList = document.createElement("ul");
        student8.hobbies.forEach((index) => {
          let student8Hobbies = document.createElement("li");
          student8Hobbies.innerHTML = index;
          student8Age.appendChild(student8HobbiesList);
          student8HobbiesList.appendChild(student8Hobbies);
        });
        let student8Education = document.createElement("p");
        student8Education.innerHTML = student8.programme;
        student8HobbiesList.appendChild(student8Education);
        output.appendChild(student8List);
      }

      let student9 = studentInfo[8];
      let student9Hobbies = studentInfo[8].hobbies;

      if (
        inputValue.toLowerCase() === student9.lastName.toLowerCase() ||
        inputValue.toLowerCase() === student9.firstName.toLowerCase() ||
        inputValue.toLowerCase() === student9.programme.toLowerCase() ||
        student9Hobbies.includes(inputValue)
      ) {
        let student9List = document.createElement("ul");
        let student9Name = document.createElement("p");
        student9Name.innerHTML = student9.firstName + " " + student9.lastName;
        student9List.appendChild(student9Name);
        let student9Age = document.createElement("p");
        student9Age.innerHTML = student9.age;
        student9Name.appendChild(student9Age);
        let student9HobbiesList = document.createElement("ul");
        student9.hobbies.forEach((index) => {
          let student9Hobbies = document.createElement("li");
          student9Hobbies.innerHTML = index;
          student9Age.appendChild(student9HobbiesList);
          student9HobbiesList.appendChild(student9Hobbies);
        });
        let student9Education = document.createElement("p");
        student9Education.innerHTML = student9.programme;
        student9HobbiesList.appendChild(student9Education);
        output.appendChild(student9List);
      }

      let student10 = studentInfo[9];
      let student10Hobbies = studentInfo[9].hobbies;

      if (
        inputValue.toLowerCase() === student10.lastName.toLowerCase() ||
        inputValue.toLowerCase() === student10.firstName.toLowerCase() ||
        inputValue.toLowerCase() === student10.programme.toLowerCase() ||
        student10Hobbies.includes(inputValue)
      ) {
        let student10List = document.createElement("ul");
        let student10Name = document.createElement("p");
        student10Name.innerHTML =
          student10.firstName + " " + student10.lastName;
        student10List.appendChild(student10Name);
        let student10Age = document.createElement("p");
        student10Age.innerHTML = student10.age;
        student10Name.appendChild(student10Age);
        let student10HobbiesList = document.createElement("ul");
        student10.hobbies.forEach((index) => {
          let student10Hobbies = document.createElement("li");
          student10Hobbies.innerHTML = index;
          student10Age.appendChild(student10HobbiesList);
          student10HobbiesList.appendChild(student10Hobbies);
        });
        let student10Education = document.createElement("p");
        student10Education.innerHTML = student10.programme;
        student10HobbiesList.appendChild(student10Education);
        output.appendChild(student10List);
      }

      let student11 = studentInfo[10];
      let student11Hobbies = studentInfo[10].hobbies;

      if (
        inputValue.toLowerCase() === student11.lastName.toLowerCase() ||
        inputValue.toLowerCase() === student11.firstName.toLowerCase() ||
        inputValue.toLowerCase() === student11.programme.toLowerCase() ||
        student11Hobbies.includes(inputValue)
      ) {
        let student11List = document.createElement("ul");
        let student11Name = document.createElement("p");
        student11Name.innerHTML =
          student11.firstName + " " + student11.lastName;
        student11List.appendChild(student11Name);
        let student11Age = document.createElement("p");
        student11Age.innerHTML = student11.age;
        student11Name.appendChild(student11Age);
        let student11HobbiesList = document.createElement("ul");
        student11.hobbies.forEach((index) => {
          let student11Hobbies = document.createElement("li");
          student11Hobbies.innerHTML = index;
          student11Age.appendChild(student11HobbiesList);
          student11HobbiesList.appendChild(student11Hobbies);
        });
        let student11Education = document.createElement("p");
        student11Education.innerHTML = student11.programme;
        student11HobbiesList.appendChild(student11Education);
        output.appendChild(student11List);
      }
    });
  });
}

renderData();
