import { ComponentType, FormContract } from '../models/form-contract.model';

export function createMockFormContract(): FormContract {
  return {
    id: 'form-1',
    title: 'Ordem de Serviço',
    components: [
      {
        id: 'field-tech',
        type: ComponentType.TEXT,
        label: 'Técnico Responsável',
        details: { gridSpan: 6, required: true },
      },
      {
        id: 'field-priority',
        type: ComponentType.COMBOBOX,
        label: 'Prioridade',
        details: {
          gridSpan: 6,
          required: true,
          options: ['Baixa', 'Média', 'Alta'],
        },
      },
    ],
  };
}