import {DialogConfig, END} from "../../gameobjects/Dialog/Dialogs/DialogConfig";
import {sleep} from "../../General/Helpers";
import {DIALOG_MANAGER, INGREDIENT_COOKBOOK, MUSIC_BUTTON, SOUND_BUTTON} from "../../index";

export const DIALOG_DAY_1: DialogConfig = {
    nodes: [
        {
            id: "start",
            onStartDo: (level) => level.blockMachines(),
            onEndDo: (level) => level.unblockMachines(),
            speeches: [
                {
                    text: {
                        en: "Oh hello! I am Bernd and this is my small Christmas bakery.",
                        de: "Oh hey! Ich bin Bernd und das hier ist meine kleine Weihnachtsbäckerei."
                    }
                }, {
                    text: {
                        en: "It's nice that you responded to my advertisement, I really need your help urgently...",
                        de: "Toll, dass du auf meine Ausschreibung reagiert hast, ich brauche dringend deine Hilfe..."
                    }
                }, {
                    text: {
                        en: "Short and sweet: 24 different recipes have to be made before Christmas - it's family tradition.",
                        de: "Kurz und knapp: Wir müssen 24 Rezepte vor Weihnachten fertig stellen - Familientradition halt."
                    }
                }, {
                    text: {
                        en: "However, this year I've lost track of time a bit and am running late.",
                        de: "Aber dieses Jahr habe ich etwas die Zeit aus den Augen verloren und bin spät dran."
                    }
                }, {
                    text: {
                        en: "Damn Netflix and its constant supply of high quality and addictive series...",
                        de: "Verdammtes Netflix und sein konstanter Nachschub an hochqualitativen Serien..."
                    }
                }, {
                    text: {
                        en: "Well anyway... Your first recipe is Santa's Milk. Let's start, shall we?",
                        de: "Naja, wie auch immer ... Dein erstes Rezept ist Weihnachtsmilch. Sollen wir anfangen?"
                    }
                },
            ],
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: "agreedToTakePart"}],
            continuationText: {en: "Yes!", de: "Ja!"}
        }, {
            id: "agreedToTakePart",
            onStartDo: (level) => {
                level.blockMachines();
                level.highlightConveyorBelts()
            },
            onEndDo: (level) => {
                level.unblockMachines();
                level.unhighlightConveyorBelts()
            },
            speeches: [
                {
                    text: {
                        en: "Splendid! Look at all these conveyor belts. New ingredients are constantly being produced here.",
                        de: "Wunderbar! Sieh dir diese Laufbänder an. Hier werden fortlaufend neue Zutaten hergestellt."
                    }
                }, {
                    text: {
                        en: "Each ingredient has three properties: Taste, Consistency and Color.",
                        de: "Jede Zutat hat drei Eigenschaften: Geschmack, Konsistenz und Farbe."
                    }
                },
                {
                    text: {
                        en: "Your task is to change these properties to create the required ingredients for our recipes.",
                        de: "Du musst diese Eigenschaften ändern, um die richtigen Zutaten für unsere Rezepte herzustellen."
                    }
                },
                {
                    text: {
                        en: "Let me show you what I mean by that...",
                        de: "Lass mich dir demonstrieren, was ich damit meine..."
                    }
                }],
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: "wantsADemonstration"}],
            continuationText: {en: "Yep.", de: "Jep."}
        }, {
            id: "wantsADemonstration",
            onStartDo: (level) => {
                level.blockMachines();
                level.highlightMachines()
            },
            onEndDo: (level) => {
                level.unblockMachines();
                level.unhighlightMachines()
            },
            onLastSpeechDo: (level) => {
                level.unblockMachines();
                level.unallowMoveDirection("DOWN")
                level.showSliding({row: 1, column: 1}, {row: 0, column: 1})
            },
            onLastSpeechUndo: (level) => {
                level.unlimitMoveDirections()
                level.hideSliding()
            },
            speeches: [
                {
                    text: {
                        en: "Machines come in all different types and shapes. Each one alters ingredients differently.",
                        de: "Maschinen gibt es in vielen Typen und Formen. Sie alle ändern Zutaten-Eigenschaften anders."
                    }
                },
                {
                    text: {
                        en: "The gray block with the drop symbol is such a machine. It's a liquefier to be precise.",
                        de: "Der graue Block mit dem Tropfensymbol ist eine Maschine. Ein Verflüssiger um genau zu sein."
                    }
                },
                {
                    text: {
                        en: "If you place this machine on a conveyor belt, it will turns all ingredients passing it into liquid.",
                        de: "Wenn du diese Maschine auf ein Laufband ziehst, verflüssigt sie alle Zutaten, die sie passieren."
                    }
                },
                {
                    text: {
                        en: "Try it yourself by dragging the liquefying machine on the honey belt.",
                        de: "Versuch's mal selbst, indem du den Verflüssiger auf das Laufband mit dem Honig ziehst."
                    }
                }],
            nextNodes: [{on: "moved_item_A_to_0_1", nextNodeId: "finished_first_drag"}]
        }, {
            onStartDo: (level) => {
                level.blockMachines();
                level.highlightBeltIngredients("A")
            },
            onEndDo: (level) => {
                level.unblockMachines();
                level.unhighlightBeltIngredients()
            },
            id: "finished_first_drag",
            speeches: [
                {
                    text: {
                        en: "Yes, very good! Your machine turned the sticky honey into liquid vanilla milk.",
                        de: "Ja, sehr gut! Deine Maschine hat den klebrigen Honig in flüssige Vanillemilch verwandelt."
                    }
                }, {
                    text: {
                        en: "You see: You can use machines to alter the initial ingredients you're given.",
                        de: "Du kannst also Maschinen nutzen, um deine initialen Zutaten zu verändern."
                    }
                },
                {
                    text: {
                        en: "Your task is to move machines around and find their perfect position.",
                        de: "An dir liegt es, die Maschinen zu verschieben und ihre perfekte Position zu finden."
                    }
                },
                {
                    text: {
                        en: "Start and end fields of conveyor belts are blocked for this purpose.",
                        de: "Die Anfangs- und Endfelder von Laufbändern sind hierbei immer blockiert."
                    }
                }],
            continuationText: {en: "Okay.", de: "Okay"},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: "understoodDragging"}]
        }, {
            onStartDo: (level) => {
                level.blockMachines();
                level.highlightRecipeBox()
            },
            onEndDo: (level) => {
                level.unblockMachines();
                level.unhighlightRecipeBox()
            },
            id: "understoodDragging",
            speeches: [
                {
                    text: {
                        en: "Great! You can see which ingredients you need on the recipe list to your left.",
                        de: "Super! Die benötigten Zutaten siehst du in der Zutatenliste zu deiner Linken."
                    }
                },
                {
                    text: {
                        en: "Only if all these ingredients leave your conveyor belts simultaneously, a recipe is complete.",
                        de: "Nur wenn alle Zutaten deine Laufbänder gleichzeitig verlassen, ist ein Rezept vollständig."
                    }
                },
                {
                    text: {
                        en: "I'm sure you can find out how to complete this recipe by yourself. Give it a try!",
                        de: "Sicher findest du heraus, wie das heutige Rezept vervollständigt werden kann. Versuch's mal!"
                    }
                }],
            continuationText: {en: "Ok.", de: "Ok."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: "willTry"}]
        }, {
            onStartDo: (level) => {
                level.blockMachines();
                MUSIC_BUTTON.highlight();
                SOUND_BUTTON.highlight();
            },
            onEndDo: (level) => {
                level.unblockMachines();
                MUSIC_BUTTON.unhighlight();
                SOUND_BUTTON.unhighlight()
            },
            id: "willTry",
            speeches: [
                {
                    text: {
                        en: "Oh... One thing before you start... I always like to listen to music while baking.",
                        de: "Oh... Eine Sache noch, bevor du anfängst... Ich höre beim Backen immer gern Musik."
                    }
                },
                {
                    text: {
                        en: "If you prefer silence, you can turn the music off by clicking on the musical note icon on the top left.",
                        de: "Wenn du Stille bevorzugst, kannst du die Musik mit dem Musiknotenknopf oben links ausschalten."
                    }
                },
                {
                    text: {
                        en: "Sound effects are turned on and off via the speaker icon next to it.",
                        de: "Die Soundeffekte regelt der Lautsprecherknopf direkt daneben."
                    }
                }
            ],
            continuationText: {en: "Thanks", de: "Danke"},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}
export const HINT_DAY_1: DialogConfig = {
    nodes: [
        {
            id: "hint1",
            speeches: [
                {
                    text: {
                        en: "Try pulling the machine onto the cream conveyor belt.",
                        de: "Versuch, die Maschine auf das Laufband mit der Sahne zu schieben."
                    }
                }
            ],
            continuationText: {en: "Ok.", de: "Ok."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_1: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {
                    text: {
                        en: "Perfect, the milk looks delicious and I'm sure it will taste great!",
                        de: "Perfekt, die Milch sieht köstlich aus und wird sicher toll schmecken!"
                    }
                },
                {
                    text: {
                        en: "I mean, it's for Santa, so I'll never know... It's not for me... I'm just a baker.",
                        de: "Also, dem Weihnachtsmann... ich werde es nie erfahren... ich bin nur ein Bäcker."
                    }
                }
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_2: DialogConfig = {
    nodes: [{
        id: "start",
        onStartDo: () => {
            INGREDIENT_COOKBOOK.disableButton()
        },
        onEndDo: () => {
            INGREDIENT_COOKBOOK.enableButton()
        },
        speeches: [
            {
                text: {
                    en: "Hey, nice to have you back!",
                    de: "Hey, schön dich wieder hier zu haben!"
                }
            }, {
                text: {
                    en: "Today's task will be a little more difficult, I need you to make Flake Nests.",
                    de: "Deine heutige Aufgabe ist ein bisschen schwieriger, ich brauche Schokocrossies von dir."
                }
            }
        ],
        continuationText: {en: "Nice.", de: "Nett."},
        nextNodes: [{on: "clicked_continuation_button", nextNodeId: "node2"}]
    }, {
        id: "node2",
        onStartDo: (level) => {
            INGREDIENT_COOKBOOK.disableButton()
            level.highlightBlocks()
        },
        onEndDo: (level) => {
            INGREDIENT_COOKBOOK.enableButton()
            level.unhighlightBlocks()
        },
        speeches: [
            {
                text: {
                    en: "Basically it works the same as yesterday, but there is one new difficulty: Blocks",
                    de: "Im Grunde funktioniert alles wie gestern, nur mit einer neuen Schwierigkeit: Blöcken"
                }
            },
            {
                text: {
                    en: "You can see a such block above between the conveyor belts. Blocks are basically walls.",
                    de: "Einen solchen Block kannst du oben zwischen den Laufbändern sehen. Blöcke sind quasi Wände."
                }
            },
            {
                text: {
                    en: "You can't place any machines on them, nor can you pass them.",
                    de: "Du kannst auf ihnen keine Maschinen platzieren und sie auch nicht passieren."
                }
            }
        ],
        continuationText: {en: "Ok.", de: "Ok."},
        nextNodes: [{on: "clicked_continuation_button", nextNodeId: "node3"}]
    }, {
        id: "node3",
        onStartDo: () => {
            INGREDIENT_COOKBOOK.disableButton()
        },
        onEndDo: () => {
            INGREDIENT_COOKBOOK.enableButton()
        },
        onLastSpeechDo: () => {
            INGREDIENT_COOKBOOK.highlightButton()
            INGREDIENT_COOKBOOK.enableButton()
        },
        onLastSpeechUndo: () => {
            INGREDIENT_COOKBOOK.unhighlightButton()
        },
        speeches: [
            {
                text: {
                    en: "By the way: Whenever you discover a new ingredient, an entry is added to your recipe book.",
                    de: "Achso: Immer eine neue Zutat entdeckt wird, bekommt dein Rezeptbuch einen neuen Eintrag."
                }
            },
            {
                text: {
                    en: "You can always open it if you get stuck. Let's see, a few should already be noted...",
                    de: "Du kannst es immer öffnen, wenn du nicht mehr weiter weißt. Lass uns doch mal reinschauen..."
                }
            },
            {text: {en: "Open the book at the bottom left, please.", de: "Öffne bitte das Buch unten links."}}
        ],
        nextNodes: [{on: "clicked_ingredient_cookbook", nextNodeId: "clicked_cookbook"}],
    }, {
        id: "clicked_cookbook",
        onStartDo: () => {
            INGREDIENT_COOKBOOK.disableCancelButton()
        },
        onEndDo: () => {
            INGREDIENT_COOKBOOK.enableCancelButton()
        },
        onLastSpeechDo: () => {
            INGREDIENT_COOKBOOK.highlightCancelButton()
            INGREDIENT_COOKBOOK.enableCancelButton()
        },
        onLastSpeechUndo: () => {
            INGREDIENT_COOKBOOK.unhighlightCancelButton()
        },
        speeches: [
            {
                text: {
                    en: "Lots of space here to be filled with ingredient information!",
                    de: "Hier ist viel Platz für Zutateninfos!"
                }
            },
            {
                text: {
                    en: "You can scroll up and down within in here by dragging the red bookmark.",
                    de: "Durch Ziehen des roten Lesezeichens kannst du hier auf- und abscrollen."
                }
            },
            {
                text: {
                    en: "You can now close the book by clicking on the red X on its top left.",
                    de: "Du kannst das Buch jetzt wieder mit dem roten X oben links schließen."
                }
            }
        ],
        nextNodes: [{on: "closed_ingredient_cookbook", nextNodeId: "closed_cookbook"}]
    }, {
        id: "closed_cookbook",
        speeches: [
            {
                text: {
                    en: "You can always ask me for a hint by clicking on the Bernd icon at the bottom left.",
                    de: "Du kannst mich immer um einen Hinweis bitten, indem du auf den Bernd-Knopf unten links klickst."
                }
            },
            {
                text: {
                    en: "It will appear once I stop talking. But don't expect too much, I'm a busy man.",
                    de: "Der Knopf erscheint, sobald ich nicht mehr rede. Aber erwarte nicht zu viel, ich bin vielbeschäftigt."
                }
            },
            {text: {en: "Alright, let's get started!", de: "Alles klar, dann legen wir mal los!"}},
        ],
        continuationText: {en: "Yep!", de: "Jep!"},
        nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
    }
    ]
}
export const HINT_DAY_2: DialogConfig = {
    nodes: [
        {
            id: "hint1",
            speeches: [
                {
                    text: {
                        en: "Place one machine on each conveyor belt and all should work.",
                        de: "Platziere eine Maschine pro Laufband und alles sollte klappen."
                    }
                }
            ],
            continuationText: {en: "Ok.", de: "Ok."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_2: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {
                    text: {
                        en: "Ever thought about a career as a Christmas baker?",
                        de: "Schonmal über eine Karriere als Weihnachtsbäcker nachgedacht?"
                    }
                },
                {
                    text: {
                        en: "I'm going to treat myself with another one of your Flake Nests.",
                        de: "Ich gönn' mir noch ein paar weitere deiner Schokocrossies."
                    }
                }
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_3: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {
                    text: {
                        en: "Yaaaaawn... Sorry, I'm a bit tired today...",
                        de: "Gääääähn... Entschuldige, ich bin heute etwas müde..."
                    }
                },
                {
                    text: {
                        en: "That might be because I was busy wrapping gifts all night... Anyway.",
                        de: "Vielleicht, weil ich die ganze Nacht Geschenke einpacken musste... Egal."
                    }
                },
                {
                    text: {
                        en: "Glad you're back! Butter Cookies are on the menu today. Real classics!",
                        de: "Gut, dass du zurück bist! Mürbeteigkekse stehen heute auf der Karte. Echte Klassiker!"
                    }
                }
            ],
            continuationText: {en: "Ok.", de: "Ok."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: "node2"}]
        }, {
            id: "node2",
            onStartDo: (level) => level.highlightMachines(),
            onEndDo: (level) => level.unhighlightMachines(),
            speeches: [
                {
                    text: {
                        en: "See those machines? They're a little wider than the ones you've been using before.",
                        de: "Siehst du diese Maschinen? Sie sind etwas breiter als die, die du gewohnt bist."
                    }
                },
                {
                    text: {
                        en: "With these cuties, you can affect two conveyor belts at once.",
                        de: "Mit diesen Schätzchen kannst du zwei Laufbänder auf einmal bedienen."
                    }
                },
                {
                    text: {
                        en: "Remember, though, that they apply the same change on both conveyor belts.",
                        de: "Bedenke aber, dass sie den gleichen Effekt auf beiden Bänder bewirken."
                    }
                },
                {text: {en: "Let's see what you can do!", de: "Zeig mal, was du kannst!"}}
            ],
            continuationText: {en: "Ok.", de: "Ok."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_3: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "You are a natural - keep it up!", de: "Du bist ein Naturtalent - weiter so!"}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_4: DialogConfig = {
    nodes: [
        {
            id: "start",
            onStartDo: (level) => {
                level.blockMachines()
            },
            onEndDo: (level) => {
                level.unblockMachines()
            },
            speeches: [
                {
                    text: {
                        en: "Gosh, do I have a hangover... Who came up with Mulled Wine?",
                        de: "Hab ich einen Kater... Verdammter Glühwein... Ich fühl mich immer noch betrunken... "
                    }
                },
                {
                    text: {
                        en: "I still feel tipsy... I guess my sleigh... err... car will remain unmoved today.",
                        de: "Mein Schlitten... err... Wagen bleibt heute wohl besser stehen."
                    }
                },
                {
                    text: {
                        en: "By the way, I'd like to ask you to make me some Rum Truffles today.",
                        de: "Achso, heute würde ich dich übrigens um Rumkugeln bitten."
                    }
                }
            ],
            continuationText: {en: "Ok.", de: "Ok."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: "node2"}]
        }, {
            id: "node2",
            onStartDo: (level) => {
                level.blockMachines()
                level.highlightMachines("typeVariable")
            },
            onEndDo: (level) => {
                level.unblockMachines()
                level.unhighlightMachines()
            },
            onLastSpeechDo: (level) => {
                level.unblockMachines(["typeVariable"])
            },
            speeches: [
                {
                    text: {
                        en: "There is also something new: One of the machines is missing a lock symbol.",
                        de: "Eine neue Sache gibt es aber: Einer der Maschinen fehlt ein Schlosssymbol."
                    }
                },
                {
                    text: {
                        en: "This means that its preset property (\"sour\") can be changed.",
                        de: "Das bedeutet, dass du ihren initialen Typ (\"sauer\") ändern kannst."
                    }
                },
                {
                    text: {
                        en: "I will guide you through your first time changing a machine type:",
                        de: "Ich werde dich bei deiner ersten Typänderung begleiten:"
                    }
                },
                {
                    text: {
                        en: "Let's see: There is flour on the top belt which is \"powdery\" and \"white\".",
                        de: "Schauen wir mal: Auf dem obersten Laufband haben wir Mehl. Das ist \"weiß\" und \"pudrig\"."
                    }
                },
                {
                    text: {
                        en: "Sugar would be nice here, but that would be sweet...",
                        de: "Hier wäre Zucker angebracht, aber der ist süß..."
                    }
                },
                {
                    text: {
                        en: "Let's try: Please click on the machine that does not show a lock symbol.",
                        de: "Versuchen wirs: Bitte klick auf die Maschine, der das Schlosssymbol fehlt."
                    }
                }
            ],
            nextNodes: [{on: "opened_type_choose_menu", nextNodeId: "opened_chooser"}],
        }, {
            id: "opened_chooser",
            onStartDo: (level) => {
                level.blockMachines()
                level.unblockMachines(["typeVariable"])
                level.highlightMachineIcon("typeVariable", "sweet")
            },
            onEndDo: (level) => {
                level.unhighlightMachineIcons()
                level.unblockMachines()
            },
            speeches: [
                {
                    text: {
                        en: "Marvellous! Now click on the candy icon to select the machine type \"sweet\".",
                        de: "Fantastisch! Nun klicke auf das Bonbon-Symbol, um den Maschinentyp \"süß\" zu wählen"
                    }
                }
            ],
            nextNodes: [{on: "selected_type_sweet", nextNodeId: "selected_sweet"}]
        }, {
            onStartDo: (level) => {
                level.highlightMachineIcon("typeVariable", "sweet")
                level.showSliding({row: 1, column: 2}, {row: 0, column: 2})
            },
            onEndDo: (level) => {
                level.unhighlightMachineIcons()
                level.hideSliding()
            },
            id: "selected_sweet",
            speeches: [
                {
                    text: {
                        en: "Perfect! Now move the sweetening machine onto the flour belt to make sugar.",
                        de: "Perfekt! Jetzt ziehe die Süßungsmaschine auf das Mehllaufband, um Zucker herzustellen."
                    }
                }
            ],
            continuationText: {
                en: "Yep.", de: "Jep."
            },
            nextNodes: [
                {on: "clicked_continuation_button", nextNodeId: END},
                {on: "moved_item_typeVariable_to_0_2", nextNodeId: END}
            ]
        }
    ]
}

export const LAST_WORDS_DAY_4: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {
                    text: {
                        en: "Thanks, I'll go to bed again. I really need to sober up...",
                        de: "Danke, ich werde wieder zu Bett gehen. Ich muss wirklich ausnüchtern..."
                    }
                }
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]

}
export const DIALOG_DAY_5: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Already your fifth day in my bakery. You seem to be enjoying yourself!", de: ""}},
                {text: {en: "Today I'd like you to prepare some Bethmännchen.", de: ""}},
                {text: {en: "You will have to apply everything you've learned so far.", de: ""}},
                {text: {en: "You can do it, good luck!", de: ""}}
            ],
            continuationText: {en: "K.", de: "O.K."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_5: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {
                    text: {
                        en: "I never doubted you for a second!",
                        de: "Ich habe nicht eine Sekunde an dir gezweifelt!"
                    }
                }],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_6: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "You know what I really feel like today?", de: ""}},
                {text: {en: "Punch. I actually come from a very cold place....", de: ""}},
                {
                    text: {
                        en: "After a long day, there was nothing better for me than a delicious cup of hot, steaming Punch.",
                        de: ""
                    }
                },
                {text: {en: "I'll let you get to work then.", de: ""}}
            ],
            continuationText: {en: "Yep.", de: "Jep."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_6: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Ahh, this tastes like home. Thank you!", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_7: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Nice to see you again.", de: ""}},
                {text: {en: "Did you also see the star-filled sky last night?", de: ""}},
                {text: {en: "Really good flying weather.", de: ""}},
                {text: {en: "Well, for planes... not for reindeer... they can't fly...", de: ""}},
                {text: {en: "Inspired by this nightly sight, I want to ask you for Cinnamon Stars today.", de: ""}}
            ],
            continuationText: {en: "Ok.", de: "Ok."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: "node2"}]
        }, {
            id: "node2",
            onStartDo: (level) => level.highlightMachines("Locked"),
            onEndDo: (level) => level.unhighlightMachines(),
            speeches: [
                {text: {en: "This time there is a small change again: Machine positions can be locked.", de: ""}},
                {text: {en: "Such machines are darker and tied to the conveyor belt with iron chains.", de: ""}},
                {text: {en: "You can only change the machines' type in that case.", de: ""}},
                {text: {en: "I am sure you will master the recipe anyway.", de: ""}}
            ],
            continuationText: {en: "Ok.", de: "Ok."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_7: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "You're a real star!", de: ""}},
                {text: {en: "... Yeah, that joke was a bad one...", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_8: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Welcome to Bernd's bakery! ...", de: ""}},
                {text: {en: "Oh it's you! Then let's not waste any more time.", de: ""}},
                {text: {en: "Today Printen are on the agenda. Do not disappoint me!", de: ""}}
            ],
            continuationText: {en: "Sure.", de: "Klar."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_8: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "You've really got it, I've rarely eaten such good Printen.", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_9: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {
                    text: {
                        en: "Tonight when I was walking Rudolph my... my dog, I noticed the beautiful half moon.",
                        de: ""
                    }
                },
                {
                    text: {
                        en: "It made clear to me that today we must devote ourselves to beautiful Vanilla Crescents.",
                        de: ""
                    }
                },
                {text: {en: "I'll keep my fingers crossed for you.", de: ""}}
            ],
            continuationText: {en: "Ok.", de: "Ok."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_9: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "*Munch* ... Really delicious!", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_10: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Glad you're here, we have a lot planned. Have you ever heard of Florentines?", de: ""}},
                {text: {en: "No? I'm sure after today you won't forget them so easily.", de: ""}},
                {text: {en: "There is another innovation I would like to tell you about: Quadruple machines.", de: ""}},
                {text: {en: "They work like other machines, but they affect up to four conveyor belts.", de: ""}},
                {text: {en: "I believe in you!", de: ""}}
            ],
            continuationText: {en: "Ok.", de: "Ok."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_10: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "You would make a good Christmas elf! ... At least I think so...", de: ""}},
                {text: {en: "I... I don't know any Christmas elves. Not one!", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_11: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "I woke up this morning craving Macarons. Why don't we make some today?", de: ""}},
                {text: {en: "For you, this should be a piece of cake. Here's the recipe.", de: ""}}
            ],
            continuationText: {en: "Thanks", de: "Danke"},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_11: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Thank you, you are really a great help to me! ", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_12: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {
                    text: {
                        en: "You know what every baker's nightmare is? Spritz Biscuits. They are so... time consuming.",
                        de: ""
                    }
                },
                {
                    text: {
                        en: "How lucky I am to have you and be able to spend that time on more meaningful things.",
                        de: ""
                    }
                },
                {text: {en: "For example, my bag is in desperate need of mending. So my grocery bag... ", de: ""}},
                {
                    text: {
                        en: "We're not talking about a huge bag that has room for an infinite number of gifts...",
                        de: ""
                    }
                },
                {text: {en: "Such a thing does not exist at all...", de: ""}},
                {
                    text: {
                        en: "Oh! There are now also triple machines. I think these are self-explanatory by now.",
                        de: ""
                    }
                },
                {text: {en: "So, the bakery is yours!", de: ""}}
            ],
            continuationText: {en: "Okay.", de: "Okay."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_12: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "What would I do without you? Thank you!", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_13: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Quiz question: What does Bernd never get enough of around Christmas time?", de: ""}},
                {text: {en: "Bingo, Speculoos! I'm crazy for those. How about you make us some?", de: ""}}
            ],
            continuationText: {en: "Sure.", de: "Klar."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_13: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "You know how to make old Bernd happy.", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_14: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Good to see you! What do you think of Chocolate Cake?", de: ""}},
                {text: {en: "It's actually a funny name, isn't it? But it doesn't matter.", de: ""}},
                {text: {en: "What matters is the taste. And it's incomparable when you follow my recipe.", de: ""}},
                {text: {en: "On your marks... Get set... Go!", de: ""}}
            ],
            continuationText: {en: "Yup.", de: "Jup"},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_14: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "I guess you want to be employee of the month! Keep it up!", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_15: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Today is a very special day: We will make Angel Eyes.", de: ""}},
                {text: {en: "The jam we use for this has a beautiful red color.", de: ""}},
                {text: {en: "Did you know that red is my favorite color? My winter clothes are mostly red.", de: ""}},
                {text: {en: "It really suits me. I'm talking too much again... Good luck today!", de: ""}}
            ],
            continuationText: {en: "Thanks", de: "Danke"},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_15: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Perfect, such a beautiful red!", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_16: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {
                    text: {
                        en: "Black and white, dark and light, evil and good. Have you been naughty or nice this year?...",
                        de: ""
                    }
                },
                {
                    text: {
                        en: "Never mind the question. Today you get to try your hand at making Chess Cookies. Good luck!",
                        de: ""
                    }
                }
            ],
            continuationText: {en: "Ok.", de: "Ok."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_16: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Hmm... the smell of freshly baked cookies. There is nothing better!", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_17: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Greetings! You can be counted on! Let's see, what's on my list today?", de: ""}},
                {
                    text: {
                        en: "Ah, Gingerbread. You've probably noticed that you're up against more conveyor belts.",
                        de: ""
                    }
                },
                {text: {en: "But don't worry, I'm sure you'll master this recipe too. Have fun!", de: ""}}
            ],
            continuationText: {en: "Thanks", de: "Danke"},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_17: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "You have real talent. Keep it up!", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_18: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Day 18 already, how time flies!", de: ""}},
                {text: {en: "Ruprecht my... my household help has asked me for Pfeffernüsse.", de: ""}},
                {text: {en: "We will fulfill this wish today. Grab the ingredients and show me your skills!", de: ""}}
            ],
            continuationText: {en: "Yep.", de: "Jep."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_18: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Fantastic, Ruprecht will be thrilled!", de: "Fantastisch, Ruprecht wird begeistert sein!"}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_19: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Today we're taking a culinary trip to Italy: Panettone is on the list.", de: ""}},
                {text: {en: "Super airy, delicious, highly recommended.", de: ""}},
                {text: {en: "Grab the recipe and get started right away.", de: ""}}
            ],
            continuationText: {en: "Ok.", de: "Ok."},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_19: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Delizioso! ... or something like that.", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_20: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "We are approaching the home straight. Today we are going to bake Bear Paws.", de: ""}},
                {
                    text: {
                        en: "There is one difficulty with this recipe: there are not enough machines for all belts.",
                        de: ""
                    }
                },
                {text: {en: "But if you are fast, you can of course use one machine on several treadmills.", de: ""}},
                {
                    text: {
                        en: "The important thing is that all desired ingredients leave the treadmills at the same time.",
                        de: ""
                    }
                },
                {text: {en: "This will surely be a piece of cake for you!", de: ""}}
            ],
            continuationText: {en: "Mhh.", de: "Mhh"},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_20: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "I knew it! You are great!", de: "Ich wusste es! Du bist großartig!"}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_21: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Glad to see you're still at it. Today we're making Nut Wedges.", de: ""}},
                {
                    text: {
                        en: "Phew - nine ingredients. But as I know you, that won't be an obstacle. Good luck!",
                        de: ""
                    }
                }
            ],
            continuationText: {en: "Sure!", de: "Klar!"},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_21: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Hohoho, you impress me every day anew!", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_22: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "In a few days it will be Christmas! Do you have a fireplace? No?", de: ""}},
                {text: {en: "If you ever buy one, make sure it's nice and roomy.", de: ""}},
                {
                    text: {
                        en: "... I'm thinking of the chimney sweeps. They don't have it easy in their job either.",
                        de: ""
                    }
                },
                {text: {en: "So, now for today's cookies: Walnut Cookies.", de: ""}},
                {text: {en: "I've already put the recipe in the bakery for you. Let's go!", de: ""}}
            ],
            continuationText: {en: "Yeah!", de: "Yeah!"},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_22: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "These are not cookies, this is art!", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_23: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Not much left on our list. Today we'll take care of Dominosteine.", de: ""}},
                {text: {en: "Not the easiest to make but worth it. I trust in your skills!", de: ""}}
            ],
            continuationText: {en: "Cool", de: "Cool"},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_23: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "You did not disappoint me. So tasty!", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

export const DIALOG_DAY_24: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Hello for the last time... ", de: ""}},
                {text: {en: "I must say it makes me a little sad that our time together ends today.", de: ""}},
                {text: {en: "I really had fun testing your skills and experiencing your expertise.", de: ""}},
                {text: {en: "Are you ready for the mother of all Christmas baked goods, the Stollen?", de: ""}},
                {text: {en: "Unfortunately, we have to hurry up a bit, I was about to take a nap.", de: ""}},
                {text: {en: "It's going to be a busy night for me... Don't disappoint me!", de: ""}}
            ],
            continuationText: {en: "Okay", de: "Okay"},
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}

export const LAST_WORDS_DAY_24: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: {en: "Unbelievable, you really did it, I'm impressed!", de: ""}},
                {text: {en: "Maybe this time next year you can help me again?", de: ""}},
                {text: {en: "Thanks again so much and Merry Christmas!", de: ""}}
            ],
            nextNodes: [],
            skippable: true,
            durationUntilAutoClose: 2000,
            onEndDo: async (level) => {
                DIALOG_MANAGER.removeLevel()
                await sleep(1000)
                level.showWinScreen()
            }
        }
    ]
}

// Hints
export const IRON_CHAINS_HINT: DialogConfig = makeHintConfig({
    en: "Gray machines with iron chains are bound to a specific position and cannot be moved.",
    de: ""
})
export const DOUBLE_MACHINES_HINT: DialogConfig = makeHintConfig({
    en: "Double machines involve up to two conveyor belts and apply the same property changes.",
    de: ""
})
export const TRIPLE_MACHINES_HINT: DialogConfig = makeHintConfig({
    en: "Triple machines involve up to three conveyor belts and apply the same property changes.",
    de: ""
})
export const QUADRUPLE_MACHINES_HINT: DialogConfig = makeHintConfig({
    en: "Quadruple machines involve up to four conveyor belts and apply the same property changes.",
    de: ""
})
export const CHANGE_TYPE_HINT: DialogConfig = makeHintConfig({
    en: "Click on machines without a lock icon to change the linked property.",
    de: ""
})
export const TWO_MACHINES_ON_ONE_BELT_HINT: DialogConfig = makeHintConfig({
    en: "In this recipe there is a conveyor belt on which two machines must be placed.",
    de: ""
})
export const MOVE_ORDER_LACK_OF_SPACE_HINT: DialogConfig = makeHintConfig({
    en: "In this recipe, the order in which the machines are moved is very important due to the lack of space.",
    de: ""
}, {en: "Think carefully about which machine you want to move first.", de: ""})
export const BE_FAST_HINT: DialogConfig = makeHintConfig({
    en: "In this recipe, you must be quick and apply a specific single machine to multiple conveyor belts.",
    de: ""
}, {
    en: "Pay attention to the right timing so that the desired ingredients leave the conveyor belts at the same time.",
    de: ""
})
export const NON_TIMING_FIRST_HINT: DialogConfig = makeHintConfig({
    en: "It is advisable to deal with the time independent ingredients first..",
    de: ""
})

function makeHintConfig(...texts: { en: string, de: string }[]): DialogConfig {
    let speeches: { text: { en: string, de: string } }[] = []
    texts.forEach(str => speeches.push({text: str}))
    return {
        nodes: [
            {
                id: "hint",
                speeches: speeches,
                continuationText: {en: "Okay.", de: "Okay."},
                nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
            }
        ]
    }
}






