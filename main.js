fetch(" https://api.mocki.io/v2/01047e91/students")
.then((response)=>{
    console.log(response);
    return response.json();
})
.then((data) =>{
    let studentList = document.createElement("ul");
    studentList.style.listStyle ="none";
    data.forEach((object) => {
        let student = document.createElement("li");
        let studentNames = document.createElement("span");
        studentNames.textContent = object.firstName +" " + object.lastName ;
        student.appendChild(studentNames);
        studentList.appendChild(student);
    });
    document.body.appendChild(studentList);

data.forEach((object) =>{
    if(object.programme === "Frontend"){
        console.log
    }
})




});

