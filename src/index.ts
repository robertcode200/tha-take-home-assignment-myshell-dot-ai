import { readXmlStringFromDocxFile } from './utils/docx';

async function main () {
    const documentXmlString = await readXmlStringFromDocxFile('test-case-1-bold-underlined-text_size_28.docx','word/document.xml');
    console.log(documentXmlString);
}

console.log('Hello MyShell.AI');
main();


