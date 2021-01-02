
import Exception from "./Exception.js";

class CanvasContainer {
    private element : HTMLCanvasElement;

    constructor(e : HTMLCanvasElement) {
        this.element = e;
        let parent = this.element.parentElement as HTMLDivElement;

        let ro = new ResizeObserver(entries => this.update());
        ro.observe(parent);
    }

    public update() {
        let parent = this.element.parentElement as HTMLDivElement;

        this.element.width = parent.clientWidth;
        this.element.height = parent.clientHeight;

        this.context.viewport(0, 0, this.element.width, this.element.height);
    }

    get context() : WebGLRenderingContext {
        return this.element.getContext("webgl") as WebGLRenderingContext;
    }
}

type ApplicationConstructorOptions = {
    container : HTMLDivElement;
};

export class Application {
    private static INSTANCE : Application;

    private eContainer : HTMLDivElement;
    private canvasContainer : CanvasContainer;

    constructor(options : Partial<ApplicationConstructorOptions> = {}) {
        if (typeof Application.INSTANCE !== 'undefined') {
            throw new Exception();
        }

        if (typeof options.container === 'undefined') {
            throw new Exception()
        }

        this.eContainer = options.container;

        let c = document.createElement('canvas');
        this.eContainer.appendChild(c);
        this.canvasContainer = new CanvasContainer(c);

        Application.INSTANCE = this;
    }

    get context() {
        return this.canvasContainer.context;
    }

    public static get Context() {
        return Application.INSTANCE.canvasContainer.context;
    }
}
