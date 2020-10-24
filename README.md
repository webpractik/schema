# Schema: пакет json схемы для обмена данными в рамках конкурса.

Содержит в себе валидатор схемы.

## Начало работы: конфигурирование объекта Validator

Перед использованием валидации нужно получить объект ErrorMap - Обязательный этап

```ts
const errMap = await ErrorMapFactory.createErrorMap();
validator.setErrorsMap(errMap);
```

Далее в объект валидации нужно передать созданный объект ErrorMapFactory - Обязательный этап

```ts
const validator = new Validator();
validator.setErrorsMapFactory(errorMapFactory);
```

Далее для проверки исходного текста объект validator может принять функцию для запуска во время проверки.
В качестве входных данных она принимает публичный id текста и исходный текст

```ts
validator.addChecker(
  new CheckOriginalText((publicId, text) => {
    return true;
  }),
);
```

## Пример работы

```ts
async function example() {
  const schema = Schema.fromJson(jsonDoc);
  const errMap = await ErrorMapFactory.createErrorMap();
  const validator = new Validator();
  validator.setErrorsMap(errMap);
  validator.addChecker(
    new CheckOriginalText((publicId, text) => {
      return true;
    }),
  );
  const resultValidation = validator.validate(schema);
  console.log(
    'resultValidation',
    resultValidation.status,
    resultValidation.errors,
  );
}
```
