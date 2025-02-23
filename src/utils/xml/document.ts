import jsdom from 'jsdom';
import { extractStyleValueAttributeFromStyleContainerElement } from './common';

export function parseDocumentXmlStringToWordRunCollection(
    documentXmlString = "",
): HTMLCollectionOf<Element> {
    if (!documentXmlString) {
        throw new Error(`Need to provide the non-empty documentXmlString to continue the process in the 
            function parseDocumentXmlStringToWordRunCollection.`);
    }

    const { 
        window: {
            document
        } = {}
     } = new jsdom.JSDOM(documentXmlString, { contentType: "text/xml"});

     if (!document) {
        throw new Error(`The parsed jsdom document is undefined and cannot do further traversal in the 
            function parseDocumentXmlStringToWordRunCollection.`);
    }

    const tagNameWordRun = 'w:r';
    const wordRunCollection: HTMLCollectionOf<Element> =  document.getElementsByTagName(tagNameWordRun);
    if (!wordRunCollection.length) {
        throw new Error(`Found no element tagged with the tag name ${tagNameWordRun} in the 
            function parseDocumentXmlStringToWordRunCollection so we cannot proceed with the wordRuns.`);
    }

    return wordRunCollection;
}

function transformWordText (wordText: string): string {
    const transforms = [
        {
            regx: /(\w+)\s-\s(\w+)/g,
            replaceWith: '$1-$2'
        },
        {
            regx: /([,;.!:~?])+/g,
            replaceWith: ''
        }
    ];

    const transformedWordText = transforms.reduce((accumulatedWordText, { regx, replaceWith }) => {
        return accumulatedWordText.replace(regx, replaceWith);
    }, wordText);

    return transformedWordText;
}

export function parseWordRunNodeCollectionToWordNodes(
    wordRunCollection: HTMLCollectionOf<Element>,
  ): {
    text: string;
    styleBold: string;
    styleUnderline: string;
    styleTextSize: string;
  }[] {
    if (!wordRunCollection.length) {
        throw new Error(`0 wordRuns, so we cannot proceed further; we need a wordRunCollection  
            that is not empty in the function parseWordRunNodeCollectionToWordNodes so we can proceed further.`);
    }

    const newEmptyWordNode = {
        text: '',
        styleBold: '',
        styleUnderline: '',
        styleTextSize: '',
    };
    const wordNodes = [{ ...newEmptyWordNode }];
    let wordCount = 0;
    let emptyCount = 0;

    for (const wordRunElement of wordRunCollection) {
        // A. text
        const wordText = wordRunElement.getElementsByTagName("w:t")[0];
        if (!wordText) {
            continue;
        }
        if (wordText && wordText.innerHTML.trim() === '') {
            emptyCount += 1;
            continue;
        }

        // B. styles
        const rPrElement = wordRunElement.getElementsByTagName("w:rPr")[0];
        let wordRunStyleObject = {
            wordRunStyleBold: '',
            wordRunStyleUnderline: '',
            wordRunStyleTextSize: ''
        };
        if (rPrElement) {
            const wordRunStyleBold = extractStyleValueAttributeFromStyleContainerElement(rPrElement, 'w:b');
            const wordRunStyleUnderline = extractStyleValueAttributeFromStyleContainerElement(rPrElement, 'w:u');
            const wordRunStyleTextSize = extractStyleValueAttributeFromStyleContainerElement(rPrElement, 'w:sz');
            wordRunStyleObject = {
                wordRunStyleBold,
                wordRunStyleUnderline,
                wordRunStyleTextSize
            };
        }
        
        const transformedWordText = transformWordText(wordText.innerHTML);
        transformedWordText.split(' ').forEach((spaceSplitedStr, index) => {
            if (!spaceSplitedStr) {
                emptyCount += 1;
            } else if (spaceSplitedStr) {                
                if (!emptyCount && index > 0) {
                    wordCount++;
                    wordNodes[wordCount] = { ...newEmptyWordNode };
                } else if (emptyCount) {
                    emptyCount = 0;
                    wordCount++;
                    wordNodes[wordCount] = { ...newEmptyWordNode };
                }

                // Step 1. Handle the word node styles.
                (function (wordNode, wordRunStyleObject) {
                    const {
                        styleTextSize: wordNodeStyleTextSize
                    } = wordNode;

                    const {
                        wordRunStyleBold,
                        wordRunStyleUnderline,
                        wordRunStyleTextSize
                    } = wordRunStyleObject;

                    if (wordRunStyleBold === '1') wordNode.styleBold = wordRunStyleBold;
                    if (wordRunStyleUnderline) wordNode.styleUnderline = wordRunStyleUnderline;
                    if (!wordNodeStyleTextSize && wordRunStyleTextSize) wordNode.styleTextSize = wordRunStyleTextSize;
                })(wordNodes[wordCount], wordRunStyleObject);

                // Step 2. Handle the word node text.
                wordNodes[wordCount].text += spaceSplitedStr;
            }
        });
    }

     if (!wordNodes.length) {
        throw new Error(`The parsed wordNodes array is incorrect, 
            since we need at least 1 wordRunNode to get here, 
            so the processed wordNodes.length is impossible to be 0 
            at just before return from the function parseWordRunNodeCollectionToWordNodes`);
     }

     return wordNodes;
}

