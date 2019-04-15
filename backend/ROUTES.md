**Routes available on the Backend:**

* *GET* localhost:3001/file
  * Presents a little interface to import a File;
* *POST* localhost:3001/file/import
  * Import the File;
* *GET* localhost:3001/file/all
  * Get all documents of Files from MongoDB ;
* *GET* localhost:3001/file/csv/:name
  * Get CSV file from a certain RAW file. :name = name of the file;
  * **Ex:** localhost:3001/file/csv/02_b2018_pos
* *DELETE* localhost:3001/file/delete/:id
  * Delete a File from the system. :id = Object ID of the file on MongoDB;
  * **Ex:** localhost:3001/file/delete/5cb3c8e5f4c83116500372e6
* *GET* :id
  * Get the info from a certain file from MongoDB. :id = Object ID of the file on MongoDB;
  * **Ex:** localhost:3001/file/info?file=5cb3c8e5f4c83116500372e6
* *GET* localhost:3001/file/graph/sumIntensity?file=:id
  * Get the info for presenting the graphic of Intensity Per Scan. :id = Object ID of the file on MongoDB;
  * **Ex:** localhost:3001/file/graph/sumIntensity?file=5cb3c8e5f4c83116500372e6
* *GET* localhost:3001/file/graph/sumMass?file=:id
