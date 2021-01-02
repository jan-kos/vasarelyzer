
import {Application} from "./framework/Application.js";
import { VertexShader, FragmentShader, ShaderProgram, Shader } from "./framework/Shader.js";

async function main(args : URLSearchParams) {
    let app = new Application({
        container: document.querySelector("body > div#application") as HTMLDivElement
    });

    const GL = app.context;

    const draw = () => {
        GL.clearColor(1.0, 1.0, 1.0, 1.0);
        GL.clearDepth(1.0);
        GL.enable(GL.DEPTH_TEST);
        GL.depthFunc(GL.LEQUAL);

        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

        window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
}

window.addEventListener("DOMContentLoaded", (event) => {
    let args = new URLSearchParams(window.location.search);
    main(args);
});
