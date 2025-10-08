'use client';

import React, { useState, useEffect } from 'react';
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
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA);

  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    language: '',
    template: '',
    status: '',
    merchant: '',
    isScheduled: ''
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Mock table data (would come from API in real application)
  const tableData: TableRow[] = [
    // Simplified Chinese (zh-cn) items
    { id: 394, language: 'zh-cn', template: 'activity', title: 'USDT充值优惠活动', views: 0, sort: 1, merchant: 'pay', createTime: '2025-09-11 22:16:38', updater: 'walletnight', updateTime: '2025-09-11 22:58:35', status: 'published', scheduledTime: null },
    { id: 392, language: 'zh-cn', template: 'activity', title: '⚽马尔默vs北雪平，马尔默能否力克保级球队？', views: 130, sort: 702, merchant: 'sports', createTime: '2025-07-12 19:18:08', updater: '16946933385', updateTime: '2025-07-12 19:18:08', status: 'published', scheduledTime: null },
    { id: 391, language: 'zh-cn', template: 'exchange_rate', title: '今日美元兑人民币汇率更新', views: 121, sort: 701, merchant: 'sports', createTime: '2025-07-11 20:04:48', updater: '16946933385', updateTime: '2025-07-11 20:04:48', status: 'pending', scheduledTime: '2025-10-05 09:00:00' },
    { id: 390, language: 'zh-cn', template: 'activity', title: '⚽004保克什VS克卢日', views: 129, sort: 700, merchant: 'sports', createTime: '2025-07-10 21:23:42', updater: '16946933385', updateTime: '2025-07-10 21:23:42', status: 'failed', scheduledTime: '2025-10-04 12:00:00', errorMessage: '网络连接超时，发布失败' },
    { id: 389, language: 'zh-cn', template: 'activity', title: 'Pay功能图片教程', views: 16, sort: 2, merchant: 'pay', createTime: '2025-07-10 15:57:29', updater: 'Wallet', updateTime: '2025-09-11 14:21:23', status: 'inactive', scheduledTime: null },
    { id: 388, language: 'zh-cn', template: 'exchange_rate', title: '欧元汇率波动分析', views: 245, sort: 698, merchant: 'sports', createTime: '2025-07-09 14:32:11', updater: '16946933385', updateTime: '2025-07-09 14:32:11', status: 'published', scheduledTime: null },
    { id: 387, language: 'zh-cn', template: 'activity', title: '🏀NBA总决赛竞猜活动', views: 567, sort: 697, merchant: '444sports', createTime: '2025-07-08 10:15:23', updater: 'guge888', updateTime: '2025-07-08 10:15:23', status: 'published', scheduledTime: null },
    { id: 386, language: 'zh-cn', template: 'activity', title: '周末充值优惠活动', views: 89, sort: 696, merchant: 'pay', createTime: '2025-07-07 16:45:30', updater: 'walletnight', updateTime: '2025-07-07 16:45:30', status: 'pending', scheduledTime: '2025-10-06 00:00:00' },
    { id: 385, language: 'zh-cn', template: 'exchange_rate', title: '日元兑换实时更新', views: 312, sort: 695, merchant: 'sports', createTime: '2025-07-06 09:20:15', updater: '16946933385', updateTime: '2025-07-06 09:20:15', status: 'published', scheduledTime: null },
    { id: 384, language: 'zh-cn', template: 'activity', title: '⚽世界杯预测赢大奖', views: 1024, sort: 694, merchant: '444sports', createTime: '2025-07-05 13:10:42', updater: 'guge888', updateTime: '2025-07-05 13:10:42', status: 'published', scheduledTime: null },
    { id: 383, language: 'zh-cn', template: 'activity', title: '新用户注册礼包', views: 543, sort: 693, merchant: 'pay', createTime: '2025-07-04 11:20:15', updater: 'walletnight', updateTime: '2025-07-04 11:20:15', status: 'inactive', scheduledTime: null },
    { id: 382, language: 'zh-cn', template: 'exchange_rate', title: '英镑汇率走势分析', views: 187, sort: 692, merchant: 'sports', createTime: '2025-07-03 09:15:22', updater: '16946933385', updateTime: '2025-07-03 09:15:22', status: 'published', scheduledTime: null },
    { id: 381, language: 'zh-cn', template: 'activity', title: '🏀CBA总决赛直播', views: 892, sort: 691, merchant: '444sports', createTime: '2025-07-02 14:30:45', updater: 'guge888', updateTime: '2025-07-02 14:30:45', status: 'pending', scheduledTime: '2025-10-08 18:00:00' },

    // Traditional Chinese (zh-hant-cn) items
    { id: 380, language: 'zh-hant-cn', template: 'activity', title: 'USDT充值優惠活動', views: 234, sort: 690, merchant: 'pay', createTime: '2025-07-01 10:12:33', updater: 'walletnight', updateTime: '2025-07-01 10:12:33', status: 'published', scheduledTime: null },
    { id: 379, language: 'zh-hant-cn', template: 'exchange_rate', title: '今日美元兌港幣匯率', views: 156, sort: 689, merchant: 'sports', createTime: '2025-06-30 16:45:20', updater: '16946933385', updateTime: '2025-06-30 16:45:20', status: 'published', scheduledTime: null },
    { id: 378, language: 'zh-hant-cn', template: 'activity', title: '⚽世界盃預測贏大獎', views: 678, sort: 688, merchant: '444sports', createTime: '2025-06-29 13:22:11', updater: 'guge888', updateTime: '2025-06-29 13:22:11', status: 'inactive', scheduledTime: null },
    { id: 377, language: 'zh-hant-cn', template: 'activity', title: '週末充值優惠', views: 445, sort: 687, merchant: 'pay', createTime: '2025-06-28 09:30:15', updater: 'walletnight', updateTime: '2025-06-28 09:30:15', status: 'pending', scheduledTime: '2025-10-09 00:00:00' },
    { id: 376, language: 'zh-hant-cn', template: 'exchange_rate', title: '歐元匯率波動分析', views: 289, sort: 686, merchant: 'sports', createTime: '2025-06-27 11:15:40', updater: '16946933385', updateTime: '2025-06-27 11:15:40', status: 'published', scheduledTime: null },
    { id: 375, language: 'zh-hant-cn', template: 'activity', title: '🏀NBA總決賽競猜', views: 712, sort: 685, merchant: '444sports', createTime: '2025-06-26 15:20:25', updater: 'guge888', updateTime: '2025-06-26 15:20:25', status: 'failed', scheduledTime: '2025-10-07 12:00:00', errorMessage: '發布失敗，請稍後重試' },
    { id: 374, language: 'zh-hant-cn', template: 'activity', title: '新用戶註冊禮包', views: 523, sort: 684, merchant: 'pay', createTime: '2025-06-25 10:10:10', updater: 'walletnight', updateTime: '2025-06-25 10:10:10', status: 'published', scheduledTime: null },

    // English (us) items
    { id: 373, language: 'us', template: 'activity', title: 'USDT Deposit Bonus Event', views: 456, sort: 683, merchant: 'pay', createTime: '2025-06-24 14:25:30', updater: 'walletnight', updateTime: '2025-06-24 14:25:30', status: 'published', scheduledTime: null },
    { id: 372, language: 'us', template: 'exchange_rate', title: 'USD to EUR Exchange Rate Update', views: 198, sort: 682, merchant: 'sports', createTime: '2025-06-23 09:40:15', updater: '16946933385', updateTime: '2025-06-23 09:40:15', status: 'published', scheduledTime: null },
    { id: 371, language: 'us', template: 'activity', title: '⚽ World Cup Prediction Contest', views: 834, sort: 681, merchant: '444sports', createTime: '2025-06-22 16:55:20', updater: 'guge888', updateTime: '2025-06-22 16:55:20', status: 'pending', scheduledTime: '2025-10-10 12:00:00' },
    { id: 370, language: 'us', template: 'activity', title: 'Weekend Deposit Promotion', views: 567, sort: 680, merchant: 'pay', createTime: '2025-06-21 11:30:45', updater: 'walletnight', updateTime: '2025-06-21 11:30:45', status: 'published', scheduledTime: null },
    { id: 369, language: 'us', template: 'exchange_rate', title: 'Japanese Yen Exchange Analysis', views: 234, sort: 679, merchant: 'sports', createTime: '2025-06-20 08:15:30', updater: '16946933385', updateTime: '2025-06-20 08:15:30', status: 'inactive', scheduledTime: null },
    { id: 368, language: 'us', template: 'activity', title: '🏀 NBA Finals Betting Event', views: 923, sort: 678, merchant: '444sports', createTime: '2025-06-19 13:45:10', updater: 'guge888', updateTime: '2025-06-19 13:45:10', status: 'published', scheduledTime: null },
    { id: 367, language: 'us', template: 'activity', title: 'New User Welcome Package', views: 612, sort: 677, merchant: 'pay', createTime: '2025-06-18 10:20:25', updater: 'walletnight', updateTime: '2025-06-18 10:20:25', status: 'failed', scheduledTime: '2025-10-08 09:00:00', errorMessage: 'Network timeout error' },

    // Vietnamese (vi) items
    { id: 366, language: 'vi', template: 'activity', title: 'Sự kiện nạp USDT khuyến mãi', views: 345, sort: 676, merchant: 'pay', createTime: '2025-06-17 15:35:40', updater: 'walletnight', updateTime: '2025-06-17 15:35:40', status: 'published', scheduledTime: null },
    { id: 365, language: 'vi', template: 'exchange_rate', title: 'Cập nhật tỷ giá USD hôm nay', views: 178, sort: 675, merchant: 'sports', createTime: '2025-06-16 09:25:15', updater: '16946933385', updateTime: '2025-06-16 09:25:15', status: 'published', scheduledTime: null },
    { id: 364, language: 'vi', template: 'activity', title: '⚽ Dự đoán World Cup nhận giải lớn', views: 789, sort: 674, merchant: '444sports', createTime: '2025-06-15 14:50:20', updater: 'guge888', updateTime: '2025-06-15 14:50:20', status: 'pending', scheduledTime: '2025-10-11 15:00:00' },
    { id: 363, language: 'vi', template: 'activity', title: 'Khuyến mãi nạp tiền cuối tuần', views: 456, sort: 673, merchant: 'pay', createTime: '2025-06-14 11:15:35', updater: 'walletnight', updateTime: '2025-06-14 11:15:35', status: 'inactive', scheduledTime: null },
    { id: 362, language: 'vi', template: 'exchange_rate', title: 'Phân tích tỷ giá Euro', views: 203, sort: 672, merchant: 'sports', createTime: '2025-06-13 08:40:25', updater: '16946933385', updateTime: '2025-06-13 08:40:25', status: 'published', scheduledTime: null },
    { id: 361, language: 'vi', template: 'activity', title: '🏀 Cá cược chung kết NBA', views: 867, sort: 671, merchant: '444sports', createTime: '2025-06-12 16:25:30', updater: 'guge888', updateTime: '2025-06-12 16:25:30', status: 'published', scheduledTime: null },

    // Thai (th) items
    { id: 360, language: 'th', template: 'activity', title: 'กิจกรรมโบนัสฝาก USDT', views: 412, sort: 670, merchant: 'pay', createTime: '2025-06-11 13:10:15', updater: 'walletnight', updateTime: '2025-06-11 13:10:15', status: 'published', scheduledTime: null },
    { id: 359, language: 'th', template: 'exchange_rate', title: 'อัปเดตอัตราแลกเปลี่ยน USD', views: 189, sort: 669, merchant: 'sports', createTime: '2025-06-10 09:55:20', updater: '16946933385', updateTime: '2025-06-10 09:55:20', status: 'pending', scheduledTime: '2025-10-12 10:00:00' },
    { id: 358, language: 'th', template: 'activity', title: '⚽ ทายผลฟุตบอลโลกชิงรางวัล', views: 723, sort: 668, merchant: '444sports', createTime: '2025-06-09 15:40:35', updater: 'guge888', updateTime: '2025-06-09 15:40:35', status: 'published', scheduledTime: null },
    { id: 357, language: 'th', template: 'activity', title: 'โปรโมชั่นฝากเงินสุดสัปดาห์', views: 534, sort: 667, merchant: 'pay', createTime: '2025-06-08 10:25:40', updater: 'walletnight', updateTime: '2025-06-08 10:25:40', status: 'inactive', scheduledTime: null },
    { id: 356, language: 'th', template: 'exchange_rate', title: 'วิเคราะห์อัตราแลกเปลี่ยนยูโร', views: 167, sort: 666, merchant: 'sports', createTime: '2025-06-07 08:15:25', updater: '16946933385', updateTime: '2025-06-07 08:15:25', status: 'published', scheduledTime: null },
    { id: 355, language: 'th', template: 'activity', title: '🏀 แทงบาส NBA ชิงแชมป์', views: 912, sort: 665, merchant: '444sports', createTime: '2025-06-06 14:50:15', updater: 'guge888', updateTime: '2025-06-06 14:50:15', status: 'failed', scheduledTime: '2025-10-09 14:00:00', errorMessage: 'เกิดข้อผิดพลาดในการเผยแพร่' },

    // Indonesian (id) items
    { id: 354, language: 'id', template: 'activity', title: 'Event Bonus Deposit USDT', views: 387, sort: 664, merchant: 'pay', createTime: '2025-06-05 12:35:20', updater: 'walletnight', updateTime: '2025-06-05 12:35:20', status: 'published', scheduledTime: null },
    { id: 353, language: 'id', template: 'exchange_rate', title: 'Update Kurs USD Hari Ini', views: 156, sort: 663, merchant: 'sports', createTime: '2025-06-04 09:20:15', updater: '16946933385', updateTime: '2025-06-04 09:20:15', status: 'published', scheduledTime: null },
    { id: 352, language: 'id', template: 'activity', title: '⚽ Prediksi Piala Dunia Berhadiah', views: 645, sort: 662, merchant: '444sports', createTime: '2025-06-03 15:10:25', updater: 'guge888', updateTime: '2025-06-03 15:10:25', status: 'pending', scheduledTime: '2025-10-13 16:00:00' },
    { id: 351, language: 'id', template: 'activity', title: 'Promo Deposit Akhir Pekan', views: 423, sort: 661, merchant: 'pay', createTime: '2025-06-02 11:45:30', updater: 'walletnight', updateTime: '2025-06-02 11:45:30', status: 'published', scheduledTime: null },
    { id: 350, language: 'id', template: 'exchange_rate', title: 'Analisis Kurs Euro', views: 198, sort: 660, merchant: 'sports', createTime: '2025-06-01 08:30:15', updater: '16946933385', updateTime: '2025-06-01 08:30:15', status: 'inactive', scheduledTime: null },
    { id: 349, language: 'id', template: 'activity', title: '🏀 Taruhan Final NBA', views: 834, sort: 659, merchant: '444sports', createTime: '2025-05-31 14:25:40', updater: 'guge888', updateTime: '2025-05-31 14:25:40', status: 'published', scheduledTime: null },

    // Portuguese Brazilian (pt-br) items
    { id: 348, language: 'pt-br', template: 'activity', title: 'Evento Bônus de Depósito USDT', views: 356, sort: 658, merchant: 'pay', createTime: '2025-05-30 13:15:25', updater: 'walletnight', updateTime: '2025-05-30 13:15:25', status: 'published', scheduledTime: null },
    { id: 347, language: 'pt-br', template: 'exchange_rate', title: 'Atualização da Taxa de Câmbio USD', views: 174, sort: 657, merchant: 'sports', createTime: '2025-05-29 09:40:10', updater: '16946933385', updateTime: '2025-05-29 09:40:10', status: 'published', scheduledTime: null },
    { id: 346, language: 'pt-br', template: 'activity', title: '⚽ Previsão da Copa do Mundo com Prêmios', views: 712, sort: 656, merchant: '444sports', createTime: '2025-05-28 15:55:35', updater: 'guge888', updateTime: '2025-05-28 15:55:35', status: 'pending', scheduledTime: '2025-10-14 18:00:00' },
    { id: 345, language: 'pt-br', template: 'activity', title: 'Promoção de Depósito de Fim de Semana', views: 489, sort: 655, merchant: 'pay', createTime: '2025-05-27 11:20:45', updater: 'walletnight', updateTime: '2025-05-27 11:20:45', status: 'inactive', scheduledTime: null },
    { id: 344, language: 'pt-br', template: 'exchange_rate', title: 'Análise da Taxa de Câmbio do Euro', views: 223, sort: 654, merchant: 'sports', createTime: '2025-05-26 08:10:20', updater: '16946933385', updateTime: '2025-05-26 08:10:20', status: 'published', scheduledTime: null },
    { id: 343, language: 'pt-br', template: 'activity', title: '🏀 Apostas da Final da NBA', views: 876, sort: 653, merchant: '444sports', createTime: '2025-05-25 14:35:15', updater: 'guge888', updateTime: '2025-05-25 14:35:15', status: 'failed', scheduledTime: '2025-10-10 20:00:00', errorMessage: 'Erro de tempo limite de rede' },
    { id: 342, language: 'pt-br', template: 'activity', title: 'Pacote de Boas-Vindas para Novos Usuários', views: 567, sort: 652, merchant: 'pay', createTime: '2025-05-24 10:15:30', updater: 'walletnight', updateTime: '2025-05-24 10:15:30', status: 'published', scheduledTime: null },

    // More diverse items across all languages
    { id: 341, language: 'zh-cn', template: 'activity', title: '双十一购物节返现活动', views: 1234, sort: 651, merchant: 'pay', createTime: '2025-05-23 16:45:20', updater: 'walletnight', updateTime: '2025-05-23 16:45:20', status: 'published', scheduledTime: null },
    { id: 340, language: 'us', template: 'activity', title: 'Black Friday Special Offer', views: 987, sort: 650, merchant: 'pay', createTime: '2025-05-22 12:30:15', updater: 'walletnight', updateTime: '2025-05-22 12:30:15', status: 'pending', scheduledTime: '2025-11-29 00:00:00' },
    { id: 339, language: 'zh-hant-cn', template: 'exchange_rate', title: '日圓匯率實時更新', views: 432, sort: 649, merchant: 'sports', createTime: '2025-05-21 09:15:40', updater: '16946933385', updateTime: '2025-05-21 09:15:40', status: 'published', scheduledTime: null },
    { id: 338, language: 'vi', template: 'activity', title: '🎰 Chơi game nhận thưởng lớn', views: 678, sort: 648, merchant: '444sports', createTime: '2025-05-20 14:20:25', updater: 'guge888', updateTime: '2025-05-20 14:20:25', status: 'inactive', scheduledTime: null },
    { id: 337, language: 'th', template: 'activity', title: '🎁 ของขวัญวันเกิดพิเศษ', views: 543, sort: 647, merchant: 'pay', createTime: '2025-05-19 11:10:30', updater: 'walletnight', updateTime: '2025-05-19 11:10:30', status: 'published', scheduledTime: null },
    { id: 336, language: 'id', template: 'exchange_rate', title: 'Kurs Yen Jepang Hari Ini', views: 267, sort: 646, merchant: 'sports', createTime: '2025-05-18 08:25:15', updater: '16946933385', updateTime: '2025-05-18 08:25:15', status: 'published', scheduledTime: null },
    { id: 335, language: 'pt-br', template: 'activity', title: '🎉 Festival de Verão com Grandes Prêmios', views: 892, sort: 645, merchant: '444sports', createTime: '2025-05-17 15:40:20', updater: 'guge888', updateTime: '2025-05-17 15:40:20', status: 'failed', scheduledTime: '2025-12-01 12:00:00', errorMessage: 'Falha ao publicar' }
  ];

  // Filter logic
  const filteredData = tableData.filter((row) => {
    // Search term filter (searches in title)
    if (filters.searchTerm && !row.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }

    // Language filter
    if (filters.language && row.language !== filters.language) {
      return false;
    }

    // Template filter
    if (filters.template && row.template !== filters.template) {
      return false;
    }

    // Status filter
    if (filters.status && row.status !== filters.status) {
      return false;
    }

    // Merchant filter
    if (filters.merchant && row.merchant !== filters.merchant) {
      return false;
    }

    // Scheduled filter
    if (filters.isScheduled === 'yes' && !row.scheduledTime) {
      return false;
    }
    if (filters.isScheduled === 'no' && row.scheduledTime) {
      return false;
    }

    return true;
  });

  const totalItems = filteredData.length;

  // Paginate filtered data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle add button click
  const handleAddClick = () => {
    setEditingId(null);
    setFormData(DEFAULT_FORM_DATA);
    setIsDrawerOpen(true);
  };

  // Handle edit button click - map TableRow to FormData
  const handleEditClick = (row: TableRow) => {
    const mappedFormData: FormData = {
      templateType: row.template,
      mediaType: '1', // Default value, not in TableRow
      language: row.language,
      title: row.title,
      content: '', // Not in TableRow, would come from API in real app
      exchangeRate: row.template === 'exchange_rate',
      linkName: '', // Not in TableRow
      linkUrl: '', // Not in TableRow
      sort: row.sort.toString(),
      initialViews: row.views.toString(),
      merchant: row.merchant,
      googleCode: '', // Not in TableRow
      scheduledPublish: row.scheduledTime !== null,
      publishTime: row.scheduledTime || '',
      repeatRule: 'once', // Default, not in TableRow
      customRepeatType: 'days', // Default
      customRepeatValue: 1, // Default
      customRepeatWeekdays: [] // Default
    };

    setEditingId(row.id);
    setFormData(mappedFormData);
    setIsDrawerOpen(true);
  };

  // Handle drawer close - reset to add mode
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setEditingId(null);
    setFormData(DEFAULT_FORM_DATA);
  };

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
              onAddClick={handleAddClick}
            />

            <ActivityTable
              data={paginatedData}
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
              onEditClick={handleEditClick}
            />
          </div>
        </div>
      </div>

      <ActivityDrawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        formData={formData}
        setFormData={setFormData}
        editingId={editingId}
      />
    </div>
  );
}
