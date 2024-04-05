// Define the Employee constructor function
function Employee(employeeId, fullName, department, level, imageUrl) {
    this.employeeId = employeeId;
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
}; // <-- Added closing curly brace here

// Define the tax percentage
const taxPercent = 7.5;

// Prototype function to calculate the salary
Employee.prototype.calculateSalary = function() {
    const { min, max } = levelSalaries[this.level];
    const randomSalary = Math.floor(Math.random() * (max - min + 1)) + min;
    const netSalary = randomSalary * (1 - taxPercent / 100);
    return netSalary;
};

// Prototype function to render the employee information
Employee.prototype.render = function() {
    return `<div class="employee">
                <img src="${this.imageUrl}" alt="${this.fullName}">
                <p>Name: ${this.fullName}</p>
                <p>Department: ${this.department}</p>
                <p>Level: ${this.level}</p>
                <p>Salary: $${this.salary.toFixed(2)}</p>
            </div>`;
};

const employees = [
    new Employee(1000, "Ghazi Samer", "Administration", "Senior", "https://th.bing.com/th/id/OIP.lrODV181gEQh9tI4_Og2zwHaE8?w=274&h=183&c=7&r=0&o=5&pid=1.7"),
    new Employee(1001, "Lana Ali", "Finance", "Senior", "https://th.bing.com/th/id/OIP.XGyjZfRlQbqkDkackGAlPAHaF7?pid=ImgDet&w=474&h=379&rs=1"),
    new Employee(1002, "Tamara Ayoub", "Marketing", "Senior", "https://th.bing.com/th/id/OIP.RI7shrzeK98cE9ttIQ0iRwHaIV?pid=ImgDet&w=189&h=212&c=7"),
    new Employee(1003, "Safi Walid", "Administration", "Mid-Senior", "https://media.licdn.com/dms/image/D4D03AQEVghLlYFZKhg/profile-displayphoto-shrink_800_800/0/1668626836564?e=2147483647&v=beta&t=iGVtkcIbgaDSlZjwchxP9h1sK0TUpw65IM1AZixEUvc"),
    new Employee(1004, "Omar Zaid", "Development", "Senior", "https://media.licdn.com/dms/image/C4E03AQEo1lRhJ7Z-sA/profile-displayphoto-shrink_800_800/0/1599703558735?e=2147483647&v=beta&t=-I2t8aRGK47tTmx5aH7MzFDtvR94CpkoZ3LMBWSNPPc"),
    new Employee(1005, "Rana Saleh", "Development", "Junior", "https://static1.personality-database.com/profile_images/639aa69601b4483c8b4c43d4378eeaef.png"),
    new Employee(1006, "Hadi Ahmad", "Finance", "Mid-Senior", "https://www.snapfi.com/wp-content/uploads/2019/01/Jimmy-Garcia-500-bio-pic-300x300.jpg")
];

// Get the element where employee information will be rendered
const employeeList = document.getElementById('employeeList');

// Render employee information
employees.forEach((employee, index) => {
    const employeeDiv = document.createElement('div');
    employeeDiv.innerHTML = employee.render();
    employeeDiv.classList.add('employee'); // Add a CSS class to style the employee container
    if (index < employees.length - 1) {
        employeeDiv.classList.add('employee-divider'); // Add a CSS class to style the divider between employees
    }
    employeeList.appendChild(employeeDiv);
});
