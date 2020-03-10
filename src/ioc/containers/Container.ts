import "reflect-metadata";

export class Container {
    private map: Map<string, any> = new Map<string, any>();

    private static _instance: Container | null;

    private constructor() {

    }

    public static getInstance(): Container {
        if (!this._instance) {
            this._instance = new Container();
        }

        return this._instance;
    }


    public resolve<T>(key: string, ...params: any[]): T {
        let constructor = this.map.get(key);
        if (!constructor) {
            throw new Error('error');
        }

        return new constructor(...params);
    }

    public register<T>(key: string, type: T) {
        this.map.set(key, type);
    }
}
