export default class BggCart extends HTMLElement {
    #input;

    // can add constructor with super call

    connectedCallback (){
        // ready to show data when ListLib events pop; so, have to subscribe here (can do by reading a set attribute)
        window.addEventListener('list:like', (ev)=> {
            this.#input=ev.detail;
            this.innerHTML = `<h2>Chosen game: ${this.#input.name}</h2>
                <img src="${this.#input.thumbnail}" alt="Foto van ${this.#input.name}" />
                <br/>
                <p>Year: ${this.#input.yearPublished}</p>
                <button>Order</button>
            `;
        });

        // Perhaps add some event listeners to the buttons, that call order()
    }

    disconnectedCallback (){
        console.log(this.className + ' disconnected from DOM');
    }

    order (data){
        // eval data property and JSON.stringify it?
        window.localStorage.setItem('favs', JSON.stringify(data));
    }
}
