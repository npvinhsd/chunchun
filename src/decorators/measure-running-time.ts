export function measureExecTime() {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const start = Date.now();
            const result = await method.apply(this, args);
            const end = Date.now();
            console.log(`${(target.constructor as any).name}.${propertyKey} in ${(end - start) / 1000} s`);
            return result;
        };

        return descriptor;
    }
}
