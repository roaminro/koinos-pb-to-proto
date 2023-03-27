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

    expect(pd?.definition).toEqual(`syntax = 'proto3';

package tests;

import "koinos/options.proto";


enum authorization_type {
  contract_call = 0;
  transaction_application = 1;
  contract_upload = 2; 
}


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
    
    optional  uint32 test1 = 1 ;
  optional  uint32 test2 = 4 ;
    
    oneof response {
        .tests.transfer_result tranfer_res = 2 ;
      .tests.transfer_arguments transfer_arg = 3 ;
    }


  }


  message repeated_message {
    
     repeated string value = 1 ;
   repeated .tests.transfer_result result = 2 ;
    
  }


  message call_data {
    
      bytes contract_id = 1 [(koinos.btype) = ADDRESS];
    uint32 entry_point = 2 ;
    bytes caller = 3 ;
    bytes data = 4 ;
    
  }


  message authorize_arguments {
    
      .tests.authorization_type type = 1 ;
  optional  .tests.call_data call = 2 ;
    
  }

`);
  });
});