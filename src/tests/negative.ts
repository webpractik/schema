import { should, expect, config } from 'chai';
import { ErrorMapFactory, Schema, Validator } from '..';
import { ErrorsMap } from '../errors/errorsMap';
import clone from 'fast-clone';

config.includeStack = false;
config.showDiff = false;

const json = {
  meta: {
    id: '0051961',
    test: 'эссе тренировка',
    uuid: 'f564a160-5352-4f15-b934-bf83b2caa3a6',
    year: 2020,
    class: '1 курс',
    theme: 'Distant Leaning',
    subject: 'eng',
    category: '',
    taskText: '',
  },
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  selections: [
    {
      id: 111,
      startSelection: 10,
      endSelection: 20,
      type: 'А.стиль',
      comment: '',
      explanation: '',
      correction: '',
      group: 'error',
      subtype: '',
    },
  ],
};

// Скачиваем каталог ошибок
let errMap: ErrorsMap;

describe('Негативные сценарии', async () => {
  const validator = new Validator();

  before(async () => {
    errMap = await ErrorMapFactory.createErrorMap();
    validator.setErrorsMap(errMap);
  });

  it('endSelection не может быть отрицательным', () => {
    const newJson = clone(json);
    newJson.selections[0].endSelection = -1;

    const schema = Schema.fromJson(JSON.stringify(newJson));
    const resultValidation = validator.validate(schema);

    expect(resultValidation.status).to.be.false;
  });

  it('startSelection не может быть отрицательным', () => {
    const newJson = clone(json);
    newJson.selections[0].startSelection = -1;

    const schema = Schema.fromJson(JSON.stringify(newJson));
    const resultValidation = validator.validate(schema);

    expect(resultValidation.status).to.be.false;
  });

  it('Нулевые координаты могут быть только у общих ошибок', () => {
    const newJson = clone(json);
    newJson.selections[0].startSelection = 0;
    newJson.selections[0].endSelection = 0;

    const schema = Schema.fromJson(JSON.stringify(newJson));
    const resultValidation = validator.validate(schema);

    expect(resultValidation.status).to.be.false;
  });

  it('selections должен быть массивом', () => {
    const newJson = clone(json);

    // @ts-ignore
    newJson.selections = '';

    const schema = Schema.fromJson(JSON.stringify(newJson));
    const resultValidation = validator.validate(schema);

    expect(resultValidation.status).to.be.false;
  });
});
