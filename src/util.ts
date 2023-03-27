import {
  FieldOptions,
  FileDescriptorProto,
  FieldDescriptorProto,
  EnumDescriptorProto,
  DescriptorProto
} from 'google-protobuf/google/protobuf/descriptor_pb.js';

import * as optionspb from './options_pb.js';

export function getSyntax(fileDesc: FileDescriptorProto) {
  return `syntax = '${fileDesc.getSyntax()}';\n\n`;
}

export function getPackage(fileDesc: FileDescriptorProto) {
  return `package ${fileDesc.getPackage()};\n\n`;
}

export function getImport(dependency: string) {
  return `import "${dependency}";\n\n`;
}

export function getEnum(enumDesc: EnumDescriptorProto) {
  const values: string[] = [];

  for (const value of enumDesc.getValueList()) {
    values.push(`${value.getName()} = ${value.getNumber()};`);
  }

  return `
enum ${enumDesc.getName()} {
  ${values.join('\n  ')} 
}\n\n`;
}

export function getExtension(extDesc: FieldDescriptorProto) {
  const optional = extDesc.hasProto3Optional() ? 'optional' : '';

  return `
extend ${extDesc.getExtendee()} {
  ${optional} ${extDesc.getTypeName()} ${extDesc.getName()} = ${extDesc.getNumber()};
}\n\n`;
}

export function getJSType(options: FieldOptions | undefined): string {
  if (!options) {
    return '';
  }

  switch (options.getJstype()) {
    case FieldOptions.JSType.JS_NORMAL:
      return '';
    case FieldOptions.JSType.JS_NUMBER:
      return 'jstype = JS_NUMBER';
    case FieldOptions.JSType.JS_STRING:
      return 'jstype = JS_STRING';
    default:
      return '';
  }
}

export function getbType(options: FieldOptions | undefined): string {

  if (!options) {
    return '';
  }

  // @ts-ignore btype is defined here
  switch (options.getExtension(optionspb.btype)) {
    // @ts-ignore
    case optionspb.bytes_type.BASE64:
      return '(koinos.btype) = BASE64';
    // @ts-ignore
    case optionspb.bytes_type.BASE58:
      return '(koinos.btype) = BASE58';
    // @ts-ignore
    case optionspb.bytes_type.HEX:
      return '(koinos.btype) = HEX';
    // @ts-ignore
    case optionspb.bytes_type.BLOCK_ID:
      return '(koinos.btype) = BLOCK_ID';
    // @ts-ignore
    case optionspb.bytes_type.TRANSACTION_ID:
      return '(koinos.btype) = TRANSACTION_ID';
    // @ts-ignore
    case optionspb.bytes_type.CONTRACT_ID:
      return '(koinos.btype) = CONTRACT_ID';
    // @ts-ignore
    case optionspb.bytes_type.ADDRESS:
      return '(koinos.btype) = ADDRESS';
    default:
      return '';
  }
}

export function getFieldLabel(fieldDesc: FieldDescriptorProto): string {
  switch (fieldDesc.getLabel()) {
    case FieldDescriptorProto.Label.LABEL_REPEATED:
      return 'repeated';
    case FieldDescriptorProto.Label.LABEL_REQUIRED:
      return 'required';
    case FieldDescriptorProto.Label.LABEL_OPTIONAL:
      // in proto3, optional is not handled via label anymore
      return '';
    default:
      throw new Error(
        `Label '${fieldDesc.getLabel()}' is not supported`
      );
  }
}

export function getFieldType(
  fieldDesc: FieldDescriptorProto,
): string {
  switch (fieldDesc.getType()) {
    case FieldDescriptorProto.Type.TYPE_INT32:
      return 'int32';
    case FieldDescriptorProto.Type.TYPE_SINT32:
      return 'sint32';
    case FieldDescriptorProto.Type.TYPE_FIXED32:
      return 'fixed32';
    case FieldDescriptorProto.Type.TYPE_SFIXED32:
      return 'sfixed32';
    case FieldDescriptorProto.Type.TYPE_UINT32:
      return 'uint32';
    case FieldDescriptorProto.Type.TYPE_INT64:
      return 'int64';
    case FieldDescriptorProto.Type.TYPE_SINT64:
      return 'sint64';
    case FieldDescriptorProto.Type.TYPE_FIXED64:
      return 'fixed64';
    case FieldDescriptorProto.Type.TYPE_SFIXED64:
      return 'sfixed64';
    case FieldDescriptorProto.Type.TYPE_UINT64:
      return 'uint64';
    case FieldDescriptorProto.Type.TYPE_FLOAT:
      return 'float';
    case FieldDescriptorProto.Type.TYPE_DOUBLE:
      return 'double';
    case FieldDescriptorProto.Type.TYPE_BOOL:
      return 'bool';
    case FieldDescriptorProto.Type.TYPE_STRING:
      return 'string';
    case FieldDescriptorProto.Type.TYPE_BYTES:
      return 'bytes';
    case FieldDescriptorProto.Type.TYPE_MESSAGE:
    case FieldDescriptorProto.Type.TYPE_ENUM:
      return fieldDesc.getTypeName() as string;
    default:
      throw new Error(
        `Type '${fieldDesc.getTypeName()}' is not supported`
      );
  }
}

export function getField(fieldDesc: FieldDescriptorProto) {
  const fieldOptions = fieldDesc.getOptions();
  const fieldName = fieldDesc.getName();
  const fieldId = fieldDesc.getNumber();
  const optional = fieldDesc.hasProto3Optional() ? 'optional' : '';

  const jsType = getJSType(fieldOptions);
  const bType = getbType(fieldOptions);
  const extension = jsType ? `[${jsType}]` : bType ? `[${bType}]` : '';

  return `${optional} ${getFieldLabel(fieldDesc)} ${getFieldType(fieldDesc)} ${fieldName} = ${fieldId} ${extension};`;
}

export function getOneofs(messageDesc: DescriptorProto, oneOfFields: string[][]): string[] {
  const result: string[] = [];

  for (const [index, oneofDesc] of messageDesc.getOneofDeclList().entries()) {
    const oneofName = oneofDesc.getName() as string;

    if (oneOfFields[index]) {
      result.push(`
    oneof ${oneofName} {
      ${oneOfFields[index].join('\n    ')}
    }\n\n`);
    }
  }

  return result;
}

export function getMessage(messageDesc: DescriptorProto) {
  const nestedMessages: string[] = [];
  const fields: string[] = [];
  const oneOfFields: string[][] = [];

  // nested messages
  for (const nestedMessage of messageDesc.getNestedTypeList()) {
    nestedMessages.push(getMessage(nestedMessage));
  }

  // fields
  for (const fieldDesc of messageDesc.getFieldList()) {
    const field = getField(fieldDesc);
    if (fieldDesc.hasOneofIndex() && !fieldDesc.hasProto3Optional()) {
      const oneOfIndex = fieldDesc.getOneofIndex();
      if (oneOfIndex === undefined) {
        throw new Error('Missing one_of index.');
      }

      let existingFields = oneOfFields[oneOfIndex];
      if (existingFields === undefined) {
        existingFields = [];
        oneOfFields[oneOfIndex] = existingFields;
      }
      existingFields.push(field);
    } else {
      fields.push(field);
    }
  }

  // one_of fields
  const oneOfs = getOneofs(messageDesc, oneOfFields);

  return `
  message ${messageDesc.getName()} {
    ${nestedMessages.join('\n  ')}
    ${fields.join('\n  ')}
    ${oneOfs.join('\n  ')}
  }\n\n`;
}