import {Container} from "@app/ioc/containers/Container";

export function Inject(name: string) {
    return function (target: any, propertyKey: string) {
        let service = Container.getInstance().resolve(name);

        Object.defineProperty(target, propertyKey, {
            value: service
        });
    }
}
