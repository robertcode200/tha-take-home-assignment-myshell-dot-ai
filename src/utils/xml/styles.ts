import jsdom from 'jsdom';
import { extractStyleValueAttributeFromStyleContainerElement } from './common';

export function parseStylesXmlStringToDefaultStyleObject (stylesXmlString: string)
    : ({
        styleBold: string;
        styleUnderline: string;
        styleTextSize: string;
    })
{
    if (!stylesXmlString) {
        throw new Error(`Need to provide the non-empty stylesXmlString to continue the process in the 
            function parseStylesXmlStringToDefaultStyleObject.`);
    }

    const {
        window: {
            document
        } = {}
     } = new jsdom.JSDOM(stylesXmlString, { contentType: "text/xml"});

    if (!document) {
        throw new Error(`The parsed jsdom document is undefined and cannot do further traversal in the
            function parseStylesXmlStringToDefaultStyleObject.`);
    }
    
    const tagNameDefaultRunProperties = 'w:rPrDefault';
    const rPrDefaultCollection: HTMLCollectionOf<Element> =  document.getElementsByTagName(tagNameDefaultRunProperties);
    if (!rPrDefaultCollection.length) {
        throw new Error(`Found no element tagged with the tag name ${tagNameDefaultRunProperties} in the 
            function parseStylesXmlStringToDefaultStyleObject so we cannot proceed with the styles.`);
    }
    const rPrDefault: Element =  rPrDefaultCollection[0];

    return {
        // why style- => <w:lang w:val="en"/>
        styleBold: extractStyleValueAttributeFromStyleContainerElement(rPrDefault, 'w:b'),
        styleUnderline: extractStyleValueAttributeFromStyleContainerElement(rPrDefault, 'w:u'),
        styleTextSize: extractStyleValueAttributeFromStyleContainerElement(rPrDefault, 'w:sz'),
    };
}