# Upgreat Readable Schema

Схема обмена данных в рамках конкурса [Прочтение](https://ai.upgreat.one/).
- Работа с типом
- Валидация

## Работа с типом
```ts
const schema = Schema.fromJson(jsonDoc);
```
При попытке создалть экземпляр, в случае если json не соответствует схеме, вызовется throw new Exception.

## Пример работы валидации

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

## Перечень проверок
@todo
