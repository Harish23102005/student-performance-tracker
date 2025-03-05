const backendUrl =
  process.env.BACKEND_URL || "https://outcome-system-backend.onrender.com";

// ✅ Add Student Marks
async function addStudent() {
  const studentId = document.getElementById("studentId").value.trim();
  const name = document.getElementById("name").value.trim();
  const course = document.getElementById("course").value.trim();
  const marks = document.getElementById("marks").value;
  const totalMarks = document.getElementById("totalMarks").value;

  // ✅ Validation Check
  if (!studentId || !name || !course || !marks || !totalMarks) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch(`${backendUrl}/add-student`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, name, course, marks, totalMarks }),
    });

    const data = await response.json();
    alert("Student Added Successfully!");
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to add student. Try again.");
  }
}

// ✅ Fetch Student Performance Data
async function fetchPerformance() {
  const studentId = document.getElementById("trackStudentId").value.trim();

  if (!studentId) {
    alert("Please enter a Student ID.");
    return;
  }

  try {
    const response = await fetch(
      `${backendUrl}/student-performance/${studentId}`
    );
    const data = await response.json();

    if (!data.tests || data.tests.length === 0) {
      alert("No performance data found for this student.");
      return;
    }

    renderChart(data.tests);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to fetch performance data.");
  }
}

// ✅ Render Graph Using Chart.js
let myChart; // Store chart instance globally

function renderChart(testData) {
  const testNumbers = testData.map((_, index) => `Test ${index + 1}`);
  const marksPercentage = testData.map(
    (test) => (test.marks / test.totalMarks) * 100
  );
  const ctx = document.getElementById("performanceChart").getContext("2d");

  // ✅ Destroy previous chart if exists
  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
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
