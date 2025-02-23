import { runFeatureProcess } from './feature';

async function main () {
    const defaultDocxFilePath = 'test-case-1-bold-underlined-text_size_28.docx';

    const {
        isFirstWordBold,
        isSecondWordUnderlined,
        thirdWordTextSize,
    } = await runFeatureProcess(defaultDocxFilePath);
    
    console.log(`The first word ${isFirstWordBold ? 'is' : 'is not'} bold.`);
    console.log(`The second word ${isSecondWordUnderlined ? 'is' : 'is not'} underlined.`);
    console.log(`The third word's text size is ${thirdWordTextSize}.`);
}

main();
