'use client';

import React from 'react';
import { Search, X, Plus, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filters } from '../types';
import {
  FILTER_LANGUAGE_OPTIONS,
  FILTER_TEMPLATE_OPTIONS,
  FILTER_STATUS_OPTIONS,
  FILTER_MERCHANT_OPTIONS,
  FILTER_SCHEDULED_OPTIONS,
  FILTER_LABELS
} from '../constants';

interface FilterSectionProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  showAdvancedFilters: boolean;
  setShowAdvancedFilters: (show: boolean) => void;
  onAddClick: () => void;
}

export default function FilterSection({
  filters,
  setFilters,
  showAdvancedFilters,
  setShowAdvancedFilters,
  onAddClick
}: FilterSectionProps) {
  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(v => v !== '').length;
  };

  const clearFilter = (filterKey: keyof Filters) => {
    setFilters({ ...filters, [filterKey]: '' });
  };

  const clearAllFilters = () => {
    setFilters({
      searchTerm: '',
      language: '',
      template: '',
      status: '',
      merchant: '',
      isScheduled: ''
    });
  };

  const getFilterLabel = (key: string, value: string) => {
    return FILTER_LABELS[key]?.[value] || value;
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar and Primary Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="搜索活动标题..."
            value={filters.searchTerm}
            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            variant={showAdvancedFilters || getActiveFiltersCount() > 0 ? "secondary" : "outline"}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">筛选</span>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
                {getActiveFiltersCount()}
              </span>
            )}
            {showAdvancedFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>

          <Button onClick={onAddClick}>
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">新增</span>
          </Button>
        </div>
      </div>

      {/* Active Filter Chips */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">已应用筛选:</span>
          {Object.entries(filters).map(([key, value]) => {
            if (value && key !== 'searchTerm') {
              return (
                <div
                  key={key}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  <span>{getFilterLabel(key, value)}</span>
                  <button
                    onClick={() => clearFilter(key as keyof Filters)}
                    className="hover:bg-secondary/80 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            }
            return null;
          })}
          <Button
            onClick={clearAllFilters}
            variant="link"
            size="sm"
            className="h-auto p-0"
          >
            清除全部
          </Button>
        </div>
      )}

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="border border-border rounded-lg p-4 bg-muted/50 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">语言</label>
              <Select
                value={filters.language}
                onValueChange={(val) => setFilters({ ...filters, language: val })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="全部语言" />
                </SelectTrigger>
                <SelectContent>
                  {FILTER_LANGUAGE_OPTIONS.filter(option => option.value !== '').map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">内容模板</label>
              <Select
                value={filters.template}
                onValueChange={(val) => setFilters({ ...filters, template: val })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="全部模板" />
                </SelectTrigger>
                <SelectContent>
                  {FILTER_TEMPLATE_OPTIONS.filter(option => option.value !== '').map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">状态</label>
              <Select
                value={filters.status}
                onValueChange={(val) => setFilters({ ...filters, status: val })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="全部状态" />
                </SelectTrigger>
                <SelectContent>
                  {FILTER_STATUS_OPTIONS.filter(option => option.value !== '').map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">商户</label>
              <Select
                value={filters.merchant}
                onValueChange={(val) => setFilters({ ...filters, merchant: val })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="全部商户" />
                </SelectTrigger>
                <SelectContent>
                  {FILTER_MERCHANT_OPTIONS.filter(option => option.value !== '').map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">发布类型</label>
              <Select
                value={filters.isScheduled}
                onValueChange={(val) => setFilters({ ...filters, isScheduled: val })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="全部类型" />
                </SelectTrigger>
                <SelectContent>
                  {FILTER_SCHEDULED_OPTIONS.filter(option => option.value !== '').map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              onClick={() => setShowAdvancedFilters(false)}
              variant="ghost"
              size="sm"
            >
              收起
            </Button>
            <Button
              onClick={clearAllFilters}
              variant="outline"
              size="sm"
            >
              重置筛选
            </Button>
          </div>
        </div>
      )}

      {/* Secondary Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm">
          导出当前页
        </Button>
        <Button variant="ghost" size="sm">
          导出全部
        </Button>
      </div>
    </div>
  );
}
