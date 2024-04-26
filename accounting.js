// Function to update statistics using employee data from localStorage
function updateStatisticsFromLocalStorage() {
    let allEmployees = JSON.parse(localStorage.getItem("employees"));

    if (allEmployees && allEmployees.length > 0) {
        let adminC = 0;
        let markC = 0;
        let devC = 0;
        let finC = 0;

        let adminSal = 0;
        let markSal = 0;
        let devSal = 0;
        let finSal = 0;

        let totalNum = allEmployees.length;
        let totalSal = 0;

        allEmployees.forEach(employee => {
            switch (employee.department) {
                case "Administration":
                    adminC++;
                    adminSal += employee.salary;
                    break;
                case "Marketing":
                    markC++;
                    markSal += employee.salary;
                    break;
                case "Development":
                    devC++;
                    devSal += employee.salary;
                    break;
                case "Finance":
                    finC++;
                    finSal += employee.salary;
                    break;
            }
            totalSal += employee.salary;
        });

        // Calculate average salaries (handle division by zero)
        let adminAvg = adminC > 0 ? adminSal / adminC : 0;
        let markAvg = markC > 0 ? markSal / markC : 0;
        let devAvg = devC > 0 ? devSal / devC : 0;
        let finAvg = finC > 0 ? finSal / finC : 0;
        let totalAvg = totalNum > 0 ? totalSal / totalNum : 0;

        // Output the results to the console
        console.log("Department\tNumber of employees\tAverage salary\tTotal salary");
        console.log("Administration\t" + adminC + "\t" + adminAvg.toFixed(2) + "\t" + adminSal.toFixed(2));
        console.log("Marketing\t" + markC + "\t" + markAvg.toFixed(2) + "\t" + markSal.toFixed(2));
        console.log("Development\t" + devC + "\t" + devAvg.toFixed(2) + "\t" + devSal.toFixed(2));
        console.log("Finance\t" + finC + "\t" + finAvg.toFixed(2) + "\t" + finSal.toFixed(2));
        console.log("Total\t" + totalNum + "\t" + totalAvg.toFixed(2) + "\t" + totalSal.toFixed(2));

        // Display statistics in the HTML table
        document.getElementById("adminNum").textContent = adminC;
        document.getElementById("adminAvg").textContent = adminAvg.toFixed(2);
        document.getElementById("adminSal").textContent = adminSal.toFixed(2);

        document.getElementById("markNum").textContent = markC;
        document.getElementById("markAvg").textContent = markAvg.toFixed(2);
        document.getElementById("markSal").textContent = markSal.toFixed(2);

        document.getElementById("devNum").textContent = devC;
        document.getElementById("devAvg").textContent = devAvg.toFixed(2);
        document.getElementById("devSal").textContent = devSal.toFixed(2);

        document.getElementById("finNum").textContent = finC;
        document.getElementById("finAvg").textContent = finAvg.toFixed(2);
        document.getElementById("finSal").textContent = finSal.toFixed(2);

        document.getElementById("totalN").textContent = totalNum;
        document.getElementById("totalA").textContent = totalAvg.toFixed(2);
        document.getElementById("totalS").textContent = totalSal.toFixed(2);
    }
}

// Call the function to update statistics using employee data from localStorage
updateStatisticsFromLocalStorage();
