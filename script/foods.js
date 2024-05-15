/**
 * FOODS.JS
 * Contains all food-related functionality.
 * @author: Jaedon Braun
 */

/** Array of all food names. */
let foodNames = ["sandwich", "pear", "banana", "pineapple", "peach", "apple",
"watermelon", "cherry", "orange", "cinnamon roll", "t-bone steak", "beer", "milk",
"cup", "mug", "wine", "cocktail", "cheese", "green pepper", "orange juice", "roast beef",
"waffle", "long john", "bread loaf", "croissant", "pie", "pancake", "pretzel", "pea",
"martini", "turkey", "ice cream sandwich", "jam toast", "cucumber", "radish", "carrot",
"mashed potato", "english muffin", "popsicle", "coke", "prune", "eggplant", "ice cream cone",
"spaghetti", "soup", "mushroom", "chocolate bar", "cookie", "onion", "bbq sauce", "ginger",
"burger", "cupcake", "corn", "club sandwich", "hotdog", "broccoli", "drumstick", "garlic",
"peanut", "squash", "ham", "turnip", "pizza", "avacodo", "egg", "portabello mushroom",
"cabbage", "chocolate popsicle", "cauliflower", "blueberry muffin", "rocket popsicles",
"tomato", "cake slice", "kiwi", "lettuce wrap", "chocolate donut", "lemon", "pumpkin",
"potato", "crepe", "taco", "steak", "bacon", "grape", "strawberry", "ice cream sundae",
"shrimp", "french fry", "salad roll", "candy", "burrito", "lollipop", "pink lemonade",
"olives", "lobster", "toast", "white radish", "bok choy", "chili pepper"];


/**
 * Current shopping list.
 * Will be populated with Food objects.
 */
let list = [];

/**
 * FOOD OBJECT
 */
class Food {

    /**
     * Creates a Food instance.
     * @constructor
     * @param {number} value Index of image and value to use for this Food.
     */
    constructor(value) {
        this.name = foodNames[value];
        this.value = value;
        this.isCollected = false;
    }

    /**
     * Check if this Food has been collected.
     * @return isCollected
     */
    getCollected() {
        return this.isCollected;
    }

    /**
     * Sets isCollected to true. (Food cannot be un-collected)
     */
    setCollected() {
        this.isCollected = true;
    }

    /**
     * Get the value of this food.
     * @return value
     */
    getValue() {
        return this.value;
    }

    /**
     * Get the name of this food.
     * @return name
     */
    getName() {
        return this.name;
    }
}

/**
 * Populates the shopping list with random food items.
 * CALL ON GAME START/RESTART!!
 */
function initList(newLength) {
    for (let i = 0; i < newLength; i++) {

        let newItem = i
        let itemAlreadyContained = true;

        do {
            // Generate a random (valid) item index.
            newItem = i;
            // Assume this random item isn't already on the list.
            itemAlreadyContained = false;

            // Iterate through the list to make sure it's not already there.
            for (let j = 0; j < list.length; j++) {
                if (list[j] == newItem) {
                    itemAlreadyContained = true;
                    break;
                }
            }
        } while (itemAlreadyContained);

        // Since we broke the "is already on the list" loop, the item can be added.
        list[i] = new Food(newItem);
        let listHTML = "<li>" + list[i].getName() + "</li>";
        document.getElementById("list").innerHTML += listHTML;
    }
}

/**
 * Behavior when the player touches a shelf.
 * @param {Food} shelfFood Food attached to the shelf that was touched.
 * @returns true if the Food is on the list.
 */
function CheckList(shelfFood) {
    let isOnList = false;
    for (let i = 0; i < list.length; i++) {
        // Check if Food on shelf is on the shopping list, and has not already been collected.
        if (list[i].getValue() == shelfFood.getValue() && !list[i].getCollected()) {
            UpdateList(i);
            isOnList = true;
            break;
        }
    }
    return isOnList;
}

/**
 * Crosses an item off the shopping list.
 * @param {number} index Index of item to cross off of the list.
 */
function UpdateList(index) {
    list[index].setCollected();

    // Cross off item on HTML list.
    let listHTML = document.getElementById("list").children;
    listHTML[index].className = "crossedOff";

    // Repeats back your shopping list. Remove after debugging.
    let uncrossedEntries = 0;
    for (let i = 0; i < list.length; i++) {
        if (list[i].getCollected()) {
            uncrossedEntries++;
        }
    }

    if (uncrossedEntries == list.length) {
        win();
    }
}