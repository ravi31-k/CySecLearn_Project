const express = require("express");
const cors = require("cors");
const fs = require("fs");
const fse = require("fs-extra");
const { spawn } = require("child_process");
const bodyParser = require("body-parser");
// const zaproxy = require('zaproxy');
require("./db/connection.js");
const authRouter = require("./routers/auth.js");
const messageRouter = require("./routers/messages.js");
const userRouter = require("./routers/users.js");
const blogRouter = require("./routers/blogs.js");
const app = express();

const puppeteer = require("puppeteer");

// const express = require('express');
// const bodyParser = require('body-parser');

// Express 4.0
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));

// app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.static(__dirname + "/uploads"));
app.use("/auth", authRouter);
app.use("/messages", messageRouter);
app.use("/users", userRouter);
app.use("/blogs", blogRouter);

app.post("/getCodeAndSolutions", (req, res) => {
  const jsonReport = req.body; // Assuming jsonReport is already parsed

  // Define the conditions for extraction
  const conditions = [
    { pluginid: "10038" }, // Example condition: extract alerts with pluginid 10038
    // Add more conditions as needed
  ];

  // Extract alerts based on the conditions
  const extractedData = jsonReport[0].alerts.filter((alert) => {
    return conditions.some((condition) => {
      return Object.keys(condition).every(
        (key) => alert[key] === condition[key]
      );
    });
  });

  // Create a structured string from extractedData
  const reportString = extractedData
    .map((alert) => {
      return `Alert Name: ${alert.name}, Evidence: ${alert.instances
        .map((instance) => instance.evidence)
        .join(", ")}, Solution: ${alert.solution}\n`;
    })
    .join("");

  // Create a Buffer from the string
  const buffer = Buffer.from(reportString, "utf-8");

  // Set headers to specify the file type and name
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Disposition", "attachment; filename=report.txt");

  // Send the buffer as the response
  res.send(buffer);
});

app.post("/generate-pdf", async (req, res) => {
  console.log("Hellllo" + req);
  const htmlContent = req.body.htmlReport; // Assuming you're sending the HTML content from the client
  console.log(htmlContent);
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(htmlContent);

  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=download.pdf");
  res.send(pdfBuffer);
});

app.post("/scan", async (req, res) => {
  const { url } = req.body;

  console.log(url);

  try {
    const pythonProcess = spawn("python", ["zapScan.py", url]);
    let resultData = "";
    pythonProcess.stdout.on("data", (data) => {
      // console.log(data.toString());
      const result = data.toString();

      resultData += result;

      console.log("the received data is:- ");
      console.log(resultData);
      console.log("the above data is the received data");
    });

    pythonProcess.stdout.on("end", () => {
      // Send the HTML data as response
      const jsonResult = JSON.parse(resultData);
      res.json(jsonResult);
      // console.log(resultData);
      // console.log("the received data on end is:- ");
      // console.log(resultData);
      // console.log("the above data is the received data");
      // res.send(resultData);
    });

    pythonProcess.on("close", (code) => {
      console.log(`Python script exited with code ${code}`);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// app.post('/scan', async (req, res) => {
//   const { url } = req.body;

//   console.log(url);

//   try {

//     const pythonProcess = spawn('python', ['zapScan.py', url]);
//     let resultData = '';
//     pythonProcess.stdout.on('data', (data) => {
//       console.log(data.toString());
//       const result = data.toString();

//       resultData = result;
//     });

//     pythonProcess.stdout.on('end', () => {
//       try {
//         // Attempt to parse the accumulated data as JSON
//         const jsonData = JSON.parse(resultData);
//         res.json(jsonData);
//       } catch (error) {
//         console.error('Error parsing JSON:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//     });

//     pythonProcess.on('close', (code) => {
//       console.log(`Python script exited with code ${code}`);
//       // You can send a response to the client here if needed
//       // res.json({ message: 'Scan completed' });
//       // res.json(resultData);

//       // res.send(data);
//     });

//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send(error);
//   }
// });

app.post("/xyz", async (req, res) => {
  console.log("hello");
  const { runstr } = req.body;
  // const userid=req.user._id;/
  // const founduser = await User.findById(userid);
  try {
    var dataToSend;
    var args = ["main.py"];
    var arr = runstr.split(" ");
    var arg = args.concat(arr);
    let namefile = "userid" + "-" + Date.now().toString();

    const obj = {};
    obj["searchQuery"] = runstr;
    // console.log(args);
    // res.send("hello");
    // ['main.py','bnr', 'lgr', 'saga', 'l1', '3']
    const python = spawn("python", arg);
    // console.log(arg)
    python.stdout.on("data", function (data) {
      console.log("Pipe data from python script ...");
      dataToSend = data.toString();
    });
    python.on("close", async (code) => {
      var arr1 = dataToSend ? dataToSend.split(" ") : [];

      console.log(`child process close all stdio with code ${code}`);
      let src1 = "test_clf_rep.png";
      let dest1 = `uploads/${namefile}_test_clf_rep.png`;
      fse.move(src1, dest1, (err) => {
        if (err) return console.log(err);
        console.log(`File successfully moved!!`);
      });
      let src2 = "test_conf_mat.png";
      let dest2 = `uploads/${namefile}_test_conf_mat.png`;
      fse.move(src2, dest2, (err) => {
        if (err) return console.log(err);
        console.log(`File successfully moved!!`);
      });
      let src3 = "training_clf_rep.png";
      let dest3 = `uploads/${namefile}_training_clf_rep.png`;
      fse.move(src3, dest3, (err) => {
        if (err) return console.log(err);
        console.log(`File successfully moved!!`);
      });
      let src4 = "training_conf_mat.png";
      let dest4 = `uploads/${namefile}_training_conf_mat.png`;
      fse.move(src4, dest4, (err) => {
        if (err) return console.log(err);
        console.log(`File successfully moved!!`);
      });
      obj["trainingAcc"] = arr1[0];
      obj["testAcc"] = arr1[1];
      obj[
        "fileTestConfMat"
      ] = `http://localhost:8000/${namefile}_test_conf_mat.png`;
      obj[
        "fileTestClfRep"
      ] = `http://localhost:8000/${namefile}_test_clf_rep.png`;
      obj[
        "fileTrainConfMat"
      ] = `http://localhost:8000/${namefile}_training_conf_mat.png`;
      obj[
        "fileTrainClfRep"
      ] = `http://localhost:8000/${namefile}_training_clf_rep.png`;
      // founduser.searchHistory.push(obj);
      // await founduser.save();
      res.send(obj);
    });
  } catch (error) {
    res.status(500).json({ message: "No args posted" });
    console.log(error);
  }
});
app.get("/", (req, res) => {
  res.send("Malware bits is running!");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

module.exports = app;
