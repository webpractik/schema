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
-    CheckOriginalText - проверка на совпадения текста. Присланный текст в json должен совпадать с оригинальным (страхуемся на случай что присланный originalText не был изменен). Для работы ошибки необходимо зарегистрировать callback который берет текст по умолчанию.

Все проверки кроме CheckOriginalText запускаются по умолчанию.
