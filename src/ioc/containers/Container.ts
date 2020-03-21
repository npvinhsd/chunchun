import 'reflect-metadata';

interface IConstructorConfig {
    singleton: boolean;
    constructor: any;
    instance: any;
}

export class Container {
    private map: Map<string, IConstructorConfig> = new Map<string, IConstructorConfig>();
    private singletonMap: Map<string, any> = new Map<string, any>();

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
        let config = this.map.get(key);
        if (!config) {
            throw new Error('error');
        }

        if (!config.singleton) {
            return new config.constructor(...params);

        }

        let object = this.singletonMap.get(key);

        if (object) {
            return object;
        }

        object = new config.constructor();

        this.singletonMap.set(key, object);

        return object;
    }

    public register<T>(key: string, type: T, singleton: boolean) {
        this.map.set(key, {
            singleton,
            constructor: type,
            instance: null
        });
    }

    public registerInstance<T>(key: string, instance: T) {
        this.map.set(key, {
            constructor: null,
            singleton: true,
            instance
        });

        this.singletonMap.set(key, instance);
    }
}
