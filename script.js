const backendUrl = "https://outcome-system-backend.onrender.com";

// ✅ Add Student Marks
function addStudent() {
  const studentId = document.getElementById("studentId").value;
  const name = document.getElementById("name").value;
  const course = document.getElementById("course").value;
  const marks = document.getElementById("marks").value;
  const totalMarks = document.getElementById("totalMarks").value;

  fetch(`${backendUrl}/add-student`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, name, course, marks, totalMarks }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Student Added:", data))
    .catch((error) => console.error("Error:", error));
}

// ✅ Fetch Student Performance Data
function fetchPerformance() {
  const studentId = document.getElementById("trackStudentId").value;

  fetch(`${backendUrl}/student-performance/${studentId}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.tests || data.tests.length === 0) {
        // ✅ Check for null/undefined
        alert("No data found for this student.");
        return;
      }
      renderChart(data.tests);
    })
    .catch((error) => console.error("Error:", error));
}

// ✅ Render Graph Using Chart.js
function renderChart(testData) {
  const testNumbers = testData.map((test, index) => `Test ${index + 1}`);
  const marksPercentage = testData.map(
    (test) => (test.marks / test.totalMarks) * 100
  );

  const ctx = document.getElementById("performanceChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: testNumbers,
      datasets: [
        {
          label: "Performance (%)",
          data: marksPercentage,
          borderColor: "blue",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 100 },
      },
    },
  });
}
