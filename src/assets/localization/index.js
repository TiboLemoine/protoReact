import LocalizedStrings from 'react-native-localization';
import fr from './strings_fr'
import en from './strings_en'

let localizable = new LocalizedStrings({
    fr: fr,
    en: en
});

export default localizable