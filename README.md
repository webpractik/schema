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

## Список проверок

Для проверки логики разметки Validator использует ряд проверок: 
-    CheckEmptyFieldType - Отсутствуют фрагменты с пустыми типами ошибок "type" 
-    CheckErrorTypeCorrection - У фрагмента ИСП всегда заполнено поле исправление "correction"
-    CheckRangeMarkup - Попадение цифр диапазона разметок (начало и конец) в длину текста.
-    CheckStartCoordinates - "endSelection" больше чем "startSelection"
-    CheckErrorTypes - Соответствие размеченных типов ошибок предмету
-    CheckSubTypes - Соответствие подтипов типам.
-    CheckFullTextErrorsCoordinates - Общие ошибки всегда имеют нулевые "startSelection", "endSelection"
-    CheckEqualityCoordinates - "startSelection" и "endSelection" не равны
-    CheckUniqueTag - Отсутствует ситуации с уникальным значением поля "tag" в рамках одного файла.

Эти проверки запускаются по умолчанию.
