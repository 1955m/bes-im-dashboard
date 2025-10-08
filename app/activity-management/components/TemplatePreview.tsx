'use client';

import React from 'react';
import { Image, Calendar, Clock } from 'lucide-react';
import { FormData, PreviewMode } from '../types';

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
  return (
    <div className={`rounded-lg p-4 min-h-[300px] transition-colors ${
      previewMode === 'dark' ? 'bg-gray-900 border border-gray-700' : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200'
    }`}>
        {formData.templateType === 'activity' ? (
          // Activity Center Preview
          <div className="space-y-4">
            <div className={`text-lg font-semibold ${previewMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {formData.title || '活动标题'}
            </div>
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">缩略图/视频预览</p>
              </div>
            </div>
            <div className={`text-sm leading-relaxed ${previewMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {formData.content || '活动内容将显示在这里...'}
            </div>
            {formData.linkName && formData.linkUrl && (
              <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
                {formData.linkName}
              </button>
            )}
            <div className={`flex items-center gap-4 text-xs ${previewMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{formData.initialViews || '0'} 次浏览</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>2025-10-08</span>
              </div>
            </div>
          </div>
        ) : (
          // Exchange Rate Preview
          <div className="space-y-4">
            <div className={`text-lg font-semibold ${previewMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {formData.title || '交易汇率标题'}
            </div>
            {formData.exchangeRate && (
              <div className={`border rounded-lg p-4 ${
                previewMode === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className={`text-sm font-medium mb-3 ${previewMode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  实时汇率
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { from: 'USD', to: 'CNY', rate: '7.2534' },
                    { from: 'EUR', to: 'CNY', rate: '7.8421' },
                    { from: 'JPY', to: 'CNY', rate: '0.0489' },
                    { from: 'GBP', to: 'CNY', rate: '9.1234' }
                  ].map((item, idx) => (
                    <div key={idx} className={`p-3 rounded ${
                      previewMode === 'dark' ? 'bg-gray-900' : 'bg-white'
                    }`}>
                      <div className={`text-xs mb-1 ${previewMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.from}/{item.to}
                      </div>
                      <div className={`text-lg font-semibold ${previewMode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {item.rate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className={`text-sm leading-relaxed ${previewMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {formData.content || '汇率内容将显示在这里...'}
            </div>
            <div className={`flex items-center gap-4 text-xs ${previewMode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>最后更新: 2分钟前</span>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
