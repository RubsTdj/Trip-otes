# Trip'Potes — Landing page

Landing page de **Trip'Potes**, l'application pour organiser ses vacances entre amis, en famille ou en couple : partage des dépenses, vote des activités et suggestions selon la destination.

Site **statique** (HTML / CSS / JS pur, zéro dépendance) — rapide, léger, optimisé SEO et facile à héberger n'importe où.

## 🚀 Lancer en local

Aucune installation. Ouvrez simplement `index.html`, ou servez le dossier :

```bash
# Python
python3 -m http.server 8000
# puis ouvrez http://localhost:8000
```

## 📁 Structure

```
.
├── index.html            # Page complète (SEO, sections, formulaire)
├── assets/
│   ├── css/styles.css    # Design : palette punchy, animations, responsive
│   ├── js/main.js        # Reveal au scroll, compteurs, menu mobile, validation form, confetti
│   └── img/
│       ├── favicon.svg
│       └── og-cover.svg  # Image de partage réseaux sociaux
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```

## ✨ Fonctionnalités de la page

- **Design fun & coloré** : dégradés, blobs animés, mockup d'app en CSS, animations au scroll, confetti.
- **Sections** : hero, preuve sociale (compteurs animés), 3 fonctionnalités clés, « comment ça marche », témoignages, réassurance, formulaire bêta-testeur, double CTA stores, FAQ, footer.
- **Badges App Store / Google Play** : cliquables. Tant que les liens des stores ne sont pas connus, un clic renvoie vers le formulaire bêta.
- **Formulaire bêta-testeur** : validation côté client (prénom, e-mail, plateforme, consentement) + message de succès.
- **SEO** : `<title>`/`description`, Open Graph, Twitter Cards, données structurées JSON-LD (MobileApplication + FAQPage), `robots.txt`, `sitemap.xml`, canonical, manifest PWA.
- **Accessibilité** : skip link, `aria-*`, navigation clavier, `prefers-reduced-motion`.

## 🔧 À compléter avant la mise en production

1. **Liens des stores** — dans `assets/js/main.js`, renseignez `STORE_LINKS.ios` et `STORE_LINKS.android`. Les badges redirigeront alors automatiquement vers les stores.
2. **Formulaire bêta** — branchez l'envoi (`form.addEventListener("submit", …)`) sur votre backend / service e-mail (Formspree, un endpoint API, Supabase…). Aujourd'hui les données sont validées puis affichées dans la console.
3. **Domaine** — remplacez `https://trip-potes.app/` (URL canonique, OG, sitemap) par votre domaine réel.
4. **Image Open Graph** — `og-cover.svg` est fourni. Pour une compatibilité maximale sur les réseaux sociaux (Facebook, X, LinkedIn rendent mal le SVG), exportez-la en **PNG 1200×630** (`og-cover.png`) et mettez à jour les balises `og:image` / `twitter:image`.
5. **Liens légaux & réseaux sociaux** — complétez les liens du footer (mentions légales, confidentialité, CGU, Instagram, TikTok, X).
6. **Chiffres** — les statistiques et avis sont illustratifs ; ajustez-les avec vos vraies données.
