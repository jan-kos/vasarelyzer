
import Exception from "./Exception";

interface FileType {
    "binary": ArrayBuffer;
    "text": string;
    "json": object;
};

export default class Network {

    public static async Download<K extends keyof FileType>(path : string, type : K) : Promise<FileType[K]> {
        let response = await fetch(path, {
            mode: "same-origin"
        });

        if (type === "text") {
            return response.text() as FileType[K];
        }

        if (type === "json") {
            return await response.json() as FileType[K];
        }

        let blob = await response.blob();
        let ab = await blob.arrayBuffer();
        return ab as FileType[K];
    }

};
