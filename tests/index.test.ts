import fs from 'fs';
import { convert, ProtoDescriptor } from '../src/';

describe('testing convert', () => {
  let pb: Buffer;
  let conversionResult: ProtoDescriptor[];

  beforeAll(() => {
    pb = fs.readFileSync(__dirname + '/tests.pb');
    conversionResult = convert(pb);
  });

  test('extensions', () => {
    const pd = conversionResult.find(v => v.file === 'koinos/options.proto');

    expect(pd?.definition).toStrictEqual(`syntax = 'proto3';

package koinos;

import "google/protobuf/descriptor.proto";


enum bytes_type {
  BASE64 = 0;
  BASE58 = 1;
  HEX = 2;
  BLOCK_ID = 3;
  TRANSACTION_ID = 4;
  CONTRACT_ID = 5;
  ADDRESS = 6; 
}


extend .google.protobuf.FieldOptions {
  optional .koinos.bytes_type btype = 50000;
}

`);
  });

  test('messages', () => {
    const pd = conversionResult.find(v => v.file === 'messages.proto');

    expect(pd?.definition).toStrictEqual(`syntax = 'proto3';

package tests;

import "koinos/options.proto";


  message transfer_arguments {
    
  message nested_message {
    
      bytes from = 1 [(koinos.btype) = ADDRESS];
    bytes to = 2 [(koinos.btype) = ADDRESS];
    uint64 value = 3 [jstype = JS_STRING];
  }


      bytes from = 1 [(koinos.btype) = ADDRESS];
    bytes to = 2 [(koinos.btype) = ADDRESS];
    uint64 value = 3 [jstype = JS_STRING];
  }


  message transfer_result {
    
      bool value = 1 ;
  }


  message oneof_message {
    
    
    oneof response {
        .tests.transfer_result tranfer_res = 1 ;
      .tests.transfer_arguments transfer_arg = 2 ; 
    }


  }


  message repeated_message {
    
     repeated string value = 1 ;
   repeated .tests.transfer_result result = 2 ;
  }

`);
  });
});