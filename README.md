# DietApp API — Backend do zarządzania planami dietetycznymi

System backendowy REST API zaprojektowany do obsługi gabinetu dietetycznego. Aplikacja umożliwia dietetykom zarządzanie bazą pacjentów, katalogiem produktów spożywczych oraz tworzenie spersonalizowanych jadłospisów z automatycznym przeliczaniem wartości odżywczych i kalorii.

## Kluczowe funkcjonalności

1. Autentykacja i role (AuthModule, UserModule):
    - Rejestracja i logowanie użytkowników z hashowaniem haseł (bcrypt).
    - Uwierzytelnianie bezstanowe oparte o tokeny JWT (Bearer token).
    - Podział ról w systemie: DIETITIAN (Dietetyk) oraz PATIENT (Pacjent).

2. Katalog produktów (ProductModule):
    - Pełny CRUD produktów spożywczych (kalorie, białko, tłuszcz, węglowodany na 100g).
    - Wyszukiwanie produktów po nazwie (?search=).
    - Modyfikacja bazy ograniczona wyłącznie do roli dietetyka.

3. Karty medyczne pacjentów (PatientModule):
    - Zakładanie profili pacjentów powiązanych z dietetykiem prowadzącym.
    - Rejestracja parametrów: wzrost, waga początkowa, waga docelowa, data urodzenia, notatki medyczne.

4. Jadłospisy i kalkulacja wartości odżywczych (DietPlanModule):
    - Tworzenie planów diety dla konkretnego pacjenta.
    - Przypisywanie posiłków do określonych dni tygodnia (1–7) oraz typów posiłków (BREAKFAST, LUNCH, itp.).
    - Dodawanie produktów o zdefiniowanej gramaturze do poszczególnych dań.
    - Automatyczna kalkulacja sumarycznych kalorii oraz makroskładników per posiłek.
---

## Stos technologiczny

- Framework: NestJS
- Język: TypeScript
- Baza danych: PostgreSQL
- ORM: Prisma
- Autentykacja: Passport JWT (@nestjs/passport, passport-jwt, bcrypt)
- Walidacja danych: class-validator, class-transformer
- Dokumentacja API: Swagger UI (@nestjs/swagger)

---

## Uruchomienie projektu lokalnie

### 1. Klonowanie repozytorium i instalacja zależności
```bash
git clone <URL_REPOZYTORIUM>
cd DietAppAPI
npm install
```

### 2. Konfiguracja zmiennych środowiskowych

Skopiuj plik z przykładową konfiguracją środowiskową:

```bash
cp .env.example .env
```

Następnie uzupełnij w pliku .env poprawne dane logowania do bazy PostgreSQL (DATABASE_URL).

### 3. Migracja bazy danych i seedowanie danych

Zastosuj schemat bazy za pomocą Prismy i zasil słownik produktów danymi początkowymi:

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Uruchomienie serwera

Tryb deweloperski:
```bash
npm run start:dev
```

Tryb produkcyjny:
```bash
npm run build
npm run start:prod
```

Aplikacja wystartuje pod adresem: http://localhost

---

## Dokumentacja Swagger UI

Kompletna, interaktywna dokumentacja wszystkich endpointów REST API wraz ze schematami DTO jest dostępna pod adresem:

http://localhost/api