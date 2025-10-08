'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Plus, Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Link, Image, Video, Calendar as CalendarIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import TemplatePreview from './TemplatePreview';
import { FormData, PreviewMode } from '../types';
import { activityFormSchema, type ActivityFormValues } from '../schema/formSchema';
import {
  TEMPLATE_OPTIONS,
  LANGUAGE_OPTIONS,
  MERCHANT_OPTIONS,
  REPEAT_RULE_OPTIONS,
  CUSTOM_REPEAT_TYPE_OPTIONS,
  WEEKDAYS,
  WEEKDAYS_SHORT,
  DEFAULT_FORM_DATA
} from '../constants';

interface ActivityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export default function ActivityDrawer({
  isOpen,
  onClose,
  formData,
  setFormData
}: ActivityDrawerProps) {
  const [showTemplateConfirm, setShowTemplateConfirm] = useState(false);
  const [pendingTemplateChange, setPendingTemplateChange] = useState('');
  const [previewMode, setPreviewMode] = useState<PreviewMode>('light');

  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: formData,
    mode: 'onChange',
  });

  // Watch form values for preview
  const watchedValues = form.watch();

  // Automatically set exchangeRate to true when template is exchange_rate
  useEffect(() => {
    if (watchedValues.templateType === 'exchange_rate') {
      form.setValue('exchangeRate', true);
    } else {
      form.setValue('exchangeRate', false);
    }
  }, [watchedValues.templateType, form]);

  const handleTemplateChange = (newTemplate: string | number) => {
    const currentValues = form.getValues();
    const hasContent = currentValues.title || currentValues.content || currentValues.language;

    if (hasContent && newTemplate !== currentValues.templateType) {
      setPendingTemplateChange(newTemplate as string);
      setShowTemplateConfirm(true);
    } else {
      form.setValue('templateType', newTemplate as string);
    }
  };

  const confirmTemplateChange = () => {
    form.reset({ ...DEFAULT_FORM_DATA, templateType: pendingTemplateChange });
    setShowTemplateConfirm(false);
    setPendingTemplateChange('');
  };

  const onSubmit = (values: ActivityFormValues) => {
    console.log('Form submitted:', values);
    setFormData(values as FormData);
    // Here you would typically make an API call
    onClose();
  };

  const handleClose = () => {
    form.reset(formData);
    onClose();
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetContent className="w-full sm:max-w-[95vw] lg:max-w-[1400px] p-0 overflow-hidden">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>增加</SheetTitle>
          </SheetHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-[calc(100vh-120px)]">
              {/* Split Panel Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
                {/* Left Panel: Form Fields (Scrollable) */}
                <div className="overflow-y-auto px-6 pt-6 space-y-6 border-r">
              {/* Template Configuration */}
              <div className="space-y-4">
                <h3 className="text-base font-medium">模板配置</h3>
                <FormField
                  control={form.control}
                  name="templateType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        内容模板 <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={handleTemplateChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {TEMPLATE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value.toString()}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>选择活动中心或交易汇率模板类型</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Media Settings (for activity template) */}
              {watchedValues.templateType === 'activity' && (
                <div className="space-y-4">
                  <h3 className="text-base font-medium">媒体设置</h3>

                  <FormField
                    control={form.control}
                    name="mediaType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          缩略图 <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1" id="media-image" />
                              <Label htmlFor="media-image">图片类型</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="2" id="media-video" />
                              <Label htmlFor="media-video">视频类型</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>选择上传图片或视频作为活动缩略图</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <Label htmlFor="file-upload" className="text-sm font-normal">上传文件</Label>
                    <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-border transition-colors cursor-pointer">
                      <Plus className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                      />
                      <p className="text-sm text-muted-foreground">点击上传或拖拽文件到此处</p>
                    </div>
                    <p className="text-sm text-muted-foreground">注：建议上传16:9图片，图片质量控制在5M以下，最多9张</p>
                  </div>

                  <div className="grid grid-cols-[140px_1fr] gap-2">
                    <FormField
                      control={form.control}
                      name="linkName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>按钮名称</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              maxLength={10}
                              placeholder="请输入按钮名称"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="linkUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>第三方链接</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="请输入第三方活动链接"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">可选：添加外部活动链接按钮（最多10个字符）</p>

                  <FormField
                    control={form.control}
                    name="initialViews"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>初始浏览量</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormDescription>设置活动显示的初始浏览次数</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Content Settings */}
              <div className="space-y-4">
                <h3 className="text-base font-medium">内容设置</h3>

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        语言 <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="grid grid-cols-3 gap-3"
                        >
                          {LANGUAGE_OPTIONS.map((lang) => (
                            <div key={lang.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={lang.value as string} id={`lang-${lang.value}`} />
                              <Label htmlFor={`lang-${lang.value}`}>{lang.label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>选择需要发布的语言版本</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        标题 <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          maxLength={50}
                          placeholder="请输入标题"
                        />
                      </FormControl>
                      <FormDescription>最多50个字符</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        内容 <span className="text-destructive">*</span>
                      </FormLabel>
                      <div className="border border-input rounded-md">
                        <TooltipProvider>
                          <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-muted">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Toggle size="sm" aria-label="Bold">
                                  <Bold className="w-4 h-4" />
                                </Toggle>
                              </TooltipTrigger>
                              <TooltipContent>粗体</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Toggle size="sm" aria-label="Italic">
                                  <Italic className="w-4 h-4" />
                                </Toggle>
                              </TooltipTrigger>
                              <TooltipContent>斜体</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Toggle size="sm" aria-label="Underline">
                                  <Underline className="w-4 h-4" />
                                </Toggle>
                              </TooltipTrigger>
                              <TooltipContent>下划线</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Toggle size="sm" aria-label="Strikethrough">
                                  <Strikethrough className="w-4 h-4" />
                                </Toggle>
                              </TooltipTrigger>
                              <TooltipContent>删除线</TooltipContent>
                            </Tooltip>
                            <div className="w-px h-6 bg-border mx-1"></div>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Toggle size="sm" aria-label="Align left">
                                  <AlignLeft className="w-4 h-4" />
                                </Toggle>
                              </TooltipTrigger>
                              <TooltipContent>左对齐</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Toggle size="sm" aria-label="Align center">
                                  <AlignCenter className="w-4 h-4" />
                                </Toggle>
                              </TooltipTrigger>
                              <TooltipContent>居中对齐</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Toggle size="sm" aria-label="Align right">
                                  <AlignRight className="w-4 h-4" />
                                </Toggle>
                              </TooltipTrigger>
                              <TooltipContent>右对齐</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Toggle size="sm" aria-label="Justify">
                                  <AlignJustify className="w-4 h-4" />
                                </Toggle>
                              </TooltipTrigger>
                              <TooltipContent>两端对齐</TooltipContent>
                            </Tooltip>
                            <div className="w-px h-6 bg-border mx-1"></div>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Toggle size="sm" aria-label="Bullet list">
                                  <List className="w-4 h-4" />
                                </Toggle>
                              </TooltipTrigger>
                              <TooltipContent>项目列表</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Toggle size="sm" aria-label="Numbered list">
                                  <ListOrdered className="w-4 h-4" />
                                </Toggle>
                              </TooltipTrigger>
                              <TooltipContent>编号列表</TooltipContent>
                            </Tooltip>
                            <div className="w-px h-6 bg-border mx-1"></div>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Toggle size="sm" aria-label="Link">
                                  <Link className="w-4 h-4" />
                                </Toggle>
                              </TooltipTrigger>
                              <TooltipContent>插入链接</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Toggle size="sm" aria-label="Image">
                                  <Image className="w-4 h-4" />
                                </Toggle>
                              </TooltipTrigger>
                              <TooltipContent>插入图片</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Toggle size="sm" aria-label="Video">
                                  <Video className="w-4 h-4" />
                                </Toggle>
                              </TooltipTrigger>
                              <TooltipContent>插入视频</TooltipContent>
                            </Tooltip>
                          </div>
                        </TooltipProvider>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[300px] border-0 rounded-t-none focus-visible:ring-0 resize-none"
                            placeholder="请输入内容"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Publishing Settings */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-base font-medium">发布设置</h3>

                <FormField
                  control={form.control}
                  name="scheduledPublish"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>定时发布</FormLabel>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <Label>启用定时发布</Label>
                      </div>
                      <FormDescription>可设置活动在指定时间自动发布</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchedValues.scheduledPublish && (
                  <div className="pl-6 border-l-2 border-border space-y-4">
                    <FormField
                      control={form.control}
                      name="publishTime"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>
                            发布时间 <span className="text-destructive">*</span>
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                >
                                  {field.value ? (
                                    field.value
                                  ) : (
                                    <span>选择日期和时间</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <div className="p-3 border-b">
                                <Input
                                  type="datetime-local"
                                  value={field.value}
                                  onChange={(e) => field.onChange(e.target.value)}
                                  className="w-full"
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                          <FormDescription>选择活动发布的具体日期和时间</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="repeatRule"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>重复规则</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {REPEAT_RULE_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value.toString()}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {watchedValues.repeatRule === 'custom' && (
                      <div className="bg-muted p-4 rounded-md space-y-4">
                        <h4 className="text-sm font-medium">自定义重复规则</h4>

                        <FormField
                          control={form.control}
                          name="customRepeatType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>重复方式</FormLabel>
                              <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {CUSTOM_REPEAT_TYPE_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value.toString()}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {watchedValues.customRepeatType === 'days' && (
                          <FormField
                            control={form.control}
                            name="customRepeatValue"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>间隔天数</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    min="1"
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {watchedValues.customRepeatType === 'weekdays' && (
                          <FormField
                            control={form.control}
                            name="customRepeatWeekdays"
                            render={() => (
                              <FormItem>
                                <FormLabel>选择星期</FormLabel>
                                <div className="grid grid-cols-4 gap-2">
                                  {WEEKDAYS.map((day, index) => (
                                    <FormField
                                      key={index}
                                      control={form.control}
                                      name="customRepeatWeekdays"
                                      render={({ field }) => {
                                        return (
                                          <FormItem
                                            key={index}
                                            className="flex flex-row items-center space-x-2 space-y-0"
                                          >
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.includes(index + 1)}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange([...field.value, index + 1])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                          (value) => value !== index + 1
                                                        )
                                                      )
                                                }}
                                              />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                              {day}
                                            </FormLabel>
                                          </FormItem>
                                        )
                                      }}
                                    />
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    )}

                    {watchedValues.publishTime && (
                      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                        <div className="flex items-start gap-2">
                          <CalendarIcon className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <div className="font-medium">发布计划</div>
                            <div className="mt-1">
                              首次发布：{watchedValues.publishTime}
                              {watchedValues.repeatRule === 'daily' && '，之后每日重复'}
                              {watchedValues.repeatRule === 'weekly' && '，之后每周重复'}
                              {watchedValues.repeatRule === 'custom' && watchedValues.customRepeatType === 'days' && `，之后每${watchedValues.customRepeatValue}天重复`}
                              {watchedValues.repeatRule === 'custom' && watchedValues.customRepeatType === 'weekdays' && watchedValues.customRepeatWeekdays && watchedValues.customRepeatWeekdays.length > 0 && `，之后每周${watchedValues.customRepeatWeekdays.map(d => WEEKDAYS_SHORT[d - 1]).join('、')}重复`}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Basic Configuration */}
              <div className="space-y-4">
                <h3 className="text-base font-medium">基本配置</h3>

                <FormField
                  control={form.control}
                  name="sort"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        活动排序 <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          maxLength={4}
                        />
                      </FormControl>
                      <FormDescription>注:活动按排序值倒序排序</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="merchant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        所属商户 <span className="text-destructive">*</span>
                      </FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="请选择所属商户" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MERCHANT_OPTIONS.filter(option => option.value !== '').map((option) => (
                            <SelectItem key={option.value} value={option.value.toString()}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>选择活动所属的商户平台</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="googleCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        谷歌验证码 <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="请输入谷歌验证码"
                        />
                      </FormControl>
                      <FormDescription>输入6位谷歌验证码以确认操作</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

                  {/* Footer inside left panel */}
                  <div className="sticky bottom-0 bg-background pt-4 pb-4 border-t mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={handleClose}>
                      返回
                    </Button>
                    <Button type="submit">
                      保存
                    </Button>
                  </div>
                </div>

                {/* Right Panel: Live Preview (Sticky) */}
                <div className="overflow-y-auto bg-muted/30 px-6 py-6">
                  <div className="sticky top-0 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-semibold">模板预览</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewMode(previewMode === 'light' ? 'dark' : 'light')}
                      >
                        {previewMode === 'light' ? '浅色' : '深色'}
                      </Button>
                    </div>

                    <TemplatePreview
                      formData={watchedValues as FormData}
                      previewMode={previewMode}
                      onToggleMode={() => setPreviewMode(previewMode === 'light' ? 'dark' : 'light')}
                    />

                    <p className="text-sm text-muted-foreground mt-4">
                      此预览仅供参考，实际显示可能会有所不同
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>

      {/* Template Switch Confirmation Modal */}
      <AlertDialog open={showTemplateConfirm} onOpenChange={setShowTemplateConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认切换模板</AlertDialogTitle>
            <AlertDialogDescription>
              切换模板将清除所有已填写的内容，确定要继续吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingTemplateChange('')}>
              取消
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmTemplateChange}>
              确认切换
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
