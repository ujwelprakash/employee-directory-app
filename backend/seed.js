const { connectDB, getDB } = require("./db");

async function seed() {
  await connectDB();
  const db = getDB();

  await db.collection("employees").deleteMany({});
  await db.collection("employees").insertMany([
    { name: "Alice", position: "Developer", department: "Engineering", salary: 50000 },
    { name: "Bob", position: "Designer", department: "Design", salary: 45000 },
    { name: "Charlie", position: "Manager", department: "HR", salary: 60000 },
    { name: "David", position: "QA", department: "Engineering", salary: 40000 },
    { name: "Eva", position: "Recruiter", department: "HR", salary: 42000 }
  ]);

  console.log("Seeded successfully.");
  process.exit();
}

seed();
