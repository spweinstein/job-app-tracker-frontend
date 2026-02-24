import { useEffect, useState } from "react";
import { getApplications, getDashboardStats, deleteApplication } from "../../services/applicationService.js";
import ApplicationList from "../Applications/ApplicationList.jsx";
import { DataTable } from "../shared/views/index.js";
import { Link, useNavigate } from "react-router";
import { DeleteButton, EditButton, LoadingSpinner } from "../shared/ui/index.js";
import "./Dashboard.css";

const Dashboard = ({ setHeader = () => {} }) => {
  const [stats, setStats] = useState({
    total: 0,
    totalThisWeek: 0,
    byStatus: {},
    byStatusThisWeek: {},
    bySource: {},
  });
  const [loading, setLoading] = useState(true);
  const [interviewingApps, setInterviewingApps] = useState([]);
  const [interviewingLoading, setInterviewingLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (setHeader && typeof setHeader === "function") {
      setHeader({
        title: "Dashboard",
        actions: null,
      });
    }
  }, [setHeader]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await getDashboardStats();
        setStats(response);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchInterviewingApps = async () => {
      try {
        setInterviewingLoading(true);
        const response = await getApplications({ status: "Interviewing", limit: 10, sort: "updatedAt", sortDir: "desc" });
        setInterviewingApps(response.data);
      } catch (error) {
        console.error("Error fetching interviewing applications:", error);
      } finally {
        setInterviewingLoading(false);
      }
    };

    fetchInterviewingApps();
  }, [statusFilter]);

  const handleDelete = async (applicationId) => {
    try {
      await deleteApplication(applicationId);
      // Refresh all data
      const [statsResponse, interviewingResponse] = await Promise.all([
        getDashboardStats(),
        getApplications({ status: "Interviewing", limit: 10, sort: "updatedAt", sortDir: "desc" }),
      ]);
      setStats(statsResponse);
      setInterviewingApps(interviewingResponse.data);
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const handleStatClick = (status) => {
    setStatusFilter(statusFilter === status ? null : status);
  };

  const statusLabels = [
    "Applied",
    "Interviewing",
    "Accepted",
    "Offer",
    "Rejected",
    "Withdrawn",
  ];

  const sourceLabels = [
    "LinkedIn",
    "Indeed",
    "Company Site",
    "Networking",
    "Referral",
    "Recruiter",
  ];

  const interviewingColumns = [
    {
      key: "title",
      label: "Job Title",
      render: (row) => (
        <Link to={`/applications/${row._id}`}>{row.title || "Untitled"}</Link>
      ),
    },
    {
      key: "company",
      label: "Company",
      render: (row) =>
        row?.company?._id ? (
          <Link to={`/companies/${row.company._id}`}>
            {row.company?.name || "Untitled"}
          </Link>
        ) : (
          <span>{row.company?.name || "---"}</span>
        ),
      minWidth: 400,
    },
    {
      key: "priority",
      label: "Priority",
      render: (row) => (
        <span className={`priority priority-${row.priority?.toLowerCase()}`}>
          {row.priority}
        </span>
      ),
      minWidth: 600,
    },
    {
      key: "source",
      label: "Source",
      render: (row) => row.source || "-",
      minWidth: 800,
    },
    {
      key: "updatedAt",
      label: "Last Updated",
      render: (row) =>
        row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : "-",
    },
    {
      key: "actions",
      label: "Actions",
      isActions: true,
      render: (row, { tableWidth }) => (
        <div className="actions">
          <EditButton
            onClick={() => navigate(`/applications/${row._id}/edit`)}
            size={tableWidth < 500 ? "icon" : "xs"}
          />
          <DeleteButton
            onClick={() => handleDelete(row._id)}
            size={tableWidth < 500 ? "icon" : "xs"}
          />
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="dashboard">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Quick Actions Section */}
      <div className="quick-actions-section">
        <h2 className="quick-actions-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          <Link to="/applications/new" className="quick-action-btn">
            <span className="quick-action-icon">➕</span>
            <span className="quick-action-label">New Application</span>
          </Link>
          <Link to="/companies/new" className="quick-action-btn">
            <span className="quick-action-icon">🏢</span>
            <span className="quick-action-label">Add Company</span>
          </Link>
          <Link to="/resumes/new" className="quick-action-btn">
            <span className="quick-action-icon">📄</span>
            <span className="quick-action-label">Create Resume</span>
          </Link>
          <Link to="/cover-letters/new" className="quick-action-btn">
            <span className="quick-action-icon">✉️</span>
            <span className="quick-action-label">Create Cover Letter</span>
          </Link>
        </div>
      </div>

      <div className="dashboard-lists">
        <div className="dashboard-list-section">
          <h2 className="dashboard-section-title">
            {statusFilter ? `Applications - ${statusFilter}` : "Recent Applications"}
            {statusFilter && (
              <button
                className="clear-filter-btn"
                onClick={() => setStatusFilter(null)}
                title="Clear filter"
              >
                ✕
              </button>
            )}
          </h2>
          <ApplicationList
            setHeader={() => {}}
            params={statusFilter ? { status: statusFilter, limit: 10 } : { limit: 10 }}
          />
        </div>

        <div className="dashboard-list-section">
          <h2 className="dashboard-section-title">
            Applications in Interviewing Stage
          </h2>
          {interviewingLoading ? (
            <LoadingSpinner />
          ) : (
            <DataTable
              columns={interviewingColumns}
              data={interviewingApps}
              emptyState={<p>No applications in interviewing stage.</p>}
            />
          )}
        </div>
      </div>

      <div className="dashboard-stats">
        {/* Week totals at the top */}
        <div className="week-totals-section">
          <div className="stat-card week-total-card">
            <div className="stat-value">{stats.totalThisWeek}</div>
            <div className="stat-label">Total This Week</div>
          </div>
          <div className="week-status-grid">
            {statusLabels.map((status) => (
              <div key={status} className="week-stat-item">
                <div className="week-stat-value">
                  {stats.byStatusThisWeek[status] || 0}
                </div>
                <div className="week-stat-label">{status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Total applications */}
        <div className="stat-card total-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Applications</div>
        </div>

        {/* By Status and By Source side by side */}
        <div className="stats-grid-container">
          <div className="stat-section">
            <h2 className="stat-section-title">By Status</h2>
            <div className="stat-grid compact-grid">
              {statusLabels.map((status) => (
                <div
                  key={status}
                  className={`stat-item ${statusFilter === status ? "active" : ""} ${stats.byStatus[status] > 0 ? "clickable" : ""}`}
                  onClick={() => stats.byStatus[status] > 0 && handleStatClick(status)}
                  title={stats.byStatus[status] > 0 ? `Click to filter by ${status}` : ""}
                >
                  <div className="stat-item-value">
                    {stats.byStatus[status] || 0}
                  </div>
                  <div className="stat-item-label">{status}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="stat-section">
            <h2 className="stat-section-title">By Source</h2>
            <div className="stat-grid compact-grid">
              {sourceLabels.map((source) => (
                <div key={source} className="stat-item">
                  <div className="stat-item-value">
                    {stats.bySource[source] || 0}
                  </div>
                  <div className="stat-item-label">{source}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Dashboard;
