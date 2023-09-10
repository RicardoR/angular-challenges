import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFunction',
  standalone: true,
})
export class WrapFunctionPipe implements PipeTransform {
  // transform(fn: any, ...args: any): any {
  //   return fn(...args);
  // }

  // transform(func: (...arg: any[]) => R, ...args: any[]): R {
  //   return func(...args);
  // }

  transform<ARG, R>(func: (arg: ARG) => R, args: ARG): R;
  transform<ARG1, ARG2, R>(
    func: (arg1: ARG1, arg2: ARG2) => R,
    arg1: ARG1,
    arg2: ARG2
  ): R;
  transform<ARG1, ARG2, ARG3, R>(
    func: (arg1: ARG1, arg2: ARG2, arg3: ARG3) => R,
    arg1: ARG1,
    arg2: ARG2,
    arg3: ARG3
  ): R;
  transform<ARG1, ARG2, ARG3, R>(
    func: (arg1: ARG1, arg2: ARG2, arg3: ARG3, ...arg: any[]) => R,
    arg1: ARG1,
    arg2: ARG2,
    arg3: ARG3,
    ...arg: any[]
  ): R;

  transform<R>(func: (...arg: unknown[]) => R, ...args: unknown[]): R {
    return func(...args);
  }
}
