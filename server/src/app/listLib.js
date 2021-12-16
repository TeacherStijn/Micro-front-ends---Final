export default class BggList extends HTMLElement {
    #data = [];

    // can add constructor with super call

    connectedCallback (){
        /* ready for loading data from API
        You could also use an API (for now with no OATUH authentication from:
        https://github.com/TeacherStijn/public-apis
        */
        fetch('https://bgg-json.azurewebsites.net/hot').then(
            inp=>inp.json()
        ).then(
            resp=> {
                this.#data = resp;
                this.render();
            }
        );
    }

    disconnectedCallback (){

    }

    render() {
        this.innerHTML = "<ul>";
        this.#data.forEach(
            el => {
                this.innerHTML += `<li>
                                        <span>${el.rank})</span>
                                        <span>${el.name}</span>
                                   </li>`;
            }
        );
        this.innerHTML += "</ul>";

        // add some event listeners
        [...this.getElementsByTagName("li")].forEach(
            li => li.addEventListener('click', () => {
                const found = this.#data.find(el => el.name == li.childNodes[3].textContent);
                this.selected = found;
            })
        );
    }

    // For monitoring attribute changes to the following attributes:
    static get observedAttributes() {
        return ['like'];
    }

    // For neatness added this function to monitor attributes added in the observedAttributes() list (so not every 'style=' change for example
    attributeChangedCallback(attrName, oldVal, newVal) {
        const ev = new CustomEvent('list:like', { bubbles: true, detail: JSON.parse(newVal)}); // bubbles = belangrijk ivm naar body toe
        this.dispatchEvent(ev);
    }

    get selected() {
        this.getAttribute('like');
    }

    set selected(val) {
        this.setAttribute('like', JSON.stringify(val));
    }
}
