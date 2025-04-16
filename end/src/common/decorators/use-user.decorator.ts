
export function UseUser() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    console.log("==========>", target, propertyKey, descriptor, originalMethod);
  }
}