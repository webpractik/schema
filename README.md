# Upgreat Readable Schema

Схема обмена данных в рамках конкурса [Прочтение](https://ai.upgreat.one/).
- Работа с типом
- Валидация

## Пример работы

```ts
async function example() {
  // создаем объект Schema
  const schema = Schema.fromJson(jsonDoc);

  // Скачиваем каталог ошибок
  const errMap = await ErrorMapFactory.createErrorMap();
  
  // Создаем экземпляр валидатора
  const validator = new Validator();
  validator.setErrorsMap(errMap);

  // Можем добавлять валидации, в данном случае можно добавить проверку на оригальность текста
  // используя внутренний источник данных
  validator.addChecker(
    new CheckOriginalText((publicId, text) => {
      return true;
    }),
  );
  
  // Получаем результат валидации
  const resultValidation = validator.validate(schema);
  console.log(
    'resultValidation',
    resultValidation.status,
    resultValidation.errors,
  );
}
```

## Валидация

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


