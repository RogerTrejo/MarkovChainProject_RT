class FlipIt {
    constructor(cards) {
        this.cardsArray = cards;
        this.flippedCards = 0;
        this.starCount = 0;
        this.transitionMatrix = [
            [0.3,0.7],
            [0.2,0.8]
          ];
        // this.transitionStates = [["SS","SC"],["CS","CC"]]
        // this.possibleStates = ["star","chain"]

        this.previousState = "chain";
        this.cardCount = 0;

    }
    markovAlgo(previousState, cardCount) {
  
        var chosenCards = [];
        var currentState = "";
        while (cardCount !== 8) {
            currentState = previousState;
            var randomNum = Math.random();
            if (previousState === "chain") {
                if (randomNum >= this.transitionMatrix[0][1]) {
                    currentState = "chain";
                    chosenCards.push("chompChain");
                }
                else {
                      currentState = "star";
                      chosenCards.push("star");
                }
            }
            else if (previousState === "star") {
                if (randomNum >= this.transitionMatrix[1][1]) {
                    currentState = "star"
                    chosenCards.push("star");
                }
                else  {
                      currentState = "chain"
                      chosenCards.push("chompChain");
                }
      
            }
            previousState = currentState;
            cardCount += 1;
        }
        return chosenCards;
      }

    startGame() {
        setTimeout(() => {
            this.updateImages(this.cardsArray, this.markovAlgo(this.previousState,this.cardCount));
            this.shuffleCards(this.cardsArray);
        }, 250)
    }
    matchResults() {
        if (this.starCount >= 6) {
            alert('Congratulations, you won! Have a nice day! Refresh to play again!')
        } else {
            alert('Sorry, better luck next time champ! Refresh to play again!')
        }
    }

    flipCard(card) {
        if(!card.classList.contains('visible')) {
            this.checkStarCards(card);
            card.classList.add('visible');
            this.flippedCards += 1;
            if (this.flippedCards === 8) {
                setTimeout(() => {
                    this.matchResults();
                }, 1000)
            }
        }
    }
    checkStarCards(card) {
        if(card.getElementsByClassName('card-value')[0].classList.contains("star")) {
            this.starCount += 1;
        }

    }
    updateImages(cards, arrayOfImageNames) {
        cards.forEach(card => {
            var card_id = arrayOfImageNames.pop();
            card.getElementsByClassName('card-value')[0].classList.add(card_id);
            card.getElementsByClassName('card-value')[0].src = "Assets/Images/".concat(card_id).concat(".png");
        }) 


    }
    shuffleCards(cardsArray) { // Using Fisher-Yates Shuffle Algorithm.
        for (let i = cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            cardsArray[randIndex].style.order = i;
            cardsArray[i].style.order = randIndex;
        }
    }
}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', play);
} else {
    play();
}

function play() {
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new FlipIt(cards);
    game.startGame();


    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
            setTimeout(() => {
            }, 1000)
        });
    });
}