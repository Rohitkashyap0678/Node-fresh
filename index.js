// const express = require("express");

// const app = express();
// const port = 8080;

// const router = express.Router();

// // Route for "/"
// router.get("/", (req, res) => {
//   console.log("Hello??");
// //   return res.status(200).send("Welcome in my world");
//     return res.status(200).json({
//         staus:"sucess",
//         data:{
//             message:"hello",
//         }
//     })
// });

// // Route for "/wel"
// router.get("/wel", (req, res) => {
//   console.log("Hello??");
//   return res.status(200).send("Welcome to the /wel route");
// });

// // Route for "/wel"
// router.get("/blogs", (req, res) => {
//     console.log("Hello??");
//     // return res.status(200).send("Welcome to the /wel route");
//     return res.status(200).json({
//         status:"success",
//         data:[{name:"1",message:"ok"},{name:"2",message:"done"},]
//     })
//   });


// app.use(router);

// // Middleware for handling all other routes
// app.use("*", (req, res) => {
//   console.log("Route not found");
//   return res.status(404).send("Route does not exist!!!!");
// });

// app.listen(port, () => {
//   console.log("Server is running on port", port);
// });




const express = require("express");

const app = express();
const port = 8080;

app.use(express.json()); // To parse JSON request bodies

let students = []; // In-memory array to simulate a database

// Helper function to apply pagination and sorting
const applyPaginationAndSorting = (req, data) => {
    let { page = 1, limit = 10, sortBy = "name", order = "asc" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // Sorting
    data.sort((a, b) => {
        if (order === "asc") {
            return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
        }
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedData = data.slice(startIndex, startIndex + limit);

    return {
        total: data.length,
        page,
        limit,
        data: paginatedData
    };
};

// GET - Fetch all students with pagination and sorting
app.get("/students", (req, res) => {
    const result = applyPaginationAndSorting(req, students);
    res.status(200).json(result);
});

// POST - Add a new student
app.post("/students", (req, res) => {
    const { name, className, percentage, school, board, rating } = req.body;
    
    if (!name || !className || !percentage || !school || !board || !rating) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newStudent = { 
        id: students.length + 1,
        name, 
        className, 
        percentage, 
        school, 
        board, 
        rating 
    };

    students.push(newStudent);
    res.status(201).json({ message: "Student added successfully", student: newStudent });
});

// PUT - Update a student by ID (replace)
app.put("/students/:id", (req, res) => {
    const { id } = req.params;
    const { name, className, percentage, school, board, rating } = req.body;

    const studentIndex = students.findIndex(student => student.id == id);
    if (studentIndex === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    students[studentIndex] = { id: parseInt(id), name, className, percentage, school, board, rating };
    res.status(200).json({ message: "Student updated successfully", student: students[studentIndex] });
});

// PATCH - Partially update a student by ID
app.patch("/students/:id", (req, res) => {
    const { id } = req.params;
    const { name, className, percentage, school, board, rating } = req.body;

    const student = students.find(student => student.id == id);
    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }

    if (name !== undefined) student.name = name;
    if (className !== undefined) student.className = className;
    if (percentage !== undefined) student.percentage = percentage;
    if (school !== undefined) student.school = school;
    if (board !== undefined) student.board = board;
    if (rating !== undefined) student.rating = rating;

    res.status(200).json({ message: "Student updated successfully", student });
});

// DELETE - Remove a student by ID
app.delete("/students/:id", (req, res) => {
    const { id } = req.params;
    const studentIndex = students.findIndex(student => student.id == id);
    if (studentIndex === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    students.splice(studentIndex, 1);
    res.status(200).json({ message: "Student deleted successfully" });
});

// Middleware for handling all other routes
app.use("*", (req, res) => {
  return res.status(404).send("Route does not exist!!!!");
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
