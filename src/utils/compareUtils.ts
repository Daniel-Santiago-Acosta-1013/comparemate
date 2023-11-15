export const compareTexts = (text1: string, text2: string) => {
    let resultOne = "";
    let resultTwo = "";

    // Simplemente resalta las diferencias entre dos textos
    for (let i = 0; i < Math.max(text1.length, text2.length); i++) {
        if (text1[i] !== text2[i]) {
            resultOne += `<span class='highlight'>${text1[i] ?? ''}</span>`;
            resultTwo += `<span class='highlight'>${text2[i] ?? ''}</span>`;
        } else {
            resultOne += text1[i] ?? '';
            resultTwo += text2[i] ?? '';
        }
    }

    return { textOne: resultOne, textTwo: resultTwo };
};
