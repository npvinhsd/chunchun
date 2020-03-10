import {Container} from "@app/ioc/containers/Container";

export function InjectableService(name: string) {
    return function (constructor: any) {
        Container.getInstance().register(name, constructor);

        return constructor;
    }
}
