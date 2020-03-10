export function measureExecTime() {
    return function (target: any, methodKey: string, descriptor: PropertyDescriptor) {
        const method = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const start = Date.now();
            const result = await method.apply(this, args);
            const end = Date.now();
            console.log(`${target.constructor.name}.${methodKey} in ${(end - start) / 1000} s`);
            return result;
        };

        return descriptor;
    }
}
