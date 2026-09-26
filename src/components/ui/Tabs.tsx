import { useState, type ReactNode } from 'react';
import { cn } from '@/utils/helpers';
import { LucideIcon } from './LucideIcon';

interface TabItem {
  id: string;
  label: string;
  icon?: any;
  disabled?: boolean;
  badge?: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'underline' | 'pills';
  fullWidth?: boolean;
  className?: string;
  children: (tabId: string) => ReactNode;
}

export function Tabs({
  tabs,
  defaultTab,
  onChange,
  variant = 'default',
  fullWidth = false,
  className,
  children,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  const handleTabClick = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab?.disabled) return;
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const variantStyles = {
    default: `
      border-b border-[var(--color-border-primary)]
      data-[state=active]:border-[var(--color-accent-primary)]
      data-[state=active]:text-[var(--color-accent-primary)]
    `,
    underline: `
      border-b-2 border-transparent
      data-[state=active]:border-[var(--color-accent-primary)]
      data-[state=active]:text-[var(--color-accent-primary)]
    `,
    pills: `
      bg-transparent
      data-[state=active]:bg-[var(--color-accent-primary)]/20
      data-[state=active]:text-[var(--color-accent-primary)]
      rounded-lg
    `,
  };

  const tabStyles = `
    flex-1 text-center py-3 px-4 text-sm font-medium transition-all duration-200
    text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
    disabled:opacity-50 disabled:cursor-not-allowed
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]
    relative
  `;

  return (
    <div className={cn(className)}>
      <div
        className={cn(
          'flex gap-1',
          variant === 'pills' && 'bg-[var(--color-bg-tertiary)] rounded-lg p-1',
          fullWidth && 'w-full'
        )}
        role="tablist"
        aria-label="Tabs"
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-trigger`}
            disabled={tab.disabled}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              tabStyles,
              variantStyles[variant],
              activeTab === tab.id && 'data-[state=active]'
            )}
            data-state={activeTab === tab.id ? 'active' : 'inactive'}
          >
            <span className="flex items-center justify-center gap-2">
              {tab.icon && (
                <span className="flex-shrink-0">
                  <LucideIcon icon={tab.icon} className="w-4 h-4" />
                </span>
              )}
              {tab.label}
              {tab.badge !== undefined && (
                <span className="px-1.5 py-0.5 text-xs font-medium bg-[var(--color-bg-tertiary)] rounded-full">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
      <div
        id={`${activeTab}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeTab}-trigger`}
        className="mt-4 animate-in"
      >
        {children(activeTab)}
      </div>
    </div>
  );
}