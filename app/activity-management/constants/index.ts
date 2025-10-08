import { SelectOption } from '../types';

export const TEMPLATE_OPTIONS: SelectOption[] = [
  { value: 'activity', label: '活动中心' },
  { value: 'exchange_rate', label: '交易汇率' }
];

export const LANGUAGE_OPTIONS: SelectOption[] = [
  { value: 'zh-cn', label: '简体中文' },
  { value: 'zh-hant-cn', label: '繁体中文' },
  { value: 'us', label: '英文' },
  { value: 'vi', label: '越南语' },
  { value: 'th', label: '泰语' },
  { value: 'id', label: '印尼语' },
  { value: 'pt-br', label: '巴西语' }
];

export const MERCHANT_OPTIONS: SelectOption[] = [
  { value: '', label: '请选择所属商户' },
  { value: 'pay', label: 'Pay' },
  { value: 'sports', label: '足篮聊球' },
  { value: '444sports', label: '444体育' }
];

export const REPEAT_RULE_OPTIONS: SelectOption[] = [
  { value: 'once', label: '一次性' },
  { value: 'daily', label: '每日' },
  { value: 'weekly', label: '每周' },
  { value: 'custom', label: '自订' }
];

export const CUSTOM_REPEAT_TYPE_OPTIONS: SelectOption[] = [
  { value: 'days', label: '每N天' },
  { value: 'weekdays', label: '每周指定星期' }
];

export const PAGE_SIZE_OPTIONS: SelectOption[] = [
  { value: 10, label: '10条/页' },
  { value: 20, label: '20条/页' },
  { value: 50, label: '50条/页' }
];

// Filter options
export const FILTER_LANGUAGE_OPTIONS: SelectOption[] = [
  { value: '', label: '全部语言' },
  { value: 'zh-cn', label: '简体中文' },
  { value: 'zh-hant-cn', label: '繁体中文' },
  { value: 'us', label: 'English' },
  { value: 'vi', label: '越南语' },
  { value: 'th', label: '泰语' },
  { value: 'id', label: '印尼语' },
  { value: 'pt-br', label: '巴西语' }
];

export const FILTER_TEMPLATE_OPTIONS: SelectOption[] = [
  { value: '', label: '全部模板' },
  { value: 'activity', label: '活动中心' },
  { value: 'exchange_rate', label: '交易汇率' }
];

export const FILTER_STATUS_OPTIONS: SelectOption[] = [
  { value: '', label: '全部状态' },
  { value: 'published', label: '已发布' },
  { value: 'pending', label: '待发布' },
  { value: 'failed', label: '失败' },
  { value: 'inactive', label: '已下架' }
];

export const FILTER_MERCHANT_OPTIONS: SelectOption[] = [
  { value: '', label: '全部商户' },
  { value: 'pay', label: 'Pay' },
  { value: 'sports', label: '足篮聊球' },
  { value: '444sports', label: '444体育' }
];

export const FILTER_SCHEDULED_OPTIONS: SelectOption[] = [
  { value: '', label: '全部类型' },
  { value: 'yes', label: '定时发布' },
  { value: 'no', label: '立即发布' }
];

export const STATUS_BADGES = {
  pending: { text: '待发布', class: 'bg-yellow-100 text-yellow-800' },
  published: { text: '已发布', class: 'bg-green-100 text-green-800' },
  failed: { text: '失败', class: 'bg-red-100 text-red-800' },
  inactive: { text: '已下架', class: 'bg-gray-100 text-gray-800' }
};

export const FILTER_LABELS: Record<string, Record<string, string>> = {
  language: {
    'zh-cn': '简体中文',
    'zh-hant-cn': '繁体中文',
    'us': 'English',
    'vi': '越南语',
    'th': '泰语',
    'id': '印尼语',
    'pt-br': '巴西语'
  },
  template: { 'activity': '活动中心', 'exchange_rate': '交易汇率' },
  status: {
    'published': '已发布',
    'pending': '待发布',
    'failed': '失败',
    'inactive': '已下架'
  },
  merchant: { 'pay': 'Pay', 'sports': '足篮聊球', '444sports': '444体育' },
  isScheduled: { 'yes': '定时发布', 'no': '非定时' }
};

export const WEEKDAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
export const WEEKDAYS_SHORT = ['一', '二', '三', '四', '五', '六', '日'];

export const DEFAULT_FORM_DATA = {
  templateType: 'activity',
  mediaType: '1',
  language: '',
  title: '',
  content: '',
  exchangeRate: true,
  linkName: '',
  linkUrl: '',
  sort: '',
  initialViews: '',
  merchant: '',
  googleCode: '',
  scheduledPublish: false,
  publishTime: '',
  repeatRule: 'once',
  customRepeatType: 'days',
  customRepeatValue: 1,
  customRepeatWeekdays: [] as number[]
};

// Helper functions to map codes to display labels
export const getLanguageLabel = (code: string): string => {
  const option = LANGUAGE_OPTIONS.find(opt => opt.value === code);
  return option ? option.label : code;
};

export const getTemplateLabel = (code: string): string => {
  const option = TEMPLATE_OPTIONS.find(opt => opt.value === code);
  return option ? option.label : code;
};

export const getMerchantLabel = (code: string): string => {
  const option = MERCHANT_OPTIONS.find(opt => opt.value === code);
  return option ? option.label : code;
};
