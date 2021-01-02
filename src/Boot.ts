
import Exception from "./framework/Exception.js";

async function main(args : URLSearchParams) {
    console.log( `Hello world from Boot.ts` );
}

window.addEventListener("DOMContentLoaded", (event) => {
    let args = new URLSearchParams(window.location.search);
    main(args);
});
