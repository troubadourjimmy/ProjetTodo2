import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appForbiddenUser]',
  providers:[{provide: NG_VALIDATORS, useExisting: ForbiddenUserDirective, multi: true}]
})
 
export class ForbiddenUserDirective implements Validator {
  @Input('appForbiddenName') forbiddenName = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenName ? forbiddenUserValidator(new RegExp(this.forbiddenName, 'i'))(control)
                              : null;
  }
}

export function forbiddenUserValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenUser: {value: control.value}} : null;
  };
}

