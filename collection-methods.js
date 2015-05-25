Mongo.Collection.prototype.methods = function( methods ) {
  var collection = this;

  if ( collection._transform && ! collection._methods ) {
    collection._original_transform = collection._transform;
  }

  if ( ! collection._methods ) {
    collection._methods = function Document( doc ) {
      return _.extend( this, doc );
    };

    collection._transform = function( doc ) {
      doc = collection._original_transform ? collection._original_transform( doc ) : doc;
      return new collection._methods( doc );
    };
  }

  _.each( methods, function( method, key ) {
    collection._methods.prototype[ key ] = method;
  } );
};
