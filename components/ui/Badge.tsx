import React from 'react';
import { PaymentStatus, JobStatus } from '@/types/booking';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  const variantClasses = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    default: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

interface PaymentBadgeProps {
  status: PaymentStatus;
}

export const PaymentBadge: React.FC<PaymentBadgeProps> = ({ status }) => {
  const variant = status === 'paid' ? 'success' : 'warning';
  const label = status === 'paid' ? 'ชำระแล้ว' : 'ยังไม่ชำระ';

  return <Badge variant={variant}>{label}</Badge>;
};

interface JobStatusBadgeProps {
  status: JobStatus;
}

export const JobStatusBadge: React.FC<JobStatusBadgeProps> = ({ status }) => {
  const statusMap: Record<JobStatus, { label: string; variant: BadgeProps['variant'] }> = {
    pending: { label: 'รอยืนยัน', variant: 'default' },
    confirmed: { label: 'ยืนยันแล้ว', variant: 'info' },
    in_progress: { label: 'กำลังเดินทาง', variant: 'warning' },
    completed: { label: 'เสร็จสิ้น', variant: 'success' },
    cancelled: { label: 'ยกเลิก', variant: 'danger' },
  };

  const { label, variant } = statusMap[status];
  return <Badge variant={variant}>{label}</Badge>;
};
