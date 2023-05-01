window.addEventListener("load", function() {
    const keyboard = document.createElement("div");
    keyboard.classList.add("keyboard");

    const inputField = document.createElement("textarea");
    inputField.classList.add("input-field");
    inputField.setAttribute("placeholder", "Смена языка Alt+Shift");

    document.body.appendChild(inputField);
    
    const keysEn = [
        ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
        ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del"],
        ["Caps Lock","a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
        ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "↑", "Shift"],
        ["Ctrl L", "Win", "Alt","Space", "Alt", "Ctrl R","←","↓","→"]
    ];

    const keysRu = [
        ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
        ["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "Del"],
        ["Caps Lock","ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter"],
        ["Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "↑", "Shift"],
        ["Ctrl L", "Win", "Alt","Space", "Alt", "Ctrl R","←","↓","→"]
    ];
    var isEnKeyboard = localStorage.getItem('isEnKeyboard') === 'true';

    if (isEnKeyboard === true){
      keysEn.forEach(row => {
        const rowEl = document.createElement("div");
        rowEl.classList.add("row");

        row.forEach(key => {
            const keyEl = document.createElement("button");
            keyEl.classList.add("key");
            keyEl.classList.add(key.replace(/ .*/,''));
            keyEl.textContent = key;
            rowEl.appendChild(keyEl);
            
        });

        keyboard.appendChild(rowEl);
    });
    } 
    else{
      keysRu.forEach(row => {
        const rowEl = document.createElement("div");
        rowEl.classList.add("row");

        row.forEach(key => {
            const keyEl = document.createElement("button");
            keyEl.classList.add("key");
            keyEl.classList.add(key.replace(/ .*/,''));
            keyEl.textContent = key;
            rowEl.appendChild(keyEl);
            
        });

        keyboard.appendChild(rowEl);
    });
    }
    
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
          localStorage.setItem('isEnKeyboard', isEnKeyboard);
            updateKeyboard();
        }
      });

    document.addEventListener('keydown', function(e) {
        const key = [...keyboard.querySelectorAll('.key')].find(k => {
            const isCapsLock = e.code === 'CapsLock' && k.textContent === 'Caps Lock';
            const isCtrl = e.code === 'ControlLeft' && k.textContent === 'Ctrl L' ||
                e.code === 'ControlRight' && k.textContent === 'Ctrl R';
            const isWin = e.code === 'MetaLeft' && k.textContent === 'Win';
            const isSpace = e.code === 'Space' && k.textContent === 'Space';
            const isDel = e.code === 'Delete' && k.textContent === 'Del';
            const isArrowUp = e.code === 'ArrowUp' && k.textContent === '↑';
            const isArrowDown = e.code === 'ArrowDown' && k.textContent === '↓';
            const isArrowLeft = e.code === 'ArrowLeft' && k.textContent === '←';
            const isArrowRight = e.code === 'ArrowRight' && k.textContent === '→';
            return isCapsLock || isCtrl || isWin || isSpace || isDel || isArrowUp || isArrowDown || isArrowLeft || isArrowRight || k.textContent === e.key;
        });
        
        console.log(key)
        if (key) {
          key.classList.add('pressed');
        }
      });
      
    document.addEventListener('keyup', function(e) {
        const key = [...keyboard.querySelectorAll('.key')].find(k => {
            const isCapsLock = e.code === 'CapsLock' && k.textContent === 'Caps Lock';
            const isCtrl = e.code === 'ControlLeft' && k.textContent === 'Ctrl L' ||
                e.code === 'ControlRight' && k.textContent === 'Ctrl R';
            const isWin = e.code === 'MetaLeft' && k.textContent === 'Win';
            const isSpace = e.code === 'Space' && k.textContent === 'Space';
            const isDel = e.code === 'Delete' && k.textContent === 'Del';
            const isArrowUp = e.code === 'ArrowUp' && k.textContent === '↑';
            const isArrowDown = e.code === 'ArrowDown' && k.textContent === '↓';
            const isArrowLeft = e.code === 'ArrowLeft' && k.textContent === '←';
            const isArrowRight = e.code === 'ArrowRight' && k.textContent === '→';
            return isCapsLock || isCtrl || isWin || isSpace || isDel || isArrowUp || isArrowDown || isArrowLeft || isArrowRight || k.textContent === e.key;
        });
        if (key) {
          key.classList.remove('pressed');
        }
      });
      
      const keys = keyboard.querySelectorAll('.key');
      keys.forEach(key => {
        key.addEventListener('mousedown', function(e) {
          var inputString = inputField.value;
          console.log(key)
          if (key.textContent === 'Ctrl L' || key.textContent === 'Ctrl R' || key.textContent === 'Shift' || key.textContent === 'Alt') {
            return; 
          }
          else if (key.textContent === 'Backspace') {
            var shortenedString = inputString.substr(0,(inputString.length -1));
            inputField.value = shortenedString
          }
          else if (key.textContent === 'Del') {
            var selectionStart = inputField.selectionStart;
            var shortenedString = inputString.slice(0, selectionStart) + inputString.slice(selectionStart + 1);
            inputField.value = shortenedString;
          }
          else if (key.textContent === 'Enter') {
            inputField.value += '\r\n';
          }
          else if (key.textContent === 'Caps Lock') {
            return;
          }
          else if (key.textContent === 'Space') {
            inputField.value += ' ';
          }
          else if (key.textContent === 'Tab') {
            inputField.value += '  ';
          }
          else{
            key.classList.add('pressed');
            inputField.value += key.textContent;
          }
          
        });
      
        key.addEventListener('mouseup', function(e) {
          if (key.textContent === 'Ctrl' || key.textContent === 'Ctrl R' || key.textContent === 'Shift' || key.textContent === 'Alt') {
            return;
          }
          key.classList.remove('pressed');
        });
      });

      inputField.addEventListener('blur', function() {
        inputField.focus();
      });

    document.body.appendChild(keyboard);
});
