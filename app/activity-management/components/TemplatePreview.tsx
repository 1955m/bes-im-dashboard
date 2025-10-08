'use client';

import React from 'react';
import { Image, Calendar, Clock } from 'lucide-react';
import { FormData, PreviewMode } from '../types';
import { MERCHANT_OPTIONS } from '../constants';

interface TemplatePreviewProps {
  formData: FormData;
  previewMode: PreviewMode;
  onToggleMode: () => void;
}

export default function TemplatePreview({
  formData,
  previewMode,
  onToggleMode
}: TemplatePreviewProps) {
  const getMerchantName = (merchantValue: string) => {
    const merchant = MERCHANT_OPTIONS.find(m => m.value === merchantValue);
    return merchant?.label || '商户';
  };

  return (
    <div className={`rounded-lg p-4 min-h-[300px] transition-colors ${previewMode === 'dark' ? 'bg-black border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
      {formData.templateType === 'activity' ? (
        // Activity Center Preview
        <div className="space-y-3">
          <div className="aspect-video bg-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-gray-600 text-center">
              <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">缩略图/视频预览</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${previewMode === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
              }`}>
              {getMerchantName(formData.merchant).charAt(0)}
            </div>
            <span className={`text-sm ${previewMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {getMerchantName(formData.merchant)}
            </span>
          </div>
          <div className={`text-lg font-semibold ${previewMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {formData.title || '活动标题'}
          </div>
          <div className={`text-sm leading-relaxed ${previewMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {formData.content || '活动内容将显示在这里...'}
          </div>
          {formData.linkName && formData.linkUrl && (
            <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
              {formData.linkName}
            </button>
          )}
        </div>
      ) : (
        // Exchange Rate Preview
        <div className="space-y-3">
          <div className="aspect-video bg-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-gray-600 text-center">
              <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">缩略图/视频预览</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${previewMode === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
              }`}>
              {getMerchantName(formData.merchant).charAt(0)}
            </div>
            <span className={`text-sm ${previewMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {getMerchantName(formData.merchant)}
            </span>
          </div>
          <div className={`text-lg font-semibold ${previewMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {formData.title || '交易汇率标题'}
          </div>
          {formData.exchangeRate && (
            <div className="space-y-3">
              {[
                { label: '银行卡汇率', value: '¥1.00', icon: '/icon/icon_bank.png' },
                { label: '支付宝汇率', value: '¥1.00', icon: '/icon/icon_alipay.png' },
                { label: '微信汇率', value: '¥1.00', icon: '/icon/icon_wechat.png' },
                { label: '数字币汇率', value: '¥1.00', icon: '/icon/icon_rmb.png' },
                { label: 'USDT汇率', value: '₮7.17', icon: '/icon/icon_usdt.png' }
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center justify-between gap-3 px-4 py-3 rounded-full border ${previewMode === 'dark' ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                  <div className="flex items-center gap-3">
                    <img src={item.icon} alt={item.label} className="w-9 h-9 object-contain" />
                    <span className={`text-lg font-medium ${previewMode === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{item.label}</span>
                  </div>
                  <span className={`text-lg font-semibold ${previewMode === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>{item.value}</span>
                </div>
              ))}
            </div>
          )}
          <div className={`text-sm leading-relaxed ${previewMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {formData.content || '汇率内容将显示在这里...'}
          </div>
          {formData.linkName && formData.linkUrl && (
            <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
              {formData.linkName}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
