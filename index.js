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

// Static student data (30 records)
let students = [
    { id: 1, name: "John Doe", className: "10", percentage: 85, school: "ABC School", board: "CBSE", rating: 4.5 },
    { id: 2, name: "Jane Smith", className: "12", percentage: 92, school: "XYZ School", board: "CBSE", rating: 4.7 },
    { id: 3, name: "Alice Johnson", className: "11", percentage: 78, school: "DEF School", board: "UP", rating: 3.8 },
    { id: 4, name: "Bob Brown", className: "9", percentage: 88, school: "GHI School", board: "CBSE", rating: 4.1 },
    { id: 5, name: "Charlie White", className: "10", percentage: 67, school: "ABC School", board: "UP", rating: 2.9 },
    { id: 6, name: "David Lee", className: "11", percentage: 81, school: "XYZ School", board: "CBSE", rating: 4.3 },
    { id: 7, name: "Ella Green", className: "12", percentage: 94, school: "DEF School", board: "UP", rating: 4.8 },
    { id: 8, name: "Frank King", className: "10", percentage: 70, school: "GHI School", board: "UP", rating: 3.0 },
    { id: 9, name: "Grace Young", className: "9", percentage: 86, school: "ABC School", board: "CBSE", rating: 4.2 },
    { id: 10, name: "Henry Allen", className: "11", percentage: 79, school: "XYZ School", board: "UP", rating: 3.9 },
    { id: 11, name: "Ivy Clark", className: "12", percentage: 90, school: "DEF School", board: "CBSE", rating: 4.6 },
    { id: 12, name: "Jack Harris", className: "10", percentage: 66, school: "GHI School", board: "UP", rating: 2.7 },
    { id: 13, name: "Kelly Moore", className: "11", percentage: 82, school: "ABC School", board: "CBSE", rating: 4.4 },
    { id: 14, name: "Leo Martin", className: "9", percentage: 88, school: "XYZ School", board: "CBSE", rating: 4.5 },
    { id: 15, name: "Mona Perez", className: "12", percentage: 73, school: "DEF School", board: "UP", rating: 3.5 },
    { id: 16, name: "Nina Turner", className: "10", percentage: 92, school: "GHI School", board: "CBSE", rating: 4.7 },
    { id: 17, name: "Oscar Sanchez", className: "11", percentage: 80, school: "ABC School", board: "CBSE", rating: 4.0 },
    { id: 18, name: "Paula Wilson", className: "9", percentage: 84, school: "XYZ School", board: "UP", rating: 4.1 },
    { id: 19, name: "Quincy Scott", className: "12", percentage: 68, school: "DEF School", board: "UP", rating: 2.9 },
    { id: 20, name: "Rachel Adams", className: "10", percentage: 91, school: "GHI School", board: "CBSE", rating: 4.6 },
    { id: 21, name: "Sam Evans", className: "11", percentage: 77, school: "ABC School", board: "UP", rating: 3.7 },
    { id: 22, name: "Tina Hall", className: "12", percentage: 89, school: "XYZ School", board: "CBSE", rating: 4.4 },
    { id: 23, name: "Uma Patel", className: "9", percentage: 65, school: "DEF School", board: "UP", rating: 2.6 },
    { id: 24, name: "Vince Brown", className: "10", percentage: 85, school: "GHI School", board: "CBSE", rating: 4.3 },
    { id: 25, name: "Wendy Cooper", className: "11", percentage: 93, school: "ABC School", board: "CBSE", rating: 4.9 },
    { id: 26, name: "Xander Lewis", className: "12", percentage: 72, school: "XYZ School", board: "UP", rating: 3.4 },
    { id: 27, name: "Yara Mitchell", className: "9", percentage: 79, school: "DEF School", board: "CBSE", rating: 3.9 },
    { id: 28, name: "Zack Parker", className: "10", percentage: 87, school: "GHI School", board: "CBSE", rating: 4.5 },
    { id: 29, name: "Anna Bell", className: "11", percentage: 64, school: "ABC School", board: "UP", rating: 2.5 },
    { id: 30, name: "Barry King", className: "12", percentage: 81, school: "XYZ School", board: "CBSE", rating: 4.1 }
];

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
