import jsdom from 'jsdom';

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
