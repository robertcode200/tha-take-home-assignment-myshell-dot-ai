# Take Home Assignment - MyShell.AI

## 1. Scripts
- "dev": "nodemon --watch 'src/**/*.ts' --exec ts-node src/index.ts"
    - i.e. `npm run dev`
- "test": "jest",
    - i.e. `npm run test`
- "test:watch": "jest --watch"
    - i.e. `npm run test:watch`
- Check package.json to check more npm scripts.
- 检查 package.json 来查看更多 npm 脚本。

![#f03c15](https://placehold.co/15x15/f03c15/f03c15.png)
## 2. Check the images that have the same file name as the test case Word file to better check what the test case looks like in the Word Application./检查与测试用例 Word 文件具有相同文件名的图像，以更好地检查测试用例在 Word 应用程序中的样子。

## 3. Requirement/需求
- ![image](https://hackmd.io/_uploads/r1xYT_gK5yl.png)

## 4. Assumptions/假设
### 4.1. Partial true is true./部分 真 即为 真。
- Since we can style partial chars on a word in the Word Application, we treat a partial bold/underlined word as a bold/underlined word.
- 由于我们可以在 Word 应用程序中为单词的部分字符设置样式，因此我们将部分粗体/下划线单词视为粗体/下划线单词。
- See the test case 3. in feature.spec.ts for more details.
- 请参阅 feature.spec.ts 测试用例 3. 了解更多详细信息。
### 4.2. Separate words with spaces, no matter if it's a space or multiple spaces./用空格分隔单词，无论它是一个空格还是多个空格。
- See the test case 4. in feature.spec.ts for more details.
- 请参阅 feature.spec.ts 测试用例 4. 了解更多详细信息。
### 4.3. Hyphen Linked Word is 1 word./用连字符连接的单词 是 1 个单词。
- i.e. 'centuries - old houses' are 2 words after processing
- 例: 经过处理后，'centuries - old houses' 有 2 个词
    - word 1. [centuries - old]
    - word 2. [houses]
- See the test case 5. in feature.spec.ts for more details.
- 请参阅 feature.spec.ts 测试用例 5. 了解更多详细信息。
### 4.4. Punctuation Marks are not words./标点符号不算词。
- i.e. words.
- 例: words.
- In the Word Application, we can style the '.' at the end only (so here in our scripts, we remove all the punctuation marks before separating words).
- 在 Word 应用程序中，我们 [能] [只针对末尾的] “.” 设定样式（因此，在我们的脚本中，我们在分隔单词之前删除了所有标点符号）。

## 5. Check the [runFeatureProcess] function in [src/feature.ts] to better understand how the word file is processed./检查 [src/feature.ts] 中的 [runFeatureProcess] 函数以更好地了解 word 文件是怎麽被处理的。
