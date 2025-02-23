import fs from 'fs/promises';
import jszip from 'jszip';

async function readXmlStringFromDocxFile (docxFilePath: string, xmlFilePath: string): Promise<string> {    
    if (!docxFilePath || !xmlFilePath) {
        throw new Error(`Need to provide the non-empty path to continue the process in the function readXmlStringFromDocxFile.`);
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
        console.error('function', 'readXmlStringFromDocxFile', e);
        process.exit(1);
    }
    
    if (!xmlString) {
        throw new Error(`The read/processed xmlString is empty in the function readXmlStringFromDocxFile just before return.`);
    }

    return xmlString;
}

export async function getDocumentAndStylesXmlStringsObject(
    docxFilePath: string,
): Promise<{ documentXmlString: string; stylesXmlString: string }> {
    if (!docxFilePath) {
        throw new Error(`Need to provide the non-empty docxFilePath to continue the process in the function getDocumentAndStylesXmlStringsObject.`);
    }

    const documentXmlFilePath = 'word/document.xml';
    const stylesXmlFilePath = 'word/styles.xml';

    const documentXmlString = await readXmlStringFromDocxFile(docxFilePath, documentXmlFilePath);
    const stylesXmlString = await readXmlStringFromDocxFile(docxFilePath, stylesXmlFilePath);

    return {
        documentXmlString,
        stylesXmlString,
    };
}
