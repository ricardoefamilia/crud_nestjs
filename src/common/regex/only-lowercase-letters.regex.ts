import { RegexProtocol } from './regex.protocol';

export class OnlyLowercaseLettersRegex implements RegexProtocol {
  execute(str: string): string {
    return str.replace(/[^a-z]/g, ''); // remove tudo o que não é uma letra minúscula.
  }
}
