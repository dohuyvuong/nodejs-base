import { systemLogger } from '../logger/logger';

export function Logger() {
  return function (
    target: new <T>(...args: unknown[]) => T,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): void {
    const functionName = `${target.constructor.name}.${propertyKey}`;
    const targetMethod = descriptor.value;

    if (typeof targetMethod !== 'function') return;

    const returnType = Reflect.getMetadata('design:returntype', target, propertyKey);

    if (returnType.name == 'Promise') {
      descriptor.value = async function (...args: unknown[]): Promise<typeof returnType> {
        systemLogger.info(`${functionName} Start`);
        systemLogger.info(`params:`, args);

        const result = await targetMethod.apply(this, args);

        systemLogger.info(`result: ${JSON.stringify(result)}`);
        systemLogger.info(`${functionName} End`);

        return result;
      };
    } else {
      descriptor.value = function (...args: unknown[]): typeof returnType {
        systemLogger.info(`${functionName} Start`);
        systemLogger.info(`input:`, args);

        const result = targetMethod.apply(this, args);

        systemLogger.info(`output: ${JSON.stringify(result)}`);
        systemLogger.info(`${functionName} End`);

        return result;
      };
    }
  };
}
