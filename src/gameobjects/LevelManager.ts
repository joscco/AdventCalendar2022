// Klasse zur Levelverwaltung, d.h.
// -> Initialisierung des Gitters und der Laufbänder durch einen Setup-Array
// -> Initialisierung der Rezept-Box
// -> Initialisierung der Maschinen-Box
// -> Einbinden des UI-Overlays
// -> Einbinden des Win-Screens
// -> Aufruf der Step()-Function
// -> Stoppen und Darstellung des Win-Screens, wenn geschafft

import {Recipe, RecipeBox} from "./RecipeBox";
import {Machine} from "./Machinery/Machine";
import {Grid} from "./Grid/Grid";

export class LevelManager {

    machineInventoryGrid? : Grid;
    machineUsageGrid? : Grid;
    beltGrid? : Grid;
    recipeBox;

    constructor(conveyorBeltPattern: string[][], recipe: Recipe, machines: Machine[]) {
        this.recipeBox = new RecipeBox(recipe)
    }
}