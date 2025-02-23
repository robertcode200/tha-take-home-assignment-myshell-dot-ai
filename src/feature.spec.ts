import { runFeatureProcess } from './feature';
import { typeResultCheckObject } from './types';

// 1. Happy Path, Ture
test(`the test case 1. 
    - bold-underlined-text_size_28.docx 
    - should be processed to 
    - { isFirstWordBold: true, isSecondWordUnderlined: true, and thirdWordTextSize: '28' }`, async () => {

    // Step 1. Arrange
    // the 1st word is bold
    // the 2nd word is underlined
    // the 3rd word's text size is 28
    const docxFilePath = 'test-case-1-bold-underlined-text_size_28.docx';
    let expected: typeResultCheckObject = {
        isFirstWordBold: true,
        isSecondWordUnderlined: true,
        thirdWordTextSize: '28',
    };

    // Step 2. Act
    const actual = await runFeatureProcess(docxFilePath);

    // Step 3. Assert
    expect(actual).toEqual(expected);
});

// 2. Happy Path, False
test(`the test case 2. 
    - not_bold-not_underlined-text_size_21
    - should be processed to 
    - { isFirstWordBold: false, isSecondWordUnderlined: false, and thirdWordTextSize: '21' }`, async () => {

    // Step 1. Arrange
    // the 1st word is not bold
    // the 2nd word is not underlined
    // the 3rd word's text size is 21
    const docxFilePath = 'test-case-2-not_bold-not_underlined-text_size_21.docx';
    let expected: typeResultCheckObject = {
        isFirstWordBold: false,
        isSecondWordUnderlined: false,
        thirdWordTextSize: '21',
    };

    // Step 2. Act
    const actual = await runFeatureProcess(docxFilePath);

    // Step 3. Assert
    expect(actual).toEqual(expected);
});

// 3. Random Partial True
test(`the test case 3. 
    - random_partial_bold-random_partial_underlined-text_size_29
    - should be processed to 
    - { isFirstWordBold: true, isSecondWordUnderlined: true, and thirdWordTextSize: '29' }`, async () => {

    // Step 1. Arrange
    // the 1st word is bold
    // the 2nd word is underlined
    // the 3rd word's text size is 29
    const docxFilePath = 'test-case-3-random_partial_bold-random_partial_underlined-text_size_29.docx';
    let expected: typeResultCheckObject = {
        isFirstWordBold: true,
        isSecondWordUnderlined: true,
        thirdWordTextSize: '29',
    };

    // Step 2. Act
    const actual = await runFeatureProcess(docxFilePath);

    // Step 3. Assert
    expect(actual).toEqual(expected);
});

// 4. Multiple Spaces
// It's still able to identify the words in order, 
// - even if there are multiple spaces or lines separating the words.
test(`the test case 4. 
    - multiple_spaces_separated-bold-not_underlined-text_size_36
    - should be processed to 
    - { isFirstWordBold: true, isSecondWordUnderlined: false, and thirdWordTextSize: '36' }`, async () => {

    // Step 1. Arrange
    // the 1st word is bold
    // the 2nd word is not underlined
    // the 3rd word's text size is 36
    const docxFilePath = 'test-case-4-multiple_spaces_separated-bold-not_underlined-text_size_36.docx';
    let expected: typeResultCheckObject = {
        isFirstWordBold: true,
        isSecondWordUnderlined: false,
        thirdWordTextSize: '36',
    };

    // Step 2. Act
    const actual = await runFeatureProcess(docxFilePath);

    // Step 3. Assert
    expect(actual).toEqual(expected);
});

// 5. Hyphen Linked World is 1 word.
test(`the test case 5. 
    - hyphen_linked_word-not_bold-underlined-text_size_44
    - should be processed to 
    - { isFirstWordBold: false, isSecondWordUnderlined: true, and thirdWordTextSize: '44' }`, async () => {

    // Step 1. Arrange
    // the 1st word is not bold
    // the 2nd word is underlined
    // the 3rd word's text size is 44
    const docxFilePath = 'test-case-5-hyphen_linked_word-not_bold-underlined-text_size_44.docx';
    let expected: typeResultCheckObject = {
        isFirstWordBold: false,
        isSecondWordUnderlined: true,
        thirdWordTextSize: '44',
    };

    // Step 2. Act
    const actual = await runFeatureProcess(docxFilePath);

    // Step 3. Assert
    expect(actual).toEqual(expected);
});

// 6. Punctuation Marks are not words.
test(`the test case 6. 
    - punctuation_marks_are_not_words-partial_bold-partial_underlined-text_size_60.docx
    - should be processed to 
    - { isFirstWordBold: true, isSecondWordUnderlined: true, and thirdWordTextSize: '60' }`, async () => {

    // Step 1. Arrange
    // the 1st word is bold
    // the 2nd word is underlined
    // the 3rd word's text size is 60
    const docxFilePath = 'test-case-6-punctuation_marks_are_not_words-partial_bold-partial_underlined-text_size_60.docx';
    let expected: typeResultCheckObject = {
        isFirstWordBold: true,
        isSecondWordUnderlined: true,
        thirdWordTextSize: '60',
    };

    // Step 2. Act
    const actual = await runFeatureProcess(docxFilePath);

    // Step 3. Assert
    expect(actual).toEqual(expected);
});
