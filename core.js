var win_hand = [1, 10];
var total_hand = 1000;

function go() {
    let win = 0;
    for (let i = 0; i < total_hand; i++) {
        let all_cards = deal();
        win += is_wining_hand_in_cards(win_hand, all_cards) ? 1 : 0;
    }
    console.log('wining hand number is', win);
}

function deal() {
    var temp_cards = [];
    var cards = [];
    for (var i = 0; i < 36; i++) {
        temp_cards[i] = i + 1;
    }
    while (temp_cards.length > 1) {
        let length = temp_cards.length;
        let index = rnd(length);
        cards.push(temp_cards[index]);
        temp_cards[index] = temp_cards[length - 1];
        temp_cards.splice(-1, 1);
    }
    cards.push(temp_cards[0]);
    return cards;
}

function rnd(max) {
    return Math.floor((Math.random() * max));
}

function render_card(card_number) {
    let card_html = '<div class="card-item">';
    card_html += '<img src="cards/' + card_number + '.png" class="card-image"></div>';
    return card_html;
}

function render_cards(cards) {
    let cards_html = '<div class="cart-container">';
    cards.forEach(x => cards_html += render_card(x));
    cards_html += '</div>';
    return cards_html;
}

function draw_one_hand(cards) {
    cards = cards || deal();
    let html = '<div class="">';
    for (let i = 0; i < 4; i++) {
        html += '<h3 class="player-name">player ' + (i + 1) + '</h3>';
        let player_cards = cards.slice(i * 9, (i * 9) + 9);
        html += render_cards(player_cards);
    }
    html += '</div>';
    document.body.innerHTML = html;
}
/**
 * 
 * @param {*} sub_array 
 * @param {*} main_array 
 * return bool
 */
function is_sub_array(sub_array, main_array) {
    for (let i = 0; i < sub_array.length; i++) {
        if (main_array.indexOf(sub_array[i]) == -1) return false;
    }
    return true;
}

function is_wining_hand_in_cards(wining_hand, cards) {
    for (let i = 0; i < 4; i++) {
        let player_cards = cards.slice(i * 9, (i * 9) + 9);
        if (is_sub_array(wining_hand, player_cards)) return true;
    }
    return false;
}

var vm;


(function() {

    vm = new Vue({
        el: '#app-div',
        beforeMount: function() {
            this.init_new_cards();
        },
        data: {
            card_for_choose: [],
            wining_hands: [],
            temp_wining_hand: [],
            total_hand: 5,
            draw_number: 0,
            win_number: 0,
        },
        methods: {
            init_new_cards() {
                for (i = 0; i < 36; i++) {
                    this.card_for_choose[i] = {
                        value: i + 1,
                        is_choosen: false,
                    };
                }
            },
            click_choose(index) {
                let temp = this.card_for_choose[index];
                temp.is_choosen = !temp.is_choosen;
                Vue.set(this.card_for_choose, index, temp);
            },
            add_hand() {
                var current_hand = [];
                this.card_for_choose.map(x => {
                    if (x.is_choosen) current_hand.push(x.value);
                });
                if (!this.validate_hand(current_hand)) return false;
                let length = this.wining_hands.length;
                this.wining_hands.push(current_hand);
                this.init_new_cards();
                Vue.set(this.card_for_choose, this.card_for_choose);
            },
            validate_hand(hand) {
                if (hand.length == 0) {
                    alert("choose card");
                    return false;
                }
                if (hand.length > 9) {
                    alert("card limit 9");
                    return false;
                }
                let length = this.wining_hands.length;
                for (let i = 0; i < length; i++) {
                    if (is_sub_array(hand, this.wining_hands[i])) {
                        alert('this combination already added');
                        return false;
                    }
                }
                return true;
            },
            start() {
                if (this.wining_hands.length == 0) {
                    alert('please add at least 1 hand');
                    return;
                }
                this.draw_number = 0;
                this.win_number = 0;
                let w = 0;
                for (let i = 0; i < this.total_hand; i++) {
                    this.draw_number++;
                    let draw_hand = deal();
                    for (let j = 0; j < this.wining_hands.length; j++) {
                        if (is_wining_hand_in_cards(this.wining_hands[j], draw_hand)) {
                            this.win_number++;
                            break;
                        }
                    }
                }
            }
        },

    });

})();