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
                <p>Rank: ${this.#input.rank}</p>
                <button>Order</button>
            `;
        });
    }

    disconnectedCallback (){

    }

    order (data){

    }
}
