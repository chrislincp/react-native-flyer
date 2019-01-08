import { Platform, Dimensions } from 'react-native';

export function isAndroid() {
  return Platform.OS === 'android';
}

export function ifAndroid(androidStyle, iphoneStyle) {
  if (isAndroid()) {
    return androidStyle;
  }
  return iphoneStyle;
}

export function isIphoneX() {
  const X_WIDTH = 375;
  const X_HEIGHT = 812;
  const XSMAX_WIDTH = 414;
  const XSMAX_HEIGHT = 896;
  const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
  return (
    Platform.OS === 'ios'
    && ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH)
      || (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
    || ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH)
      || (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function parseDate(date) {
  let parts;
  const isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s(\d\d):(\d\d):(\d\d)\s*$/;
  try {
    parts = isoExp.exec(date);
  } catch (e) {
    return null;
  }
  if (parts) {
    date = new Date(parts[1], parts[2] - 1, parts[3], parts[4], parts[5], parts[6]);
  } else {
    return null;
  }
  return date;
}
