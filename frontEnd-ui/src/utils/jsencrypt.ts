import JSEncrypt from "jsencrypt/bin/jsencrypt.min";

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey =
  "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKRD94CXHw4xXelM8zCY5m0UqScGYC0M\n" +
  "KjnRSxwwM0NY0TVPMPb1f+VfRo656xrepbYYqwP3yYiuJdYwaROEulECAwEAAQ==";

const privateKey =
  "MIIBVgIBADANBgkqhkiG9w0BAQEFAASCAUAwggE8AgEAAkEApEP3gJcfDjFd6Uzz\n" +
  "MJjmbRSpJwZgLQwqOdFLHDAzQ1jRNU8w9vV/5V9GjrnrGt6lthirA/fJiK4l1jBp\n" +
  "E4S6UQIDAQABAkBFljFcPSi/x3QEKEABf1RmM1FxIcdObg/ZTGtoNpcQ2PpY3RNd\n" +
  "v1d9ir4zogjUCoqps2K7X54r5nHIv3hI8gPtAiEA16KmGWJFXYfGtksCQ3dPDX4g\n" +
  "1oP7TXY/KW7NunWJX2cCIQDDA6ZLyozOh7u8A6X7u51mqcpd9Uz1rodQSN8EOF1d\n" +
  "hwIhAILeJWw2Zd6zrnen4kHLwOBxccB+7R8/6mlc4+KLvsl1AiEAijNP6m5EkyiF\n" +
  "1pwPSPKQfWzeSO/J9mIU6sR5p5f6MokCIQDS1tjpeotGoBLlIsUkhU4VK2LRgEaw\n" +
  "RZQLMi18DujoYg==";

export function encrypt(txt: any) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey); // 设置公钥
  return encryptor.encrypt(txt); // 对数据进行加密
}

// 解密
export function decrypt(txt: any) {
  const encryptor = new JSEncrypt();
  encryptor.setPrivateKey(privateKey); // 设置私钥
  return encryptor.decrypt(txt); // 对数据进行解密
}
