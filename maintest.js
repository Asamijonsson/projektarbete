// let getData = async (URL) => {
//   let response = await fetch(URL);
//   let data = await response.json();
//   return data;
// };

// async function renderData() {
//   let students = await getData("https://api.mocki.io/v2/01047e91/students");
//   let scools = await getData("https://api.mocki.io/v2/01047e91/scools");

//   //Skriva ut samtliga elever i en lista när sidan laddas
//   students.forEach((object) => {
//     let student = document.createElement("li");
//     student.textContent = object.firstName + " " + object.lastName;
//     document.querySelector("#studentList").appendChild(student);
//   });

//   let filterButton = document.querySelector("#filterButton");
//   let infoContainer = document.querySelector("#studentInfo");

//   let filteredStudentList = document.createElement("ul");

//   students.forEach((item) => {
//     if (item.programme.includes('Frontend')==true) {
//       let frontend = document.createElement("li");
//       frontend.textContent = item.firstName;
//       filteredStudentList.appendChild(frontend);
//       console.log(frontend);
//     }
   
//   });

var a = [1, 2, 3, 5];
  var b = [1, 2, 3, 5];
   
  // Comparing both arrays using stringify
  if(JSON.stringify(a)==JSON.stringify(b))
   document.write("True");
  else
   document.write("False");
   document.write('<br>');
  var f=[1, 2, 4, 5];
  if(JSON.stringify(a)==JSON.stringify(f))
   document.write("True");
  else
   document.write("False");
  
// }
// renderData();


