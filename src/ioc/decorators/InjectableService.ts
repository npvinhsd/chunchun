import {Container} from "..";

export function InjectableService(name: string, singleton: boolean = false) {
    return function (constructor: any) {
        Container.getInstance().register(name, constructor, singleton);

        return constructor;
    }
}
