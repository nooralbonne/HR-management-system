// Define an array to store used employee IDs
const usedEmployeeIds = [];

// Define variables for department sections
const administrationSection = document.getElementById('administrationDep');
const marketingSection = document.getElementById('marketingDep');
const developmentSection = document.getElementById('developmentDep');
const financeSection = document.getElementById('financeDep');

// Define the Employee constructor function
function Employee(employeeId, fullName, department, level, imageUrl) {
    this.employeeId = employeeId ;
    this.fullName = fullName;
    this.department = department;
    this.level = level;
    this.imageUrl = imageUrl;
    this.salary = this.calculateSalary();
}

// Define the levels and their corresponding salary ranges
const levelSalaries = {
    "Junior": { min: 500, max: 1000 },
    "Mid-Senior": { min: 1000, max: 1500 },
    "Senior": { min: 1500, max: 2000 }
};

// Define the tax percentage
const taxPercent = 7.5;

// Prototype function to calculate the salary
Employee.prototype.calculateSalary = function() {
    const { min, max } = levelSalaries[this.level];
    const randomSalary = Math.floor(Math.random() * (max - min + 1)) + min;
    const netSalary = randomSalary * (1 - taxPercent / 100);
    return netSalary;
};

// Function to generate a unique employee ID
function generateUniqueEmployeeId() {
    let newId;
    do {
        newId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    } while (usedEmployeeIds.includes(newId));
    usedEmployeeIds.push(newId);
    return newId;
}

// Prototype function to render the employee information
Employee.prototype.render = function(index) {
    const employeeDiv = document.createElement('div');
    employeeDiv.classList.add('employee'); // Add a CSS class to style the employee container
    if (index < employees.length - 1) {
        employeeDiv.classList.add('employee-divider'); // Add a CSS class to style the divider between employees
    }
    let section;
    if (this.department === "Administration") {
        section = administrationSection;
    } else if (this.department === "Marketing") {
        section = marketingSection;
    } else if (this.department === "Development") {
        section = developmentSection;
    } else if (this.department === "Finance") {
        section = financeSection;
    }

    const employeeImage = document.createElement('img');
    employeeImage.src = `${this.imageUrl}`;
    employeeImage.alt = this.fullName;

    const employeeDetails = document.createElement('div');
    employeeDetails.classList.add('employee-details');

    const nameParagraph = document.createElement('p');
    nameParagraph.innerHTML = `<strong>Name:</strong> ${this.fullName}`;

    const departmentParagraph = document.createElement('p');
    departmentParagraph.innerHTML = `<strong>Department:</strong> ${this.department}`;

    const levelParagraph = document.createElement('p');
    levelParagraph.innerHTML = `<strong>Level:</strong> ${this.level}`;

    const salaryParagraph = document.createElement('p');
    salaryParagraph.innerHTML = `<strong>Salary:</strong> $${this.salary.toFixed(2)}`;

    const employeeIdParagraph = document.createElement('p');
    const employeeId = generateUniqueEmployeeId();
    employeeIdParagraph.innerHTML = `<strong>Employee ID:</strong> ${employeeId}`;
    employeeDetails.appendChild(employeeIdParagraph); // Add employee ID paragraph
    employeeDetails.appendChild(nameParagraph);
    employeeDetails.appendChild(departmentParagraph);
    employeeDetails.appendChild(levelParagraph);
    employeeDetails.appendChild(salaryParagraph);

    employeeDiv.appendChild(employeeImage);
    employeeDiv.appendChild(employeeDetails);

    return employeeDiv;
};



// Create employee instances
const employees = [
    new Employee(generateUniqueEmployeeId(), "Ghazi Samer", "Administration", "Senior", "https://th.bing.com/th/id/OIP.lrODV181gEQh9tI4_Og2zwHaE8?w=274&h=183&c=7&r=0&o=5&pid=1.7"),
    new Employee(generateUniqueEmployeeId(), "Lana Ali", "Finance", "Senior", "https://th.bing.com/th/id/OIP.XGyjZfRlQbqkDkackGAlPAHaF7?pid=ImgDet&w=474&h=379&rs=1"),
    new Employee(generateUniqueEmployeeId(), "Tamara Ayoub", "Marketing", "Senior", "https://th.bing.com/th/id/OIP.RI7shrzeK98cE9ttIQ0iRwHaIV?pid=ImgDet&w=189&h=212&c=7"),
    new Employee(generateUniqueEmployeeId(), "Safi Walid", "Administration", "Mid-Senior", "https://media.licdn.com/dms/image/D4D03AQEVghLlYFZKhg/profile-displayphoto-shrink_800_800/0/1668626836564?e=2147483647&v=beta&t=iGVtkcIbgaDSlZjwchxP9h1sK0TUpw65IM1AZixEUvc"),
    new Employee(generateUniqueEmployeeId(), "Omar Zaid", "Development", "Senior", "https://media.licdn.com/dms/image/C4E03AQEo1lRhJ7Z-sA/profile-displayphoto-shrink_800_800/0/1599703558735?e=2147483647&v=beta&t=-I2t8aRGK47tTmx5aH7MzFDtvR94CpkoZ3LMBWSNPPc"),
    new Employee(generateUniqueEmployeeId(), "Rana Saleh", "Development", "Junior", "https://static1.personality-database.com/profile_images/639aa69601b4483c8b4c43d4378eeaef.png"),
    new Employee(generateUniqueEmployeeId(), "Hadi Ahmad", "Finance", "Mid-Senior", "https://www.snapfi.com/wp-content/uploads/2019/01/Jimmy-Garcia-500-bio-pic-300x300.jpg")
];

let empForm = document.getElementById("employeeForm");
console.log("Form:", empForm);
empForm.addEventListener('submit', addNewEmployee);

function addNewEmployee(event){
    event.preventDefault();
    let name = document.getElementById('Fullname').value;
    let department = document.getElementById('Department').value;
    let level = document.getElementById('Level').value;
    let imageURL = document.getElementById('Imageurl').value;
    let newEmployee = new Employee(generateUniqueEmployeeId(), name, department, level, imageURL);
    let newEmployeeDiv = newEmployee.render();
    employeeList.appendChild(newEmployeeDiv); // Append the new employee to the DOM

    
    // Append the new employee to the appropriate department section
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
        default:
            // Handle any other departments or errors
            break;
    }
}

// Render all existing employees on the home page
employees.forEach((employee, index) => {
    const employeeDiv = employee.render(index);
    // Append the employee to the appropriate department section
    switch (employee.department) {
        case "Administration":
            administrationSection.appendChild(employeeDiv);
            break;
        case "Marketing":
            marketingSection.appendChild(employeeDiv);
            break;
        case "Development":
            developmentSection.appendChild(employeeDiv);
            break;
        case "Finance":
            financeSection.appendChild(employeeDiv);
            break;
        default:
            // Handle any other departments or errors
            break;
    }
    const employeeId = generateUniqueEmployeeId();
console.log("Generated Employee ID:", employeeId);


});
