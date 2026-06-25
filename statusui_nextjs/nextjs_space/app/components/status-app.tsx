'use client';

import { useEffect, useState, useCallback, useRef, ReactNode } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
  ArrowLeft,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  FileText,
  KeyRound,
  LogOut,
  Menu,
  MessageSquareText,
  Network,
  PanelLeft,
  Pencil,
  Plus,
  Save,
  Search,
  Send,
  SlidersHorizontal,
  Trash2,
  TriangleAlert,
  UserCog,
  UserRound,
  Users,
  X,
  MoreVertical,
  Columns3,
  Eye,
  EyeOff,
  PackageCheck,
  Inbox,
  ClipboardCheck,
  ShieldCheck,
  CircleCheckBig,
  Truck,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Constants & mock data                                              */
/* ------------------------------------------------------------------ */

const CURRENT_USER = 'Frank Fernandez';
const IS_DESKTOP_QUERY = '(min-width: 992px)';

interface NavItem {
  href: string;
  label: string;
  icon: any;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/index.html', label: 'Transmitted Components', icon: FileText },
  { href: '/users.html', label: 'Users', icon: Users },
  { href: '/groups.html', label: 'Groups', icon: Network },
  { href: '/maintenance.html', label: 'Maintenance', icon: SlidersHorizontal },
  { href: '/jobs.html', label: 'Jobs', icon: BriefcaseBusiness },
];

/* ---------- Date formatting helper ---------- */
function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear();
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${month} ${day}, ${year}, ${hours}:${minutes} ${ampm}`;
  } catch {
    return dateStr;
  }
}

function formatDateOnly(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
}

/* ---------- US State abbreviations for Seals ---------- */
const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

/* ---------- Status values aligned with Component Review Process ---------- */
/*
  From "Send Engineering" PDF - Component Review Process:
  Send Components → Received Complete → 1st Review → 2nd Review → Final Approval → Ready for Pickup → View & Save Components

  From "SRS Review Process" PDF:
  - Project evaluation levels (Simple/Medium/Complex)
  - Review responsibilities by engineer level
  - 2nd Review and Final Review steps
*/

interface Project {
  id: string;
  name: string;
  count: string;
  badge: string;
  badgeTone: string;
  summary: string;
  latest: string;
  latestTone: string;
  rows: string[][];
}

const PROJECTS: Project[] = [
  {
    id: 'p100',
    name: 'P-100 - test',
    count: '5 transmissions',
    badge: 'Ready',
    badgeTone: 'success',
    summary: '5 transmissions for P-100 - test',
    latest: 'Latest: Ready for Pickup',
    latestTone: 'success',
    rows: [
      ['211105', 'Simpson Strong-Tie Company Inc.', 'CA', '5/6/2026 6:00 AM', '3', '0', 'si nguyen', 'Ready for Pickup', 'success', 'Normal'],
      ['211106', 'Simpson Strong-Tie Company Inc.', 'CO', '5/6/2026 6:00 AM', '1', '0', 'si nguyen', '1st Review', 'warning', 'Priority Rush'],
      ['211107', 'Your Company', 'TX', '5/6/2026 6:00 AM', '0', '0', 'system', 'Send Components', 'info', 'Same Day Rush'],
      ['211108', 'Your Company', 'AL', '5/6/2026 6:00 AM', '0', '1', 'system', 'Received Complete', 'info', 'Normal'],
      ['211109', 'Simpson Strong-Tie Company Inc.', 'NY', '5/6/2026 6:00 AM', '2', '0', 'si nguyen', 'Ready for Pickup', 'success', 'Extended'],
    ],
  },
  {
    id: 'p200',
    name: 'P-200 - ridge',
    count: '2 transmissions',
    badge: 'Review',
    badgeTone: 'warning',
    summary: '2 transmissions for P-200 - ridge',
    latest: 'Latest: 2nd Review',
    latestTone: 'warning',
    rows: [
      ['223401', 'North Ridge Truss', 'TX', '5/6/2026 8:15 AM', '5', '1', 'm garcia', '2nd Review', 'warning', 'Normal'],
      ['223402', 'North Ridge Truss', 'AL', '5/6/2026 8:20 AM', '2', '0', 'system', 'Final Approval', 'info', 'Priority Rush'],
    ],
  },
];

interface UserRecord {
  id: string;
  name: string;
  username: string;
  role: string;
  status: string;
  passwordExpiration: string;
  adminGroups: string[];
  memberGroups: string[];
}

const INITIAL_USERS: UserRecord[] = [
  { id: 'admin@example.com', name: 'SuperAdmin Simpson Web SuperAdmin', username: 'admin', role: 'Internal Admin', status: 'Active', passwordExpiration: '5/8/2026 1:21:51 PM', adminGroups: ['00003', '00193'], memberGroups: ['10240'] },
  { id: 'super.user@example.com', name: 'SuperAdmin Sample User', username: 'super.user', role: 'Internal Admin', status: 'Active', passwordExpiration: '5/12/2026 9:20:00 AM', adminGroups: ['00193'], memberGroups: ['00003'] },
  { id: 'reviewer@example.com', name: 'Project Reviewer', username: 'reviewer', role: 'Reviewer', status: 'Inactive', passwordExpiration: '6/2/2026 8:00:00 AM', adminGroups: [], memberGroups: ['00003', '10240'] },
  { id: 'new.user@example.com', name: 'New Status User', username: 'new.user', role: 'Member', status: 'Active', passwordExpiration: '6/15/2026 10:45:00 AM', adminGroups: [], memberGroups: ['00003', '00193'] },
  { id: 'singuyen@strongtie.com', name: 'si nguyen', username: 'singuyen', role: 'Admin', status: 'Active', passwordExpiration: '6/18/2026 11:00:00 AM', adminGroups: ['00003'], memberGroups: [] },
  { id: 'thaivh.it94@gmail.com', name: 'thvo', username: 'thvo', role: 'Admin', status: 'Active', passwordExpiration: '6/22/2026 2:30:00 PM', adminGroups: ['00003'], memberGroups: [] },
];

interface GroupRecord {
  id: string;
  name: string;
  status: string;
  admins: string[];
  members: string[];
}

const INITIAL_GROUPS: GroupRecord[] = [
  { id: '00003', name: 'Route 66 Truss Company', status: 'Active', admins: ['admin@example.com', 'singuyen@strongtie.com', 'thaivh.it94@gmail.com'], members: ['reviewer@example.com', 'super.user@example.com', 'new.user@example.com'] },
  { id: '00193', name: 'Some customer', status: 'Active', admins: ['admin@example.com', 'super.user@example.com'], members: ['new.user@example.com'] },
  { id: '10240', name: 'Component manufacturing users', status: 'Inactive', admins: [], members: ['admin@example.com', 'reviewer@example.com'] },
];

const EMPTY_USER: UserRecord = { id: '', name: '', username: '', role: 'Member', status: 'Active', passwordExpiration: 'Not set', adminGroups: [], memberGroups: [] };
const EMPTY_GROUP: GroupRecord = { id: '', name: '', status: 'Active', admins: [], members: [] };

interface JobRecord {
  id: string;
  name: string;
  type: string;
  status: string;
}

const JOBS: JobRecord[] = [
  { id: '4012', name: 'Nightly transmission sync', type: 'Import', status: 'Running' },
  { id: '4013', name: 'Project index rebuild', type: 'Maintenance', status: 'Queued' },
  { id: '4014', name: 'Customer export', type: 'Export', status: 'Complete' },
];

const DETAIL_ITEMS: [string, string][] = [
  ['Account type', 'Internal Admin'],
  ['Email', 'frank.fernandez@example.com'],
  ['Group', 'Route 66 Truss Company'],
  ['Last login', formatDate('5/6/2026 9:02 AM')],
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getUserEditPath(userId: string) {
  return `/user-form.html?user=${encodeURIComponent(userId)}`;
}

function getGroupEditPath(groupId: string) {
  return `/group-form.html?group=${encodeURIComponent(groupId)}`;
}

function getQueryParam(name: string): string {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window?.location?.search ?? '');
  return params?.get(name) ?? '';
}

function getStatusTone(status: string): string {
  const map: Record<string, string> = {
    Active: 'success',
    Inactive: 'danger',
    Running: 'info',
    Queued: 'warning',
    Complete: 'success',
    'Ready for Pickup': 'success',
    '1st Review': 'warning',
    '2nd Review': 'warning',
    'Final Approval': 'info',
    'Send Components': 'info',
    'Received Complete': 'info',
    'View & Save Components': 'success',
  };
  return map[status] ?? 'info';
}

function getGroupNameMap(groups: GroupRecord[]): Record<string, string> {
  return Object.fromEntries((groups ?? []).map((g: GroupRecord) => [g?.id, g?.name]));
}

function getUserMap(users: UserRecord[]): Record<string, UserRecord> {
  return Object.fromEntries((users ?? []).map((u: UserRecord) => [u?.id, u]));
}

/* ------------------------------------------------------------------ */
/*  Routing helpers                                                    */
/* ------------------------------------------------------------------ */

function normalizePath(pathname: string): string {
  try {
    const { pathname: nextPathname } = new URL(pathname ?? '/', typeof window !== 'undefined' ? window?.location?.origin : 'http://localhost');
    if (!nextPathname || nextPathname === '/') return '/index.html';
    if (nextPathname?.endsWith('/')) return `${nextPathname.slice(0, -1)}.html`;
    if (!nextPathname?.endsWith('.html')) return `${nextPathname}.html`;
    return nextPathname;
  } catch {
    return '/index.html';
  }
}

function navigate(to: string) {
  if (typeof window === 'undefined') return;
  const nextUrl = new URL(to, window?.location?.origin);
  if (window?.location?.pathname === nextUrl?.pathname && window?.location?.search === nextUrl?.search) return;
  window?.history?.pushState({}, '', `${nextUrl?.pathname}${nextUrl?.search}${nextUrl?.hash ?? ''}`);
  window?.dispatchEvent(new PopStateEvent('popstate'));
  window?.scrollTo(0, 0);
}

function usePathname(): [string, (v: string) => void] {
  const [pathname, setPathname] = useState('/index.html');

  useEffect(() => {
    const read = () => typeof window !== 'undefined' ? normalizePath(window?.location?.pathname) : '/index.html';
    setPathname(read());
    const onPopState = () => setPathname(read());
    window?.addEventListener('popstate', onPopState);
    return () => window?.removeEventListener('popstate', onPopState);
  }, []);

  return [pathname, setPathname];
}

function useQueryValue(name: string): string {
  const [value, setValue] = useState('');

  useEffect(() => {
    const read = () => getQueryParam(name);
    setValue(read());
    const onPopState = () => setValue(read());
    window?.addEventListener('popstate', onPopState);
    return () => window?.removeEventListener('popstate', onPopState);
  }, [name]);

  return value;
}

/* ------------------------------------------------------------------ */
/*  Tiny UI primitives                                                 */
/* ------------------------------------------------------------------ */

function AppLink({ to, currentPath, className = '', children }: { to: string; currentPath: string; className?: string; children: ReactNode }) {
  return (
    <a
      href={to}
      className={className}
      aria-current={normalizePath(to) === currentPath ? 'page' : undefined}
      onClick={(event: any) => {
        if (event?.metaKey || event?.ctrlKey || event?.shiftKey || event?.altKey) return;
        event?.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

function StatusBadge({ tone, children }: { tone: string; children: ReactNode }) {
  const dotColors: Record<string, string> = {
    default: 'var(--status-dot-gray, #b0b0b0)',
    success: 'var(--status-dot-green, #12805c)',
    warning: 'var(--status-dot-orange, #e68619)',
    info: 'var(--status-dot-blue, #1473e6)',
    danger: 'var(--status-dot-red, #d7373f)',
    destructive: 'var(--status-dot-red, #d7373f)',
  };
  return (
    <span className="status-light">
      <span className="status-light-dot" style={{ background: dotColors[tone] ?? dotColors['default'] }} />
      <span className="status-light-label">{children}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage Progress Bar (transmission workflow)                         */
/* ------------------------------------------------------------------ */

const WORKFLOW_STAGES = [
  'Send Components',
  'Received Complete',
  '1st Review',
  '2nd Review',
  'Final Approval',
  'Ready for Pickup',
];

function StageProgressBar({ status }: { status: string }) {
  const stageIndex = WORKFLOW_STAGES.indexOf(status);
  const idx = stageIndex >= 0 ? stageIndex : -1;

  return (
    <div className="stage-progress">
      <span className="stage-progress-label">{status}</span>
      <div className="stage-progress-track">
        {WORKFLOW_STAGES.map((_, i) => {
          let cls = 'stage-segment';
          if (idx < 0) {
            cls += ' seg-gray';
          } else if (i < idx) {
            cls += ' seg-complete';
          } else if (i === idx) {
            cls += ' seg-current';
          } else {
            cls += ' seg-gray';
          }
          return <span key={i} className={cls} />;
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Workflow Stepper — horizontal icon stepper for detail pages         */
/* ------------------------------------------------------------------ */

const STAGE_ICONS: Record<string, any> = {
  'Send Components': PackageCheck,
  'Received Complete': Inbox,
  '1st Review': ClipboardCheck,
  '2nd Review': ShieldCheck,
  'Final Approval': CircleCheckBig,
  'Ready for Pickup': Truck,
};

function WorkflowStepper({ currentStatus }: { currentStatus: string }) {
  const currentIdx = WORKFLOW_STAGES.indexOf(currentStatus);

  return (
    <div className="workflow-stepper">
      {WORKFLOW_STAGES.map((stage, i) => {
        const Icon = STAGE_ICONS[stage] || CircleCheckBig;
        let state: 'completed' | 'current' | 'upcoming' = 'upcoming';
        if (currentIdx >= 0) {
          if (i < currentIdx) state = 'completed';
          else if (i === currentIdx) state = 'current';
        }

        const DisplayIcon = state === 'completed' ? Check : Icon;

        return (
          <div key={stage} className="stepper-step-wrapper">
            {i > 0 && <div className={`stepper-line stepper-line-${state === 'upcoming' ? 'upcoming' : 'done'}`} />}
            <div className={`stepper-step stepper-step-${state}`}>
              <div className="stepper-icon-circle">
                <DisplayIcon size={18} />
              </div>
              <span className="stepper-label">{stage}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Avatar (initials, expandable for images later)                     */
/* ------------------------------------------------------------------ */

const AVATAR_COLORS = [
  '#1473e6', '#12805c', '#e68619', '#d7373f', '#7b2ff7',
  '#0d66d0', '#268e6c', '#da7b11', '#c9252d', '#6d24d6',
];

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getInitials(name: string): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? '?';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Avatar({ name, imageUrl, size = 28 }: { name: string; imageUrl?: string; size?: number }) {
  const initials = getInitials(name);
  const bg = getAvatarColor(name);
  const fontSize = Math.max(10, Math.round(size * 0.4));

  if (imageUrl) {
    return (
      <span
        className="avatar"
        style={{ width: size, height: size, minWidth: size }}
        title={name}
      >
        <img src={imageUrl} alt={name} className="avatar-img" />
      </span>
    );
  }

  return (
    <span
      className="avatar"
      style={{ width: size, height: size, minWidth: size, background: bg, fontSize }}
      title={name}
    >
      {initials}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Notes state & types                                                */
/* ------------------------------------------------------------------ */

interface NoteRecord {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

type NotesMap = Record<string, NoteRecord[]>;

/* ------------------------------------------------------------------ */
/*  Resizable + Sortable Table component                               */
/* ------------------------------------------------------------------ */

interface SortState {
  column: string;
  direction: 'asc' | 'desc';
}

function TruncatedCell({ children, className }: { children: ReactNode; className?: string }) {
  const isString = typeof children === 'string' || typeof children === 'number';
  if (!isString) return <td className={className}>{children}</td>;
  return (
    <td className={className}>
      <div className="cell-truncate" title={String(children)}>
        {children}
      </div>
    </td>
  );
}

function ResizableTable({ columns: initialColumns, headerLabels, rows, renderCell, sortableColumns, defaultSort, stickyColumns, reorderable }: {
  columns: string[];
  headerLabels?: Record<string, string>;
  rows: any[];
  renderCell: (row: any, col: string) => ReactNode;
  sortableColumns?: string[];
  defaultSort?: SortState;
  stickyColumns?: string[];
  reorderable?: boolean;
}) {
  const [sort, setSort] = useState<SortState | null>(defaultSort ?? null);
  const [colWidths, setColWidths] = useState<Record<string, number>>({});
  const [columnOrder, setColumnOrder] = useState<string[]>(initialColumns);
  const resizingRef = useRef<{ col: string; startX: number; startW: number } | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const dragColRef = useRef<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  // Sync column order when initialColumns changes
  useEffect(() => {
    setColumnOrder((prev) => {
      const prevSet = new Set(prev);
      const nextSet = new Set(initialColumns);
      if (prev.length === initialColumns.length && prev.every((c) => nextSet.has(c))) return prev;
      return initialColumns;
    });
  }, [initialColumns]);

  // Use ordered columns for rendering
  const columns = columnOrder;

  // Scroll shadow detection
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onScroll = () => setScrolled(wrap.scrollLeft > 0);
    wrap.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => wrap.removeEventListener('scroll', onScroll);
  }, []);

  const handleSort = (col: string) => {
    if (sortableColumns && !sortableColumns.includes(col)) return;
    setSort((prev) => {
      if (prev?.column === col) {
        if (prev.direction === 'asc') return { column: col, direction: 'desc' };
        return null;
      }
      return { column: col, direction: 'asc' };
    });
  };

  const sortedRows = (() => {
    if (!sort) return rows;
    const { column, direction } = sort;
    return [...rows].sort((a, b) => {
      let valA = a?.[column];
      let valB = b?.[column];
      if (typeof valA === 'object' && valA?.props?.children) valA = valA.props.children;
      if (typeof valB === 'object' && valB?.props?.children) valB = valB.props.children;
      if (valA == null) valA = '';
      if (valB == null) valB = '';
      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();
      const numA = Number(valA);
      const numB = Number(valB);
      if (!isNaN(numA) && !isNaN(numB)) {
        return direction === 'asc' ? numA - numB : numB - numA;
      }
      return direction === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
  })();

  const onMouseDown = (col: string, e: React.MouseEvent) => {
    e.preventDefault();
    const th = (e.target as HTMLElement).closest('th');
    const startW = th?.getBoundingClientRect().width ?? 150;
    resizingRef.current = { col, startX: e.clientX, startW };

    const onMouseMove = (ev: MouseEvent) => {
      if (!resizingRef.current) return;
      const diff = ev.clientX - resizingRef.current.startX;
      const newW = Math.max(60, resizingRef.current.startW + diff);
      setColWidths((prev) => ({ ...prev, [resizingRef.current!.col]: newW }));
    };

    const onMouseUp = () => {
      resizingRef.current = null;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  // Column drag reorder
  const canDrag = (col: string) => reorderable && !(stickyColumns?.includes(col));

  const onDragStart = (col: string, e: React.DragEvent) => {
    dragColRef.current = col;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', col);
  };

  const onDragOver = (col: string, e: React.DragEvent) => {
    if (!dragColRef.current || dragColRef.current === col || stickyColumns?.includes(col)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCol(col);
  };

  const onDrop = (col: string, e: React.DragEvent) => {
    e.preventDefault();
    const from = dragColRef.current;
    dragColRef.current = null;
    setDragOverCol(null);
    if (!from || from === col) return;
    setColumnOrder((prev) => {
      const next = [...prev];
      const fromIdx = next.indexOf(from);
      const toIdx = next.indexOf(col);
      if (fromIdx < 0 || toIdx < 0) return prev;
      next.splice(fromIdx, 1);
      next.splice(toIdx, 0, from);
      return next;
    });
  };

  const onDragEnd = () => {
    dragColRef.current = null;
    setDragOverCol(null);
  };

  const isSortable = (col: string) => !sortableColumns || sortableColumns.includes(col);
  const isSticky = (col: string) => stickyColumns?.includes(col) ?? false;

  // Calculate cumulative left offsets for sticky columns
  const stickyOffsets: Record<string, number> = {};
  if (stickyColumns && stickyColumns.length > 0) {
    let offset = 0;
    for (const col of columns) {
      if (isSticky(col)) {
        stickyOffsets[col] = offset;
        offset += colWidths[col] || (col === '_actions' ? 120 : 130);
      }
    }
  }

  // Find the last sticky column for shadow
  const lastStickyCol = stickyColumns && stickyColumns.length > 0
    ? columns.filter((c) => isSticky(c)).pop()
    : null;

  const getStickyStyle = (col: string, isHeader: boolean): React.CSSProperties | undefined => {
    if (!isSticky(col)) return undefined;
    const style: React.CSSProperties = {
      position: 'sticky',
      left: stickyOffsets[col] ?? 0,
      zIndex: isHeader ? 12 : 5,
      background: isHeader ? '#fbfbfb' : 'var(--surface-primary-background)',
      minWidth: col === '_actions' ? 120 : 130,
    };
    return style;
  };

  return (
    <div ref={wrapRef} className={`table-scroll-wrap${scrolled ? ' is-scrolled' : ''}`}>
    <table ref={tableRef} className={stickyColumns?.length ? 'has-sticky-cols' : undefined} style={{ tableLayout: Object.keys(colWidths).length > 0 ? 'fixed' : undefined }}>
      <thead>
        <tr>
          {columns.map((col) => {
            const stickyStyle = getStickyStyle(col, true);
            const widthStyle = colWidths[col] ? { width: colWidths[col] } : undefined;
            const isLast = col === lastStickyCol;
            return (
              <th
                key={col}
                style={{ ...widthStyle, ...stickyStyle }}
                className={`${isSortable(col) ? 'sortable-th' : ''}${isSticky(col) ? ' sticky-col' : ''}${isLast ? ' sticky-col-last' : ''}${dragOverCol === col ? ' drag-over-col' : ''}`}
                draggable={canDrag(col) ? true : undefined}
                onDragStart={canDrag(col) ? (e) => onDragStart(col, e) : undefined}
                onDragOver={(e) => onDragOver(col, e)}
                onDrop={(e) => onDrop(col, e)}
                onDragEnd={onDragEnd}
              >
                <div className="th-content" onClick={() => isSortable(col) && handleSort(col)} style={isSortable(col) ? { cursor: 'pointer' } : undefined}>
                  {canDrag(col) && <span className="drag-handle" aria-hidden="true">⁞</span>}
                  <span>{headerLabels?.[col] ?? col}</span>
                  {isSortable(col) && (
                    <span className="sort-icon">
                      {sort?.column === col ? (
                        sort.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                      ) : (
                        <ArrowUpDown size={14} style={{ opacity: 0.35 }} />
                      )}
                    </span>
                  )}
                </div>
                <div
                  className="col-resize-handle"
                  onMouseDown={(e) => onMouseDown(col, e)}
                />
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedRows.map((row, i) => (
          <tr key={row?.id ?? i}>
            {columns.map((col) => {
              const cell = renderCell(row, col);
              const stickyStyle = getStickyStyle(col, false);
              const isLast = col === lastStickyCol;
              if (col === '_actions') return <td key={col} className={`action-cell${isSticky(col) ? ' sticky-col' : ''}${isLast ? ' sticky-col-last' : ''}`} style={stickyStyle}>{cell}</td>;
              if (typeof cell === 'string' || typeof cell === 'number') {
                return (
                  <td key={col} className={`${isSticky(col) ? 'sticky-col' : ''}${isLast ? ' sticky-col-last' : ''}`} style={stickyStyle}>
                    <div className="cell-truncate" title={String(cell)}>{cell}</div>
                  </td>
                );
              }
              return <td key={col} className={`${isSticky(col) ? 'sticky-col' : ''}${isLast ? ' sticky-col-last' : ''}`} style={stickyStyle}>{cell}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Notes Sheet (flyout pane for notes on a record)                    */
/* ------------------------------------------------------------------ */

function NotesSheet({ open, onOpenChange, recordId, notes, onAddNote, onDeleteNote, onEditNote }: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  recordId: string;
  notes: NoteRecord[];
  onAddNote: (recordId: string, text: string) => void;
  onDeleteNote: (recordId: string, noteId: string) => void;
  onEditNote: (recordId: string, noteId: string, text: string) => void;
}) {
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [kebabOpen, setKebabOpen] = useState<string | null>(null);
  const kebabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) { setNewNote(''); setEditingNoteId(null); setKebabOpen(null); }
  }, [open]);

  // Close kebab on outside click
  useEffect(() => {
    if (!kebabOpen) return;
    const handler = (e: MouseEvent) => {
      if (kebabRef.current && !kebabRef.current.contains(e.target as Node)) setKebabOpen(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [kebabOpen]);

  if (!open) return null;

  const handleSubmit = () => {
    const trimmed = newNote.trim();
    if (!trimmed) return;
    onAddNote(recordId, trimmed);
    setNewNote('');
  };

  const handleEditSave = (noteId: string) => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    onEditNote(recordId, noteId, trimmed);
    setEditingNoteId(null);
    setEditText('');
  };

  const startEdit = (note: NoteRecord) => {
    setEditingNoteId(note.id);
    setEditText(note.text);
    setKebabOpen(null);
  };

  return (
    <>
      <div className="sheet-backdrop is-open" onClick={() => onOpenChange(false)} />
      <div className="sheet is-open" aria-labelledby="notesSheetLabel">
        <div className="sheet-header">
          <div>
            <h2 className="sheet-title" id="notesSheetLabel">Notes</h2>
            <p className="sheet-description">Transmission {recordId}</p>
          </div>
          <button type="button" className="sheet-close-btn" onClick={() => onOpenChange(false)} aria-label="Close notes">
            <X size={18} />
          </button>
        </div>
        <div className="sheet-body notes-body">
          {notes.length === 0 ? (
            <p className="notes-empty">No notes yet. Add one below.</p>
          ) : (
            <div className="notes-list">
              {notes.map((note) => (
                <div key={note.id} className="note-card">
                  <div className="note-card-header">
                    <div className="note-card-meta">
                      <Avatar name={note.author} size={24} />
                      <span className="note-author">{note.author}</span>
                      <span className="note-date">{note.createdAt}</span>
                    </div>
                    <div className="note-kebab-wrapper" ref={kebabOpen === note.id ? kebabRef : undefined}>
                      <button type="button" className="note-kebab-btn" onClick={() => setKebabOpen(kebabOpen === note.id ? null : note.id)} aria-label="Note actions">
                        <MoreVertical size={16} />
                      </button>
                      {kebabOpen === note.id && (
                        <div className="note-kebab-menu">
                          <button type="button" className="note-kebab-item" onClick={() => startEdit(note)}>
                            <Pencil size={14} />
                            <span>Edit</span>
                          </button>
                          <button type="button" className="note-kebab-item danger" onClick={() => { onDeleteNote(recordId, note.id); setKebabOpen(null); }}>
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {editingNoteId === note.id ? (
                    <div className="note-edit-area">
                      <textarea
                        className="field notes-textarea"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleEditSave(note.id); } }}
                        rows={3}
                        autoFocus
                      />
                      <div className="note-edit-actions">
                        <button type="button" className="button button-sm primary" onClick={() => handleEditSave(note.id)} disabled={!editText.trim()}>Save</button>
                        <button type="button" className="button button-sm outline-primary" onClick={() => { setEditingNoteId(null); setEditText(''); }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <p className="note-text">{note.text}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="notes-input-area">
          <textarea
            className="field notes-textarea"
            placeholder="Write a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
            rows={3}
          />
          <button type="button" className="notes-send-btn" onClick={handleSubmit} disabled={!newNote.trim()} aria-label="Send note">
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Sheet (slide-over filter panel) with backdrop click-to-close       */
/* ------------------------------------------------------------------ */

interface FilterState {
  start: string;
  end: string;
  sender: string;
  seal: string;
  transaction: string;
  customer: string;
  status: string;
  components: string;
  type: string;
  sequence: string;
  modified: boolean;
  componentMfg: string;
}

const EMPTY_FILTERS: FilterState = {
  start: '',
  end: '',
  sender: '',
  seal: 'Searching All',
  transaction: '',
  customer: '',
  status: 'Searching All',
  components: '',
  type: 'Searching All',
  sequence: '',
  modified: false,
  componentMfg: 'Searching All',
};

function isFiltered(filters: FilterState): boolean {
  return (
    filters.start !== '' ||
    filters.end !== '' ||
    filters.sender !== '' ||
    filters.seal !== 'Searching All' ||
    filters.transaction !== '' ||
    filters.customer !== '' ||
    filters.status !== 'Searching All' ||
    filters.components !== '' ||
    filters.type !== 'Searching All' ||
    filters.sequence !== '' ||
    filters.modified !== false ||
    filters.componentMfg !== 'Searching All'
  );
}

/* ------------------------------------------------------------------ */
/*  DatePickerField — styled date picker using Calendar + Popover      */
/* ------------------------------------------------------------------ */

function DatePickerField({ id, value, onChange, placeholder }: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const dateValue = value ? new Date(value + 'T00:00:00') : undefined;
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id}
          className="field date-picker-trigger"
        >
          <CalendarDays size={15} className="date-picker-icon" />
          <span className={value ? 'date-picker-value' : 'date-picker-placeholder'}>
            {dateValue ? format(dateValue, 'MMM d, yyyy') : (placeholder || 'Pick a date')}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="date-picker-popover w-auto p-0" align="start" side="bottom" avoidCollisions>
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          fromYear={2020}
          toYear={2030}
          formatters={{
            formatMonthCaption: (date: Date) => format(date, 'MMM'),
          }}
          selected={dateValue}
          onSelect={(day) => {
            onChange(day ? format(day, 'yyyy-MM-dd') : '');
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

// Collect unique senders & customers from all project rows for filter dropdowns
const ALL_SENDERS = [...new Set(PROJECTS.flatMap((p) => p.rows.map((r) => r[6])))].sort();
const ALL_CUSTOMERS = [...new Set(PROJECTS.flatMap((p) => p.rows.map((r) => r[1])))].sort();

function FilterSheet({ open, onOpenChange, filters, setFilters }: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  filters: FilterState;
  setFilters: (f: FilterState) => void;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
  };

  const labelStyle = { color: '#303030', fontSize: 'var(--font-size-100)', fontWeight: 700 } as const;

  return (
    <>
      <div className="sheet-backdrop is-open" onClick={() => onOpenChange(false)} />
      <div ref={sheetRef} className="sheet is-open" aria-labelledby="submissionFiltersLabel">
        <div className="sheet-header">
          <div>
            <h2 className="sheet-title" id="submissionFiltersLabel">Transmission Filters</h2>
            <p className="sheet-description">Filter transmissions by date, status, customer, and component details.</p>
          </div>
          <button type="button" className="sheet-close-btn" onClick={() => onOpenChange(false)} aria-label="Close filters">
            <X size={18} />
          </button>
        </div>
        <div className="sheet-body">
          <div className="filter-form">
            <div className="form-row">
              <label htmlFor="filter-start" style={labelStyle}>Start</label>
              <DatePickerField id="filter-start" value={filters.start} onChange={(v) => updateFilter('start', v)} placeholder="Select start date" />
            </div>
            <div className="form-row">
              <label htmlFor="filter-end" style={labelStyle}>End</label>
              <DatePickerField id="filter-end" value={filters.end} onChange={(v) => updateFilter('end', v)} placeholder="Select end date" />
            </div>
            <div className="form-row">
              <label htmlFor="filter-sender" style={labelStyle}>Sender</label>
              <select className="field" id="filter-sender" value={filters.sender} onChange={(e) => updateFilter('sender', e.target.value)}>
                <option value="">All Senders</option>
                {ALL_SENDERS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="filter-seal" style={labelStyle}>State</label>
              <select className="field" id="filter-seal" value={filters.seal} onChange={(e) => updateFilter('seal', e.target.value)}>
                <option value="Searching All">All States</option>
                {US_STATES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="filter-transaction" style={labelStyle}>Transaction ID</label>
              <input className="field" id="filter-transaction" type="text" value={filters.transaction} onChange={(e) => updateFilter('transaction', e.target.value)} />
            </div>
            <div className="form-row">
              <label htmlFor="filter-customer" style={labelStyle}>Customer</label>
              <select className="field" id="filter-customer" value={filters.customer} onChange={(e) => updateFilter('customer', e.target.value)}>
                <option value="">All Customers</option>
                {ALL_CUSTOMERS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="filter-status" style={labelStyle}>Status</label>
              <select className="field" id="filter-status" value={filters.status} onChange={(e) => updateFilter('status', e.target.value)}>
                <option value="Searching All">All Statuses</option>
                {WORKFLOW_STAGES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="filter-components" style={labelStyle}># Components</label>
              <input className="field" id="filter-components" type="text" value={filters.components} onChange={(e) => updateFilter('components', e.target.value)} />
            </div>
            <div className="form-row">
              <label htmlFor="filter-type" style={labelStyle}>Type</label>
              <select className="field" id="filter-type" value={filters.type} onChange={(e) => updateFilter('type', e.target.value)}>
                <option value="Searching All">All Types</option>
                <option>Standard</option>
                <option>Repair</option>
                <option>Reseal</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="filter-sequence" style={labelStyle}>Sequence Number</label>
              <input className="field" id="filter-sequence" type="text" value={filters.sequence} onChange={(e) => updateFilter('sequence', e.target.value)} />
            </div>
            <div className="form-row checkbox-row">
              <input id="filter-modified" type="checkbox" checked={filters.modified} onChange={(e) => updateFilter('modified', e.target.checked)} />
              <label htmlFor="filter-modified">Modified Components</label>
            </div>
            <div className="form-row">
              <label htmlFor="filter-component-mfg" style={labelStyle}>Priority</label>
              <select className="field" id="filter-component-mfg" value={filters.componentMfg} onChange={(e) => updateFilter('componentMfg', e.target.value)}>
                <option value="Searching All">All Priorities</option>
                <option>Normal (12 hours)</option>
                <option>Extended (24 hours)</option>
                <option>Same Day Rush</option>
                <option>Priority Rush</option>
              </select>
            </div>
          </div>
        </div>
        <div className="sheet-footer">
          <button type="button" className="button outline-primary" onClick={clearFilters}>
            <X aria-hidden="true" />
            <span className="button-label">Clear</span>
          </button>
          <button type="button" className="button primary" onClick={() => onOpenChange(false)}>
            <Check aria-hidden="true" />
            <span className="button-label">Apply Filters</span>
          </button>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Shell (sidebar + header + footer)                                  */
/* ------------------------------------------------------------------ */

function Shell({ pathname, children, isDesktop, sidebarCollapsed, setSidebarCollapsed, mobileNavOpen, setMobileNavOpen }: {
  pathname: string;
  children: ReactNode;
  isDesktop: boolean;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (fn: any) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (fn: any) => void;
}) {
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: any) => {
      if (!event?.target?.closest('.dropdown')) setAccountOpen(false);
    };
    document?.addEventListener('click', onClick);
    return () => document?.removeEventListener('click', onClick);
  }, []);

  const toggleSidebar = () => {
    if (isDesktop) {
      setSidebarCollapsed((v: boolean) => !v);
      return;
    }
    setMobileNavOpen((v: boolean) => !v);
  };

  return (
    <div className={`shell${isDesktop && sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
      <header className="topbar">
        <div className="nav-container">
          <div className="brand-row">
            <AppLink to="/index.html" className="brand" currentPath={pathname}>
              <img className="brand-logo" src="/sst-logo.svg" alt="Simpson Strong-Tie" />
              <div>
                <p className="brand-title">Engineering Status Service</p>
              </div>
            </AppLink>
            <button type="button" className="nav-toggle" onClick={toggleSidebar} aria-controls="superAdminNavbar" aria-expanded={isDesktop ? !sidebarCollapsed : mobileNavOpen} aria-label="Toggle navigation">
              {isDesktop ? <PanelLeft className="nav-toggle-icon" aria-hidden="true" /> : <Menu className="nav-toggle-icon" aria-hidden="true" />}
            </button>
          </div>
          <div className={`nav-panel${mobileNavOpen ? ' is-open' : ''}`} id="superAdminNavbar">
            <nav className="navigation-menu main-nav" aria-label="SuperAdmin navigation">
              <div className="navigation-menu-list main-nav-list">
                {NAV_ITEMS.map((item: NavItem) => (
                  <AppLink key={item?.href} to={item?.href} currentPath={pathname} className="nav-link">
                    <span className="nav-link-icon-wrap">
                      <item.icon className="nav-icon" aria-hidden="true" />
                    </span>
                    <span className="nav-link-label">{item?.label}</span>
                  </AppLink>
                ))}
              </div>
            </nav>
            <div className="account-block">
              <div className="dropdown">
                <button type="button" className="account-menu-button dropdown-toggle" onClick={() => setAccountOpen((v: boolean) => !v)} aria-expanded={accountOpen} aria-label={`Account menu for ${CURRENT_USER}`}>
                  <UserCog className="account-type-icon" aria-hidden="true" />
                  <span className="account-display-name">{CURRENT_USER}</span>
                  <ChevronDown className="dropdown-chevron" aria-hidden="true" />
                </button>
                {accountOpen ? (
                  <div className="account-menu-list is-open">
                    <div className="account-type-label">
                      <UserCog aria-hidden="true" />
                      <span>Internal Admin</span>
                    </div>
                    <hr className="separator" />
                    <AppLink className="account-menu-item" to="/account.html" currentPath={pathname}>
                      <UserRound aria-hidden="true" />
                      <span>My Account</span>
                    </AppLink>
                    <button type="button" className="account-menu-item">
                      <LogOut aria-hidden="true" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="content">{children}</main>
      <footer className="site-footer">
        <div className="footer-inner">
          <span>© 2026 - Simpson Strong-Tie Company Inc.</span>
          <span>
            <span className="environment-name">C1-DEV</span> (v0.26.7.1)
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PageHeader                                                         */
/* ------------------------------------------------------------------ */

function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <section className="page-header">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
      </div>
      {actions}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Projects Page                                                      */
/* ------------------------------------------------------------------ */

function ProjectsPage({ pathname, notes, onAddNote, onDeleteNote, onEditNote }: {
  pathname: string;
  notes: NotesMap;
  onAddNote: (recordId: string, text: string) => void;
  onDeleteNote: (recordId: string, noteId: string) => void;
  onEditNote: (recordId: string, noteId: string, text: string) => void;
}) {
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS?.[0]?.id ?? 'p100');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [notesOpenFor, setNotesOpenFor] = useState<string | null>(null);
  const hasSearch = appliedSearch.length > 0;
  const hasFilters = isFiltered(filters);

  const filteredProjects = appliedSearch
    ? PROJECTS.filter((p: Project) => {
        const q = appliedSearch.toLowerCase();
        // Match project name or any customer name within the project's rows
        return p?.name?.toLowerCase()?.includes(q) ||
          p?.rows?.some((row: string[]) => row[1]?.toLowerCase()?.includes(q));
      })
    : PROJECTS;
  const activeProject = filteredProjects?.find((p: Project) => p?.id === activeProjectId) ?? filteredProjects?.[0];

  const handleClearSearch = () => {
    setSearchQuery('');
    setAppliedSearch('');
  };

  // Column chooser state
  const ALL_TRANSMISSION_COLUMNS = ['_actions', 'txId', 'status', 'customer', 'seals', 'received', 'sent', 'modified', 'sentBy', 'priority'];
  const ALWAYS_VISIBLE = ['_actions', 'txId']; // sticky cols are always visible
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [columnChooserOpen, setColumnChooserOpen] = useState(false);
  const columnChooserRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!columnChooserOpen) return;
    const handler = (e: MouseEvent) => {
      if (columnChooserRef.current && !columnChooserRef.current.contains(e.target as Node)) setColumnChooserOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [columnChooserOpen]);

  const toggleColumn = (col: string) => {
    setHiddenColumns((prev) => prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]);
  };

  // Actions + Transaction ID first (frozen), then the rest
  const transmissionColumns = ALL_TRANSMISSION_COLUMNS.filter((c) => !hiddenColumns.includes(c));
  const transmissionHeaders: Record<string, string> = {
    _actions: 'Actions',
    txId: 'Transaction ID',
    customer: 'Customer',
    seals: 'State',
    received: 'Received',
    sent: '# Sent',
    modified: 'Modified',
    sentBy: 'Sent By',
    status: 'Status',
    priority: 'Priority',
  };

  const transmissionRows = (activeProject?.rows ?? []).map((row: string[]) => ({
    id: row[0],
    txId: row[0],
    customer: row[1],
    seals: row[2],
    received: formatDate(row[3]),
    sent: row[4],
    modified: row[5],
    sentBy: (row[6] ?? '').replace(/\b\w/g, (c: string) => c.toUpperCase()),
    status: row[7],
    statusTone: row[8],
    priority: row[9] ?? 'Normal',
  }));

  return (
    <>
      <PageHeader
        title="Transmitted Components"
        subtitle={<>Transmitted projects from CS Director for engineering review and seal</>}
      />
      <div className="toolbar search-toolbar">
        <div className="input-group search-input-group">
          <label htmlFor="project-search" className="sr-only">Project name filter</label>
          <input className="field" id="project-search" type="search" placeholder="Search by project or customer name" aria-label="Project name filter" value={searchQuery} onChange={(e: any) => setSearchQuery(e?.target?.value ?? '')} onKeyDown={(e: any) => { if (e?.key === 'Enter') setAppliedSearch(searchQuery); }} />
          <button type="button" className="button primary" onClick={() => setAppliedSearch(searchQuery)}>
            <Search aria-hidden="true" />
            <span className="button-label">Search</span>
          </button>
          {hasSearch && (
            <button type="button" className="button outline-primary" onClick={handleClearSearch}>
              <X aria-hidden="true" />
              <span className="button-label">Clear</span>
            </button>
          )}
        </div>
        <button type="button" className={`button outline-primary${hasFilters ? ' filters-active' : ''}`} onClick={() => setFiltersOpen(true)}>
          <SlidersHorizontal aria-hidden="true" />
          <span className="button-label">Filters{hasFilters ? ' \u2022' : ''}</span>
        </button>
      </div>

      <FilterSheet open={filtersOpen} onOpenChange={setFiltersOpen} filters={filters} setFilters={setFilters} />

      {notesOpenFor && (
        <NotesSheet
          open={true}
          onOpenChange={() => setNotesOpenFor(null)}
          recordId={notesOpenFor}
          notes={notes[notesOpenFor] ?? []}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          onEditNote={onEditNote}
        />
      )}

      <div className="project-browser">
        <section className="card project-list-panel">
          <div className="card-header">
            <h2 className="card-title">Projects</h2>
            <p className="card-description">{filteredProjects?.length ?? 0} projects</p>
          </div>
          <div className="card-body">
            {(filteredProjects ?? []).map((project: Project) => (
              <button
                key={project?.id}
                type="button"
                className={`project-list-item${project?.id === activeProjectId ? ' active' : ''}`}
                onClick={() => setActiveProjectId(project?.id)}
                aria-pressed={project?.id === activeProjectId}
              >
                <span>
                  <strong>{project?.name}</strong>
                  <small>{project?.count}</small>
                </span>
                <StatusBadge tone={project?.badgeTone ?? 'info'}>{project?.badge}</StatusBadge>
              </button>
            ))}
          </div>
        </section>

        <section className="card project-submission-panel" aria-labelledby="selected-project-title">
          <div className="project-submission-header">
            <div>
              <h2 className="card-title" id="selected-project-title">Transmitted Components</h2>
              <p className="card-description">{activeProject?.summary}</p>
            </div>
            <div className="transmission-header-actions">
              <StatusBadge tone={activeProject?.latestTone ?? 'info'}>{activeProject?.latest}</StatusBadge>
              <div className="column-chooser-wrapper" ref={columnChooserRef}>
                <button type="button" className="button button-sm button-icon outline-primary" onClick={() => setColumnChooserOpen(!columnChooserOpen)} aria-label="Choose columns">
                  <Columns3 size={15} />
                </button>
                {columnChooserOpen && (
                  <div className="column-chooser-menu">
                    <div className="column-chooser-title">Toggle Columns</div>
                    {ALL_TRANSMISSION_COLUMNS.filter((c) => !ALWAYS_VISIBLE.includes(c)).map((col) => {
                      const visible = !hiddenColumns.includes(col);
                      return (
                        <button key={col} type="button" className={`column-chooser-item${visible ? ' is-visible' : ''}`} onClick={() => toggleColumn(col)}>
                          {visible ? <Eye size={14} /> : <EyeOff size={14} />}
                          <span>{transmissionHeaders[col] ?? col}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
              <ResizableTable
                columns={transmissionColumns}
                headerLabels={transmissionHeaders}
                rows={transmissionRows}
                stickyColumns={['_actions', 'txId']}
                reorderable
                sortableColumns={['txId', 'customer', 'seals', 'received', 'sent', 'modified', 'sentBy', 'status', 'priority']}
                renderCell={(row, col) => {
                  if (col === 'status') {
                    return <StageProgressBar status={row.status} />;
                  }
                  if (col === 'priority') {
                    const pClass = row.priority?.includes('Rush') ? 'priority-rush' : (row.priority === 'Extended' ? 'priority-extended' : 'priority-normal');
                    return <span className={`priority-pill ${pClass}`}>{row.priority}</span>;
                  }
                  if (col === 'sentBy') {
                    return (
                      <span className="avatar-name-cell">
                        <Avatar name={row.sentBy} size={24} />
                        <span className="cell-truncate-inline" title={row.sentBy}>{row.sentBy}</span>
                      </span>
                    );
                  }
                  if (col === '_actions') {
                    const noteCount = (notes[row.txId] ?? []).length;
                    return (
                      <div className="actions">
                        <AppLink to={`/submission-details.html?tx=${row.txId}`} currentPath={pathname} className="button button-sm open-btn" aria-label={`Open transmission ${row.txId}`}>
                          Open
                        </AppLink>
                        <button
                          type="button"
                          className={`button button-sm button-icon notes-trigger${noteCount > 0 ? ' has-notes' : ''}`}
                          aria-label={`Notes for ${row.txId}${noteCount > 0 ? ` (${noteCount})` : ''}`}
                          onClick={() => setNotesOpenFor(row.txId)}
                        >
                          <MessageSquareText size={15} />
                          {noteCount > 0 && <span className="notes-count">{noteCount}</span>}
                        </button>
                      </div>
                    );
                  }
                  return row[col];
                }}
              />
          </div>
        </section>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  ListPage (generic table page for Users, Groups, Jobs)              */
/* ------------------------------------------------------------------ */

interface ListRow {
  id: string;
  [key: string]: any;
}

function ListPage({ pathname, title, subtitle, primaryAction, columns, headerLabels, rows, sortableColumns, stickyColumns }: {
  pathname: string;
  title: string;
  subtitle: ReactNode;
  primaryAction: { to: string } | null;
  columns: string[];
  headerLabels?: Record<string, string>;
  rows: ListRow[];
  sortableColumns?: string[];
  stickyColumns?: string[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const hasSearch = appliedSearch.length > 0;

  const filteredRows = appliedSearch
    ? (rows ?? []).filter((row: ListRow) => {
        const q = appliedSearch?.toLowerCase() ?? '';
        return (columns ?? []).some((col: string) => {
          const val = row?.[col];
          return typeof val === 'string' && val?.toLowerCase()?.includes(q);
        });
      })
    : rows;

  const handleClearSearch = () => {
    setSearchQuery('');
    setAppliedSearch('');
  };

  const allColumns = columns.includes('_actions') ? columns : [...columns, '_actions'];
  const allHeaders = { ...(headerLabels ?? {}), _actions: 'Actions' };

  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={
          primaryAction ? (
            <AppLink to={primaryAction?.to} currentPath={pathname} className="button primary">
              <Plus aria-hidden="true" />
              <span className="button-label">Create New</span>
            </AppLink>
          ) : null
        }
      />
      <div className="toolbar search-toolbar">
        <div className="input-group search-input-group">
          <label htmlFor={`${title?.toLowerCase()}-search`} className="sr-only">{title} filter</label>
          <input className="field" id={`${title?.toLowerCase()}-search`} type="search" placeholder={`Enter ${title?.replace(/s$/, '')} name or filter`} aria-label={`${title} filter`} value={searchQuery} onChange={(e: any) => setSearchQuery(e?.target?.value ?? '')} onKeyDown={(e: any) => { if (e?.key === 'Enter') setAppliedSearch(searchQuery); }} />
          <button type="button" className="button primary" onClick={() => setAppliedSearch(searchQuery)}>
            <Search aria-hidden="true" />
            <span className="button-label">Search</span>
          </button>
          {hasSearch && (
            <button type="button" className="button outline-primary" onClick={handleClearSearch}>
              <X aria-hidden="true" />
              <span className="button-label">Clear</span>
            </button>
          )}
        </div>
      </div>
      <section className="card">
        <div className="card-body">
          <div className="table-wrap">
            <ResizableTable
              columns={allColumns}
              headerLabels={allHeaders}
              rows={filteredRows}
              sortableColumns={sortableColumns}
              stickyColumns={stickyColumns}
              renderCell={(row, col) => {
                if (col === '_actions') {
                  return (
                    <div className="actions">
                      <AppLink to={row?.editTo ?? '#'} currentPath={pathname} className="button button-sm button-icon" aria-label={`Edit ${row?.name ?? row?.id}`}>
                        <Pencil aria-hidden="true" />
                      </AppLink>
                      {row?.detailsTo ? (
                        <AppLink to={row?.detailsTo} currentPath={pathname} className="button button-sm open-btn" aria-label={`Open ${row?.name ?? row?.id}`}>
                          Open
                        </AppLink>
                      ) : null}
                      <button type="button" className="button danger-soft button-sm button-icon" aria-label={`Delete ${row?.name ?? row?.id}`}>
                        <Trash2 aria-hidden="true" />
                      </button>
                    </div>
                  );
                }
                return row?.[col];
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Users Page                                                         */
/* ------------------------------------------------------------------ */

function UsersPage({ pathname, users, groups }: { pathname: string; users: UserRecord[]; groups: GroupRecord[] }) {
  const rows = (users ?? []).map((user: UserRecord) => {
    const userGroups = (groups ?? []).filter((g: GroupRecord) => [...(g?.admins ?? []), ...(g?.members ?? [])].includes(user?.id));
    return {
      id: user?.id ?? '',
      name: user?.name ?? '',
      role: user?.role ?? '',
      groups: userGroups?.map((g: GroupRecord) => g?.name)?.join(', ') || '—',
      status: <StatusBadge tone={getStatusTone(user?.status ?? '')}>{user?.status}</StatusBadge>,
      editTo: getUserEditPath(user?.id ?? ''),
      detailsTo: `/user-details.html?user=${encodeURIComponent(user?.id ?? '')}`,
    };
  });

  return (
    <ListPage
      pathname={pathname}
      title="Users"
      subtitle={<>Internal users for <strong>Simpson Engineering</strong></>}
      primaryAction={{ to: '/user-form.html' }}
      columns={['_actions', 'id', 'name', 'role', 'groups', 'status']}
      headerLabels={{ _actions: 'Actions', id: 'Email', name: 'Name', role: 'Role', groups: 'Groups', status: 'Status' }}
      rows={rows}
      stickyColumns={['_actions']}
      sortableColumns={['id', 'name', 'role', 'groups']}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Groups Page                                                        */
/* ------------------------------------------------------------------ */

function GroupsPage({ pathname, groups }: { pathname: string; groups: GroupRecord[] }) {
  const rows = (groups ?? []).map((group: GroupRecord) => ({
    id: group?.id ?? '',
    name: group?.name ?? '',
    users: String((group?.admins?.length ?? 0) + (group?.members?.length ?? 0)),
    status: <StatusBadge tone={getStatusTone(group?.status ?? '')}>{group?.status}</StatusBadge>,
    editTo: getGroupEditPath(group?.id ?? ''),
  }));

  return (
    <ListPage
      pathname={pathname}
      title="Groups"
      subtitle={<>Permission groups available to the account set</>}
      primaryAction={{ to: '/group-form.html' }}
      columns={['id', 'name', 'users', 'status']}
      headerLabels={{ id: 'ID', name: 'Name', users: 'Users', status: 'Status' }}
      rows={rows}
      sortableColumns={['id', 'name', 'users']}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Jobs Page                                                          */
/* ------------------------------------------------------------------ */

function JobsPage({ pathname }: { pathname: string }) {
  const rows = (JOBS ?? []).map((job: JobRecord) => ({
    ...job,
    status: <StatusBadge tone={getStatusTone(job?.status ?? '')}>{job?.status}</StatusBadge>,
    editTo: '#',
    detailsTo: '#',
  }));

  return (
    <ListPage
      pathname={pathname}
      title="Jobs"
      subtitle={<>Queued and completed background jobs</>}
      primaryAction={null}
      columns={['id', 'name', 'type', 'status']}
      headerLabels={{ id: 'ID', name: 'Name', type: 'Type', status: 'Status' }}
      rows={rows}
      sortableColumns={['id', 'name', 'type']}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Maintenance Page                                                   */
/* ------------------------------------------------------------------ */

function MaintenancePage() {
  return (
    <>
      <PageHeader title="Maintenance" subtitle={<>System settings and service endpoints</>} />
      <div className="maintenance-layout">
        <section className="card">
          <div className="card-header">
            <h2 className="card-title">Environment</h2>
            <p className="card-description">Current deployment and service endpoints.</p>
          </div>
          <div className="card-body">
            <div className="detail-list">
              <div className="detail-row"><span>Environment</span><strong>C1-DEV</strong></div>
              <div className="detail-row"><span>API host</span><strong>https://status-api.example.test</strong></div>
              <div className="detail-row"><span>Release</span><strong>v0.26.7.1</strong></div>
            </div>
          </div>
        </section>
        <div className="maintenance-actions">
          <button type="button" className="button primary" onClick={() => { if (typeof window !== 'undefined') window.alert('Settings saved successfully.'); }}>
            <Save aria-hidden="true" />
            <span className="button-label">Save Settings</span>
          </button>
          <button type="button" className="button outline-primary" onClick={() => { if (typeof window !== 'undefined') window.alert('Index rebuild started.'); }}>
            <TriangleAlert aria-hidden="true" />
            <span className="button-label">Rebuild Index</span>
          </button>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Account Page                                                       */
/* ------------------------------------------------------------------ */

function AccountPage() {
  return (
    <>
      <PageHeader title="My Account" subtitle={<>Internal admin profile settings</>} />
      <div className="form-grid">
        <section className="card">
          <div className="card-body">
            <div className="form-row">
              <label htmlFor="display-name" style={{ color: '#303030', fontSize: 'var(--font-size-100)', fontWeight: 700 }}>Display Name</label>
              <input className="field" id="display-name" defaultValue={CURRENT_USER} readOnly />
            </div>
            <div className="form-row">
              <label htmlFor="account-email" style={{ color: '#303030', fontSize: 'var(--font-size-100)', fontWeight: 700 }}>Email</label>
              <input className="field" id="account-email" defaultValue="frank.fernandez@example.com" readOnly />
            </div>
            <div className="page-actions">
              <button type="button" className="button outline-primary">
                <KeyRound aria-hidden="true" />
                <span className="button-label">Change password</span>
              </button>
              <button type="button" className="button primary">
                <Save aria-hidden="true" />
                <span className="button-label">Save</span>
              </button>
            </div>
          </div>
        </section>
        <section className="card">
          <div className="card-header">
            <h2 className="card-title">Account Details</h2>
          </div>
          <div className="card-body">
            <div className="detail-list">
              {(DETAIL_ITEMS ?? []).map(([label, value]: [string, string]) => (
                <div className="detail-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail Page (User Details, Submission Details)                      */
/* ------------------------------------------------------------------ */

function DetailPage({ pathname, title, subtitle, buttonLabel, actionTo, backTo, details, listItems, stepper }: {
  pathname: string;
  title: string;
  subtitle: ReactNode;
  buttonLabel: string;
  actionTo: string;
  backTo: string;
  details: [string, ReactNode][];
  listItems: [string, ReactNode][];
  stepper?: ReactNode;
}) {
  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={
          <div className="page-actions">
            <AppLink to={actionTo} currentPath={pathname} className="button primary">
              <Pencil aria-hidden="true" />
              <span className="button-label">{buttonLabel}</span>
            </AppLink>
            <AppLink to={backTo} currentPath={pathname} className="button">
              <ArrowLeft aria-hidden="true" />
              <span className="button-label">Back to List</span>
            </AppLink>
          </div>
        }
      />
      {stepper && (
        <section className="card stepper-card" style={{ padding: 0 }}>
          <div className="card-body">
            {stepper}
          </div>
        </section>
      )}
      <section className="card submission-detail-card" style={{ padding: 0 }}>
        <div className="card-body">
          <div className="detail-list">
            {(details ?? []).map(([label, value]: [string, ReactNode]) => (
              <div className="detail-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
            {(listItems ?? []).map(([label, value]: [string, ReactNode]) => (
              <div className="detail-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  User Details Page                                                  */
/* ------------------------------------------------------------------ */

function UserDetailsPage({ pathname, users, groups, userId }: { pathname: string; users: UserRecord[]; groups: GroupRecord[]; userId: string }) {
  const user = users?.find((e: UserRecord) => e?.id === userId) ?? users?.[1] ?? users?.[0] ?? EMPTY_USER;
  const groupNameMap = getGroupNameMap(groups);
  const adminGroups = (user?.adminGroups ?? []).map((gid: string) => groupNameMap?.[gid]).filter(Boolean);
  const memberGroups = (user?.memberGroups ?? []).map((gid: string) => groupNameMap?.[gid]).filter(Boolean);
  return (
    <DetailPage
      pathname={pathname}
      title="User Details"
      subtitle={<>A read-only snapshot of the selected user</>}
      buttonLabel="Edit"
      actionTo={getUserEditPath(user?.id ?? '')}
      backTo="/users.html"
      details={[
        ['User name', user?.name ?? ''],
        ['Email', user?.id ?? ''],
        ['Role', user?.role ?? ''],
        ['Admin groups', adminGroups?.join(', ') || '—'],
      ]}
      listItems={[
        ['Member groups', memberGroups?.join(', ') || '—'],
        ['Status', <StatusBadge key="st" tone={getStatusTone(user?.status ?? '')}>{user?.status}</StatusBadge>],
        ['Password expiration', formatDate(user?.passwordExpiration ?? '')],
      ]}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Submission Details Page                                            */
/* ------------------------------------------------------------------ */

function SubmissionDetailsPage({ pathname }: { pathname: string }) {
  const txId = useQueryValue('tx');

  // Find the transmission across all projects
  let txRow: string[] | undefined;
  let txProject: Project | undefined;
  for (const proj of PROJECTS) {
    const found = proj.rows.find((r: string[]) => r[0] === txId);
    if (found) { txRow = found; txProject = proj; break; }
  }

  // Fallback to first row of first project if not found
  if (!txRow) { txProject = PROJECTS[0]; txRow = txProject.rows[0]; }

  const txStatus = txRow[7];
  const sentBy = (txRow[6] ?? '').replace(/\b\w/g, (c: string) => c.toUpperCase());

  return (
    <DetailPage
      pathname={pathname}
      title="Transmission Details"
      subtitle={<>Transaction {txRow[0]} from {txProject!.name}</>}
      buttonLabel="Edit"
      actionTo="#"
      backTo="/index.html"
      stepper={<WorkflowStepper currentStatus={txStatus} />}
      details={[
        ['Transaction ID', txRow[0]],
        ['Customer', txRow[1]],
        ['State', txRow[2]],
      ]}
      listItems={[
        ['Received', formatDate(txRow[3])],
        ['Sent by', sentBy],
        ['Components', txRow[4]],
      ]}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  User Form Page                                                     */
/* ------------------------------------------------------------------ */

function UserFormPage({ pathname, users, groups, onSaveUser, onResetPassword }: {
  pathname: string;
  users: UserRecord[];
  groups: GroupRecord[];
  onSaveUser: (origId: string, next: UserRecord) => void;
  onResetPassword: (userId: string) => void;
}) {
  const userId = useQueryValue('user');
  const user = users?.find((e: UserRecord) => e?.id === userId) ?? (userId ? (users?.[0] ?? EMPTY_USER) : EMPTY_USER);
  const isExistingUser = Boolean(userId && users?.some((e: UserRecord) => e?.id === userId));
  const groupNameMap = getGroupNameMap(groups);
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.id ?? '');
  const [role, setRole] = useState(user?.role ?? 'Member');
  const [adminGroups, setAdminGroups] = useState<string[]>(user?.adminGroups ?? []);
  const [memberGroups, setMemberGroups] = useState<string[]>(user?.memberGroups ?? []);
  const [selectedAdminGroup, setSelectedAdminGroup] = useState('');
  const [selectedMemberGroup, setSelectedMemberGroup] = useState('');

  useEffect(() => {
    setName(user?.name ?? '');
    setEmail(user?.id ?? '');
    setRole(user?.role ?? 'Member');
    setAdminGroups(user?.adminGroups ?? []);
    setMemberGroups(user?.memberGroups ?? []);
    setSelectedAdminGroup('');
    setSelectedMemberGroup('');
  }, [user?.id]);

  const addGroup = (groupId: string, kind: string) => {
    if (!groupId) return;
    if (kind === 'admin') {
      setAdminGroups((cur: string[]) => cur?.includes(groupId) ? cur : [...(cur ?? []), groupId]);
      setMemberGroups((cur: string[]) => (cur ?? []).filter((e: string) => e !== groupId));
      setSelectedAdminGroup('');
      return;
    }
    setMemberGroups((cur: string[]) => cur?.includes(groupId) ? cur : [...(cur ?? []), groupId]);
    setAdminGroups((cur: string[]) => (cur ?? []).filter((e: string) => e !== groupId));
    setSelectedMemberGroup('');
  };

  const removeGroup = (groupId: string, kind: string) => {
    if (kind === 'admin') {
      setAdminGroups((cur: string[]) => (cur ?? []).filter((e: string) => e !== groupId));
      return;
    }
    setMemberGroups((cur: string[]) => (cur ?? []).filter((e: string) => e !== groupId));
  };

  const handleSubmit = (event?: any) => {
    event?.preventDefault?.();
    onSaveUser?.(user?.id ?? '', {
      ...(user ?? EMPTY_USER),
      id: email,
      name,
      username: email?.split('@')?.[0] ?? user?.username ?? '',
      role,
      adminGroups,
      memberGroups,
    });
    navigate('/users.html');
  };

  return (
    <>
      <PageHeader
        title={isExistingUser ? 'Edit User' : 'Create User'}
        subtitle={<>Manage identity and group access.</>}
        actions={
          <AppLink to="/users.html" currentPath={pathname} className="button">
            <ArrowLeft aria-hidden="true" />
            <span className="button-label">Back to List</span>
          </AppLink>
        }
      />
      <form className="user-edit-layout" onSubmit={handleSubmit}>
        <div className="user-card-stack">
          <section className="card user-form-card" style={{ padding: 0 }}>
            <div className="detail-card-header">
              <h2 className="card-title">User</h2>
            </div>
            <div className="card-body">
              <div className="form-grid">
                <div className="form-row">
                  <label htmlFor="user-name" style={{ color: '#303030', fontSize: 'var(--font-size-100)', fontWeight: 700 }}>Username</label>
                  <input className="field" id="user-name" value={name} onChange={(e: any) => setName(e?.target?.value ?? '')} />
                </div>
                <div className="form-row">
                  <label htmlFor="user-email" style={{ color: '#303030', fontSize: 'var(--font-size-100)', fontWeight: 700 }}>Email</label>
                  <input className="field" id="user-email" type="email" value={email} onChange={(e: any) => setEmail(e?.target?.value ?? '')} />
                </div>
                <div className="form-row">
                  <label htmlFor="user-role" style={{ color: '#303030', fontSize: 'var(--font-size-100)', fontWeight: 700 }}>Role</label>
                  <select className="select" id="user-role" value={role} onChange={(e: any) => setRole(e?.target?.value ?? 'Member')}>
                    <option>Member</option>
                    <option>Admin</option>
                    <option>Internal Admin</option>
                    <option>Reviewer</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="card advanced-card" style={{ padding: 0 }}>
            <div className="detail-card-header">
              <h2 className="card-title">Advanced</h2>
            </div>
            <div className="card-body">
              <div className="form-grid">
                <div className="form-row full">
                  <label htmlFor="password-expiration" style={{ color: '#303030', fontSize: 'var(--font-size-100)', fontWeight: 700 }}>Password Expiration</label>
                  <input className="field" id="password-expiration" defaultValue={formatDate(user?.passwordExpiration ?? 'Not set')} readOnly />
                </div>
              </div>
              <div className="toolbar form-actions">
                <button type="button" className="button outline-primary" onClick={() => onResetPassword?.(user?.id ?? '')} disabled={!isExistingUser}>
                  <KeyRound aria-hidden="true" />
                  <span className="button-label">Reset Password</span>
                </button>
              </div>
            </div>
          </section>
        </div>

        <section className="card assigned-groups-card" style={{ padding: 0 }}>
          <div className="detail-card-header">
            <h2 className="card-title">Assigned Groups</h2>
          </div>
          <div className="card-body">
            <section className="group-assignment-section">
              <div className="assignment-section-header">
                <h3>Admin of Groups</h3>
                <p>Groups this user can administer.</p>
              </div>
              <div className="input-group assignment-picker">
                <select className="select" aria-label="Select admin group" value={selectedAdminGroup} onChange={(e: any) => setSelectedAdminGroup(e?.target?.value ?? '')}>
                  <option value="">Select a group</option>
                  {(groups ?? []).filter((g: GroupRecord) => !(adminGroups ?? []).includes(g?.id)).map((g: GroupRecord) => (
                    <option key={g?.id} value={g?.id}>{g?.name}</option>
                  ))}
                </select>
                <button type="button" className="button" onClick={() => addGroup(selectedAdminGroup, 'admin')}>
                  <Plus aria-hidden="true" />
                  <span className="button-label">Add</span>
                </button>
              </div>
              <div className="selected-groups" aria-label="Selected admin groups">
                {(adminGroups ?? []).map((gid: string) => (
                  <span key={gid} className="selected-group-pill admin-group-pill">
                    {groupNameMap?.[gid] ?? gid}
                    <button type="button" aria-label={`Remove ${groupNameMap?.[gid] ?? gid}`} onClick={() => removeGroup(gid, 'admin')}>
                      <X aria-hidden="true" />
                    </button>
                  </span>
                ))}
              </div>
            </section>

            <section className="group-assignment-section">
              <div className="assignment-section-header">
                <h3>Member of Groups</h3>
                <p>Groups this user can access as a member.</p>
              </div>
              <div className="input-group assignment-picker">
                <select className="select" aria-label="Select member group" value={selectedMemberGroup} onChange={(e: any) => setSelectedMemberGroup(e?.target?.value ?? '')}>
                  <option value="">Select a group</option>
                  {(groups ?? []).filter((g: GroupRecord) => !(memberGroups ?? []).includes(g?.id)).map((g: GroupRecord) => (
                    <option key={g?.id} value={g?.id}>{g?.name}</option>
                  ))}
                </select>
                <button type="button" className="button" onClick={() => addGroup(selectedMemberGroup, 'member')}>
                  <Plus aria-hidden="true" />
                  <span className="button-label">Add</span>
                </button>
              </div>
              <div className="selected-groups" aria-label="Selected member groups">
                {(memberGroups ?? []).map((gid: string) => (
                  <span key={gid} className="selected-group-pill member-group-pill">
                    {groupNameMap?.[gid] ?? gid}
                    <button type="button" aria-label={`Remove ${groupNameMap?.[gid] ?? gid}`} onClick={() => removeGroup(gid, 'member')}>
                      <X aria-hidden="true" />
                    </button>
                  </span>
                ))}
              </div>
            </section>
          </div>
        </section>
      </form>
      <div className="page-actions">
        <button type="button" className="button primary" onClick={handleSubmit}>
          <Save aria-hidden="true" />
          <span className="button-label">Save</span>
        </button>
        <AppLink to="/users.html" currentPath={pathname} className="button">
          <X aria-hidden="true" />
          <span className="button-label">Cancel</span>
        </AppLink>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Group Form Page                                                    */
/* ------------------------------------------------------------------ */

function GroupFormPage({ pathname, groups, users, onSaveGroup }: {
  pathname: string;
  groups: GroupRecord[];
  users: UserRecord[];
  onSaveGroup: (origId: string, next: GroupRecord) => void;
}) {
  const groupId = useQueryValue('group');
  const group = groups?.find((e: GroupRecord) => e?.id === groupId) ?? (groupId ? (groups?.[0] ?? EMPTY_GROUP) : EMPTY_GROUP);
  const isExistingGroup = Boolean(groupId && groups?.some((e: GroupRecord) => e?.id === groupId));
  const userMap = getUserMap(users);
  const [groupCode, setGroupCode] = useState(group?.id ?? '');
  const [description, setDescription] = useState(group?.name ?? '');
  const [adminSearch, setAdminSearch] = useState('');
  const [memberSearch, setMemberSearch] = useState('');
  const [admins, setAdmins] = useState<string[]>(group?.admins ?? []);
  const [members, setMembers] = useState<string[]>(group?.members ?? []);

  useEffect(() => {
    setGroupCode(group?.id ?? '');
    setDescription(group?.name ?? '');
    setAdmins(group?.admins ?? []);
    setMembers(group?.members ?? []);
    setAdminSearch('');
    setMemberSearch('');
  }, [group?.id]);

  const addUserToList = (query: string, kind: string) => {
    const normalized = query?.trim()?.toLowerCase() ?? '';
    if (!normalized) return;
    const match = users?.find((e: UserRecord) => e?.id?.toLowerCase() === normalized || e?.name?.toLowerCase() === normalized || e?.username?.toLowerCase() === normalized);
    if (!match) return;
    if (kind === 'admin') {
      setAdmins((cur: string[]) => cur?.includes(match?.id) ? cur : [...(cur ?? []), match?.id]);
      setMembers((cur: string[]) => (cur ?? []).filter((e: string) => e !== match?.id));
      setAdminSearch('');
      return;
    }
    setMembers((cur: string[]) => cur?.includes(match?.id) ? cur : [...(cur ?? []), match?.id]);
    setAdmins((cur: string[]) => (cur ?? []).filter((e: string) => e !== match?.id));
    setMemberSearch('');
  };

  const removeUserFromList = (uid: string, kind: string) => {
    if (kind === 'admin') {
      setAdmins((cur: string[]) => (cur ?? []).filter((e: string) => e !== uid));
      return;
    }
    setMembers((cur: string[]) => (cur ?? []).filter((e: string) => e !== uid));
  };

  const handleSubmit = (event?: any) => {
    event?.preventDefault?.();
    onSaveGroup?.(group?.id ?? '', {
      ...(group ?? EMPTY_GROUP),
      id: groupCode,
      name: description,
      admins,
      members,
    });
    navigate('/groups.html');
  };

  return (
    <>
      <PageHeader
        title={isExistingGroup ? 'Edit Group' : 'Create Group'}
        subtitle={<>Manage group identity and assigned users.</>}
        actions={
          <AppLink to="/groups.html" currentPath={pathname} className="button">
            <ArrowLeft aria-hidden="true" />
            <span className="button-label">Back to List</span>
          </AppLink>
        }
      />
      <form className="group-edit-layout" onSubmit={handleSubmit}>
        <section className="card group-form-card" style={{ padding: 0 }}>
          <div className="detail-card-header">
            <h2 className="card-title">Group</h2>
          </div>
          <div className="card-body">
            <div className="warning-alert">
              <TriangleAlert aria-hidden="true" />
              <span>Changing the group name will log out all group members.</span>
            </div>
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="group-name" style={{ color: '#303030', fontSize: 'var(--font-size-100)', fontWeight: 700 }}>Name</label>
                <input className="field" id="group-name" value={groupCode} onChange={(e: any) => setGroupCode(e?.target?.value ?? '')} />
              </div>
              <div className="form-row">
                <label htmlFor="group-description" style={{ color: '#303030', fontSize: 'var(--font-size-100)', fontWeight: 700 }}>Description</label>
                <input className="field" id="group-description" value={description} onChange={(e: any) => setDescription(e?.target?.value ?? '')} />
              </div>
            </div>
          </div>
        </section>

        <section className="card assigned-users-card" style={{ padding: 0 }}>
          <div className="detail-card-header">
            <h2 className="card-title">Assigned Users</h2>
          </div>
          <div className="card-body">
            <section className="group-assignment-section">
              <div className="assignment-section-header">
                <h3>Group Admins</h3>
                <p>Users who can administer this group.</p>
              </div>
              <div className="input-group assignment-picker">
                <input className="field" type="text" placeholder="Specify Username or Email" aria-label="Specify group admin username or email" value={adminSearch} onChange={(e: any) => setAdminSearch(e?.target?.value ?? '')} />
                <button type="button" className="button" onClick={() => addUserToList(adminSearch, 'admin')}>
                  <Plus aria-hidden="true" />
                  <span className="button-label">Add</span>
                </button>
              </div>
              <div className="table-wrap compact-table">
                <table>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(admins ?? []).map((uid: string) => (
                      <tr key={uid}>
                        <td>{userMap?.[uid]?.id}</td>
                        <td>{userMap?.[uid]?.username}</td>
                        <td className="action-cell">
                          <div className="actions">
                            <AppLink to={getUserEditPath(uid)} currentPath={pathname} className="button button-sm button-icon" aria-label={`Edit ${userMap?.[uid]?.username ?? uid}`}>
                              <Pencil aria-hidden="true" />
                            </AppLink>
                            <button type="button" className="button danger-soft button-sm button-icon" aria-label={`Remove ${userMap?.[uid]?.username ?? uid} as a group admin`} onClick={() => removeUserFromList(uid, 'admin')}>
                              <Trash2 aria-hidden="true" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="group-assignment-section">
              <div className="assignment-section-header">
                <h3>Group Members</h3>
                <p>Users who can access this group.</p>
              </div>
              <div className="input-group assignment-picker">
                <input className="field" type="text" placeholder="Specify Username or Email" aria-label="Specify group member username or email" value={memberSearch} onChange={(e: any) => setMemberSearch(e?.target?.value ?? '')} />
                <button type="button" className="button" onClick={() => addUserToList(memberSearch, 'member')}>
                  <Plus aria-hidden="true" />
                  <span className="button-label">Add</span>
                </button>
              </div>
              <div className="table-wrap compact-table">
                <table>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(members ?? []).map((uid: string) => (
                      <tr key={uid}>
                        <td>{userMap?.[uid]?.id}</td>
                        <td>{userMap?.[uid]?.username}</td>
                        <td className="action-cell">
                          <div className="actions">
                            <AppLink to={getUserEditPath(uid)} currentPath={pathname} className="button button-sm button-icon" aria-label={`Edit ${userMap?.[uid]?.username ?? uid}`}>
                              <Pencil aria-hidden="true" />
                            </AppLink>
                            <button type="button" className="button danger-soft button-sm button-icon" aria-label={`Remove ${userMap?.[uid]?.username ?? uid} as a group member`} onClick={() => removeUserFromList(uid, 'member')}>
                              <Trash2 aria-hidden="true" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </section>
      </form>
      <div className="page-actions">
        <button type="button" className="button primary" onClick={handleSubmit}>
          <Save aria-hidden="true" />
          <span className="button-label">Save</span>
        </button>
        <AppLink to="/groups.html" currentPath={pathname} className="button">
          <X aria-hidden="true" />
          <span className="button-label">Cancel</span>
        </AppLink>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Router                                                             */
/* ------------------------------------------------------------------ */

function Router({ pathname, isDesktop, sidebarCollapsed, setSidebarCollapsed, mobileNavOpen, setMobileNavOpen, users, groups, onSaveUser, onSaveGroup, onResetPassword, notes, onAddNote, onDeleteNote, onEditNote }: {
  pathname: string;
  isDesktop: boolean;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: any;
  mobileNavOpen: boolean;
  setMobileNavOpen: any;
  users: UserRecord[];
  groups: GroupRecord[];
  onSaveUser: (origId: string, next: UserRecord) => void;
  onSaveGroup: (origId: string, next: GroupRecord) => void;
  onResetPassword: (userId: string) => void;
  notes: NotesMap;
  onAddNote: (recordId: string, text: string) => void;
  onDeleteNote: (recordId: string, noteId: string) => void;
  onEditNote: (recordId: string, noteId: string, text: string) => void;
}) {
  const userId = useQueryValue('user');

  useEffect(() => {
    const titles: Record<string, string> = {
      '/index.html': 'Transmitted Components - SuperAdmin StatusUI',
      '/users.html': 'Users - SuperAdmin StatusUI',
      '/groups.html': 'Groups - SuperAdmin StatusUI',
      '/jobs.html': 'Jobs - SuperAdmin StatusUI',
      '/maintenance.html': 'Maintenance - SuperAdmin StatusUI',
      '/account.html': 'My Account - SuperAdmin StatusUI',
      '/user-details.html': 'User Details - SuperAdmin StatusUI',
      '/user-form.html': 'Edit User - SuperAdmin StatusUI',
      '/group-form.html': 'Edit Group - SuperAdmin StatusUI',
      '/submission-details.html': 'Transmission Details - SuperAdmin StatusUI',
    };
    if (typeof document !== 'undefined') {
      document.title = titles?.[pathname] ?? 'StatusUI';
    }
  }, [pathname]);

  const page = (() => {
    switch (pathname) {
      case '/users.html':
        return <UsersPage pathname={pathname} users={users} groups={groups} />;
      case '/groups.html':
        return <GroupsPage pathname={pathname} groups={groups} />;
      case '/jobs.html':
        return <JobsPage pathname={pathname} />;
      case '/maintenance.html':
        return <MaintenancePage />;
      case '/account.html':
        return <AccountPage />;
      case '/user-details.html':
        return <UserDetailsPage pathname={pathname} users={users} groups={groups} userId={userId} />;
      case '/user-form.html':
        return <UserFormPage pathname={pathname} users={users} groups={groups} onSaveUser={onSaveUser} onResetPassword={onResetPassword} />;
      case '/group-form.html':
        return <GroupFormPage pathname={pathname} groups={groups} users={users} onSaveGroup={onSaveGroup} />;
      case '/submission-details.html':
        return <SubmissionDetailsPage pathname={pathname} />;
      case '/index.html':
      default:
        return <ProjectsPage pathname={pathname} notes={notes} onAddNote={onAddNote} onDeleteNote={onDeleteNote} onEditNote={onEditNote} />;
    }
  })();

  return (
    <Shell
      pathname={pathname}
      isDesktop={isDesktop}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
      mobileNavOpen={mobileNavOpen}
      setMobileNavOpen={setMobileNavOpen}
    >
      {page}
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/*  Main App                                                           */
/* ------------------------------------------------------------------ */

export default function StatusApp() {
  const [pathname] = usePathname();
  const [isDesktop, setIsDesktop] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [groups, setGroups] = useState<GroupRecord[]>(INITIAL_GROUPS);
  const [notes, setNotes] = useState<NotesMap>({});

  const handleAddNote = useCallback((recordId: string, text: string) => {
    const note: NoteRecord = {
      id: `n${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text,
      author: CURRENT_USER,
      createdAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
    };
    setNotes((prev) => ({ ...prev, [recordId]: [...(prev[recordId] ?? []), note] }));
  }, []);

  const handleDeleteNote = useCallback((recordId: string, noteId: string) => {
    setNotes((prev) => ({ ...prev, [recordId]: (prev[recordId] ?? []).filter((n) => n.id !== noteId) }));
  }, []);

  const handleEditNote = useCallback((recordId: string, noteId: string, text: string) => {
    setNotes((prev) => ({
      ...prev,
      [recordId]: (prev[recordId] ?? []).map((n) => n.id === noteId ? { ...n, text } : n),
    }));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window?.matchMedia(IS_DESKTOP_QUERY);
    setIsDesktop(media?.matches ?? true);
    const onChange = (event: any) => {
      setIsDesktop(event?.matches ?? true);
      if (!event?.matches) {
        setSidebarCollapsed(false);
      } else {
        setMobileNavOpen(false);
      }
    };
    media?.addEventListener('change', onChange);
    return () => media?.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  const handleSaveUser = useCallback((originalUserId: string, nextUser: UserRecord) => {
    const normalizedUser: UserRecord = {
      ...(nextUser ?? EMPTY_USER),
      username: nextUser?.username || nextUser?.id?.split('@')?.[0] || '',
      adminGroups: [...new Set(nextUser?.adminGroups ?? [])],
      memberGroups: [...new Set((nextUser?.memberGroups ?? []).filter((e: string) => !(nextUser?.adminGroups ?? []).includes(e)))],
    };

    setUsers((currentUsers: UserRecord[]) => {
      const next = (currentUsers ?? []).some((u: UserRecord) => u?.id === originalUserId)
        ? (currentUsers ?? []).map((u: UserRecord) => (u?.id === originalUserId ? normalizedUser : u))
        : [...(currentUsers ?? []), normalizedUser];
      return next;
    });
    setGroups((currentGroups: GroupRecord[]) => (currentGroups ?? []).map((g: GroupRecord) => ({
      ...g,
      admins: (normalizedUser?.adminGroups ?? []).includes(g?.id)
        ? [...new Set([...(g?.admins ?? []).filter((e: string) => e !== originalUserId), normalizedUser?.id])]
        : (g?.admins ?? []).filter((e: string) => e !== originalUserId),
      members: (normalizedUser?.memberGroups ?? []).includes(g?.id)
        ? [...new Set([...(g?.members ?? []).filter((e: string) => e !== originalUserId), normalizedUser?.id])]
        : (g?.members ?? []).filter((e: string) => e !== originalUserId),
    })));
  }, []);

  const handleSaveGroup = useCallback((originalGroupId: string, nextGroup: GroupRecord) => {
    const normalizedGroup: GroupRecord = {
      ...(nextGroup ?? EMPTY_GROUP),
      status: nextGroup?.status || 'Active',
      admins: [...new Set(nextGroup?.admins ?? [])],
      members: [...new Set((nextGroup?.members ?? []).filter((e: string) => !(nextGroup?.admins ?? []).includes(e)))],
    };

    setGroups((currentGroups: GroupRecord[]) => {
      const next = (currentGroups ?? []).some((g: GroupRecord) => g?.id === originalGroupId)
        ? (currentGroups ?? []).map((g: GroupRecord) => (g?.id === originalGroupId ? normalizedGroup : g))
        : [...(currentGroups ?? []), normalizedGroup];
      return next;
    });
    setUsers((currentUsers: UserRecord[]) => (currentUsers ?? []).map((u: UserRecord) => ({
      ...u,
      adminGroups: (normalizedGroup?.admins ?? []).includes(u?.id)
        ? [...new Set([...(u?.adminGroups ?? []).filter((e: string) => e !== originalGroupId), normalizedGroup?.id])]
        : (u?.adminGroups ?? []).filter((e: string) => e !== originalGroupId),
      memberGroups: (normalizedGroup?.members ?? []).includes(u?.id)
        ? [...new Set([...(u?.memberGroups ?? []).filter((e: string) => e !== originalGroupId), normalizedGroup?.id])]
        : (u?.memberGroups ?? []).filter((e: string) => e !== originalGroupId),
    })));
  }, []);

  const handleResetPassword = useCallback((uid: string) => {
    const d = new Date(Date.now() + (14 * 24 * 60 * 60 * 1000));
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const nextExpiration = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}, ${hours}:${minutes}:${seconds} ${ampm}`;
    setUsers((currentUsers: UserRecord[]) => (currentUsers ?? []).map((u: UserRecord) => (
      u?.id === uid ? { ...u, passwordExpiration: nextExpiration } : u
    )));
  }, []);

  return (
    <Router
      pathname={pathname}
      isDesktop={isDesktop}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
      mobileNavOpen={mobileNavOpen}
      setMobileNavOpen={setMobileNavOpen}
      users={users}
      groups={groups}
      onSaveUser={handleSaveUser}
      onSaveGroup={handleSaveGroup}
      onResetPassword={handleResetPassword}
      notes={notes}
      onAddNote={handleAddNote}
      onDeleteNote={handleDeleteNote}
      onEditNote={handleEditNote}
    />
  );
}
