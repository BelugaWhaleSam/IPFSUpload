import { getFilesFromPath, Web3Storage } from "web3.storage";
import fs from "fs";
import dotenv from 'dotenv'
dotenv.config()

/* ******************************************************************************** Token ************************************************************************************ */

const apiToken = process.env.API_KEY;

/* ******************************************************************************** Image ************************************************************************************ */

/* Funciton gateway URL for image */
function makeGatewayURLImage(imgCID, imgName) {
  return `https://${imgCID}.ipfs.w3s.link/${imgName}`;
}

/* Construct with token and endpoint */
const client = new Web3Storage({ token: apiToken });

/* Get file from path for image */
const img = await getFilesFromPath("./img.jpg");
/* Get image name from path */
const imgName = img[0].name;

/* get imgCID from web3.storage */
const imgCID = await client.put(img, { name: "imgName" });
console.log("imgCID: ", imgCID);
/* Make gateway URL for image */
const imgURL = makeGatewayURLImage(imgCID, imgName);
console.log("imgURL: ", imgURL);

/* ****************************************************************************** Metadata JSON ****************************************************************************** */

/* Function for gateway URL for json */
function makeGatewayURLJSON(jsonCID, jsonName) {
  return `https://${jsonCID}.ipfs.w3s.link/${jsonName}`;
}

/* metadata for json */
const metadata = {
  name: "TestJSON",
  description: "Uploading json with imgURL embedded",
  image: imgURL,
  attributes: [
    { trait_type: "Participant", value: "Amy" },
    { trait_type: "Event Name", value: "TestEvent" },
    { trait_type: "Date", value: "27-12-2022" },
  ],
};

/* conversion to json file using fs*/
fs.writeFileSync("metadata.json", JSON.stringify(metadata));

/* Get file from path for json */
const json = await getFilesFromPath("./metadata.json");
/* Get json name from path */
const jsonName = json[0].name;

/* get jsonCID from web3.storage */
const jsonCID = await client.put(json);
console.log("jsonCID: ", jsonCID);
/* Make gateway URL for json */
const jsonURL = makeGatewayURLJSON(jsonCID, jsonName);
console.log('jsonURL: ',jsonURL);
