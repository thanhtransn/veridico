import { useEffect, useState } from "react";
import { authenticatedRequest } from "../../API/apiCall";
import { useAuth } from "../../hoc/authContext";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "../../component/loading";
import { ROLE } from "../../constant";

export default function DashboardAnalytics() {
  const [organisations, setOrganisations] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth()
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const data = await authenticatedRequest({
        path: 'organisation/list',
        method: 'GET',
      })

      if (data) {
        setLoading(false)
        setOrganisations(data)
      }
    }
    if (user?.role === ROLE.SUPERADMIN) {
      fetchData()
    }
    else if (user?.role === ROLE.ADMiNSTRATOR) {
      const data = [user.organisation]
      if (data) {
        setOrganisations(data)
        setLoading(false)
      }
    }
    else setLoading(false)
  }, []);

  return (
    <div className="container" data-bs-spy="scroll">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Analytics Dashboard</h3>
        <button className="btn btn-primary" onClick={() => navigate('organisation/new')} disabled={user?.role !== ROLE.SUPERADMIN}>+ Create Organisation</button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          {loading ? (
            <LoadingPage />
          ) : !loading && organisations.length === 0 ? (
            <div className="alert alert-info">No organisations found</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>No</th>
                    <th>Company Name</th>
                    <th>UEN</th>
                    <th>Business Type</th>
                    <th>Status</th>
                    {user?.role === ROLE.SUPERADMIN && <th>Admins</th>}
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {organisations.map((org: any, index: number) => (
                    <tr key={`"${org.id}"`}>
                      <td>{index + 1}</td>
                      <td>
                        <strong>{org.companyName}</strong>
                        <div className="text-muted small">{org.registeredAddress}</div>
                      </td>
                      <td>{org.uen}</td>
                      <td>{org.businessType}</td>
                      <td>
                        {org.isActive ? (
                          <span className="badge bg-success">Active</span>
                        ) : (
                          <span className="badge bg-secondary">Inactive</span>
                        )}
                      </td>
                      {user?.role === ROLE.SUPERADMIN && <td>
                        <span className="badge bg-info">
                          {org.administrators?.length || 0}
                        </span>
                      </td>}
                      <td className="text-end">
                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => navigate(`organisation/${org.id}`)}>
                          View
                        </button>
                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => navigate(`organisation/edit/${org.id}`)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
