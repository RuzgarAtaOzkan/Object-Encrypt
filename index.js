'use strict';

const chalk = require('chalk');

class ObjectEncrypt {
  constructor() {}

  static createKey(password) {
    // console.log(` ~ Initalizing KEY OBJECT...`);

    if (!password) {
      throw new Error('Password hasnt provided in the params');
    }

    const encryptionLetters = '12345678901234567890qwertyuiopasdfghjklzxcvbnm'
      .toUpperCase()
      .split('');
    const sectionNameEncryptionLetters = 'qwertyuiopasdfghjklzxcvbnm'
      .toUpperCase()
      .split('');
    const letters = password.split('');
    const complexity = 3;
    const sectionsLengthComplexity = complexity * 3;
    const sectionNameComplexity = complexity * 4;

    let createdSections = [];

    for (let i = 0; i < sectionsLengthComplexity; i++) {
      let sectionNameEncryption = '';

      for (let j = 0; j < sectionNameComplexity; j++) {
        const randomSectionNameEncryptionIndex = Math.floor(
          Math.random() * sectionNameEncryptionLetters.length
        );
        sectionNameEncryption +=
          sectionNameEncryptionLetters[randomSectionNameEncryptionIndex];
      }

      for (let j = 0; j < sectionNameComplexity; j++) {
        while (sectionNameEncryption === createdSections[j]) {
          sectionNameEncryption = '';

          for (let k = 0; k < sectionNameComplexity; k++) {
            const randomSectionNameEncryptionIndex = Math.floor(
              Math.random() * sectionNameEncryptionLetters.length
            );
            sectionNameEncryption +=
              sectionNameEncryptionLetters[randomSectionNameEncryptionIndex];
          }
        }
      }

      createdSections.push(sectionNameEncryption);
    }

    const sections = [...createdSections];
    createdSections = undefined;

    const keyObject = {};

    if (complexity <= 2 || complexity >= 5) {
      for (let i = 0; i < letters.length; i++) {
        keyObject[letters[i]] = {};

        for (let j = 0; j < sections.length; j++) {
          keyObject[letters[i]][sections[j]] = [];
        }
      }

      console.error(
        chalk.red(
          ' ! Complexity argument of the createKey cannot be belov 2 or above 4'
        )
      );
      console.log(' ~ Creating an empty Key Object...');
      console.log(
        chalk.yellow(
          ' ! Recommended complexity number is 4 or 3, default complexity number is set to 3'
        )
      );
      throw new Error(
        ' ! Recommended complexity number is 4 or 3, default complexity number is set to 3'
      );
    }

    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i];
      keyObject[letter] = {};

      for (let j = 0; j < sections.length; j++) {
        // j represents the section configuration, configure a specific section in the belove code.

        const section = sections[j];
        keyObject[letter][section] = [];

        for (let k = 0; k < complexity * 2; k++) {
          // k represents how many elements should a section have, example: sectionName: ['SDF', 'SDF', 'SDFD'];

          let encryption = '';

          for (let l = 0; l < complexity * 2; l++) {
            const randomEncryptionLetter = Math.floor(
              Math.random() * encryptionLetters.length
            );
            encryption = encryption + encryptionLetters[randomEncryptionLetter];
          }

          // in here we are iterating through all the sections index in all the properties of the object to avoid the same encryption in the object properties, doesnt matter if we get same encryption in the same properties array but we change it due to syntax
          // but if we get same encryption in different properties of the representationObject password will be decrypted wrongly.
          // because it will take the first property letter of the representaionObject when it is matched with the encryptedPassword so
          // all the properties has to have unique encryptions in it.
          if (keyObject[letter] && keyObject[letter][section]) {
            const keyObjectProperties = Object.getOwnPropertyNames(keyObject);

            for (let m = 0; m < keyObjectProperties.length; m++) {
              for (let n = 0; n < sections.length; n++) {
                for (
                  let sectionsIndex = 0;
                  sectionsIndex < 4;
                  sectionsIndex++
                ) {
                  if (keyObject[letters[m]][sections[n]]) {
                    while (
                      encryption ===
                      keyObject[letters[m]][sections[n]][sectionsIndex]
                    ) {
                      // development purposes
                      console.log(
                        ` ~ Same Encryption Found in: `,
                        chalk.yellow(letters[m])
                      );
                      console.log(` ~ Section: `, chalk.yellow(sections[n]));
                      console.log(
                        ` ~ Array:`,
                        keyObject[letters[m]][sections[0]],
                        ` Index:`,
                        chalk.yellow(sectionsIndex)
                      );

                      encryption = '';
                      for (let l = 0; l < complexity * 2; l++) {
                        const randomEncryptionLetter = Math.floor(
                          Math.random() * encryptionLetters.length
                        );
                        encryption =
                          encryption +
                          encryptionLetters[randomEncryptionLetter];
                      }
                    }
                  }
                }
              }
            }
          }

          keyObject[letter][section] =
            keyObject[letter][section].concat(encryption);
          encryption = '';
        }
      }
    }

    // shuffle the properties of the keyObject to prevent the sequences of UTF-16 code units values attacks
    // efffsane oldu lul
    const shuffledKeyObjectProperties = Object.getOwnPropertyNames(
      keyObject
    ).sort(() => Math.random() - 0.5);
    const shuffledKeyObject = {};

    // bind the properties of the keyObject to shuffledKeyObject
    shuffledKeyObjectProperties.forEach((item, index) => {
      shuffledKeyObject[item] = keyObject[item];
    });

    return Object.freeze({ ...shuffledKeyObject });
  }

  static encrypt(password, keyObject) {
    if (!password || !keyObject) {
      throw new Error('Password or key hasnt provided in the params');
    }

    if (typeof password !== 'string') {
      throw new Error('Password must be string');
    }

    if (typeof keyObject !== 'object') {
      throw new Error('Key must be an object');
    }

    password = password.toString();

    //console.log(` ~ Encrypting password...`);

    const keyObjectProperties = Object.getOwnPropertyNames(keyObject);

    const sections = Object.getOwnPropertyNames(
      keyObject[keyObjectProperties[0]]
    ); // apple, lemon, or banana section, for now it doesnt matter which property we take from the representationalkeyObject because they all have the same sections;

    const randomSectionIndex = Math.floor(Math.random() * sections.length);
    const choosenSection = sections[randomSectionIndex]; // choosen section for this encryption

    let encryptedPassword = '';

    for (let i = 0; i < keyObjectProperties.length; i++) {
      for (let j = 0; j < sections.length; j++) {
        if (keyObject[keyObjectProperties[i]][sections[j]].length === 0) {
          console.error(
            chalk.red(
              ' ! One or more array in sections of the keyObject is empty'
            )
          );
          console.error(chalk.red(' ! Returning null...'));
          return null;
        }
      }
    }

    for (let i = 0; i < password.length; i++) {
      const passwordLetter = password[i];

      for (let j = 0; j < keyObjectProperties.length; j++) {
        const keyObjectProperty = keyObjectProperties[j];

        if (passwordLetter === keyObjectProperty) {
          // here we are choosing a random encryption from the choosenSection array of the passwordLetter of the keyObject
          // the length of the choosen section
          const choosenSectionLength =
            keyObject[`${keyObjectProperty}`][choosenSection].length;
          const randomIndex = Math.floor(Math.random() * choosenSectionLength);
          encryptedPassword =
            encryptedPassword +
            keyObject[`${keyObjectProperty}`][choosenSection][randomIndex];
        }
      }
    }

    //console.log(` ~ Encrypting password is done...`);

    return `${encryptedPassword}`;
  }

  static decrypt(encryptedPassword, keyObject) {
    if (!keyObject || !encryptedPassword) {
      throw new Error('Encrypted password or key hasnt provided in the params');
    }

    if (typeof encryptedPassword !== 'string') {
      throw new Error('Password must be string');
    }

    if (typeof keyObject !== 'object') {
      throw new Error('Key must be an object');
    }

    //console.log(` ~ Decrypting password...`);

    let decryptedPassword = '';
    const keyObjectProperties = Object.getOwnPropertyNames(keyObject);

    if (keyObjectProperties.length <= 0) {
      console.log(chalk.red(` ~ keyObject is empty in decrypt...`));
      console.log(chalk.red(` ~ Returning null...`));
      return null;
    }

    const sectionProperties = Object.getOwnPropertyNames(
      keyObject[keyObjectProperties[0]]
    );

    for (let i = 0; i <= encryptedPassword.length; i++) {
      if (i % 6 === 0) {
        // the value 6 is static I think it is better that way if we hard code it.

        // extract the encryption from the encryptedPassword by seeking through with the coefficients of the complexity

        const extractedEncryption = encryptedPassword.substr(i, 6);

        for (let j = 0; j < keyObjectProperties.length; j++) {
          for (let k = 0; k < sectionProperties.length; k++) {
            keyObject[keyObjectProperties[j]][sectionProperties[k]].find(
              (item, index) => {
                if (extractedEncryption === item) {
                  decryptedPassword += keyObjectProperties[j];
                }
              }
            );
          }
        }
      }
    }

    //console.log(` ~ Decrypting password is done...`);

    return `${decryptedPassword}`;
  }
}

module.exports = ObjectEncrypt;
