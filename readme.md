# Slider - jQuery + Ajax + API NASA

> Przykład wykorzystania wiedzy poznanej na zajęciach z jQuery na kursie programowania front-end w systemie bootcamp, na którym jestem mentorem. 
> Pokaz slajdów polega na pobieraniu zdjęć z API NASA i wyświetleniu ich na całej powierzchni strony. Zdjęcia można przełączać za pomocą strzałek (następne, poprzednie) oraz kropek, które są odpowiednikiem każdego zdjęcia. Jeśli użytkownik kliknie 'następny' lub 'poprzedni', a takie element nie istnieje w drzewie DOM to zostanie pobrane z API. W przeciwnym razie po prostu zostanie uruchomiona animacja przełączenia.

## wykorzystane rozwiązania

* jQuery - bibioteka JavaScript, która ułatwia manipulacje na DOM-ie, umożliwia szybkie tworzenie animacji oraz wspiera kompatybilność z różnymi przeglądarkami 

* Ajax - (ang. Asynchronous JavaScript and XML, asynchroniczny JavaScript i XML) – technika tworzenia aplikacji internetowych, w której komunikacja klient - serwer odbywa się bez przymusu przeładowywania całej strony

* API NASA - wykorzystanie API (ang. Application Programming Interface, Interfejs programistyczny aplikacji) w celu pobrania losowaych zdjęć za pomocą Ajax-a.

* JSON - akronim od JavaScript Object Notation, który jest formatem wymiany danych

* Eventy (zdarzenia) typu: `mouseenter`, `mouseout`, `click`, `resize`, `load`, `error`

* Animacje typu: `fadeTo`, `animate` + `position: left`

* HTML + CSS w celu odpowiedniej prezentacji

Zobacz efekt: [Slider - jQuery + Ajax + API NASA](https://bogolubow.github.io/Slider-jQuery-Ajax-API-NASA/).
