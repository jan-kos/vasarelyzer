
import { Application } from "./Application.js";
import Exception from "./Exception.js";

export abstract class Shader {
    public readonly name : string;
    public readonly sourceCode : string;

    private readonly type : number;
    private compiled : WebGLShader | null;

    constructor(name : string, type : number, sc : string) {
        this.name = name;
        this.type = type;
        this.sourceCode = sc;
        this.compiled = null;
    }

    public compile() : WebGLShader {
        if (this.compiled !== null) {
            return this.compiled;
        }

        const GL = Application.Context;

        const shader = GL.createShader(this.type) as WebGLShader;
        GL.shaderSource(shader, this.sourceCode);
        GL.compileShader(shader);

        if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
            let message = GL.getShaderInfoLog(shader) as string;
            GL.deleteShader(shader);
            throw new Exception(message);
        }

        this.compiled = shader;
        return shader;
    }
}

export class VertexShader extends Shader {
    constructor(name : string, sc : string) {
        super(name, Application.Context.VERTEX_SHADER, sc);
    }
}

export class FragmentShader extends Shader {
    constructor(name : string, sc : string) {
        super(name, Application.Context.FRAGMENT_SHADER, sc);
    }
}

export class ShaderProgram {
    private readonly shaders : Shader[];
    private compiled : WebGLProgram | null;

    public constructor(...shaders : Shader[]) {
        this.shaders = shaders;
        this.compiled = null;
    }

    public compile() : WebGLProgram {
        if (this.compiled !== null) {
            return this.compiled;
        }

        const GL = Application.Context;
        const objects = this.shaders.map(s => s.compile());
        const program = GL.createProgram() as WebGLProgram;
        for (const o of objects) {
            GL.attachShader(program, o);
        }

        GL.linkProgram(program);
        if (!GL.getProgramParameter(program, GL.LINK_STATUS)) {
            throw new Exception(GL.getProgramInfoLog(program) as string);
        }

        this.compiled = program;
        return program;
    }
}
