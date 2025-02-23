import { getDocumentAndStylesXmlStringsObject } from './utils/docx';
import { parseStylesXmlStringToDefaultStyleObject } from './utils/xml/styles';
import { parseDocumentXmlStringToWordRunCollection, parseWordRunNodeCollectionToWordNodes } from './utils/xml/document';
import { typeWordNode, typeDefaultStyleObject, typeResultCheckObject } from './types';

function conductChecks(
    wordNodes: typeWordNode[],
    defaultStyleObject: typeDefaultStyleObject,
): typeResultCheckObject {
    const [firstWordNode, secondWordNode, thirdWordNode] = wordNodes;

    let isFirstWordBold: boolean = false;
    if (firstWordNode.styleBold || defaultStyleObject.styleBold === '1') {
        isFirstWordBold = true;
    }

    // ------------------------------------------------------------------------------------------

    let isSecondWordUnderlined: boolean = false;
    if (secondWordNode.styleUnderline || defaultStyleObject.styleUnderline) {
        isSecondWordUnderlined = true;
    }

    // ------------------------------------------------------------------------------------------

    const thirdWordTextSize: string = thirdWordNode.styleTextSize || defaultStyleObject.styleTextSize;

    // ------------------------------------------------------------------------------------------

    const resultCheckObject = { isFirstWordBold, isSecondWordUnderlined, thirdWordTextSize };
    return resultCheckObject;
}

export async function runFeatureProcess(
    docxFilePath: string,
): Promise<typeResultCheckObject> {
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

    const resultCheckObject = conductChecks(wordNodes, defaultStyleObject);
    return resultCheckObject;
}
