let readlineSync = require('readline-sync');
console.log ("Welcome to the E.A.P. Dungeon of Pleasure.")
console.log ("Here, Your pain is Our Pleasure.");
console.log ("The Lady or The Tiger We shall see if you can choose Wisely.");

const rewards = [
    'Lady',
    'Tiger',
    'Horse',
    'Tiger',
    'Rats',
    'Bats',
    'Torture',
    'Snake',
    'Raven'
]

function getReward(rewards) {
    const randomElement = rewards[Math.floor(Math.random() * rewards.length)];
    return randomElement;
}

if (readlineSync.keyInYN("Are You A Player?")){
    // if they select "yes" do the following: initreport
    console.log('Great!')
    handleDoorChoices();
} else {
    console.log('Sorry see you next time')
}



function handleDoorChoices(uniqueRewards) {
    let options = ["Door 1", 'Door 2'];
    const rewardList = uniqueRewards || rewards;

    const doorOneReward = getReward(rewardList);
    // uniqueRewardsForDoorTwo is the array with one less item
    // the item that was removed, was the one selected for door one
    const uniqueRewardsForDoorTwo = rewardList.filter(item => item !== doorOneReward);
    const doorTwoReward = getReward(uniqueRewardsForDoorTwo);
    // uniqueRewardsForNextLevel is the array with two less items
    // the two items that were removed, were the ones selected for the two doors
    const uniqueRewardsForNextLevel = uniqueRewardsForDoorTwo.filter(item => item !== doorTwoReward);

    const index = readlineSync.keyInSelect(options, 'Pick a Door');

    switch (index) {
        case 0: {
            if (doorOneReward === 'Tiger') {
                gameOver();
            }
            console.log('Congrats, behind door1 you got', doorOneReward); 
            console.log('You are going to the next level, there will be fewer choices, be careful')
            handleDoorChoices(uniqueRewardsForNextLevel)
        }
        case 1: {
            if (doorTwoReward === 'Tiger') {
                gameOver();
            }
            console.log('Congrats, behind door2 you got', doorTwoReward);
            console.log('You are going to the next level, there will be fewer choices, be careful')
            handleDoorChoices(uniqueRewardsForNextLevel)   
        }
    }
}

function gameOver() {
    console.log('Im sorry you picked the tiger, you lose');
    // this stops the node process wherever it is and doesn't read any additional code
    process.exit();
}