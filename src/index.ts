import {
  FileDescriptorSet,
} from 'google-protobuf/google/protobuf/descriptor_pb.js';

import {
  getSyntax,
  getPackage,
  getImport,
  getEnum,
  getExtension,
  getMessage
} from './util.js';

interface ProtoDescriptor {
  file: string;
  definition: string;
}

/**
  * Convert a binary proto file into a text proto file
  * @returns ProtoDescriptor
  * @example
  * ```js
  * const pb = 'CpUJCiJrb2lub3MvY29udHJhY3RzL3Rva2VuL3Rva2VuLnByb3RvEhZrb2lub3MuY29udHJhY3RzLnRva2VuGhRrb2lub3Mvb3B0aW9ucy5wcm90byIQCg5uYW1lX2FyZ3VtZW50cyIjCgtuYW1lX3Jlc3VsdBIUCgV2YWx1ZRgBIAEoCVIFdmFsdWUiEgoQc3ltYm9sX2FyZ3VtZW50cyIlCg1zeW1ib2xfcmVzdWx0EhQKBXZhbHVlGAEgASgJUgV2YWx1ZSIUChJkZWNpbWFsc19hcmd1bWVudHMiJwoPZGVjaW1hbHNfcmVzdWx0EhQKBXZhbHVlGAEgASgNUgV2YWx1ZSIYChZ0b3RhbF9zdXBwbHlfYXJndW1lbnRzIi8KE3RvdGFsX3N1cHBseV9yZXN1bHQSGAoFdmFsdWUYASABKARCAjABUgV2YWx1ZSIyChRiYWxhbmNlX29mX2FyZ3VtZW50cxIaCgVvd25lchgBIAEoDEIEgLUYBlIFb3duZXIiLQoRYmFsYW5jZV9vZl9yZXN1bHQSGAoFdmFsdWUYASABKARCAjABUgV2YWx1ZSJeChJ0cmFuc2Zlcl9hcmd1bWVudHMSGAoEZnJvbRgBIAEoDEIEgLUYBlIEZnJvbRIUCgJ0bxgCIAEoDEIEgLUYBlICdG8SGAoFdmFsdWUYAyABKARCAjABUgV2YWx1ZSIRCg90cmFuc2Zlcl9yZXN1bHQiQAoObWludF9hcmd1bWVudHMSFAoCdG8YASABKAxCBIC1GAZSAnRvEhgKBXZhbHVlGAIgASgEQgIwAVIFdmFsdWUiDQoLbWludF9yZXN1bHQiRAoOYnVybl9hcmd1bWVudHMSGAoEZnJvbRgBIAEoDEIEgLUYBlIEZnJvbRIYCgV2YWx1ZRgCIAEoBEICMAFSBXZhbHVlIg0KC2J1cm5fcmVzdWx0IioKDmJhbGFuY2Vfb2JqZWN0EhgKBXZhbHVlGAEgASgEQgIwAVIFdmFsdWUieQoTbWFuYV9iYWxhbmNlX29iamVjdBIcCgdiYWxhbmNlGAEgASgEQgIwAVIHYmFsYW5jZRIWCgRtYW5hGAIgASgEQgIwAVIEbWFuYRIsChBsYXN0X21hbmFfdXBkYXRlGAMgASgEQgIwAVIObGFzdE1hbmFVcGRhdGUiQAoKYnVybl9ldmVudBIYCgRmcm9tGAEgASgMQgSAtRgGUgRmcm9tEhgKBXZhbHVlGAIgASgEQgIwAVIFdmFsdWUiPAoKbWludF9ldmVudBIUCgJ0bxgBIAEoDEIEgLUYBlICdG8SGAoFdmFsdWUYAiABKARCAjABUgV2YWx1ZSJaCg50cmFuc2Zlcl9ldmVudBIYCgRmcm9tGAEgASgMQgSAtRgGUgRmcm9tEhQKAnRvGAIgASgMQgSAtRgGUgJ0bxIYCgV2YWx1ZRgDIAEoBEICMAFSBXZhbHVlQj5aPGdpdGh1Yi5jb20va29pbm9zL2tvaW5vcy1wcm90by1nb2xhbmcva29pbm9zL2NvbnRyYWN0cy90b2tlbmIGcHJvdG8z';
  *
  * const protos = koinosPbToProto.convert(pb);
  *
  * for (const proto of protos) {
  *   console.log(proto.file)
  *   console.log(proto.definition);
  * }
  * ```
  */
export const convert = (pb: string | Buffer) => {
  const input = typeof pb === 'string' ? Buffer.from(pb, 'base64') : pb;

  const fds = FileDescriptorSet.deserializeBinary(input);

  const protoDescriptors: ProtoDescriptor[] = [];

  for (const fd of fds.getFileList()) {
    const file = fd.getName() || '';

    let definition = '';

    // syntax
    if (fd.hasSyntax()) {
      definition += getSyntax(fd);
    }

    // package
    if (fd.hasPackage()) {
      definition += getPackage(fd);
    }

    // options
    if (fd.hasOptions()) {
      // do nothing with options for now
    }

    // imports
    for (const dep of fd.getDependencyList()) {
      definition += getImport(dep);
    }

    // enums
    for (const enumDesc of fd.getEnumTypeList()) {
      definition += getEnum(enumDesc);
    }

    // extensions
    for (const extDesc of fd.getExtensionList()) {
      definition += getExtension(extDesc);
    }

    // messages
    for (const messageDesc of fd.getMessageTypeList()) {
      definition += getMessage(messageDesc);
    }

    protoDescriptors.push({ file, definition });
  }

  return protoDescriptors;
};
