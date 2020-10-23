# Schema: пакет проверки разметок конкурса Readable

[![Scripts sets up by @solid-soda/scripts v2.2.0](https://img.shields.io/static/v1?label=@solid-soda/scripts&message=2.2.0&color=75ddf4)](https://github.com/solid-soda/scripts)

## Вводные данные

ПКУ предназначен для проверки разметок участников

## Начало работы: конфигурирование объекта Validator

Перед использованием валидации нужно получить объект ErrorMapFactory - Обязательный этап

```ts
ErrorMapFactory.createErrorMapFactory().then((errorMapFactory) => {});
```

Далее в объект валидации нужно передать созданный объект ErrorMapFactory - Обязательный этап

```ts
const validator = new Validator();
validator.setErrorsMapFactory(errorMapFactory);
```

Далее для проверки исходного текста объект validator может принять функцию для запуска во время проверки.
В качестве входных данных она принимает публичный id текста и исходный текст

```ts
validator.setValidatesCallback((publicId, text) => {
  return true;
});
```

Обязательный этап - запуск создания проверок после того как конфигурирование объекта закончено

```ts
validator.createChecks();
```

Запуск проверки функция validator.isValid ожидает на входе json строку проверяемого документа.  
В случае провала проверки функция validator.getErrors() вернёт все найденные ошибки

```ts
const isValid = validator.isValid(testDoc);
if (isValid) {
  console.log(validator.getErrors());
}
```

Обязательный этап - сброс состояния валидатора после проведения проверки

```ts
validator.refresh();
```

Просле этого валидатор готов к проверке следующего документа.

## Пример работы

```ts
const testDoc = 'test markup in format JSON';

ErrorMapFactory.createErrorMapFactory().then((errorMapFactory) => {
  const validator = new Validator();
  validator.setErrorsMapFactory(errorMapFactory);
  validator.setValidatesCallback((publicId, text) => {
    return true;
  });
  validator.createChecks();
  const isValid = validator.isValid(testDoc);
  if (isValid) {
    console.log(validator.getErrors());
  }

  validator.refresh();
});
```
