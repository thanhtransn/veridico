import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "../../hoc/authContext";
import { LoadingPage } from "../../component/loading";
import { authenticatedRequest } from "../../API/apiCall";
import { ROLE } from "../../constant";

export function OrganisationDetail() {
  const { organisationId } = useParams();
  const { user } = useAuth();
  const [ organisation, setOrganisation ] = useState<any>({});
  const [ loading, setLoading] = useState(true);
  const [ error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    authenticatedRequest({
        path: `organisation/${organisationId}`,
        method: 'GET'
    })
      .then((data) => setOrganisation(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [organisationId]);

  if (loading){
    return <LoadingPage/>
  }

  if (error)
    return <div className="alert alert-danger m-4">{error}</div>;

  const isAdmin = organisation.administrators?.some(
    (admin: any) => admin.id === user?.id
  ) || user.role === ROLE.SUPERADMIN

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
        <div>
          <h2 className="fw-bold">{organisation.companyName}</h2>
          <span className="badge bg-success">{organisation.StatusOfCompany}</span>
        </div>

        {isAdmin && (
          <Link
            to={`/organisation/edit/${organisationId}`}
            className="btn btn-outline-primary mt-2 mt-md-0"
          >
            Edit Organisation
          </Link>
        )}
      </div>

      {/* Organisation Info */}
      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Company Information</h5>
              <div className="row">
                <Info label="UEN" value={organisation.uen} />
                <Info label="Business Type" value={organisation.businessType} />
                <Info label="Registered Address" value={organisation.registeredAddress} />
                <Info label="Nature of Business" value={organisation.natrueOfBusiness} />
                <Info label="Date of Incorporation" value={format(new Date(organisation.dateOfincorporation), "yyyy-MM-dd")} />
                <Info label="Company Size" value={organisation.companySize} />
                <Info label="Paid Up Capital" value={organisation.paidUpCapital} />
                <Info label="Active" value={organisation.isActive ? "Yes" : "No"} />
              </div>
            </div>
          </div>
        </div>

        {/* Admin List */}
        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title mb-3">Administrators</h5>
              <ul className="list-group list-group-flush">
                {organisation.administrators.map((admin: any) => (
                  <li
                    key={admin.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <div className="fw-semibold">{admin.firstName} {admin.lastName}</div>
                      <small className="text-muted">{admin.mobileNumber}</small>
                    </div>
                    {admin.id === user?.id && (
                      <span className="badge bg-primary">You</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: {label: string, value : any}) {
  return (
    <div className="col-md-6 mb-2">
      <div className="text-muted small">{label}</div>
      <div className="fw-medium">{value || "-"}</div>
    </div>
  );
}
