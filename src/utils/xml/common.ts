export function extractStyleValueAttributeFromStyleContainerElement (
    styleContainerElement: Element,
    styleTagName: string
): string {
    if (!styleTagName) {
        throw new Error(`Need to provide the non-empty styleTagName to continue the process in the 
            function extractStyleValueAttributeFromStyleContainerElement.`);
    }

    const styleElementCollection: HTMLCollectionOf<Element> = styleContainerElement.getElementsByTagName(styleTagName);

    return (styleElementCollection[0] && styleElementCollection[0].getAttribute('w:val')) || '';
}
