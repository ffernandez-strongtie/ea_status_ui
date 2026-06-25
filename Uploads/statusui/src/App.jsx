import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  FileText,
  KeyRound,
  List,
  LogOut,
  Menu,
  Network,
  PanelLeft,
  Pencil,
  Plus,
  Save,
  Search,
  SlidersHorizontal,
  Trash2,
  TriangleAlert,
  UserCog,
  UserRound,
  Users,
  X,
} from "lucide-react";
import logo from "../assets/img/sst-logo-noborder-color.svg";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { NavigationMenu, NavigationMenuList } from "./components/ui/navigation-menu";
import { Separator } from "./components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "./components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";

const CURRENT_USER = "Frank Fernandez";
const IS_DESKTOP_QUERY = "(min-width: 992px)";
const BASE_PATH = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

const NAV_ITEMS = [
  { href: "/index.html", label: "Transmissions", icon: FileText },
  { href: "/users.html", label: "Users", icon: Users },
  { href: "/groups.html", label: "Groups", icon: Network },
  { href: "/maintenance.html", label: "Maintenance", icon: SlidersHorizontal },
  { href: "/jobs.html", label: "Jobs", icon: BriefcaseBusiness },
];

const PROJECTS = [
  {
    id: "p100",
    name: "P-100 - test",
    count: "3 transmissions",
    badge: "Ready",
    badgeTone: "success",
    summary: "3 transmissions for P-100 - test",
    latest: "Latest: Ready for Pickup",
    latestTone: "success",
    rows: [
      ["211105", "Simpson Strong-Tie Company Inc.", "SI AL", "5/6/2026 6:00 AM", "3", "0", "si nguyen", "Ready for Pickup", "success"],
      ["211106", "Simpson Strong-Tie Company Inc.", "SI AL", "5/6/2026 6:00 AM", "1", "0", "si nguyen", "1st Review", "warning"],
      ["211107", "Your Company", "SI", "5/6/2026 6:00 AM", "0", "0", "system", "Component Mfg", "info"],
      ["211108", "Your Company", "AL", "5/6/2026 6:00 AM", "0", "1", "system", "Component Mfg", "info"],
      ["211109", "Simpson Strong-Tie Company Inc.", "SI", "5/6/2026 6:00 AM", "2", "0", "si nguyen", "Ready for Pickup", "success"],
    ],
  },
  {
    id: "p200",
    name: "P-200 - ridge",
    count: "2 transmissions",
    badge: "Review",
    badgeTone: "warning",
    summary: "2 transmissions for P-200 - ridge",
    latest: "Latest: 1st Review",
    latestTone: "warning",
    rows: [
      ["223401", "North Ridge Truss", "SI", "5/6/2026 8:15 AM", "5", "1", "m garcia", "1st Review", "warning"],
      ["223402", "North Ridge Truss", "AL", "5/6/2026 8:20 AM", "2", "0", "system", "Component Mfg", "info"],
    ],
  },
];

const INITIAL_USERS = [
  { id: "admin@example.com", name: "SuperAdmin Simpson Web SuperAdmin", username: "admin", role: "Internal Admin", status: "Active", passwordExpiration: "5/8/2026 1:21:51 PM", adminGroups: ["00003", "00193"], memberGroups: ["10240"] },
  { id: "super.user@example.com", name: "SuperAdmin Sample User", username: "super.user", role: "Internal Admin", status: "Active", passwordExpiration: "5/12/2026 9:20:00 AM", adminGroups: ["00193"], memberGroups: ["00003"] },
  { id: "reviewer@example.com", name: "Project Reviewer", username: "reviewer", role: "Reviewer", status: "Inactive", passwordExpiration: "6/2/2026 8:00:00 AM", adminGroups: [], memberGroups: ["00003", "10240"] },
  { id: "new.user@example.com", name: "New Status User", username: "new.user", role: "Member", status: "Active", passwordExpiration: "6/15/2026 10:45:00 AM", adminGroups: [], memberGroups: ["00003", "00193"] },
  { id: "singuyen@strongtie.com", name: "si nguyen", username: "singuyen", role: "Admin", status: "Active", passwordExpiration: "6/18/2026 11:00:00 AM", adminGroups: ["00003"], memberGroups: [] },
  { id: "thaivh.it94@gmail.com", name: "thvo", username: "thvo", role: "Admin", status: "Active", passwordExpiration: "6/22/2026 2:30:00 PM", adminGroups: ["00003"], memberGroups: [] },
];

const INITIAL_GROUPS = [
  { id: "00003", name: "Route 66 Truss Company", status: "Active", admins: ["admin@example.com", "singuyen@strongtie.com", "thaivh.it94@gmail.com"], members: ["reviewer@example.com", "super.user@example.com", "new.user@example.com"] },
  { id: "00193", name: "Some customer", status: "Active", admins: ["admin@example.com", "super.user@example.com"], members: ["new.user@example.com"] },
  { id: "10240", name: "Component manufacturing users", status: "Inactive", admins: [], members: ["admin@example.com", "reviewer@example.com"] },
];

const EMPTY_USER = { id: "", name: "", username: "", role: "Member", status: "Active", passwordExpiration: "Not set", adminGroups: [], memberGroups: [] };
const EMPTY_GROUP = { id: "", name: "", status: "Active", admins: [], members: [] };

const JOBS = [
  { id: "4012", name: "Nightly transmission sync", type: "Import", status: "Running" },
  { id: "4013", name: "Project index rebuild", type: "Maintenance", status: "Queued" },
  { id: "4014", name: "Customer export", type: "Export", status: "Complete" },
];

const DETAIL_ITEMS = [
  ["Account type", "Internal Admin"],
  ["Email", "frank.fernandez@example.com"],
  ["Group", "Route 66 Truss Company"],
  ["Last login", "5/6/2026 9:02 AM"],
];

function getUserEditPath(userId) {
  return `/user-form.html?user=${encodeURIComponent(userId)}`;
}

function getGroupEditPath(groupId) {
  return `/group-form.html?group=${encodeURIComponent(groupId)}`;
}

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function getStatusTone(status) {
  return {
    Active: "success",
    Inactive: "danger",
    Running: "info",
    Queued: "warning",
    Complete: "success",
    "Ready for Pickup": "success",
    "1st Review": "warning",
    "Component Mfg": "info",
  }[status] || "info";
}

function buildUserListRows(users, groups) {
  return users.map((user) => {
    const userGroups = groups.filter((group) => [...group.admins, ...group.members].includes(user.id));
    return {
      id: user.id,
      name: user.name,
      role: user.role,
      groups: userGroups.map((group) => group.name).join(", ") || "—",
      status: <StatusBadge tone={getStatusTone(user.status)}>{user.status}</StatusBadge>,
      editTo: getUserEditPath(user.id),
      detailsTo: `/user-details.html?user=${encodeURIComponent(user.id)}`,
    };
  });
}

function buildGroupListRows(groups) {
  return groups.map((group) => ({
    id: group.id,
    name: group.name,
    users: String(group.admins.length + group.members.length),
    status: <StatusBadge tone={getStatusTone(group.status)}>{group.status}</StatusBadge>,
    editTo: getGroupEditPath(group.id),
  }));
}

function getGroupNameMap(groups) {
  return Object.fromEntries(groups.map((group) => [group.id, group.name]));
}

function getUserMap(users) {
  return Object.fromEntries(users.map((user) => [user.id, user]));
}

function usePathname() {
  const read = () => normalizePath(window.location.pathname);
  const [pathname, setPathname] = useState(read);

  useEffect(() => {
    const onPopState = () => setPathname(read());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return [pathname, setPathname];
}

function useQueryValue(name) {
  const read = () => getQueryParam(name) || "";
  const [value, setValue] = useState(read);

  useEffect(() => {
    const onPopState = () => setValue(read());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [name]);

  return value;
}

function normalizePath(pathname) {
  const { pathname: nextPathname } = new URL(pathname || "/", window.location.origin);
  let appPathname = nextPathname;
  if (BASE_PATH && appPathname === BASE_PATH) appPathname = "/";
  if (BASE_PATH && appPathname.startsWith(`${BASE_PATH}/`)) {
    appPathname = appPathname.slice(BASE_PATH.length);
  }
  if (!appPathname || appPathname === "/") return "/index.html";
  if (appPathname.endsWith("/")) return `${appPathname.slice(0, -1)}.html`;
  if (!appPathname.endsWith(".html")) return `${appPathname}.html`;
  return appPathname;
}

function withBasePath(to) {
  const nextUrl = new URL(to, window.location.origin);
  const pathname = normalizePath(nextUrl.pathname);
  const base = BASE_PATH || "";
  return `${base}${pathname}${nextUrl.search}${nextUrl.hash}`;
}

function navigate(to) {
  const nextUrl = new URL(withBasePath(to), window.location.origin);
  if (window.location.pathname === nextUrl.pathname && window.location.search === nextUrl.search) return;
  window.history.pushState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

function AppLink({ to, currentPath, className = "", children }) {
  return (
    <a
      href={withBasePath(to)}
      className={className}
      aria-current={normalizePath(to) === currentPath ? "page" : undefined}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

function Shell({ pathname, children, isDesktop, sidebarCollapsed, setSidebarCollapsed, mobileNavOpen, setMobileNavOpen }) {
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event) => {
      if (!event.target.closest(".dropdown")) setAccountOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const toggleSidebar = () => {
    if (isDesktop) {
      setSidebarCollapsed((value) => !value);
      return;
    }
    setMobileNavOpen((value) => !value);
  };

  return (
    <div className={`shell${isDesktop && sidebarCollapsed ? " sidebar-collapsed" : ""}`}>
      <header className="topbar">
        <div className="nav-container">
          <div className="brand-row">
            <AppLink to="/index.html" className="brand" currentPath={pathname}>
              <img className="brand-logo" src={logo} alt="Simpson Strong-Tie" />
              <div>
                <p className="brand-title">Engineering Status Service</p>
              </div>
            </AppLink>
            <Button type="button" className="nav-toggle" onClick={toggleSidebar} aria-controls="superAdminNavbar" aria-expanded={isDesktop ? String(!sidebarCollapsed) : String(mobileNavOpen)} aria-label="Toggle navigation">
              {isDesktop ? <PanelLeft className="nav-toggle-icon" aria-hidden="true" /> : <Menu className="nav-toggle-icon" aria-hidden="true" />}
            </Button>
          </div>
          <div className={`nav-panel${mobileNavOpen ? " is-open" : ""}`} id="superAdminNavbar">
            <NavigationMenu className="main-nav" aria-label="SuperAdmin navigation">
              <NavigationMenuList className="main-nav-list">
                {NAV_ITEMS.map((item) => (
                  <AppLink key={item.href} to={item.href} currentPath={pathname} className="nav-link">
                    <span className="nav-link-icon-wrap">
                      <item.icon className="nav-icon" aria-hidden="true" />
                    </span>
                    <span className="nav-link-label">{item.label}</span>
                  </AppLink>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="account-block">
              <div className="dropdown">
                <Button type="button" className="account-menu-button dropdown-toggle" onClick={() => setAccountOpen((value) => !value)} aria-expanded={String(accountOpen)} aria-label={`Account menu for ${CURRENT_USER}`}>
                  <UserCog className="account-type-icon" aria-hidden="true" />
                  <span className="account-display-name">{CURRENT_USER}</span>
                  <ChevronDown className="dropdown-chevron" aria-hidden="true" />
                </Button>
                {accountOpen ? (
                  <div className="account-menu-list is-open">
                    <div className="account-type-label">
                      <UserCog aria-hidden="true" />
                      <span>Internal Admin</span>
                    </div>
                    <Separator />
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

function PageHeader({ title, subtitle, actions }) {
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

function StatusBadge({ tone, children }) {
  return <Badge tone={tone}>{children}</Badge>;
}

function FilterSheet({ open, onOpenChange }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sheet" aria-labelledby="submissionFiltersLabel">
        <SheetHeader>
          <SheetTitle id="submissionFiltersLabel">Transmission Filters</SheetTitle>
          <SheetDescription>Filter transmissions by date, status, customer, and component details.</SheetDescription>
        </SheetHeader>
        <div className="sheet-body">
          <div className="filter-form">
            <div className="form-row">
              <Label htmlFor="filter-start">Start</Label>
              <Input id="filter-start" type="text" value="4/29/2026 9:15:34 AM" readOnly />
            </div>
            <div className="form-row">
              <Label htmlFor="filter-end">End</Label>
              <Input id="filter-end" type="text" />
            </div>
            <div className="form-row">
              <Label htmlFor="filter-sender">Sender</Label>
              <Input id="filter-sender" type="text" />
            </div>
            <div className="form-row">
              <Label htmlFor="filter-seal">Seal</Label>
              <select className="select" id="filter-seal" defaultValue="Searching All">
                <option>Searching All</option>
                <option>SI</option>
                <option>AL</option>
              </select>
            </div>
            <div className="form-row">
              <Label htmlFor="filter-transaction">Transaction ID</Label>
              <Input id="filter-transaction" type="text" />
            </div>
            <div className="form-row">
              <Label htmlFor="filter-customer">Customer</Label>
              <Input id="filter-customer" type="text" />
            </div>
            <div className="form-row">
              <Label htmlFor="filter-status">Status</Label>
              <select className="select" id="filter-status" defaultValue="Searching All">
                <option>Searching All</option>
                <option>Component Mfg</option>
                <option>Ready for Pickup</option>
                <option>1st Review</option>
              </select>
            </div>
            <div className="form-row">
              <Label htmlFor="filter-components"># Components</Label>
              <Input id="filter-components" type="text" />
            </div>
            <div className="form-row">
              <Label htmlFor="filter-type">Type</Label>
              <select className="select" id="filter-type" defaultValue="Searching All">
                <option>Searching All</option>
                <option>Component Mfg</option>
                <option>Review</option>
              </select>
            </div>
            <div className="form-row">
              <Label htmlFor="filter-sequence">Sequence Number</Label>
              <Input id="filter-sequence" type="text" />
            </div>
            <div className="form-row checkbox-row">
              <input id="filter-modified" type="checkbox" />
              <Label htmlFor="filter-modified">Modified Components</Label>
            </div>
            <div className="form-row">
              <Label htmlFor="filter-component-mfg">Component Mfg</Label>
              <select className="select" id="filter-component-mfg" defaultValue="Searching All">
                <option>Searching All</option>
                <option>Component Mfg</option>
                <option>Not Component Mfg</option>
              </select>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" variant="outline">
              <X aria-hidden="true" />
              <span className="button-label">Clear</span>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="button" variant="primary">
              <Check aria-hidden="true" />
              <span className="button-label">Apply Filters</span>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function ProjectsPage({ pathname }) {
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS[0].id);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeProject = PROJECTS.find((project) => project.id === activeProjectId) || PROJECTS[0];

  return (
    <>
      <PageHeader
        title="Projects & Transmissions"
        subtitle={
          <>
            Simpson Engineering: <strong>04/29/2026 9:15 AM to 05/06/2026 9:15 AM</strong>
          </>
        }
      />

      <div className="toolbar search-toolbar">
        <div className="input-group search-input-group">
          <Label htmlFor="project-search" className="sr-only">
            Project name filter
          </Label>
          <Input id="project-search" type="search" placeholder="Enter Project name or filter" aria-label="Project name filter" />
          <Button type="button" variant="primary">
            <Search aria-hidden="true" />
            <span className="button-label">Search</span>
          </Button>
          <Button type="button" variant="outline">
            <X aria-hidden="true" />
            <span className="button-label">Clear</span>
          </Button>
        </div>
        <Button type="button" variant="outline" onClick={() => setFiltersOpen(true)}>
          <SlidersHorizontal aria-hidden="true" />
          <span className="button-label">Filters</span>
        </Button>
      </div>

      <FilterSheet open={filtersOpen} onOpenChange={setFiltersOpen} />

      <div className="project-browser">
        <Card className="project-list-panel">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>{PROJECTS.length} projects</CardDescription>
          </CardHeader>
          <CardContent>
            {PROJECTS.map((project) => (
              <Button
                key={project.id}
                type="button"
                className={`project-list-item${project.id === activeProjectId ? " active" : ""}`}
                variant="outline"
                onClick={() => setActiveProjectId(project.id)}
                aria-pressed={project.id === activeProjectId}
              >
                <span>
                  <strong>{project.name}</strong>
                  <small>{project.count}</small>
                </span>
                <StatusBadge tone={project.badgeTone}>{project.badge}</StatusBadge>
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="project-submission-panel" aria-labelledby="selected-project-title">
          <CardHeader>
            <div className="project-submission-header">
              <div>
                <CardTitle id="selected-project-title">Transmissions</CardTitle>
                <CardDescription>{activeProject.summary}</CardDescription>
              </div>
              <StatusBadge tone={activeProject.latestTone}>{activeProject.latest}</StatusBadge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="table-wrap">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Seals</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead># Sent</TableHead>
                    <TableHead>Modified</TableHead>
                    <TableHead>Sent By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeProject.rows.map((row) => (
                    <TableRow key={row[0]}>
                      <TableCell>{row[0]}</TableCell>
                      <TableCell>{row[1]}</TableCell>
                      <TableCell>{row[2]}</TableCell>
                      <TableCell>{row[3]}</TableCell>
                      <TableCell>{row[4]}</TableCell>
                      <TableCell>{row[5]}</TableCell>
                      <TableCell>{row[6]}</TableCell>
                      <TableCell>
                        <StatusBadge tone={row[8]}>{row[7]}</StatusBadge>
                      </TableCell>
                      <TableCell className="action-cell">
                        <div className="actions">
                          <AppLink to="/submission-details.html" currentPath={pathname} className="button button-sm button-icon" aria-label={`View details for transmission ${row[0]}`}>
                            <List aria-hidden="true" />
                          </AppLink>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function ListPage({ pathname, title, subtitle, primaryAction, columns, rows, searchLabel = "Search", createLabel = "Create New" }) {
  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={
          primaryAction ? (
            <AppLink to={primaryAction.to} currentPath={pathname} className="button primary">
              <Plus aria-hidden="true" />
              <span className="button-label">{createLabel}</span>
            </AppLink>
          ) : null
        }
      />
      <div className="toolbar search-toolbar">
        <div className="input-group search-input-group">
          <Label htmlFor={`${title.toLowerCase()}-search`} className="sr-only">
            {title} filter
          </Label>
          <Input id={`${title.toLowerCase()}-search`} type="search" placeholder={`Enter ${title.replace(/s$/, "")} name or filter`} aria-label={`${title} filter`} />
          <Button type="button" variant="primary">
            <Search aria-hidden="true" />
            <span className="button-label">{searchLabel}</span>
          </Button>
          <Button type="button" variant="outline">
            <X aria-hidden="true" />
            <span className="button-label">Clear</span>
          </Button>
        </div>
        <Button type="button" variant="outline">
          <SlidersHorizontal aria-hidden="true" />
          <span className="button-label">Filters</span>
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className="table-wrap">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column}>{column}</TableHead>
                  ))}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    {columns.map((column) => (
                      <TableCell key={column}>{row[column]}</TableCell>
                    ))}
                    <TableCell className="action-cell">
                      <div className="actions">
                        <AppLink to={row.editTo || "#"} currentPath={pathname} className="button button-sm button-icon" aria-label={`Edit ${row.name || row.id}`}>
                          <Pencil aria-hidden="true" />
                        </AppLink>
                        {row.detailsTo ? (
                          <AppLink to={row.detailsTo} currentPath={pathname} className="button button-sm button-icon" aria-label={`View details for ${row.name || row.id}`}>
                            <List aria-hidden="true" />
                          </AppLink>
                        ) : null}
                        <Button type="button" variant="destructive" className="button-sm button-icon" aria-label={`Delete ${row.name || row.id}`}>
                          <Trash2 aria-hidden="true" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function UsersPage({ pathname, users, groups }) {
  return (
    <ListPage
      pathname={pathname}
      title="Users"
      subtitle={
        <>
          Internal users for <strong>Simpson Engineering</strong>
        </>
      }
      primaryAction={{ to: "/user-form.html" }}
      columns={["id", "name", "role", "groups", "status"]}
      rows={buildUserListRows(users, groups)}
    />
  );
}

function GroupsPage({ pathname, groups }) {
  return (
    <ListPage
      pathname={pathname}
      title="Groups"
      subtitle={<>Permission groups available to the account set</>}
      primaryAction={{ to: "/group-form.html" }}
      columns={["id", "name", "users", "status"]}
      rows={buildGroupListRows(groups)}
    />
  );
}

function JobsPage({ pathname }) {
  return (
    <ListPage
      pathname={pathname}
      title="Jobs"
      subtitle={<>Queued and completed background jobs</>}
      primaryAction={null}
      columns={["id", "name", "type", "status"]}
      rows={JOBS.map((job) => ({ ...job, status: <StatusBadge tone={getStatusTone(job.status)}>{job.status}</StatusBadge>, editTo: "#", detailsTo: "#" }))}
    />
  );
}

function MaintenancePage() {
  return (
    <>
      <PageHeader title="Maintenance" subtitle={<>System settings and service endpoints</>} />
      <div className="maintenance-layout">
        <Card>
          <CardHeader>
            <CardTitle>Environment</CardTitle>
            <CardDescription>Current deployment and service endpoints.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="detail-list">
              <div className="detail-row">
                <span>Environment</span>
                <strong>C1-DEV</strong>
              </div>
              <div className="detail-row">
                <span>API host</span>
                <strong>https://status-api.example.test</strong>
              </div>
              <div className="detail-row">
                <span>Release</span>
                <strong>v0.26.7.1</strong>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="maintenance-actions">
          <Button type="button" variant="primary">
            <Save aria-hidden="true" />
            <span className="button-label">Save Settings</span>
          </Button>
          <Button type="button" variant="outline">
            <TriangleAlert aria-hidden="true" />
            <span className="button-label">Rebuild Index</span>
          </Button>
        </div>
      </div>
    </>
  );
}

function AccountPage({ pathname }) {
  return (
    <>
      <PageHeader title="My Account" subtitle={<>Internal admin profile settings</>} />
      <div className="form-grid">
        <Card>
          <CardContent>
            <div className="form-row">
              <Label htmlFor="display-name">Display Name</Label>
              <Input id="display-name" value={CURRENT_USER} readOnly />
            </div>
            <div className="form-row">
              <Label htmlFor="account-email">Email</Label>
              <Input id="account-email" value="frank.fernandez@example.com" readOnly />
            </div>
            <div className="page-actions">
              <Button type="button" variant="outline">
                <KeyRound aria-hidden="true" />
                <span className="button-label">Change password</span>
              </Button>
              <Button type="button" variant="primary">
                <Save aria-hidden="true" />
                <span className="button-label">Save</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="detail-list">
              {DETAIL_ITEMS.map(([label, value]) => (
                <div className="detail-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function DetailPage({ pathname, title, subtitle, buttonLabel, actionTo, backTo, details, listItems }) {
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
      <div className="submission-detail-layout">
        <Card className="submission-detail-card">
          <CardContent>
            <div className="detail-list">
              {details.map(([label, value]) => (
                <div className="detail-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="table-wrap">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Label</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listItems.map(([label, value]) => (
                    <TableRow key={label}>
                      <TableCell>{label}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function UserDetailsPage({ pathname, users, groups, userId }) {
  const user = users.find((entry) => entry.id === userId) || users[1] || users[0];
  const groupNameMap = getGroupNameMap(groups);
  const adminGroups = user.adminGroups.map((groupId) => groupNameMap[groupId]).filter(Boolean);
  const memberGroups = user.memberGroups.map((groupId) => groupNameMap[groupId]).filter(Boolean);
  return (
    <DetailPage
      pathname={pathname}
      title="User Details"
      subtitle={<>A read-only snapshot of the selected user</>}
      buttonLabel="Edit"
      actionTo={getUserEditPath(user.id)}
      backTo="/users.html"
      details={[
        ["User name", user.name],
        ["Email", user.id],
        ["Role", user.role],
        ["Admin groups", adminGroups.join(", ") || "—"],
      ]}
      listItems={[
        ["Member groups", memberGroups.join(", ") || "—"],
        ["Status", <StatusBadge tone={getStatusTone(user.status)}>{user.status}</StatusBadge>],
        ["Password expiration", user.passwordExpiration],
      ]}
    />
  );
}

function SubmissionDetailsPage({ pathname }) {
  return (
    <DetailPage
      pathname={pathname}
      title="Transmission Details"
      subtitle={<>Transaction 211105 from P-100 - test</>}
      buttonLabel="Edit"
      actionTo="#"
      backTo="/index.html"
      details={[
        ["Transaction ID", "211105"],
        ["Customer", "Simpson Strong-Tie Company Inc."],
        ["Seals", "SI AL"],
        ["Status", <StatusBadge tone={getStatusTone("Ready for Pickup")}>Ready for Pickup</StatusBadge>],
      ]}
      listItems={[
        ["Received", "5/6/2026 6:00 AM"],
        ["Sent by", "si nguyen"],
        ["Components", "3"],
      ]}
    />
  );
}

function UserFormPage({ pathname, users, groups, onSaveUser, onResetPassword }) {
  const userId = useQueryValue("user");
  const user = users.find((entry) => entry.id === userId) || (userId ? users[0] : EMPTY_USER);
  const isExistingUser = Boolean(userId && users.some((entry) => entry.id === userId));
  const groupNameMap = getGroupNameMap(groups);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.id);
  const [role, setRole] = useState(user.role);
  const [adminGroups, setAdminGroups] = useState(user.adminGroups);
  const [memberGroups, setMemberGroups] = useState(user.memberGroups);
  const [selectedAdminGroup, setSelectedAdminGroup] = useState("");
  const [selectedMemberGroup, setSelectedMemberGroup] = useState("");

  useEffect(() => {
    setName(user.name);
    setEmail(user.id);
    setRole(user.role);
    setAdminGroups(user.adminGroups);
    setMemberGroups(user.memberGroups);
    setSelectedAdminGroup("");
    setSelectedMemberGroup("");
  }, [user]);

  const addGroup = (groupId, kind) => {
    if (!groupId) return;
    if (kind === "admin") {
      setAdminGroups((current) => (current.includes(groupId) ? current : [...current, groupId]));
      setMemberGroups((current) => current.filter((entry) => entry !== groupId));
      setSelectedAdminGroup("");
      return;
    }
    setMemberGroups((current) => (current.includes(groupId) ? current : [...current, groupId]));
    setAdminGroups((current) => current.filter((entry) => entry !== groupId));
    setSelectedMemberGroup("");
  };

  const removeGroup = (groupId, kind) => {
    if (kind === "admin") {
      setAdminGroups((current) => current.filter((entry) => entry !== groupId));
      return;
    }
    setMemberGroups((current) => current.filter((entry) => entry !== groupId));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSaveUser(user.id, {
      ...user,
      id: email,
      name,
      username: email.split("@")[0] || user.username,
      role,
      adminGroups,
      memberGroups,
    });
    navigate("/users.html");
  };

  return (
    <>
      <PageHeader
        title={isExistingUser ? "Edit User" : "Create User"}
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
          <Card className="user-form-card">
            <CardHeader className="detail-card-header">
              <CardTitle>User</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="form-grid">
                <div className="form-row">
                  <Label htmlFor="user-name">Username</Label>
                  <Input id="user-name" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="form-row">
                  <Label htmlFor="user-email">Email</Label>
                  <Input id="user-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="form-row">
                  <Label htmlFor="user-role">Role</Label>
                  <select className="select" id="user-role" value={role} onChange={(event) => setRole(event.target.value)}>
                    <option>Member</option>
                    <option>Admin</option>
                    <option>Internal Admin</option>
                    <option>Reviewer</option>
                    <option>Component Mfg</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="advanced-card">
            <CardHeader className="detail-card-header">
              <CardTitle>Advanced</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="form-grid">
                <div className="form-row full">
                  <Label htmlFor="password-expiration">Password Expiration</Label>
                  <Input id="password-expiration" value={user.passwordExpiration} readOnly />
                </div>
              </div>
              <div className="toolbar form-actions">
                <Button type="button" variant="outline" onClick={() => onResetPassword(user.id)} disabled={!isExistingUser}>
                  <KeyRound aria-hidden="true" />
                  <span className="button-label">Reset Password</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="assigned-groups-card">
          <CardHeader className="detail-card-header">
            <CardTitle>Assigned Groups</CardTitle>
          </CardHeader>
          <CardContent>
            <section className="group-assignment-section">
              <div className="assignment-section-header">
                <h3>Admin of Groups</h3>
                <p>Groups this user can administer.</p>
              </div>
              <div className="input-group assignment-picker">
                <select className="select" aria-label="Select admin group" value={selectedAdminGroup} onChange={(event) => setSelectedAdminGroup(event.target.value)}>
                  <option value="">Select a group</option>
                  {groups.filter((group) => !adminGroups.includes(group.id)).map((group) => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
                <Button type="button" onClick={() => addGroup(selectedAdminGroup, "admin") }>
                  <Plus aria-hidden="true" />
                  <span className="button-label">Add</span>
                </Button>
              </div>
              <div className="selected-groups" aria-label="Selected admin groups">
                {adminGroups.map((groupId) => (
                  <span key={groupId} className="selected-group-pill admin-group-pill">
                    {groupNameMap[groupId]}
                    <button type="button" aria-label={`Remove ${groupNameMap[groupId]}`} onClick={() => removeGroup(groupId, "admin")}>
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
                <select className="select" aria-label="Select member group" value={selectedMemberGroup} onChange={(event) => setSelectedMemberGroup(event.target.value)}>
                  <option value="">Select a group</option>
                  {groups.filter((group) => !memberGroups.includes(group.id)).map((group) => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
                <Button type="button" onClick={() => addGroup(selectedMemberGroup, "member") }>
                  <Plus aria-hidden="true" />
                  <span className="button-label">Add</span>
                </Button>
              </div>
              <div className="selected-groups" aria-label="Selected member groups">
                {memberGroups.map((groupId) => (
                  <span key={groupId} className="selected-group-pill member-group-pill">
                    {groupNameMap[groupId]}
                    <button type="button" aria-label={`Remove ${groupNameMap[groupId]}`} onClick={() => removeGroup(groupId, "member")}>
                      <X aria-hidden="true" />
                    </button>
                  </span>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>
      </form>
      <div className="page-actions">
        <Button type="button" variant="primary" onClick={handleSubmit}>
          <Save aria-hidden="true" />
          <span className="button-label">Save</span>
        </Button>
        <AppLink to="/users.html" currentPath={pathname} className="button">
          <X aria-hidden="true" />
          <span className="button-label">Cancel</span>
        </AppLink>
      </div>
    </>
  );
}

function GroupFormPage({ pathname, groups, users, onSaveGroup }) {
  const groupId = useQueryValue("group");
  const group = groups.find((entry) => entry.id === groupId) || (groupId ? groups[0] : EMPTY_GROUP);
  const isExistingGroup = Boolean(groupId && groups.some((entry) => entry.id === groupId));
  const userMap = getUserMap(users);
  const [groupCode, setGroupCode] = useState(group.id);
  const [description, setDescription] = useState(group.name);
  const [adminSearch, setAdminSearch] = useState("");
  const [memberSearch, setMemberSearch] = useState("");
  const [admins, setAdmins] = useState(group.admins);
  const [members, setMembers] = useState(group.members);

  useEffect(() => {
    setGroupCode(group.id);
    setDescription(group.name);
    setAdmins(group.admins);
    setMembers(group.members);
    setAdminSearch("");
    setMemberSearch("");
  }, [group]);

  const addUserToList = (query, kind) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return;
    const match = users.find((entry) => entry.id.toLowerCase() === normalized || entry.name.toLowerCase() === normalized || entry.username.toLowerCase() === normalized);
    if (!match) return;
    if (kind === "admin") {
      setAdmins((current) => (current.includes(match.id) ? current : [...current, match.id]));
      setMembers((current) => current.filter((entry) => entry !== match.id));
      setAdminSearch("");
      return;
    }
    setMembers((current) => (current.includes(match.id) ? current : [...current, match.id]));
    setAdmins((current) => current.filter((entry) => entry !== match.id));
    setMemberSearch("");
  };

  const removeUserFromList = (userId, kind) => {
    if (kind === "admin") {
      setAdmins((current) => current.filter((entry) => entry !== userId));
      return;
    }
    setMembers((current) => current.filter((entry) => entry !== userId));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSaveGroup(group.id, {
      ...group,
      id: groupCode,
      name: description,
      admins,
      members,
    });
    navigate("/groups.html");
  };

  return (
    <>
      <PageHeader
        title={isExistingGroup ? "Edit Group" : "Create Group"}
        subtitle={<>Manage group identity and assigned users.</>}
        actions={
          <AppLink to="/groups.html" currentPath={pathname} className="button">
            <ArrowLeft aria-hidden="true" />
            <span className="button-label">Back to List</span>
          </AppLink>
        }
      />
      <form className="group-edit-layout" onSubmit={handleSubmit}>
        <Card className="group-form-card">
          <CardHeader className="detail-card-header">
            <CardTitle>Group</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="warning-alert">
              <TriangleAlert aria-hidden="true" />
              <span>Changing the group name will log out all group members.</span>
            </div>
            <div className="form-grid">
              <div className="form-row">
                <Label htmlFor="group-name">Name</Label>
                <Input id="group-name" value={groupCode} onChange={(event) => setGroupCode(event.target.value)} />
              </div>
              <div className="form-row">
                <Label htmlFor="group-description">Description</Label>
                <Input id="group-description" value={description} onChange={(event) => setDescription(event.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="assigned-users-card">
          <CardHeader className="detail-card-header">
            <CardTitle>Assigned Users</CardTitle>
          </CardHeader>
          <CardContent>
            <section className="group-assignment-section">
              <div className="assignment-section-header">
                <h3>Group Admins</h3>
                <p>Users who can administer this group.</p>
              </div>
              <div className="input-group assignment-picker">
                <Input type="text" placeholder="Specify Username or Email" aria-label="Specify group admin username or email" value={adminSearch} onChange={(event) => setAdminSearch(event.target.value)} />
                <Button type="button" onClick={() => addUserToList(adminSearch, "admin")}>
                  <Plus aria-hidden="true" />
                  <span className="button-label">Add</span>
                </Button>
              </div>
              <div className="table-wrap compact-table">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admins.map((userEntryId) => (
                      <TableRow key={userEntryId}>
                        <TableCell>{userMap[userEntryId]?.id}</TableCell>
                        <TableCell>{userMap[userEntryId]?.username}</TableCell>
                        <TableCell className="action-cell">
                          <div className="actions">
                            <AppLink to={getUserEditPath(userEntryId)} currentPath={pathname} className="button button-sm button-icon" aria-label={`Edit ${userMap[userEntryId]?.username || userMap[userEntryId]?.id || userEntryId}`}>
                              <Pencil aria-hidden="true" />
                            </AppLink>
                            <Button type="button" variant="destructive" className="button-sm button-icon" aria-label={`Remove ${userMap[userEntryId]?.username || userMap[userEntryId]?.id || userEntryId} as a group admin`} onClick={() => removeUserFromList(userEntryId, "admin")}>
                              <Trash2 aria-hidden="true" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            <section className="group-assignment-section">
              <div className="assignment-section-header">
                <h3>Group Members</h3>
                <p>Users who can access this group.</p>
              </div>
              <div className="input-group assignment-picker">
                <Input type="text" placeholder="Specify Username or Email" aria-label="Specify group member username or email" value={memberSearch} onChange={(event) => setMemberSearch(event.target.value)} />
                <Button type="button" onClick={() => addUserToList(memberSearch, "member")}>
                  <Plus aria-hidden="true" />
                  <span className="button-label">Add</span>
                </Button>
              </div>
              <div className="table-wrap compact-table">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((userEntryId) => (
                      <TableRow key={userEntryId}>
                        <TableCell>{userMap[userEntryId]?.id}</TableCell>
                        <TableCell>{userMap[userEntryId]?.username}</TableCell>
                        <TableCell className="action-cell">
                          <div className="actions">
                            <AppLink to={getUserEditPath(userEntryId)} currentPath={pathname} className="button button-sm button-icon" aria-label={`Edit ${userMap[userEntryId]?.username || userMap[userEntryId]?.id || userEntryId}`}>
                              <Pencil aria-hidden="true" />
                            </AppLink>
                            <Button type="button" variant="destructive" className="button-sm button-icon" aria-label={`Remove ${userMap[userEntryId]?.username || userMap[userEntryId]?.id || userEntryId} as a group member`} onClick={() => removeUserFromList(userEntryId, "member")}>
                              <Trash2 aria-hidden="true" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>
          </CardContent>
        </Card>
      </form>
      <div className="page-actions">
        <Button type="button" variant="primary" onClick={handleSubmit}>
          <Save aria-hidden="true" />
          <span className="button-label">Save</span>
        </Button>
        <AppLink to="/groups.html" currentPath={pathname} className="button">
          <X aria-hidden="true" />
          <span className="button-label">Cancel</span>
        </AppLink>
      </div>
    </>
  );
}

function Router({ pathname, isDesktop, sidebarCollapsed, setSidebarCollapsed, mobileNavOpen, setMobileNavOpen, users, groups, onSaveUser, onSaveGroup, onResetPassword }) {
  useEffect(() => {
    document.title = {
      "/index.html": "Transmissions - SuperAdmin StatusUI",
      "/users.html": "Users - SuperAdmin StatusUI",
      "/groups.html": "Groups - SuperAdmin StatusUI",
      "/jobs.html": "Jobs - SuperAdmin StatusUI",
      "/maintenance.html": "Maintenance - SuperAdmin StatusUI",
      "/account.html": "My Account - SuperAdmin StatusUI",
      "/user-details.html": "User Details - SuperAdmin StatusUI",
      "/user-form.html": "Edit User - SuperAdmin StatusUI",
      "/group-form.html": "Edit Group - SuperAdmin StatusUI",
      "/submission-details.html": "Transmission Details - SuperAdmin StatusUI",
    }[pathname] || "StatusUI";
  }, [pathname]);

  const userId = useQueryValue("user");

  const page = (() => {
    switch (pathname) {
      case "/users.html":
        return <UsersPage pathname={pathname} users={users} groups={groups} />;
      case "/groups.html":
        return <GroupsPage pathname={pathname} groups={groups} />;
      case "/jobs.html":
        return <JobsPage pathname={pathname} />;
      case "/maintenance.html":
        return <MaintenancePage pathname={pathname} />;
      case "/account.html":
        return <AccountPage pathname={pathname} />;
      case "/user-details.html":
        return <UserDetailsPage pathname={pathname} users={users} groups={groups} userId={userId} />;
      case "/user-form.html":
        return <UserFormPage pathname={pathname} users={users} groups={groups} onSaveUser={onSaveUser} onResetPassword={onResetPassword} />;
      case "/group-form.html":
        return <GroupFormPage pathname={pathname} groups={groups} users={users} onSaveGroup={onSaveGroup} />;
      case "/submission-details.html":
        return <SubmissionDetailsPage pathname={pathname} />;
      case "/index.html":
      default:
        return <ProjectsPage pathname={pathname} />;
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

export default function App() {
  const [pathname] = usePathname();
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(IS_DESKTOP_QUERY).matches);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [groups, setGroups] = useState(INITIAL_GROUPS);

  useEffect(() => {
    const media = window.matchMedia(IS_DESKTOP_QUERY);
    const onChange = (event) => {
      setIsDesktop(event.matches);
      if (!event.matches) {
        setSidebarCollapsed(false);
      } else {
        setMobileNavOpen(false);
      }
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  const handleSaveUser = (originalUserId, nextUser) => {
    const normalizedUser = {
      ...nextUser,
      username: nextUser.username || nextUser.id.split("@")[0] || "",
      adminGroups: [...new Set(nextUser.adminGroups)],
      memberGroups: [...new Set(nextUser.memberGroups.filter((entry) => !nextUser.adminGroups.includes(entry)))],
    };

    setUsers((currentUsers) => {
      const nextUsers = currentUsers.some((user) => user.id === originalUserId)
        ? currentUsers.map((user) => (user.id === originalUserId ? normalizedUser : user))
        : [...currentUsers, normalizedUser];
      return nextUsers;
    });
    setGroups((currentGroups) => currentGroups.map((group) => ({
      ...group,
      admins: normalizedUser.adminGroups.includes(group.id)
        ? [...new Set([...group.admins.filter((entry) => entry !== originalUserId), normalizedUser.id])]
        : group.admins.filter((entry) => entry !== originalUserId),
      members: normalizedUser.memberGroups.includes(group.id)
        ? [...new Set([...group.members.filter((entry) => entry !== originalUserId), normalizedUser.id])]
        : group.members.filter((entry) => entry !== originalUserId),
    })));
  };

  const handleSaveGroup = (originalGroupId, nextGroup) => {
    const normalizedGroup = {
      ...nextGroup,
      status: nextGroup.status || "Active",
      admins: [...new Set(nextGroup.admins)],
      members: [...new Set(nextGroup.members.filter((entry) => !nextGroup.admins.includes(entry)))],
    };

    setGroups((currentGroups) => {
      const nextGroups = currentGroups.some((group) => group.id === originalGroupId)
        ? currentGroups.map((group) => (group.id === originalGroupId ? normalizedGroup : group))
        : [...currentGroups, normalizedGroup];
      return nextGroups;
    });
    setUsers((currentUsers) => currentUsers.map((user) => ({
      ...user,
      adminGroups: normalizedGroup.admins.includes(user.id)
        ? [...new Set([...user.adminGroups.filter((entry) => entry !== originalGroupId), normalizedGroup.id])]
        : user.adminGroups.filter((entry) => entry !== originalGroupId),
      memberGroups: normalizedGroup.members.includes(user.id)
        ? [...new Set([...user.memberGroups.filter((entry) => entry !== originalGroupId), normalizedGroup.id])]
        : user.memberGroups.filter((entry) => entry !== originalGroupId),
    })));
  };

  const handleResetPassword = (userId) => {
    const nextExpiration = new Date(Date.now() + (14 * 24 * 60 * 60 * 1000)).toLocaleString();
    setUsers((currentUsers) => currentUsers.map((user) => (
      user.id === userId ? { ...user, passwordExpiration: nextExpiration } : user
    )));
  };

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
    />
  );
}
