export class ErrorCategoryDto {

    id: number;
    name: string;
    color: string = 'red';
    subjectCode: string;
    comment: string;
    order: number;
    active: boolean;
}
