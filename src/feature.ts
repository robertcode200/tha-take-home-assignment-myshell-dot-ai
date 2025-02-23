import { getDocumentAndStylesXmlStringsObject } from './utils/docx';

export async function runFeatureProcess (docxFilePath: string) {
    if (!docxFilePath) {
        throw new Error(`Need to provide the non-empty docxFilePath to continue the process in the function runFeatureProcess.`);
    }

    const {
        documentXmlString,
        stylesXmlString,
    } = await getDocumentAndStylesXmlStringsObject(docxFilePath);
    // console.log(documentXmlString);
    // console.log(stylesXmlString);
}
