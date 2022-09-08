// source: koinos/options.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

var google_protobuf_descriptor_pb = require('google-protobuf/google/protobuf/descriptor_pb.js');
goog.object.extend(proto, google_protobuf_descriptor_pb);
goog.exportSymbol('proto.koinos.btype', null, global);
goog.exportSymbol('proto.koinos.bytes_type', null, global);
/**
 * @enum {number}
 */
proto.koinos.bytes_type = {
  BASE64: 0,
  BASE58: 1,
  HEX: 2,
  BLOCK_ID: 3,
  TRANSACTION_ID: 4,
  CONTRACT_ID: 5,
  ADDRESS: 6
};


/**
 * A tuple of {field number, class constructor} for the extension
 * field named `btype`.
 * @type {!jspb.ExtensionFieldInfo<!proto.koinos.bytes_type>}
 */
proto.koinos.btype = new jspb.ExtensionFieldInfo(
    50000,
    {btype: 0},
    null,
     /** @type {?function((boolean|undefined),!jspb.Message=): !Object} */ (
         null),
    0);

google_protobuf_descriptor_pb.FieldOptions.extensionsBinary[50000] = new jspb.ExtensionFieldBinaryInfo(
    proto.koinos.btype,
    jspb.BinaryReader.prototype.readEnum,
    jspb.BinaryWriter.prototype.writeEnum,
    undefined,
    undefined,
    false);
// This registers the extension field with the extended class, so that
// toObject() will function correctly.
google_protobuf_descriptor_pb.FieldOptions.extensions[50000] = proto.koinos.btype;

goog.object.extend(exports, proto.koinos);
