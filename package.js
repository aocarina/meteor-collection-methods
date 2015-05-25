Package.describe({
  name: 'ocarina:collection-methods',
  version: '1.0.2',
  // Brief, one-line summary of the package.
  summary: 'Transform your collections with methods that you define',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/aocarina/meteor-collection-methods.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function( api ) {
  api.versionsFrom( '1.0' );
  api.use([
    'underscore',
    'mongo'
  ]);
  api.addFiles( 'collection-methods.js' );
});

Package.onTest(function( api ) {
  api.use( 'tinytest' );
  api.use( 'ocarina:collection-methods' );
  api.addFiles( 'collection-methods-tests.js' );
});
