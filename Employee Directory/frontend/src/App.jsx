import { useEffect, useMemo, useState } from "react";
import {
  Users,
  LayoutDashboard,
  Settings,
  CalendarCheck,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Building2,
  UserCircle,
  Phone,
  MapPin,
  Mail,
  Briefcase,
  ChevronDown,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

const DEPARTMENTS = [
  "Engineering",
  "Marketing",
  "Design",
  "Human Resources",
  "Finance",
  "Management",
  "Sales",
  "Operations",
];

const GENDERS = ["Male", "Female", "Other"];

const emptyForm = {
  name: "",
  employeeId: "",
  department: "Engineering",
  gender: "Male",
  phone: "",
  email: "",
  jobTitle: "",
  localAddress: "",
  permanentAddress: "",
  status: "Active",
};

/* =====================================================
   HELPERS
===================================================== */

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarClass(name = "") {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return `avatar-${Math.abs(hash) % 6}`;
}

/* =====================================================
   SIDEBAR
===================================================== */

function Sidebar({ activePage, setActivePage }) {
  const items = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Employees",
      icon: Users,
    },
    {
      label: "Attendance",
      icon: CalendarCheck,
    },
    {
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Users size={21} />
        </div>

        <div>
          <h2>PeopleOS</h2>
          <span>DIRECTORY</span>
        </div>
      </div>

      <div className="sidebar-line" />

      <nav className="sidebar-nav">
        {items.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.label;

          return (
            <button
              key={item.label}
              className={`sidebar-item ${active ? "active" : ""}`}
              onClick={() => setActivePage(item.label)}
            >
              <Icon size={18} />
              <span>{item.label}</span>

              {active && item.label === "Employees" && (
                <span className="nav-dot" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="user-profile">
          <div className="user-avatar">AS</div>

          <div className="user-info">
            <strong>Anubhav S.</strong>
            <span>Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({ icon: Icon, title, value, type }) {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-content">
        <span>{title}</span>
        <strong>{value}</strong>
      </div>

      <div className="stat-icon">
        <Icon size={21} />
      </div>
    </div>
  );
}

/* =====================================================
   EMPLOYEE CARD
===================================================== */

function EmployeeCard({ employee, onEdit, onDelete }) {
  return (
    <div className="employee-card">
      <div className="employee-card-top">
        <div className={`employee-avatar ${getAvatarClass(employee.name)}`}>
          {getInitials(employee.name)}
        </div>

        <div className="employee-main-info">
          <h3>{employee.name}</h3>

          <div className="employee-role">
            <Briefcase size={13} />
            <span>{employee.jobTitle || "Employee"}</span>
          </div>

          {employee.email && (
            <div className="employee-email">
              <Mail size={13} />
              <span>{employee.email}</span>
            </div>
          )}
        </div>

        <div className="employee-actions">
          <button
            className="edit-btn"
            onClick={() => onEdit(employee)}
            title="Edit Employee"
          >
            <Pencil size={15} />
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(employee)}
            title="Delete Employee"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="employee-divider" />

      <div className="employee-meta">
        <span className="employee-id">
          {employee.employeeId || "N/A"}
        </span>

        <span className="department-badge">
          {employee.department || "N/A"}
        </span>

        <span
          className={`status-badge ${
            employee.status === "Active"
              ? "active"
              : employee.status === "On Leave"
              ? "leave"
              : "pending"
          }`}
        >
          <span className="status-dot" />
          {employee.status || "Active"}
        </span>
      </div>

      <div className="employee-extra">
        {employee.gender && (
          <span>
            <UserCircle size={13} />
            {employee.gender}
          </span>
        )}

        {employee.phone && (
          <span>
            <Phone size={13} />
            {employee.phone}
          </span>
        )}
      </div>
    </div>
  );
}

/* =====================================================
   EMPLOYEE MODAL
===================================================== */

function EmployeeModal({
  isOpen,
  employee,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(employee);

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name || "",
        employeeId: employee.employeeId || "",
        department: employee.department || "Engineering",
        gender: employee.gender || "Male",
        phone: employee.phone || "",
        email: employee.email || "",
        jobTitle: employee.jobTitle || "",
        localAddress: employee.localAddress || "",
        permanentAddress: employee.permanentAddress || "",
        status: employee.status || "Active",
      });
    } else {
      setForm(emptyForm);
    }
  }, [employee, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="employee-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2>
              {isEditing ? "Edit Employee" : "Add New Employee"}
            </h2>

            <p>
              {isEditing
                ? "Update employee information"
                : "Enter employee information"}
            </p>
          </div>

          <button className="modal-close" onClick={onClose}>
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Name */}
            <div className="form-group full">
              <label>
                Full Name <span>*</span>
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Employee ID */}
            <div className="form-group">
              <label>
                Employee ID <span>*</span>
              </label>

              <input
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                placeholder="EMP001"
                required
              />
            </div>

            {/* Department */}
            <div className="form-group">
              <label>
                Department <span>*</span>
              </label>

              <div className="select-wrapper">
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                >
                  {DEPARTMENTS.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>

                <ChevronDown size={16} />
              </div>
            </div>

            {/* Gender */}
            <div className="form-group">
              <label>
                Gender <span>*</span>
              </label>

              <div className="select-wrapper">
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                >
                  {GENDERS.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>

                <ChevronDown size={16} />
              </div>
            </div>

            {/* Phone */}
            <div className="form-group">
              <label>
                Phone Number <span>*</span>
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="9876543210"
                type="tel"
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email Address</label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="employee@company.com"
                type="email"
              />
            </div>

            {/* Job Title */}
            <div className="form-group">
              <label>Job Title</label>

              <input
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                placeholder="Software Engineer"
              />
            </div>

            {/* Status */}
            <div className="form-group">
              <label>Status</label>

              <div className="select-wrapper">
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Pending">Pending</option>
                </select>

                <ChevronDown size={16} />
              </div>
            </div>

            {/* Local Address */}
            <div className="form-group full">
              <label>Local Address</label>

              <textarea
                name="localAddress"
                value={form.localAddress}
                onChange={handleChange}
                placeholder="Enter local address"
                rows="3"
              />
            </div>

            {/* Permanent Address */}
            <div className="form-group full">
              <label>Permanent Address</label>

              <textarea
                name="permanentAddress"
                value={form.permanentAddress}
                onChange={handleChange}
                placeholder="Enter permanent address"
                rows="3"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="modal-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-btn"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  {isEditing ? "Update Employee" : "Add Employee"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =====================================================
   DELETE MODAL
===================================================== */

function DeleteModal({
  employee,
  onClose,
  onConfirm,
}) {
  if (!employee) {
    return null;
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="delete-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="delete-icon">
          <Trash2 size={22} />
        </div>

        <h2>Delete Employee?</h2>

        <p>
          Are you sure you want to delete{" "}
          <strong>{employee.name}</strong>?
          <br />
          This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button className="secondary-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="danger-btn" onClick={onConfirm}>
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   TOAST
===================================================== */

function Toast({ toast, onClose }) {
  if (!toast) {
    return null;
  }

  return (
    <div className={`toast ${toast.type}`}>
      {toast.type === "success" ? (
        <CheckCircle2 size={19} />
      ) : (
        <AlertCircle size={19} />
      )}

      <span>{toast.message}</span>

      <button onClick={onClose}>
        <X size={15} />
      </button>
    </div>
  );
}

/* =====================================================
   MAIN APP
===================================================== */

function App() {
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("All Departments");

  const [modalOpen, setModalOpen] = useState(false);

  const [editingEmployee, setEditingEmployee] = useState(null);

  const [deleteEmployee, setDeleteEmployee] = useState(null);

  const [toast, setToast] = useState(null);

  const [darkMode, setDarkMode] = useState(true);

  const [activePage, setActivePage] = useState("Employees");

  /* =====================================================
     TOAST
  ===================================================== */

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  /* =====================================================
     GET EMPLOYEES
  ===================================================== */

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/employees`);

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const data = await response.json();

      setEmployees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      showToast(
        "Could not connect to backend server",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* =====================================================
     STATISTICS
  ===================================================== */

  const statistics = useMemo(() => {
    const total = employees.length;

    const active = employees.filter(
      (employee) => employee.status === "Active"
    ).length;

    const departments = new Set(
      employees
        .map((employee) => employee.department)
        .filter(Boolean)
    ).size;

    return {
      total,
      active,
      departments,
    };
  }, [employees]);

  /* =====================================================
     SEARCH + DEPARTMENT FILTER
  ===================================================== */

  const filteredEmployees = useMemo(() => {
    const query = search.toLowerCase().trim();

    return employees.filter((employee) => {
      const matchesSearch =
        !query ||
        String(employee.name || "")
          .toLowerCase()
          .includes(query) ||
        String(employee.employeeId || "")
          .toLowerCase()
          .includes(query) ||
        String(employee.department || "")
          .toLowerCase()
          .includes(query) ||
        String(employee.phone || "")
          .toLowerCase()
          .includes(query);

      const matchesDepartment =
        department === "All Departments" ||
        employee.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, search, department]);

  /* =====================================================
     ADD EMPLOYEE
  ===================================================== */

  const addEmployee = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/employees`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      await fetchEmployees();

      setModalOpen(false);

      showToast("Employee added successfully");
    } catch (error) {
      console.error(error);

      showToast(
        "Failed to add employee",
        "error"
      );
    }
  };

  /* =====================================================
     UPDATE EMPLOYEE
  ===================================================== */

  const updateEmployee = async (formData) => {
    try {
      const response = await fetch(
        `${API_URL}/employees/${editingEmployee.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      await fetchEmployees();

      setModalOpen(false);

      setEditingEmployee(null);

      showToast("Employee updated successfully");
    } catch (error) {
      console.error(error);

      showToast(
        "Failed to update employee",
        "error"
      );
    }
  };

  /* =====================================================
     DELETE EMPLOYEE
  ===================================================== */

  const confirmDelete = async () => {
    if (!deleteEmployee) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/employees/${deleteEmployee.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      await fetchEmployees();

      setDeleteEmployee(null);

      showToast("Employee deleted successfully");
    } catch (error) {
      console.error(error);

      showToast(
        "Failed to delete employee",
        "error"
      );
    }
  };

  /* =====================================================
     OPEN ADD MODAL
  ===================================================== */

  const openAddEmployee = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  /* =====================================================
     OPEN EDIT MODAL
  ===================================================== */

  const openEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setModalOpen(true);
  };

  /* =====================================================
     CLOSE MODAL
  ===================================================== */

  const closeModal = () => {
    setModalOpen(false);
    setEditingEmployee(null);
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      {/* Sidebar */}

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Content */}

      <main className="main-content">
        <div className="content-wrapper">

          {/* ================= HEADER ================= */}

          <header className="page-header">
            <div>
              <div className="breadcrumb">
                PeopleOS / Employees
              </div>

              <h1>Employee Directory</h1>

              <p>
                Manage and monitor your organization&apos;s
                employees
              </p>
            </div>

            <div className="header-actions">
              <button
                className="theme-btn"
                onClick={() => setDarkMode(!darkMode)}
                title="Toggle Theme"
              >
                {darkMode ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </button>

              <button
                className="primary-btn new-employee-btn"
                onClick={openAddEmployee}
              >
                <Plus size={17} />
                New Employee
              </button>
            </div>
          </header>

          {/* ================= STATS ================= */}

          <section className="stats-grid">
            <StatCard
              icon={Users}
              title="Total Employees"
              value={statistics.total}
              type="blue"
            />

            <StatCard
              icon={UserCircle}
              title="Active Employees"
              value={statistics.active}
              type="green"
            />

            <StatCard
              icon={Building2}
              title="Total Departments"
              value={statistics.departments}
              type="purple"
            />
          </section>

          {/* ================= TOOLBAR ================= */}

          <section className="directory-panel">
            <div className="directory-header">
              <div>
                <h2>All Employees</h2>

                <p>
                  Showing {filteredEmployees.length} of{" "}
                  {employees.length} employees
                </p>
              </div>

              <div className="directory-tools">

                {/* Search */}

                <div className="search-box">
                  <Search size={17} />

                  <input
                    type="text"
                    placeholder="Search name, ID, department..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="clear-search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Department Filter */}

                <div className="filter-box">
                  <select
                    value={department}
                    onChange={(e) =>
                      setDepartment(e.target.value)
                    }
                  >
                    <option>
                      All Departments
                    </option>

                    {DEPARTMENTS.map((item) => (
                      <option key={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            {/* ================= EMPLOYEE LIST ================= */}

            <div className="directory-body">

              {loading ? (
                <div className="loading-state">
                  <Loader2
                    size={34}
                    className="spin"
                  />

                  <p>Loading employees...</p>
                </div>
              ) : filteredEmployees.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <Users size={30} />
                  </div>

                  <h3>
                    No employees found
                  </h3>

                  <p>
                    Try changing your search or
                    department filter.
                  </p>

                  <button
                    className="primary-btn"
                    onClick={openAddEmployee}
                  >
                    <Plus size={16} />
                    Add Employee
                  </button>
                </div>
              ) : (
                <div className="employee-grid">
                  {filteredEmployees.map((employee) => (
                    <EmployeeCard
                      key={employee.id}
                      employee={employee}
                      onEdit={openEditEmployee}
                      onDelete={setDeleteEmployee}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ================= FOOTER ================= */}

            {!loading &&
              filteredEmployees.length > 0 && (
                <div className="directory-footer">
                  <span>
                    {filteredEmployees.length} employee
                    {filteredEmployees.length !== 1
                      ? "s"
                      : ""}{" "}
                    displayed
                  </span>

                  <span>
                    Employee Directory
                  </span>
                </div>
              )}
          </section>
        </div>
      </main>

      {/* ================= ADD / EDIT MODAL ================= */}

      <EmployeeModal
        isOpen={modalOpen}
        employee={editingEmployee}
        onClose={closeModal}
        onSave={
          editingEmployee
            ? updateEmployee
            : addEmployee
        }
      />

      {/* ================= DELETE MODAL ================= */}

      <DeleteModal
        employee={deleteEmployee}
        onClose={() => setDeleteEmployee(null)}
        onConfirm={confirmDelete}
      />

      {/* ================= TOAST ================= */}

      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

export default App;