export const typeWrite = (currentText: string, prevText: string, setter: React.Dispatch<React.SetStateAction<string>>, speed: number = 200) => {
    const resultWords = currentText
        .replace(prevText, "")
        .split(" ")
        .filter(w => w.trim() !== "");
    let wordIndex = -1;

    const animKey = setInterval(() => {
        if (wordIndex >= resultWords.length - 1) {
            clearInterval(animKey);
        }

        setter((prvTxt) => `${prvTxt} ${resultWords[wordIndex] ?? ""}`);

        wordIndex += 1;
    }, speed);
}