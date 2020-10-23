export class SelectionDto {
  id: number;
  startSelection: number;
  endSelection: number;
  type: string;
  comment?: string;
  explanation: string;
  correction: string;
  tag: string;
  group: string;
  subtype?: string;
}
