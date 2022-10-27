const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    renderScene("Start1")
}

function renderScene(Scene_id){
    const Scene = Scenes.find(Scene => Scene.id === Scene_id)
    document.body.style.backgroundImage = Scene.tlo
    textElement.innerText = Scene.text /*ustala tekst okienka*/
    while (optionButtonsElement.firstChild){ /*usuwa guziki*/
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    Scene.options.forEach(option => { /*Tworzy guziki*/
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requierdState == null || option.requierdState(state)
}

function selectOption(option){
    const next_Scene_id = option.nextText
    if(next_Scene_id <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    renderScene(next_Scene_id)
}

const Scenes = [
    {
        id: "Start1",
        text: 'Idziesz sobie korytarzem, niby samemu, ale czujesz, że ktoś Cię obserwuje...',
        tlo: 'url("img/Korytarz.png")',
        options: [
            {
                text: 'Rozejrzyj się! (akcja)',
                nextText: "Start2"
            }
        ]
    },
    {
        id: "Start2",
        text: 'Rozglądając się i obracając w pustym korytarzu nie widzisz nikogo, ale nagle słyszysz "Hola amigos!"',
        tlo: 'url("img/Korytarz.png")',
        options: [
            {
                text: 'Odrwóć się! (akcja)',
                nextText: "Start3"
            }
        ]
    },
    {
        id: "Start3",
        text: 'Widzisz przed sobą nauczyciela włefu, Pana Supińskiego. Tylko, że coś jest z nim nie tak...',
        tlo: 'url("img/Szczęśliwy.png")',
        options: [
            {
                text: '"Pan Michał! Co tam u Pana?" (rozmowa)',
                nextText: "Rozmowa_S"
            },
            {
                text: '"Panie Michale, musi nam Pan pomóc! Dy-Roo stał się..." (rozmowa)',
                nextText: "Dyro"
            },
            {
                text: '"Pan Michał? Co tam Pan tu robi? I to o tej godzinie? Czemu nie jest Pan potworem?" (rozmowa)',
                nextText: "Wątpliwości"
            },
            {
                text: '"Hola hola co? Niech Pan mówi po polsku!" (walka)',
                nextText: "Hola"
            }
        ]
    },
    {
        id: "Rozmowa_S",
        text: '"U mnie super, nigdy nie czułem się jeszcze tak dobrze hahaha"',
        tlo: 'url("img/Szczęśliwy.png")',
        options: [
            {
                text: '"No to super! Pomoże nam Pan pokonać Dy-Roo?" (rozmowa)',
                nextText: "Dyro"
            },
            {
                text: '"A skąd w Panu taka siła?" (rozmowa)',
                nextText: "Wampir"
            },
            {
                text: '"Coś podejrzanie się Pan zachowuje..." (rozmowa)',
                nextText: "Wątpliwości"
            },
            {
                text: '"To co, może jakaś siatkóweczka jak się Pan tak dobrze czuje?" (walka)',
                nextText: "Siatka"
            }
        ]
    },
    {
        id: "Wątpliwości",
        text: '"Jeśli masz jakieś wątpliwości to pytaj śmiało!"',
        tlo: 'url("img/Szczęśliwy.png")',
        options: [
            {
                text: '"Pan zawsze miał brodę?" (rozmowa)',
                nextText: "Serio?"
            },
            {
                text: '"WOW, Od kiedy ma Pan rozjaśnione włosy?!" (rozmowa)',
                nextText: "Serio?"
            },
            {
                text: '"Czemu jest Pan w szlafroku?" (rozmowa)',
                nextText: "Serio?"
            },
            {
                text: '"Nieeeee, wszystko jest w porządku chyba. Widocznie mi się wydawało...',
                nextText: "Serio?"
            }
        ]
    },
    {
        id: "Serio?",
        text: '"Serio? Ale naprawdę: SERIO? Lewituję jakiś metr nad ziemią, a Ty... Ech nie ważne, po prostu... Nie ważne...',
        tlo: 'url("img/Obojętny.png")',
        options: [
            {
                text: '"FAKTYCZNIE! CO TU SIĘ DZIEJE?" (panikujesz)',
                nextText: "Wampir"
            },
        ]
    },
    {
        id: "Wampir",
        text: '"DZIĘKI MOCY OD DY-ROO STAŁEM SIĘ WAMPIREM. MOJE NOWE IMIĘ TO <Po Dai una Pelota de Vol-ley>! Szykujcie się na śmierć!',
        tlo: 'url("img/Obojętny.png")',
        options: [
            {
                text: '"Po Dai una Pelota de Vol-ley? Co to w ogóle znaczy?!" (panikujesz)',
                nextText: "Śmierć"
            },
        ]
    },
    {
        id: "Dyro",
        text: '"Wiem co się stało ze szkołą i z Dy-Roo. Myślicie, że mnie to ominęło? hahaha" Jesteś przerażony!',
        tlo: 'url("img/Szczęśliwy.png")',
        options: [
            {
                text: '"Co Pan ma na myśli?" - to jedyne co jesteś w stanie powiedzieć (panikujesz)',
                nextText: "Wampir"
            },
        ]
    },
    {
        id: "Siatka",
        text: '"Siatka? Mam lepszy pomysł, co powiecie na zagadkę? Powiedzcie jaki mecz oglądałem niedawno w Regis?"',
        tlo: 'url("img/Obojętny.png")',
        options: [
            {
                text: '"Barcelona - Real Madryt!" (odpowiedz)',
                nextText: "Śmierć"
            },
            {
                text: '"Lech Poznań - Levante!" (odpowiedz)',
                nextText: "Śmierć"
            },
            {
                text: '"Villarreal - Barcelona!" (odpowiedz)',
                nextText: "Śmierć"
            },
            {
                text: '"Lech Poznań - Villarreal!" (odpowiedz)',
                nextText: "Dobra_odp"
            }
        ]
    },
    {
        id: "Hola",
        text: '"JAK ŚMIESZ NIE SZANOWAĆ HISZPAŃSKIEGO?! JUŻ JA CI POKAŻĘ!"',
        tlo: 'url("img/Zły.png")',
        options: [
            {
                text: '"Hahaha, Pan się zezłościł, ale beka!" (pochwal się brakiem kultury)',
                nextText: "Śmierć"
            },
            {
                text: '"Przepraszam, nie chciałem, po prostu nie rozumiem!" (okaż pokorę)',
                nextText: "Śmierć"
            }
        ]
    },
    {
        id: "Śmierć",
        text: 'Pan Michał bez słowa pokazuje dwa olbrzymie kły i rzuca się na Ciebie, wypijając Ci krew! Już po Tobie!',
        tlo: 'url("img/Zły.png")',
        options: [
            {
                text: 'Nie żyjesz, zagraj ponownie.',
                nextText: "Start1"
            }
        ]
    },
    {
        id: "Dobra_odp",
        text: '"NIEEEEE, TAK NIE MOŻE BYĆ, OSZUKUJESZ, SKĄD TO WIESZ?" Wściekły Pan Michał nie mogąc znieść porażki wije się po pokoju i pokazuje dwa olbrzymie kły - to wampir!',
        tlo: 'url("img/Zły.png")',
        options: [
            {
                text: 'Rzuć w niego kajzerką! (atak)',
                nextText: "Śmierć"
            },
            {
                text: 'Rzuć w niego bagietką czosnkową! (atak)',
                nextText: "Sukces"
            },
            {
                text: 'Rzuć w niego kanapką z masłem! (atak)',
                nextText: "Śmierć"
            },
            {
                text: 'Zacznij uciekać! (ucieczka)',
                nextText: "Śmierć"
            },
        ]
    },
    {
        id: "Sukces",
        text: 'Czosnek w bagietce spala Pana Michała, zostawiając tylko BARDZO, ALE TO BARDZO MILUSI szlafrok... Możesz iść dalej.',
        tlo: 'url("img/Ogień.png")',
        options: [
            {
                text: 'Zagrożenie minęło, a Ty przeżyłeś! Kliknij, aby zagrać ponownie.',
                nextText: "Start1"
            },
            {
                text: 'Sprawdź cenę szlafroka na Allegro! (akcja)',
                nextText: "Allegro"
            }
        ]
    },
    {
        id: "Allegro",
        text: 'Okazuje się, że szlafrok jest złotym Gucci odwróconym na drugą stronę! (Nie pytajcie czemu Pan Michał tak go nosił.) Wystawiasz szlafrok za pół miliona złotych, a samemu kontynuujesz misję!',
        tlo: 'url("img/Szlafrok.png")',
        options: [
            {
                text: 'Zagrożenie minęło, a Ty przeżyłeś! Kliknij, aby zagrać ponownie.',
                nextText: "Start1"
            },
        ]
    }
]

startGame()