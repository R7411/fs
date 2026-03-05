const TextElement = document.getElementById('text');
const OptionButtonsElement = document.getElementById('optionButtons');

let state = {};

function startGame() {
    state = {};
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    TextElement.innerHTML = textNode.text
    while (OptionButtonsElement.firstChild) {
        OptionButtonsElement.removeChild(OptionButtonsElement.firstChild)
    }
    textNode.options.forEach(option => {
        if(showOption(option)) {
            const button = document.createElement('button')
            button.innerHTML = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            OptionButtonsElement.appendChild(button)
        }
    })
}
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextnodeId = option.nextText
    if (nextTextnodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextnodeId)
}

const textNodes = [
    {
        id:1,
        text: '<span class="e">Hello there, you must be wondering where you are.</span>',
        options: [
            {
                text: '->',
                nextText: 2
            }
        ]
    },
    {
        id:2,
        text:'You currently have no body, just a soul drifting through the endless ether.',
        options: [
            {
                text:'->',
                //requiredState:(currentState) => currentState.blueGoo,
                //setState: {blueGoo: false, sword: true},
                nextText: 3,
            },
        ]
    },
    {
        id:3,
        text:'Id imagine you desire your senses though, so heres this.',
        options: [
            {
                text: '->',
                nextText: 4
            }
        ]
    },
    {
        id:4,
        text: 'A chance to live the life of a noble knight or a masterful mage, which will it be?',
        options: [
            {
                text: 'Knight',
                setState: {knight: true},
                nextText: 5
            },
            {
                text: 'Mage',
                setState:  {mage: true},
                nextText: 905
            }
        ]
    },
    {
        id:5,
        text: 'Understood, set forth couragous adventurer.',
        options: [
            {
                text: '->',
                nextText: 6
            }
        ]
    },
    {
        id:905,
        text: 'Understood, set forth crafty adventurer.',
        options: [{
                text: '->',
                nextText: 906
        }]
    },
    {
        id:906,
        text: 'As a mage your duty is to protect others using your wits.',
        options: [{
                text: '->',
                nextText: 907
        }]
    },
    {
        id: 907,
        text: 'The castle has been sent into turmoil for horrors have been terrorizing the land. Its up to you to plan things out and set forth.',
        options: [
        {
                text: '->',
                nextText: 908
        }
        ]
    },
    {
        id: 908,
        text: 'Various items prime for strenthening you are scattered across many lands, prepare for cobwebs and crawlers.',
        options: [{
                text: 'go to the enchanted forest',
                nextText: 9010
        },
        {
            text: 'go to the magic desert',
            nextText:910
        }
        ]
    },
    {
        id:910,
        text: 'You arrived at the desert infested with animated golem constructs.',
        options: [
            {
                text: 'magic blast',
                nextText: 911
            },
            {
                text: 'reverse their life giving magic',
                nextText:911
            }
        ]
    },
    {
        id: 911,
        text: 'You come out unscathed. Up ahead you find hidden temple with an ice rob perfect for surviving this harsh  hot and ancient axe forged from dragon bones. You can only carry one so choose wisely.',
        options: [
        {
            text: 'Take the rod',
            setState: {iceRod:true},
            nextText:912
        },
        {
            text: 'Take the axe',
            setState: {dragonBoneAxe: true},
            nextText:912
        }
        ]
    },
    {
        id: 912,
        text: 'You head back to hq now set to go after the mystic fox, the other beast will be targeted by an elite mage.',
        options: [
        {
            text: 'Head to the mushroom forest',
            nextText: 913
        },
        ]
    },
    {
        id:913,
        text: 'A pack of animated mushrooms waddle towards you menacingly.',
        options: [
            {
                text: 'pity them',
                nextText: 90103
            },
            {
                text: 'pet them',
                nextText: 90103
            },
            {
                text: 'Blizzard magic',
                requiredState:(currentState) => currentState.iceRod,
                nextText: 914
            },
            {
                text: 'Dragon rush',
                requiredState:(currentState) => currentState.dragoneBoneAxe,
                nextText: 914
            }
        ]
    },
    {
        id:914,
        text: 'The kitsune of myth stands before you arrogantly',
        options: [
            {
                text: 'Freeze it once and  for all',
                requiredState:(currentState) => currentState.iceRod,
                nextText: 915
            },
            {
                text: 'Rush them down with precision',
                requiredState:(currentState) => currentState.dragoneBoneAxe,
                nextText: 916
            }
        ]
    },
    {
        id:916,
        text:'The fox casts temporal magic sending you back to the time period your axe came from. Fortunately you find a peaceful life in this new world.',
        options:[
            {
                text:'restart',
                nextText:-1
            },
            {
                text:'Ice Rod or Dragon-bone Axe decision',
                setState: {iceRod:false, dragonBoneAxe:false},
                nextText:911
            }
        ]
    },
    {
        id:915,
        text:'The fox casts reflect, bouncing the gust of ice back its rightful owner. Youre frozen now',
        options:[
            {
                text:'restart',
                nextText:-1
            },
            {
                text:'Ice Rod or Dragon-bone Axe decision',
                setState: {iceRod:false, dragonBoneAxe:false},
                nextText:911
            }
        ]
    },
    {
        id: 90103,
        text: 'ded',
        options: [
            {
                 text: 'try again',
                 nextText:913
            }
        ]
    },
    {
        id: 9010,
        text: 'You arrive at the forest full of imp sized archers ready to strike when you least expect.',
        options: [
            {
                text: '->',
                nextText:9011
            }
        ]
    },
    {
        id: 9011,
        text: 'A squad of archers line their bows at you.',
        options: [
            {
                text: 'magic blast',
                nextText:9012
            },
            {
                text: 'run',
                nextText:9012
            }
        ]
    },
    {
        id: 9012,
        text: 'You handle the encounter unscathed and found an ancient book.',
        options: [
            {
                text: 'Carry it away',
                nextText:9013
            }
        ]
    },
    {
        id: 9013,
        text: 'You have returned to H.Q, next up is either the mystic fox or giant frog.',
        options: [
            {
                text: 'Fox',
                nextText:9014
            },
            {
                text: 'Frog',
                nextText: 9014
            }
        ]
    },
    {
        id: 9014,
        text: 'You made up your mind and noted their location on the ancient book moreover.',
        options: [
            {
                text: '->',
                nextText:9015
            }
        ]
    },
    {
        id: 9015,
        text: 'Turns out the magic is a kin to pandoras box and ferocious beasts you never knew existed emerged slaying every other beast in the area. Quite Efficiently I might add.',
        options: [
            {
                text: '->',
                nextText:9016
            }
        ]
    },
    {
        id:9016,
        text:'These creatures showed no sign of slowing down and the kingdom fell to ruin..',
        options:[
            {
                text:'restart',
                nextText:-1
            },
            {
                text:'Fox or frog decision',
                nextText:9013
            },]
    },
    {
        id:6,
        text: 'As a knight your duty is to pretect and fend off against beasts who threaten the castle.',
        options: [{
                text: '->',
                nextText: 7
        }]
    },
    {
        id: 7,
        text: 'The castle has been sent into turmoil for horrors have been terrorizing the land. Its up to you to plan things out and set forth.',
        options: [
        {
                text: '->',
                nextText: 8
        }
        ]
    },
    {
        id: 8,
        text: 'Various items prime for strenthening you are scattered across many lands, prepare for cobwebs and crawlers',
        options: [{
                text: 'go to an underground spiders nest',
                nextText: 9
        },
        ]
    },
    {
        id:9,
        text:'The creepy cave it is',
        options: [
            {
                text: '->',
                nextText: 10
            }
        ]
    },
    {
        id:10,
        text: 'A giant arachnid lunges towards you',
        options: [
            {
                text: 'SLASH',
                nextText: 11
            },
            {
                text: 'run',
                nextText: 11
            }
        ]
    },
    {
        id: 11,
        text: 'You survive and continue your journey',
        options: [
            {
                text: 'head deeper',
                nextText: 12
            }
        ]
    },
    {
        id:12,
        text: 'You found the void ring and the soul amulet, as part of the knighhts code you can only choose to use on the field and give the other one to H.Q. Choose one to equip.',
        options:
        [
            {
                text: 'The void ring',
                setState: {voidRing: true},
                nextText:13
            },
            {
                text: 'The soul amulet',
                setState: {soulAmulet: true},
                nextText:13
            }
        ]
    },
    {
        id:13,
        text:'Splendid choice, you then exited the spiders nest',
        options:
        [
            {
                text: '->',
                nextText:14
            }
        ]
    },
    {
        id:14,
        text:'You returned to H.Q. Now that you retrieved an item heading to either the ferocius wolf or bird',
        options: [
            {
                text: 'Hunt down the Wolf',
                nextText:15
            },
            {
                text: 'Hunt down the Ghost',
                nextText:1015
            }
        ]
    },
    {
        id:1015,
        text:'You arrived at the velvet mansion, there is a pack of ghosts ready to claw away at you',
        options: [
            {
                text: 'Use Void ring',
                requiredState:(currentState) => currentState.voidRing,
                nextText:1016
            },
            {
                text: 'Use Soul Amulet',
                requiredState:(currentState) => currentState.soulAmulet,
                nextText:1016
            }
        ]
    },
    {
        id:1016,
        text: 'Finally you reach the attic where the Ghost of legend is located',
        options: [
            {
                text: 'slash',
                nextText: 10116
            },
            {
                text: 'Banish it into the void',
                requiredState:(currentState) => currentState.voidRing,
                nextText:1017
            },
            {
                text: 'Quell its soul and set the ghost free',
                requiredState:(currentState) => currentState.soulAmulet,
                nextText: 1018
            }
        ]
    },
    {
        id:1018,
        text:'With the ghost now soothed the mansion was no longer haunted',
        options:[
            {
                text:'restart',
                nextText:-1
            },
            {
                text:'Wolf or ghost decision',
                nextText:14
            },
            {
                text:'Void ring or Soul Amulet decision',
                setState: {soulAmulet:false},
                setState: {voidRing:false},
                nextText:12
            }
        ]
    },
    {
        id:1017,
        text:'With the voids negative energy the ghost grew stronger, defeat you and ghouls took over the land',
        options:[
            {
                text:'restart',
                nextText:-1
            },
            {
                text:'Wolf or ghost decision',
                nextText:14
            },
            {
                text:'Void ring or Soul Amulet decision',
                setState: {soulAmulet:false},
                setState: {voidRing:false},
                nextText:12
            }
        ]
    },
    {
        id:10116,
        text:'The ghost launched a barrage of objects at you and perished',
        options:
        [
            {
                text: 'try again',
                nextText: 1016
            }
        ]
    },
    {
        id:15,
        text:'You arrived at the crimson forest, there is a pack of normal wolves ready to claw away at you',
        options: [
            {
                text: 'slash',
                nextText:1115
            },
            {
                text: 'Use Void ring',
                requiredState:(currentState) => currentState.voidRing,
                nextText:16
            },
            {
                text: 'Use Soul Amulet',
                requiredState:(currentState) => currentState.soulAmulet,
                nextText:16
            }
        ]
    },
    {
        id:1115,
        text:'The pack ovewhelmed you and perished',
        options:
        [
            {
                text: 'try again',
                nextText: 15
            }
        ]
    },
    {
        id:16,
        text:'At long last you finally face the Wolf of legend',
        options:
        [
            {
                text: 'slash',
                nextText:1116
            },
            {
                text:'Cast the beast away into the void',
                nextText:17,
                requiredState:(currentState) => currentState.voidRing,
            },
            {
                text:'Tame the beasts soul',
                nextText:18,
                requiredState:(currentState) => currentState.soulAmulet,
            }
        ]
    },
    //wolf defeat
    {
        id:1116,
        text:'The behemoth ovewhelmed you and you perished',
        options:
        [
            {
                text: 'try again',
                nextText: 16
            }
        ]
    },
    //voidRing+wolf
    {
        id:17,
        text:'With the beast gone the castle remains prosphorus',
        options:[
            {
                text:'restart',
                nextText:-1
            },
            {
                text:'Wolf or ghost decision',
                nextText:14
            },
            {
                text:'Void ring or Soul Amulet decision',
                setState: {soulAmulet:false},
                setState: {voidRing:false},
                nextText:12
            }
        ]
    },
    {
        id:18,
        text:'The wolf is also mans best friend, hes tamed now!',
        options:[
            {
                text:'restart',
                nextText:-1
            },
            {
                text:'Wolf or ghost decision',
                nextText:14
            },
            {
                text:'Void ring or Soul Amulet decision',
                setState: {soulAmulet:false},
                setState: {voidRing:false},
                nextText:12
            }
        ]
    }
]


startGame()
