import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concat',
  standalone: true,
})
export class ConcatPipe implements PipeTransform {
  transform(name: string, index: number): string {
    // very heavy computation
    return `${name} - ${index}`;
  }
}
