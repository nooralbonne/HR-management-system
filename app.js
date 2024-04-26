'use strict';

let allEmployees = [];
const usedEmployeeIds = [];
const administrationSection = document.getElementById('administrationDep');
const marketingSection = document.getElementById('marketingDep');
const developmentSection = document.getElementById('developmentDep');
const financeSection = document.getElementById('financeDep');

function Employee(employeeId, fullName, department, level, imageUrl) {
    this.employeeId = employeeId ;
    this.fullName = fullName;
    this.department = department;
    this.level = level;
    this.imageUrl = imageUrl;
    this.salary = this.calculateSalary();
    allEmployees.push(this);
}

const levelSalaries = {
    "Junior": { min: 500, max: 1000 },
    "Mid-Senior": { min: 1000, max: 1500 },
    "Senior": { min: 1500, max: 2000 }
};

const taxPercent = 7.5;

Employee.prototype.calculateSalary = function() {
    const min = levelSalaries[this.level].min;
    const max = levelSalaries[this.level].max;
    const randomSalary = Math.floor(Math.random() * (max - min + 1)) + min;
    const netSalary = randomSalary * (1 - taxPercent / 100);
    return netSalary;
};

function generateUniqueEmployeeId() {
    let newId;
    do {
        newId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    } while (usedEmployeeIds.includes(newId));
    usedEmployeeIds.push(newId);
    return newId;
}

Employee.prototype.render = function() {
    const employeeDiv = document.createElement('div');
    employeeDiv.classList.add('employee');

    const employeeImage = document.createElement('img');
    employeeImage.src = this.imageUrl;
    employeeImage.alt = this.fullName;
    employeeDiv.appendChild(employeeImage);

    const employeeDetails = document.createElement('div');
    employeeDetails.classList.add('employee-details');
    employeeDiv.appendChild(employeeDetails);

    const nameParagraph = document.createElement('p');
    nameParagraph.innerHTML = `<strong>Name:</strong> ${this.fullName}`;
    employeeDetails.appendChild(nameParagraph);

    const departmentParagraph = document.createElement('p');
    departmentParagraph.innerHTML = `<strong>Department:</strong> ${this.department}`;
    employeeDetails.appendChild(departmentParagraph);

    const levelParagraph = document.createElement('p');
    levelParagraph.innerHTML = `<strong>Level:</strong> ${this.level}`;
    employeeDetails.appendChild(levelParagraph);

    const salaryParagraph = document.createElement('p');
    salaryParagraph.innerHTML = `<strong>Salary:</strong> $${this.salary.toFixed(2)}`;
    employeeDetails.appendChild(salaryParagraph);

    const employeeIdParagraph = document.createElement('p');
    const employeeId = generateUniqueEmployeeId();
    employeeIdParagraph.innerHTML = `<strong>Employee ID:</strong> ${employeeId}`;
    employeeDetails.appendChild(employeeIdParagraph);

    return employeeDiv;
};

function staticEmployees() {
    // Clear the sections before adding static data
    administrationSection.innerHTML = '';
    marketingSection.innerHTML = '';
    developmentSection.innerHTML = '';
    financeSection.innerHTML = '';

    new Employee(generateUniqueEmployeeId(), "Ghazi Samer", "Administration", "Senior", "https://th.bing.com/th/id/OIP.lrODV181gEQh9tI4_Og2zwHaE8?w=274&h=183&c=7&r=0&o=5&pid=1.7");
    new Employee(generateUniqueEmployeeId(), "Lana Ali", "Finance", "Senior", "https://th.bing.com/th/id/OIP.XGyjZfRlQbqkDkackGAlPAHaF7?pid=ImgDet&w=474&h=379&rs=1");
    new Employee(generateUniqueEmployeeId(), "Tamara Ayoub", "Marketing", "Senior", "https://th.bing.com/th/id/OIP.RI7shrzeK98cE9ttIQ0iRwHaIV?pid=ImgDet&w=189&h=212&c=7");
    new Employee(generateUniqueEmployeeId(), "Safi Walid", "Administration", "Mid-Senior", "https://media.licdn.com/dms/image/D4D03AQEVghLlYFZKhg/profile-displayphoto-shrink_800_800/0/1668626836564?e=2147483647&v=beta&t=iGVtkcIbgaDSlZjwchxP9h1sK0TUpw65IM1AZixEUvc");
    new Employee(generateUniqueEmployeeId(), "Omar Zaid", "Development", "Senior", "https://media.licdn.com/dms/image/C4E03AQEo1lRhJ7Z-sA/profile-displayphoto-shrink_800_800/0/1599703558735?e=2147483647&v=beta&t=-I2t8aRGK47tTmx5aH7MzFDtvR94CpkoZ3LMBWSNPPc");
    new Employee(generateUniqueEmployeeId(), "Rana Saleh", "Development", "Junior", "https://static1.personality-database.com/profile_images/639aa69601b4483c8b4c43d4378eeaef.png");
    new Employee(generateUniqueEmployeeId(), "Hadi Ahmad", "Finance", "Mid-Senior", "https://www.snapfi.com/wp-content/uploads/2019/01/Jimmy-Garcia-500-bio-pic-300x300.jpg");

    renderAll(); // Render all employees after static data is added
}


staticEmployees();

let empForm = document.getElementById("employeeForm");

empForm.addEventListener('submit', submitHandler);

function submitHandler(event){
    event.preventDefault();
    let name = document.getElementById('Fullname').value;
    let department = document.getElementById('Department').value;
    let level = document.getElementById('Level').value;
    let imageURL = document.getElementById('Imageurl').value;

    let newEmployee = new Employee(generateUniqueEmployeeId(), name, department, level, imageURL);

    let newEmployeeDiv = newEmployee.render();
    
    switch (department) {
        case "Administration":
            administrationSection.appendChild(newEmployeeDiv);
            break;
        case "Marketing":
            marketingSection.appendChild(newEmployeeDiv);
            break;
        case "Development":
            developmentSection.appendChild(newEmployeeDiv);
            break;
        case "Finance":
            financeSection.appendChild(newEmployeeDiv);
            break;
    }
    
    saveData(allEmployees);
}

function saveData(data) {
    let stringArr = JSON.stringify(data);
    localStorage.setItem("employees", stringArr);
}

function getData() {
    let retrievedArr = localStorage.getItem("employees");
    let objArr = JSON.parse(retrievedArr);

    if (objArr && objArr.length >= 7) {
        for (let i = 7; i < objArr.length; i++) {
            new Employee(objArr[i].employeeId, objArr[i].fullName, objArr[i].department, objArr[i].level, objArr[i].imageUrl);
        }
        renderAll();
    }
}

getData();

function renderAll(){
    for (let i = 0 ; i < allEmployees.length; i++){
        allEmployees[i].salary = allEmployees[i].calculateSalary(); // Update salary
        let newEmployeeDiv = allEmployees[i].render(); // Render employee
        switch (allEmployees[i].department) {
            case "Administration":
                administrationSection.appendChild(newEmployeeDiv);
                break;
            case "Marketing":
                marketingSection.appendChild(newEmployeeDiv);
                break;
            case "Development":
                developmentSection.appendChild(newEmployeeDiv);
                break;
            case "Finance":
                financeSection.appendChild(newEmployeeDiv);
                break;
        }
    }      
}
