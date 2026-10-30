import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicForm } from './dynamic-form';
import { ReactiveFormsModule } from '@angular/forms';

describe('DynamicForm', () => {
  let component: DynamicForm;
  let fixture: ComponentFixture<DynamicForm>;

  // 1. O contrato Mockado
  const mockContract = {
    id: 10,
    title: 'Formulário do Setor de TI',
    components: [
      {
        id: 2,
        type: 'TEXT',
        label: 'Técnico Responsável',
        details: { gridSpan: 4, required: true }
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicForm, ReactiveFormsModule], // Assumindo Angular Standalone Components 
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicForm);
    component = fixture.componentInstance;

    //2. Injetamos o contrato e forçamos a renderização da tela
    component.formContract = mockContract as any;
    fixture.detectChanges();
  });

  it('deve renderizar o título do formulário', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Formulário do Setor de TI');
  });

  it('deve renderizar os labels dos componentes dinâmicos', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('label')?.textContent).toContain('Técnico Responsável');
  })
});
