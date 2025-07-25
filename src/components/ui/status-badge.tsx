import { cn } from "@/lib/utils";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
  status: 'ready' | 'in-progress' | 'not-ready';
  className?: string;
  showIcon?: boolean;
}

export function StatusBadge({ status, className, showIcon = true }: StatusBadgeProps) {
  const statusConfig = {
    ready: {
      label: 'Ready',
      icon: CheckCircle,
      className: 'bg-success/10 text-success border-success/20'
    },
    'in-progress': {
      label: 'In Progress',
      icon: Clock,
      className: 'bg-warning/10 text-warning border-warning/20'
    },
    'not-ready': {
      label: 'Not Ready',
      icon: AlertCircle,
      className: 'bg-destructive/10 text-destructive border-destructive/20'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium",
      config.className,
      className
    )}>
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </div>
  );
}