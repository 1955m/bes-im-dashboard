import { z } from 'zod';

export const activityFormSchema = z.object({
  // Template configuration
  templateType: z.string().min(1, '请选择内容模板'),

  // Media settings (for activity template)
  mediaType: z.string().min(1, '请选择媒体类型'),
  linkName: z.string().max(10, '按钮名称最多10个字符').optional(),
  linkUrl: z.string().url('请输入有效的链接').or(z.literal('')).optional(),
  initialViews: z.string().optional(),

  // Exchange rate settings (for exchange_rate template)
  exchangeRate: z.boolean().optional(),

  // Content settings
  language: z.string().min(1, '请选择语言'),
  title: z.string().min(1, '请输入标题').max(50, '标题最多50个字符'),
  content: z.string().min(1, '请输入内容'),

  // Publishing settings
  scheduledPublish: z.boolean(),
  publishTime: z.string().optional(),
  repeatRule: z.string().optional(),
  customRepeatType: z.string().optional(),
  customRepeatValue: z.number().optional(),
  customRepeatWeekdays: z.array(z.number()).optional(),

  // Basic configuration
  sort: z.string().min(1, '请输入活动排序').max(4, '排序值最多4位数字'),
  merchant: z.string().min(1, '请选择所属商户'),
  googleCode: z.string().min(6, '请输入6位谷歌验证码').max(6, '谷歌验证码为6位数字'),
}).refine((data) => {
  // If scheduled publish is enabled, publish time is required
  if (data.scheduledPublish && !data.publishTime) {
    return false;
  }
  return true;
}, {
  message: '启用定时发布时必须设置发布时间',
  path: ['publishTime'],
}).refine((data) => {
  // If link URL is provided, link name must also be provided
  if (data.linkUrl && !data.linkName) {
    return false;
  }
  return true;
}, {
  message: '设置链接时必须提供按钮名称',
  path: ['linkName'],
}).refine((data) => {
  // If custom repeat is selected, validate custom settings
  if (data.repeatRule === 'custom') {
    if (data.customRepeatType === 'days' && !data.customRepeatValue) {
      return false;
    }
    if (data.customRepeatType === 'weekdays' && (!data.customRepeatWeekdays || data.customRepeatWeekdays.length === 0)) {
      return false;
    }
  }
  return true;
}, {
  message: '请完成自定义重复规则设置',
  path: ['customRepeatType'],
});

export type ActivityFormValues = z.infer<typeof activityFormSchema>;
