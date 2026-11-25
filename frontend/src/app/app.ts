import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { DynamicForm } from './components/dynamic-form/dynamic-form';
import { createMockFormContract } from './mocks/form-contract.mock';
import { FormContract } from './models/form-contract.model';

@Component({
  selector: 'app-root',
  imports: [DynamicForm, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  contract: FormContract = createMockFormContract();
  submittedData?: Record<string, unknown>;

  onFormSubmit(payload: Record<string, unknown>): void {
    console.log('Form payload:', payload);
    this.submittedData = payload;
  }
}
