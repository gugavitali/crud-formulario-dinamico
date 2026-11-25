export enum ComponentType {
  TEXT = 'TEXT',
  COMBOBOX = 'COMBOBOX',
}

export interface ComponentDetails {
  gridSpan: number;
  required: boolean;
  options?: string[];
}

export interface FormComponentContract {
  id: string;
  type: ComponentType;
  label: string;
  details: ComponentDetails;
}

export interface FormContract {
  id: string;
  title: string;
  components: FormComponentContract[];
}
