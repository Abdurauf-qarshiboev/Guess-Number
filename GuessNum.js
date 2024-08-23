
        let randomNum;
        let attempts = 5;
        let timeLeft = 30;
        let timerInterval;

        const startButton = document.getElementById('startButton');
        const guessInput = document.getElementById('guessInput');
        const guessButton = document.getElementById('guessButton');
        const timeLeftDisplay = document.getElementById('timeLeft');
        const message = document.getElementById('message');
        const timeLeftDisplayDIV = document.getElementById("timeLeftDisplayDIV");

        // hearts div
        const hearts = document.getElementById('hearts');
        hearts.classList.add('hidden');
        // heart svgs
        const heartsvgs = Array.from(hearts.getElementsByTagName("svg"));

        // needed svg`s
        const clock = document.getElementById('clockSVG');
        clock.classList.add("hidden");
        const notimeclock = document.getElementById("notimeSVG");
        notimeclock.classList.add("hidden");
        const failure = document.getElementById("failureSVG");
        failure.classList.add("hidden");
        const success = document.getElementById("successSVG");
        success.classList.add("hidden");

        // buttons event listeners
        startButton.addEventListener('click', startGame);
        guessButton.addEventListener('click', makeGuess);

        function startGame() {
            randomNum = Math.round(Math.random() * 100) + 1;
            // randomNum = 50;
            attempts = 5;
            timeLeft = 30;

            success.classList.add("hidden");
            timeLeftDisplay.classList.replace("text-notimetext","text-sky-400");
            timeLeftDisplayDIV.classList.replace("hidden", "flex");
            failure.classList.replace("block", "hidden");
            notimeclock.classList.replace("block", "hidden");
            hearts.classList.replace("hidden", "flex");
            clock.classList.replace("hidden", "block");
            message.textContent = "O'yin boshlandi! Sizda 5 ta imkoniyat bor.";
            message.classList.add("sm:text-center");
            message.classList.remove("sm:max-w-[270px]");
            guessInput.style.display = 'block';
            guessButton.style.display = 'block';
            startButton.style.display = 'none';

            function heartsReset(){
                heartsvgs.forEach(element => {
                    element.classList.remove("hidden")
                });
            }
            heartsReset();
            guessInput.value = '';
            timeLeftDisplay.textContent = `Qolgan vaqt: ${timeLeft} soniya!`
    
            timerInterval = setInterval(() => {
                timeLeft--;
                timeLeftDisplay.textContent = `Qolgan vaqt: ${timeLeft} soniya!`;
                if (timeLeft <= 0) {
                    stopGame(false);
                    timeLeftDisplay.textContent = `Vaqt tugadi!`;
                    timeLeftDisplay.classList.add("text-notimetext","text-lg");
                    clock.classList.replace("block", "hidden");
                    notimeclock.classList.replace("hidden", "block");
                }
            }, 1000);
        }
        function makeGuess() {
            function heartsUpdate() {
                if (attempts >= 0 && attempts < heartsvgs.length) {
                    heartsvgs[attempts].classList.add("hidden");
                }
            }
            
            const userGuess = parseInt(guessInput.value);
            if (isNaN(userGuess)) {
                message.textContent = "Iltimos, son kiriting.";
                return;
            }

            attempts--;
            heartsUpdate();
            
            if (userGuess === randomNum) {
                stopGame(true);

            } else if (attempts === 0) {
                stopGame(false);
                timeLeftDisplayDIV.classList.add("hidden");
                clock.classList.replace("block", "hidden");
                notimeclock.classList.replace("block", "hidden");
            } else {
                if (userGuess > randomNum) {
                    message.classList.add("sm:max-w-[270px]");
                    message.textContent = `Katta qiymat kiritdingiz. Sizda ${attempts} ta imkoniyat qoldi.`;
                } else {
                    message.classList.add("sm:max-w-[270px]");
                    message.textContent = `Kichik qiymat kiritdingiz. Sizda ${attempts} ta imkoniyat qoldi.`;
                }
            }
        }

        function stopGame(didWin) {
            clearInterval(timerInterval);
            guessInput.style.display = 'none';
            guessButton.style.display = 'none';
            startButton.style.display = 'block';
            startButton.textContent = 'Restart'

            if (didWin) {
                message.textContent = `Tabriklaymiz, siz o'ylangan son ${randomNum} ni topdingiz!`;
                success.classList.remove("hidden");
                timeLeftDisplayDIV.classList.add("hidden");
                hearts.classList.add("hidden");
            } else {
                message.textContent = `Topolmadiz. O'ylagan sonimiz ${randomNum} edi.`;
                message.classList.remove("sm:text-center");
                failure.classList.replace("hidden", "block")
                hearts.classList.add("hidden");
            }
        }