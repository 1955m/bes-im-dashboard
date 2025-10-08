'use client';

import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TableRow } from '../types';
import { STATUS_BADGES, PAGE_SIZE_OPTIONS } from '../constants';

interface ActivityTableProps {
  data: TableRow[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function ActivityTable({
  data,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange
}: ActivityTableProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const getStatusBadge = (status: TableRow['status']) => {
    const badge = STATUS_BADGES[status];
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${badge.class}`}>
        {badge.text}
      </span>
    );
  };

  return (
    <>
      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">语言</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">内容模板</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">标题</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">图片/视频</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">浏览量</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">活动排序</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">商户</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">定时发布时间</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">状态</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">最后更新</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors bg-white">
                <td className="px-4 py-3 text-sm text-gray-900">{row.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{row.language}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{row.template}</td>
                <td className="px-4 py-3 text-sm text-gray-900 max-w-[200px] truncate" title={row.title}>
                  {row.title}
                </td>
                <td className="px-4 py-3">
                  <div className="w-12 h-12 bg-gray-200 rounded"></div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{row.views}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{row.sort}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{row.merchant}</td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  {row.scheduledTime ? (
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-3 h-3" />
                      {row.scheduledTime}
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(row.status)}
                  {row.status === 'failed' && row.errorMessage && (
                    <div className="text-xs text-red-600 mt-1 flex items-start gap-1">
                      <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>{row.errorMessage}</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm">
                    <div className="text-gray-900 font-medium">{row.updater}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{row.updateTime}</div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 flex-wrap">
                    {row.status === 'published' || row.status === 'pending' ? (
                      <Button variant="link" size="sm" className="h-auto p-0">
                        下架
                      </Button>
                    ) : (
                      <Button variant="link" size="sm" className="h-auto p-0">
                        上架
                      </Button>
                    )}
                    <Button variant="link" size="sm" className="h-auto p-0">
                      查看
                    </Button>
                    {row.status === 'failed' && (
                      <Button variant="link" size="sm" className="h-auto p-0">
                        重试
                      </Button>
                    )}
                    <Button
                      variant="link"
                      size="sm"
                      className={`h-auto p-0 ${row.status === 'published' || row.status === 'pending' ? 'text-muted-foreground cursor-not-allowed' : 'text-destructive hover:text-destructive/80'}`}
                      disabled={row.status === 'published' || row.status === 'pending'}
                    >
                      删除
                    </Button>
                    <Button variant="link" size="sm" className="h-auto p-0">
                      复制
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <span className="text-sm text-muted-foreground">共 {totalItems} 条</span>

        <div className="flex items-center gap-4">
          <Select
            value={pageSize.toString()}
            onValueChange={(val) => onPageSizeChange(Number(val))}
          >
            <SelectTrigger className="text-sm w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
            >
              ‹
            </Button>

            <div className="flex gap-1">
              {[...Array(Math.min(totalPages, 8))].map((_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    onClick={() => onPageChange(page)}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>

            <Button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
            >
              ›
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">前往</span>
            <Input
              type="number"
              min={1}
              max={totalPages}
              className="w-16 h-8 px-2 text-sm text-center"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const page = parseInt(e.currentTarget.value);
                  if (page >= 1 && page <= totalPages) {
                    onPageChange(page);
                  }
                }
              }}
            />
            <span className="text-sm text-muted-foreground">页</span>
          </div>
        </div>
      </div>
    </>
  );
}
