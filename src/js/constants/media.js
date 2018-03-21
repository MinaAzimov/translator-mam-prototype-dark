export const LAST_USED_FORMAT = 'YYYY-MM-DD-HH-mm';
export const EXPIRATION_FORMAT = 'YYYY/MM/DD';

export const CNBC = 'CNBC';
export const GETTY = 'Getty Images';
export const AP = 'AP';
export const REUTERS = 'Reuters';
export const AP_OPTIONS = {
  '1w': '1 week',
  '1m': '1 month',
  '3m': '3 months',
  '6m': '6 months'
};
export const AP_PLACEHOLDERS = {
  licensing_info: 'Source: AP | Premium Use',
  select_text: 'Select the expiration date:',
  licensing_options: Object.keys(AP_OPTIONS).map(key => AP_OPTIONS[key])
};

export const GETTY_OPTIONS = {
  'S': {
    width: 594,
    height: 360
  },
  'M': {
    width: 1024,
    height: 620
  },
  'L': {
    width: 3776,
    height: 2288
  }
};
export const GETTY_PLACEHOLDERS = {
  licensing_info: 'Source: Getty Images | One-time Use',
  select_text: 'Select a size:',
  licensing_options: Object.keys(GETTY_OPTIONS)
};
export const REUTERS_ONETIME = 'Onetime';
export const REUTERS_PREMIUM = 'Premium';
export const REUTERS_PLACEHOLDERS = {
  licensing_info: 'Source: Reuters | ',
  select_text: '',
  licensing_options: []
};
export const MEDIA_USAGES = [
  'Promo',
  'Logo',
  'Cover',
  'Header',
  'Background',
  'Roku - Small',
  'Roku - Large',
  'Trailer',
  'Episode'
];