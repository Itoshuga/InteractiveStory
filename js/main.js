const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: "Une paisible nuit, au milieu de la campagne. Loins des grandes villes, la Lune avait tout le loisir d'illuminer le ciel. Un petit vent portait les bruits de l'obscurité. Tout était calme. Brisant cette tranquillité, une voiture arriva et s'arrêta sur le bord d'un sentier. Deux adolescents en sortirent, un garçon aux cheveux blond et une fille mate aux cheveux noirs et raides.\n\nNora : « C'est vraiment là qu'on va ? »\n\nLéo : « Oui, je pense que c'est vraiment un bon endroit pour voir la Lune. »",
    options: [
      {
        text: 'Continuer',
        //setState: { blueGoo: true },
        nextText: 2
      },
    ]
  },
  {
    id: 2,
    text: "S'éclairant avec une petite lampe, le jeune garçon sortit une malle et un sac à dos du coffre de la voiture.\n\nLéo : « On aura une meilleur vu au milieu de champ. »\n\nNora : « Tu veux vraiment y aller ? Je suis pas vraiment rassuré par l'endroit pour être honnête. »\n\nNora : « Je suis sûre que si on reste sur le chemin, on la verra très bien aussi. »\n\nLéo : « Mais.. c'est que la Lune risque de finir sa course derrière les arbres, on ne pourra pas l'observer assez longtemps. »",
    options: [
      {
        text: 'Continuer',
        //requiredState: (currentState) => currentState.blueGoo,
        //setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Retour',
        //requiredState: (currentState) => currentState.blueGoo,
        //setState: { blueGoo: false, shield: true },
        nextText: 1
      }
    ]
  },
  {
    id: 3,
    text: "Nora soupira discrètement, allumant son iPhone pour regarder l'heure.\n\nNora : « Bon, si tu insistes. Après tout on y est. »\n\nLe jeune duo commença sa route, enjamba un muret de pierre et s'aventura dans le champ. Ce terrain ne semblait pas avoir été travaillé depuis longtemps, mais restait tout de même praticable. Il était juxtaposé à une forêt dense et sombre, où peu de gens  s'étaient aventurés depuis longtemps. Au bout d'environs deux cent mètres de marche dans le champ, Léo s'arrêta à un endroit qui lui semblait idéal pour observer la Lune. ",
    options: [
      {
        text: 'Continuer',
        nextText: 4
      },
      {
        text: 'Retour',
        nextText: 2
      }
    ]
  },
  {
    id: 4,
    text: "Léo : « Je crois que ce sera bien ici ! »\n\nNora : « Ah ! Saleté de moustique ! »\n\nNora : « File-moi la citronelle, ça va lui faire tout drôle. »\n\nLéo : « Nora ne fait pas autant de bruit. »\n\nLéo fouilla dans son sac pour sortir le matériel qu'ils avaient préparé, notamment la citronelle.\n\nNora : « Je vois pas vraiment qui pourrait nous entendre. »\n\n...",
    options: [
      {
        text: 'Recommencer',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the castle you come across a horrible monster in your path.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Throw the blue goo at it',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the monster easily catches.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single sword.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame();