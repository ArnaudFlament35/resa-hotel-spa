const Encore = require('@symfony/webpack-encore');

// Configure le mode de webpack (dev ou prod selon NODE_ENV)
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // Dossier de sortie des assets compilés
    .setOutputPath('public/build/')

    // URL publique pour accéder aux assets depuis le navigateur
    .setPublicPath('/build')

    // ---- Points d'entrée ----
    // Frontend public (Twig + React)
    .addEntry('frontend', './assets/app.js')
    // Backend admin (Twig only, pas de React nécessaire ici)
    .addEntry('backend', './assets/backend.js')

    // Sépare automatiquement les dépendances partagées (React, etc.)
    .splitEntryChunks()

    // Nécessaire pour Symfony UX
    .enableSingleRuntimeChunk()

    // Nettoyage du dossier public/build/ avant chaque build
    .cleanupOutputBeforeBuild()

    // Sourcemaps visibles dans les DevTools du navigateur (dev only)
    .enableSourceMaps(!Encore.isProduction())

    // Hash dans les noms de fichier en production (cache busting)
    .enableVersioning(Encore.isProduction())

    // Active le support de React / JSX
    .enableReactPreset()

    // Optionnel : PostCSS (si tu veux utiliser Tailwind CSS plus tard)
    // .enablePostCssLoader()

    // Optionnel : Sass
    // .enableSassLoader()
;

module.exports = Encore.getWebpackConfig();
