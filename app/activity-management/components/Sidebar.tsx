'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Sidebar() {
  const [operationsExpanded, setOperationsExpanded] = useState(true);
  const [assetsExpanded, setAssetsExpanded] = useState(false);
  const [systemExpanded, setSystemExpanded] = useState(false);

  return (
    <div className="w-64 text-white flex-shrink-0 overflow-y-auto" style={{ backgroundColor: '#181818' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: '#2a2a2a' }}>
        <span className="text-lg font-semibold">管理后台</span>
      </div>

      {/* Navigation */}
      <nav className="p-2">
        {/* Home */}
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded hover:bg-gray-800 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>主页</span>
        </a>

        <a href="#" className="block px-3 py-2.5 rounded hover:bg-gray-800 transition-colors">
          用户管理
        </a>

        <a href="#" className="block px-3 py-2.5 rounded hover:bg-gray-800 transition-colors">
          群聊管理
        </a>

        <a href="#" className="block px-3 py-2.5 rounded hover:bg-gray-800 transition-colors">
          群主管理
        </a>

        {/* Operations Management */}
        <div>
          <button
            onClick={() => setOperationsExpanded(!operationsExpanded)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded hover:bg-gray-800 transition-colors"
          >
            <span>运营管理</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${operationsExpanded ? 'rotate-180' : ''}`} />
          </button>

          {operationsExpanded && (
            <div className="ml-3 mt-1 space-y-1">
              <a href="#" className="block px-3 py-2 text-sm rounded hover:bg-gray-800 transition-colors">
                官网管理
              </a>
              <a href="#" className="block px-3 py-2 text-sm rounded hover:bg-gray-800 transition-colors">
                外观管理
              </a>
              <a href="#" className="block px-3 py-2 text-sm rounded hover:bg-gray-800 transition-colors">
                封号解封记录
              </a>
              <a href="#" className="block px-3 py-2 text-sm rounded hover:bg-gray-800 transition-colors">
                教程管理
              </a>
              <a href="#" className="block px-3 py-2 text-sm rounded hover:bg-gray-800 transition-colors">
                头像管理
              </a>
              <a href="#" className="block px-3 py-2 text-sm rounded transition-colors" style={{ backgroundColor: '#17374D' }}>
                活动管理
              </a>
              <a href="#" className="block px-3 py-2 text-sm rounded hover:bg-gray-800 transition-colors">
                版本管理
              </a>
              <a href="#" className="block px-3 py-2 text-sm rounded hover:bg-gray-800 transition-colors">
                表情管理
              </a>
              <a href="#" className="block px-3 py-2 text-sm rounded hover:bg-gray-800 transition-colors">
                协议管理
              </a>
              <a href="#" className="block px-3 py-2 text-sm rounded hover:bg-gray-800 transition-colors">
                发言规则管理
              </a>
              <a href="#" className="block px-3 py-2 text-sm rounded hover:bg-gray-800 transition-colors">
                聊天记录存储管理
              </a>
              <a href="#" className="block px-3 py-2 text-sm rounded hover:bg-gray-800 transition-colors">
                使用统计管理
              </a>
            </div>
          )}
        </div>

        {/* Asset Management */}
        <div>
          <button
            onClick={() => setAssetsExpanded(!assetsExpanded)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded hover:bg-gray-800 transition-colors"
          >
            <span>资产管理</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${assetsExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* System Management */}
        <div>
          <button
            onClick={() => setSystemExpanded(!systemExpanded)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded hover:bg-gray-800 transition-colors"
          >
            <span>系统管理</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${systemExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </nav>
    </div>
  );
}
