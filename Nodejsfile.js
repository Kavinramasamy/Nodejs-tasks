//1)Write API endpoint which will create a text file in a particular folder

import express from "express";
import { writeFile } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import path from "path";

//Current dir path....

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//Endpoint to create a text files in a folder...

app.get("/create-file", (req, res) => {
    const date = new Date();

    //Creating File name using Date()...

    const date_time =
        date.toLocaleDateString().split(/[-:/]/).join("-") +
        "-" +
        date.toLocaleTimeString().split(/[-:/]/).join("-");

    const fileName = `${date_time}.txt`;

    // ("/NewFolder" = Rename the folder where you want to create the file ....

    const folderPath = __dirname + "/NewFolder";
    const filePath = join(folderPath, fileName);
    const fileContent = new Date().toString();

    //writing the file....

    writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error creating file");
        }
        res.send("File created successfully");
    });
});

// Starting the server...

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

//2)Write API endpoint to retrive all the text files in that particular folder

import express from "express";
import { readdir } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//Current dir path....

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Endpoint to retrieve all text files in a folder...
app.get("/getAllTextFiles", (req, res) => {
    const folderPath = join(__dirname, "NewFolder");

    readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving files");
        }

        const textFiles = files.filter((file) => {
            return extname(file) === ".txt";
        });

        res.json(textFiles);
    });
});

// Starting the server...
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
