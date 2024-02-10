// I've always wanted to make an app for secret santa, make things easy for long distance family thats going
//to be gathering, or for the workplace.

//All apps need a menu, this seems like a good place to start in my mind.
//First option is to join and then be able to view the Secret Santa made for your family or workplace, etc.
//I will call these workshops, everyone can belong to multiple.
//You want to be able to see the different parties in easily, join more, leave, or even begin one.
class Menu { 
    constructor() {
    this.workshop = [];
    this.selectedWorkshop = null; 
    }
    
    startMenuSelections() {
    return prompt(`
    0 - Exit Menu
    1 - Create a New Workshop
    2 - View a Workshop
    3 - Display All Your Workshops
    4 - Delete a Workshop
    `);
    }
    //Now we add a second menu, once you've selected the workshop to add or delete individuals.
    showWorkshopOptions(workshopInfo) {
    return prompt(`
    0 - Go Back
    1 - Add a New Secret Santa
    2 - Delete a Secret Santa
    -----------------
    ${workshopInfo}
    `);
    }
    start() { 
        let selection = this.startMenuSelections(); 
        while (selection != 0) {
        switch(selection) {
        case '1' :
        this.createWorkshop();
        break;
        case '2' :
        this.viewWorkshop();
        break;
        case '3' :
        this.deleteWorkshop();
        break;
        case '4' :
        this.displayWorkshop();
        break;
        default:
        selection = 0;
        }
        selection = this.startMenuSelections();
        }
        alert('Goodbye!');
        }
        
    
    //Now we make sure the options from our menu have some substance to actually do something within the code.
    createWorkshop() {
        let name = prompt('Name your workshop: ');
        this.workshop.push(new Workshop(name));
        }

    viewWorkshop() {
        let index = prompt("Enter the index of the workshop you want to view:");
        if (index > -1 && index < this.workshop.length) {
        this.selectedWorkshop = this.workshop[index];
        let description = 'Workshop: ' + this.selectedWorkshop.name + '\n';
        description += ' ' + this.selectedWorkshop.describe() + '\n ';
        for (let i = 0; i < this.selectedWorkshop.players.length; i++) {
        description += i + ') ' + this.selectedWorkshop.players[i].describe() + '\n';
        }
        //This view should have secondary options within it. Opens a second menu to enter single person 
        //data within a particular workshop. Should tie in to the second class menu eventually.
        let selection1 = this.showWorkshopOptions(description);
        switch (selection1) {
        case '1' :
        this.createElf();
        break;
        case '2' :
        this.deleteElf();
        }
        } 
        }

    displayWorkshop() {
    let workshopString = '';
    for (let i = 0; i < this.workshop.length; i++) {
    workshopString += i+ ' - ' + this.workshop[i].name + '\n';
    }
    alert(workshopString);
    }
    
    deleteTeam() {
    let index = prompt('Enter the index number of the workshop you wish to delete: ');
    if (index > -1 && index < this.teams.length) {
    this.teams.splice(index,1);
    }
    }
    
    //When viewing a workshop, the second menu to add people to that workshop needs to have viable options.
    //create or delete a persons account here if they want. Will tie in with the beginning menu option to create a secret santa.
    createElf() {
    let name = prompt('Enter name for new Secret Santa: ');
    this.selectedTeam.addElf(new Elf(name));
    }
    
    deleteElf() {
    let index = prompt('Enter the index number of the Secret Santa that you want to delete: ');
    if (index > -1 && index < this.selectedWorkshop.Elf.length) { this.selectedWorkshop.Elf.splice(index,1);
    }
    }
    }
    let menu = new Menu();
    menu.start();


//Each secret santa is its own object, and should each have certain attributes, so I will make them a class.    
class Elves {
    constructor(name) {
    this.name = name;
    }
    
    describe() {
    //console.log(`${this.name}`)
    return `${this.name} is ready for Christmas!`;
    }
    }
    
//To keep people in their particular group, or if they have multiple secret santa's to keep them separate.
//Each group will have to create its own "workshop" initiated by someone, then that "workshop" information is shared with the necessary individuals.
//example: participate at work, and for your family's traditional party. Ideally, this will eventually be joined with a QR code or typed code for each group.

class WorkshopAssignment {
    constructor(name) {
    this.name = name;
    this.Elves = [];
    }
    
    addElf(participant) {
    if (participant instanceof Elf) {
    this.Elves.push(participant);
    } else {
    throw new Error(`${Elf} is not registered for the workshop's gift exchange`);
    }
    }
    
    describe() {
    return `${this.WorkshopAssignment} has ${this.Elves.length} Secret Santa's.`;
    }
    }
    
