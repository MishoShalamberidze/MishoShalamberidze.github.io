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
    card_html += '<img src="cards/' + card_number + '.png" class="card-image"></div>'
    return card_html;
}

function render_cards(cards) {
    let cards_html = '<div class="cart-container">';
    cards.forEach(x => cards_html += render_card(x));
    cards_html += '</div>';
    return cards_html;
}

function draw_one_hand() {
    let cards = deal();
    let html = '<div class="">';
    for (let i = 0; i < 4; i++) {
        html += '<h3 class="player-name">player ' + (i + 1) + '</h3>';
        let player_cards = cards.slice(i * 9, (i * 9) + 9);
        html += render_cards(player_cards);
    }
    html += '</div>';
    document.body.innerHTML = html;
}
/* not global equal*/
function is_array_equal(array_1, array_2) {
    for (let i = 0; i < array_1.length; i++) {
        if (array_2.indexOf(array_1[i]) == -1) return false;
    }
    return true;
}