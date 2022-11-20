import {DialogConfig} from "../../gameobjects/Dialog/Dialogs/DialogConfig";
import {sleep} from "../../General/Helpers";
import {DIALOG_MANAGER} from "../../index";

export const DIALOG_DAY_1: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Oh hello! My name is Bernd and I am the owner of this small Christmas bakery."},
                {text: "It's nice that you responded to my advertisement, I need your help urgently."},
                {text: "Short and sweet: 24 different recipes have to be made until Christmas - it's family tradition."},
                {text: "However, this year I've lost track of time a bit and am running late."},
                {text: "Curse that Netflix and its constant supply of high quality and addictive series..."},
                {text: "Let's start with the first recipe: Santa's Milk."},
                {text: "See these conveyor belts? New ingredients are always being delivered here."},
                {text: "Each ingredient has three properties: taste, consistency and color."},
                {text: "Your task is to change these properties so that the required ingredients are created."},
                {text: "You can see which ingredients you need on the recipe list to your left."},
                {text: "Only if all these ingredients leave the conveyor belts simultaneously, a recipe is complete."},
                {text: "One thing before we start: I always like to listen to music while baking."},
                {text: "If you prefer silence, you can turn the music off by clicking on the note icon in the upper left."},
                {text: "So, let's get started. You can use machines to change the properties of given ingredients."},
                {text: "These machines can influence taste, consistency or color when placed on a conveyor belt."},
                {text: "Start and end fields are blocked for this purpose. So: What do we need for Santa's Milk?"},
                {text: "Honey and Milk that is. The honey is already there and does not need to be changed."},
                {text: "However, the cream belt seems to be wrong. Cream is \"neutral\", \"sticky\" and \"white\"."},
                {text: "Fortunately, you already have a liquifiying machine on the grid."},
                {text: "If you drag it onto the cream conveyor belt, the cream will turn to liquid milk. Try it yourself!"}
            ],
            durationUntilAutoClose: 2000,
            successors: []
        }
    ]
}
export const HINT_DAY_1: DialogConfig = {
    nodes: [
        {
            id: "hint1",
            speeches: [{text: "Try pulling the machine onto the cream conveyor belt."}],
            successors: [],
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
                {text: "I mean, it's for Santa, so I'll never no. Not for me. I'm just a baker."}],
            successors: [],
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
                {text: "Bye the way:"},
                {text: "Whenever you discover a new ingredient, an entry is added to your recipe book."},
                {text: "You can always open it and if you get stuck. Let's see, a few should already be noted..."},
                {text: "Open the book at the bottom left, please."}],
            successors: [{on: "clicked_ingredient_cookbook", nextID: "clicked_cookbook"}],
        }, {
            id: "clicked_cookbook",
            speeches: [
                {text: "There is enough space here to be filled with ingredient properties!"},
                {text: "Once you've collected enough entries, you can also scroll up and down using the red bookmark."},
                {text: "You can now close the book by clicking on the red X on its top left."}],
            successors: [{on: "closed_ingredient_cookbook", nextID: "closed_cookbook"}]
        }, {
            id: "closed_cookbook",
            speeches: [
                {text: "You can always ask me for a hint by clicking on the Bernd icon at the bottom left."},
                {text: "It will appear once I stop talking. But don't expect too much, I'm a busy man."},
                {text: "Alright, let's get started!"},
            ],
            durationUntilAutoClose: 2000,
            successors: []
        }
    ]
}
export const HINT_DAY_2: DialogConfig = {
    nodes: [
        {
            id: "hint1",
            speeches: [{text: "Place one machine per conveyor belt and it should fit."}],
            successors: [],
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
                {text: "I'm going to treat myself with another one of your cookies."}],
            successors: [],
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
                {text: "*Yawn* Sorry, I'm a bit tired today..."},
                {text: "That might come from wrapping all these gifts until late in the night... Anyway."},
                {text: "Glad you're back! Shortbread cookies are on the menu today. Real classics!"},
                {text: "See those machines? They're a little wider than the ones you've been using."},
                {text: "With these cuties, you can affect two conveyor belts at once."},
                {text: "Remember, though, that they apply the same changes on both conveyor belts."},
                {text: "Let's see what you can do!"}],
            durationUntilAutoClose: 2000,
            successors: []
        }
    ]
}

export const LAST_WORDS_DAY_3: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "You are a natural - keep it up!"}],
            successors: [],
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
                {text: "Man do I have a hangover... Who came up with the mulled wine?"},
                {text: "I still feel tipsy... I guess my sleigh... err... car will have to stop today."},
                {text: "Apropos, I'd like to ask you to make rum truffles today."},
                {text: "There is also something new today: one of the machines is missing the lock symbol."},
                {text: "This means that the preset property can be changed."},
                {text: "I will guide you during the first time changing a machine type:"},
                {text: "Please click on the machine that does not show a lock symbol."}],
            successors: [{on: "opened_type_choose_menu", nextID: "opened_chooser"}],
        }, {
            id: "opened_chooser",
            speeches: [
                {text: "Marvellous! You can now see all types you can set the machine too."},
                {text: "Let's see, what do we need...?"},
                {text: "We have Flour on the top belt which has is \"powdery\", \"white\" and \"neutral\"."},
                {text: "If you set the machine type to \"sweet\", it should turn the flour into nice powdery sugar."},
                {text: "Please click on candy icon to select the machine type \"sweet\"."}],
            successors: [{on: "selected_type_sweet", nextID: "selected_sweet"}]
        }, {
            id: "selected_sweet",
            speeches: [
                {text: "Now move the machine to the flour conveyor belt and finish the recipe."},
            ],
            durationUntilAutoClose: 2000,
            successors: []
        }
    ]
}

export const LAST_WORDS_DAY_4: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Thanks, I'll hit the sack again. I really need to sober up."}],
            successors: [],
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
            successors: []
        }
    ]
}

export const LAST_WORDS_DAY_5: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "I never doubted you for a second!"}],
            successors: [],
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
                {text: "After a long day, there was nothing better for me than a delicious cup of hot, steaming punch."},
                {text: "I'll let you get to work then."}],
            durationUntilAutoClose: 2000,
            successors: []
        }
    ]
}

export const LAST_WORDS_DAY_6: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "Ahh, this tastes like home. Thanks for this!"}],
            successors: [],
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
                {text: "Did you also see the starry sky last night?"},
                {text: "Really good flying weather."},
                {text: "Well, for planes, not for reindeer, they can't fly *hehe*."},
                {text: "Inspired by this nightly sight, I want to ask you for cinnamon stars today."},
                {text: "This time there is a small change again:"},
                {text: "Machines can be fixed in their position."},
                {text: "Such machines are gray and tied to the conveyor belt with iron chains."},
                {text: "You can only change the property in that case."},
                {text: "I am sure you will master the recipe anyway."}],
            durationUntilAutoClose: 2000,
            successors: []
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
            successors: [],
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
                {text: "Today Printen are on the agenda. Do not disappoint me *wink*."}],
            durationUntilAutoClose: 2000,
            successors: []
        }
    ]
}

export const LAST_WORDS_DAY_8: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "You've really got it, I've rarely eaten such good Printen."}],
            successors: [],
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
                {text: "It was immediately clear to me that today we will devote ourselves to beautiful, half-moon vanilla crescents."},
                {text: "I keep my fingers crossed for you."}],
            durationUntilAutoClose: 2000,
            successors: []
        }
    ]
}

export const LAST_WORDS_DAY_9: DialogConfig = {
    nodes: [
        {
            id: "start",
            speeches: [
                {text: "*Munch* Really delicious!"}],
            successors: [],
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
export const DUAL_MACHINES_HINT: DialogConfig = makeHintConfig("Dual machines involve up to two conveyor belts and apply the same property changes.")
export const CHANGE_TYPE_HINT: DialogConfig = makeHintConfig("Click on machines without a lock icon to change the linked property.")
export const TWO_MACHINES_ON_ONE_BELT_HINT: DialogConfig = makeHintConfig("In this recipe there is a conveyor belt on which two machines must be placed.")
export const MOVE_ORDER_LACK_OF_SPACE_HINT: DialogConfig = makeHintConfig("In this recipe, the order in which the machines are moved is very important due to the lack of space.", "Think carefully about which machine you want to move first.")

function makeHintConfig(...texts: string[]): DialogConfig {
    let speeches: { text: string }[] = []
    texts.forEach(str => speeches.push({text: str}))
    return {
        nodes: [
            {
                id: "hint",
                speeches: speeches,
                successors: [],
                durationUntilAutoClose: 5000,
                skippable: true
            }
        ]
    }
}






