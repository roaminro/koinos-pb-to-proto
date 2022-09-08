# koinos-pb-to-proto

Small JavaScript library to convert a Koinos `.pb` file (proto file in binary format) to a Koinos `.proto` file (proto file in text format)

## Installation

### Node
```sh
# with npm
npm install @roamin/koinos-pb-to-proto

# with yarn
yarn add @roamin/koinos-pb-to-proto
```

### Browser
```html
<script src="https://cdn.jsdelivr.net/gh/roaminro/koinos-pb-to-proto@latest/dist/koinos-pb-to-proto.min.js"></script>
```

## Examples
### NodeJS
```js
const koinosPbToProto = require('@roamin/koinos-pb-to-proto');

const pb = 'CpUJCiJrb2lub3MvY29udHJhY3RzL3Rva2VuL3Rva2VuLnByb3RvEhZrb2lub3MuY29udHJhY3RzLnRva2VuGhRrb2lub3Mvb3B0aW9ucy5wcm90byIQCg5uYW1lX2FyZ3VtZW50cyIjCgtuYW1lX3Jlc3VsdBIUCgV2YWx1ZRgBIAEoCVIFdmFsdWUiEgoQc3ltYm9sX2FyZ3VtZW50cyIlCg1zeW1ib2xfcmVzdWx0EhQKBXZhbHVlGAEgASgJUgV2YWx1ZSIUChJkZWNpbWFsc19hcmd1bWVudHMiJwoPZGVjaW1hbHNfcmVzdWx0EhQKBXZhbHVlGAEgASgNUgV2YWx1ZSIYChZ0b3RhbF9zdXBwbHlfYXJndW1lbnRzIi8KE3RvdGFsX3N1cHBseV9yZXN1bHQSGAoFdmFsdWUYASABKARCAjABUgV2YWx1ZSIyChRiYWxhbmNlX29mX2FyZ3VtZW50cxIaCgVvd25lchgBIAEoDEIEgLUYBlIFb3duZXIiLQoRYmFsYW5jZV9vZl9yZXN1bHQSGAoFdmFsdWUYASABKARCAjABUgV2YWx1ZSJeChJ0cmFuc2Zlcl9hcmd1bWVudHMSGAoEZnJvbRgBIAEoDEIEgLUYBlIEZnJvbRIUCgJ0bxgCIAEoDEIEgLUYBlICdG8SGAoFdmFsdWUYAyABKARCAjABUgV2YWx1ZSIRCg90cmFuc2Zlcl9yZXN1bHQiQAoObWludF9hcmd1bWVudHMSFAoCdG8YASABKAxCBIC1GAZSAnRvEhgKBXZhbHVlGAIgASgEQgIwAVIFdmFsdWUiDQoLbWludF9yZXN1bHQiRAoOYnVybl9hcmd1bWVudHMSGAoEZnJvbRgBIAEoDEIEgLUYBlIEZnJvbRIYCgV2YWx1ZRgCIAEoBEICMAFSBXZhbHVlIg0KC2J1cm5fcmVzdWx0IioKDmJhbGFuY2Vfb2JqZWN0EhgKBXZhbHVlGAEgASgEQgIwAVIFdmFsdWUieQoTbWFuYV9iYWxhbmNlX29iamVjdBIcCgdiYWxhbmNlGAEgASgEQgIwAVIHYmFsYW5jZRIWCgRtYW5hGAIgASgEQgIwAVIEbWFuYRIsChBsYXN0X21hbmFfdXBkYXRlGAMgASgEQgIwAVIObGFzdE1hbmFVcGRhdGUiQAoKYnVybl9ldmVudBIYCgRmcm9tGAEgASgMQgSAtRgGUgRmcm9tEhgKBXZhbHVlGAIgASgEQgIwAVIFdmFsdWUiPAoKbWludF9ldmVudBIUCgJ0bxgBIAEoDEIEgLUYBlICdG8SGAoFdmFsdWUYAiABKARCAjABUgV2YWx1ZSJaCg50cmFuc2Zlcl9ldmVudBIYCgRmcm9tGAEgASgMQgSAtRgGUgRmcm9tEhQKAnRvGAIgASgMQgSAtRgGUgJ0bxIYCgV2YWx1ZRgDIAEoBEICMAFSBXZhbHVlQj5aPGdpdGh1Yi5jb20va29pbm9zL2tvaW5vcy1wcm90by1nb2xhbmcva29pbm9zL2NvbnRyYWN0cy90b2tlbmIGcHJvdG8z';

const protos = koinosPbToProto.convert(pb);

for (const proto of protos) {
    console.log(proto.file);
    console.log(proto.definition);
}
```

### Browser
```js
const pb = 'CpUJCiJrb2lub3MvY29udHJhY3RzL3Rva2VuL3Rva2VuLnByb3RvEhZrb2lub3MuY29udHJhY3RzLnRva2VuGhRrb2lub3Mvb3B0aW9ucy5wcm90byIQCg5uYW1lX2FyZ3VtZW50cyIjCgtuYW1lX3Jlc3VsdBIUCgV2YWx1ZRgBIAEoCVIFdmFsdWUiEgoQc3ltYm9sX2FyZ3VtZW50cyIlCg1zeW1ib2xfcmVzdWx0EhQKBXZhbHVlGAEgASgJUgV2YWx1ZSIUChJkZWNpbWFsc19hcmd1bWVudHMiJwoPZGVjaW1hbHNfcmVzdWx0EhQKBXZhbHVlGAEgASgNUgV2YWx1ZSIYChZ0b3RhbF9zdXBwbHlfYXJndW1lbnRzIi8KE3RvdGFsX3N1cHBseV9yZXN1bHQSGAoFdmFsdWUYASABKARCAjABUgV2YWx1ZSIyChRiYWxhbmNlX29mX2FyZ3VtZW50cxIaCgVvd25lchgBIAEoDEIEgLUYBlIFb3duZXIiLQoRYmFsYW5jZV9vZl9yZXN1bHQSGAoFdmFsdWUYASABKARCAjABUgV2YWx1ZSJeChJ0cmFuc2Zlcl9hcmd1bWVudHMSGAoEZnJvbRgBIAEoDEIEgLUYBlIEZnJvbRIUCgJ0bxgCIAEoDEIEgLUYBlICdG8SGAoFdmFsdWUYAyABKARCAjABUgV2YWx1ZSIRCg90cmFuc2Zlcl9yZXN1bHQiQAoObWludF9hcmd1bWVudHMSFAoCdG8YASABKAxCBIC1GAZSAnRvEhgKBXZhbHVlGAIgASgEQgIwAVIFdmFsdWUiDQoLbWludF9yZXN1bHQiRAoOYnVybl9hcmd1bWVudHMSGAoEZnJvbRgBIAEoDEIEgLUYBlIEZnJvbRIYCgV2YWx1ZRgCIAEoBEICMAFSBXZhbHVlIg0KC2J1cm5fcmVzdWx0IioKDmJhbGFuY2Vfb2JqZWN0EhgKBXZhbHVlGAEgASgEQgIwAVIFdmFsdWUieQoTbWFuYV9iYWxhbmNlX29iamVjdBIcCgdiYWxhbmNlGAEgASgEQgIwAVIHYmFsYW5jZRIWCgRtYW5hGAIgASgEQgIwAVIEbWFuYRIsChBsYXN0X21hbmFfdXBkYXRlGAMgASgEQgIwAVIObGFzdE1hbmFVcGRhdGUiQAoKYnVybl9ldmVudBIYCgRmcm9tGAEgASgMQgSAtRgGUgRmcm9tEhgKBXZhbHVlGAIgASgEQgIwAVIFdmFsdWUiPAoKbWludF9ldmVudBIUCgJ0bxgBIAEoDEIEgLUYBlICdG8SGAoFdmFsdWUYAiABKARCAjABUgV2YWx1ZSJaCg50cmFuc2Zlcl9ldmVudBIYCgRmcm9tGAEgASgMQgSAtRgGUgRmcm9tEhQKAnRvGAIgASgMQgSAtRgGUgJ0bxIYCgV2YWx1ZRgDIAEoBEICMAFSBXZhbHVlQj5aPGdpdGh1Yi5jb20va29pbm9zL2tvaW5vcy1wcm90by1nb2xhbmcva29pbm9zL2NvbnRyYWN0cy90b2tlbmIGcHJvdG8z';

const protos = KoinosPbToProto.convert(pb);

for (const proto of protos) {
    console.log(proto.file);
    console.log(proto.definition);
}
```

Will print:

```sh
koinos/contracts/token/token.proto
```
```proto
syntax = 'proto3';

package koinos.contracts.token;

import "koinos/options.proto";


  message name_arguments {
    
    
  }


  message name_result {
    
      string value = 1 ;
  }


  message symbol_arguments {
    
    
  }


  message symbol_result {
    
      string value = 1 ;
  }


  message decimals_arguments {
    
    
  }


  message decimals_result {
    
      uint32 value = 1 ;
  }


  message total_supply_arguments {
    
    
  }


  message total_supply_result {
    
      uint64 value = 1 [jstype = JS_STRING];
  }


  message balance_of_arguments {
    
      bytes owner = 1 [(koinos.btype) = ADDRESS];
  }


  message balance_of_result {
    
      uint64 value = 1 [jstype = JS_STRING];
  }


  message transfer_arguments {
    
      bytes from = 1 [(koinos.btype) = ADDRESS];
    bytes to = 2 [(koinos.btype) = ADDRESS];
    uint64 value = 3 [jstype = JS_STRING];
  }


  message transfer_result {
    
    
  }


  message mint_arguments {
    
      bytes to = 1 [(koinos.btype) = ADDRESS];
    uint64 value = 2 [jstype = JS_STRING];
  }


  message mint_result {
    
    
  }


  message burn_arguments {
    
      bytes from = 1 [(koinos.btype) = ADDRESS];
    uint64 value = 2 [jstype = JS_STRING];
  }


  message burn_result {
    
    
  }


  message balance_object {
    
      uint64 value = 1 [jstype = JS_STRING];
  }


  message mana_balance_object {
    
      uint64 balance = 1 [jstype = JS_STRING];
    uint64 mana = 2 [jstype = JS_STRING];
    uint64 last_mana_update = 3 [jstype = JS_STRING];
  }


  message burn_event {
    
      bytes from = 1 [(koinos.btype) = ADDRESS];
    uint64 value = 2 [jstype = JS_STRING];
  }


  message mint_event {
    
      bytes to = 1 [(koinos.btype) = ADDRESS];
    uint64 value = 2 [jstype = JS_STRING];
  }


  message transfer_event {
    
      bytes from = 1 [(koinos.btype) = ADDRESS];
    bytes to = 2 [(koinos.btype) = ADDRESS];
    uint64 value = 3 [jstype = JS_STRING];
  }
```