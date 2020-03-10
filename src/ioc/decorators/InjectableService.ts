import {Container} from "..";

export function InjectableService(name: string) {
    return function (constructor: any) {
        Container.getInstance().register(name, constructor);

        return constructor;
    }
}
