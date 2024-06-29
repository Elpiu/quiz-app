import * as fs from 'fs';
import * as path from 'path';

type AnswerPlus = Answer & { id: number }

export const folderInput = 'myData/dataText';
export const folderOutput = 'myData/dataJson';

export const transformData = async (inputFolder: string = folderInput, outputFolder: string = folderOutput) => {
  try {
    const customFolderPath = path.join(process.cwd(), folderInput);
    let filesInput = fs.readdirSync(customFolderPath);

    // Ensure the output folder exists
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }
    let counter: number = 0;
    for (const file of filesInput) {
      const filePath = path.join(inputFolder, file);
      if (fs.statSync(filePath).isFile()) {
        try {

          const counterId = trovaNumero(path.parse(file).name);
          let chapter = {
            id: counterId,
            chapterName: path.parse(file).name,
            questions: await parseQuestions(filePath)

          } as Chapter
          const outputFilePath = path.join(outputFolder, path.parse(file).name + '.json');
          fs.writeFileSync(outputFilePath, JSON.stringify(chapter, null, 2));
          console.log(`Successfully wrote to ${outputFilePath}`);
        } catch (error) {
          console.error(`Error processing file ${filePath}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error reading input folder:', error);
  }
}
export const parseQuestions = async (filePath: string): Promise<Question[]> => {


  // Read the file synchronously
  let fullText = fs.readFileSync(filePath, 'utf-8');
  let [allQ, allA] = fullText.split('---')


  let questions: Question[] = onlyQuestionRetriver(allQ);
  let answers: AnswerPlus[] = onlyAnswerRetriver(allA);

  if (questions.length != answers.length) {
    throw new Error("Domande e Risposte non hanno la stessa dimensione!!?")
  }

  // Itera attraverso le domande e assegna le risposte
  // Posso farlo perchè spero siano in ordine; quindi question 1 e answer 1
  for (let i = 0; i < questions.length && i < answers.length; i++) {
    questions[i].answer = answers[i]
  }

  return questions;
};

function onlyAnswerRetriver(allTextAnswer: string): AnswerPlus[] {
  let answers: AnswerPlus[] = []

  let textAnswerList = allTextAnswer.split("\r\n").splice(1)
  textAnswerList.forEach(row => {
    let firstDot!: number;
    let secondDot!: number;

    for (let i = 0; i < row.length; i++) {
      if (row[i] === '.') {
        if (!firstDot) {
          firstDot = i;
        } else {
          secondDot = i;
          break;
        }
      }
    }
    // Assegna il numero della domanda (escludendo il punto)
    let numero_domanda = parseInt(row.substring(0, firstDot), 10);

    // Assegna l'opzione di risposta (escludendo il punto e lo spazio)
    let opzione_risposta = row.substring(firstDot + 2, secondDot).trim();

    // Assegna la risposta (dalla fine della seconda opzione)
    let risposta = row.substring(secondDot + 2).trim();

    answers.push({
      id: numero_domanda,
      id_options: opzione_risposta.split(','),
      explanation: risposta
    })
  })

  return answers
}

function onlyQuestionRetriver(allTextQuestion: string): Question[] {
  const questions: Question[] = [];
  let splitAllToRow = allTextQuestion.split("\r\n")
  splitAllToRow = splitAllToRow.splice(0, splitAllToRow.length - 1)
  let counter = 1

  let question: Question | undefined;
  for (const row of splitAllToRow) {
    if (counter == 1 && (row.startsWith("E.") || row.startsWith("F."))) {
      question?.options.push({
        id_option: row.substring(0, row.indexOf('.')),
        option: row.substring(row.indexOf('.') + 1).trim()
      })
      counter--
    } else if (counter == 1) {
      question = {
        id_question: parseInt(row.substring(0, row.indexOf('.'))),
        question: row.substring(row.indexOf('.') + 1).trim(),
        options: [],
      }
      questions.push(question)
    } else {
      question?.options.push({
        id_option: row.substring(0, row.indexOf('.')),
        option: row.substring(row.indexOf('.') + 1).trim()
      })
    }
    counter = ++counter % 5
  }

  return questions;
}

function trovaNumero(stringa: string): number {
  // Definiamo un'espressione regolare per trovare un numero intero nella stringa
  const regex = /\d+/;
  const numeroTrovato = stringa.match(regex);

  if (numeroTrovato) {
    // Convertiamo il numero trovato da stringa a numero intero
    return parseInt(numeroTrovato[0], 10);
  } else {
    // Se non viene trovato nessun numero, restituiamo 0
    return 0;
  }
}