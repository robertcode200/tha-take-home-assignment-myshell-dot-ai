import fs from 'fs/promises';
import jszip from 'jszip';

export async function readXmlStringFromDocxFile (docxFilePath: string, xmlFilePath: string) {
    const functionName = 'readXmlStringFromDocxFile';
    if (!docxFilePath || !xmlFilePath) {
        throw new Error(`Need to provide the non-empty path to continue the process in the function ${functionName}.`);
    }

    let xmlString = '';
    try {
        const docxFileData = await fs.readFile(docxFilePath);
        const docxFileZip = await jszip.loadAsync(docxFileData);
        const jSZipObject = await docxFileZip.file(xmlFilePath);
        if (!jSZipObject) {
            throw new Error('await docxFileZip.file(xmlFilePath) returns null.');
        }
        xmlString = await jSZipObject.async('string');
    } catch (e) {
        console.error('function', functionName, e);
        process.exit(1);
    }
    
    if (!xmlString) {
        throw new Error(`The read/processed xmlString is empty in the function ${functionName} just before return.`);
    }

    return xmlString;
}
