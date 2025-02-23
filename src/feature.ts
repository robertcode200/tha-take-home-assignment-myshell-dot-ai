import { getDocumentAndStylesXmlStringsObject } from './utils/docx';
import { parseStylesXmlStringToDefaultStyleObject } from './utils/xml/styles';
import { parseDocumentXmlStringToWordRunCollection, parseWordRunNodeCollectionToWordNodes } from './utils/xml/document';

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

    const defaultStyleObject = parseStylesXmlStringToDefaultStyleObject(stylesXmlString);
    // console.log(defaultStyleObject);

    const wordRunCollection = parseDocumentXmlStringToWordRunCollection(documentXmlString);
    // console.log(wordRunCollection.length);
    const wordNodes = parseWordRunNodeCollectionToWordNodes(wordRunCollection);
    // console.log(wordNodes);
}
