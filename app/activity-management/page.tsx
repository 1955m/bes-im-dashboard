'use client';

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import FilterSection from './components/FilterSection';
import ActivityTable from './components/ActivityTable';
import ActivityDrawer from './components/ActivityDrawer';
import { FormData, Filters, TableRow } from './types';
import { DEFAULT_FORM_DATA } from './constants';

export default function ActivityManagementPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);

  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    language: '',
    template: '',
    status: '',
    merchant: '',
    isScheduled: ''
  });

  // Mock table data (would come from API in real application)
  const tableData: TableRow[] = [
    {
      id: 394,
      language: '简体中文',
      template: '活动中心',
      title: 'USDT充值',
      views: 0,
      sort: 1,
      merchant: 'Pay',
      createTime: '2025-09-11 22:16:38',
      updater: 'walletnight',
      updateTime: '2025-09-11 22:58:35',
      status: 'published',
      scheduledTime: null
    },
    {
      id: 392,
      language: '简体中文',
      template: '活动中心',
      title: '⚽马尔默vs北雪平，马尔默能否力克保级球...',
      views: 130,
      sort: 702,
      merchant: '足篮聊球',
      createTime: '2025-07-12 19:18:08',
      updater: '16946933385',
      updateTime: '2025-07-12 19:18:08',
      status: 'published',
      scheduledTime: null
    },
    {
      id: 391,
      language: '简体中文',
      template: '交易汇率',
      title: '今日美元兑人民币汇率更新',
      views: 121,
      sort: 701,
      merchant: '足篮聊球',
      createTime: '2025-07-11 20:04:48',
      updater: '16946933385',
      updateTime: '2025-07-11 20:04:48',
      status: 'pending',
      scheduledTime: '2025-10-05 09:00:00'
    },
    {
      id: 390,
      language: '简体中文',
      template: '活动中心',
      title: '⚽004保克什VS克卢日',
      views: 129,
      sort: 700,
      merchant: '足篮聊球',
      createTime: '2025-07-10 21:23:42',
      updater: '16946933385',
      updateTime: '2025-07-10 21:23:42',
      status: 'failed',
      scheduledTime: '2025-10-04 12:00:00',
      errorMessage: '网络连接超时，发布失败'
    },
    {
      id: 389,
      language: '简体中文',
      template: '活动中心',
      title: 'Pay功能图片教程',
      views: 16,
      sort: 2,
      merchant: 'Pay',
      createTime: '2025-07-10 15:57:29',
      updater: 'Wallet',
      updateTime: '2025-09-11 14:21:23',
      status: 'inactive',
      scheduledTime: null
    },
    {
      id: 388,
      language: '简体中文',
      template: '交易汇率',
      title: '欧元汇率波动分析',
      views: 245,
      sort: 698,
      merchant: '足篮聊球',
      createTime: '2025-07-09 14:32:11',
      updater: '16946933385',
      updateTime: '2025-07-09 14:32:11',
      status: 'published',
      scheduledTime: null
    },
    {
      id: 387,
      language: '简体中文',
      template: '活动中心',
      title: '🏀NBA总决赛竞猜活动',
      views: 567,
      sort: 697,
      merchant: '444体育',
      createTime: '2025-07-08 10:15:23',
      updater: 'guge888',
      updateTime: '2025-07-08 10:15:23',
      status: 'published',
      scheduledTime: null
    },
    {
      id: 386,
      language: '简体中文',
      template: '活动中心',
      title: '周末充值优惠活动',
      views: 89,
      sort: 696,
      merchant: 'Pay',
      createTime: '2025-07-07 16:45:30',
      updater: 'walletnight',
      updateTime: '2025-07-07 16:45:30',
      status: 'pending',
      scheduledTime: '2025-10-06 00:00:00'
    },
    {
      id: 385,
      language: '简体中文',
      template: '交易汇率',
      title: '日元兑换实时更新',
      views: 312,
      sort: 695,
      merchant: '足篮聊球',
      createTime: '2025-07-06 09:20:15',
      updater: '16946933385',
      updateTime: '2025-07-06 09:20:15',
      status: 'published',
      scheduledTime: null
    },
    {
      id: 384,
      language: '简体中文',
      template: '活动中心',
      title: '⚽世界杯预测赢大奖',
      views: 1024,
      sort: 694,
      merchant: '444体育',
      createTime: '2025-07-05 13:10:42',
      updater: 'guge888',
      updateTime: '2025-07-05 13:10:42',
      status: 'published',
      scheduledTime: null
    }
  ];

  const totalItems = 74;

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900" style={{ colorScheme: 'light' }}>
      <Sidebar />

      <div className="flex-1 overflow-auto bg-gray-100">
        <div className="p-6">
          <div className="w-full bg-white rounded-lg shadow-sm p-6 text-gray-900">
            <FilterSection
              filters={filters}
              setFilters={setFilters}
              showAdvancedFilters={showAdvancedFilters}
              setShowAdvancedFilters={setShowAdvancedFilters}
              onAddClick={() => setIsDrawerOpen(true)}
            />

            <ActivityTable
              data={tableData}
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        </div>
      </div>

      <ActivityDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
