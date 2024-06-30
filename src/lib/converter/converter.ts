/*
Esempio di formato.
### AWS allows users to manage their resources using a web based user interface. What is the name of this interface?

- [ ] AWS CLI.
- [ ] AWS API.
- [ ] AWS SDK.
- [x] AWS Management Console.

**[⬆ Back to Top](#table-of-contents)**

*/

import fs from "fs";
import path from "node:path";



export const fileInput = 'myData/fromGitRepo/data.txt';
export const folderOutput = 'myData/dataJson';

export const transformDataGitRepo =
  async (inputFile = fileInput, outputFolder = folderOutput) => {


  // Ensure the output folder exists
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  //Read file
  let fullText = fs.readFileSync(fileInput, 'utf-8');
  let splitAllToRow = fullText.split("\r\n")
  let allQ: LocalQuestion[] = []

  let currentQ: LocalQuestion = {optionCounter: 0, options: [], ansuwers: []}

  for (const row of splitAllToRow) {
    if(row === "" || row.startsWith('**')) continue;
    if(row.startsWith('###')){
      let question = row.split('### ')[1]
      //è arrivata una nuova question salvo la precedente
      if(currentQ.question != undefined) {
        allQ.push(currentQ)
        currentQ = {optionCounter: 0, options: [], ansuwers: []}
      }

      currentQ.question = question
    }
    else {
      if(row.startsWith('- [ ]')){
        // opzione errata
        let option = row.split('- [ ] ')[1]
        currentQ.options?.push([currentQ.optionCounter, option])
        currentQ.optionCounter++
      }
        else {
        let option = row.split('- [x] ')[1]
        currentQ.options?.push([currentQ.optionCounter, option])
        currentQ.ansuwers?.push(currentQ.optionCounter)
        currentQ.optionCounter++
      }
    }
  }
  allQ.push(currentQ)

  let outputFilePath = path.join(outputFolder, `data.json`);

    try {
      fs.writeFileSync(outputFilePath, JSON.stringify(allQ, null, 2));
      console.log(`Successfully wrote to ${outputFilePath}`);
    } catch (error) {
      console.error(`Error processing file ${outputFilePath}:`, error);
    }
}

