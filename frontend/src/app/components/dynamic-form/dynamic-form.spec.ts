import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicForm } from './dynamic-form';
import { createMockFormContract } from '../../mocks/form-contract.mock';
import { FormContract } from '../../models/form-contract.model';

describe('DynamicForm', () => {
  let component: DynamicForm;
  let fixture: ComponentFixture<DynamicForm>;

  const mockContract: FormContract = createMockFormContract();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicForm],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicForm);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('formContract', mockContract);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title, text input, and combobox with options from contract', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('[data-testid="form-title"]')?.textContent).toContain(
      'Ordem de Serviço',
    );

    const textInput = compiled.querySelector('#field-tech');
    expect(textInput?.tagName).toBe('INPUT');

    const select = compiled.querySelector('#field-priority') as HTMLSelectElement;
    expect(select?.tagName).toBe('SELECT');
    expect(select.options.length).toBe(4); // 1 placeholder + 3 options
  });

  it('should NOT emit formSubmit when required fields are empty', () => {
    const emitSpy = vi.spyOn(component.formSubmit, 'emit');

    component.onSubmit();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit form values when all required fields are valid', () => {
    const emitSpy = vi.spyOn(component.formSubmit, 'emit');

    component.formGroup.get('field-tech')?.setValue('Gustavo');
    component.formGroup.get('field-priority')?.setValue('Alta');
    component.onSubmit();

    expect(emitSpy).toHaveBeenCalledWith({
      'field-tech': 'Gustavo',
      'field-priority': 'Alta',
    });
  });
});
