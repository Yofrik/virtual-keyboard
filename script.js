window.addEventListener("load", function() {
    const keyboard = document.createElement("div");
    keyboard.classList.add("keyboard");

    const inputField = document.createElement("textarea");
    inputField.classList.add("input-field");

    document.body.appendChild(inputField);
    
    const keysEn = [
        ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
        ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del"],
        ["Caps Lock","a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
        ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "↑", "Shift"],
        ["Ctrl", "Win", "Alt","Space", "Alt", "Ctrl","←","↓","→"]
    ];

    const keysRu = [
        ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
        ["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "Del"],
        ["Caps Lock","ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter"],
        ["Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "↑", "Shift"],
        ["Ctrl", "Win", "Alt","Space", "Alt", "Ctrl","←","↓","→"]
    ];

    keysEn.forEach(row => {
        const rowEl = document.createElement("div");
        rowEl.classList.add("row");

        row.forEach(key => {
            const keyEl = document.createElement("button");
            keyEl.classList.add("key");
            keyEl.textContent = key;
            rowEl.appendChild(keyEl);
            
        });

        keyboard.appendChild(rowEl);
    });


    let isEnKeyboard = true;

    const updateKeyboard = () => {
        keyboard.querySelectorAll('.row').forEach((row, rowIndex) => {
            row.querySelectorAll('.key').forEach((key, keyIndex) => {
                const newKey = isEnKeyboard ? keysEn[rowIndex][keyIndex] : keysRu[rowIndex][keyIndex];
                key.textContent = newKey;
            });
        });
    };


    document.addEventListener('keydown', function(event) {
        if (event.key === 'Shift' && (event.altKey  || event.metaKey)) {
          isEnKeyboard = !isEnKeyboard;
            updateKeyboard();
        }
      });

    document.body.appendChild(keyboard);
});
