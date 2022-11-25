import {DialogConfig, END} from "../../gameobjects/Dialog/Dialogs/DialogConfig";
import {sleep} from "../../General/Helpers";
import {DIALOG_MANAGER, MUSIC_BUTTON, SOUND_BUTTON} from "../../index";

export const DIALOG_DAY_1: DialogConfig = {
    nodes: [
        {
            id: "start",
            onStartDo: (level) => level.blockMachines(),
            onEndDo: (level) => level.unblockMachines(),
            speeches: [
                {text: "Oh hello! My name is Bernd and I am the owner of this small Christmas bakery."},
                {text: "It's nice that you responded to my advertisement, I really need your help urgently..."},
                {text: "Short and sweet: 24 different recipes have to be made until Christmas - it's family tradition."},
                {text: "However, this year I've lost track of time a bit and am running late."},
                {text: "Curse that Netflix and its constant supply of high quality and addictive series..."},
                {text: "Well anyway... Your first recipe is Santa's Milk. Let's start, shall we?"},
            ],
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: "agreedToTakePart"}],
            continuationText: "Yes!"
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
                {text: "Splendid! Look at all these conveyor belts. New ingredients are constantly being produced here."},
                {text: "Each ingredient has three properties: Taste, Consistency and Color."},
                {text: "Your task is to change these properties so that the required ingredients are created."},
                {text: "Let me show you what I mean by that..."}],
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: "wantsADemonstration"}],
            continuationText: "Yep."
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
                {text: "The gray block with the drop symbol is a machine. A liquifyer to be precise."},
                {text: "Machines come in all different types and shapes and are here to change your ingredients."},
                {text: "If you place this machine on a conveyor belt it will turns all ingredients passing it into liquid."},
                {text: "Try it yourself by dragging the liquifying machine on the honey belt."}],
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
                {text: "Yes, very good!! Your machine turned the sticky honey into LIQUID vanilla milk."},
                {text: "You see: You can use machines to alter the ingredients you're given."},
                {text: "Your task is to move the machines around and find their perfect position."},
                {text: "Start and end fields of conveyor belts are blocked for this purpose."}],
            continuationText: "Okay.",
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
            speeches: [{text: "Great! You can see which ingredients you need on the recipe list to your left."},
                {text: "Only if all these ingredients leave the conveyor belts simultaneously, a recipe is complete."},
                {text: "I'm sure you can find out how to complete this recipe by yourself. Give it a try!"}],
            continuationText: "Ok.",
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
            speeches: [{text: "Oh... One thing before you start... I always like to listen to music while baking."},
                {text: "If you prefer silence, you can turn the music off by clicking on the musical note icon on the top left."},
                {text: "Sound effects are turned off via the speaker icon next to it."}
            ],
            continuationText: "Thanks",
            nextNodes: [{on: "clicked_continuation_button", nextNodeId: END}]
        }
    ]
}
export const HINT_DAY_1: DialogConfig = {
    nodes: [
        {
            id: "hint1",
            speeches: [{text: "Try pulling the machine onto the cream conveyor belt."}],
            nextNodes: [],
            durationUntilAutoClose: 5000,
            skippable: true
        }
    ]
}

export const LAST_WORDS_DAY_1: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Perfect, the milk looks delicious and I'm sure it will taste great!"},
                {text: "I mean, it's for Santa, so I'll never know. Not for me. I'm just a baker."}],
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
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Hello, nice to have you back!"},
                {text: "Today's task will be a little more difficult, I need you to make Flake Nests."},
                {text: "Basically it works the same as yesterday, but there is one new special feature:"},
                {text: "You can see a brown block between the conveyor belts. Blocks are basically walls."},
                {text: "You can't place any machines on them and and you can't pass them."},
                {text: "By the way: Whenever you discover a new ingredient, an entry is added to your recipe book."},
                {text: "You can always open it and if you get stuck. Let's see, a few should already be noted..."},
                {text: "Open the book at the bottom left, please."}],
            nextNodes: [{on: "clicked_ingredient_cookbook", nextNodeId: "clicked_cookbook"}],
        }, {
            id: "clicked_cookbook",
            speeches: [
                {text: "There is enough space here to be filled with ingredient properties!"},
                {text: "Once you've collected enough entries, you can also scroll up and down using the red bookmark."},
                {text: "You can now close the book by clicking on the red X on its top left."}],
            nextNodes: [{on: "closed_ingredient_cookbook", nextNodeId: "closed_cookbook"}]
        }, {
            id: "closed_cookbook",
            speeches: [
                {text: "You can always ask me for a hint by clicking on the Bernd icon at the bottom left."},
                {text: "It will appear once I stop talking. But don't expect too much, I'm a busy man."},
                {text: "Alright, let's get started!"},
            ],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}
export const HINT_DAY_2: DialogConfig = {
    nodes: [
        {
            id: "hint1",
            speeches: [{text: "Place one machine per conveyor belt and it should fit."}],
            nextNodes: [],
            durationUntilAutoClose: 5000,
            skippable: true
        }
    ]
}

export const LAST_WORDS_DAY_2: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Ever thought about a career as a Christmas baker?"},
                {text: "I'm going to treat myself with another one of your Flake Nests."}],
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
                {text: "Yaaaaawn... Sorry, I'm a bit tired today..."},
                {text: "That might be because I was busy wrapping gifts all night... Anyway."},
                {text: "Glad you're back! Butter Cookies are on the menu today. Real classics!"},
                {text: "See those machines? They're a little wider than the ones you've been using before."},
                {text: "With these cuties, you can affect two conveyor belts at once."},
                {text: "Remember, though, that they apply the same change on both conveyor belts."},
                {text: "Let's see what you can do!"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_3: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "You are a natural - keep it up!"}],
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
            speeches: [
                {text: "Gosh, do I have a hangover... Who came up with Mulled Wine?"},
                {text: "I still feel tipsy... I guess my sleigh... err... car will remain unmoved today."},
                {text: "By the by, I'd like to ask you to make me some rum truffles today."},
                {text: "There is also something new: One of the machines is missing a lock symbol."},
                {text: "This means that its preset property (\"sour\") can be changed."},
                {text: "I will guide you through your first time changing a machine type:"},
                {text: "Let's see: There is flour on the top belt which is \"powdery\" and \"white\"."},
                {text: "If you set the machine type to \"sweet\", it should turn the flour into sugar."},
                {text: "Let's try: Please click on the machine that does not show a lock symbol."}],
            nextNodes: [{on: "opened_type_choose_menu", nextNodeId: "opened_chooser"}],
        }, {
            id: "opened_chooser",
            speeches: [
                {text: "Marvellous! Now click on the candy icon to select the machine type \"sweet\"."}],
            nextNodes: [{on: "selected_type_sweet", nextNodeId: "selected_sweet"}]
        }, {
            id: "selected_sweet",
            speeches: [
                {text: "Perfect! Now move the sweetening machine to the flour belt to finish the recipe."},
            ],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_4: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Thanks, I'll hit the sack again. I really need to sober up."}],
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
                {text: "Already your fifth day in my bakery. You seem to be enjoying yourself!"},
                {text: "Today I'd like to ask you to make Bethmännchen."},
                {text: "You will have to apply everything you've learned so far."},
                {text: "You can do it, good luck!"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_5: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "I never doubted you for a second!"}],
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
                {text: "You know what I really feel like today?"},
                {text: "Punch."},
                {text: "I actually come from a very cold place...."},
                {text: "After a long day, there was nothing better for me than a delicious cup of hot, steaming Punch."},
                {text: "I'll let you get to work then."}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_6: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Ahh, this tastes like home. Thanks for this!"}],
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
                {text: "Nice to see you again."},
                {text: "Did you also see the star-filled sky last night?"},
                {text: "Really good flying weather."},
                {text: "Well, for planes... not for reindeer... they can't fly..."},
                {text: "Inspired by this nightly sight, I want to ask you for Cinnamon Stars today."},
                {text: "This time there is a small change again:"},
                {text: "Machines can be fixed in their position."},
                {text: "Such machines are darker and tied to the conveyor belt with iron chains."},
                {text: "You can only change the property in that case."},
                {text: "I am sure you will master the recipe anyway."}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_7: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "You're a real star!"},
                {text: "... Yeah, that joke was a bad one..."}],
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
                {text: "Welcome to Bernd's bakery! ..."},
                {text: "Oh it's you! Then let's not waste any more time."},
                {text: "Today Printen are on the agenda. Do not disappoint me! *wink*"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_8: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "You've really got it, I've rarely eaten such good Printen."}],
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
                {text: "Tonight when I was walking Rudolph my... my dog, I noticed the beautiful half moon."},
                {text: "It made clear to me that today we must devote ourselves to beautiful Vanilla Crescents."},
                {text: "I'll keep my fingers crossed for you."}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_9: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "*Munch* ... Really delicious!"}],
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
                {text: "Glad you're here, we have a lot planned. Have you ever heard of Florentines?"},
                {text: "No? I'm sure after today you won't forget them so easily."},
                {text: "There is another innovation I would like to tell you about: Quadruple machines."},
                {text: "They work like other machines, but they affect up to four conveyor belts."},
                {text: "I believe in you!"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_10: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "You would make a good Christmas elf! ... At least I think so..."},
                {text: "I... I don't know any Christmas elves. Not one!"}],
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
                {text: "I woke up this morning craving Macarons. Why don't we make some today?"},
                {text: "For you, this should be a piece of cake. Here's the recipe."}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_11: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Thank you, you are really a great help to me! "}],
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
                {text: "You know what every baker's nightmare is? Spritz Biscuits. They are so... time consuming."},
                {text: "How lucky I am to have you and be able to spend that time on more meaningful things."},
                {text: "For example, my bag is in desperate need of mending. So my grocery bag... "},
                {text: "We're not talking about a huge bag that has room for an infinite number of gifts... "},
                {text: "Such a thing does not exist at all..."},
                {text: "Oh! There are now also triple machines. I think these are self-explanatory by now."},
                {text: "So, the bakery is yours!"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_12: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "What would I do without you? Thank you!"}],
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
                {text: "Quiz question: What does Bernd never get enough of around Christmas time?"},
                {text: "Bingo, Speculoos! I'm crazy for those. How about you make us some?"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_13: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "You know how to make old Bernd happy."}],
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
                {text: "Good to see you! What do you think of Chocolate Cake?"},
                {text: "It's actually a funny name, isn't it? But it doesn't matter."},
                {text: "What matters is the taste. And it's incomparable when you follow my recipe."},
                {text: "On your marks... Get set... Go!"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_14: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "I guess you want to be employee of the month! Keep it up!"}],
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
                {text: "Today is a very special day: We will make Angel Eyes."},
                {text: "The jam we use for this has a beautiful red color."},
                {text: "Did you know that red is my favorite color? My winter clothes are mostly red."},
                {text: "It really suits me. I'm talking too much again... Good luck today!"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_15: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Perfect, such a beautiful red!"}],
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
                {text: "Black and white, dark and light, evil and good. Have you been naughty or nice this year?..."},
                {text: "Never mind the question. Today you get to try your hand at making Chess Cookies. Good luck!"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_16: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Hmm... the smell of freshly baked cookies. There is nothing better!"}],
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
                {text: "Greetings! You can be counted on! Let's see, what's on my list today? "},
                {text: "Ah, Gingerbread. You've probably noticed that you're up against more conveyor belts."},
                {text: "But don't worry, I'm sure you'll master this recipe too. Have fun!"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_17: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "You have real talent. Keep it up!"}],
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
                {text: "Day 18 already, how time flies!"},
                {text: "Ruprecht my... my household help has asked me for Pfeffernüsse."},
                {text: "We will fulfill this wish today. Grab the ingredients and show me your skills!"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_18: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Fantastic, Ruprecht will be thrilled!"}],
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
                {text: "Today we're taking a culinary trip to Italy: Panettone is on the list."},
                {text: "Super airy, delicious, highly recommended."},
                {text: "Grab the recipe and get started right away."}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_19: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Delizioso! ... or something like that."}],
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
                {text: "We are approaching the home stretch. Today we are going to bake Bear Paws."},
                {text: "There is one difficulty with this recipe: there are not enough machines for all belts."},
                {text: "But if you are fast, you can of course use one machine on several treadmills."},
                {text: "The important thing is that all desired ingredients leave the treadmills at the same time."},
                {text: "This will surely be a piece of cake for you!"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_20: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "I knew it! You are great!"}],
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
                {text: "Glad to see you're still at it. Today we're making Nut Wedges."},
                {text: "Uff - nine ingredients. But as I know you, that won't be an obstacle. Good luck!"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_21: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Hohoho, you impress me every day anew!"}],
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
                {text: "In a few days it will be Christmas! Do you have a fireplace? No? "},
                {text: "If you ever buy one, make sure it's nice and roomy."},
                {text: "... I'm thinking of the chimney sweeps. They don't have it easy in their job either."},
                {text: "So, now for today's cookies: Walnut Cookies. "},
                {text: "I've already put the recipe in the bakery for you. Let's go!"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_22: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "These are not cookies, this is art!"}],
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
                {text: "Not much left on our list. Today we take care of Dominosteine."},
                {text: "Not the easiest to make but worth it. I trust in your skills!"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_23: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "You did not disappoint me. So tasty!"}],
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
                {text: "Hello for the last time... "},
                {text: "I must say it makes me a little sad that our time together ends today."},
                {text: "I really had fun testing your skills and experiencing your expertise."},
                {text: "Are you ready for the mother of all Christmas Baked Goods, the Stollen?"},
                {text: "Unfortunately, we have to hurry up a bit, I was about to take a nap."},
                {text: "It's going to be a busy night for me... Don't disappoint me!"}],
            durationUntilAutoClose: 2000,
            nextNodes: []
        }
    ]
}

export const LAST_WORDS_DAY_24: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Unbelievable, you really did it, I'm impressed!"},
                {text: "Maybe this time next year you can help again?"},
                {text: "Thanks again and Merry Christmas!"}],
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
export const IRON_CHAINS_HINT: DialogConfig = makeHintConfig("Gray machines with iron chains are bound to a specific position and cannot be moved.")
export const DOUBLE_MACHINES_HINT: DialogConfig = makeHintConfig("Double machines involve up to two conveyor belts and apply the same property changes.")
export const TRIPLE_MACHINES_HINT: DialogConfig = makeHintConfig("Triple machines involve up to three conveyor belts and apply the same property changes.")
export const QUADRUPLE_MACHINES_HINT: DialogConfig = makeHintConfig("Quadruple machines involve up to four conveyor belts and apply the same property changes.")
export const CHANGE_TYPE_HINT: DialogConfig = makeHintConfig("Click on machines without a lock icon to change the linked property.")
export const TWO_MACHINES_ON_ONE_BELT_HINT: DialogConfig = makeHintConfig("In this recipe there is a conveyor belt on which two machines must be placed.")
export const MOVE_ORDER_LACK_OF_SPACE_HINT: DialogConfig = makeHintConfig("In this recipe, the order in which the machines are moved is very important due to the lack of space.", "Think carefully about which machine you want to move first.")
export const BE_FAST_HINT: DialogConfig = makeHintConfig("In this recipe, you must be quick and apply a specific single machine to multiple conveyor belts.", "Pay attention to the right timing so that the desired ingredients leave the conveyor belts at the same time.")
export const NON_TIMING_FIRST_HINT: DialogConfig = makeHintConfig("It is advisable to finish the non-time-dependant ingredients first.")

function makeHintConfig(...texts: string[]): DialogConfig {
    let speeches: { text: string }[] = []
    texts.forEach(str => speeches.push({text: str}))
    return {
        nodes: [
            {
                id: "hint",
                speeches: speeches,
                nextNodes: [],
                durationUntilAutoClose: 5000,
                skippable: true
            }
        ]
    }
}






