# KystSti

KystSti is an interactive coastal trail and city walk app for Kristiansund, Norway. The app lets users explore curated tours with stops, QR codes, audio guides, and maps.

## Features
- Multiple tours with unique stops
- QR code scanning to unlock content at each stop
- Audio guides and stories
- Interactive map with route and stops
- Progress tracking
- TourBuilder for creating and exporting your own tours
- Multilingual support (Norwegian/English)

## Getting Started

### 1. Install dependencies
Use pnpm (recommended), npm, or yarn:

```
pnpm install
```

### 2. Run the development server
```
pnpm dev
```

The app will be available at `http://localhost:5173` (or as shown in the terminal).

### 3. Build for production
```
pnpm build
```

### 4. Preview production build
```
pnpm preview
```

## Adding a New Tour
See the guides:
- [Hvordan legge inn en ny tur (norsk)](doc/Hvordan-legge-inn-tur.md)
- [How to add a new tour (English)](doc/How-to-add-a-tour.md)

## Folder Structure
- `src/` — Main source code
  - `components/` — React components
  - `data/tours/` — Tour data files
  - `pages/` — App pages
  - `i18n/` — Translations
  - `hooks/`, `lib/`, `utils/` — Utilities
- `public/` — Static assets
- `doc/` — Documentation

## Contributing
Pull requests and suggestions are welcome! See issues or open a discussion for feature requests.

## License

This project is licensed under the GNU General Public License (GPL). See the LICENSE file for details.

---

Built by David. See the source code on [GitHub](https://github.com/TheFrostBunny/KystSti).
