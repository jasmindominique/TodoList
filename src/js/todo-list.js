console.log("Jasmin's To Do List")
// TodoList is our main class that does everything

class TodoList {
    constructor () {
        console.log('TodoList()')

        // this.$toDoList = document.querySelectorAll(selector) // So that this can me found outside the DOM - Use the "this" property

        this.taskItems = []; //array of items in the list

        // all logic for how things change get kicked off from the constructor
        // or from methods called by the construtor. DOM changes should be
        // restricted to the render() method.

        // sequence of what needs to happen:

        // 1. Set up variables to find where "things" should be stored
       
        //**These are all the elements that you interact with**

         const newToDo = document.querySelector('[name="new-todo"]');  //targeting the input *name field*

         const listCheckbox = document.querySelector('[type="checkbox"]'); //targeting the *checkbox field*

         const listCounter = document.querySelector('.filter-group'); 

         const counter = document.querySelector('.total-items'); //targeting the total *items counter*

         const form = document.querySelector('form');

         let listField = document.querySelector('.todo-list')

         let hideItems = true;

        form.addEventListener('submit', (event)=>{
            event.preventDefault()
        })
        

    //** let hiddenTasks = ?// need a place to store hidden task items

        // 2. hook up listeners to the DOM elements (a.k.a ListItems)
        //**These eventListeners will be connected to the DOM Elements so that they know what to "look" for.**        
        // this.inputName.addEventListener('keyup', this.) //?? run in the child class - will target .new-todo on "keyup" -- "brain swap" - These event listeners need to be called outside, and in the constructor. 
        // this.listCheckbox.addEventListener('toggle', this.) // will toggle the checkbox 
        // 3. setup and manage the list of TodoItems as they are created
        //    3a. setup an array to hold the list of items
         // 4. when a new item is added via 2a.
        //    4a. add that to the array from 3a.
        //    4b. update the count of items
        //    4c. call render()

        //Event listener for new item in todolist

        newToDo.addEventListener('change', ()=>{
         
            const entry = new TodoItem(newToDo.value); // 3
            this.taskItems.push(entry); // 3a this sets up an array for the list of items

            counter.innerHTML=this.taskItems.length; //4b

            this.render(); //5
        })

        //event listener for my checkbox!!
        // my checkbox is attached to hidden items

        listCheckbox.addEventListener('click', ()=>{
            console.log("checkbox was clicked")
            this.entryField = document.createElement('div');

            hideItems = !hideItems;

            if(!hideItems){ //if the item is done ...then
                listField.classList.add('completed-items');
                this.entryField.style.display='block';
            }else{
                listField.classList.remove('completed-items');
                this.entryField.style.display='none';
            }

        // this.entryField = document.createElement('div');

        //     if(this.done){ //if the item is done ...then
        //     this.entryField.style.display = 'block';
        // }else{
        //     this.entryField.style.display = 'none';
        // }

            this.render();
        })

        window.addEventListener('item-updated', this.render)
    }



    render = () => { 
        // update the DOM with any changes for the list
        let finishedItem = document.querySelector('.finished-items');
        // this should be the only method in our TodoList class that modifies
        // DOM values
        let finishItemList = this.taskItems.filter(value =>{
            return value.done
        })

        finishedItem.innerHTML = finishItemList.length;
        // loop over our list of items
        // if the checkbox is checked, only showed uncompleted items
        // otherwise show all items
    }
}

// TodoItem represents an individual todo item in our list
class TodoItem {
    constructor(newToDoValue) {
        console.log('TodoItem()', newToDoValue)

        this.newToDoValue = newToDoValue //-- why did we do this in class??

        // sequence of what needs to happen:
        //weird/possibly correct code??

        // 1. create the necessary DOM markup for this item, e.g. createElement
        //    which would include a DONE button to mark it complete
        // this.listField = document.querySelector('.todoEntry') // this targets the 'New-todo' field in the dom
        this.listField = document.querySelector('.todo-list')


        this.entryField = document.createElement('div');
        // console.log(this.entryField) creating a div so that the items entered in the field have something to go into
        this.button = document.createElement('button'); // creating a button for the form field so that we can enter information
        //console.log(this.button) creating a div so that the items entered in the field have something to go into
        
        this.button.innerHTML = "DONE" //text for the button
        this.entryField.innerHTML = this.newToDoValue //text for the button

        
        // 2. add it to the DOM
        this.listField.appendChild(this.entryField); // adding the new-todo item to the dom
        this.entryField.appendChild(this.button); // adding the button from the div (entry)
        

        // 3. add eventListener for the button for this item

        this.button.addEventListener('click', ()=>{
            console.log('done button is clicked')

            this.done=!this.done;

            this.render();

                window.dispatchEvent(new Event('item-updated'))
        }) 

        //how do we write this?

        // 4. setup a variable to keep track of if this item is complete or not (true/false)
        // this.complete = false
    }

    render = () => {
        // update the DOM with any changes for this item
        
        if(this.done){ //if the item is done ...then
            this.entryField.style.background = 'grey';
            this.button.innerHTML = "UNDO";
        }else{
            this.entryField.style.background = 'white';
            this.button.innerHTML = "DONE";
        }

        // if(this.done){ //if the item is done ...then
        //     this.entryField.style.background = 'grey';
        //     this.button.innerHTML = "DONE";
        // }else{
        //     this.entryField.style.display = 'block';
        //     this.button.innerHTML = "UNDO";
        // }


        // if(this.done){
        //     this.style.display = "none";
        //     this.button.innerHTML = "DONE";
        // }else{
        //     this.style.display = "none";
        //     this.button.innerHTML = "UNDO";
        // }

        // modify the DOM elements to reflect whether this item is complete or not
        // Style-wise: a completed item should have a strike-through over it, and
        // the button label should change from 'Done' to 'Undo' to allow toggling
        // it back
    }
}



// this.entryField.innerHTML = ""

    //     if ( this.entryField === ""){
    //     return;
    // }