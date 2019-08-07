class Text {
    constructor(game, delay, text_id, begin_text, begin_value, second_text=-1, second_value=-1) {
        this.game = game;
        this.delay = delay;
        this.text_id = text_id;
        this.begin_text = begin_text;
        this.begin_value = begin_value;

        this.has_two_values = true;
        if (second_text==-1 && second_value==-1) {
            this.has_two_values = false;
        } else {
            this.second_text = second_text;
            this.second_value = second_value;
        }
        this.timeout = null;
    }

    set_inner_html() {
        let s = this.begin_text + this.begin_value.toString();
        if (this.has_two_values) {
            s += this.second_text + this.second_value.toString();
        }
        document.getElementById(this.text_id).innerHTML = s;
    }

    set_opacity(value) {        
        document.getElementById(this.text_id).style.opacity = value;
        if (this.timeout == null) {
            this.timeout = setTimeout(() => {
                this.timeout = null;
                
                if (this.opacity == 1) {
                    this.game.text_state = "decrease";
                } else {
                    this.game.change_text_opacity = false;
                    this.game.text_state = "increase";
                }
            }, this.delay*1000);
        }
    }

    set_direct_opacity(value) {        
        document.getElementById(this.text_id).style.opacity = value;
    }

    get opacity() {
        return document.getElementById(this.text_id).style.opacity;
    }
}