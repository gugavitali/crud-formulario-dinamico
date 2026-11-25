import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentType, FormContract } from '../../models/form-contract.model';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.scss',
})
export class DynamicForm {
  @Input() formContract?: FormContract;
  @Output() formSubmit = new EventEmitter<Record<string, unknown>>();

  formGroup: FormGroup = new FormGroup({});
  readonly ComponentType = ComponentType;

  ngOnChanges(): void {
    this.buildForm();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.formSubmit.emit(this.formGroup.value);
  }

  private buildForm(): void {
    const controls: Record<string, FormControl> = {};

    if (!this.formContract) {
      this.formGroup = new FormGroup(controls);
      return;
    }

    for (const component of this.formContract.components) {
      const validators = component.details.required ? [Validators.required] : [];
      controls[component.id] = new FormControl('', validators);
    }

    this.formGroup = new FormGroup(controls);
  }

  isFieldInvalid(controlId: string): boolean {
    const control = this.formGroup.get(controlId);
    return Boolean(control?.invalid && control?.touched);
  }
}
