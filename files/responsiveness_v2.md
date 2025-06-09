# 📱 Księga Responsywności

Nasze żelazne zasady, które obowiązują we wszystkich projektach.

---

## 1️⃣ Jednostki i skalowanie

✅ Zamiast `px`, używamy:
- `rem` — względem font-size `html`.
- `em` — względem elementu nadrzędnego.
- `%`, `vw`, `vh` — dla elastycznych szerokości/wysokości.

💡 Przykład:
```css
padding: 1.25rem;
width: 80%;
font-size: 1rem;
```

---

## 2️⃣ Flexbox i Grid

✅ Zawsze preferujemy:
- `display: flex` (z `flex-wrap`).
- `display: grid` — do układów siatki.

💡 Przykład:
```css
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}
```

---

## 3️⃣ Media Queries

✅ Breakpointy:
- Mobile: `max-width: 480px`
- Tablet: `max-width: 768px`
- Desktop: `min-width: 1024px`

💡 Przykład:
```css
@media (max-width: 768px) {
  .product {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
```

---

## 4️⃣ Typografia

✅ Zawsze używamy:
- `rem` lub `em` dla rozmiarów tekstu.
- Nigdy `px`!

💡 Przykład:
```css
font-size: 1rem;
font-size: 1.5rem;
```

---

## 5️⃣ Obrazki i multimedia

✅ Obrazki nie powinny wychodzić poza kontener:
```css
img {
  max-width: 100%;
  height: auto;
}
```

---

## 6️⃣ Ogólne zasady

✅ `box-sizing: border-box` — zawsze!  
✅ Unikamy `width: 400px`, `height: 500px` — używamy `min()` i `max()` jeśli konieczne.  
✅ Używamy elastycznych layoutów, np. `flex-wrap` zamiast `overflow`.

---

## 📌 Uwaga
Ten dokument jest żywy — każda nowa zasada trafia tutaj i jest aktualizowana.
