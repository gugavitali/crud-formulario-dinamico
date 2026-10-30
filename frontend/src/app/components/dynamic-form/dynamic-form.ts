import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-dynamic-form',
  styleUrl: './dynamic-form.scss',
  templateUrl: './dynamic-form.html',
})
export class DynamicForm {
  @Input() formContract: any; // Usando 'any' temporariamente até criarmos as interfaces (Task 3.3)
}
