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
                {text: "Let's start with the first recipe: Santa's milk."},
                {text: "See the treadmills? New ingredients are always being delivered here."},
                {text: "Each ingredient has three properties: taste, consistency and color."},
                {text: "Your task is to change these components so that the required ingredients are created."},
                {text: "You can see which ingredients you need on the recipe list on the left."},
                {text: "Only if all these ingredients leave the conveyor belts simultaneously, a recipe is complete."},
                {text: "One thing before we start: I always like to listen to music while baking."},
                {text: "If you prefer silence, you can turn the music off by clicking on the note icon in the upper left."},
                {text: "So, let's get started. What? How do you change the properties, you ask?"},
                {text: "Machines! These can influence taste, consistency or color when placed on a conveyor belt."},
                {text: "Start and end fields are blocked for this purpose. Let's take a look at the example for Santa's milk."},
                {text: "You need honey and milk. The honey is already there and does not need to be changed."},
                {text: "However, we cannot use the cream. Cream is \"neutral\", \"sticky\" and \"white\"."},
                {text: "Fortunately, you already have a liquifier machine between the treadmills."},
                {text: "If you now drag it onto the cream conveyor, the cream will turn to liquid milk. Try it yourself!"}
            ],
            durationUntilAutoClose: 2000,
            successors: []
        }
    ]
}
export const HINTS_DAY_1: DialogConfig = {
    nodes: [
        {
            id: "hint1",
            speeches: [{text: "Try pulling the machine onto the cream treadmill."}],
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
                {text: "Santa Claus, that is. Not me. I'm just a baker."}],
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
                {text: "Today it will be a little more difficult, I need you to make chocolate crossies."},
                {text: "Basically it works the same as yesterday, but there is one special feature:"},
                {text: "There is a block between the treadmills. Blocks are basically walls."},
                {text: "You can't place machines on them and and can't pass them."},
                {text: "You don't have to change the properties of the machines yourself today either."},
                {text: "Don't worry, that will come soon enough..."},
                {text: "Bye the way:"},
                {text: "Whenever you discover a new ingredient, an entry is added to your recipe book."},
                {text: "You can always look there if you get stuck. Let's see, honey and cream should already be noted."},
                {text: "Open the book at the bottom left."}],
            successors: [{on: "clicked_ingredient_cookbook", nextID: "clicked_cookbook"}],
        }, {
            id: "clicked_cookbook",
            speeches: [
                {text: "There is enough space here to be filled with recipes!"},
                {text: "Once you've collected a few entries, you can also scroll up and down using the bookmark."},
                {text: "You can now close the book by clicking on the red X."}],
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
export const HINTS_DAY_2: DialogConfig = {
    nodes: [
        {
            id: "hint1",
            speeches: [{text: "Place one machine per treadmill and it should fit."}],
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
                {text: " I'm going to treat myself to another one of your cookies."}],
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






